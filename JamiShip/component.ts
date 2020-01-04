/*
예제코드
import {BaseObj, checkRectOverlap} from './classess/index';

const App: React.FC = () => {
  React.useEffect(() => {
    const testBase = new BaseObj('map-canvas', ['https://cdn.auth0.com/blog/react-js/react.png'], true, {x: 100, y: 100});
    const testBase2 = new BaseObj('map-canvas', ['https://cdn.auth0.com/blog/react-js/react.png'], true, {x: 100, y: 100}, {x: 80, y: 80});
    console.log(testBase.getInnerRect());
    console.log(checkRectOverlap(testBase.getInnerRect(), testBase2.getInnerRect()));
  }, [])
  return (
    <div className="App">
      <canvas id='map-canvas' height='650px' width='1000px'></canvas>
    </div>
  );
}
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
  const lengthBetweenAB = Math.abs((centerB.x - centerA.x) * absGradient);
  const lengthSideA = Math.abs((rectA.x1 - centerA.x) * absGradient);
  const lengthSideB = Math.abs((rectB.x1 - centerB.x) * absGradient);
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
  constructor(canvasId: string, srcs: string[], overlapable: boolean, size: { x: number; y: number }, location = { x: 0, y: 0 }) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.srcs = srcs;
    this.location = location;
    this.size = size;
    this.overlapable = overlapable;
    const margin = { x: size.x / 10, y: size.y / 10 };
    this.innerRect = {
      x1: location.x + margin.x,
      x2: location.x + size.x - margin.x,
      y1: location.y + margin.y,
      y2: location.y + size.y - margin.y,
    };
    this.imgs = [];
    this.draw();
  }
  addSrc(src: string) {
    this.srcs = [...this.srcs, src];
  }
  setLocation(x: number, y: number) {
    this.location = { x, y };
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
    });
  }
}
