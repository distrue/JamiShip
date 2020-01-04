import { BaseObj } from '../circleGame/circle';

export default class Traveler extends BaseObj {

  constructor(srcs: string[], overlapable: boolean, size: { x: number; y: number }, location = { x: 0, y: 0 }) {
    super(srcs, overlapable, size, location);
  }
}
