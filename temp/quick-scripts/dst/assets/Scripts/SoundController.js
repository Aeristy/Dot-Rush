
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/SoundController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c1ff4Cb0CRNTpMM0WEfIQMd', 'SoundController');
// Scripts/SoundController.ts

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
var Utils_1 = require("./Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SoundController = /** @class */ (function (_super) {
    __extends(SoundController, _super);
    function SoundController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.audioClips = new Array();
        _this.player = null;
        return _this;
    }
    SoundController_1 = SoundController;
    SoundController.prototype.onLoad = function () {
        this.player = this.getComponent(cc.AudioSource);
        SoundController_1.instance = this;
    };
    SoundController.prototype.play = function (soundName) {
        var _this = this;
        if (JSON.parse(Utils_1.default.getLocal('sound')))
            this.audioClips.forEach(function (clip) {
                if (clip.name == soundName) {
                    _this.player.clip = clip;
                    _this.player.isPlaying;
                    _this.player.play();
                }
            });
    };
    var SoundController_1;
    SoundController.instance = null;
    __decorate([
        property(Array(cc.AudioClip))
    ], SoundController.prototype, "audioClips", void 0);
    SoundController = SoundController_1 = __decorate([
        ccclass
    ], SoundController);
    return SoundController;
}(cc.Component));
exports.default = SoundController;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcU291bmRDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUE0QjtBQUV0QixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUE2QyxtQ0FBWTtJQUF6RDtRQUFBLHFFQXVCQztRQW5CRyxnQkFBVSxHQUF3QixJQUFJLEtBQUssRUFBZ0IsQ0FBQztRQUU1RCxZQUFNLEdBQW1CLElBQUksQ0FBQzs7SUFpQmxDLENBQUM7d0JBdkJvQixlQUFlO0lBUWhDLGdDQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2hELGlCQUFlLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztJQUNwQyxDQUFDO0lBRUQsOEJBQUksR0FBSixVQUFLLFNBQWlCO1FBQXRCLGlCQVNDO1FBUkcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO2dCQUN4QixJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksU0FBUyxFQUFFO29CQUN4QixLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ3hCLEtBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFBO29CQUNyQixLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO2lCQUN0QjtZQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQzs7SUFyQmEsd0JBQVEsR0FBb0IsSUFBSSxDQUFDO0lBRy9DO1FBREMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7dURBQzhCO0lBSjNDLGVBQWU7UUFEbkMsT0FBTztPQUNhLGVBQWUsQ0F1Qm5DO0lBQUQsc0JBQUM7Q0F2QkQsQUF1QkMsQ0F2QjRDLEVBQUUsQ0FBQyxTQUFTLEdBdUJ4RDtrQkF2Qm9CLGVBQWUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVXRpbHMgZnJvbSBcIi4vVXRpbHNcIjtcbiBcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG4gXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU291bmRDb250cm9sbGVyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcbiAgICBwdWJsaWMgc3RhdGljIGluc3RhbmNlOiBTb3VuZENvbnRyb2xsZXIgPSBudWxsO1xuIFxuICAgIEBwcm9wZXJ0eShBcnJheShjYy5BdWRpb0NsaXApKVxuICAgIGF1ZGlvQ2xpcHM6IEFycmF5PGNjLkF1ZGlvQ2xpcD4gPSBuZXcgQXJyYXk8Y2MuQXVkaW9DbGlwPigpO1xuIFxuICAgIHBsYXllcjogY2MuQXVkaW9Tb3VyY2UgPSBudWxsO1xuIFxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSB0aGlzLmdldENvbXBvbmVudChjYy5BdWRpb1NvdXJjZSk7XG4gICAgICAgIFNvdW5kQ29udHJvbGxlci5pbnN0YW5jZSA9IHRoaXM7XG4gICAgfVxuIFxuICAgIHBsYXkoc291bmROYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKEpTT04ucGFyc2UoVXRpbHMuZ2V0TG9jYWwoJ3NvdW5kJykpKVxuICAgICAgICAgICAgdGhpcy5hdWRpb0NsaXBzLmZvckVhY2goY2xpcCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNsaXAubmFtZSA9PSBzb3VuZE5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuY2xpcCA9IGNsaXA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLmlzUGxheWluZ1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5wbGF5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxufSJdfQ==