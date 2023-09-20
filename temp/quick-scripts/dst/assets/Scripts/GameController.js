
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