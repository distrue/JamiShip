import {LogItem} from './types';

export type LogLevel = 'system' | 'dir' | 'log' | 'warn' | 'error';

const dirPrint = (value: Object) => {
    let ans = '[Game Object]';
    for (const [key, val] of Object.entries(value)) {
      ans = ans.concat('\n', `${key}: ${val.toString()}`);
    }
    console.log(ans);
    return ans;
  };

// eslint-disable-next-line
const logger = (logData: LogItem[], setLogData: any) => {
  return (level: LogLevel, value: any) => {
    const log = logData;
    log.push({
        level,
        value: level === 'dir' ? dirPrint(value) : value.toString(),
    });
    if (level === 'error') {
        console.error(value);
    }
    setLogData(log);
  }
};

export default logger;
