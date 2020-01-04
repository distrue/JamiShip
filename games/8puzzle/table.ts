export default class Table {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private tempState: string;
  constructor(tempState: string) {
    this.tempState = tempState;
    const canvasParent = document.getElementById('canvas-container');
    this.canvas = document.createElement('canvas');
    this.canvas.width = 800;
    this.canvas.height = 600;
    canvasParent!.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d')!;
    this.draw();
  }

  draw() {
    for (let i = 0; i < 9; i += 1) {
      this.ctx.beginPath();
      this.ctx.lineWidth = 1;
      this.ctx.fillStyle = 'white';
      this.ctx.strokeStyle = 'black';
      const x = 25 + 50 * ((i / 3) % 1);
      const y = 25 + 50 * i % 3;
      this.ctx.fillRect(x, y, 50, 50);
      this.ctx.strokeRect(x, y, 50, 50);
      const num = parseInt(this.tempState[i]) >= 0 ? this.tempState[i] : '';
      this.ctx.font = '20px Georgia';
      this.ctx.fillStyle = 'black';
      this.ctx.fillText(num, x + 25, y + 25);
    }
  }
}
