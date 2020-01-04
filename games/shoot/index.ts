import { Game } from "../../JamiShip/types";

interface Position {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface ShootGameApi {
  desc_getMaxVelocity: string;
  getMaxVelocity: () => number;
  desc_setVelocity: string;
  setVelocity: (vx: number, vy: number) => unknown;
  desc_getTarget: string;
  getTarget: () => Position;
}

const MAX_V = 100;
const TARGET_W = 20;
const TARGET_H = 50;
const TARGET_X = 750;
const BALL_R = 15;

function l2dist(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
}

const intervalPromise = (len: number) => new Promise((res) => {
  setTimeout(res, len);
});

export default class ShootGame implements Game<ShootGameApi> {
  private ballX: number;
  private ballY: number;
  private ballVX: number;
  private ballVY: number;
  private targetY: number;
  private targetEl: HTMLCanvasElement;
  private ballEl: HTMLCanvasElement;
  public controllers = {
    desc_getMaxVelocity: "설정 가능한 최대 속력을 가져옵니다. (number를 반환)",
    getMaxVelocity: () => MAX_V,
    desc_getTarget: "과녁의 위치를 가져옵니다. ({x, y, w, h}를 반환)",
    getTarget: () => {
      return {
        x: TARGET_X,
        y: this.targetY,
        w: TARGET_W,
        h: TARGET_H
      }
    },
    desc_setVelocity: "포탄의 속도를 설정합니다. setVelocity(x축 속력, y축 속력)",
    setVelocity: (vx: number, vy: number) => {
      this.ballVX = Math.min(MAX_V, Math.max(vx, 0));
      this.ballVY = -Math.min(MAX_V, Math.max(vy, 0));
    }
  }
  private collides(): boolean {
    if (this.ballX < TARGET_X) {
      if (this.ballY < this.targetY) return l2dist(this.ballX, this.ballY, TARGET_X, this.targetY) <= BALL_R;
      else if (this.ballY > this.targetY+TARGET_H) return l2dist(this.ballX, this.ballY, TARGET_X, this.targetY+TARGET_H) <= BALL_R; 
      else return this.ballX >= (TARGET_X - BALL_R);
    } else if (this.ballX > TARGET_X + TARGET_W) {
      if (this.ballY < this.targetY) return l2dist(this.ballX, this.ballY, TARGET_X+TARGET_W, this.targetY) <= BALL_R;
      else if (this.ballY > this.targetY+TARGET_H) return l2dist(this.ballX, this.ballY, TARGET_X+TARGET_W, this.targetY+TARGET_H) <= BALL_R; 
      else return this.ballX <= (TARGET_X + TARGET_W + BALL_R);
    } else {
      return (this.targetY - BALL_R) <= this.ballY && this.ballY <= (this.targetY + TARGET_H + BALL_R);
    }
  }
  private frameCycle(): (string | undefined) {
    if (this.ballX < -50 || this.ballX > 900 || this.ballY < -50 || this.ballY > 650) {
      return "실패..";
    }
    if (this.collides()) {
      return "승리!!";
    }
    this.ballVY += 0.1;
    this.ballVX += 0;
    this.ballY += this.ballVY;
    this.ballX += this.ballVX;
    this.ballEl.style.left = `${this.ballX}px`;
    this.ballEl.style.top = `${this.ballY}px`;
    return;
  }
  public async frame() {
    let ret;
    while(true) {
      ret = this.frameCycle();
      if (ret !== undefined) break;
      await intervalPromise(20);
    }
    return ret;
  }
  private initDraw() {
    let ctx = this.targetEl.getContext('2d')!;
    ctx.beginPath();
    ctx.rect(0, 0, TARGET_W, TARGET_H);
    ctx.fillStyle = "rgb(51, 73, 103)";
    ctx.fill();
    this.targetEl.style.position = 'absolute';
    this.targetEl.style.left = `${TARGET_X}px`;
    this.targetEl.style.top = `${this.targetY}px`;
    
    ctx = this.ballEl.getContext('2d')!;
    ctx.beginPath();
    ctx.arc(BALL_R, BALL_R, BALL_R, 0, 2*Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
    this.ballEl.style.position = 'absolute';
    this.ballEl.style.left = `${this.ballX}px`;
    this.ballEl.style.top = `${this.ballY}px`;
  }
  public constructor() {
    this.ballX = 0;
    this.ballY = 500;
    this.ballVX = 10;
    this.ballVY = -5;
    this.targetY = 50 + Math.floor(400*Math.random());
    this.targetEl = document.createElement('canvas');
    this.ballEl = document.createElement('canvas');
    this.initDraw();
    const root = document.getElementById('canvas-container');
    root?.appendChild(this.targetEl);
    root?.appendChild(this.ballEl);
    console.log(this.ballVX, this.ballVY);
  }
}