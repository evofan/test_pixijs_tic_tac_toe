console.log("test_pixijs_tic_tac_toe!");

import * as PIXI from "pixi.js";
import { Assets, Sprite } from 'pixi.js';

import { STAGES } from "./constants";
import { displayDateText } from "./helper/text";
import { randomInt } from "./helper/randomInt";

// PIXI.useDeprecated();

/* ステージの横幅・縦幅・背景色を定数群から取得 */
const WIDTH = STAGES.WIDTH;
const HEIGHT = STAGES.HEIGHT;
const BG_COLOR = STAGES.BG_COLOR;

/* 後々デバイスピクセル比でサイズを変える為に比率を取得 */
console.log("window.devicePixelRatio: ", window.devicePixelRatio); // window.devicePixelRatio:  2

/* 初期化 */

// init
let app = new PIXI.Application({
	width: WIDTH,
	height: HEIGHT,
	backgroundColor: BG_COLOR,
	// resolution: window.devicePixelRatio || 1,
	autoResize: true
});
document.body.appendChild(app.view);

// container
let container = new PIXI.Container();
container.width = WIDTH;
container.height = HEIGHT;
container.x = 0;
container.y = 0;
container.pivot.x = 0.5;
container.pivot.y = 0.5;
// container.interactive = false;
// container.interactiveChildren = true;
// PixiJS Deprecation Warning: Setting interactive is deprecated, use eventMode = 'none'/'passive'/'auto'/'static'/'dynamic' instead.Deprecated since v7.2.0
container.buttonMode = false;
app.stage.addChild(container);

/* PiXIJSのver表記 */
let temp = `PixiJS Ver:`;
console.log(temp);
let text1 = new PIXI.Text(temp, {
	fontSize: 30,
	fill: 0xfefefe,
	lineJoin: "round"
});
container.addChild(text1);
text1.anchor.set(0.5);
text1.x = WIDTH / 2 - 40;
text1.y = HEIGHT / 2 - 10;

let temp2 = `${PIXI.VERSION}`;
console.log(temp2);
let text2 = new PIXI.Text(temp2, {
	fontSize: 40,
	fill: 0xff0033,
	lineJoin: "round"
});
container.addChild(text2);
text2.anchor.set(0.5);
text2.x = WIDTH / 2 + text1.width - 50;
text2.y = HEIGHT / 2 - 10;

let image2;
let image3;
let image4;
let image5;
// let image_bl_1;
// let image_bl_2;
// let image_bl_3;
// let image_bl_4;
// let image_bl_5;
// let image_bl_6;
// let image_bl_7;
// let image_bl_8;
// let image_bl_9;
// let image_wh_1;
// let image_wh_2;
// let image_wh_3;
// let image_wh_4;
// let image_wh_5;
// let image_wh_6;
// let image_wh_7;
// let image_wh_8;
// let image_wh_9;
let loadingEnd = false;

let img_bl = []; // 黒石
let img_wh = []; // 白石

let temp1;

// Load image and Set sprite
const LoadImg = async () => {
	console.log("LoadImg()");

	console.log(app);
	console.log(app.stage);
	console.log(this); // undefined
	console.log(container);


	// 背景の木
	const texture2 = await Assets.load('assets/images/pic_wood.png');
	image2 = Sprite.from(texture2);
	console.log(texture2); // Texture {_events: Events, _eventsCount: 0, noFrame: true, baseTexture: _BaseTexture, _frame: Rectangle, …}
	console.log(image2); // Sprite {_events: Events, _eventsCount: 0, tempDisplayObjectParent: null, transform: _Transform, alpha: 1, …}
	// image2.anchor.set(0.5);
	image2.x = 1;
	image2.y = 1;
	// image1.scale.set(0.5, 0.5);
	container.addChild(image2);

	console.log("image2"); // undefined
	console.log(image2); // Sprite {_events: Events, _eventsCount: 0, tempDisplayObjectParent: null, transform: _Transform, alpha: 1,
	console.log(image2.parent); // _Container2 {_events: Events, _eventsCount: 0, 

	// 升目
	const texture3 = await Assets.load('assets/images/pic_board.png');
	image3 = Sprite.from(texture3);
	console.log(texture3); // Texture {_events: Events, _eventsCount: 0, noFrame: true, baseTexture: _BaseTexture, _frame: Rectangle, …}
	console.log(image3); // Sprite {_events: Events, _eventsCount: 0, tempDisplayObjectParent: null, transform: _Transform, alpha: 1, …}
	// image3.anchor.set(0.5);
	image3.x = 1;
	image3.y = 80;
	// image1.scale.set(0.5, 0.5);
	container.addChild(image3);

	// 白の石
	const texture4 = await Assets.load('assets/images/pic_white_piece.png');
	image4 = Sprite.from(texture4);
	console.log(texture4); // Texture {_events: Events, _eventsCount: 0, noFrame: true, baseTexture: _BaseTexture, _frame: Rectangle, …}
	console.log(image4); // Sprite {_events: Events, _eventsCount: 0, tempDisplayObjectParent: null, transform: _Transform, alpha: 1, …}
	image4.anchor.set(0.5);
	image4.x = 65;
	image4.y = 135;
	// image1.scale.set(0.5, 0.5);
	container.addChild(image4);

	// 黒の石
	const texture5 = await Assets.load('assets/images/pic_black_piece.png');
	image5 = Sprite.from(texture5);
	console.log(texture5); // Texture {_events: Events, _eventsCount: 0, noFrame: true, baseTexture: _BaseTexture, _frame: Rectangle, …}
	console.log(image5); // 5Sprite {_events: Events, _eventsCount: 0, tempDisplayObjectParent: null, transform: _Transform, alpha: 1, …}
	image5.anchor.set(0.5);
	image5.x = 165;
	image5.y = 235;
	// image1.scale.set(0.5, 0.5);
	container.addChild(image5);

	// 黒い駒9個
	for(let i = 0; i <= 8; i++){
		// temp1 = `image_bl_${i}`;
		// temp1 = Sprite.from(texture5);
		// temp1.anchor.set(0.5);
		// temp1.x = i * 30;
		// temp1.y = i * 30 + 80;
		// container.addChild(temp1);
		img_bl[i] = Sprite.from(texture5);
		img_bl[i] .anchor.set(0.5);
		img_bl[i] .x = i * 30;
		img_bl[i] .y = i * 30 + 80;
		container.addChild(img_bl[i]);
	}

	// 白い駒9個
	for(let i = 0; i <= 8; i++){
		img_wh[i] = Sprite.from(texture4);
		img_wh[i] .anchor.set(0.5);
		img_wh[i] .x = i * 40;
		img_wh[i] .y = i * 40 + 100;
		container.addChild(img_wh[i]);
	}

	console.log(this);

	next();
}

LoadImg(this);

// RandomInt test
let dice = randomInt(1, 6);
console.log("dice no: ", dice);

const next = () => {
	console.log("next()");
	// loading end flag
	loadingEnd = true;

	init();

}

// 日付表示
// let today = displayDateText(app);

// Ticler
app.ticker.add(() => {

	console.log("tick...");
	// if (loadingEnd) {
	//     image1.x = image1.x + 1;
	//     if (image1.x >= WIDTH + image1.width / 2) {
	//         image1.x = -image1.width / 2;
	//     }
	// }

	startMain();

});

/* 三目並べ用の変数設定 */
let boxNo;

let pl_gotoX;
let pl_gotoY;

let cp_gotoX;
let cp_gotoY;

// 個別function内のvar変数だとローカルでアクセス出来ないので
let line1Total;
let line2Total;
let line3Total;
let line4Total;
let line5Total;
let line6Total;
let line7Total;
let line8Total;

let line1Reach;
let line2Reach;
let line3Reach;
let line4Reach;
let line5Reach;
let line6Reach;
let line7Reach;
let line8Reach;

let line1;
let line2;
let line3;
let line4;
let line5;
let line6;
let line7;
let line8;

let statusNum = 0;

// ■■ 石を画面からどかす（スタート時に端に）// 石をどかす時の参照mc用
let target_mc; //: MovieClip;
let target_mc02; //: MovieClip;

// ■■ 先攻後攻決める（この場合RNDで）// 先攻後攻決定用
let beforeAfter; //: Number;
let yourMove; //: Boolean;

// ■■ ラインが揃ったかの判別（各ラインTotalで、+3＝Player勝ち、-3＝CPU勝ち）// 勝ち負け判別用
let clearLineFlag = 0; // 0:揃ってない、1:人間勝ち、-1:CPU勝ち

// ■■ 石を9個置き終わったか判別
let placeStoneAll; //: Boolean;s

let initEnd = false;

let t = app.stage;


