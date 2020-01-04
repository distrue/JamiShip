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
  Game.add(150, 200, 'character', { hairColor: 'black',  height: 190 });
  Game.add(300, 100, 'character', { hairColor: 'green', height: 190 });
  Game.add(450, 200, 'character', { onGlasses: true, hairColor: 'black', height: 180 });
  Game.add(300, 300, 'character', { onGlasses: true, hairColor: 'red', height: 180 });
  logger.dir(Game);
}
function init() {
}
function loop(frameNo) {
  Game.bh(frameNo);
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
  Game.addRaindrop(500, 10);
  Game.addRaindrop(200, 5);
  Game.addRaindrop(400, 5);
  Game.addTraveler();
  Game.randomTravelerMove();
  for (let i = 0 ; i < 10; i +=1) {
    Game.addRaindrop(Math.random()*1000, Math.random()*10);
  }
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
