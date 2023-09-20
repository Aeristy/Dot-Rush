"use strict";
cc._RF.push(module, 'c69f8BpDG9CQYLTLMV//98I', 'MenuController');
// Scripts/MenuController.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html
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
var Utils_1 = require("./Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MenuController = /** @class */ (function (_super) {
    __extends(MenuController, _super);
    function MenuController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Game = null;
        _this.Title = null;
        _this.bestScore = null;
        _this.Tap = null;
        _this.soundButton = null;
        _this.playButton = null;
        _this.soundButtonOnSpriteFrame = null;
        _this.soundButtonOffSpriteFrame = null;
        _this.backgroundMusic = null;
        _this.btnClick = null;
        _this.music = null;
        return _this;
    }
    MenuController_1 = MenuController;
    // LIFE-CYCLE CALLBACKS:
    MenuController.prototype.onLoad = function () {
        var titlePos = this.Title.position;
        MenuController_1.instance = this;
        if (cc.sys.localStorage.getItem("bestScoreDotRush") == null)
            cc.sys.localStorage.setItem("bestScoreDotRush", 0);
        cc.tween(this.playButton)
            .repeatForever(cc.tween(this.playButton).to(0.5, { scale: 1.2 }).to(0.5, { scale: 1 }))
            .start();
        cc.tween(this.Title)
            .repeatForever(cc
            .tween(this.Title)
            .to(0.5, { position: cc.v3(titlePos.x, titlePos.y - 50) })
            .to(0.5, { position: cc.v3(titlePos) }))
            .start();
        this.bestScore.string = "Best " + Utils_1.default.getLocal("bestScoreDotRush");
        Utils_1.default.setLocal("sound", true);
    };
    MenuController.prototype.start = function () { };
    MenuController.prototype.onPlayButtonClick = function () {
        if (JSON.parse(Utils_1.default.getLocal("sound")))
            cc.audioEngine.play(this.btnClick, false, 1);
        this.Game.active = true;
        this.Game.opacity = 0;
        cc.tween(this.Game).to(0.8, { opacity: 255 }).start();
        this.node.parent.active = false;
    };
    MenuController.prototype.onFirstTap = function () {
        this.music = cc.audioEngine.play(this.backgroundMusic, true, 1);
        this.node.parent.active = true;
        this.node.parent.opacity = 0;
        cc.tween(this.node.parent).to(0.8, { opacity: 255 }).start();
        this.Tap.active = false;
        this.Tap.destroy();
    };
    MenuController.prototype.onClickSoundButton = function () {
        cc.tween(this.soundButton)
            .to(0.05, {
            position: cc.v3(this.soundButton.position.x, this.soundButton.position.y - 7),
        })
            .to(0.05, { position: cc.v3(this.soundButton.position) })
            .start();
        Utils_1.default.setLocal("sound", !JSON.parse(Utils_1.default.getLocal("sound")));
        this.updateSound();
    };
    MenuController.prototype.updateSound = function () {
        if (JSON.parse(Utils_1.default.getLocal("sound"))) {
            this.soundButton.getComponent(cc.Sprite).spriteFrame =
                this.soundButtonOnSpriteFrame;
        }
        else {
            this.soundButton.getComponent(cc.Sprite).spriteFrame =
                this.soundButtonOffSpriteFrame;
        }
    };
    MenuController.prototype.update = function (dt) {
        if (!JSON.parse(Utils_1.default.getLocal("sound")))
            cc.audioEngine.pause(this.music);
        if (JSON.parse(Utils_1.default.getLocal("sound")))
            cc.audioEngine.resume(this.music);
        this.updateSound();
    };
    var MenuController_1;
    __decorate([
        property(cc.Node)
    ], MenuController.prototype, "Game", void 0);
    __decorate([
        property(cc.Node)
    ], MenuController.prototype, "Title", void 0);
    __decorate([
        property(cc.Label)
    ], MenuController.prototype, "bestScore", void 0);
    __decorate([
        property(cc.Node)
    ], MenuController.prototype, "Tap", void 0);
    __decorate([
        property(cc.Node)
    ], MenuController.prototype, "soundButton", void 0);
    __decorate([
        property(cc.Node)
    ], MenuController.prototype, "playButton", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], MenuController.prototype, "soundButtonOnSpriteFrame", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], MenuController.prototype, "soundButtonOffSpriteFrame", void 0);
    __decorate([
        property(cc.AudioClip)
    ], MenuController.prototype, "backgroundMusic", void 0);
    __decorate([
        property(cc.AudioClip)
    ], MenuController.prototype, "btnClick", void 0);
    MenuController = MenuController_1 = __decorate([
        ccclass
    ], MenuController);
    return MenuController;
}(cc.Component));
exports.default = MenuController;

cc._RF.pop();