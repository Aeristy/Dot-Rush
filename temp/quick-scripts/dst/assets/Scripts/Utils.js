
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Utils.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7e82bZFgOtKoItEpx2880NZ', 'Utils');
// Scripts/Utils.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Utils = /** @class */ (function (_super) {
    __extends(Utils, _super);
    function Utils() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Utils.worldSpaceToLocal = function (worldSpace, local) {
    };
    Utils.random = function (minInclusive, maxInclusive) {
        return Math.floor(Math.random() * (maxInclusive - minInclusive + 1)) + minInclusive;
    };
    Utils.getLocal = function (itemName) {
        return cc.sys.localStorage.getItem(itemName);
    };
    Utils.setLocal = function (itemName, value) {
        return cc.sys.localStorage.setItem(itemName, value);
    };
    return Utils;
}(cc.Component));
exports.default = Utils;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU0sSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUM7SUFBbUMseUJBQVk7SUFBL0M7O0lBdUJBLENBQUM7SUFuQmlCLHVCQUFpQixHQUEvQixVQUFnQyxVQUFtQixFQUFFLEtBQVc7SUFFaEUsQ0FBQztJQUVhLFlBQU0sR0FBcEIsVUFBcUIsWUFBb0IsRUFBRSxZQUFvQjtRQUMzRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsWUFBWSxHQUFHLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQztJQUN4RixDQUFDO0lBRWEsY0FBUSxHQUF0QixVQUF1QixRQUFnQjtRQUNuQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRWEsY0FBUSxHQUF0QixVQUF1QixRQUFnQixFQUFFLEtBQVU7UUFDL0MsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFLTCxZQUFDO0FBQUQsQ0F2QkEsQUF1QkMsQ0F2QmtDLEVBQUUsQ0FBQyxTQUFTLEdBdUI5QyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVdGlscyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyB3b3JsZFNwYWNlVG9Mb2NhbCh3b3JsZFNwYWNlOiBjYy5WZWMyLCBsb2NhbDogTm9kZSkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHJhbmRvbShtaW5JbmNsdXNpdmU6IG51bWJlciwgbWF4SW5jbHVzaXZlOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4SW5jbHVzaXZlIC0gbWluSW5jbHVzaXZlICsgMSkpICsgbWluSW5jbHVzaXZlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TG9jYWwoaXRlbU5hbWU6IHN0cmluZyk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShpdGVtTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBzZXRMb2NhbChpdGVtTmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgcmV0dXJuIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShpdGVtTmFtZSwgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNjLnR3ZWVuKHRoaXMuc291bmRCdXR0b24pXHJcbiAgICAvLyAgICAgICAgIC50bygwLjA1LCB7IHBvc2l0aW9uOiBjYy52Myh0aGlzLnNvdW5kQnV0dG9uLnBvc2l0aW9uLngsIHRoaXMuc291bmRCdXR0b24ucG9zaXRpb24ueSAtIDcpIH0pXHJcbiAgICAvLyAgICAgICAgIC50bygwLjA1LCB7IHBvc2l0aW9uOiBjYy52Myh0aGlzLnNvdW5kQnV0dG9uLnBvc2l0aW9uKSB9KS5zdGFydCgpO1xyXG59Il19