"use strict";
cc._RF.push(module, 'd4a18TVoGZNvaTl7ZPIyVIP', 'TrailEffect');
// Scripts/TrailEffect.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ShadowEffect = /** @class */ (function (_super) {
    __extends(ShadowEffect, _super);
    function ShadowEffect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.interval = 0.01;
        _this.time = _this.interval;
        _this.target = null;
        _this.previous = null;
        _this.enable = false;
        return _this;
    }
    ShadowEffect_1 = ShadowEffect;
    ShadowEffect.prototype.onLoad = function () {
        ShadowEffect_1.instance = this;
        this.target = this.node;
    };
    ShadowEffect.prototype.update = function (dt) {
        if (!this.enable)
            return;
        if (this.time > 0)
            this.time -= dt;
        else {
            this.time = this.interval;
            var clone = new cc.Node();
            clone.parent = this.node.parent.parent;
            clone.scale = this.target.scale;
            if (this.previous == null)
                clone.zIndex = 30000;
            else
                clone.zIndex = this.previous.zIndex - 1;
            var targetPos = this.node.convertToWorldSpaceAR(cc.Vec2.ZERO_R);
            clone.position = cc.v3(targetPos.x, targetPos.y);
            console.log(targetPos.x, clone.position.x);
            console.log(targetPos.y, clone.position.y);
            clone.addComponent(cc.Sprite).spriteFrame = this.target.getComponent(cc.Sprite).spriteFrame;
            clone.setContentSize(this.target.getContentSize());
            cc.tween(clone).to(0.4, { opacity: 0 }).start();
            cc.tween(clone).to(0.4, { scale: 0 }).start();
            this.previous = clone;
        }
    };
    var ShadowEffect_1;
    ShadowEffect = ShadowEffect_1 = __decorate([
        ccclass
    ], ShadowEffect);
    return ShadowEffect;
}(cc.Component));
exports.default = ShadowEffect;

cc._RF.pop();