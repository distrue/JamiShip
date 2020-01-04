export default class Table {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private tempColor: boolean[][];
  constructor(tempColor: boolean[][]) {
    this.tempColor = tempColor;
    const canvasParent = document.getElementById('canvas-container');
    this.canvas = document.createElement('canvas');
    this.canvas.width = 800;
    this.canvas.height = 600;
    canvasParent!.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d')!;
    this.draw();
  }

  draw() {
    for (let i = 0; i < this.tempColor.length; i += 1) {
      for (let j = 0; j < this.tempColor[0].length; j += 1) {
        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.fillStyle = this.tempColor[i][j] === false ? 'white' : 'black';
        this.ctx.strokeStyle = 'black';
        const x = 25 + 50 * j;
        const y = 25 + 50 * i;
        this.ctx.fillRect(x, y, 50, 50);
        this.ctx.strokeRect(x, y, 50, 50);
      }
    }
  }
  // for (let i = 0; i < tempColor.length; i += 1) {
  //   for (let j = 0; j < tempColor[0].length; j += 1) {
  //     ctx.beginPath();
  //     ctx.lineWidth = 1;
  //     ctx.fillStyle = tempColor[i][j] === false ? 'white' : 'black';
  //     ctx.strokeStyle = 'black';
  //     const x = 25 + 50 * j;
  //     const y = 25 + 50 * i;
  //     ctx.fillRect(x, y, 50, 50);
  //     ctx.strokeRect(x, y, 50, 50);
  //   }
  // }
}
