const { ccclass, property } = cc._decorator;

export default class Utils extends cc.Component {

    

    public static worldSpaceToLocal(worldSpace: cc.Vec2, local: Node) {

    }

    public static random(minInclusive: number, maxInclusive: number): number {
        return Math.floor(Math.random() * (maxInclusive - minInclusive + 1)) + minInclusive;
    }

    public static getLocal(itemName: string): any {
        return cc.sys.localStorage.getItem(itemName);
    }

    public static setLocal(itemName: string, value: any): void {
        return cc.sys.localStorage.setItem(itemName, value);
    }

    // cc.tween(this.soundButton)
    //         .to(0.05, { position: cc.v3(this.soundButton.position.x, this.soundButton.position.y - 7) })
    //         .to(0.05, { position: cc.v3(this.soundButton.position) }).start();
}