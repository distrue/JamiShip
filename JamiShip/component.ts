/*
예제코드
import React from 'react';
import styled from 'styled-components';

import { BaseObj, checkRectOverlap} from '../JamiShip/component';

export default () => {
  // eslint-disable-next-line
  const [canvases] = React.useState(['canvas1', 'canvas2']);
  React.useEffect(() => {
    const testBase = new BaseObj('canvas1', ['https://cdn.auth0.com/blog/react-js/react.png'], false, { x: 100, y: 100 });
    const testBase2 = new BaseObj('canvas2', ['https://cdn.auth0.com/blog/react-js/react.png'], false, { x: 100, y: 100 }, { x: 100, y: 100 });
    testBase.moveToWithCheckBump([testBase2], 550, 200, 1000).then(() => testBase2.moveToWithCheckBump([testBase], 700, 120, 2000))
    .then(() => testBase.moveToWithCheckBump([testBase2], 400, 170, 1500)).then(() => testBase2.moveToWithCheckBump([testBase], 300, 200, 200));

    testBase2.moveToWithCheckBump([testBase], 450, 250, 1000).then(() => testBase.moveToWithCheckBump([testBase2], 200, 10, 2000))
    .then(() => testBase2.moveToWithCheckBump([testBase], 100, 140, 1500)).then(() => testBase.moveToWithCheckBump([testBase2], 300, 200, 200));
    console.log(testBase.getInnerRect());
    console.log(checkRectOverlap(testBase.getInnerRect(), testBase2.getInnerRect()));
  }, []);

  return (
    <>
      <Background>
        {canvases.map((name) => {
          return (
            <canvas key={name} className="canvas" id={name} width="1000px" height="300px">
              canvas
            </canvas>
          );
        })}
        ...
      </Background>
    </>
  );
};

const Background = styled.div`
  ...
  canvas {
    position: absolute;
  }
  ...
 */
function loadImage(urls: string[], idx: number): Promise<any[]> {
  if (idx === -1) {
    return new Promise((resolve) => {
      resolve([]);
    });
  }
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => loadImage(urls, idx - 1).then((imgs) => resolve([...imgs, img]));
    img.onerror = () => reject(new Error(`load ${urls[idx]} fail`));
    img.src = urls[idx];
  });
}

export type Rectangular = { x1: number; x2: number; y1: number; y2: number };
/**
 * @description 두 직사각형이 겹치는지 안겹치는지 판단하는 함수
 * @param rectA {x1: number, x2: number, y1: number, y2: number};
 * @param rectB {x1: number, x2: number, y1: number, y2: number};
 * @returns 겹칠경우 true, 안겹칠경우 false, 딱 맞닿을 경우 false
 */
export function checkRectOverlap(rectA: Rectangular, rectB: Rectangular) {
  const centerA = { x: (rectA.x1 + rectA.x2) / 2, y: (rectA.y1 + rectA.y2) / 2 };
  const centerB = { x: (rectB.x1 + rectB.x2) / 2, y: (rectB.y1 + rectB.y2) / 2 };
  const absGradient = Math.abs((centerB.y - centerA.y) / (centerB.x - centerA.x));
  const absGradientA = Math.abs((rectA.y2 - rectA.y1) / (rectA.x2 - rectA.x1));
  const absGradientB = Math.abs((rectB.y2 - rectB.y1) / (rectB.x2 - rectB.x1));
  const lengthBetweenAB = Math.sqrt((centerB.x - centerA.x) ** 2 + (centerB.y - centerA.y) ** 2);
  let lengthSideA: number;
  if (absGradient > absGradientA) {
    lengthSideA = Math.sqrt(((rectA.y1 - centerA.y) / absGradient) ** 2 + (rectA.y1 - centerA.y) ** 2);
  } else {
    lengthSideA = Math.sqrt(((rectA.x1 - centerA.x) * absGradient) ** 2 + (rectA.x1 - centerA.x) ** 2);
  }
  let lengthSideB: number;
  if (absGradient > absGradientB) {
    lengthSideB = Math.sqrt(((rectB.y1 - centerB.y) / absGradient) ** 2 + (rectB.y1 - centerB.y) ** 2);
  } else {
    lengthSideB = Math.sqrt(((rectB.x1 - centerB.x) * absGradient) ** 2 + (rectB.x1 - centerB.x) ** 2);
  }
  if (lengthBetweenAB >= lengthSideA + lengthSideB) {
    // 안만남
    return false;
  }
  return true; // 겹침
}
export function canvas2dClear(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  ctx!.clearRect(0, 0, canvas.width, canvas.height);
}
export class BaseObj {
  private canvas: HTMLCanvasElement;
  private srcs: string[]; // 이미지 src 리스트
  private ctx: CanvasRenderingContext2D;
  private size: { x: number; y: number }; // 사이즈 아마 픽셀단위
  private location: { x: number; y: number }; // 이미지 위치 왼쪽 위가 0,0
  private overlapable: boolean; // 겹쳐질 수 있는지 true이면 겹쳐질 수 있음.
  private innerRect: Rectangular;
  private imgs: HTMLImageElement[];