const init = () => {
	console.log("init()");

	boxNo = [0, 0, 0, 0, 0, 0, 0, 0,]; // 升目の値、0=石未設置、1=自分が石設置、-1=CPUが石設置

	pl_gotoX = [15, 120, 220, 15, 120, 220, 15, 120, 220]; // 自分が石を設置する時のx座標（0～8）
	pl_gotoY = [80, 80, 80, 180, 180, 180, 290, 290, 290]; // 自分が石を設置する時のy座標（0～8）

	cp_gotoX = [100, 200, 300, 100, 200, 300, 100, 200, 300]; // CPUが石を設置する時のx座標（0～8）
	cp_gotoY = [60, 60, 60, 160, 160, 160, 260, 260, 260]; // CPUが石を設置する時のy座標（0～8）

	// ラインが揃ったかどうかの判別用（9ライン分）
	line1Reach = [0, 1, 2]; // 上―
	line2Reach = [3, 4, 5]; // 中―
	line3Reach = [6, 7, 8]; // 下―
	line4Reach = [0, 3, 6]; // 左｜
	line5Reach = [1, 4, 7]; // 中｜
	line6Reach = [2, 5, 8]; // 右｜
	line7Reach = [0, 4, 8]; // ＼
	line8Reach = [6, 4, 2]; // ／

	// ラインが9個揃ったか判別用（合計3～-3）
	line1 = [boxNo[0], boxNo[1], boxNo[2]]; // line1(0,1,2) 上―
	line2 = [boxNo[3], boxNo[4], boxNo[5]]; // line2(3,4,5) 中―
	line3 = [boxNo[6], boxNo[7], boxNo[8]]; // line3(6,7,8) 下―
	line4 = [boxNo[0], boxNo[3], boxNo[6]]; // line4(0,3,6) 左｜
	line5 = [boxNo[1], boxNo[4], boxNo[7]]; // line5(1,4,7) 中｜
	line6 = [boxNo[2], boxNo[5], boxNo[8]]; // line6(2,5,8) 右｜
	line7 = [boxNo[0], boxNo[4], boxNo[8]]; // line7(0,4,8) ＼
	line8 = [boxNo[6], boxNo[4], boxNo[2]]; // line8(6,4,2) ／

	//□□メイン用各命令処理フラグ ※state番号
	statusNum = 0;

	initEnd = true;
	// startMain();

}

// const startMain = () => {
// 	console.log("startMain()");

// 	if(initEnd){
// 		console.log("ステート監視開始");
// 	}

// }

const startMain = () => {

	if (initEnd) {
		console.log("ステート監視開始");
	} else {
		return false;
	}

	console.log("statusNum:" + statusNum); // 現在のステータス番号表示

	if (statusNum === 0) {
		// ■■ 石を盤上からどかす（スタート時に端に）
		statusNum = -1;
		console.log("statusNum === 0");
		// console.log(temp1); // Sprite
		// console.log(image_bl_1); // undefined
		// temp1.x = 100;
		// temp1.y = 300;
		// img_bl[0].x = 100; // ok
		// img_bl[1].y = 300; //ok 
		//image_bl_1.x = 100;
		//image_bl_1.y = 300;
		removeStone();
		statusNum = 1;
	}

	if (statusNum === 1) {
		// ■■ 先攻後攻決める（この場合RNDで）
		statusNum = -1;
		// beforeOrAfter(); // console.log("yourMove:"+yourMove); // true:人間が先攻、false：CPUが先攻
		statusNum = 2;
	}

	if (statusNum === 2) {
		statusNum = -1;
		// ■■ラインが揃ったかの判別（各ラインTotalで、+3＝Player勝ち、-3＝CPU勝ち）
		// clearLineCheck();
		// if (clearLineFlag == 1) { gotoAndPlay(3) }//player勝利
		// else if (clearLineFlag == -1) { gotoAndPlay(4) }//cpu勝利
		// else { statusNum = 3 }
	}

	if (statusNum === 3) {
		statusNum = -1;
		// ■■ 石を9個置き終わったか判別
		// console.log("placeStoneAll:"+placeStoneAll); // false
		// placeStoneAllCheck();
		// console.log("placeStoneAll:"+placeStoneAll); // false or true
		// if (placeStoneAll == true && clearLineFlag == 0) { gotoAndPlay(2) } // trueで終了（引き分け）処理
		// else { statusNum = 4; }
	}

	if (statusNum === 4 && yourMove === true) {
		statusNum = -1;
		// ■■ プレイヤーの手番
		// playerTurn();
	} else if (statusNum === 4 && yourMove === false) {
		// ■■ CPU手番
		statusNum = -1;
		// cpuTurn();
	}

	if (statusNum === 5) {
		// ■■上記以外の処理
		statusNum = -1;
		console.log("★！★通常ここには来ない！");
	}

}


// ■■■ サブルーチン ■■■ //-----------------------------------------------------------------------------------------
// ※外部.jsに分割する？ →　※最終的に

// ■■ 石を画面からどかす（スタート時に端に）
// function removeStone() {
const removeStone = () => {
	for (let i = 0; i <= 8; i++) {
		// // target_mc = MovieClip(getChildByName("pl" + i)); // playerの石、※MC名で参照 → Sprite名？で参照に
		// let target_bl = _Container2[`image_bl_${i}`];
				// target_mc = MovieClip(getChildByName("pl" + i)); // playerの石、※MC名で参照 → Sprite名？で参照に
		// let target_bl = image_bl_1;
		// console.log("target_mc.name:" + target_mc.name); // target_mc.name:pl0～target_mc.name:pl8
		
		// 黒石を画面外に
		img_bl[i].x = -500;
		img_bl[i].y = -500;

		// 白石を画面外に
		img_wh[i].x = -500;
		img_wh[i].y = -500;


		// target_mc02 = MovieClip(getChildByName("cp" + i)); // cpu石
		// let target_wh = `image_wh_${i}`
		// console.log(target_mc02.name);
		//target_wh.x = -50;
		//target_wh.y = 400;
	}
}

// ■■ 先攻後攻決める（RNDで）※returnを値で返して代入にする？
// function beforeOrAfter() {
// const beforeOrAfter = () => {
// 	beforeAfter = Math.floor(Math.random() * 2 + 1);
// 	if (beforeAfter == 1) {
// 		yourMove = true; // 人間先攻
// 	} else {
// 		yourMove = false; // CPU先攻
// 	}
// }

// ■■ ラインが揃ったかの判別（各ラインTotalの値で、+3＝Player勝ち、-3＝CPU勝ち）
// function clearLineCheck(): void {
// const clearLineCheck = () => {
// 	console.log("▲▲▲clearLineCheck▲▲▲"); // ▲▲▲clearLineCheck▲▲▲
// 	console.log("▲this:" + this); // ▲this:[object MainTimeline] -> 
// 	console.log("▲：" + line1[0]);
// 	console.log("▲▲：" + MainTimeline); // ▲▲：[class MainTimeline] -> 
// 	// ラインが9個揃ったか判別用（合計3～-3）
// 	line1 = [boxNo[0], boxNo[1], boxNo[2]]; // line1(0,1,2)上―
// 	line2 = [boxNo[3], boxNo[4], boxNo[5]]; // line2(3,4,5)中―
// 	line3 = [boxNo[6], boxNo[7], boxNo[8]]; // line3(6,7,8)下―
// 	line4 = [boxNo[0], boxNo[3], boxNo[6]]; // line4(0,3,6) //左｜
// 	line5 = [boxNo[1], boxNo[4], boxNo[7]]; // line5(1,4,7) //中｜
// 	line6 = [boxNo[2], boxNo[5], boxNo[8]]; // line6(2,5,8) //右｜
// 	line7 = [boxNo[0], boxNo[4], boxNo[8]]; // line7(0,4,8) //＼
// 	line8 = [boxNo[6], boxNo[4], boxNo[2]]; // line8(6,4,2) //／
// 	//↑★mustここでもう1回代入しないと反映されない（AS時）

// 	//（1）各ラインの合計算出、※関数にしてfor文で？

// 	// line1(0,1,2) 上―
// 	line1Total = line1[0] + line1[1] + line1[2];
// 	console.log("1ライン目：" + line1[0], line1[1], line1[2] + "→合計：" + line1Total); // 1ライン目：1 1 1 → 合計：3
// 	//trace(typeof line1Total);//number、//trace(typeof Array);//object

// 	// line2(3,4,5) 中―
// 	line2Total = line2[0] + line2[1] + line2[2];
// 	console.log("2ライン目：" + line2[0], line2[1], line2[2] + "→合計：" + line2Total); // 2ライン目：0 0 0 → 合計：0

// 	// line3(6,7,8) 下―
// 	line3Total = line3[0] + line3[1] + line3[2];
// 	console.log("3ライン目：" + line3[0], line3[1], line3[2] + "→合計：" + line3Total); // 3ライン目：0 0 0 → 合計：0

// 	// line4(0,3,6) // 左｜
// 	line4Total = line4[0] + line4[1] + line4[2];
// 	console.log("4ライン目：" + line4[0], line4[1], line4[2] + "→合計：" + line4Total); // 4ライン目：0 0 0 → 合計：0

