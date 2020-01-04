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
  tutorial: ["플레이그라운드입니다. 원하는 대로 코드를 작성해보세요!"],
};

const sonbeonghoGame = {
  title: '손병호',
  image: 'https://www.miracle-recreation.com/content/uploads/2018/11/Image-Header_Park.jpg',
  id: 'sonbeonghoGame',
  desc: '손병호 게임',
  stub: `function setup() {
setGame("sonbeong");
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

const raindrop = {
  title: '비내리기',
  image: 'https://www.miracle-recreation.com/content/uploads/2018/11/Image-Header_Park.jpg',
  id: 'raindrop',
  desc: '비를 내려 고양이를 목욕시키세요',
  stub: `function setup() {
  setGame("raindrop");
}

function init() {

}

function loop() {

}`,
  tutorial: [],
};

export const GameDisplay: GameEntry[] = [
  playground,
  sonbeonghoGame,
  raindrop,
];

export const EmptyGame = playground;