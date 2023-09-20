
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUE4QztBQUc5QyxpQ0FBNEI7QUFFdEIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFLMUM7SUFBMEMsZ0NBQVk7SUFBdEQ7UUFBQSxxRUFvSkM7UUFsSkcsc0JBQXNCO1FBQ3RCLCtCQUErQjtRQUkvQixrQkFBWSxHQUFhLElBQUksQ0FBQztRQUc5QixtQkFBYSxHQUFtQixJQUFJLEtBQWMsQ0FBQztRQUduRCxlQUFTLEdBQWEsSUFBSSxDQUFDO1FBRzNCLGlCQUFXLEdBQWEsSUFBSSxDQUFDO1FBRzdCLGFBQU8sR0FBWSxJQUFJLENBQUM7UUFHeEIsaUJBQVcsR0FBWSxJQUFJLENBQUM7UUFHNUIsa0JBQVksR0FBWSxJQUFJLENBQUM7UUFHN0IsVUFBSSxHQUFZLElBQUksQ0FBQztRQUdyQixZQUFNLEdBQVksSUFBSSxDQUFDO1FBRXZCLHFCQUFxQjtRQUNyQixrQ0FBa0M7UUFFbEMscUJBQXFCO1FBQ3JCLG9DQUFvQztRQUdwQyw4QkFBd0IsR0FBbUIsSUFBSSxDQUFDO1FBR2hELCtCQUF5QixHQUFtQixJQUFJLENBQUM7UUFHakQsd0JBQWtCLEdBQW1CLElBQUksQ0FBQztRQUcxQyx5QkFBbUIsR0FBbUIsSUFBSSxDQUFDO1FBRzNDLGdCQUFVLEdBQWMsSUFBSSxDQUFDO1FBRzdCLGVBQVMsR0FBRyxLQUFLLENBQUM7UUFFbEIsYUFBTyxHQUFZLElBQUksQ0FBQzs7SUEyRjVCLENBQUM7cUJBcEpvQixZQUFZO0lBNEQ3Qiw2QkFBTSxHQUFOO1FBQ0ksRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFD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QyxFQUFFLENBQUMsS0FBSyxDQUFDO3FEQUNVO0lBRzdCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7aURBQ007SUFHeEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztxREFDVTtJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3NEQUNXO0lBRzdCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7OENBQ0c7SUFHckI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztnREFDSztJQVN2QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO2tFQUN1QjtJQUdoRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO21FQUN3QjtJQUdqRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDOzREQUNpQjtJQUcxQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDOzZEQUNrQjtJQUczQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO29EQUNTO0lBcERaLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0FvSmhDO0lBQUQsbUJBQUM7Q0FwSkQsQUFvSkMsQ0FwSnlDLEVBQUUsQ0FBQyxTQUFTLEdBb0pyRDtrQkFwSm9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2FtZUNvbnRyb2xsZXIgZnJvbSBcIi4vR2FtZUNvbnRyb2xsZXJcIjtcbmltcG9ydCBNZW51Q29udHJvbGxlciBmcm9tIFwiLi9NZW51Q29udHJvbGxlclwiO1xuXG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4vVXRpbHNcIjtcbiBcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXHRcbiBcbiBcbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSUNvbnRyb2xsZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuICAgIHN0YXRpYyBpbnN0YW5jZTogVUlDb250cm9sbGVyO1xuICAgIC8vIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICAvLyBzdGFydExhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG4gICAgXG4gXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGN1cnJlbnRTY29yZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KEFycmF5KGNjLk5vZGUpKVxuICAgIExldmVsUHJvZ3Jlc3M6IEFycmF5PGNjLk5vZGU+ID0gbmV3IEFycmF5PGNjLk5vZGU+O1xuIFxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBiZXN0U2NvcmU6IGNjLkxhYmVsID0gbnVsbDtcbiBcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcmVzdWx0U2NvcmU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIE5ld2Jlc3Q6IGNjLk5vZGUgPSBudWxsO1xuICAgIFxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHNvdW5kQnV0dG9uOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHJlcGxheUJ1dHRvbjogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBHYW1lOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIFJlc3VsdDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICAvLyBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICAvLyBtYWluQmFja2dyb3VuZDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICAvLyBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICAvLyByZXN1bHRCYWNrZ3JvdW5kOiBjYy5Ob2RlID0gbnVsbDtcbiBcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXG4gICAgc291bmRCdXR0b25PblNwcml0ZUZyYW1lOiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XG4gXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxuICAgIHNvdW5kQnV0dG9uT2ZmU3ByaXRlRnJhbWU6IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcbiAgICBMZXZlbE9uU3ByaXRlRnJhbWU6IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcbiAgICBMZXZlbE9mZlNwcml0ZUZyYW1lOiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIEdhbWVQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XG5cblxuICAgIGlzTmV3QmVzdCA9IGZhbHNlO1xuXG4gICAgbmV3R2FtZTogY2MuTm9kZSA9IG51bGw7XG4gICAgXG4gICAgXG4gICAgb25Mb2FkKCl7XG4gICAgICAgIGNjLnR3ZWVuKHRoaXMucmVwbGF5QnV0dG9uKS5yZXBlYXRGb3JldmVyKGNjLnR3ZWVuKHRoaXMucmVwbGF5QnV0dG9uKS50bygwLjEse3NjYWxlOiAwLjk1fSkudG8oMC4xLHtzY2FsZTogMX0pKS5zdGFydCgpO1xuICAgICAgICBpZiAoY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdiZXN0U2NvcmVEb3RSdXNoJykgPT0gbnVsbCkgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdiZXN0U2NvcmVEb3RSdXNoJywgMCk7XG4gICAgfVxuXG4gICAgb25SZXBsYXlCdXR0b25DbGljaygpe1xuICAgICAgICB0aGlzLm5vZGUucGFyZW50LnBhcmVudC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5uZXdHYW1lID0gY2MuaW5zdGFudGlhdGUodGhpcy5HYW1lUHJlZmFiKTtcbiAgICAgICAgdGhpcy5uZXdHYW1lLnBhcmVudCA9IHRoaXMubm9kZS5wYXJlbnQucGFyZW50LnBhcmVudDtcbiAgICAgICAgdGhpcy5uZXdHYW1lLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMubmV3R2FtZS5vcGFjaXR5ID0gMDtcbiAgICAgICAgdGhpcy5uZXdHYW1lLnBvc2l0aW9uID0gY2MudjMoLTcyMCwtMTI4MCk7XG4gICAgICAgIGNjLnR3ZWVuKHRoaXMubmV3R2FtZSkudG8oMC41LHtvcGFjaXR5OiAyNTV9KS5zdGFydCgpOyAgICAgIFxuICAgIH1cblxuICAgIHVwZGF0ZVNjb3JlKHNjb3JlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U2NvcmUuc3RyaW5nID0gc2NvcmUudG9TdHJpbmcoKTtcbiAgICAgICAgdGhpcy5yZXN1bHRTY29yZS5zdHJpbmcgPSBzY29yZS50b1N0cmluZygpO1xuICAgICAgICB0aGlzLmJlc3RTY29yZS5zdHJpbmcgPSAnQmVzdCAnICsgVXRpbHMuZ2V0TG9jYWwoJ2Jlc3RTY29yZURvdFJ1c2gnKTtcbiAgICAgICAgdmFyIHByb2dyZXNzID0gc2NvcmUldGhpcy5MZXZlbFByb2dyZXNzLmxlbmd0aDtcbiAgICAgICAgaWYocHJvZ3Jlc3MgPT0gMCAmJiBzY29yZT4wKXtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5MZXZlbFByb2dyZXNzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5MZXZlbFByb2dyZXNzW2ldLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5MZXZlbE9mZlNwcml0ZUZyYW1lO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgR2FtZUNvbnRyb2xsZXIuaW5zdGFuY2UubGV2ZWxVcCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2dyZXNzOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLkxldmVsUHJvZ3Jlc3NbaV0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLkxldmVsT25TcHJpdGVGcmFtZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cbiBcbiAgICAvLyBoaWRlTGFiZWwoKXtcbiAgICAvLyAgICAgdGhpcy5zdGFydExhYmVsLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgLy8gfVxuICAgIGxvYWRTY2VuZSgpe1xuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJHYW1lU2NlbmVcIik7XG4gICAgfVxuICAgIFxuICAgIGZhZGVJbkdhbWVPdmVyKCl7XG4gICAgICAgIHRoaXMuUmVzdWx0LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuUmVzdWx0Lm9wYWNpdHkgPSAwO1xuICAgICAgICBjYy50d2Vlbih0aGlzLlJlc3VsdCkudG8oMC44LHtvcGFjaXR5OiAyNTV9KS5zdGFydCgpO1xuICAgICAgICBpZih0aGlzLmlzTmV3QmVzdCkge1xuICAgICAgICAgICAgdGhpcy5OZXdiZXN0LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLk5ld2Jlc3QpLnJlcGVhdEZvcmV2ZXIoY2MudHdlZW4odGhpcy5OZXdiZXN0KS50bygwLjEyLHthbmdsZTogNX0pLnRvKDAuMTIse2FuZ2xlOiAtNX0pKS5zdGFydCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuR2FtZS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG4gICAgb25DbGlja1NvdW5kQnV0dG9uKCkge1xuIFxuICAgICAgICBjYy50d2Vlbih0aGlzLnNvdW5kQnV0dG9uKVxuICAgICAgICAgICAgLnRvKDAuMDUsIHsgcG9zaXRpb246IGNjLnYzKHRoaXMuc291bmRCdXR0b24ucG9zaXRpb24ueCwgdGhpcy5zb3VuZEJ1dHRvbi5wb3NpdGlvbi55IC0gNykgfSlcbiAgICAgICAgICAgIC50bygwLjA1LCB7IHBvc2l0aW9uOiBjYy52Myh0aGlzLnNvdW5kQnV0dG9uLnBvc2l0aW9uKSB9KS5zdGFydCgpO1xuIFxuIFxuICAgICAgICBVdGlscy5zZXRMb2NhbCgnc291bmQnLCAhSlNPTi5wYXJzZShVdGlscy5nZXRMb2NhbCgnc291bmQnKSkpO1xuIFxuICAgICAgICB0aGlzLnVwZGF0ZVNvdW5kKCk7XG4gICAgICAgIFxuICAgIH1cbiAgICB1cGRhdGVTb3VuZCgpIHtcbiAgICAgICAgaWYgKEpTT04ucGFyc2UoVXRpbHMuZ2V0TG9jYWwoJ3NvdW5kJykpKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuc291bmRCdXR0b24uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnNvdW5kQnV0dG9uT25TcHJpdGVGcmFtZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5zb3VuZEJ1dHRvbi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuc291bmRCdXR0b25PZmZTcHJpdGVGcmFtZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBzdGFydCAoKSB7XG4gICAgICAgIHRoaXMuYmVzdFNjb3JlLnN0cmluZyA9ICdCZXN0ICcgKyBcIjBcIjtcbiAgICAgICAgdGhpcy51cGRhdGVTY29yZSgwKTtcbiAgICAgICAgdGhpcy51cGRhdGVTb3VuZCgpO1xuICAgICAgICBVSUNvbnRyb2xsZXIuaW5zdGFuY2UgPSB0aGlzO1xuICAgICAgICBcbiAgICB9XG4gXG4gICAgdXBkYXRlIChkdCkge1xuICAgICAgICB0aGlzLnVwZGF0ZVNvdW5kKCk7XG4gICAgICAgIFxuICAgIH1cbn1cbiBcbiJdfQ==