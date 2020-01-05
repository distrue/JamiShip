import Table from './table';
import { Game } from '../types';

interface FillBlockGameApi {
  move: (direction: number) => unknown;
  changeColor: () => boolean;
  getPosition: () => number[];
  getMap: () => boolean[][];
  getGoalMap: () => boolean[][];
  setMap: (map: boolean[][]) => boolean[][];
  setGoalMap: (map: boolean[][]) => boolean[][];
};

export class FillBlockGame implements types.Game<FillBlockGameApi> {
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
    desc_move: '원하는 방향으로 움직입니다. 방향은 0~3으로 설정하며, 순서대로 상우하좌를 나타냅니다.',
    move: (direction: number) => {
      this.position = [this.position[0] + this.dx[direction], this.position[1] + this.dy[direction]];
      return this.position;
    },
    desc_changeColor: '현재 위치의 블록 색을 바꾼 후, 바뀐 색을 반환합니다. true가 검은색, false가 흰색을 나타냅니다.(검은색으로 칠했는가?)',
    changeColor: () => {
      this.tempMap[this.position[0]][this.position[1]] = !this.tempMap[this.position[0]][this.position[1]];
      this.createTable();
      return this.tempMap[this.position[0]][this.position[1]];
    },
    desc_getPosition: '현재 위치를 반환합니다. [x좌표, y좌표] 형식입니다.',
    getPosition: () => {
      return [this.position[0], this.position[1]]
    },
    desc_getMap: '현재 지도의 색칠된 상황을 반환합니다. 이차원 배열 형식입니다.',
    getMap: () => {
      return this.tempMap;
    },
    desc_getGoalMap: '목표 지도의 색칠된 상황을 반환합니다. 이차원 배열 형식입니다.',
    getGoalMap: () => {
      return this.goalMap;
    },
    desc_setMap: '현재 지도의 색칠된 상황을 강제로 바꿀 수 있습니다. 이차원 배열을 넘겨주어야 합니다.',
    setMap: (map: boolean[][]) => {
      this.tempMap = map;
      return this.tempMap;
    },
    desc_setGoalMap: '목표 지도를 설정할 수 있습니다. 이차원 배열을 넘겨주어야 합니다.',
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
