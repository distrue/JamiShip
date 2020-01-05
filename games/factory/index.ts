import { Game } from "../../JamiShip/types";


export type TestFunc = (a: number, b: number) => number;

export interface FactoryGameApi {
  desc_getType: string;
  getType: () => string;
  desc_getScoreNeeded: string;
  getScoreNeeded: () => number;
  desc_getFunction: string;
  getFunction: () => TestFunc;
  desc_sendResult: string;
  sendResult: (result: boolean) => unknown;
}

const intervalPromise = (len: number) => new Promise((res) => {
  setTimeout(res, len);
});

const TICK = 100;

export default class FactoryGame implements Game<FactoryGameApi> {
  private funcType: 'plus' | 'minus';
  private funcCorrectCount: number;
  private funcUseCount: number;
  private funcNeededScore: number;
  private sentResult: boolean;
  private pc: HTMLCanvasElement;
  public controllers = {
    desc_getType: '컴퓨터의 종류를 반환합니다. ("plus" 또는 "minus")',
    getType: () => this.funcType,
    desc_getScoreNeeded: '정상/비정상의 기준 정확도를 반환합니다. (0~1)',
    getScoreNeeded: () => this.funcNeededScore,
    desc_getFunction: '컴퓨터 함수를 반환합니다',
    getFunction: () => {
      return (a: number, b: number) => {
        const correct = Math.random() > 0.5 ? true : false;
        this.funcUseCount++;
        if (correct) {
          this.funcCorrectCount++;
          return this.funcType === 'plus' ? a+b : a-b;
        } else {
          return this.funcType === 'plus' ? a+b+1 : a-b-1;
        }
      }
    },
    desc_sendResult: '컴퓨터의 정상/비정상 판정을 저장합니다.',
    sendResult: (v: boolean) => {
      this.sentResult = v;
    }
  }
  private setupNextFunc() {
    this.funcType = Math.random() > 0.5 ? 'plus' : 'minus';
    this.funcCorrectCount = 0;
    this.funcUseCount = 0;
    this.funcNeededScore = Math.random();
  }
  public async frame(frameNo: number) {
    const valid = (this.funcCorrectCount / (this.funcUseCount === 0 ? 1 : this.funcUseCount)) >= this.funcNeededScore;
    console.log(valid === this.sentResult);
    await this.movePC(-50, 300, 400, 300);
    await intervalPromise(700);
    let dx, dy;
    dx = this.sentResult ? 3.5 : 0;
    dy = this.sentResult ? 0 : -1.5;
    for (let i=0; i<300;i++) {
      this.pc.style.left = `${400+dx*i}px`;
      this.pc.style.top = `${300+dy*i}px`;
      await intervalPromise(10);
    }
    this.setupNextFunc();
    return (valid === this.sentResult) ? undefined : `패배: ${frameNo}회 생존`;
  }
  private async movePC(sx: number, sy: number, ex: number, ey: number) {
    const dx = (ex-sx)/TICK, dy = (ey-sy)/TICK;
    let nx=sx, ny=sy;
    for(let i=0;i<=TICK;i++) {
      this.pc.style.left = `${nx}px`;
      this.pc.style.top = `${ny}px`;
      await intervalPromise(10);
      nx += dx;
      ny += dy;
    }
  }
  constructor() {
    this.sentResult = false;
    this.funcType = 'minus';
    this.funcCorrectCount = 0;
    this.funcUseCount = 0;
    this.funcNeededScore = 0;
    this.setupNextFunc();

    const container = document.getElementById('canvas-container')!;

    const bg = document.createElement('img');
    bg.src = 'http://news.kbiz.or.kr/news/photo/201805/46851_9179_3244.jpg';
    bg.style.width = '100%';
    bg.style.height = '100%';
    container.appendChild(bg);

    const txt1 = document.createElement('div');
    txt1.innerText = '↑불량';
    txt1.style.fontSize = '36px';
    txt1.style.position = 'absolute';
    txt1.style.top = '80px';
    txt1.style.left = '350px';
    container.appendChild(txt1);
    const txt2 = document.createElement('div');
    txt2.innerText = '정상→';
    txt2.style.color = 'rgb(225, 227, 20)';
    txt2.style.fontSize = '36px';
    txt2.style.position = 'absolute';
    txt2.style.top = '285px';
    txt2.style.left = '700px';
    container.appendChild(txt2);

    // Setup item
    const pcEl = document.createElement('canvas');
    const ctx = pcEl.getContext('2d');
    const img = new Image();
    img.onload = function() {
      ctx?.drawImage(img, 0, 0);
      console.log(img.height, img.width);
    };
    img.src = '/imgs/factory_pc.png';
    ctx?.drawImage(img, 0, 0);
    pcEl.style.height = "64px";
    pcEl.style.position = "absolute";
    container.appendChild(pcEl);

    this.pc = pcEl;
  }
}