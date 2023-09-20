
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/Scripts/BallController');
require('./assets/Scripts/GameController');
require('./assets/Scripts/MenuController');
require('./assets/Scripts/SoundController');
require('./assets/Scripts/TrailEffect');
require('./assets/Scripts/UIController');
require('./assets/Scripts/Utils');

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/MenuController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTWVudUNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQiw0RUFBNEU7QUFDNUUsbUJBQW1CO0FBQ25CLHNGQUFzRjtBQUN0Riw4QkFBOEI7QUFDOUIsc0ZBQXNGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHdEYsaUNBQTRCO0FBRXRCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTRDLGtDQUFZO0lBQXhEO1FBQUEscUVBMkdDO1FBeEdDLFVBQUksR0FBWSxJQUFJLENBQUM7UUFHckIsV0FBSyxHQUFZLElBQUksQ0FBQztRQUd0QixlQUFTLEdBQWEsSUFBSSxDQUFDO1FBRzNCLFNBQUcsR0FBWSxJQUFJLENBQUM7UUFHcEIsaUJBQVcsR0FBWSxJQUFJLENBQUM7UUFHNUIsZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFHM0IsOEJBQXdCLEdBQW1CLElBQUksQ0FBQztRQUdoRCwrQkFBeUIsR0FBbUIsSUFBSSxDQUFDO1FBR2pELHFCQUFlLEdBQWlCLElBQUksQ0FBQztRQUdyQyxjQUFRLEdBQWlCLElBQUksQ0FBQztRQUU5QixXQUFLLEdBQUcsSUFBSSxDQUFDOztJQTJFZixDQUFDO3VCQTNHb0IsY0FBYztJQWlDakMsd0JBQXdCO0lBRXhCLCtCQUFNLEdBQU47UUFDRSxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUNuQyxnQkFBYyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDL0IsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsSUFBSSxJQUFJO1lBQ3pELEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUMsQ0FB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QUMsS0FBSyxDQUFDLENBQUM7UUFDM0UsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7O0lBdkdEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0RBQ0c7SUFHckI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztpREFDSTtJQUd0QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3FEQUNRO0lBRzNCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7K0NBQ0U7SUFHcEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt1REFDVTtJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3NEQUNTO0lBRzNCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7b0VBQ3VCO0lBR2hEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7cUVBQ3dCO0lBR2pEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUM7MkRBQ2M7SUFHckM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQztvREFDTztJQTlCWCxjQUFjO1FBRGxDLE9BQU87T0FDYSxjQUFjLENBMkdsQztJQUFELHFCQUFDO0NBM0dELEFBMkdDLENBM0cyQyxFQUFFLENBQUMsU0FBUyxHQTJHdkQ7a0JBM0dvQixjQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci8yLjQvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci8yLjQvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci8yLjQvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmltcG9ydCBTb3VuZENvbnRyb2xsZXIgZnJvbSBcIi4vU291bmRDb250cm9sbGVyXCI7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4vVXRpbHNcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lbnVDb250cm9sbGVyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcbiAgc3RhdGljIGluc3RhbmNlOiBNZW51Q29udHJvbGxlcjtcbiAgQHByb3BlcnR5KGNjLk5vZGUpXG4gIEdhbWU6IGNjLk5vZGUgPSBudWxsO1xuXG4gIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICBUaXRsZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICBiZXN0U2NvcmU6IGNjLkxhYmVsID0gbnVsbDtcblxuICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgVGFwOiBjYy5Ob2RlID0gbnVsbDtcblxuICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgc291bmRCdXR0b246IGNjLk5vZGUgPSBudWxsO1xuXG4gIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICBwbGF5QnV0dG9uOiBjYy5Ob2RlID0gbnVsbDtcblxuICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXG4gIHNvdW5kQnV0dG9uT25TcHJpdGVGcmFtZTogY2MuU3ByaXRlRnJhbWUgPSBudWxsO1xuXG4gIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcbiAgc291bmRCdXR0b25PZmZTcHJpdGVGcmFtZTogY2MuU3ByaXRlRnJhbWUgPSBudWxsO1xuXG4gIEBwcm9wZXJ0eShjYy5BdWRpb0NsaXApXG4gIGJhY2tncm91bmRNdXNpYzogY2MuQXVkaW9DbGlwID0gbnVsbDtcblxuICBAcHJvcGVydHkoY2MuQXVkaW9DbGlwKVxuICBidG5DbGljazogY2MuQXVkaW9DbGlwID0gbnVsbDtcblxuICBtdXNpYyA9IG51bGw7XG4gIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gIG9uTG9hZCgpIHtcbiAgICB2YXIgdGl0bGVQb3MgPSB0aGlzLlRpdGxlLnBvc2l0aW9uO1xuICAgIE1lbnVDb250cm9sbGVyLmluc3RhbmNlID0gdGhpcztcbiAgICBpZiAoY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiYmVzdFNjb3JlRG90UnVzaFwiKSA9PSBudWxsKVxuICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiYmVzdFNjb3JlRG90UnVzaFwiLCAwKTtcbiAgICBjYy50d2Vlbih0aGlzLnBsYXlCdXR0b24pXG4gICAgICAucmVwZWF0Rm9yZXZlcihcbiAgICAgICAgY2MudHdlZW4odGhpcy5wbGF5QnV0dG9uKS50bygwLjUsIHsgc2NhbGU6IDEuMiB9KS50bygwLjUsIHsgc2NhbGU6IDEgfSlcbiAgICAgIClcbiAgICAgIC5zdGFydCgpO1xuICAgIGNjLnR3ZWVuKHRoaXMuVGl0bGUpXG4gICAgICAucmVwZWF0Rm9yZXZlcihcbiAgICAgICAgY2NcbiAgICAgICAgICAudHdlZW4odGhpcy5UaXRsZSlcbiAgICAgICAgICAudG8oMC41LCB7IHBvc2l0aW9uOiBjYy52Myh0aXRsZVBvcy54LCB0aXRsZVBvcy55IC0gNTApIH0pXG4gICAgICAgICAgLnRvKDAuNSwgeyBwb3NpdGlvbjogY2MudjModGl0bGVQb3MpIH0pXG4gICAgICApXG4gICAgICAuc3RhcnQoKTtcbiAgICB0aGlzLmJlc3RTY29yZS5zdHJpbmcgPSBcIkJlc3QgXCIgKyBVdGlscy5nZXRMb2NhbChcImJlc3RTY29yZURvdFJ1c2hcIik7XG4gICAgVXRpbHMuc2V0TG9jYWwoXCJzb3VuZFwiLCB0cnVlKTtcbiAgfVxuXG4gIHN0YXJ0KCkge31cblxuICBvblBsYXlCdXR0b25DbGljaygpIHtcbiAgICBpZiAoSlNPTi5wYXJzZShVdGlscy5nZXRMb2NhbChcInNvdW5kXCIpKSlcbiAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5idG5DbGljaywgZmFsc2UsIDEpO1xuICAgIHRoaXMuR2FtZS5hY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMuR2FtZS5vcGFjaXR5ID0gMDtcbiAgICBjYy50d2Vlbih0aGlzLkdhbWUpLnRvKDAuOCwgeyBvcGFjaXR5OiAyNTUgfSkuc3RhcnQoKTtcbiAgICB0aGlzLm5vZGUucGFyZW50LmFjdGl2ZSA9IGZhbHNlO1xuICB9XG5cbiAgb25GaXJzdFRhcCgpIHtcbiAgICB0aGlzLm11c2ljID0gY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmJhY2tncm91bmRNdXNpYywgdHJ1ZSwgMSk7XG4gICAgdGhpcy5ub2RlLnBhcmVudC5hY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMubm9kZS5wYXJlbnQub3BhY2l0eSA9IDA7XG4gICAgY2MudHdlZW4odGhpcy5ub2RlLnBhcmVudCkudG8oMC44LCB7IG9wYWNpdHk6IDI1NSB9KS5zdGFydCgpO1xuICAgIHRoaXMuVGFwLmFjdGl2ZSA9IGZhbHNlO1xuICAgIHRoaXMuVGFwLmRlc3Ryb3koKTtcbiAgfVxuXG4gIG9uQ2xpY2tTb3VuZEJ1dHRvbigpIHtcbiAgICBjYy50d2Vlbih0aGlzLnNvdW5kQnV0dG9uKVxuICAgICAgLnRvKDAuMDUsIHtcbiAgICAgICAgcG9zaXRpb246IGNjLnYzKFxuICAgICAgICAgIHRoaXMuc291bmRCdXR0b24ucG9zaXRpb24ueCxcbiAgICAgICAgICB0aGlzLnNvdW5kQnV0dG9uLnBvc2l0aW9uLnkgLSA3XG4gICAgICAgICksXG4gICAgICB9KVxuICAgICAgLnRvKDAuMDUsIHsgcG9zaXRpb246IGNjLnYzKHRoaXMuc291bmRCdXR0b24ucG9zaXRpb24pIH0pXG4gICAgICAuc3RhcnQoKTtcblxuICAgIFV0aWxzLnNldExvY2FsKFwic291bmRcIiwgIUpTT04ucGFyc2UoVXRpbHMuZ2V0TG9jYWwoXCJzb3VuZFwiKSkpO1xuICAgIHRoaXMudXBkYXRlU291bmQoKTtcbiAgfVxuXG4gIHVwZGF0ZVNvdW5kKCkge1xuICAgIGlmIChKU09OLnBhcnNlKFV0aWxzLmdldExvY2FsKFwic291bmRcIikpKSB7XG4gICAgICB0aGlzLnNvdW5kQnV0dG9uLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID1cbiAgICAgICAgdGhpcy5zb3VuZEJ1dHRvbk9uU3ByaXRlRnJhbWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc291bmRCdXR0b24uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPVxuICAgICAgICB0aGlzLnNvdW5kQnV0dG9uT2ZmU3ByaXRlRnJhbWU7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlKGR0KSB7XG4gICAgaWYgKCFKU09OLnBhcnNlKFV0aWxzLmdldExvY2FsKFwic291bmRcIikpKSBjYy5hdWRpb0VuZ2luZS5wYXVzZSh0aGlzLm11c2ljKTtcbiAgICBpZiAoSlNPTi5wYXJzZShVdGlscy5nZXRMb2NhbChcInNvdW5kXCIpKSkgY2MuYXVkaW9FbmdpbmUucmVzdW1lKHRoaXMubXVzaWMpO1xuICAgIHRoaXMudXBkYXRlU291bmQoKTtcbiAgfVxufVxuIl19
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/GameController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZUNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscURBQWdEO0FBQ2hELCtDQUEwQztBQUMxQyxpQ0FBNEI7QUFFdEIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBNEMsa0NBQVk7SUFBeEQ7UUFBQSxxRUErR0M7UUE1R29CLGFBQU8sR0FBWSxJQUFJLENBQUM7UUFDeEIsY0FBUSxHQUFZLElBQUksQ0FBQztRQUc1QyxZQUFNLEdBQVksSUFBSSxDQUFDO1FBR3ZCLGtCQUFZLEdBQW1CLElBQUksS0FBSyxFQUFXLENBQUM7UUFHcEQsZ0JBQVUsR0FBcUIsSUFBSSxLQUFLLEVBQWEsQ0FBQztRQUd0RCxrQkFBWSxHQUFhLElBQUksQ0FBQztRQUU5QixrQkFBWSxHQUFHLENBQUMsQ0FBQztRQUVqQixlQUFTLEdBQVksSUFBSSxDQUFDO1FBQzFCLGNBQVEsR0FBRyxDQUFDLENBQUM7UUFDYixrQkFBWSxHQUFHLElBQUksQ0FBQztRQUNwQixjQUFRLEdBQUcsQ0FBQyxDQUFDO1FBRWIsaUJBQVcsR0FBRyxLQUFLLENBQUM7UUFDcEIsZ0JBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsZ0JBQVUsR0FBRyxLQUFLLENBQUM7O0lBb0ZyQixDQUFDO3VCQS9Hb0IsY0FBYztJQTZCakMsd0JBQXdCO0lBQ3hCLCtCQUFNLEdBQU47UUFDRSxnQkFBYyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDL0IseUNBQXlDO1FBQ3pDLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUNoRCxPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2hCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQzFCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNSLENBQUM7SUFFRCxtQ0FBVSxHQUFWO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3hDLElBQUksZUFBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFBRSx5QkFBZSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7O2dCQUMvRCx5QkFBZSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxHQUFHLENBQUM7WUFDckIsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO2lCQUNsQixFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztpQkFDaEQsS0FBSyxFQUFFLENBQUM7WUFDWCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUN2QixJQUFJLENBQUMsWUFBWSxDQUFDO2dCQUNoQixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztZQUMxQixDQUFDLEVBQUUsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQztTQUMzQjtJQUNILENBQUM7SUFDRCxrQ0FBUyxHQUFUO1FBQ0UsSUFBSSxRQUFRLEdBQUcsZUFBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDN0QsSUFBSSxTQUFTLEdBQUcsZUFBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakQsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO2FBQ3JCLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2FBQ3BFLEtBQUssRUFBRSxDQUFDO0lBQ2IsQ0FBQztJQUNELG1DQUFVLEdBQVY7UUFDRSx5QkFBZSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2xFLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDaEIsc0JBQVksQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDekMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FB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QyxLQUFLLENBQUM7d0RBQ1c7SUFoQlgsY0FBYztRQURsQyxPQUFPO09BQ2EsY0FBYyxDQStHbEM7SUFBRCxxQkFBQztDQS9HRCxBQStHQyxDQS9HMkMsRUFBRSxDQUFDLFNBQVMsR0ErR3ZEO2tCQS9Hb0IsY0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTb3VuZENvbnRyb2xsZXIgZnJvbSBcIi4vU291bmRDb250cm9sbGVyXCI7XG5pbXBvcnQgVUlDb250cm9sbGVyIGZyb20gXCIuL1VJQ29udHJvbGxlclwiO1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuL1V0aWxzXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQ29udHJvbGxlciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG4gIHN0YXRpYyBpbnN0YW5jZTogR2FtZUNvbnRyb2xsZXI7XG5cbiAgQHByb3BlcnR5KGNjLk5vZGUpIHJlZEJhbGw6IGNjLk5vZGUgPSBudWxsO1xuICBAcHJvcGVydHkoY2MuTm9kZSkgYmx1ZUJhbGw6IGNjLk5vZGUgPSBudWxsO1xuXG4gIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICBjZW50ZXI6IGNjLk5vZGUgPSBudWxsO1xuXG4gIEBwcm9wZXJ0eShBcnJheShjYy5WZWMyKSlcbiAgYmFsbFNwYXduUG9zOiBBcnJheTxjYy5WZWMyPiA9IG5ldyBBcnJheTxjYy5WZWMyPigpO1xuXG4gIEBwcm9wZXJ0eShBcnJheShjYy5QcmVmYWIpKVxuICBiYWxsUHJlZmFiOiBBcnJheTxjYy5QcmVmYWI+ID0gbmV3IEFycmF5PGNjLlByZWZhYj4oKTtcblxuICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gIGxldmVsVXBMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuXG4gIGN1cnJlbnRTY29yZSA9IDA7XG5cbiAgZW5lbXlCYWxsOiBjYy5Ob2RlID0gbnVsbDtcbiAgZHVyYXRpb24gPSAxO1xuICBzcGluRHVyYXRpb24gPSAwLjI1O1xuICByb3RhdGlvbiA9IDA7XG5cbiAgaXNTcGF3bmFibGUgPSBmYWxzZTtcbiAgaXNHYW1lT3ZlciA9IGZhbHNlO1xuICBpc1NwaW5uaW5nID0gZmFsc2U7XG5cbiAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG4gIG9uTG9hZCgpIHtcbiAgICBHYW1lQ29udHJvbGxlci5pbnN0YW5jZSA9IHRoaXM7XG4gICAgLy8gVXRpbHMuc2V0TG9jYWwoJ2Jlc3RTY29yZURvdFJ1c2gnLCAwKTtcbiAgICB2YXIgbWFuYWdlciA9IGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKTtcbiAgICBtYW5hZ2VyLmVuYWJsZWQgPSB0cnVlO1xuICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuaXNTcGF3bmFibGUgPSB0cnVlO1xuICAgIH0sIDEpO1xuICB9XG5cbiAgc3BpbkNlbnRlcigpIHtcbiAgICBpZiAoIXRoaXMuaXNHYW1lT3ZlciAmJiAhdGhpcy5pc1NwaW5uaW5nKSB7XG4gICAgICBpZiAoVXRpbHMucmFuZG9tKDAsIDEpID09IDApIFNvdW5kQ29udHJvbGxlci5pbnN0YW5jZS5wbGF5KFwiZmlyZTFcIik7XG4gICAgICBlbHNlIFNvdW5kQ29udHJvbGxlci5pbnN0YW5jZS5wbGF5KFwiZmlyZTJcIik7XG4gICAgICB0aGlzLnJvdGF0aW9uICs9IDE4MDtcbiAgICAgIGNjLnR3ZWVuKHRoaXMuY2VudGVyKVxuICAgICAgICAudG8odGhpcy5zcGluRHVyYXRpb24sIHsgYW5nbGU6IC10aGlzLnJvdGF0aW9uIH0pXG4gICAgICAgIC5zdGFydCgpO1xuICAgICAgdGhpcy5pc1NwaW5uaW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5pc1NwaW5uaW5nID0gZmFsc2U7XG4gICAgICB9LCB0aGlzLnNwaW5EdXJhdGlvbiAvIDIpO1xuICAgIH1cbiAgfVxuICBzcGF3bkJhbGwoKSB7XG4gICAgbGV0IHNwYXduUG9zID0gVXRpbHMucmFuZG9tKDAsIHRoaXMuYmFsbFNwYXduUG9zLmxlbmd0aCAtIDEpO1xuICAgIGxldCBiYWxsQ29sb3IgPSBVdGlscy5yYW5kb20oMCwgdGhpcy5iYWxsUHJlZmFiLmxlbmd0aCAtIDEpO1xuICAgIHRoaXMuZW5lbXlCYWxsID0gY2MuaW5zdGFudGlhdGUodGhpcy5iYWxsUHJlZmFiW2JhbGxDb2xvcl0pO1xuICAgIHRoaXMuZW5lbXlCYWxsLnBhcmVudCA9IHRoaXMubm9kZS5wYXJlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lcGxheVwiKTtcbiAgICB0aGlzLmVuZW15QmFsbC54ID0gdGhpcy5iYWxsU3Bhd25Qb3Nbc3Bhd25Qb3NdLng7XG4gICAgdGhpcy5lbmVteUJhbGwueSA9IHRoaXMuYmFsbFNwYXduUG9zW3NwYXduUG9zXS55O1xuICAgIGNjLnR3ZWVuKHRoaXMuZW5lbXlCYWxsKVxuICAgICAgLnRvKHRoaXMuZHVyYXRpb24sIHsgcG9zaXRpb246IGNjLnYzKHRoaXMuY2VudGVyLngsIHRoaXMuY2VudGVyLnkpIH0pXG4gICAgICAuc3RhcnQoKTtcbiAgfVxuICBvbkdhbWVPdmVyKCkge1xuICAgIFNvdW5kQ29udHJvbGxlci5pbnN0YW5jZS5wbGF5KFwiZGVmZWF0XCIpO1xuICAgIHRoaXMuaXNHYW1lT3ZlciA9IHRydWU7XG4gICAgdGhpcy5kZXN0cm95QmFsbCgpO1xuICAgIGNjLnR3ZWVuKHRoaXMuY2VudGVyKS50bygxLCB7IGFuZ2xlOiB0aGlzLmNlbnRlci5hbmdsZSB9KS5zdGFydCgpO1xuICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgIFVJQ29udHJvbGxlci5pbnN0YW5jZS5mYWRlSW5HYW1lT3ZlcigpO1xuICAgIH0sIDEpO1xuICB9XG4gIGFkZFNjb3JlKGFtb3VudDogbnVtYmVyKSB7XG4gICAgdGhpcy5jdXJyZW50U2NvcmUgKz0gYW1vdW50O1xuICAgIC8vIFNvdW5kQ29udHJvbGxlci5pbnN0YW5jZS5wbGF5KFwiR2FpblNjb3JlXCIpO1xuICAgIGlmICh0aGlzLmN1cnJlbnRTY29yZSA+IEpTT04ucGFyc2UoVXRpbHMuZ2V0TG9jYWwoXCJiZXN0U2NvcmVEb3RSdXNoXCIpKSkge1xuICAgICAgVXRpbHMuc2V0TG9jYWwoXCJiZXN0U2NvcmVEb3RSdXNoXCIsIHRoaXMuY3VycmVudFNjb3JlLnRvU3RyaW5nKCkpO1xuICAgICAgVUlDb250cm9sbGVyLmluc3RhbmNlLmlzTmV3QmVzdCA9IHRydWU7XG4gICAgfVxuICAgIFVJQ29udHJvbGxlci5pbnN0YW5jZS51cGRhdGVTY29yZSh0aGlzLmN1cnJlbnRTY29yZSk7XG4gIH1cblxuICBsZXZlbFVwKCkge1xuICAgIFNvdW5kQ29udHJvbGxlci5pbnN0YW5jZS5wbGF5KFwibGV2ZWxcIik7XG4gICAgdGhpcy5sZXZlbFVwTGFiZWwubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMubGV2ZWxVcExhYmVsLm5vZGUub3BhY2l0eSA9IDIyNTtcbiAgICB0aGlzLmR1cmF0aW9uID0gdGhpcy5kdXJhdGlvbiAqIDAuOTg7XG4gICAgdGhpcy5zcGluRHVyYXRpb24gPSB0aGlzLnNwaW5EdXJhdGlvbiAqIDAuOTU7XG4gICAgdmFyIHQyID0gY2NcbiAgICAgIC50d2Vlbih0aGlzLmxldmVsVXBMYWJlbC5ub2RlKVxuICAgICAgLnRvKDEsIHsgcG9zaXRpb246IGNjLnYzKDAsIDQ1MCksIG9wYWNpdHk6IDI1NSB9KTtcbiAgICBjYy50d2Vlbih0aGlzLmxldmVsVXBMYWJlbC5ub2RlKVxuICAgICAgLnNldCh7IHBvc2l0aW9uOiBjYy52MygwLCAwKSB9KVxuICAgICAgLnRoZW4odDIpXG4gICAgICAuc3RhcnQoKTtcbiAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLmxldmVsVXBMYWJlbC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH0sIDEuMyk7XG4gIH1cbiAgZGVzdHJveUJhbGwoKSB7XG4gICAgdGhpcy5lbmVteUJhbGwuZGVzdHJveSgpO1xuICAgIHRoaXMuZW5lbXlCYWxsID0gbnVsbDtcbiAgfVxuICB1cGRhdGUoZHQpIHtcbiAgICB0aGlzLm5vZGUub24oXCJ0b3VjaHN0YXJ0XCIsIHRoaXMuc3BpbkNlbnRlciwgdGhpcyk7XG4gICAgaWYgKHRoaXMuZW5lbXlCYWxsID09IG51bGwgJiYgIXRoaXMuaXNHYW1lT3ZlciAmJiB0aGlzLmlzU3Bhd25hYmxlKSB7XG4gICAgICB0aGlzLnNwYXduQmFsbCgpO1xuICAgIH1cbiAgfVxufVxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/UIController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ba534Gm/7pAVLXYkKhfWoX4', 'UIController');
// Scripts/UIController.ts

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
var GameController_1 = require("./GameController");
var Utils_1 = require("./Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIController = /** @class */ (function (_super) {
    __extends(UIController, _super);
    function UIController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // @property(cc.Label)
        // startLabel: cc.Label = null;
        _this.currentScore = null;
        _this.LevelProgress = new Array;
        _this.bestScore = null;
        _this.resultScore = null;
        _this.Newbest = null;
        _this.soundButton = null;
        _this.replayButton = null;
        _this.Game = null;
        _this.Result = null;
        // @property(cc.Node)
        // mainBackground: cc.Node = null;
        // @property(cc.Node)
        // resultBackground: cc.Node = null;
        _this.soundButtonOnSpriteFrame = null;
        _this.soundButtonOffSpriteFrame = null;
        _this.LevelOnSpriteFrame = null;
        _this.LevelOffSpriteFrame = null;
        _this.GamePrefab = null;
        _this.isNewBest = false;
        _this.newGame = null;
        return _this;
    }
    UIController_1 = UIController;
    UIController.prototype.onLoad = function () {
        cc.tween(this.replayButton).repeatForever(cc.tween(this.replayButton).to(0.1, { scale: 0.95 }).to(0.1, { scale: 1 })).start();
        if (cc.sys.localStorage.getItem('bestScoreDotRush') == null)
            cc.sys.localStorage.setItem('bestScoreDotRush', 0);
    };
    UIController.prototype.onReplayButtonClick = function () {
        this.node.parent.parent.active = false;
        this.newGame = cc.instantiate(this.GamePrefab);
        this.newGame.parent = this.node.parent.parent.parent;
        this.newGame.active = true;
        this.newGame.opacity = 0;
        this.newGame.position = cc.v3(-720, -1280);
        cc.tween(this.newGame).to(0.5, { opacity: 255 }).start();
    };
    UIController.prototype.updateScore = function (score) {
        this.currentScore.string = score.toString();
        this.resultScore.string = score.toString();
        this.bestScore.string = 'Best ' + Utils_1.default.getLocal('bestScoreDotRush');
        var progress = score % this.LevelProgress.length;
        if (progress == 0 && score > 0) {
            for (var i = 0; i < this.LevelProgress.length; i++) {
                this.LevelProgress[i].getComponent(cc.Sprite).spriteFrame = this.LevelOffSpriteFrame;
            }
            GameController_1.default.instance.levelUp();
        }
        else {
            for (var i = 0; i < progress; i++) {
                this.LevelProgress[i].getComponent(cc.Sprite).spriteFrame = this.LevelOnSpriteFrame;
            }
        }
    };
    // hideLabel(){
    //     this.startLabel.node.active = false;
    // }
    UIController.prototype.loadScene = function () {
        cc.director.loadScene("GameScene");
    };
    UIController.prototype.fadeInGameOver = function () {
        this.Result.active = true;
        this.Result.opacity = 0;
        cc.tween(this.Result).to(0.8, { opacity: 255 }).start();
        if (this.isNewBest) {
            this.Newbest.active = true;
            cc.tween(this.Newbest).repeatForever(cc.tween(this.Newbest).to(0.12, { angle: 5 }).to(0.12, { angle: -5 })).start();
        }
        this.Game.active = false;
    };
    UIController.prototype.onClickSoundButton = function () {
        cc.tween(this.soundButton)
            .to(0.05, { position: cc.v3(this.soundButton.position.x, this.soundButton.position.y - 7) })
            .to(0.05, { position: cc.v3(this.soundButton.position) }).start();
        Utils_1.default.setLocal('sound', !JSON.parse(Utils_1.default.getLocal('sound')));
        this.updateSound();
    };
    UIController.prototype.updateSound = function () {
        if (JSON.parse(Utils_1.default.getLocal('sound'))) {
            this.soundButton.getComponent(cc.Sprite).spriteFrame = this.soundButtonOnSpriteFrame;
        }
        else {
            this.soundButton.getComponent(cc.Sprite).spriteFrame = this.soundButtonOffSpriteFrame;
        }
    };
    UIController.prototype.start = function () {
        this.bestScore.string = 'Best ' + "0";
        this.updateScore(0);
        this.updateSound();
        UIController_1.instance = this;
    };
    UIController.prototype.update = function (dt) {
        this.updateSound();
    };
    var UIController_1;
    __decorate([
        property(cc.Label)
    ], UIController.prototype, "currentScore", void 0);
    __decorate([
        property(Array(cc.Node))
    ], UIController.prototype, "LevelProgress", void 0);
    __decorate([
        property(cc.Label)
    ], UIController.prototype, "bestScore", void 0);
    __decorate([
        property(cc.Label)
    ], UIController.prototype, "resultScore", void 0);
    __decorate([
        property(cc.Node)
    ], UIController.prototype, "Newbest", void 0);
    __decorate([
        property(cc.Node)
    ], UIController.prototype, "soundButton", void 0);
    __decorate([
        property(cc.Node)
    ], UIController.prototype, "replayButton", void 0);
    __decorate([
        property(cc.Node)
    ], UIController.prototype, "Game", void 0);
    __decorate([
        property(cc.Node)
    ], UIController.prototype, "Result", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], UIController.prototype, "soundButtonOnSpriteFrame", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], UIController.prototype, "soundButtonOffSpriteFrame", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], UIController.prototype, "LevelOnSpriteFrame", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], UIController.prototype, "LevelOffSpriteFrame", void 0);
    __decorate([
        property(cc.Prefab)
    ], UIController.prototype, "GamePrefab", void 0);
    UIController = UIController_1 = __decorate([
        ccclass
    ], UIController);
    return UIController;
}(cc.Component));
exports.default = UIController;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUE4QztBQUc5QyxpQ0FBNEI7QUFFdEIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFLMUM7SUFBMEMsZ0NBQVk7SUFBdEQ7UUFBQSxxRUFvSkM7UUFsSkcsc0JBQXNCO1FBQ3RCLCtCQUErQjtRQUkvQixrQkFBWSxHQUFhLElBQUksQ0FBQztRQUc5QixtQkFBYSxHQUFtQixJQUFJLEtBQWMsQ0FBQztRQUduRCxlQUFTLEdBQWEsSUFBSSxDQUFDO1FBRzNCLGlCQUFXLEdBQWEsSUFBSSxDQUFDO1FBRzdCLGFBQU8sR0FBWSxJQUFJLENBQUM7UUFHeEIsaUJBQVcsR0FBWSxJQUFJLENBQUM7UUFHNUIsa0JBQVksR0FBWSxJQUFJLENBQUM7UUFHN0IsVUFBSSxHQUFZLElBQUksQ0FBQztRQUdyQixZQUFNLEdBQVksSUFBSSxDQUFDO1FBRXZCLHFCQUFxQjtRQUNyQixrQ0FBa0M7UUFFbEMscUJBQXFCO1FBQ3JCLG9DQUFvQztRQUdwQyw4QkFBd0IsR0FBbUIsSUFBSSxDQUFDO1FBR2hELCtCQUF5QixHQUFtQixJQUFJLENBQUM7UUFHakQsd0JBQWtCLEdBQW1CLElBQUksQ0FBQztRQUcxQyx5QkFBbUIsR0FBbUIsSUFBSSxDQUFDO1FBRzNDLGdCQUFVLEdBQWMsSUFBSSxDQUFDO1FBRzdCLGVBQVMsR0FBRyxLQUFLLENBQUM7UUFFbEIsYUFBTyxHQUFZLElBQUksQ0FBQzs7SUEyRjVCLENBQUM7cUJBcEpvQixZQUFZO0lBNEQ3Qiw2QkFBTSxHQUFOO1FBQ0ksRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUMsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFDLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN4SCxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLElBQUk7WUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDcEgsQ0FBQztJQUVELDBDQUFtQixHQUFuQjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNyRCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDM0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFDLEVBQUMsT0FBTyxFQUFFLEdBQUcsRUFBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDMUQsQ0FBQztJQUVELGtDQUFXLEdBQVgsVUFBWSxLQUFhO1FBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM1QyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDM0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsT0FBTyxHQUFHLGVBQUssQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNyRSxJQUFJLFFBQVEsR0FBRyxLQUFLLEdBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7UUFDL0MsSUFBRyxRQUFRLElBQUksQ0FBQyxJQUFJLEtBQUssR0FBQyxDQUFDLEVBQUM7WUFDeEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNoRCxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQzthQUV4RjtZQUNELHdCQUFjLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3JDO2FBQ0c7WUFDQSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUMvQixJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQzthQUV2RjtTQUNKO0lBRUwsQ0FBQztJQUVELGVBQWU7SUFDZiwyQ0FBMkM7SUFDM0MsSUFBSTtJQUNKLGdDQUFTLEdBQVQ7UUFDSSxFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQscUNBQWMsR0FBZDtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDeEIsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBQyxFQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3JELElBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNmLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUMzQixFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksRUFBQyxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDakg7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDN0IsQ0FBQztJQUNELHlDQUFrQixHQUFsQjtRQUVJLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQzthQUNyQixFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO2FBQzNGLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUd0RSxlQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFOUQsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBRXZCLENBQUM7SUFDRCxrQ0FBVyxHQUFYO1FBQ0ksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRTtZQUVyQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQztTQUN4RjthQUNJO1lBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMseUJBQXlCLENBQUM7U0FDekY7SUFDTCxDQUFDO0lBRUQsNEJBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLE9BQU8sR0FBRyxHQUFHLENBQUM7UUFDdEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsY0FBWSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFFakMsQ0FBQztJQUVELDZCQUFNLEdBQU4sVUFBUSxFQUFFO1FBQ04sSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBRXZCLENBQUM7O0lBNUlEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7c0RBQ1c7SUFHOUI7UUFEQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQzt1REFDMEI7SUFHbkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzttREFDUTtJQUczQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3FEQUNVO0lBRzdCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7aURBQ007SUFHeEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztxREFDVTtJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3NEQUNXO0lBRzdCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7OENBQ0c7SUFHckI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztnREFDSztJQVN2QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO2tFQUN1QjtJQUdoRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO21FQUN3QjtJQUdqRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDOzREQUNpQjtJQUcxQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDOzZEQUNrQjtJQUczQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO29EQUNTO0lBcERaLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0FvSmhDO0lBQUQsbUJBQUM7Q0FwSkQsQUFvSkMsQ0FwSnlDLEVBQUUsQ0FBQyxTQUFTLEdBb0pyRDtrQkFwSm9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2FtZUNvbnRyb2xsZXIgZnJvbSBcIi4vR2FtZUNvbnRyb2xsZXJcIjtcbmltcG9ydCBNZW51Q29udHJvbGxlciBmcm9tIFwiLi9NZW51Q29udHJvbGxlclwiO1xuXG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4vVXRpbHNcIjtcbiBcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXHRcbiBcbiBcbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSUNvbnRyb2xsZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuICAgIHN0YXRpYyBpbnN0YW5jZTogVUlDb250cm9sbGVyO1xuICAgIC8vIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICAvLyBzdGFydExhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG4gICAgXG4gXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGN1cnJlbnRTY29yZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KEFycmF5KGNjLk5vZGUpKVxuICAgIExldmVsUHJvZ3Jlc3M6IEFycmF5PGNjLk5vZGU+ID0gbmV3IEFycmF5PGNjLk5vZGU+O1xuIFxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBiZXN0U2NvcmU6IGNjLkxhYmVsID0gbnVsbDtcbiBcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcmVzdWx0U2NvcmU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIE5ld2Jlc3Q6IGNjLk5vZGUgPSBudWxsO1xuICAgIFxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHNvdW5kQnV0dG9uOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHJlcGxheUJ1dHRvbjogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBHYW1lOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIFJlc3VsdDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICAvLyBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICAvLyBtYWluQmFja2dyb3VuZDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICAvLyBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICAvLyByZXN1bHRCYWNrZ3JvdW5kOiBjYy5Ob2RlID0gbnVsbDtcbiBcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXG4gICAgc291bmRCdXR0b25PblNwcml0ZUZyYW1lOiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XG4gXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxuICAgIHNvdW5kQnV0dG9uT2ZmU3ByaXRlRnJhbWU6IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcbiAgICBMZXZlbE9uU3ByaXRlRnJhbWU6IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcbiAgICBMZXZlbE9mZlNwcml0ZUZyYW1lOiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIEdhbWVQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XG5cblxuICAgIGlzTmV3QmVzdCA9IGZhbHNlO1xuXG4gICAgbmV3R2FtZTogY2MuTm9kZSA9IG51bGw7XG4gICAgXG4gICAgXG4gICAgb25Mb2FkKCl7XG4gICAgICAgIGNjLnR3ZWVuKHRoaXMucmVwbGF5QnV0dG9uKS5yZXBlYXRGb3JldmVyKGNjLnR3ZWVuKHRoaXMucmVwbGF5QnV0dG9uKS50bygwLjEse3NjYWxlOiAwLjk1fSkudG8oMC4xLHtzY2FsZTogMX0pKS5zdGFydCgpO1xuICAgICAgICBpZiAoY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdiZXN0U2NvcmVEb3RSdXNoJykgPT0gbnVsbCkgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdiZXN0U2NvcmVEb3RSdXNoJywgMCk7XG4gICAgfVxuXG4gICAgb25SZXBsYXlCdXR0b25DbGljaygpe1xuICAgICAgICB0aGlzLm5vZGUucGFyZW50LnBhcmVudC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5uZXdHYW1lID0gY2MuaW5zdGFudGlhdGUodGhpcy5HYW1lUHJlZmFiKTtcbiAgICAgICAgdGhpcy5uZXdHYW1lLnBhcmVudCA9IHRoaXMubm9kZS5wYXJlbnQucGFyZW50LnBhcmVudDtcbiAgICAgICAgdGhpcy5uZXdHYW1lLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMubmV3R2FtZS5vcGFjaXR5ID0gMDtcbiAgICAgICAgdGhpcy5uZXdHYW1lLnBvc2l0aW9uID0gY2MudjMoLTcyMCwtMTI4MCk7XG4gICAgICAgIGNjLnR3ZWVuKHRoaXMubmV3R2FtZSkudG8oMC41LHtvcGFjaXR5OiAyNTV9KS5zdGFydCgpOyAgICAgIFxuICAgIH1cblxuICAgIHVwZGF0ZVNjb3JlKHNjb3JlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U2NvcmUuc3RyaW5nID0gc2NvcmUudG9TdHJpbmcoKTtcbiAgICAgICAgdGhpcy5yZXN1bHRTY29yZS5zdHJpbmcgPSBzY29yZS50b1N0cmluZygpO1xuICAgICAgICB0aGlzLmJlc3RTY29yZS5zdHJpbmcgPSAnQmVzdCAnICsgVXRpbHMuZ2V0TG9jYWwoJ2Jlc3RTY29yZURvdFJ1c2gnKTtcbiAgICAgICAgdmFyIHByb2dyZXNzID0gc2NvcmUldGhpcy5MZXZlbFByb2dyZXNzLmxlbmd0aDtcbiAgICAgICAgaWYocHJvZ3Jlc3MgPT0gMCAmJiBzY29yZT4wKXtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5MZXZlbFByb2dyZXNzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5MZXZlbFByb2dyZXNzW2ldLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5MZXZlbE9mZlNwcml0ZUZyYW1lO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgR2FtZUNvbnRyb2xsZXIuaW5zdGFuY2UubGV2ZWxVcCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2dyZXNzOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLkxldmVsUHJvZ3Jlc3NbaV0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLkxldmVsT25TcHJpdGVGcmFtZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cbiBcbiAgICAvLyBoaWRlTGFiZWwoKXtcbiAgICAvLyAgICAgdGhpcy5zdGFydExhYmVsLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgLy8gfVxuICAgIGxvYWRTY2VuZSgpe1xuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJHYW1lU2NlbmVcIik7XG4gICAgfVxuICAgIFxuICAgIGZhZGVJbkdhbWVPdmVyKCl7XG4gICAgICAgIHRoaXMuUmVzdWx0LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuUmVzdWx0Lm9wYWNpdHkgPSAwO1xuICAgICAgICBjYy50d2Vlbih0aGlzLlJlc3VsdCkudG8oMC44LHtvcGFjaXR5OiAyNTV9KS5zdGFydCgpO1xuICAgICAgICBpZih0aGlzLmlzTmV3QmVzdCkge1xuICAgICAgICAgICAgdGhpcy5OZXdiZXN0LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLk5ld2Jlc3QpLnJlcGVhdEZvcmV2ZXIoY2MudHdlZW4odGhpcy5OZXdiZXN0KS50bygwLjEyLHthbmdsZTogNX0pLnRvKDAuMTIse2FuZ2xlOiAtNX0pKS5zdGFydCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuR2FtZS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG4gICAgb25DbGlja1NvdW5kQnV0dG9uKCkge1xuIFxuICAgICAgICBjYy50d2Vlbih0aGlzLnNvdW5kQnV0dG9uKVxuICAgICAgICAgICAgLnRvKDAuMDUsIHsgcG9zaXRpb246IGNjLnYzKHRoaXMuc291bmRCdXR0b24ucG9zaXRpb24ueCwgdGhpcy5zb3VuZEJ1dHRvbi5wb3NpdGlvbi55IC0gNykgfSlcbiAgICAgICAgICAgIC50bygwLjA1LCB7IHBvc2l0aW9uOiBjYy52Myh0aGlzLnNvdW5kQnV0dG9uLnBvc2l0aW9uKSB9KS5zdGFydCgpO1xuIFxuIFxuICAgICAgICBVdGlscy5zZXRMb2NhbCgnc291bmQnLCAhSlNPTi5wYXJzZShVdGlscy5nZXRMb2NhbCgnc291bmQnKSkpO1xuIFxuICAgICAgICB0aGlzLnVwZGF0ZVNvdW5kKCk7XG4gICAgICAgIFxuICAgIH1cbiAgICB1cGRhdGVTb3VuZCgpIHtcbiAgICAgICAgaWYgKEpTT04ucGFyc2UoVXRpbHMuZ2V0TG9jYWwoJ3NvdW5kJykpKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuc291bmRCdXR0b24uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnNvdW5kQnV0dG9uT25TcHJpdGVGcmFtZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5zb3VuZEJ1dHRvbi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuc291bmRCdXR0b25PZmZTcHJpdGVGcmFtZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBzdGFydCAoKSB7XG4gICAgICAgIHRoaXMuYmVzdFNjb3JlLnN0cmluZyA9ICdCZXN0ICcgKyBcIjBcIjtcbiAgICAgICAgdGhpcy51cGRhdGVTY29yZSgwKTtcbiAgICAgICAgdGhpcy51cGRhdGVTb3VuZCgpO1xuICAgICAgICBVSUNvbnRyb2xsZXIuaW5zdGFuY2UgPSB0aGlzO1xuICAgICAgICBcbiAgICB9XG4gXG4gICAgdXBkYXRlIChkdCkge1xuICAgICAgICB0aGlzLnVwZGF0ZVNvdW5kKCk7XG4gICAgICAgIFxuICAgIH1cbn1cbiBcbiJdfQ==
//------QC-SOURCE-SPLIT------