// 	// line5(1,4,7) // 中｜
// 	line5Total = line5[0] + line5[1] + line5[2];
// 	console.log("5ライン目：" + line5[0], line5[1], line5[2] + "→合計：" + line5Total); // 5ライン目：0 0 0 → 合計：0

// 	// line6(2,5,8) // 右｜
// 	line6Total = line6[0] + line6[1] + line6[2];
// 	console.log("6ライン目：" + line6[0], line6[1], line6[2] + "→合計：" + line6Total); // 6ライン目：0 0 0 → 合計：0

// 	// line7(0,4,8) // ＼
// 	line7Total = line7[0] + line7[1] + line7[2];
// 	console.log("7ライン目：" + line7[0], line7[1], line7[2] + "→合計：" + line7Total); // 7ライン目：0 0 0 → 合計：0

// 	// line8(6,4,2) // ／
// 	line8Total = line8[0] + line8[1] + line8[2];
// 	console.log("8ライン目：" + line8[0], line8[1], line8[2] + "→合計：" + line8Total); // 8ライン目：0 0 0 → 合計：0

// 	//（2）各ラインの判別
// 	for (let j = 1; j <= 8; j++) { // trace("j:"+j);
// 		if (this["line" + j + "Total"] == 3) { // trace("this:"+this);//this:[object MainTimeline]
// 			clearLineFlag = 1;
// 			console.log("●人間の勝ち");
// 			break;
// 		} else if (this["line" + j + "Total"] == -3) {
// 			clearLineFlag = -1;
// 			console.log("●CPUの勝ち");
// 			break;
// 		} else {
// 			console.log(j, "ラインが揃ってないので次のラインへ");
// 			if (j != 8) {
// 				continue; // 全部判別し終わってない場合は抜けないでループ
// 			}
// 			console.log("判別終了、●今回揃ってるラインは無し");
// 			clearLineFlag = 0;
// 		}
// 	}
// }

// ■■ 石を9個置き終わったか判別
// function placeStoneAllCheck(): void/*:Boolean*/ {
// const placeStoneAllCheck = () => {
// 	console.log("▲▲▲placeStoneAllCheck▲▲▲");
// 	//trace("boxNo.length:"+boxNo.length);//boxNo.length:9
// 	for (var i = 0; i <= boxNo.length - 1; i++) {
// 		if (boxNo[i] == 0) {
// 			console.log("埋まって無い所があるので★ゲーム継続★ " + "（埋まってないマス目" + i + "＝" + boxNo[i] + "）");
// 			// 埋まって無い所があるので★ゲーム継続★ （埋まってないマス目0＝0）
// 			placeStoneAll = false;
// 			break;
// 		}
// 		console.log(i, "マス目＝" + boxNo[i]);//0 マス目＝1
// 		if (i == 8) {
// 			console.log("●全部埋まりました、引き分けです ⇒ 終了");
// 			placeStoneAll = true;
// 			break;
// 		}
// 	}
// 	// return placeStoneAll;
// }

// ■■ プレイヤーの手番
// function playerTurn() {
// const playerTurn = () => {
// 	console.log("▲▲▲playerTurn▲▲▲");
// 	var inputNum = -1;
	
// 	// 入力受け付け
// 	stage.addEventListener(Event.ENTER_FRAME, searchMousePosition); // 毎フレームチェック
// 	// 登録は最初の方で一回でOK

// 	// function searchMousePosition(eventobject: Event): void {
// 	let searchMousePosition = (eventobject) => {
// 		//trace(event.target);//[object Stage]
// 		if (mc0.hitTestPoint(stage.mouseX, stage.mouseY, true)) {//trueは実形状、falseは矩形（四角）
// 			hyouji.text = "0枠クリック";
// 			inputNum = 0;
// 			//開放
// 			//stage.removeEventListener(Event.ENTER_FRAME,searchMousePosition);
// 			//hyouji.text = "0枠クリックで終了";
// 		} else if (mc1.hitTestPoint(stage.mouseX, stage.mouseY, true)) {
// 			hyouji.text = "1枠クリック";
// 			inputNum = 1;
// 			//stage.removeEventListener(Event.ENTER_FRAME,searchMousePosition);
// 			//hyouji.text = "1枠クリックで終了";
// 		} else if (mc2.hitTestPoint(stage.mouseX, stage.mouseY, true)) {
// 			hyouji.text = "2枠クリック";
// 			inputNum = 2;
// 			//stage.removeEventListener(Event.ENTER_FRAME,searchMousePosition);
// 			hyouji.text = "2枠クリックで終了";
// 		} else if (mc3.hitTestPoint(stage.mouseX, stage.mouseY, true)) {
// 			hyouji.text = "3枠クリック";
// 			inputNum = 3;
// 			//stage.removeEventListener(Event.ENTER_FRAME,searchMousePosition);
// 			hyouji.text = "3枠クリックで終了";
// 		} else if (mc4.hitTestPoint(stage.mouseX, stage.mouseY, true)) {
// 			hyouji.text = "4枠クリック";
// 			inputNum = 4;
// 			//stage.removeEventListener(Event.ENTER_FRAME,searchMousePosition);
// 			hyouji.text = "4枠クリックで終了";
// 		} else if (mc5.hitTestPoint(stage.mouseX, stage.mouseY, true)) {
// 			hyouji.text = "5枠クリック";
// 			inputNum = 5;
// 			//stage.removeEventListener(Event.ENTER_FRAME,searchMousePosition);
// 			hyouji.text = "5枠クリックで終了";
// 		} else if (mc6.hitTestPoint(stage.mouseX, stage.mouseY, true)) {
// 			hyouji.text = "6枠クリック";
// 			inputNum = 6;
// 			//stage.removeEventListener(Event.ENTER_FRAME,searchMousePosition);
// 			hyouji.text = "6枠クリックで終了";
// 		} else if (mc7.hitTestPoint(stage.mouseX, stage.mouseY, true)) {
// 			hyouji.text = "7枠クリック";
// 			inputNum = 7;
// 			//stage.removeEventListener(Event.ENTER_FRAME,searchMousePosition);
// 			hyouji.text = "7枠クリックで終了";
// 		} else if (mc8.hitTestPoint(stage.mouseX, stage.mouseY, true)) {
// 			hyouji.text = "8枠クリック";
// 			inputNum = 8;
// 			//開放
// 			//stage.removeEventListener(Event.ENTER_FRAME,searchMousePosition);
// 			hyouji.text = "8枠クリックで終了";
// 		} else {
// 			inputNum = -1;
// 			hyouji.text = "枠外をクリック";
// 		}
// 	}

// 	//さらに押した判定も+
// 	stage.addEventListener(MouseEvent.MOUSE_UP, MouseLUpFunc);

// 	// function MouseLUpFunc(eventobject: MouseEvent) {
// 	let MouseLUpFunc = (eventobject) => {
// 		console.log("マウスが離された");
// 		console.log("inputNum:" + inputNum)
// 		//
// 		if (boxNo[inputNum] === 0) {
// 			boxNo[inputNum] = 1;//人間が置いたら1
// 			//★重要★mcのインスタンス名から参照を取得して操作
// 			var target_mc = MovieClip(getChildByName("pl" + inputNum));
// 			console.log(target_mc.name);
// 			target_mc.x = pl_gotoX[inputNum];
// 			target_mc.y = pl_gotoY[inputNum];
// 			console.log(inputNum + "に石を置きました");
// 			stage.removeEventListener(MouseEvent.MOUSE_UP, MouseLUpFunc);//1個置けたらマウスdisablle
// 			stage.removeEventListener(Event.ENTER_FRAME, searchMousePosition);//1個置けたらヒットチェックdisablle
// 			console.log("boxNo0:" + boxNo[0]);//
// 			console.log("boxNo1:" + boxNo[1]);//
// 			console.log("boxNo2:" + boxNo[2]);//石を置いて1にはなってる
// 			console.log("boxNo3:" + boxNo[3]);//
// 			console.log("boxNo4:" + boxNo[4]);//
// 			console.log("boxNo5:" + boxNo[5]);//
// 			console.log("boxNo6:" + boxNo[6]);//
// 			console.log("boxNo7:" + boxNo[7]);//
// 			console.log("boxNo8:" + boxNo[8]);//
// 			//■CPUの手番へ
// 			//statusNum=4;
// 			yourMove = false;
// 			//★勝敗・終了判別へ
// 			statusNum = 2;
// 		} else {
// 			console.log("そこは石を置けません");
// 		}
// 	}
// }

