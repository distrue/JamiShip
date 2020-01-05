# JamiShipJS - Demo

JavaScript cli로 조작하는 lightweight JS 모듈 **JamiShip**을 활용하여, 
web 상에서 JavaScript 실전 지식을 익힐 수 있는 playground를 구성한 demo 입니다.

![1](https://user-images.githubusercontent.com/15315949/71773177-cdf45680-2f9b-11ea-82cd-4b9d0304b1fd.png)

본 demo에 사용된 engine인 JamiShip은 [npm](https://www.npmjs.com/package/jamiship)에 등록되어 있습니다.
``` sh
$ npm install jamiship@latest
```
----

고카톤 해커톤의 단시간 동안 동안 7개의 problem을 수준별로 구성하였습니다. 
JamiShip 모듈의 장점은 다음과 같습니다.

#### 1. canvas를 활용, 외부 dependency가 없는 lightweight animation engine
* vanilla JS로 구성하여 외부 dependency가 없으며, 높은 frame ( ~ 60 fps)에서도 component 동작이 매끄러움을 보입니다.

#### 2. javascript 코드를 통한 모듈화 가능, `customizable D3.js`의 형식
* `D3.js`의 형식을 차용하면서도, 별도의 component를 import 할 수 있는 형식으로 작업이 반복될 수록 모듈을 통한 생산성 향상에 도움이 되도록 합니다.
``` md
├── pages
│   ├── index.tsx
│   └── **learn**
├── JamiShip
│   └── ...
├── games
│   ├── <BoardName>
│       ├── index.ts
│       └── component.ts
```
* game(Board) > Component(canvas)의 위상으로 구성되어 있으며, 아래와 같은 class들로 구성되어 있습니다.
``` js
// game(Board)
export class CircleGame implements types.Game<CircleGameApi> {
  // component 집합
  private circles: any[] = [];
  // 외부에서 접근할 수 있는 API
  public controllers = { }
  // Frame 별로 component 내부에서 작동, 외부에서 접근할 수 없는 private 요소도 접근
  public frame = async () => { }
  // Board에 최초로 들어갈 component들을 정의
  constructor() { }
}
```
``` js
export class BaseObj {
  // component의 특성들
  private canvas: HTMLCanvasElement;
  private srcs: string[];
  private ctx: CanvasRenderingContext2D;
  ...

  // component create
  constructor() { }

  // component 조작 method
  addSrc(src: string) { }
  delete() { }
  renewInnerRect() { }
  ...

  // component 간 상호작용 감지
  moveToWithCheckBump() { };
  moveTo() { }
  
  // 등장, 제거
  clear() { }
  draw() { }
}
```

#### 3. React에 쉽게 addable한 component들로 구성됨
다음과 같은 config 만으로 add가 가능합니다.
``` jsx
import React from 'react';

// 모듈 import
import { CircleGame } from '../../games/circleGame';
import { SBHGame } from '../../games/sonbeonghoGame';
...
const GAMES = {
  circle: CircleGame,
  sonbeong: SBHGame,
  ...
};

// Ex1) React Hooks
export default function NamePage() {
  /// JamiShip 엔진 로드
  const { start, compile } = useEngine(GAMES);

  // Optional: web에 CLI를 노출하는 경우!
  const [code, setCode] = useState('');
  const [codeObj, setCodeObj] = useState<types.UserCode | null>(null);
  
  React.useEffect(() => {
    // game(board) 선택
    const currentGame = GameDisplay.filter((x) => (x.id === 'circle'))[0];
    // 해당 페이지의 기본 문제 로드
    setCode(currentGame.stub);
  }, []);

// run 명령어
const startHandler = () => {
    compileHandler();
    start(logger, codeObj).then(() => setCallee(!callee)).catch(() => { });
    setExecuted(true);
};

// compile 명령어
const compileHandler = () => {
    compile(setCodeObj, logger, code);
    setExecuted(false);
};

  return (
    <>
        <div id="canvas-container" />
        <div className="compile" onClick={compileHandler}/>
        <div className="run" onClick={startHandler}/>        
        {/* Optional: 코드를 web에서 수정하는 경우 */}
        <CodeEditor className="cli" onChange={setCode} value={code} />
        ...
    </>
  );
}
```

#### 4. 외부 노출형 CLI 구성, 편리한 조작/수정을 제공함
* 단순히 정해진 rule로 animation 만을 구성하는 것 뿐 아니라, 본 demo인 playground처럼 web UI 단에서도 코드를 수정할 수 있습니다.
더욱 편리한 engine 사용이 가능합니다.
![2](https://user-images.githubusercontent.com/15315949/71773191-2deafd00-2f9c-11ea-8357-f585d3f1ae24.png)
![3](https://user-images.githubusercontent.com/15315949/71773192-2deafd00-2f9c-11ea-8c73-d90cf63a1030.png)

----

* repo에 대한 의견, issue, report를 환영합니다!
* MIT license를 따릅니다.

##### Team WaaS
정연길, 장우혁, 노정훈, 윤준혁, 정호진
