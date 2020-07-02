import * as chalk from 'chalk'
import * as fs from 'fs'
import { stringify } from 'querystring';

interface Configuration {
    logger: {
        debug: boolean
    }
}

interface LoggerResult {
    type: LoggerResultType,
    data: any,
}

export enum LoggerResultType {
    Table = "table",
    Config = "config",
    String = "string",
    Dir = "dir",
    Map = "map",
    Undefined = "undefined",
}

const loadConfiguration = (): LoggerResult => {
    let config: any|Configuration = {}
    const pathPackage = process.cwd()+'/package.json';
    if (fs.existsSync(pathPackage)) {
        const tempConfig = require(pathPackage)
        if (tempConfig.argusInc) {
            config = tempConfig.argusInc
        }
        
    }
    const pathArgus = process.cwd()+'/argus.json';
    if (fs.existsSync(pathArgus)) {
        const tempConfig = require(pathArgus)
        if (tempConfig.argusInc) {
            config = tempConfig.argusInc
        }
    }
    if (!config || config === {}) {
        config = defaultConfig
    }
    return {type: LoggerResultType.Config,  data: config}
}

const currentConfiguration = loadConfiguration().data;

export const defaultConfig = {
    logger: {
        debug: true
    }
}

export enum LogType {
    Success = "✔ ",
    Error = "❌",
    Warning = "⚠ ",
    Update = "👻",
    Default = "☕"
}

export enum  LogColor {
    Success = "green",
    Error = "red",
    Warning = "yellow",
    Update = "cyan",
    Default = ""
}

export enum  LogPrefix {
    Success = "SUCCESS:",
    Error = "ERROR:",
    Warning = "WARNING:",
    Update = "UPDATE:",
    Default = "INFO:"
}

export const generatePrefix = (logType: LogType, logPrefix: LogPrefix): string => {
    return `${logType} - ${logPrefix.padEnd(9, ' ')} `
}

export const getPrefixFromType = (logType: LogType): LogPrefix => {
    switch (logType) {
        case LogType.Success: return LogPrefix.Success; break;
        case LogType.Error: return LogPrefix.Error; break;
        case LogType.Warning: return LogPrefix.Warning; break;
        case LogType.Update: return LogPrefix.Update; break;
        default: return LogPrefix.Default; break;
    }
}

export const generateColor = (logType: LogType, content: string): string => {
    let colorized = content;
    switch (logType) {
        case LogType.Success: return chalk.green(colorized); break;
        case LogType.Error: return chalk.red(colorized); break;
        case LogType.Warning: return chalk.yellow(colorized); break;
        case LogType.Update: return chalk.cyan(colorized); break;
        default: return colorized; break;
    }
}

export const log = (content: string, logType: LogType = LogType.Default) => {
    const prefix = generatePrefix(logType, getPrefixFromType(logType));
    console.log(`${generateColor(logType, prefix)}${content}`)
    return {data: content, logType}
}

export const debug = (content: Array<any>) => {
    if (Array.isArray(content)) {
        content.map(element => debugContent(element))
        return {type: LoggerResultType.Map,  data: content}
    }
    return {type: LoggerResultType.Undefined,  data: content}
}

export const debugObject = (object: Object, depth: number | null = null) => {
    if (typeof object === "object") {
        console.dir(object, {depth})
        return {type: LoggerResultType.Dir,  data: object}
    }
    return {type: LoggerResultType.Undefined,  data: object}
}

export const debugContent = (content: any) => {
    if (currentConfiguration?.logger?.debug === true) {
        if (typeof content === "string") {
            console.log(content)
            return {type: LoggerResultType.String,  data: content}
        } else if (typeof content === "object") {
            console.table(content)
            return {type: LoggerResultType.Table,  data: content}

        } else if (Array.isArray(content)) {
            console.table(content)
            return {type: LoggerResultType.Table,  data: content}
        }
    }
    return {type: LoggerResultType.Undefined,  data: content}
}



