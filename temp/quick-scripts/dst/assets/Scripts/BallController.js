
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/BallController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQmFsbENvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQiw0RUFBNEU7QUFDNUUsbUJBQW1CO0FBQ25CLHNGQUFzRjtBQUN0Riw4QkFBOEI7QUFDOUIsc0ZBQXNGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFdEYsbURBQThDO0FBQzlDLHFEQUFnRDtBQUNoRCxpQ0FBNEI7QUFFdEIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBNEMsa0NBQVk7SUFBeEQ7UUFBQSxxRUEySEM7UUF6SEMsZUFBUyxHQUFZLElBQUksQ0FBQztRQUcxQixzQkFBZ0IsR0FBYyxJQUFJLENBQUM7UUFHbkMsMEJBQW9CLEdBQWMsSUFBSSxDQUFDO1FBRXZDLGNBQVEsR0FBRyxHQUFHLENBQUM7UUFFZixjQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLFVBQUksR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3JCLFlBQU0sR0FBWSxJQUFJLENBQUM7UUFDdkIsY0FBUSxHQUFZLElBQUksQ0FBQztRQUN6QixpQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3QixnQkFBVSxHQUFZLElBQUksQ0FBQztRQUMzQixvQkFBYyxHQUFZLElBQUksQ0FBQzs7SUF5R2pDLENBQUM7SUF2R0Msd0JBQXdCO0lBQ3hCLHVDQUFjLEdBQWQsVUFBZSxRQUFnQjtRQUM3QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUMzQixDQUFDO0lBRUQseUNBQWdCLEdBQWhCLFVBQWlCLEtBQWtCLEVBQUUsSUFBaUI7UUFDcEQsSUFBSSxLQUFLLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDekIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZ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LEVBQUUsQ0FBQyxDQUFDO2FBQ25FLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQzthQUM1QyxLQUFLLEVBQUUsQ0FBQztJQUNiLENBQUM7SUFDRCwrQkFBTSxHQUFOLFVBQU8sRUFBRTtRQUNQLElBQUksQ0FBQyxjQUFjLENBQUMsd0JBQWMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXO1lBQUUsT0FBTztRQUM5QixJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQztZQUFFLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO2FBQzlCO1lBQ0gsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ2xCO0lBQ0gsQ0FBQztJQXhIRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3FEQUNRO0lBRzFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7NERBQ2U7SUFHbkM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztnRUFDbUI7SUFScEIsY0FBYztRQURsQyxPQUFPO09BQ2EsY0FBYyxDQTJIbEM7SUFBRCxxQkFBQztDQTNIRCxBQTJIQyxDQTNIMkMsRUFBRSxDQUFDLFNBQVMsR0EySHZEO2tCQTNIb0IsY0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvMi40L21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvMi40L21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvMi40L21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5pbXBvcnQgR2FtZUNvbnRyb2xsZXIgZnJvbSBcIi4vR2FtZUNvbnRyb2xsZXJcIjtcbmltcG9ydCBTb3VuZENvbnRyb2xsZXIgZnJvbSBcIi4vU291bmRDb250cm9sbGVyXCI7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4vVXRpbHNcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhbGxDb250cm9sbGVyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcbiAgQHByb3BlcnR5KGNjLlZlYzIpXG4gIGNlbnRlclBvczogY2MuVmVjMiA9IG51bGw7XG5cbiAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgcmluZ0VmZmVjdFByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcblxuICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICBwYXJ0aWNsZUVmZmVjdFByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcblxuICBkdXJhdGlvbiA9IDEuMjtcblxuICBpbnRlcnZhbCA9IDAuMDE7XG4gIHRpbWUgPSB0aGlzLmludGVydmFsO1xuICB0YXJnZXQ6IGNjLk5vZGUgPSBudWxsO1xuICBwcmV2aW91czogY2MuTm9kZSA9IG51bGw7XG4gIHRyYWlsRW5hYmxlOiBib29sZWFuID0gZmFsc2U7XG4gIHJpbmdFZmZlY3Q6IGNjLk5vZGUgPSBudWxsO1xuICBwYXJ0aWNsZUVmZmVjdDogY2MuTm9kZSA9IG51bGw7XG5cbiAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG4gIHVwZGF0ZUR1cmF0aW9uKGR1cmF0aW9uOiBudW1iZXIpIHtcbiAgICB0aGlzLmR1cmF0aW9uID0gZHVyYXRpb247XG4gIH1cblxuICBvbkNvbGxpc2lvbkVudGVyKG90aGVyOiBjYy5Db2xsaWRlciwgc2VsZjogY2MuQ29sbGlkZXIpIHtcbiAgICBpZiAob3RoZXIudGFnID09IHNlbGYudGFnKSB7XG4gICAgICB0aGlzLm9uSGl0RWZmZWN0KCk7XG4gICAgICB0aGlzLm9uSGl0U291bmQoKTtcbiAgICAgIGxldCB3b3JsZFBvcyA9IHNlbGYubm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMi5aRVJPX1IpO1xuICAgICAgbGV0IG90aGVyV29ybGRQb3MgPSBvdGhlci5ub2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMyLlpFUk9fUik7XG5cbiAgICAgIEdhbWVDb250cm9sbGVyLmluc3RhbmNlLmFkZFNjb3JlKDEpO1xuICAgICAgdmFyIGRlbHRhWCA9IHdvcmxkUG9zLnggLSBvdGhlcldvcmxkUG9zLng7XG4gICAgICB2YXIgZGVsdGFZID0gd29ybGRQb3MueSAtIG90aGVyV29ybGRQb3MueTtcbiAgICAgIGxldCBub3JtYWxpemVkRGVsdGEgPSBjYy52MihkZWx0YVgsIGRlbHRhWSkubm9ybWFsaXplKCk7XG5cbiAgICAgIC8vIHZhciBhbmdsZSA9IE1hdGguYXRhbjIobm9ybWFsaXplZERlbHRhLnksbm9ybWFsaXplZERlbHRhLngpICogMTgwIC8gTWF0aC5QSTtcbiAgICAgIC8vIGNjLmxvZyhhbmdsZSk7XG4gICAgICB0aGlzLnRyYWlsRW5hYmxlID0gdHJ1ZTtcbiAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZSlcbiAgICAgICAgLnRvKHRoaXMuZHVyYXRpb24gKiAwLjUsIHsgcG9zaXRpb246IGNjLnYzKG5vcm1hbGl6ZWREZWx0YS5tdWwoMjAwMCkpIH0pXG4gICAgICAgIC5zdGFydCgpO1xuXG4gICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XG4gICAgICAgIEdhbWVDb250cm9sbGVyLmluc3RhbmNlLmRlc3Ryb3lCYWxsKCk7XG4gICAgICB9LCB0aGlzLmR1cmF0aW9uICogMC40KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vbkhpdEVmZmVjdCgpO1xuICAgICAgb3RoZXIubm9kZS5kZXN0cm95KCk7XG4gICAgICBHYW1lQ29udHJvbGxlci5pbnN0YW5jZS5vbkdhbWVPdmVyKCk7XG4gICAgfVxuICB9XG5cbiAgb25IaXRTb3VuZCgpIHtcbiAgICBpZiAoVXRpbHMucmFuZG9tKDAsIDEpID09IDApIFNvdW5kQ29udHJvbGxlci5pbnN0YW5jZS5wbGF5KFwiaGl0MVwiKTtcbiAgICBlbHNlIFNvdW5kQ29udHJvbGxlci5pbnN0YW5jZS5wbGF5KFwiaGl0MVwiKTtcbiAgfVxuXG4gIG9uTG9hZCgpIHtcbiAgICB0aGlzLnVwZGF0ZUR1cmF0aW9uKEdhbWVDb250cm9sbGVyLmluc3RhbmNlLmR1cmF0aW9uKTtcbiAgICB0aGlzLnRhcmdldCA9IHRoaXMubm9kZTtcbiAgICB0aGlzLm5vZGUuekluZGV4ID0gMzAwMDA7XG4gIH1cblxuICBzdGFydCgpIHt9XG5cbiAgYWRkVHJhaWx0KCkge1xuICAgIHRoaXMudGltZSA9IHRoaXMuaW50ZXJ2YWw7XG4gICAgbGV0IGNsb25lID0gbmV3IGNjLk5vZGUoKTtcblxuICAgIGNsb25lLnBhcmVudCA9IHRoaXMubm9kZS5wYXJlbnQ7XG4gICAgY2xvbmUuc2NhbGUgPSB0aGlzLnRhcmdldC5zY2FsZTtcbiAgICBjbG9uZS5vcGFjaXR5ID0gMjAwO1xuICAgIGlmICh0aGlzLnByZXZpb3VzID09IG51bGwpIGNsb25lLnpJbmRleCA9IDEwMDAwO1xuICAgIGVsc2UgY2xvbmUuekluZGV4ID0gdGhpcy5wcmV2aW91cy56SW5kZXggLSAxO1xuXG4gICAgbGV0IHRhcmdldFBvcyA9IHRoaXMubm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMi5aRVJPX1IpO1xuICAgIGNsb25lLnBvc2l0aW9uID0gY2MudjModGhpcy5ub2RlLngsIHRoaXMubm9kZS55KTtcblxuICAgIGNsb25lLmFkZENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy50YXJnZXQuZ2V0Q29tcG9uZW50KFxuICAgICAgY2MuU3ByaXRlXG4gICAgKS5zcHJpdGVGcmFtZTtcbiAgICBjbG9uZS5zZXRDb250ZW50U2l6ZSh0aGlzLnRhcmdldC5nZXRDb250ZW50U2l6ZSgpKTtcbiAgICBjYy50d2VlbihjbG9uZSlcbiAgICAgIC50byh0aGlzLmR1cmF0aW9uICogMC41LCB7IG9wYWNpdHk6IDAgfSlcbiAgICAgIC5zdGFydCgpO1xuICAgIGNjLnR3ZWVuKGNsb25lKVxuICAgICAgLnRvKHRoaXMuZHVyYXRpb24gKiAwLjUsIHsgc2NhbGU6IDAgfSlcbiAgICAgIC5zdGFydCgpO1xuXG4gICAgdGhpcy5wcmV2aW91cyA9IGNsb25lO1xuICB9XG4gIG9uSGl0RWZmZWN0KCkge1xuICAgIHRoaXMucGFydGljbGVFZmZlY3QgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBhcnRpY2xlRWZmZWN0UHJlZmFiKTtcbiAgICB0aGlzLnBhcnRpY2xlRWZmZWN0LnpJbmRleCA9IDI7XG4gICAgdGhpcy5wYXJ0aWNsZUVmZmVjdC5wYXJlbnQgPSB0aGlzLm5vZGUucGFyZW50O1xuICAgIHRoaXMucGFydGljbGVFZmZlY3QucG9zaXRpb24gPSBjYy52Myh0aGlzLm5vZGUueCwgdGhpcy5ub2RlLnkpO1xuICAgIGNjLnR3ZWVuKHRoaXMucGFydGljbGVFZmZlY3QpXG4gICAgICAudG8oMSwgeyBvcGFjaXR5OiAwIH0pXG4gICAgICAudGhlbihjYy50d2Vlbih0aGlzLnBhcnRpY2xlRWZmZWN0KS5yZW1vdmVTZWxmKCkpXG4gICAgICAuc3RhcnQoKTtcblxuICAgIHRoaXMucmluZ0VmZmVjdCA9IGNjLmluc3RhbnRpYXRlKHRoaXMucmluZ0VmZmVjdFByZWZhYik7XG4gICAgdGhpcy5yaW5nRWZmZWN0LnpJbmRleCA9IDM7XG4gICAgdGhpcy5yaW5nRWZmZWN0LnBhcmVudCA9IHRoaXMubm9kZS5wYXJlbnQ7XG4gICAgdGhpcy5yaW5nRWZmZWN0LnNjYWxlID0gMTtcbiAgICB0aGlzLnJpbmdFZmZlY3Qub3BhY2l0eSA9IDEyNTtcbiAgICB0aGlzLnJpbmdFZmZlY3QucG9zaXRpb24gPSBjYy52Myh0aGlzLm5vZGUueCwgdGhpcy5ub2RlLnkpO1xuICAgIGNjLnR3ZWVuKHRoaXMucmluZ0VmZmVjdClcbiAgICAgIC50bygwLjIsIHsgc2NhbGU6IDEuMywgb3BhY2l0eTogMjAwIH0pXG4gICAgICAudGhlbihjYy50d2Vlbih0aGlzLnJpbmdFZmZlY3QpLnRvKDAuNCwgeyBzY2FsZTogMC41LCBvcGFjaXR5OiAwIH0pKVxuICAgICAgLnRoZW4oY2MudHdlZW4odGhpcy5yaW5nRWZmZWN0KS5yZW1vdmVTZWxmKCkpXG4gICAgICAuc3RhcnQoKTtcbiAgfVxuICB1cGRhdGUoZHQpIHtcbiAgICB0aGlzLnVwZGF0ZUR1cmF0aW9uKEdhbWVDb250cm9sbGVyLmluc3RhbmNlLmR1cmF0aW9uKTtcbiAgICBpZiAoIXRoaXMudHJhaWxFbmFibGUpIHJldHVybjtcbiAgICBpZiAodGhpcy50aW1lID4gMCkgdGhpcy50aW1lIC09IGR0O1xuICAgIGVsc2Uge1xuICAgICAgdGhpcy5hZGRUcmFpbHQoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==