// ■CPUの手番
// function cpuTurn() {
// const cpuTurn = () => {
// 	console.log("▲▲▲cpuTurn▲▲▲");
// 	var cpuput02;
// 	var target_mc03;
// 	var inputNum = -1;
// 	var ooo = -1; // ?
// 	console.log("ooooooooooooooooooooooooooooooooooooooooooooooooooooooo:①" + ooo);
// 	//（1）各ラインの合計算出
// 	//line1(0,1,2)上―
// 	line1Total = line1[0] + line1[1] + line1[2]; trace("1ライン目：" + line1[0], line1[1], line1[2] + "→合計：" + line1Total);//1ライン目：1 1 1→合計：3
// 	//trace(typeof line1Total);//number、//trace(typeof Array);//object
// 	//line2(3,4,5)中―
// 	line2Total = line2[0] + line2[1] + line2[2]; trace("2ライン目：" + line2[0], line2[1], line2[2] + "→合計：" + line2Total);//2ライン目：0 0 0→合計：0
// 	//line3(6,7,8)下―
// 	line3Total = line3[0] + line3[1] + line3[2]; trace("3ライン目：" + line3[0], line3[1], line3[2] + "→合計：" + line3Total);//3ライン目：0 0 0→合計：0
// 	//line4(0,3,6)//左｜
// 	line4Total = line4[0] + line4[1] + line4[2]; trace("4ライン目：" + line4[0], line4[1], line4[2] + "→合計：" + line4Total);//4ライン目：0 0 0→合計：0
// 	//line5(1,4,7)//中｜
// 	line5Total = line5[0] + line5[1] + line5[2]; trace("5ライン目：" + line5[0], line5[1], line5[2] + "→合計：" + line5Total);//5ライン目：0 0 0→合計：0
// 	//line6(2,5,8)//右｜
// 	line6Total = line6[0] + line6[1] + line6[2]; trace("6ライン目：" + line6[0], line6[1], line6[2] + "→合計：" + line6Total);//6ライン目：0 0 0→合計：0
// 	//line7(0,4,8)//＼
// 	line7Total = line7[0] + line7[1] + line7[2]; trace("7ライン目：" + line7[0], line7[1], line7[2] + "→合計：" + line7Total);//7ライン目：0 0 0→合計：0
// 	//line8(6,4,2)//／
// 	line8Total = line8[0] + line8[1] + line8[2]; trace("8ライン目：" + line8[0], line8[1], line8[2] + "→合計：" + line8Total);//8ライン目：0 0 0→合計：0

// 	// ■■ cpu判断（1）自分リーチ時
// 	console.log("CPU判別中11111111111111111111111111111111111111111111111111111")
// 	for (let jr = 1; j <= 8; j++) {
// 		if (ooo === -1) {
// 			if (this["line" + j + "Total"] === -2) {//cpuリーチ
// 				ooo = -2;
// 				console.log("oooooooooooooooooooooooooooooooooooooooooooooooooooooo④:" + ooo);
// 				console.log("ライン" + j + "がリーチ♪♪♪♪♪")
// 				//★完★リーチしているラインから残りの空きを取得
// 				var a;//インデックス番号は文字列で取得されるので後で数値に変換
// 				var indexNo;
// 				for (a in this["line" + j]) {
// 					indexNo = uint(a);
// 					var b = this["line" + j][indexNo];
// 					console.log("__________for_in_____:" + a, b);
// 					//よってcpuが置く場所は
// 					if (b == 0) {
// 						var setPosition = this["line" + j + "Reach"][a];
// 						console.log("▲setPos:" + setPosition);
// 					}
// 				}
// 				//★完★空きに石をセット
// 				cpuput02 = setPosition;
// 				// インスタンス名から参照を取得して操作
// 				target_mc03 = MovieClip(getChildByName("cp" + cpuput02));
// 				console.log(target_mc03.name);
// 				target_mc03.x = cp_gotoX[cpuput02];
// 				target_mc03.y = cp_gotoY[cpuput02];
// 				console.log(cpuput02 + "に●●CPUが石を置きました");
// 				boxNo[setPosition] = -1;
// 			} else {
// 				console.log("♪♪♪♪♪♪♪♪♪ライン" + j + "は揃ってません")
// 			}
// 		}
// 		//for内部毎回（リーチにかかわらず）
// 		console.log("ライン" + j + "の♪♪♪♪♪♪♪♪♪♪♪♪終了")
// 	}

// 	//ooo=1;
// 	console.log("ooooooooooooooooooooooooooooooooooooooooooooooooooooooo②:" + ooo);

// 	console.log("for end")

// 	console.log("＊＊＊＊＊CPU番置き処理終了・ 判別へ＊＊＊＊＊")
// 	// ★ 手番フラグ変更後、勝敗・終了判別へ
// 	yourMove = true;
// 	statusNum = 2;

// 	// ■■ cpu判断（2）敵リーチ時
// 	console.log("CPU判別中2222222222222222222222222222222222222222222222222222222222222222222222222");
// 	for (var k = 1; k <= 8; k++) {
// 		if (ooo === -1) {
// 			if (this["line" + k + "Total"] == 2) { // cpuリーチ
// 				ooo = -2;
// 				console.log("oooooooooooooooooooooooooooooooooooooooooooooooooooooo④:" + ooo);
// 				console.log("ライン" + k + "が敵リーチ♪♪♪♪♪")
// 				// ★完★リーチしているラインから残りの空きを取得
// 				var aa; // インデックス番号は文字列で取得されるので後で数値に変換
// 				var indexNo02;
// 				for (aa in this["line" + k]) {
// 					indexNo02 = uint(aa);//
// 					var bb = this["line" + k][indexNo02];
// 					console.log("__________for_in_____:" + aa, bb);
// 					//よってcpuが置く場所は
// 					if (bb == 0) {
// 						var setPosition02 = this["line" + k + "Reach"][aa];
// 						console.log("▲setPos:" + setPosition02);
// 					}
// 				}
// 				// ★完★空きに石をセット
// 				cpuput02 = setPosition02;
// 				// インスタンス名から参照を取得して操作
// 				target_mc03 = MovieClip(getChildByName("cp" + cpuput02));
// 				console.log(target_mc03.name);
// 				target_mc03.x = cp_gotoX[cpuput02];
// 				target_mc03.y = cp_gotoY[cpuput02];
// 				console.log(cpuput02 + "に●●CPUが石を置きました（リーチを阻止したニャニャニャニャニャニャニャ！）");
// 				boxNo[setPosition02] = -1;
// 			} else {
// 				console.log("♪♪♪♪♪♪♪♪♪ライン" + k + "は揃ってません")
// 			}
// 		}
// 		// for内部毎回（リーチにかかわらず）
// 		console.log("ライン" + k + "の♪♪♪♪♪♪♪♪♪♪♪♪終了")
// 	}

// 	console.log("＊＊＊＊＊CPU番置き処理終了・ 判別へ＊＊＊＊＊")
// 	// ★手番フラグ変更後、勝敗・終了判別へ
// 	yourMove = true;
// 	statusNum = 2;

// 	// ooo=2;
// 	console.log("ooooooooooooooooooooooooooooooooooooooooooooooooooooooo③:" + ooo);


// 	// ■■（3）単に空きを降順で埋めていく（思考回路無し）
// 	console.log("CPU判別中333333333333333333333333333333333333333333333333333333333333");

