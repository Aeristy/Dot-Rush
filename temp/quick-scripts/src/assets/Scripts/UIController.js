"use strict";
cc._RF.push(module, 'ba534Gm/7pAVLXYkKhfWoX4', 'UIController');
// Scripts/UIController.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var GameController_1 = require("./GameController");
var Utils_1 = require("./Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIController = /** @class */ (function (_super) {
    __extends(UIController, _super);
    function UIController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // @property(cc.Label)
        // startLabel: cc.Label = null;
        _this.currentScore = null;
        _this.LevelProgress = new Array;
        _this.bestScore = null;
        _this.resultScore = null;
        _this.Newbest = null;
        _this.soundButton = null;
        _this.replayButton = null;
        _this.Game = null;
        _this.Result = null;
        // @property(cc.Node)
        // mainBackground: cc.Node = null;
        // @property(cc.Node)
        // resultBackground: cc.Node = null;
        _this.soundButtonOnSpriteFrame = null;
        _this.soundButtonOffSpriteFrame = null;
        _this.LevelOnSpriteFrame = null;
        _this.LevelOffSpriteFrame = null;
        _this.GamePrefab = null;
        _this.isNewBest = false;
        _this.newGame = null;
        return _this;
    }
    UIController_1 = UIController;
    UIController.prototype.onLoad = function () {
        cc.tween(this.replayButton).repeatForever(cc.tween(this.replayButton).to(0.1, { scale: 0.95 }).to(0.1, { scale: 1 })).start();
        if (cc.sys.localStorage.getItem('bestScoreDotRush') == null)
            cc.sys.localStorage.setItem('bestScoreDotRush', 0);
    };
    UIController.prototype.onReplayButtonClick = function () {
        this.node.parent.parent.active = false;
        this.newGame = cc.instantiate(this.GamePrefab);
        this.newGame.parent = this.node.parent.parent.parent;
        this.newGame.active = true;
        this.newGame.opacity = 0;
        this.newGame.position = cc.v3(-720, -1280);
        cc.tween(this.newGame).to(0.5, { opacity: 255 }).start();
    };
    UIController.prototype.updateScore = function (score) {
        this.currentScore.string = score.toString();
        this.resultScore.string = score.toString();
        this.bestScore.string = 'Best ' + Utils_1.default.getLocal('bestScoreDotRush');
        var progress = score % this.LevelProgress.length;
        if (progress == 0 && score > 0) {
            for (var i = 0; i < this.LevelProgress.length; i++) {
                this.LevelProgress[i].getComponent(cc.Sprite).spriteFrame = this.LevelOffSpriteFrame;
            }
            GameController_1.default.instance.levelUp();
        }
        else {
            for (var i = 0; i < progress; i++) {
                this.LevelProgress[i].getComponent(cc.Sprite).spriteFrame = this.LevelOnSpriteFrame;
            }
        }
    };
    // hideLabel(){
    //     this.startLabel.node.active = false;
    // }
    UIController.prototype.loadScene = function () {
        cc.director.loadScene("GameScene");
    };
    UIController.prototype.fadeInGameOver = function () {
        this.Result.active = true;
        this.Result.opacity = 0;
        cc.tween(this.Result).to(0.8, { opacity: 255 }).start();
        if (this.isNewBest) {
            this.Newbest.active = true;
            cc.tween(this.Newbest).repeatForever(cc.tween(this.Newbest).to(0.12, { angle: 5 }).to(0.12, { angle: -5 })).start();
        }
        this.Game.active = false;
    };
    UIController.prototype.onClickSoundButton = function () {
        cc.tween(this.soundButton)
            .to(0.05, { position: cc.v3(this.soundButton.position.x, this.soundButton.position.y - 7) })
            .to(0.05, { position: cc.v3(this.soundButton.position) }).start();
        Utils_1.default.setLocal('sound', !JSON.parse(Utils_1.default.getLocal('sound')));
        this.updateSound();
    };
    UIController.prototype.updateSound = function () {
        if (JSON.parse(Utils_1.default.getLocal('sound'))) {
            this.soundButton.getComponent(cc.Sprite).spriteFrame = this.soundButtonOnSpriteFrame;
        }
        else {
            this.soundButton.getComponent(cc.Sprite).spriteFrame = this.soundButtonOffSpriteFrame;
        }
    };
    UIController.prototype.start = function () {
        this.bestScore.string = 'Best ' + "0";
        this.updateScore(0);
        this.updateSound();
        UIController_1.instance = this;
    };
    UIController.prototype.update = function (dt) {
        this.updateSound();
    };
    var UIController_1;
    __decorate([
        property(cc.Label)
    ], UIController.prototype, "currentScore", void 0);
    __decorate([
        property(Array(cc.Node))
    ], UIController.prototype, "LevelProgress", void 0);
    __decorate([
        property(cc.Label)
    ], UIController.prototype, "bestScore", void 0);
    __decorate([
        property(cc.Label)
    ], UIController.prototype, "resultScore", void 0);
    __decorate([
        property(cc.Node)
    ], UIController.prototype, "Newbest", void 0);
    __decorate([
        property(cc.Node)
    ], UIController.prototype, "soundButton", void 0);
    __decorate([
        property(cc.Node)
    ], UIController.prototype, "replayButton", void 0);
    __decorate([
        property(cc.Node)
    ], UIController.prototype, "Game", void 0);
    __decorate([
        property(cc.Node)
    ], UIController.prototype, "Result", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], UIController.prototype, "soundButtonOnSpriteFrame", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], UIController.prototype, "soundButtonOffSpriteFrame", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], UIController.prototype, "LevelOnSpriteFrame", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], UIController.prototype, "LevelOffSpriteFrame", void 0);
    __decorate([
        property(cc.Prefab)
    ], UIController.prototype, "GamePrefab", void 0);
    UIController = UIController_1 = __decorate([
        ccclass
    ], UIController);
    return UIController;
}(cc.Component));
exports.default = UIController;

cc._RF.pop();