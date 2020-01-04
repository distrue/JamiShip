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

export const GameDisplay: GameEntry[] = [
  playground,
];

export const EmptyGame = playground;