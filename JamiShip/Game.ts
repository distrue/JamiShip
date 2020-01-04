import {BaseObj} from './component';

export default interface Game<T> {
  controllers: T;
  frame: (frameNo: number) => Promise<boolean>;
}

interface CircleGameApi {
  add: (x: number, y: number) => unknown;
}

export class CircleGame implements Game<CircleGameApi> {
  private circles: any[] = [];
  public controllers = { // export controllers
    add: this.add
  }

  // define controllers
  private add(x?: number, y?: number) {
    const testBase = new BaseObj(
      `canvas${this.circles.length+1}`, 
      ['https://cdn.auth0.com/blog/react-js/react.png'], 
      false, 
      { x: 100, y: 100 }, 
      x && y ? {x: x, y: y} : undefined
    );
    this.circles.push(testBase);
  }

  /**
   * @description 단위 frame 동안 game 자체의 controller를 동작시키는 함수
   * @param frameNo 현재의 게임 상태
   * @returns 게임이 끝날 경우 true, 안끝날 경우 false
  */
  public frame = async (frameNo?: number) => {
    // 외부에 노출되지 않은 controller들을 동작시킴
    // Ex) component 간의 상호작용
    if(this.circles.length < 2) return false;
    
    const [testBase, testBase2] = this.circles;
    testBase.moveToWithCheckBump([testBase2], 550, 200, 1000).then(() => testBase2.moveToWithCheckBump([testBase], 700, 120, 2000))
      .then(() => testBase.moveToWithCheckBump([testBase2], 400, 170, 1500)).then(() => testBase2.moveToWithCheckBump([testBase], 300, 200, 200));
    testBase2.moveToWithCheckBump([testBase], 450, 250, 1000).then(() => testBase.moveToWithCheckBump([testBase2], 200, 10, 2000))
      .then(() => testBase2.moveToWithCheckBump([testBase], 100, 140, 1500)).then(() => testBase.moveToWithCheckBump([testBase2], 300, 200, 200));
    return false;
  }

  constructor() {
    this.circles = [];
    this.add();
    this.add(100, 100);
  }
}
