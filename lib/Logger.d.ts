export declare enum LoggerResultType {
    Table = "table",
    Config = "config",
    String = "string",
    Dir = "dir",
    Map = "map",
    Undefined = "undefined"
}
export declare const defaultConfig: {
    logger: {
        debug: boolean;
    };
};
export declare enum LogType {
    Success = "\u2714 ",
    Error = "\u274C",
    Warning = "\u26A0 ",
    Update = "\uD83D\uDC7B",
    Default = "\u2615"
}
export declare enum LogColor {
    Success = "green",
    Error = "red",
    Warning = "yellow",
    Update = "cyan",
    Default = ""
}
export declare enum LogPrefix {
    Success = "SUCCESS:",
    Error = "ERROR:",
    Warning = "WARNING:",
    Update = "UPDATE:",
    Default = "INFO:"
}
export declare const generatePrefix: (logType: LogType, logPrefix: LogPrefix) => string;
export declare const getPrefixFromType: (logType: LogType) => LogPrefix;
export declare const generateColor: (logType: LogType, content: string) => string;
export declare const log: (content: string, logType?: LogType) => {
    data: string;
    logType: LogType;
};
export declare const debug: (content: Array<any>) => {
    type: LoggerResultType;
    data: any[];
};
export declare const debugObject: (object: Object, depth?: number | null) => {
    type: LoggerResultType;
    data: Object;
};
export declare const debugContent: (content: any) => {
    type: LoggerResultType;
    data: any;
};
