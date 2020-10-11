import { AnimationHelper } from "../../../helper/AnimationHelper";
import { Animations } from "../../../library/AssetAnimation";
import { Assets } from "../../../library/AssetGameplay";
import { BaseView } from "../../../modules/core/BaseView";
import { Sprite } from "../../../modules/gameobjects/Sprite";
import { ScreenUtilController } from "../../../modules/screenutility/ScreenUtilController";

const EventNames = {
	onCreateFinish: "onCreateFinish",
};

export class SlimeView implements BaseView {

	event: Phaser.Events.EventEmitter;
	screenUtility: ScreenUtilController;
	eventName: typeof EventNames;
	sprite: Sprite;

	animationList = {
		idle: Animations.slime_idle,
	};

	constructor (private _scene: Phaser.Scene) {
		this.screenUtility = ScreenUtilController.getInstance();
		this.event = new Phaser.Events.EventEmitter();
		this.eventName = EventNames;
	}

	create (displayPercentage: number): void {
		this.sprite = new Sprite(this._scene, this.screenUtility.centerX, this.screenUtility.height * 0.95, Assets.slime_char.key, 0);
		this.sprite.gameObject.setOrigin(0.5, 0.875);
		this.sprite.transform.setToScaleDisplaySize(displayPercentage);

		AnimationHelper.AddAnimation(this._scene, this.animationList.idle);
		this.sprite.gameObject.play(this.animationList.idle.key);

		this.event.emit(this.eventName.onCreateFinish);
	}

}