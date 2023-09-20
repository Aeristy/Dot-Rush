const { ccclass, property } = cc._decorator;

@ccclass
export default class ShadowEffect extends cc.Component {
    static instance: ShadowEffect;



    interval = 0.01
    time = this.interval
    target: cc.Node = null
    previous: cc.Node = null
    enable: boolean = false;
    protected onLoad(): void {
        ShadowEffect.instance = this;
        this.target = this.node
    }

    protected update(dt: number): void {
        if(!this.enable) return;
        if (this.time > 0) this.time -= dt
        else {
            this.time = this.interval
            let clone = new cc.Node()

            clone.parent = this.node.parent.parent;
            clone.scale = this.target.scale
            if (this.previous == null) clone.zIndex = 30000
            else clone.zIndex = this.previous.zIndex - 1
            
            let targetPos = this.node.convertToWorldSpaceAR(cc.Vec2.ZERO_R);
            clone.position = cc.v3(targetPos.x,targetPos.y);
            console.log(targetPos.x,clone.position.x);
            console.log(targetPos.y,clone.position.y);
            clone.addComponent(cc.Sprite).spriteFrame = this.target.getComponent(cc.Sprite).spriteFrame
            clone.setContentSize(this.target.getContentSize())
            cc.tween(clone).to(0.4, { opacity: 0 }).start()
            cc.tween(clone).to(0.4, { scale: 0 }).start()

            this.previous = clone

        }
    }
}