import { debug, debugContent, LoggerResultType, debugObject, log, LogType } from '../Logger';

test('debugContent String', () => {
    const data = 'argus-inc';
    expect(debugContent(data)).toStrictEqual({type: LoggerResultType.String, data: data});
});

test('debugContent Array', () => {
    const data = [0, 1, 3, 4, 5];
    expect(debugContent(data)).toStrictEqual({type: LoggerResultType.Table, data: data});
});

test('debugContent Object', () => {
    const data = {argusInc: "test"};
    expect(debugContent(data)).toStrictEqual({type: LoggerResultType.Table, data: data});
});

test('debugContent Undefined', () => {
    const data = undefined;
    expect(debugContent(data)).toStrictEqual({type: LoggerResultType.Undefined, data: data});
});

test('debugObject Object', () => {
    const data = {argusInc: {logger: {debug: {warn: true}}}};
    expect(debugObject(data)).toStrictEqual({type: LoggerResultType.Dir, data: data});
});

test('debugObject Object', () => {
    const data = {argusInc: {logger: {debug: {warn: true}}}};
    expect(debugObject(data)).toStrictEqual({type: LoggerResultType.Dir, data: data});
});

test('debug Array', () => {
    const data = ["debugArray", {debug: "array"}];
    expect(debug(data)).toStrictEqual({type: LoggerResultType.Map, data: data});
});

test('log', () => {
    const data = "hello";
    expect(log(data, LogType.Success)).toStrictEqual({logType: LogType.Success, data: data});
});
