import { types } from 'jamiship';
import { BaseObj } from './component';

type filters = 'hairColor' | 'onGlasses' | 'height';

interface SBHGameApi {
  add: (x: number, y: number, objterm: string, traits: any) => unknown;
  bh: (frameNo: number, type: filters, value: string) => unknown;
  desc_add: string
}

export class SBHGame implements types.Game<SBHGameApi> {
  private people: any[] = [];

  public controllers = { // export controllers
    desc_add: 'trait에 따라 모습이 달라지는 새로운 class person을 생성합니다.',
    add: (x: number, y: number, objterm: string, traits: any) => {
      const person = new BaseObj(
        [`/imgs/${objterm}.png`],
        '',
        { x: 80, y: 120 },
        x && y ? { x, y } : undefined,
      );

      if (traits.hairColor) {
        person.addSrc(`/imgs/hair_${traits.hairColor}.png`);
      }
      if (traits.onGlasses) {
        person.addSrc('/imgs/glass.png');
      }
      if (traits.height) {
        person.setHeight(traits.height);
      }
      this.people.push(person);
      person.draw();
    },
    desc_bh: '자기 자신과, frame에 맞는 상대방을 쓰러트릴 수 있는 기준을 설정해 공격합니다.',
    bh: (frameNo: number, type?: filters, value?: string) => {
      console.log(type!, value!);
      if (frameNo <= this.people.length) {
        if (type && value) {
          if (type === 'hairColor' || type === 'onGlasses') {
            if (this.people[frameNo - 1].srcs.join('').indexOf(value) !== -1) {
              this.people[frameNo - 1].addSrc('/imgs/dead.png');
              this.people[frameNo - 1].draw();
              return true;
            }
          } else if (type === 'height') {
            if (this.people[frameNo - 1].innerText === value) {
              this.people[frameNo - 1].addSrc('/imgs/dead.png');
              this.people[frameNo - 1].draw();
              return true;
            }
          }
        } else {
          this.people[frameNo - 1].addSrc('/imgs/dead.png');
          this.people[frameNo - 1].draw();
        }
        return false;
      }
      return false;
    },

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
    if (frameNo < 3) return undefined;
    return true;
  }

  constructor() {
    this.people = [];
    // this.controllers.add(100, 100);
  }
}
