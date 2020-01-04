export interface GameEntry {
  title: string;
  image: string;
  desc: string;
  id: string;
  stub: string;
  tutorial: string[];
  rating?: number;
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
  Game.add(150, 150, 'character', { hairColor: 'black',  height: 190 });
  Game.add(300, 50, 'character', { hairColor: 'green', height: 190 });
  Game.add(450, 150, 'character', { onGlasses: true, hairColor: 'black', height: 180 });
  Game.add(300, 250, 'character', { onGlasses: true, hairColor: 'red', height: 180 });
}
function init() {
}
function loop(frameNo) {
  Game.bh(frameNo, 'hairColor', 'green');
}`,
  tutorial: [],
  rating: 2
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
  rating: 4
};

const shoot = {
  title: '대포쏘기',
  image: 'http://fetch.rigvedawiki.net/f/_cache/fetchfile/a/a9/a9e86ebf886bacc54d434559c3080394.w480.jpeg',
  id: 'shoot',
  desc: '대포로 과녁을 맞추세요',
  stub: `function setup() {
  setGame("shoot");
}
function init() {
  logger.log(Game.getTarget());
}
function loop() {
  const y = Game.getTarget().y;
  Game.setVelocity(10,  (500-y)/45);
}`,
tutorial: [],
rating: 2
};

const factory = {
  title: '공장 (튜토리얼)',
  image: 'https://t1.daumcdn.net/cfile/tistory/2342F34C5965A32807',
  id: 'factory',
  desc: '불량 컴퓨터를 찾아내세요',
  stub: `function setup() {
  setGame("factory");
  logger.dir(Game);
}
function init() {
  alert('init 함수!');
}
function loop() {
  let correctCount = 0;
  // 컴퓨터 함수
  const func = Game.getFunction();
  // 컴퓨터의 종류 (plus 또는 minus)
  const type = Game.getType();
  // 필요한 정확도 (확률, 0 ~ 1)
  const sn = Game.getScoreNeeded();
  // 20번 테스트해 정확도를 측정
  for(let i=0; i<20; i++) {
    const ret = func(1, 1);
    if (type === 'plus') correctCount += (ret===2)?1:0;
    else correctCount += (ret===0)?1:0;
  }
  // 불량 판정을 전송
  Game.sendResult((correctCount/20)>=sn);
}`,
tutorial: [
`재미쉽 (JamiShip)에서는 재밌고 쉽게 자바스크립트 코딩을 연습할 수 있습니다.<br>
각 학습 페이지마다 상황이 주어지고, 주어진 함수를 이용해서 문제를 해결해야 합니다.<br>
작성하는 코드는 세개의 함수로 이루어져 있습니다.<br><br>
setup: 문제 환경을 설정합니다.<br>
init: 처음 시작할 때 실행되는 함수입니다.<br>
loop: 매 프레임마다 실행되는 함수입니다.<br><br>
정의된 세가지 함수 뿐만 아니라 새로운 함수나 전역변수도 얼마든지 지정해 사용할 수 있습니다. <br>
<br>
다음 페이지로 넘어가세요..
`,
`이번 학습에서 여러분은 컴퓨터 공장의 직원입니다.<br>
이 공장에서는 덧셈을 하는 컴퓨터와 뺄셈을 하는 컴퓨터를 생산합니다.<br>
컴퓨터는 함수 형태로 주어지며, 여러분은 컴퓨터의 연산 정확도를 측정해 불량을 판정해야 합니다.<br>
<br>
컴퓨터, 컴퓨터의 종류와 필요한 정확도가 함수로 주어집니다. 주어진 컴퓨터가 불량인지를 boolean으로 반환하세요.<br>
<br>
모든 함수는 Game 오브젝트를 통해 주어집니다. logger.dir(Game)을 실행하면 사용 가능한 함수들을 확인할 수 있습니다.<br>
<br>
이번 학습은 튜토리얼이기 때문에 답안 코드가 이미 주어져 있습니다. 코드를 바꾸면서 가지고 놀아 보세요.<br>
하단의 새로고침 버튼을 누르고, 실행 버튼을 누르면 코드가 실행됩니다.
`
],
rating: 1
};

export const GameDisplay: GameEntry[] = [
  factory,
  sonbeonghoGame,
  raindrop,
  shoot,
  playground,
];

export const EmptyGame = playground;
