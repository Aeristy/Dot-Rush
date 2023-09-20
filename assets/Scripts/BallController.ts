// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import GameController from "./GameController";
import SoundController from "./SoundController";
import Utils from "./Utils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BallController extends cc.Component {
  @property(cc.Vec2)
  centerPos: cc.Vec2 = null;

  @property(cc.Prefab)
  ringEffectPrefab: cc.Prefab = null;

  @property(cc.Prefab)
  particleEffectPrefab: cc.Prefab = null;

  duration = 1.2;

  interval = 0.01;
  time = this.interval;
  target: cc.Node = null;
  previous: cc.Node = null;
  trailEnable: boolean = false;
  ringEffect: cc.Node = null;
  particleEffect: cc.Node = null;

  // LIFE-CYCLE CALLBACKS:
  updateDuration(duration: number) {
    this.duration = duration;
  }

  onCollisionEnter(other: cc.Collider, self: cc.Collider) {
    if (other.tag == self.tag) {
      this.onHitEffect();
      this.onHitSound();
      let worldPos = self.node.convertToWorldSpaceAR(cc.Vec2.ZERO_R);
      let otherWorldPos = other.node.convertToWorldSpaceAR(cc.Vec2.ZERO_R);

      GameController.instance.addScore(1);
      var deltaX = worldPos.x - otherWorldPos.x;
      var deltaY = worldPos.y - otherWorldPos.y;
      let normalizedDelta = cc.v2(deltaX, deltaY).normalize();

      // var angle = Math.atan2(normalizedDelta.y,normalizedDelta.x) * 180 / Math.PI;
      // cc.log(angle);
      this.trailEnable = true;
      cc.tween(this.node)
        .to(this.duration * 0.5, { position: cc.v3(normalizedDelta.mul(2000)) })
        .start();

      this.scheduleOnce(function () {
        GameController.instance.destroyBall();
      }, this.duration * 0.4);
    } else {
      this.onHitEffect();
      other.node.destroy();
      GameController.instance.onGameOver();
    }
  }

  onHitSound() {
    if (Utils.random(0, 1) == 0) SoundController.instance.play("hit1");
    else SoundController.instance.play("hit1");
  }

  onLoad() {
    this.updateDuration(GameController.instance.duration);
    this.target = this.node;
    this.node.zIndex = 30000;
  }

  start() {}

  addTrailt() {
    this.time = this.interval;
    let clone = new cc.Node();

    clone.parent = this.node.parent;
    clone.scale = this.target.scale;
    clone.opacity = 200;
    if (this.previous == null) clone.zIndex = 10000;
    else clone.zIndex = this.previous.zIndex - 1;

    let targetPos = this.node.convertToWorldSpaceAR(cc.Vec2.ZERO_R);
    clone.position = cc.v3(this.node.x, this.node.y);

    clone.addComponent(cc.Sprite).spriteFrame = this.target.getComponent(
      cc.Sprite
    ).spriteFrame;
    clone.setContentSize(this.target.getContentSize());
    cc.tween(clone)
      .to(this.duration * 0.5, { opacity: 0 })
      .start();
    cc.tween(clone)
      .to(this.duration * 0.5, { scale: 0 })
      .start();

    this.previous = clone;
  }
  onHitEffect() {
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
  }
  update(dt) {
    this.updateDuration(GameController.instance.duration);
    if (!this.trailEnable) return;
    if (this.time > 0) this.time -= dt;
    else {
      this.addTrailt();
    }
  }
}
