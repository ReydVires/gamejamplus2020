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

	constructor (private _scene: Phaser.Scene) {
		this.screenUtility = ScreenUtilController.getInstance();
		this.event = new Phaser.Events.EventEmitter();
		this.eventName = EventNames;
	}

	create (displayPercentage: number): void {
		this.sprite = new Sprite(this._scene, this.screenUtility.centerX, this.screenUtility.height * 0.95, Assets.slime_char.key, 0);
		this.sprite.gameObject.setOrigin(0.5, 1);
		this.sprite.transform.setToScaleDisplaySize(displayPercentage);

		this.event.emit(this.eventName.onCreateFinish);
	}

}