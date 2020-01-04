import Table from './table';

export default interface Game<T> {
  controllers: T;
  frame: (frameNo: number) => Promise<boolean>;
};

interface puzzle8GameApi {
  move: (num: number) => void;
  getState: () => void;
};

export class puzzle8Game implements Game<puzzle8GameApi> {
  private tempState: string = '806547231';
  private goalState: string = '012345678';
  private goableIndexesList: number[][] = [[1, 3], [0, 2, 4], [1, 5], [0, 4, 6], [1, 3, 5, 7], [2, 4, 8], [3, 7], [4, 6, 8], [5, 7]];
  private createTable() {
    const table = new Table(this.tempState);
    return table;
  }
  private stateToString() {
    let result = '';
    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 3; j += 1) {
        result += this.tempState[3 * i + j];
      }
      result += '\n';
    }
    return result;
  }
  // eslint-disable-next-line class-methods-use-this
  swap(state: string, idx: number) {
    const temp = state[idx]; // i번째 수 저장
    let tempState = state.slice();
    tempState = tempState.replace('0', '9');
    tempState = tempState.replace(temp, '0');
    tempState = tempState.replace('9', temp);
    return tempState;
  }
  public controllers = { // export controllers
    move: (num: number) => {
      const zeroIdx = this.tempState.indexOf('0');
      if (num in this.goableIndexesList[zeroIdx]) {
        this.tempState = this.swap(this.tempState, num);
      }
      else logger.log('impossible!');
      this.createTable();
    },
    getState: () => {
      logger.log(`Current state: \n${this.stateToString()}.`);
    },
  };
  /**
   * @description 단위 frame 동안 game 자체의 controller를 동작시키는 함수
   * @param frameNo 현재의 게임 상태
   * @returns 게임이 끝날 경우 true, 안끝날 경우 false
  */
  public frame = async () => {
    // 외부에 노출되지 않은 controller들을 동작시킴
    // Ex) component 간의 상호작용
    if (this.tempState === this.goalState) {
      console.log('mission complete');
      return true;
    }
    this.createTable();
    return false;
  }

  constructor() {
    this.createTable();
  }
}
