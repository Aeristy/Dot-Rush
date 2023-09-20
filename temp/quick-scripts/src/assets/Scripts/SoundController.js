"use strict";
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