  /**
   * @param canvasId 사용할 canvas의 id
   * @param src 사용할 이미지 src 리스트
   * @param overlapable 겹쳐지는 것을 허용할지 여부
   * @param size 이미지의 사이즈
   * @param location 이미지 위치 왼쪽 위가 0,0
   */
  constructor(srcs: string[], overlapable: boolean, size: { x: number; y: number }, location = { x: 0, y: 0 }) {
    const canvasParent = document.getElementById("canvas-container");
    this.canvas = document.createElement('canvas');
    this.canvas.width = 800;
    this.canvas.height = 600;
    canvasParent?.appendChild(this.canvas)
    this.ctx = this.canvas.getContext('2d')!;
    this.srcs = srcs;
    this.location = location;
    this.size = size;
    this.overlapable = overlapable;
    this.imgs = [];
    const margin = { x: this.size.x / 10, y: this.size.y / 10 };
    this.innerRect = {
      x1: this.location.x + margin.x,
      x2: this.location.x + this.size.x - margin.x,
      y1: this.location.y + margin.y,
      y2: this.location.y + this.size.y - margin.y,
    };
    this.draw();
  }
  addSrc(src: string) {
    this.srcs = [...this.srcs, src];
  }
  renewInnerRect() {
    const margin = { x: this.size.x / 8, y: this.size.y / 8 };
    this.innerRect = {
      x1: this.location.x + margin.x,
      x2: this.location.x + this.size.x - margin.x,
      y1: this.location.y + margin.y,
      y2: this.location.y + this.size.y - margin.y,
    };
    this.ctx.fillRect(this.innerRect.x1, this.innerRect.y1, this.innerRect.x2 - this.innerRect.x1, this.innerRect.y2 - this.innerRect.y1);
  }
  setLocation(x: number, y: number) {
    this.location = { x, y };
    this.renewInnerRect();
    this.draw();
  }
  getLocation() {
    return this.location;
  }
  getInnerRect() {
    return this.innerRect;
  }
  getOverlapable() {
    return this.overlapable;
  }
  /**
   * @description 다른 BaseObj 인스턴스들 리스트를 입력받아 양쪽다 overlapable하지 않고 위치가 겹쳤을 경우 충돌해 reject함
   * 충돌하지 않았을 경우 다 실행된 후에 resolve
   * @param items BaseObj 인스턴스 리스트
   * @param x 옮길 위치 x
   * @param y 옮길 위치 y
   * @param time 총 걸릴 시간
   * @param interval 한 프레임(기본 16초)
   */
  moveToWithCheckBump(items: BaseObj[], x: number, y: number, time: number, interval: number = 16) {
    if (this.getOverlapable()) {
      return this.moveTo(x, y, time, interval);
    }
    let number = time / interval;
    const xGap = (x - this.location.x) / (time / interval);
    const yGap = (y - this.location.y) / (time / interval);
    return new Promise((resolve, reject) => {
      const move = () => {
        number -= 1;
        if (number >= 0) {
          for (let i = 0; i < items.length; i += 1) {
            const bumped = checkRectOverlap(this.getInnerRect(), items[i].getInnerRect());
            if (bumped && items[i].getOverlapable() === false) {
              return reject();
            }
          }
          setTimeout(move, interval);
        } else {
          this.setLocation(x, y);
          this.draw();
          resolve();
          return true;
        }

        this.setLocation(this.location.x + xGap, this.location.y + yGap);
        this.draw();
        return true;
      };
      move();
    });
  }
  moveTo(x: number, y: number, time: number, interval: number = 16) {
    let number = time / interval;
    const xGap = (x - this.location.x) / (time / interval);
    const yGap = (y - this.location.y) / (time / interval);
    return new Promise((resolve) => {
      const move = () => {
        number -= 1;
        if (number >= 0) {
          setTimeout(move, interval);
        } else {
          this.setLocation(x, y);
          this.draw();
          resolve();
          return true;
        }
        this.setLocation(this.location.x + xGap, this.location.y + yGap);
        this.draw();
        return true;
      };
      move();
    });
  }
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  private getImageSrcs() {
    const ret = [];
    for (let i = 0; i < this.srcs.length; i += 1) {
      if (this.imgs.findIndex((img) => img.src === this.srcs[i]) === -1) { // load 되지 않은 이미지들만 push
        ret.push({
          src: this.srcs[i],
        });
      }
    }
    return ret;
  }
  draw() {
    this.clear();
    const getImgs = this.getImageSrcs();
    loadImage(
      getImgs.map((infos) => infos.src),
      getImgs.length - 1,
    ).then((imgs) => {
      this.imgs = [...this.imgs, ...imgs];
      return true;
    }).then(() => {
      for (let i = 0; i < this.imgs.length; i += 1) {
        this.ctx.drawImage(this.imgs[i], this.location.x, this.location.y, this.size.x, this.size.y);
      }
      this.ctx.fillRect(this.innerRect.x1, this.innerRect.y1, this.innerRect.x2 - this.innerRect.x1, this.innerRect.y2 - this.innerRect.y1);
    });
  }
}
