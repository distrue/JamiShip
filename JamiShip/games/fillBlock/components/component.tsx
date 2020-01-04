export default class Block {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private size: { x: number; y: number }; // 사이즈 아마 픽셀단위
  private location: { x: number; y: number }; // 이미지 위치 왼쪽 위가 0,0
  /**
   * @param canvasId 사용할 canvas의 id
   * @param size 이미지의 사이즈
   * @param location 이미지 위치 왼쪽 위가 0,0
   */
  constructor(size: { x: number; y: number }, location = { x: 0, y: 0 }) {
    const canvasParent = document.getElementById('canvas-container');
    this.canvas = document.createElement('canvas');
    this.canvas.width = 800;
    this.canvas.height = 600;
    canvasParent!.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d')!;
    this.location = location;
    this.size = size;
    this.draw();
  }
  setLocation(x: number, y: number) {
    this.location = { x, y };
    this.draw();
  }
  getLocation() {
    return this.location;
  }
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  draw() {
    this.clear();
    this.ctx.fillRect(this.location.x, this.locatino.y, this.size.x, this.size.y);
  }
  colorIt(color) {
    this.ctx.fillStyle = color;
    this.ctx.fill();
  }
}
