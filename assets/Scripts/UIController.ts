import GameController from "./GameController";
import MenuController from "./MenuController";

import Utils from "./Utils";
 
const {ccclass, property} = cc._decorator;
	
 
 
@ccclass
export default class UIController extends cc.Component {
    static instance: UIController;
    // @property(cc.Label)
    // startLabel: cc.Label = null;
    
 
    @property(cc.Label)
    currentScore: cc.Label = null;

    @property(Array(cc.Node))
    LevelProgress: Array<cc.Node> = new Array<cc.Node>;
 
    @property(cc.Label)
    bestScore: cc.Label = null;
 
    @property(cc.Label)
    resultScore: cc.Label = null;

    @property(cc.Node)
    Newbest: cc.Node = null;
    
    @property(cc.Node)
    soundButton: cc.Node = null;

    @property(cc.Node)
    replayButton: cc.Node = null;

    @property(cc.Node)
    Game: cc.Node = null;

    @property(cc.Node)
    Result: cc.Node = null;

    // @property(cc.Node)
    // mainBackground: cc.Node = null;

    // @property(cc.Node)
    // resultBackground: cc.Node = null;
 
    @property(cc.SpriteFrame)
    soundButtonOnSpriteFrame: cc.SpriteFrame = null;
 
    @property(cc.SpriteFrame)
    soundButtonOffSpriteFrame: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    LevelOnSpriteFrame: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    LevelOffSpriteFrame: cc.SpriteFrame = null;

    @property(cc.Prefab)
    GamePrefab: cc.Prefab = null;


    isNewBest = false;

    newGame: cc.Node = null;
    
    
    onLoad(){
        cc.tween(this.replayButton).repeatForever(cc.tween(this.replayButton).to(0.1,{scale: 0.95}).to(0.1,{scale: 1})).start();
        if (cc.sys.localStorage.getItem('bestScoreDotRush') == null) cc.sys.localStorage.setItem('bestScoreDotRush', 0);
    }

    onReplayButtonClick(){
        this.node.parent.parent.active = false;
        this.newGame = cc.instantiate(this.GamePrefab);
        this.newGame.parent = this.node.parent.parent.parent;
        this.newGame.active = true;
        this.newGame.opacity = 0;
        this.newGame.position = cc.v3(-720,-1280);
        cc.tween(this.newGame).to(0.5,{opacity: 255}).start();      
    }

    updateScore(score: number) {
        this.currentScore.string = score.toString();
        this.resultScore.string = score.toString();
        this.bestScore.string = 'Best ' + Utils.getLocal('bestScoreDotRush');
        var progress = score%this.LevelProgress.length;
        if(progress == 0 && score>0){
            for (let i = 0; i < this.LevelProgress.length; i++) {
                this.LevelProgress[i].getComponent(cc.Sprite).spriteFrame = this.LevelOffSpriteFrame;
                
            }
            GameController.instance.levelUp();
        }
        else{
            for (let i = 0; i < progress; i++) {
                this.LevelProgress[i].getComponent(cc.Sprite).spriteFrame = this.LevelOnSpriteFrame;
            
            }
        }
        
    }
 
    // hideLabel(){
    //     this.startLabel.node.active = false;
    // }
    loadScene(){
        cc.director.loadScene("GameScene");
    }
    
    fadeInGameOver(){
        this.Result.active = true;
        this.Result.opacity = 0;
        cc.tween(this.Result).to(0.8,{opacity: 255}).start();
        if(this.isNewBest) {
            this.Newbest.active = true;
            cc.tween(this.Newbest).repeatForever(cc.tween(this.Newbest).to(0.12,{angle: 5}).to(0.12,{angle: -5})).start();
        }
        this.Game.active = false;
    }
    onClickSoundButton() {
 
        cc.tween(this.soundButton)
            .to(0.05, { position: cc.v3(this.soundButton.position.x, this.soundButton.position.y - 7) })
            .to(0.05, { position: cc.v3(this.soundButton.position) }).start();
 
 
        Utils.setLocal('sound', !JSON.parse(Utils.getLocal('sound')));
 
        this.updateSound();
        
    }
    updateSound() {
        if (JSON.parse(Utils.getLocal('sound'))) {
            
            this.soundButton.getComponent(cc.Sprite).spriteFrame = this.soundButtonOnSpriteFrame;
        }
        else {
            
            this.soundButton.getComponent(cc.Sprite).spriteFrame = this.soundButtonOffSpriteFrame;
        }
    }
    
    start () {
        this.bestScore.string = 'Best ' + "0";
        this.updateScore(0);
        this.updateSound();
        UIController.instance = this;
        
    }
 
    update (dt) {
        this.updateSound();
        
    }
}
 
