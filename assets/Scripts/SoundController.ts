import Utils from "./Utils";
 
const { ccclass, property } = cc._decorator;
 
@ccclass
export default class SoundController extends cc.Component {
    public static instance: SoundController = null;
 
    @property(Array(cc.AudioClip))
    audioClips: Array<cc.AudioClip> = new Array<cc.AudioClip>();
 
    player: cc.AudioSource = null;
 
    onLoad() {
        this.player = this.getComponent(cc.AudioSource);
        SoundController.instance = this;
    }
 
    play(soundName: string) {
        if (JSON.parse(Utils.getLocal('sound')))
            this.audioClips.forEach(clip => {
                if (clip.name == soundName) {
                    this.player.clip = clip;
                    this.player.isPlaying
                    this.player.play();
                }
            });
    }
}