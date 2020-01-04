import { BaseObj } from './component';

export default interface Game<T> {
  controllers: T;
  frame: (frameNo: number) => Promise<boolean>;
};

type filters = 'hairColor' | 'onGlasses' | 'height';

interface SBHGameApi {
  add: (x: number, y: number, objterm: string, traits: any) => unknown;
  bh: (frameNo: number, type: filters, value: string) => unknown;
};

export class SBHGame implements Game<SBHGameApi> {
  private people: any[] = [];
  private hairs: any[] = [];
  private glasses: any[] = [];

  public controllers = { // export controllers
    add: (x: number, y: number, objterm: string, traits: any) => {
      const person = new BaseObj(
        [`/imgs/${objterm}.png`],
        '',
        { x: 50, y: 80 },
        x && y ? { x, y } : undefined,
      );
      this.people.push(person);

      if(traits.hairColor) {
        const hair = new BaseObj(
          [`/imgs/hair_${traits.hairColor}.png`],
          '',
          { x: 50, y: 80 },
          x && y ? { x, y } : undefined,
        );
        this.hairs.push(hair);
      }
      if(traits.onGlasses) {
        const glass = new BaseObj(
          [`/imgs/glass.png`],
          '',
          { x: 50, y: 80 },
          x && y ? { x, y } : undefined,
        );
        this.glasses.push(glass);
      }
      if(traits.height) {
        console.log(traits.height);
        const hair = new BaseObj(
          [],
          traits.height,
          { x: 70, y: 80 },
          x && y ? { x, y } : undefined,
        );
        this.hairs.push(hair);
      }
    },
    bh: (frameNo: number, type?: filters, value?: string) => {
      console.log(type!, value!);
      if(frameNo < this.people.length) {
        this.people[frameNo].addSrc(`/imgs/dead.png`);
        this.people[frameNo].draw();
        this.people[0].addSrc(`/imgs/dead.png`);
        this.people[0].draw();
      }
    }
  };
  /**
   * @description 단위 frame 동안 game 자체의 controller를 동작시키는 함수
   * @param frameNo 현재의 게임 상태
   * @returns 게임이 끝날 경우 true, 안끝날 경우 false
  */
  public frame = async (frameNo: number) => {
    // 외부에 노출되지 않은 controller들을 동작시킴
    // Ex) component 간의 상호작용

    /* const [testBase, testBase2] = this.people;
    const pms = [
      testBase.moveToWithCheckBump([testBase2], 550, 200, 1000).then(() => testBase2.moveToWithCheckBump([testBase], 700, 120, 2000))
        .then(() => testBase.moveToWithCheckBump([testBase2], 400, 170, 1500)).then(() => testBase2.moveToWithCheckBump([testBase], 300, 200, 200)),
      testBase2.moveToWithCheckBump([testBase], 450, 250, 1000).then(() => testBase.moveToWithCheckBump([testBase2], 200, 10, 2000))
        .then(() => testBase2.moveToWithCheckBump([testBase], 100, 140, 1500)).then(() => testBase.moveToWithCheckBump([testBase2], 300, 200, 200)),
    ];
    await Promise.all(pms); */
    if(frameNo < 3) return true;
    return false;
  }

  constructor() {
    this.people = [];
    // this.controllers.add(100, 100);
  }
}
