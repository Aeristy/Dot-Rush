"use strict";
cc._RF.push(module, 'f92b9nnH8JDuoG6gitqRkwi', 'GameController');
// Scripts/GameController.ts

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
var SoundController_1 = require("./SoundController");
var UIController_1 = require("./UIController");
var Utils_1 = require("./Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameController = /** @class */ (function (_super) {
    __extends(GameController, _super);
    function GameController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.redBall = null;
        _this.blueBall = null;
        _this.center = null;
        _this.ballSpawnPos = new Array();
        _this.ballPrefab = new Array();
        _this.levelUpLabel = null;
        _this.currentScore = 0;
        _this.enemyBall = null;
        _this.duration = 1;
        _this.spinDuration = 0.25;
        _this.rotation = 0;
        _this.isSpawnable = false;
        _this.isGameOver = false;
        _this.isSpinning = false;
        return _this;
    }
    GameController_1 = GameController;
    // LIFE-CYCLE CALLBACKS:
    GameController.prototype.onLoad = function () {
        GameController_1.instance = this;
        // Utils.setLocal('bestScoreDotRush', 0);
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.scheduleOnce(function () {
            this.isSpawnable = true;
        }, 1);
    };
    GameController.prototype.spinCenter = function () {
        if (!this.isGameOver && !this.isSpinning) {
            if (Utils_1.default.random(0, 1) == 0)
                SoundController_1.default.instance.play("fire1");
            else
                SoundController_1.default.instance.play("fire2");
            this.rotation += 180;
            cc.tween(this.center)
                .to(this.spinDuration, { angle: -this.rotation })
                .start();
            this.isSpinning = true;
            this.scheduleOnce(function () {
                this.isSpinning = false;
            }, this.spinDuration / 2);
        }
    };
    GameController.prototype.spawnBall = function () {
        var spawnPos = Utils_1.default.random(0, this.ballSpawnPos.length - 1);
        var ballColor = Utils_1.default.random(0, this.ballPrefab.length - 1);
        this.enemyBall = cc.instantiate(this.ballPrefab[ballColor]);
        this.enemyBall.parent = this.node.parent.getChildByName("Gameplay");
        this.enemyBall.x = this.ballSpawnPos[spawnPos].x;
        this.enemyBall.y = this.ballSpawnPos[spawnPos].y;
        cc.tween(this.enemyBall)
            .to(this.duration, { position: cc.v3(this.center.x, this.center.y) })
            .start();
    };
    GameController.prototype.onGameOver = function () {
        SoundController_1.default.instance.play("defeat");
        this.isGameOver = true;
        this.destroyBall();
        cc.tween(this.center).to(1, { angle: this.center.angle }).start();
        this.scheduleOnce(function () {
            UIController_1.default.instance.fadeInGameOver();
        }, 1);
    };
    GameController.prototype.addScore = function (amount) {
        this.currentScore += amount;
        // SoundController.instance.play("GainScore");
        if (this.currentScore > JSON.parse(Utils_1.default.getLocal("bestScoreDotRush"))) {
            Utils_1.default.setLocal("bestScoreDotRush", this.currentScore.toString());
            UIController_1.default.instance.isNewBest = true;
        }
        UIController_1.default.instance.updateScore(this.currentScore);
    };
    GameController.prototype.levelUp = function () {
        SoundController_1.default.instance.play("level");
        this.levelUpLabel.node.active = true;
        this.levelUpLabel.node.opacity = 225;
        this.duration = this.duration * 0.98;
        this.spinDuration = this.spinDuration * 0.95;
        var t2 = cc
            .tween(this.levelUpLabel.node)
            .to(1, { position: cc.v3(0, 450), opacity: 255 });
        cc.tween(this.levelUpLabel.node)
            .set({ position: cc.v3(0, 0) })
            .then(t2)
            .start();
        this.scheduleOnce(function () {
            this.levelUpLabel.node.active = false;
        }, 1.3);
    };
    GameController.prototype.destroyBall = function () {
        this.enemyBall.destroy();
        this.enemyBall = null;
    };
    GameController.prototype.update = function (dt) {
        this.node.on("touchstart", this.spinCenter, this);
        if (this.enemyBall == null && !this.isGameOver && this.isSpawnable) {
            this.spawnBall();
        }
    };
    var GameController_1;
    __decorate([
        property(cc.Node)
    ], GameController.prototype, "redBall", void 0);
    __decorate([
        property(cc.Node)
    ], GameController.prototype, "blueBall", void 0);
    __decorate([
        property(cc.Node)
    ], GameController.prototype, "center", void 0);
    __decorate([
        property(Array(cc.Vec2))
    ], GameController.prototype, "ballSpawnPos", void 0);
    __decorate([
        property(Array(cc.Prefab))
    ], GameController.prototype, "ballPrefab", void 0);
    __decorate([
        property(cc.Label)
    ], GameController.prototype, "levelUpLabel", void 0);
    GameController = GameController_1 = __decorate([
        ccclass
    ], GameController);
    return GameController;
}(cc.Component));
exports.default = GameController;

cc._RF.pop();