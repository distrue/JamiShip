export interface GameEntry {
  title: string;
  image: string;
  desc: string;
  id: string;
  stub: string;
  tutorial: string[];
}

const playground = {
  title: '플레이그라운드',
  image: 'https://www.miracle-recreation.com/content/uploads/2018/11/Image-Header_Park.jpg',
  id: 'playground',
  desc: '아무거나 하세요',
  stub: `function setup() {
setGame("circle");
}
function init() {

}
function loop() {

}`,
  tutorial: [],
};

const sonbeonghoGame = {
  title: '손병호',
  image: 'https://www.miracle-recreation.com/content/uploads/2018/11/Image-Header_Park.jpg',
  id: 'sonbeonghoGame',
  desc: '손병호 게임',
  stub: `function setup() {
  setGame("sonbeong");
  Game.add(150, 200, 'character', { hairColor: 'black',  height: 190 });
  Game.add(300, 100, 'character', { hairColor: 'green', height: 190 });
  Game.add(450, 200, 'character', { onGlasses: true, hairColor: 'black', height: 180 });
  Game.add(300, 300, 'character', { onGlasses: true, hairColor: 'red', height: 180 });
}
function init() {
}
function loop(frameNo) {
  Game.bh(frameNo);
}`,
  tutorial: [],
};

export const GameDisplay: GameEntry[] = [
  playground,
  sonbeonghoGame,
];

export const EmptyGame = playground;
