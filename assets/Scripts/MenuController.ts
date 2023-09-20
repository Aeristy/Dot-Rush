// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import SoundController from "./SoundController";
import Utils from "./Utils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MenuController extends cc.Component {
  static instance: MenuController;
  @property(cc.Node)
  Game: cc.Node = null;

  @property(cc.Node)
  Title: cc.Node = null;

  @property(cc.Label)
  bestScore: cc.Label = null;

  @property(cc.Node)
  Tap: cc.Node = null;

  @property(cc.Node)
  soundButton: cc.Node = null;

  @property(cc.Node)
  playButton: cc.Node = null;

  @property(cc.SpriteFrame)
  soundButtonOnSpriteFrame: cc.SpriteFrame = null;

  @property(cc.SpriteFrame)
  soundButtonOffSpriteFrame: cc.SpriteFrame = null;

  @property(cc.AudioClip)
  backgroundMusic: cc.AudioClip = null;

  @property(cc.AudioClip)
  btnClick: cc.AudioClip = null;

  music = null;
  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    var titlePos = this.Title.position;
    MenuController.instance = this;
    if (cc.sys.localStorage.getItem("bestScoreDotRush") == null)
      cc.sys.localStorage.setItem("bestScoreDotRush", 0);
    cc.tween(this.playButton)
      .repeatForever(
        cc.tween(this.playButton).to(0.5, { scale: 1.2 }).to(0.5, { scale: 1 })
      )
      .start();
    cc.tween(this.Title)
      .repeatForever(
        cc
          .tween(this.Title)
          .to(0.5, { position: cc.v3(titlePos.x, titlePos.y - 50) })
          .to(0.5, { position: cc.v3(titlePos) })
      )
      .start();
    this.bestScore.string = "Best " + Utils.getLocal("bestScoreDotRush");
    Utils.setLocal("sound", true);
  }

  start() {}

  onPlayButtonClick() {
    if (JSON.parse(Utils.getLocal("sound")))
      cc.audioEngine.play(this.btnClick, false, 1);
    this.Game.active = true;
    this.Game.opacity = 0;
    cc.tween(this.Game).to(0.8, { opacity: 255 }).start();
    this.node.parent.active = false;
  }

  onFirstTap() {
    this.music = cc.audioEngine.play(this.backgroundMusic, true, 1);
    this.node.parent.active = true;
    this.node.parent.opacity = 0;
    cc.tween(this.node.parent).to(0.8, { opacity: 255 }).start();
    this.Tap.active = false;
    this.Tap.destroy();
  }

  onClickSoundButton() {
    cc.tween(this.soundButton)
      .to(0.05, {
        position: cc.v3(
          this.soundButton.position.x,
          this.soundButton.position.y - 7
        ),
      })
      .to(0.05, { position: cc.v3(this.soundButton.position) })
      .start();

    Utils.setLocal("sound", !JSON.parse(Utils.getLocal("sound")));
    this.updateSound();
  }

  updateSound() {
    if (JSON.parse(Utils.getLocal("sound"))) {
      this.soundButton.getComponent(cc.Sprite).spriteFrame =
        this.soundButtonOnSpriteFrame;
    } else {
      this.soundButton.getComponent(cc.Sprite).spriteFrame =
        this.soundButtonOffSpriteFrame;
    }
  }

  update(dt) {
    if (!JSON.parse(Utils.getLocal("sound"))) cc.audioEngine.pause(this.music);
    if (JSON.parse(Utils.getLocal("sound"))) cc.audioEngine.resume(this.music);
    this.updateSound();
  }
}
