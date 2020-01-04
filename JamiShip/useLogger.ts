import {LogItem} from './types';

const dirPrint = (value: any) => {
    let ans = `[Object method descriptions]`;
    for (const [key, val] of Object.entries(value)) {
      if(typeof val === 'function') {
        ans = ans.concat('\n', `${key}: ${value[`desc_${key}`]}`);
      }
    }

    return ans;
  };

// eslint-disable-next-line
const logger = (logData: LogItem[], setLogData: any) => {
  return (level: 'dir' | 'log' | 'warn' | 'error', value: any) => {
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
