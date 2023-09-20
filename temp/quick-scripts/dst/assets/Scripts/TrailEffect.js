
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/TrailEffect.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVHJhaWxFZmZlY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU0sSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBMEMsZ0NBQVk7SUFBdEQ7UUFBQSxxRUF3Q0M7UUFuQ0csY0FBUSxHQUFHLElBQUksQ0FBQTtRQUNmLFVBQUksR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFBO1FBQ3BCLFlBQU0sR0FBWSxJQUFJLENBQUE7UUFDdEIsY0FBUSxHQUFZLElBQUksQ0FBQTtRQUN4QixZQUFNLEdBQVksS0FBSyxDQUFDOztJQStCNUIsQ0FBQztxQkF4Q29CLFlBQVk7SUFVbkIsNkJBQU0sR0FBaEI7UUFDSSxjQUFZLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUE7SUFDM0IsQ0FBQztJQUVTLDZCQUFNLEdBQWhCLFVBQWlCLEVBQVU7UUFDdkIsSUFBRyxDQUFDLElBQUksQ0FBQyxNQUFNO1lBQUUsT0FBTztRQUN4QixJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQztZQUFFLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFBO2FBQzdCO1lBQ0QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFBO1lBQ3pCLElBQUksS0FBSyxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFBO1lBRXpCLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQ3ZDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUE7WUFDL0IsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUk7Z0JBQUUsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7O2dCQUMxQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQTtZQUU1QyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDaEUsS0FBSyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hELE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFDLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFBO1lBQzNGLEtBQUssQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFBO1lBQ2xELEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFBO1lBQy9DLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFBO1lBRTdDLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFBO1NBRXhCO0lBQ0wsQ0FBQzs7SUF2Q2dCLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0F3Q2hDO0lBQUQsbUJBQUM7Q0F4Q0QsQUF3Q0MsQ0F4Q3lDLEVBQUUsQ0FBQyxTQUFTLEdBd0NyRDtrQkF4Q29CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hhZG93RWZmZWN0IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgaW5zdGFuY2U6IFNoYWRvd0VmZmVjdDtcblxuXG5cbiAgICBpbnRlcnZhbCA9IDAuMDFcbiAgICB0aW1lID0gdGhpcy5pbnRlcnZhbFxuICAgIHRhcmdldDogY2MuTm9kZSA9IG51bGxcbiAgICBwcmV2aW91czogY2MuTm9kZSA9IG51bGxcbiAgICBlbmFibGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCk6IHZvaWQge1xuICAgICAgICBTaGFkb3dFZmZlY3QuaW5zdGFuY2UgPSB0aGlzO1xuICAgICAgICB0aGlzLnRhcmdldCA9IHRoaXMubm9kZVxuICAgIH1cblxuICAgIHByb3RlY3RlZCB1cGRhdGUoZHQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZighdGhpcy5lbmFibGUpIHJldHVybjtcbiAgICAgICAgaWYgKHRoaXMudGltZSA+IDApIHRoaXMudGltZSAtPSBkdFxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudGltZSA9IHRoaXMuaW50ZXJ2YWxcbiAgICAgICAgICAgIGxldCBjbG9uZSA9IG5ldyBjYy5Ob2RlKClcblxuICAgICAgICAgICAgY2xvbmUucGFyZW50ID0gdGhpcy5ub2RlLnBhcmVudC5wYXJlbnQ7XG4gICAgICAgICAgICBjbG9uZS5zY2FsZSA9IHRoaXMudGFyZ2V0LnNjYWxlXG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2aW91cyA9PSBudWxsKSBjbG9uZS56SW5kZXggPSAzMDAwMFxuICAgICAgICAgICAgZWxzZSBjbG9uZS56SW5kZXggPSB0aGlzLnByZXZpb3VzLnpJbmRleCAtIDFcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IHRhcmdldFBvcyA9IHRoaXMubm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMi5aRVJPX1IpO1xuICAgICAgICAgICAgY2xvbmUucG9zaXRpb24gPSBjYy52Myh0YXJnZXRQb3MueCx0YXJnZXRQb3MueSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0YXJnZXRQb3MueCxjbG9uZS5wb3NpdGlvbi54KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRhcmdldFBvcy55LGNsb25lLnBvc2l0aW9uLnkpO1xuICAgICAgICAgICAgY2xvbmUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnRhcmdldC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZVxuICAgICAgICAgICAgY2xvbmUuc2V0Q29udGVudFNpemUodGhpcy50YXJnZXQuZ2V0Q29udGVudFNpemUoKSlcbiAgICAgICAgICAgIGNjLnR3ZWVuKGNsb25lKS50bygwLjQsIHsgb3BhY2l0eTogMCB9KS5zdGFydCgpXG4gICAgICAgICAgICBjYy50d2VlbihjbG9uZSkudG8oMC40LCB7IHNjYWxlOiAwIH0pLnN0YXJ0KClcblxuICAgICAgICAgICAgdGhpcy5wcmV2aW91cyA9IGNsb25lXG5cbiAgICAgICAgfVxuICAgIH1cbn0iXX0=