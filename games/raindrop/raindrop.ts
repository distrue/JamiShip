import { BaseObj } from './base';

export default class RaindropObj extends BaseObj {
  private speed: number;

  constructor(speed: number, srcs: string[], overlapable: boolean, size: { x: number; y: number }, location = { x: 0, y: 0 }) {
    super(srcs, overlapable, size, location);
    this.speed = speed;
  }
  getSpeed() {
    return this.speed;
  }
}
