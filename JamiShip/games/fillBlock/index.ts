import Table from './components/table';

// import Table from './components/table';
// import Queue from './components/queue';

export default interface Game<T> {
  controllers: T;
  frame: (frameNo: number) => Promise<boolean>;
};

interface FillBlockGameApi {
  move: (direction: number) => unknown;
  changeColor: () => unknown;
  getPosition: () => void;
  getMap: () => void;
};

export class FillBlockGame implements Game<FillBlockGameApi> {
  // private table: any = '';
  private position: number[] = [0, 0];
  private tempColor: boolean[][] = [[false, true, true, false, false], [false, true, false, true, false], [false, false, false, false, false], [false, true, false, true, false], [false, true, false, false, true]];
  private dx: number[] = [-1, 0, 1, 0];
  private dy: number[] = [0, 1, 0, -1];
  private goalColor: boolean[][] = [[true, true, true, true, true], [true, true, true, true, true], [true, true, true, true, true], [true, true, true, true, true], [true, true, true, true, true]];
  // eslint-disable-next-line class-methods-use-this
  private createTable() {
    const table = new Table(this.tempColor);
    return table;
  }
  private mapToString() {
    let result = '';
    for (let i = 0; i < 5; i += 1) {
      for (let j = 0; j < 5; j += 1) {
        const positionColor = this.tempColor[i][j] ? 1 : 0;
        result += `${positionColor} `;
      }
      result += '\n';
    }
    return result;
  }
  public controllers = { // export controllers
    move: (direction: number) => {
      this.position = [this.position[0] + this.dx[direction], this.position[1] + this.dy[direction]];
      this.controllers.getPosition();
    },
    changeColor: () => {
      this.tempColor[this.position[0]][this.position[1]] = !this.tempColor[this.position[0]][this.position[1]];
      this.createTable();
    },
    getPosition: () => {
      logger.log(`Current position: (${this.position[0]}, ${this.position[1]}).`);
    },
    getMap: () => {
      logger.log(`Current map: \n${this.mapToString()}.`);
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
    if (this.tempColor === this.goalColor) {
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
