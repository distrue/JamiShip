export interface ForeignCode {
  init: () => unknown;
  loop: () => unknown;
}

// function testFunc() {
//   console.log('testFunc()')
// }
// (window as any).testFunc = testFunc;

export function makeFunc(input: string, injectKey: string): ForeignCode {
  return new Function(`
    return (function() {
      const JA = window['${injectKey}'];
      ${input}
      const initDefault = () => {
        throw new Error('Exec error: Init undefined');
      }
      const loopDefault = () => {
        throw new Error('Exec error: Loop undefined');
      }
      const initFunc = typeof(init) === 'undefined' ? initDefault : init;
      const loopFunc = typeof(loop) === 'undefined' ? loopDefault : loop;
      return {
        init: initFunc,
        loop: loopFunc
      }
    })();
  `)();
}

export function build(code: string, injectKey: string): ForeignCode {
  try {
    return makeFunc(code, injectKey);
  } catch (err) {
    throw err;
  }
}