// 	// cpu判断（3）通常時
// 	// ■ 優先順位1「4（中央）」
// 	if (ooo === -1) {
// 		console.log("降順")
// 		if (boxNo[4] == 0) {
// 			cpuput02 = 4;
// 			// インスタンス名から参照を取得して操作
// 			target_mc03 = MovieClip(getChildByName("cp" + cpuput02));
// 			console.log(target_mc03.name);
// 			target_mc03.x = cp_gotoX[cpuput02];
// 			target_mc03.y = cp_gotoY[cpuput02];
// 			console.log(cpuput02 + "に●●CPUが石を置きました");
// 			boxNo[4] = -1;
// 			// ★手番フラグ変更後、勝敗・終了判別へ
// 			// yourMove=true;
// 			// statusNum=2;
// 		}
// 		// ■ 優先順位2「0（左上）」
// 		else if (boxNo[0] == 0) {
// 			cpuput02 = 0;
// 			target_mc03 = MovieClip(getChildByName("cp" + cpuput02));
// 			console.log(target_mc03.name);
// 			target_mc03.x = cp_gotoX[cpuput02];
// 			target_mc03.y = cp_gotoY[cpuput02];
// 			console.log(cpuput02 + "に●●CPUが石を置きました");
// 			boxNo[0] = -1;
// 			// ★ 手番フラグ変更後、勝敗・終了判別へ
// 			// yourMove=true;
// 			// statusNum=2;
// 		}
// 		// ■ 優先順位3「8（右下）」
// 		else if (boxNo[8] == 0) {
// 			cpuput02 = 8;
// 			target_mc03 = MovieClip(getChildByName("cp" + cpuput02));
// 			console.log(target_mc03.name);
// 			target_mc03.x = cp_gotoX[cpuput02];
// 			target_mc03.y = cp_gotoY[cpuput02];
// 			console.log(cpuput02 + "に●●CPUが石を置きました");
// 			boxNo[8] = -1;
// 			// ★ 手番フラグ変更後、勝敗・終了判別へ
// 			// yourMove=true;
// 			// statusNum=2;
// 		}
// 		// ■ 優先順位4「2（右上）」
// 		else if (boxNo[2] == 0) {
// 			cpuput02 = 2;
// 			target_mc03 = MovieClip(getChildByName("cp" + cpuput02));
// 			console.log(target_mc03.name);
// 			target_mc03.x = cp_gotoX[cpuput02];
// 			target_mc03.y = cp_gotoY[cpuput02];
// 			console.log(cpuput02 + "に●●CPUが石を置きました");
// 			boxNo[2] = -1;
// 			// ★ 手番フラグ変更後、勝敗・終了判別へ
// 			// yourMove=true;
// 			// statusNum=2;
// 		}
// 		// ■ 優先順位5「6（左下）」
// 		else if (boxNo[6] == 0) {
// 			cpuput02 = 6;
// 			target_mc03 = MovieClip(getChildByName("cp" + cpuput02));
// 			console.log(target_mc03.name);
// 			target_mc03.x = cp_gotoX[cpuput02];
// 			target_mc03.y = cp_gotoY[cpuput02];
// 			console.log(cpuput02 + "に●●CPUが石を置きました");
// 			boxNo[6] = -1;
// 			// ★ 手番フラグ変更後、勝敗・終了判別へ
// 			// yourMove=true;
// 			// statusNum=2;
// 		}
// 		// ■ 優先順位6「1（中上）」
// 		else if (boxNo[1] == 0) {
// 			cpuput02 = 1;
// 			target_mc03 = MovieClip(getChildByName("cp" + cpuput02));
// 			console.log(target_mc03.name);
// 			target_mc03.x = cp_gotoX[cpuput02];
// 			target_mc03.y = cp_gotoY[cpuput02];
// 			console.log(cpuput02 + "に●●CPUが石を置きました");
// 			boxNo[1] = -1;
// 			// ★ 手番フラグ変更後、勝敗・終了判別へ
// 			// yourMove=true;
// 			// statusNum=2;
// 		}
// 		// ■ 優先順位7「3（中左）」
// 		else if (boxNo[3] == 0) {
// 			cpuput02 = 3;
// 			target_mc03 = MovieClip(getChildByName("cp" + cpuput02));
// 			console.log(target_mc03.name);
// 			target_mc03.x = cp_gotoX[cpuput02];
// 			target_mc03.y = cp_gotoY[cpuput02];
// 			console.log(cpuput02 + "に●●CPUが石を置きました");
// 			boxNo[3] = -1;
// 			//★手番フラグ変更後、勝敗・終了判別へ
// 			//yourMove=true;
// 			//statusNum=2;
// 		}
// 		// ■ 優先順位8「5（中右）」
// 		else if (boxNo[5] == 0) {
// 			cpuput02 = 5;
// 			target_mc03 = MovieClip(getChildByName("cp" + cpuput02));
// 			console.log(target_mc03.name);
// 			target_mc03.x = cp_gotoX[cpuput02];
// 			target_mc03.y = cp_gotoY[cpuput02];
// 			console.log(cpuput02 + "に●●CPUが石を置きました");
// 			boxNo[5] = -1;
// 		}
// 		// ■ 優先順位9「7（中右）」
// 		else if (boxNo[7] == 0) {
// 			cpuput02 = 7;
// 			target_mc03 = MovieClip(getChildByName("cp" + cpuput02));
// 			console.log(target_mc03.name);
// 			target_mc03.x = cp_gotoX[cpuput02];
// 			target_mc03.y = cp_gotoY[cpuput02];
// 			console.log(cpuput02 + "に●●CPUが石を置きました");
// 			boxNo[7] = -1;
// 			//★手番フラグ変更後、勝敗・終了判別へ
// 			//yourMove=true;
// 			//statusNum=2;
// 		}
// 		else {
// 			//置く場所無し
// 		}

// 		//		trace("＊＊＊＊＊降順CPU番置き処理終了・ 判別へ＊＊＊＊＊")
// 		//★手番フラグ変更後、勝敗・終了判別へ
// 		//yourMove=true;
// 		//statusNum=2;
// 		//return;
// 	}
// }











/* 三目並べ用の変数 */
/* 最初は前に作ったのを参考用にそのまま使用？ */

/*
//■■■初期設定■■■//-----------------------------------------------------------------------------------------
var boxNo: Array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);//初期値:0,//自分1、コンピュータ-1//0～8;/マスが埋まっているか空いているか？（埋1,空0）
//var boxNo:Array = new Array(1,1,1,1,1,1,1,1,1);//テスト用
//var boxNo:Array = new Array(-1,-1,-1,-1,-1,-1,-1,-1,-1);//テスト用
//var boxNo:Array = new Array(-1,0,0,-1,0,0,0,0,0);//テスト用
//var boxNo:Array = new Array(1,-1,1,-1,-1,1,1,1,-1);//テスト用//引き分け
//trace("boxNo0:"+boxNo[0]);//boxNo0:1
//trace("boxNo1:"+boxNo[1]);//boxNo1:1
//trace("boxNo2:"+boxNo[2]);//boxNo2:1
//trace("boxNo3:"+boxNo[3]);//boxNo3:0
//trace("boxNo4:"+boxNo[4]);//boxNo4:0
//trace("boxNo5:"+boxNo[5]);//boxNo5:0
//trace("boxNo6:"+boxNo[6]);//boxNo6:0
//trace("boxNo7:"+boxNo[7]);//boxNo7:0
//trace("boxNo8:"+boxNo[8]);//boxNo8:0

//player石（0～8）配置座標
//var pl_gotoX:Array = new Array(100,200,300,100,200,300,100,200,300);
//var pl_gotoY:Array = new Array(60,60,60,160,160,160,260,260,260);
var pl_gotoX: Array = new Array(15, 120, 220, 15, 120, 220, 15, 120, 220);
var pl_gotoY: Array = new Array(80, 80, 80, 180, 180, 180, 290, 290, 290);
//cpu石（0～8）配置座標
//var cp_gotoX:Array = new Array(100,200,300,100,200,300,100,200,300);
//var cp_gotoY:Array = new Array(60,60,60,160,160,160,260,260,260);
var cp_gotoX: Array = new Array(15, 120, 220, 15, 120, 220, 15, 120, 220);
var cp_gotoY: Array = new Array(80, 80, 80, 180, 180, 180, 290, 290, 290);

//個別function内のvar変数だとローカルでアクセス出来ないので
var line1Total: Number;
var line2Total: Number;
var line3Total: Number;
var line4Total: Number;
var line5Total: Number;
var line6Total: Number;
var line7Total: Number;
var line8Total: Number;

//ラインが揃ったかどうかの判別用（9ライン分）
var line1Reach: Array = new Array(0, 1, 2);//上―
var line2Reach: Array = new Array(3, 4, 5);//中―
var line3Reach: Array = new Array(6, 7, 8);//下―
var line4Reach: Array = new Array(0, 3, 6);//左｜
var line5Reach: Array = new Array(1, 4, 7);//中｜
var line6Reach: Array = new Array(2, 5, 8);//右｜
var line7Reach: Array = new Array(0, 4, 8);//＼
var line8Reach: Array = new Array(6, 4, 2);//／

//ラインが9個揃ったか判別用（合計3～-3）
var line1: Array = new Array(boxNo[0], boxNo[1], boxNo[2]);//line1(0,1,2)上―
var line2: Array = new Array(boxNo[3], boxNo[4], boxNo[5]);//line2(3,4,5)中―
var line3: Array = new Array(boxNo[6], boxNo[7], boxNo[8]);//line3(6,7,8)下―
var line4: Array = new Array(boxNo[0], boxNo[3], boxNo[6]);//line4(0,3,6)//左｜
var line5: Array = new Array(boxNo[1], boxNo[4], boxNo[7]);//line5(1,4,7)//中｜
var line6: Array = new Array(boxNo[2], boxNo[5], boxNo[8]);//line6(2,5,8)//右｜
var line7: Array = new Array(boxNo[0], boxNo[4], boxNo[8]);//line7(0,4,8)//＼
var line8: Array = new Array(boxNo[6], boxNo[4], boxNo[2]);//line8(6,4,2)//／

//□□メイン用各命令処理フラグ
var statusNum: Number = 0;

//■■石を画面からどかす（スタート時に端に）//石をどかす時の参照mc用
var target_mc: MovieClip;
var target_mc02: MovieClip;

//■■先攻後攻決める（この場合RNDで）//先攻後攻決定用
var beforeAfter: Number;
var yourMove: Boolean;

//■■ラインが揃ったかの判別（各ラインTotalで、+3＝Player勝ち、-3＝CPU勝ち）//勝ち負け判別用
var clearLineFlag: Number = 0;//0:揃ってない、1:人間勝ち、-1:CPU勝ち

//■■石を9個置き終わったか判別
var placeStoneAll: Boolean;


*/


/* 処理の流れはフラグ（State）で管理？前のそのまま使用？ */


