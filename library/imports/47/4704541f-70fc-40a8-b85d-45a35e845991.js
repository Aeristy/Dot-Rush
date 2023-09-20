"use strict";
cc._RF.push(module, '47045QfcPxAqLhdRaNehFmR', 'BallController');
// Scripts/BallController.ts

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
var GameController_1 = require("./GameController");
var SoundController_1 = require("./SoundController");
var Utils_1 = require("./Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BallController = /** @class */ (function (_super) {
    __extends(BallController, _super);
    function BallController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.centerPos = null;
        _this.ringEffectPrefab = null;
        _this.particleEffectPrefab = null;
        _this.duration = 1.2;
        _this.interval = 0.01;
        _this.time = _this.interval;
        _this.target = null;
        _this.previous = null;
        _this.trailEnable = false;
        _this.ringEffect = null;
        _this.particleEffect = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    BallController.prototype.updateDuration = function (duration) {
        this.duration = duration;
    };
    BallController.prototype.onCollisionEnter = function (other, self) {
        if (other.tag == self.tag) {
            this.onHitEffect();
            this.onHitSound();
            var worldPos = self.node.convertToWorldSpaceAR(cc.Vec2.ZERO_R);
            var otherWorldPos = other.node.convertToWorldSpaceAR(cc.Vec2.ZERO_R);
            GameController_1.default.instance.addScore(1);
            var deltaX = worldPos.x - otherWorldPos.x;
            var deltaY = worldPos.y - otherWorldPos.y;
            var normalizedDelta = cc.v2(deltaX, deltaY).normalize();
            // var angle = Math.atan2(normalizedDelta.y,normalizedDelta.x) * 180 / Math.PI;
            // cc.log(angle);
            this.trailEnable = true;
            cc.tween(this.node)
                .to(this.duration * 0.5, { position: cc.v3(normalizedDelta.mul(2000)) })
                .start();
            this.scheduleOnce(function () {
                GameController_1.default.instance.destroyBall();
            }, this.duration * 0.4);
        }
        else {
            this.onHitEffect();
            other.node.destroy();
            GameController_1.default.instance.onGameOver();
        }
    };
    BallController.prototype.onHitSound = function () {
        if (Utils_1.default.random(0, 1) == 0)
            SoundController_1.default.instance.play("hit1");
        else
            SoundController_1.default.instance.play("hit1");
    };
    BallController.prototype.onLoad = function () {
        this.updateDuration(GameController_1.default.instance.duration);
        this.target = this.node;
        this.node.zIndex = 30000;
    };
    BallController.prototype.start = function () { };
    BallController.prototype.addTrailt = function () {
        this.time = this.interval;
        var clone = new cc.Node();
        clone.parent = this.node.parent;
        clone.scale = this.target.scale;
        clone.opacity = 200;
        if (this.previous == null)
            clone.zIndex = 10000;
        else
            clone.zIndex = this.previous.zIndex - 1;
        var targetPos = this.node.convertToWorldSpaceAR(cc.Vec2.ZERO_R);
        clone.position = cc.v3(this.node.x, this.node.y);
        clone.addComponent(cc.Sprite).spriteFrame = this.target.getComponent(cc.Sprite).spriteFrame;
        clone.setContentSize(this.target.getContentSize());
        cc.tween(clone)
            .to(this.duration * 0.5, { opacity: 0 })
            .start();
        cc.tween(clone)
            .to(this.duration * 0.5, { scale: 0 })
            .start();
        this.previous = clone;
    };
    BallController.prototype.onHitEffect = function () {
        this.particleEffect = cc.instantiate(this.particleEffectPrefab);
        this.particleEffect.zIndex = 2;
        this.particleEffect.parent = this.node.parent;
        this.particleEffect.position = cc.v3(this.node.x, this.node.y);
        cc.tween(this.particleEffect)
            .to(1, { opacity: 0 })
            .then(cc.tween(this.particleEffect).removeSelf())
            .start();
        this.ringEffect = cc.instantiate(this.ringEffectPrefab);
        this.ringEffect.zIndex = 3;
        this.ringEffect.parent = this.node.parent;
        this.ringEffect.scale = 1;
        this.ringEffect.opacity = 125;
        this.ringEffect.position = cc.v3(this.node.x, this.node.y);
        cc.tween(this.ringEffect)
            .to(0.2, { scale: 1.3, opacity: 200 })
            .then(cc.tween(this.ringEffect).to(0.4, { scale: 0.5, opacity: 0 }))
            .then(cc.tween(this.ringEffect).removeSelf())
            .start();
    };
    BallController.prototype.update = function (dt) {
        this.updateDuration(GameController_1.default.instance.duration);
        if (!this.trailEnable)
            return;
        if (this.time > 0)
            this.time -= dt;
        else {
            this.addTrailt();
        }
    };
    __decorate([
        property(cc.Vec2)
    ], BallController.prototype, "centerPos", void 0);
    __decorate([
        property(cc.Prefab)
    ], BallController.prototype, "ringEffectPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], BallController.prototype, "particleEffectPrefab", void 0);
    BallController = __decorate([
        ccclass
    ], BallController);
    return BallController;
}(cc.Component));
exports.default = BallController;

cc._RF.pop();