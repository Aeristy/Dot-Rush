import SoundController from "./SoundController";
import UIController from "./UIController";
import Utils from "./Utils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameController extends cc.Component {
  static instance: GameController;

  @property(cc.Node) redBall: cc.Node = null;
  @property(cc.Node) blueBall: cc.Node = null;

  @property(cc.Node)
  center: cc.Node = null;

  @property(Array(cc.Vec2))
  ballSpawnPos: Array<cc.Vec2> = new Array<cc.Vec2>();

  @property(Array(cc.Prefab))
  ballPrefab: Array<cc.Prefab> = new Array<cc.Prefab>();

  @property(cc.Label)
  levelUpLabel: cc.Label = null;

  currentScore = 0;

  enemyBall: cc.Node = null;
  duration = 1;
  spinDuration = 0.25;
  rotation = 0;

  isSpawnable = false;
  isGameOver = false;
  isSpinning = false;

  // LIFE-CYCLE CALLBACKS:
  onLoad() {
    GameController.instance = this;
    // Utils.setLocal('bestScoreDotRush', 0);
    var manager = cc.director.getCollisionManager();
    manager.enabled = true;
    this.scheduleOnce(function () {
      this.isSpawnable = true;
    }, 1);
  }

  spinCenter() {
    if (!this.isGameOver && !this.isSpinning) {
      if (Utils.random(0, 1) == 0) SoundController.instance.play("fire1");
      else SoundController.instance.play("fire2");
      this.rotation += 180;
      cc.tween(this.center)
        .to(this.spinDuration, { angle: -this.rotation })
        .start();
      this.isSpinning = true;
      this.scheduleOnce(function () {
        this.isSpinning = false;
      }, this.spinDuration / 2);
    }
  }
  spawnBall() {
    let spawnPos = Utils.random(0, this.ballSpawnPos.length - 1);
    let ballColor = Utils.random(0, this.ballPrefab.length - 1);
    this.enemyBall = cc.instantiate(this.ballPrefab[ballColor]);
    this.enemyBall.parent = this.node.parent.getChildByName("Gameplay");
    this.enemyBall.x = this.ballSpawnPos[spawnPos].x;
    this.enemyBall.y = this.ballSpawnPos[spawnPos].y;
    cc.tween(this.enemyBall)
      .to(this.duration, { position: cc.v3(this.center.x, this.center.y) })
      .start();
  }
  onGameOver() {
    SoundController.instance.play("defeat");
    this.isGameOver = true;
    this.destroyBall();
    cc.tween(this.center).to(1, { angle: this.center.angle }).start();
    this.scheduleOnce(function () {
      UIController.instance.fadeInGameOver();
    }, 1);
  }
  addScore(amount: number) {
    this.currentScore += amount;
    // SoundController.instance.play("GainScore");
    if (this.currentScore > JSON.parse(Utils.getLocal("bestScoreDotRush"))) {
      Utils.setLocal("bestScoreDotRush", this.currentScore.toString());
      UIController.instance.isNewBest = true;
    }
    UIController.instance.updateScore(this.currentScore);
  }

  levelUp() {
    SoundController.instance.play("level");
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
  }
  destroyBall() {
    this.enemyBall.destroy();
    this.enemyBall = null;
  }
  update(dt) {
    this.node.on("touchstart", this.spinCenter, this);
    if (this.enemyBall == null && !this.isGameOver && this.isSpawnable) {
      this.spawnBall();
    }
  }
}
