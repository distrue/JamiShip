import RaindropObj from './raindrop';
import TravelerObj from './traveler';

export default interface Game<T> {
  controllers: T;
  frame: (frameNo: number) => Promise<boolean>;
}

interface RaindropGameApi {
  addRaindrop: (x: number, y: number) => unknown;
}

export class RaindropGame implements Game<RaindropGameApi> {
  private raindrops: RaindropObj[] = [];
  private traveler: TravelerObj;
  public controllers = { // export controllers
    addRaindrop: (x: number, speed: number) => {
      const raindropInst = new RaindropObj(
        speed,
        ['/raindrop/rain.png'],
        false,
        { x: 20, y: 20 },
        x ? { x, y: 0 } : {x: 0, y: 0}
      );
      this.raindrops.push(raindropInst);
    },
    move: (num: number, duration: number) => {
      this.raindrops[num].moveTo(400, 200, duration);
    }
  };
  /**
   * @description 단위 frame 동안 game 자체의 controller를 동작시키는 함수
   * @param frameNo 현재의 게임 상태
   * @returns 게임이 끝날 경우 true, 안끝날 경우 false
  */
  public frame = async () => {
    // 외부에 노출되지 않은 controller들을 동작시킴
    // Ex) component 간의 상호작용
    const travelerMoving = [[100, 500], [500, 1000], [600, 500], [200, 1000], [400, 1000]];
    if (this.raindrops.length < 2) return false;
    let pms: Promise<unknown>[] = [];
    for (let i = 0; i < this.raindrops.length; i += 1) {
      const raindrop = this.raindrops[i];
      pms = [...pms, raindrop.moveToWithCheckBump([this.traveler], raindrop.getLocation().x, 400, 5000 / raindrop.getSpeed())
        .then(() => this.raindrops[i].delete())
        .catch(() => this.raindrops[i].delete())];
    }
    let travelerMove = this.traveler.moveTo(300, this.traveler.getLocation().y, 500);
    travelerMoving.forEach((element) => {
      travelerMove = travelerMove.then(() => this.traveler.moveTo(element[0], this.traveler.getLocation().y, element[1]))
    });
    console.log(this.traveler);
    await Promise.all(pms).then(() => {
      this.raindrops = [] as RaindropObj[]
    });
    return false;
  }

  constructor() {
    this.raindrops = [];
    this.controllers.addRaindrop(0, 10);
    this.controllers.addRaindrop(100, 5);
    this.controllers.addRaindrop(400, 5);
    this.traveler = new TravelerObj(['/raindrop/cat.png'], false, { x: 47, y: 53 }, { x: 400, y: 380 });
    console.log('raindrop: ', this.raindrops);
  }
}
