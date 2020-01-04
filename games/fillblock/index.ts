import Table from './table';
import { Game } from '../../JamiShip/types';

interface FillBlockGameApi {
  move: (direction: number) => unknown;
  changeColor: () => boolean;
  getPosition: () => number[];
  getMap: () => boolean[][];
  getGoalMap: () => boolean[][];
  setMap: (map: boolean[][]) => boolean[][];
  setGoalMap: (map: boolean[][]) => boolean[][];
};

export class FillBlockGame implements Game<FillBlockGameApi> {
  private position: number[] = [0, 0];
  private tempMap: boolean[][] = [[false, true, true, false, false], [false, true, false, true, false], [false, false, false, false, false], [false, true, false, true, false], [false, true, false, false, true]];
  private dx: number[] = [-1, 0, 1, 0];
  private dy: number[] = [0, 1, 0, -1];
  private goalMap: boolean[][] = [[true, true, true, true, true], [true, true, true, true, true], [true, true, true, true, true], [true, true, true, true, true], [true, true, true, true, true]];
  // eslint-disable-next-line class-methods-use-this
  private createTable() {
    const table = new Table(this.tempMap);
    return table;
  }
  public controllers = { // export controllers
    move: (direction: number) => {
      this.position = [this.position[0] + this.dx[direction], this.position[1] + this.dy[direction]];
      return this.position;
    },
    changeColor: () => {
      this.tempMap[this.position[0]][this.position[1]] = !this.tempMap[this.position[0]][this.position[1]];
      this.createTable();
      return this.tempMap[this.position[0]][this.position[1]];
    },
    getPosition: () => {
      return [this.position[0], this.position[1]]
    },
    getMap: () => {
      return this.tempMap;
    },
    getGoalMap: () => {
      return this.goalMap;
    },
    setMap: (map: boolean[][]) => {
      this.tempMap = map;
      return this.tempMap;
    },
    setGoalMap: (map: boolean[][]) => {
      this.goalMap = map;
      return this.goalMap;
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
    if (this.tempMap === this.goalMap) {
      return true;
    }
    this.createTable();
    return false;
  }

  constructor() {
    this.createTable();
  }
}
