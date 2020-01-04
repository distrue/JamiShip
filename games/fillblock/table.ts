export default class Table {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private tempMap: boolean[][];
  constructor(tempMap: boolean[][]) {
    this.tempMap = tempMap;
    const canvasParent = document.getElementById('canvas-container');
    this.canvas = document.createElement('canvas');
    this.canvas.width = 800;
    this.canvas.height = 600;
    canvasParent!.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d')!;
    this.draw();
  }

  draw() {
    for (let i = 0; i < this.tempMap.length; i += 1) {
      for (let j = 0; j < this.tempMap[0].length; j += 1) {
        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.fillStyle = this.tempMap[i][j] === false ? 'white' : 'black';
        this.ctx.strokeStyle = 'black';
        const x = 25 + 50 * j;
        const y = 25 + 50 * i;
        this.ctx.fillRect(x, y, 50, 50);
        this.ctx.strokeRect(x, y, 50, 50);
      }
    }
  }
}
