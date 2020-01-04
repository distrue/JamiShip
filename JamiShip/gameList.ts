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
setGame("son");
}
function init() {
  people = new People();
  people.createPerson('p1');
  people.createPerson('p2', { onGlasses: true, hairColor: 'black', height: 180 });
  people.createPerson('p3', { hairColor: 'brown', height: 190 });
  people.createPerson('p4', { onGlasses: true, hairColor: 'red', height: 180 });
}
function loop() {

}`,
  tutorial: [],
};

export const GameDisplay: GameEntry[] = [
  playground,
  sonbeonghoGame,
];

export const EmptyGame = playground;
