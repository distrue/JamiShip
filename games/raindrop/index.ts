import { types } from 'jamiship';
import RaindropObj from './raindrop';
import TravelerObj from './traveler';
import {BaseObj} from './base';

interface RaindropGameApi {
  addRaindrop: (x: number, y: number) => unknown;
}
function sleep(ms: number) {
  return new Promise(resolve=>setTimeout(resolve, ms));
}

const duration = 500;

export class RaindropGame implements types.Game<RaindropGameApi> {
  private traveler: TravelerObj | null;
  private umbrella: BaseObj | null;
  public gameover: string | undefined;
  public controllers = { // export controllers
    desc_addRaindrop: '빗방울 객체를 생성합니다. 인자로 x좌표와 속도(10~20)의 값을 갖습니다. 빗방울은 자동으로 떨어집니다.',
    addRaindrop: (x: number, speed: number) => {
      const raindropInst = new RaindropObj(
        speed,
        ['/raindrop/rain.png'],
        false,
        { x: 20, y: 20 },
        x ? { x, y: 0 } : { x: 0, y: 0 },
      );
      const arr = [];
      if (this.traveler) {
        arr.push(this.traveler);
      }
      if (this.umbrella) {
        arr.push(this.umbrella)
      }
      raindropInst.moveToWithCheckBump(arr, raindropInst.getLocation().x, 420, 5000 / raindropInst.getSpeed())
          .then(() => {
            try {
              raindropInst.delete();
            } catch (err) {
              //
            }
          })
          .catch((err) => {
            console.log('err: ', err);
            if (err === 'traveler') {
              console.log('here!!');
              this.gameover = 'fail';
            }

            try {
              raindropInst.delete();
            } catch (err) {
              //
            }
          })
    },
    desc_addTraveler: '귀여운 고양이 여행자를 추가합니다. 고양이에 빗방울이 닿으면 게임이 오버됩니다.',
    addTraveler: () => {
      this.traveler = new TravelerObj(['/raindrop/cat.png'], false, { x: 47, y: 53 }, { x: 400, y: 380 });
    },
    desc_addUmbrella: '우산을 추가합니다. 우산은 고양이 위에 생성됩니다.',
    addUmbrella: () => {
      this.umbrella = new BaseObj(['/raindrop/umb.png'], false, { x: 100, y: 43 }, { x: 400, y: 340 });
    },
    desc_moveUmbrellaTo: '우산을 움직입니다. x좌표를 인자로 받습니다.',
    moveUmbrellaTo: (x: number) => {
      this.umbrella!.moveTo(x, this.umbrella!.getLocation().y, duration);
    },
    desc_randomTravelerMove: '여행자를 랜덤으로 움직입니다. 움직일 x좌표를 리턴 값으로 갖습니다.',
    randomTravelerMove: () => {
      const currentX = this.traveler!.getLocation().x;
      const destX = Math.max(Math.min(Math.random()*400 + currentX - 200, 800), 0);
      let travelerMove = this.traveler!.moveTo(destX, this.traveler!.getLocation().y, duration - 50);
      return destX;
    },
  };
  /**
   * @description 단위 frame 동안 game 자체의 controller를 동작시키는 함수
   * @param frameNo 현재의 게임 상태
   * @returns 게임이 끝날 경우 true, 안끝날 경우 false
  */
  public frame = async () => {
    // 외부에 노출되지 않은 controller들을 동작시킴
    // Ex) component 간의 상호작용


    await sleep(duration);
    console.log('gameover: ', this.gameover);
    return this.gameover;
  }

  constructor() {
    this.traveler = null;
    this.umbrella = null;
    this.gameover = undefined;
  }
}
