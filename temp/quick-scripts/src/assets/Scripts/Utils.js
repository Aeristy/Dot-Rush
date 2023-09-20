"use strict";
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