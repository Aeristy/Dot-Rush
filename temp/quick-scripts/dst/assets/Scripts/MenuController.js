
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