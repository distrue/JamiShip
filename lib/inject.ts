type LogFunc = (input: any) => unknown;

export interface Logger {
  log: LogFunc;
  warn: LogFunc;
  error: LogFunc;
}

export interface RunnerRequiredControls {
  logger: Logger;
}

export interface RunnerControls {
  test: () => unknown;
}

const ControlObj: RunnerControls = {
  test: () => {
    console.log('Test func');
  }
};

export default function injectCode(controls: RunnerRequiredControls): string {
  const intKey = `interface${Math.floor(10000000*Math.random())}`;
  // Inject RunnerRequiredControls
  (window as any).logger = controls.logger;
  // Inject other controls (component)
  (window as any)[intKey] = ControlObj;
  return intKey;
}