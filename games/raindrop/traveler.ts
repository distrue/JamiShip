import { BaseObj } from './base';

export default class Traveler extends BaseObj {
  public type: string;
  constructor(srcs: string[], overlapable: boolean, size: { x: number; y: number }, location = { x: 0, y: 0 }) {
    super(srcs, overlapable, size, location);
    this.type = 'traveler';
  }
}
