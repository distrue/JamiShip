export default interface Game<T> {
  api: T;
  frame: (frameNo: number) => Promise<boolean>;
}

interface CircleGameApi {
  add: (x: number, y: number) => unknown;
  getPositions: () => any[];
}

export class CircleGame implements Game<CircleGameApi> {
  private circles: any[] = [];
  public api = {
    add: (x, y) => {
      this.circles.push()
    },
    getPositions: () => []
  }
  public frame = async (frameNo: number) => {
      return true;
    }
  constructor() {
    this.circles = [];
  }
}