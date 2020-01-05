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
  tutorial: [
    `손병호 게임을 해볼까요?<br>
    게임에 생소한 사람이라도 금방 할 수 있을겁니다! 정말 쉽거든요!<br>
    누군가가 '~한 사람 접어'라고 말하면 그 특징을 가진 사람은 손가락을 접으면 됩니다.<br>
    재미쉽에서의 손병호 게임은 조금 독특합니다! 목숨이 단 한게입니다.<br>
    손병호 게임을 진행하기 위한 함수는 다음과 같습니다.<br>
    add: 사람을 원하는 좌표에 원하는 특성으로 추가합니다.<br>
    bh: 지정한 특성을 가진 사람을 탈락시킵니다.<br>
    add함수와 bh함수를 통해 조절할 수 있는 요소는 3가지입니다. 안경의 유무, 머리 색깔(검은색, 빨간색, 초록색), 키<br>
    `,
    `첫번째로 추가한 사람이 자기 자신이 되며, 자기 자신을 제외한 한 사람을 탈락시키면 성공입니다!<br>
    우리 한번 모두를 탈락시키고 우승자가 되어볼까요?
    `,
  ],
  rating: 2
};

const raindrop = {
  title: '우산씌워주기',
  image: 'https://www.miracle-recreation.com/content/uploads/2018/11/Image-Header_Park.jpg',
  id: 'raindrop',
  desc: '귀여운 고양이가 비를 피할 수 있도록 도와주세요.',
  stub: `function setup() {
  setGame("raindrop");
}

function init() {
  Game.addTraveler();
  
}

function loop() {
  for (let i = 0 ; i < 15; i +=1) {
    Game.addRaindrop(Math.random()*1000, Math.random()*10 + 10);
  }
  Game.randomTravelerMove();
}`,
tutorial: [`랜덤으로 내리는 비와 랜덤으로 움직이는 고양이가 있습니다..<br>
우산을 하나 생성해서 고양이의 움직임을 따라 우산이 함께 움직이도록 해서 고양이가 비를 피할 수 있도록 도와주세요<br>
randomTravelerMove 함수는 고양이가 이동할 위치의 x좌표를 리턴합니다.
코드를 수정해서 고양이가 비를 피할 수 있도록 도와주세요!
`],
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
tutorial: [`게임의 룰은 간단합니다.<br>
포탄은 왼쪽 아래에서 발사되고, 오른쪽에 있는 과녁을 맞추면 됩니다.<br>
지금 작성되어 있는 코드는 높이 있는 과녁밖에 맞추지 못합니다.
코드를 수정해서 전부 맞출 수 있도록 고쳐주세요!
`],
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
