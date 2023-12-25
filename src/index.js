console.log("test_pixijs_tic_tac_toe!");

import * as PIXI from "pixi.js";
import { Assets, Sprite } from 'pixi.js';

import { randomInt } from "./helper/randomInt";

import { STAGES } from "./constants";
import { displayDateText } from "./helper/text";

// PIXI.useDeprecated();

const WIDTH = STAGES.WIDTH;
const HEIGHT = STAGES.HEIGHT;
const BG_COLOR = STAGES.BG_COLOR;

console.log("window.devicePixelRatio: ", window.devicePixelRatio); // window.devicePixelRatio:  2


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
container.buttonMode = false;
app.stage.addChild(container);

// PixiJS Deprecation Warning: Setting interactive is deprecated, use eventMode = 'none'/'passive'/'auto'/'static'/'dynamic' instead.Deprecated since v7.2.0

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

}

// view todays date
let today = displayDateText(app);

// Ticler
app.ticker.add(() => {

    console.log("tick...");
    if (loadingEnd) {
        image1.x = image1.x + 1;
        if (image1.x >= WIDTH + image1.width / 2) {
            image1.x = -image1.width / 2;
        }
    }

});