/*

//■■■メインルーチン■■■//-----------------------------------------------------------------------------------------

this.addEventListener(Event.ENTER_FRAME,startMain);
//□□メイン
function startMain(e:Event){
	//trace("statusNum:"+statusNum);//現在のステータス番号表示
	if (statusNum == 0){
		//■■石を盤上からどかす（スタート時に端に）
		statusNum = -1;
		removeStone();
		statusNum = 1;
	}
	if (statusNum == 1){
		//■■先攻後攻決める（この場合RNDで）
		statusNum = -1;
		beforeOrAfter();//trace("yourMove:"+yourMove);//true:人間が先攻、false：CPUが先攻
		statusNum = 2;
	}
	if (statusNum == 2){
		statusNum = -1;
		//■■ラインが揃ったかの判別（各ラインTotalで、+3＝Player勝ち、-3＝CPU勝ち）
		clearLineCheck();
		if(clearLineFlag==1){gotoAndPlay(3)}//player勝利
		else if (clearLineFlag==-1){gotoAndPlay(4)}//cpu勝利
		else {statusNum=3}
	}
	if (statusNum == 3){
		statusNum = -1;
		//■■石を9個置き終わったか判別
		//trace("placeStoneAll:"+placeStoneAll);//false
		placeStoneAllCheck();
		//trace("placeStoneAll:"+placeStoneAll);//false or true
		if (placeStoneAll==true && clearLineFlag==0){gotoAndPlay(2)}//trueで終了（引き分け）処理
		else {	statusNum = 4;}
	}
	if (statusNum == 4 && yourMove == true){
		statusNum = -1;
		//■■プレイヤーの手番
		playerTurn();
	} else if  (statusNum == 4 && yourMove == false){
		//■■CPU手番
		statusNum = -1;
		cpuTurn();
	}
	if (statusNum == 5){
		//■■
		statusNum = -1;
		//上記以外の処理
	}
}
*/



//■■■サブルーチン■■■//-----------------------------------------------------------------------------------------


// //■■石を画面からどかす（スタート時に端に）
// function removeStone() {
// 	for (var i: Number = 0; i <= 8; i++) {
// 		target_mc = MovieClip(getChildByName("pl" + i));//player石
// 		//trace("target_mc.name:"+target_mc.name); //target_mc.name:pl0～target_mc.name:pl8
// 		target_mc.x = -50;
// 		target_mc.y = -50;//↓ここは配置時にも使うので外でも可？
// 		target_mc02 = MovieClip(getChildByName("cp" + i));//cpu石
// 		//trace(target_mc02.name);
// 		target_mc02.x = -50;
// 		target_mc02.y = -0;
// 	}
// }

// //■■先攻後攻決める（この場合RNDで）
// function beforeOrAfter(): void {
// 	beforeAfter = Math.floor(Math.random() * 2 + 1);
// 	if (beforeAfter == 1) {
// 		yourMove = true;//人間先攻
// 	} else {
// 		yourMove = false;//CPU先攻
// 	}
// }

// //■■ラインが揃ったかの判別（各ラインTotalで、+3＝Player勝ち、-3＝CPU勝ち）
// function clearLineCheck(): void {
// 	trace("▲▲▲clearLineCheck▲▲▲");//▲▲▲clearLineCheck▲▲▲
// 	trace("▲this:" + this);//▲this:[object MainTimeline]
// 	trace("▲：" + line1[0]);
// 	trace("▲▲：" + MainTimeline);//▲▲：[class MainTimeline]
// 	//ラインが9個揃ったか判別用（合計3～-3）
// 	line1 = new Array(boxNo[0], boxNo[1], boxNo[2]);//line1(0,1,2)上―
// 	line2 = new Array(boxNo[3], boxNo[4], boxNo[5]);//line2(3,4,5)中―
// 	line3 = new Array(boxNo[6], boxNo[7], boxNo[8]);//line3(6,7,8)下―
// 	line4 = new Array(boxNo[0], boxNo[3], boxNo[6]);//line4(0,3,6)//左｜
// 	line5 = new Array(boxNo[1], boxNo[4], boxNo[7]);//line5(1,4,7)//中｜
// 	line6 = new Array(boxNo[2], boxNo[5], boxNo[8]);//line6(2,5,8)//右｜
// 	line7 = new Array(boxNo[0], boxNo[4], boxNo[8]);//line7(0,4,8)//＼
// 	line8 = new Array(boxNo[6], boxNo[4], boxNo[2]);//line8(6,4,2)//／
// 	//↑★mustここでもう1回代入しないと反映されない
// 	//（1）各ラインの合計算出
// 	//line1(0,1,2)上―
// 	line1Total = line1[0] + line1[1] + line1[2]; trace("1ライン目：" + line1[0], line1[1], line1[2] + "→合計：" + line1Total);//1ライン目：1 1 1→合計：3
// 	//trace(typeof line1Total);//number、//trace(typeof Array);//object
// 	//line2(3,4,5)中―
// 	line2Total = line2[0] + line2[1] + line2[2]; trace("2ライン目：" + line2[0], line2[1], line2[2] + "→合計：" + line2Total);//2ライン目：0 0 0→合計：0
// 	//line3(6,7,8)下―
// 	line3Total = line3[0] + line3[1] + line3[2]; trace("3ライン目：" + line3[0], line3[1], line3[2] + "→合計：" + line3Total);//3ライン目：0 0 0→合計：0
// 	//line4(0,3,6)//左｜
// 	line4Total = line4[0] + line4[1] + line4[2]; trace("4ライン目：" + line4[0], line4[1], line4[2] + "→合計：" + line4Total);//4ライン目：0 0 0→合計：0
// 	//line5(1,4,7)//中｜
// 	line5Total = line5[0] + line5[1] + line5[2]; trace("5ライン目：" + line5[0], line5[1], line5[2] + "→合計：" + line5Total);//5ライン目：0 0 0→合計：0
// 	//line6(2,5,8)//右｜
// 	line6Total = line6[0] + line6[1] + line6[2]; trace("6ライン目：" + line6[0], line6[1], line6[2] + "→合計：" + line6Total);//6ライン目：0 0 0→合計：0
// 	//line7(0,4,8)//＼
// 	line7Total = line7[0] + line7[1] + line7[2]; trace("7ライン目：" + line7[0], line7[1], line7[2] + "→合計：" + line7Total);//7ライン目：0 0 0→合計：0
// 	//line8(6,4,2)//／
// 	line8Total = line8[0] + line8[1] + line8[2]; trace("8ライン目：" + line8[0], line8[1], line8[2] + "→合計：" + line8Total);//8ライン目：0 0 0→合計：0
// 	//（2）各ラインの判別
// 	for (var j: Number = 1; j <= 8; j++) {//trace("j:"+j);
// 		if (this["line" + j + "Total"] == 3) {//trace("this:"+this);//this:[object MainTimeline]
// 			clearLineFlag = 1; trace("●人間の勝ち");
// 			break;
// 		} else if (this["line" + j + "Total"] == -3) {
// 			trace("●CPUの勝ち");
// 			clearLineFlag = -1;
// 			break;
// 		} else {
// 			trace(j, "ライン揃ってないので次のラインへ");
// 			if (j != 8) {
// 				continue;//全部判別し終わってない場合は抜けないでループ
// 			}
// 			trace("判別終了、●今回揃ってるラインは無し");
// 			clearLineFlag = 0;
// 		}
// 	}
// }

// //■■石を9個置き終わったか判別
// function placeStoneAllCheck(): void/*:Boolean*/ {
// 	trace("▲▲▲placeStoneAllCheck▲▲▲");
// 	//trace("boxNo.length:"+boxNo.length);//boxNo.length:9
// 	for (var i: Number = 0; i <= boxNo.length - 1; i++) {
// 		if (boxNo[i] == 0) {
// 			trace("埋まって無い所があるので★ゲーム継続★ " + "（埋まってないマス目" + i + "＝" + boxNo[i] + "）");//埋まって無い所があるので★ゲーム継続★ （埋まってないマス目0＝0）
// 			placeStoneAll = false;
// 			break;
// 		}
// 		trace(i, "マス目＝" + boxNo[i]);//0 マス目＝1
// 		if (i == 8) {
// 			trace("●全部埋まりました、引き分けです⇒終了");
// 			placeStoneAll = true;
// 			break;
// 		}
// 	}
// 	/* return placeStoneAll; */
// }

