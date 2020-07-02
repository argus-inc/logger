"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debugContent = exports.debugObject = exports.debug = exports.log = exports.generateColor = exports.getPrefixFromType = exports.generatePrefix = exports.LogPrefix = exports.LogColor = exports.LogType = exports.defaultConfig = exports.LoggerResultType = void 0;
var chalk = require("chalk");
var fs = require("fs");
var LoggerResultType;
(function (LoggerResultType) {
    LoggerResultType["Table"] = "table";
    LoggerResultType["Config"] = "config";
    LoggerResultType["String"] = "string";
    LoggerResultType["Dir"] = "dir";
    LoggerResultType["Map"] = "map";
    LoggerResultType["Undefined"] = "undefined";
})(LoggerResultType = exports.LoggerResultType || (exports.LoggerResultType = {}));
var loadConfiguration = function () {
    var config = {};
    var pathPackage = process.cwd() + '/package.json';
    if (fs.existsSync(pathPackage)) {
        var tempConfig = require(pathPackage);
        if (tempConfig.argusInc) {
            config = tempConfig.argusInc;
        }
    }
    var pathArgus = process.cwd() + '/argus.json';
    if (fs.existsSync(pathArgus)) {
        var tempConfig = require(pathArgus);
        if (tempConfig.argusInc) {
            config = tempConfig.argusInc;
        }
    }
    if (!config || config === {}) {
        config = exports.defaultConfig;
    }
    return { type: LoggerResultType.Config, data: config };
};
var currentConfiguration = loadConfiguration().data;
exports.defaultConfig = {
    logger: {
        debug: true
    }
};
var LogType;
(function (LogType) {
    LogType["Success"] = "\u2714 ";
    LogType["Error"] = "\u274C";
    LogType["Warning"] = "\u26A0 ";
    LogType["Update"] = "\uD83D\uDC7B";
    LogType["Default"] = "\u2615";
})(LogType = exports.LogType || (exports.LogType = {}));
var LogColor;
(function (LogColor) {
    LogColor["Success"] = "green";
    LogColor["Error"] = "red";
    LogColor["Warning"] = "yellow";
    LogColor["Update"] = "cyan";
    LogColor["Default"] = "";
})(LogColor = exports.LogColor || (exports.LogColor = {}));
var LogPrefix;
(function (LogPrefix) {
    LogPrefix["Success"] = "SUCCESS:";
    LogPrefix["Error"] = "ERROR:";
    LogPrefix["Warning"] = "WARNING:";
    LogPrefix["Update"] = "UPDATE:";
    LogPrefix["Default"] = "INFO:";
})(LogPrefix = exports.LogPrefix || (exports.LogPrefix = {}));
exports.generatePrefix = function (logType, logPrefix) {
    return logType + " - " + logPrefix.padEnd(9, ' ') + " ";
};
exports.getPrefixFromType = function (logType) {
    switch (logType) {
        case LogType.Success:
            return LogPrefix.Success;
            break;
        case LogType.Error:
            return LogPrefix.Error;
            break;
        case LogType.Warning:
            return LogPrefix.Warning;
            break;
        case LogType.Update:
            return LogPrefix.Update;
            break;
        default:
            return LogPrefix.Default;
            break;
    }
};
exports.generateColor = function (logType, content) {
    var colorized = content;
    switch (logType) {
        case LogType.Success:
            return chalk.green(colorized);
            break;
        case LogType.Error:
            return chalk.red(colorized);
            break;
        case LogType.Warning:
            return chalk.yellow(colorized);
            break;
        case LogType.Update:
            return chalk.cyan(colorized);
            break;
        default:
            return colorized;
            break;
    }
};
exports.log = function (content, logType) {
    if (logType === void 0) { logType = LogType.Default; }
    var prefix = exports.generatePrefix(logType, exports.getPrefixFromType(logType));
    console.log("" + exports.generateColor(logType, prefix) + content);
    return { data: content, logType: logType };
};
exports.debug = function (content) {
    if (Array.isArray(content)) {
        content.map(function (element) { return exports.debugContent(element); });
        return { type: LoggerResultType.Map, data: content };
    }
    return { type: LoggerResultType.Undefined, data: content };
};
exports.debugObject = function (object, depth) {
    if (depth === void 0) { depth = null; }
    if (typeof object === "object") {
        console.dir(object, { depth: depth });
        return { type: LoggerResultType.Dir, data: object };
    }
    return { type: LoggerResultType.Undefined, data: object };
};
exports.debugContent = function (content) {
    var _a;
    if (((_a = currentConfiguration === null || currentConfiguration === void 0 ? void 0 : currentConfiguration.logger) === null || _a === void 0 ? void 0 : _a.debug) === true) {
        if (typeof content === "string") {
            console.log(content);
            return { type: LoggerResultType.String, data: content };
        }
        else if (typeof content === "object") {
            console.table(content);
            return { type: LoggerResultType.Table, data: content };
        }
        else if (Array.isArray(content)) {
            console.table(content);
            return { type: LoggerResultType.Table, data: content };
        }
    }
    return { type: LoggerResultType.Undefined, data: content };
};
