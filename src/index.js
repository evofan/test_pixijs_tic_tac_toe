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

let image1;
let loadingEnd = false;

// Load image and Set sprite
const LoadImg = async () => {
	console.log("LoadImg()");
	const texture1 = await Assets.load('assets/images/pic_cat2.png');
	image1 = Sprite.from(texture1);
	console.log(texture1); // Texture {_events: Events, _eventsCount: 0, noFrame: true, baseTexture: _BaseTexture, _frame: Rectangle, …}
	console.log(image1); // Sprite {_events: Events, _eventsCount: 0, tempDisplayObjectParent: null, transform: _Transform, alpha: 1, …}
	image1.anchor.set(0.5);
	image1.x = WIDTH / 2;
	image1.y = HEIGHT / 2 + 90;
	// image1.width = image1.width / 2;
	// image1.height = image1.height / 2;
	image1.scale.set(0.5, 0.5);
	container.addChild(image1);
	next();
}

LoadImg();

// RandomInt test
let dice = randomInt(1, 6);
console.log("dice no: ", dice);

const next = () => {
	console.log("next()");
	// loading end flag
	loadingEnd = true;

	init();

}

// view todays date
let today = displayDateText(app);

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

let statusNo = 0;

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
	statusNo = 0;

	initEnd = true;
	// startMain();

}

const startMain = () => {
	console.log("startMain()");

	if(initEnd){
		console.log("ステート監視開始");
	}

}


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
var statusNo: Number = 0;

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
	//trace("statusNo:"+statusNo);//現在のステータス番号表示
	if (statusNo == 0){
		//■■石を盤上からどかす（スタート時に端に）
		statusNo = -1;
		removeStone();
		statusNo = 1;
	}
	if (statusNo == 1){
		//■■先攻後攻決める（この場合RNDで）
		statusNo = -1;
		beforeOrAfter();//trace("yourMove:"+yourMove);//true:人間が先攻、false：CPUが先攻
		statusNo = 2;
	}
	if (statusNo == 2){
		statusNo = -1;
		//■■ラインが揃ったかの判別（各ラインTotalで、+3＝Player勝ち、-3＝CPU勝ち）
		clearLineCheck();
		if(clearLineFlag==1){gotoAndPlay(3)}//player勝利
		else if (clearLineFlag==-1){gotoAndPlay(4)}//cpu勝利
		else {statusNo=3}
	}
	if (statusNo == 3){
		statusNo = -1;
		//■■石を9個置き終わったか判別
		//trace("placeStoneAll:"+placeStoneAll);//false
		placeStoneAllCheck();
		//trace("placeStoneAll:"+placeStoneAll);//false or true
		if (placeStoneAll==true && clearLineFlag==0){gotoAndPlay(2)}//trueで終了（引き分け）処理
		else {	statusNo = 4;}
	}
	if (statusNo == 4 && yourMove == true){
		statusNo = -1;
		//■■プレイヤーの手番
		playerTurn();
	} else if  (statusNo == 4 && yourMove == false){
		//■■CPU手番
		statusNo = -1;
		cpuTurn();
	}
	if (statusNo == 5){
		//■■
		statusNo = -1;
		//上記以外の処理
	}
}
*/