// //■■プレイヤーの手番
// function playerTurn() {
// 	trace("▲▲▲playerTurn▲▲▲");
// 	var inputNum: Number = -1;
// 	//入力受け付け
// 	stage.addEventListener(Event.ENTER_FRAME, searchMousePosition);//毎フレームチェック
// 	function searchMousePosition(eventobject: Event): void {
// 		//trace(event.target);//[object Stage]
// 		if (mc0.hitTestPoint(stage.mouseX, stage.mouseY, true)) {//trueは実形状、falseは矩形（四角）
// 			hyouji.text = "0枠クリック";
// 			inputNum = 0;
// 			//開放
// 			//stage.removeEventListener(Event.ENTER_FRAME,searchMousePosition);
// 			//hyouji.text = "0枠クリックで終了";
// 		} else if (mc1.hitTestPoint(stage.mouseX, stage.mouseY, true)) {
// 			hyouji.text = "1枠クリック";
// 			inputNum = 1;
// 			//stage.removeEventListener(Event.ENTER_FRAME,searchMousePosition);
// 			//hyouji.text = "1枠クリックで終了";
// 		} else if (mc2.hitTestPoint(stage.mouseX, stage.mouseY, true)) {
// 			hyouji.text = "2枠クリック";
// 			inputNum = 2;
// 			//stage.removeEventListener(Event.ENTER_FRAME,searchMousePosition);
// 			hyouji.text = "2枠クリックで終了";
// 		} else if (mc3.hitTestPoint(stage.mouseX, stage.mouseY, true)) {
// 			hyouji.text = "3枠クリック";
// 			inputNum = 3;
// 			//stage.removeEventListener(Event.ENTER_FRAME,searchMousePosition);
// 			hyouji.text = "3枠クリックで終了";
// 		} else if (mc4.hitTestPoint(stage.mouseX, stage.mouseY, true)) {
// 			hyouji.text = "4枠クリック";
// 			inputNum = 4;
// 			//stage.removeEventListener(Event.ENTER_FRAME,searchMousePosition);
// 			hyouji.text = "4枠クリックで終了";
// 		} else if (mc5.hitTestPoint(stage.mouseX, stage.mouseY, true)) {
// 			hyouji.text = "5枠クリック";
// 			inputNum = 5;
// 			//stage.removeEventListener(Event.ENTER_FRAME,searchMousePosition);
// 			hyouji.text = "5枠クリックで終了";
// 		} else if (mc6.hitTestPoint(stage.mouseX, stage.mouseY, true)) {
// 			hyouji.text = "6枠クリック";
// 			inputNum = 6;
// 			//stage.removeEventListener(Event.ENTER_FRAME,searchMousePosition);
// 			hyouji.text = "6枠クリックで終了";
// 		} else if (mc7.hitTestPoint(stage.mouseX, stage.mouseY, true)) {
// 			hyouji.text = "7枠クリック";
// 			inputNum = 7;
// 			//stage.removeEventListener(Event.ENTER_FRAME,searchMousePosition);
// 			hyouji.text = "7枠クリックで終了";
// 		} else if (mc8.hitTestPoint(stage.mouseX, stage.mouseY, true)) {
// 			hyouji.text = "8枠クリック";
// 			inputNum = 8;
// 			//開放
// 			//stage.removeEventListener(Event.ENTER_FRAME,searchMousePosition);
// 			hyouji.text = "8枠クリックで終了";
// 		} else {
// 			inputNum = -1;
// 			hyouji.text = "枠外をクリック";
// 		}
// 	}

// 	//さらに押した判定も+
// 	stage.addEventListener(MouseEvent.MOUSE_UP, MouseLUpFunc);
// 	function MouseLUpFunc(eventobject: MouseEvent) {
// 		trace("マウスが離された");
// 		trace("inputNum:" + inputNum)
// 		//
// 		if (boxNo[inputNum] == 0) {
// 			boxNo[inputNum] = 1;//人間が置いたら1
// 			//★重要★mcのインスタンス名から参照を取得して操作
// 			var target_mc: MovieClip = MovieClip(getChildByName("pl" + inputNum));
// 			trace(target_mc.name);
// 			target_mc.x = pl_gotoX[inputNum];
// 			target_mc.y = pl_gotoY[inputNum];
// 			trace(inputNum + "に石を置きました");
// 			stage.removeEventListener(MouseEvent.MOUSE_UP, MouseLUpFunc);//1個置けたらマウスdisablle
// 			stage.removeEventListener(Event.ENTER_FRAME, searchMousePosition);//1個置けたらヒットチェックdisablle
// 			trace("boxNo0:" + boxNo[0]);//
// 			trace("boxNo1:" + boxNo[1]);//
// 			trace("boxNo2:" + boxNo[2]);//石を置いて1にはなってる
// 			trace("boxNo3:" + boxNo[3]);//
// 			trace("boxNo4:" + boxNo[4]);//
// 			trace("boxNo5:" + boxNo[5]);//
// 			trace("boxNo6:" + boxNo[6]);//
// 			trace("boxNo7:" + boxNo[7]);//
// 			trace("boxNo8:" + boxNo[8]);//
// 			//■CPUの手番へ
// 			//statusNum=4;
// 			yourMove = false;
// 			//★勝敗・終了判別へ
// 			statusNum = 2;
// 		} else {
// 			trace("そこは石を置けません");
// 		}
// 	}
// }

// //■CPUの手番
// function cpuTurn() {
// 	trace("▲▲▲cpuTurn▲▲▲");
// 	var cpuput02: Number;
// 	var target_mc03: MovieClip;
// 	var inputNum: Number = -1;
// 	var ooo: Number = -1;
// 	trace("ooooooooooooooooooooooooooooooooooooooooooooooooooooooo:①" + ooo);
// 	//（1）各ラインの合計算出
// 	//line1(0,1,2)上―
// 	line1Total = line1[0] + line1[1] + line1[2]; trace("1ライン目：" + line1[0], line1[1], line1[2] + "→合計：" + line1Total);//1ライン目：1 1 1→合計：3
// 	//trace(typeof line1Total);//number、//trace(typeof Array);//object
// 	//line2(3,4,5)中―
// 	line2Total = line2[0] + line2[1] + line2[2]; trace("2ライン目：" + line2[0], line2[1], line2[2] + "→合計：" + line2Total);//2ライン目：0 0 0→合計：0
// 	//line3(6,7,8)下―
// 	line3Total = line3[0] + line3[1] + line3[2]; trace("3ライン目：" + line3[0], line3[1], line3[2] + "→合計：" + line3Total);//3ライン目：0 0 0→合計：0
// 	//line4(0,3,6)//左｜
// 	line4Total = line4[0] + line4[1] + line4[2]; trace("4ライン目：" + line4[0], line4[1], line4[2] + "→合計：" + line4Total);//4ライン目：0 0 0→合計：0
// 	//line5(1,4,7)//中｜
// 	line5Total = line5[0] + line5[1] + line5[2]; trace("5ライン目：" + line5[0], line5[1], line5[2] + "→合計：" + line5Total);//5ライン目：0 0 0→合計：0
// 	//line6(2,5,8)//右｜
// 	line6Total = line6[0] + line6[1] + line6[2]; trace("6ライン目：" + line6[0], line6[1], line6[2] + "→合計：" + line6Total);//6ライン目：0 0 0→合計：0
// 	//line7(0,4,8)//＼
// 	line7Total = line7[0] + line7[1] + line7[2]; trace("7ライン目：" + line7[0], line7[1], line7[2] + "→合計：" + line7Total);//7ライン目：0 0 0→合計：0
// 	//line8(6,4,2)//／
// 	line8Total = line8[0] + line8[1] + line8[2]; trace("8ライン目：" + line8[0], line8[1], line8[2] + "→合計：" + line8Total);//8ライン目：0 0 0→合計：0

// 	//■■cpu判断（1）自分リーチ時
// 	trace("CPU判別中11111111111111111111111111111111111111111111111111111")
// 	for (var j: Number = 1; j <= 8; j++) {
// 		if (ooo == -1) {
// 			if (this["line" + j + "Total"] == -2) {//cpuリーチ
// 				ooo = -2;
// 				trace("oooooooooooooooooooooooooooooooooooooooooooooooooooooo④:" + ooo);
// 				trace("ライン" + j + "がリーチ♪♪♪♪♪")
// 				//★完★リーチしているラインから残りの空きを取得
// 				var a: String;//インデックス番号は文字列で取得されるので後で数値に変換
// 				var indexNo: uint;
// 				for (a in this["line" + j]) {
// 					indexNo = uint(a);
// 					var b: Number = this["line" + j][indexNo];
// 					trace("__________for_in_____:" + a, b);
// 					//よってcpuが置く場所は
// 					if (b == 0) {
// 						var setPosition: Number = this["line" + j + "Reach"][a];
// 						trace("▲setPos:" + setPosition);
// 					}
// 				}
// 				//★完★空きに石をセット
// 				cpuput02 = setPosition;
// 				// インスタンス名から参照を取得して操作
// 				target_mc03 = MovieClip(getChildByName("cp" + cpuput02));
// 				trace(target_mc03.name);
// 				target_mc03.x = cp_gotoX[cpuput02];
// 				target_mc03.y = cp_gotoY[cpuput02];
// 				trace(cpuput02 + "に●●CPUが石を置きました");
// 				boxNo[setPosition] = -1;
// 			} else {
// 				trace("♪♪♪♪♪♪♪♪♪ライン" + j + "は揃ってません")
// 			}
// 		}
// 		//for内部毎回（リーチにかかわらず）
// 		trace("ライン" + j + "の♪♪♪♪♪♪♪♪♪♪♪♪終了")
// 	}

// 	//ooo=1;
// 	trace("ooooooooooooooooooooooooooooooooooooooooooooooooooooooo②:" + ooo);

// 	trace("for end")

// 	trace("＊＊＊＊＊CPU番置き処理終了・ 判別へ＊＊＊＊＊")
// 	//★手番フラグ変更後、勝敗・終了判別へ
// 	yourMove = true;
// 	statusNum = 2;

// 	//■■cpu判断（2）敵リーチ時
// 	trace("CPU判別中2222222222222222222222222222222222222222222222222222222222222222222222222");
// 	for (var k: Number = 1; k <= 8; k++) {
// 		if (ooo == -1) {
// 			if (this["line" + k + "Total"] == 2) {//cpuリーチ
// 				ooo = -2;
// 				trace("oooooooooooooooooooooooooooooooooooooooooooooooooooooo④:" + ooo);
// 				trace("ライン" + k + "が敵リーチ♪♪♪♪♪")
// 				//★完★リーチしているラインから残りの空きを取得
// 				var aa: String;//インデックス番号は文字列で取得されるので後で数値に変換
// 				var indexNo02: uint;
// 				for (aa in this["line" + k]) {
// 					indexNo02 = uint(aa);//
// 					var bb: Number = this["line" + k][indexNo02];
// 					trace("__________for_in_____:" + aa, bb);
// 					//よってcpuが置く場所は
// 					if (bb == 0) {
// 						var setPosition02: Number = this["line" + k + "Reach"][aa];
// 						trace("▲setPos:" + setPosition02);
// 					}
// 				}
// 				//★完★空きに石をセット
// 				cpuput02 = setPosition02;
// 				// インスタンス名から参照を取得して操作
// 				target_mc03 = MovieClip(getChildByName("cp" + cpuput02));
// 				trace(target_mc03.name);
// 				target_mc03.x = cp_gotoX[cpuput02];
// 				target_mc03.y = cp_gotoY[cpuput02];
// 				trace(cpuput02 + "に●●CPUが石を置きました（リーチを阻止したニャニャニャニャニャニャニャ！）");
// 				boxNo[setPosition02] = -1;
// 			} else {
// 				trace("♪♪♪♪♪♪♪♪♪ライン" + k + "は揃ってません")
// 			}
// 		}
// 		//for内部毎回（リーチにかかわらず）
// 		trace("ライン" + k + "の♪♪♪♪♪♪♪♪♪♪♪♪終了")
// 	}

// 	trace("＊＊＊＊＊CPU番置き処理終了・ 判別へ＊＊＊＊＊")
// 	//★手番フラグ変更後、勝敗・終了判別へ
// 	yourMove = true;
// 	statusNum = 2;

// 	//ooo=2;
// 	trace("ooooooooooooooooooooooooooooooooooooooooooooooooooooooo③:" + ooo);


// 	//■■（3）単に空きを降順で埋めていく（思考回路無し）
// 	trace("CPU判別中333333333333333333333333333333333333333333333333333333333333");

// 	//cpu判断（3）通常時
// 	//■優先順位1「4（中央）」
// 	if (ooo == -1) {
// 		trace("降順")
// 		if (boxNo[4] == 0) {
// 			cpuput02 = 4;
// 			// インスタンス名から参照を取得して操作
// 			target_mc03 = MovieClip(getChildByName("cp" + cpuput02));
// 			trace(target_mc03.name);
// 			target_mc03.x = cp_gotoX[cpuput02];
// 			target_mc03.y = cp_gotoY[cpuput02];
// 			trace(cpuput02 + "に●●CPUが石を置きました");
// 			boxNo[4] = -1;
// 			//★手番フラグ変更後、勝敗・終了判別へ
// 			//yourMove=true;
// 			//statusNum=2;
// 		}
// 		//■優先順位2「0（左上）」
// 		else if (boxNo[0] == 0) {
// 			cpuput02 = 0;
// 			target_mc03 = MovieClip(getChildByName("cp" + cpuput02));
// 			trace(target_mc03.name);
// 			target_mc03.x = cp_gotoX[cpuput02];
// 			target_mc03.y = cp_gotoY[cpuput02];
// 			trace(cpuput02 + "に●●CPUが石を置きました");
// 			boxNo[0] = -1;
// 			//★手番フラグ変更後、勝敗・終了判別へ
// 			//yourMove=true;
// 			//statusNum=2;
// 		}
// 		//■優先順位3「8（右下）」
// 		else if (boxNo[8] == 0) {
// 			cpuput02 = 8;
// 			target_mc03 = MovieClip(getChildByName("cp" + cpuput02));
// 			trace(target_mc03.name);
// 			target_mc03.x = cp_gotoX[cpuput02];
// 			target_mc03.y = cp_gotoY[cpuput02];
// 			trace(cpuput02 + "に●●CPUが石を置きました");
// 			boxNo[8] = -1;
// 			//★手番フラグ変更後、勝敗・終了判別へ
// 			//yourMove=true;
// 			//statusNum=2;
// 		}
// 		//■優先順位4「2（右上）」
// 		else if (boxNo[2] == 0) {
// 			cpuput02 = 2;
// 			target_mc03 = MovieClip(getChildByName("cp" + cpuput02));
// 			trace(target_mc03.name);
// 			target_mc03.x = cp_gotoX[cpuput02];
// 			target_mc03.y = cp_gotoY[cpuput02];
// 			trace(cpuput02 + "に●●CPUが石を置きました");
// 			boxNo[2] = -1;
// 			//★手番フラグ変更後、勝敗・終了判別へ
// 			//yourMove=true;
// 			//statusNum=2;
// 		}
// 		//■優先順位5「6（左下）」
// 		else if (boxNo[6] == 0) {
// 			cpuput02 = 6;
// 			target_mc03 = MovieClip(getChildByName("cp" + cpuput02));
// 			trace(target_mc03.name);
// 			target_mc03.x = cp_gotoX[cpuput02];
// 			target_mc03.y = cp_gotoY[cpuput02];
// 			trace(cpuput02 + "に●●CPUが石を置きました");
// 			boxNo[6] = -1;
// 			//★手番フラグ変更後、勝敗・終了判別へ
// 			//yourMove=true;
// 			//statusNum=2;
// 		}
// 		//■優先順位6「1（中上）」
// 		else if (boxNo[1] == 0) {
// 			cpuput02 = 1;
// 			target_mc03 = MovieClip(getChildByName("cp" + cpuput02));
// 			trace(target_mc03.name);
// 			target_mc03.x = cp_gotoX[cpuput02];
// 			target_mc03.y = cp_gotoY[cpuput02];
// 			trace(cpuput02 + "に●●CPUが石を置きました");
// 			boxNo[1] = -1;
// 			//★手番フラグ変更後、勝敗・終了判別へ
// 			//yourMove=true;
// 			//statusNum=2;
// 		}
// 		//■優先順位7「3（中左）」
// 		else if (boxNo[3] == 0) {
// 			cpuput02 = 3;
// 			target_mc03 = MovieClip(getChildByName("cp" + cpuput02));
// 			trace(target_mc03.name);
// 			target_mc03.x = cp_gotoX[cpuput02];
// 			target_mc03.y = cp_gotoY[cpuput02];
// 			trace(cpuput02 + "に●●CPUが石を置きました");
// 			boxNo[3] = -1;
// 			//★手番フラグ変更後、勝敗・終了判別へ
// 			//yourMove=true;
// 			//statusNum=2;
// 		}
// 		//■優先順位8「5（中右）」
// 		else if (boxNo[5] == 0) {
// 			cpuput02 = 5;
// 			target_mc03 = MovieClip(getChildByName("cp" + cpuput02));
// 			trace(target_mc03.name);
// 			target_mc03.x = cp_gotoX[cpuput02];
// 			target_mc03.y = cp_gotoY[cpuput02];
// 			trace(cpuput02 + "に●●CPUが石を置きました");
// 			boxNo[5] = -1;
// 		}
// 		//■優先順位9「7（中右）」
// 		else if (boxNo[7] == 0) {
// 			cpuput02 = 7;
// 			target_mc03 = MovieClip(getChildByName("cp" + cpuput02));
// 			trace(target_mc03.name);
// 			target_mc03.x = cp_gotoX[cpuput02];
// 			target_mc03.y = cp_gotoY[cpuput02];
// 			trace(cpuput02 + "に●●CPUが石を置きました");
// 			boxNo[7] = -1;
// 			//★手番フラグ変更後、勝敗・終了判別へ
// 			//yourMove=true;
// 			//statusNum=2;
// 		}
// 		else {
// 			//置く場所無し
// 		}

// 		//		trace("＊＊＊＊＊降順CPU番置き処理終了・ 判別へ＊＊＊＊＊")
// 		//★手番フラグ変更後、勝敗・終了判別へ
// 		//yourMove=true;
// 		//statusNum=2;
// 		//return;
// 	}
// }