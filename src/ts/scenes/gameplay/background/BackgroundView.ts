import { Assets } from "../../../library/AssetGameplay";
import { BaseView } from "../../../modules/core/BaseView";
import { Image } from "../../../modules/gameobjects/Image";
import { ScreenUtilController } from "../../../modules/screenutility/ScreenUtilController";

const EventNames = {
	onCreateFinish: "onCreateFinish",
};

export class BackgroundView implements BaseView {

	event: Phaser.Events.EventEmitter;
	screenUtility: ScreenUtilController;
	eventName: typeof EventNames;
	private _sprite: Image;

	constructor (private _scene: Phaser.Scene) {
		this.event = new Phaser.Events.EventEmitter();
		this.screenUtility = ScreenUtilController.getInstance();
		this.eventName = EventNames;
	}

	create (): void {
		this._sprite = new Image(this._scene, this.screenUtility.centerX, this.screenUtility.height, Assets.bg_game.key);
		this._sprite.transform.setMinPreferredDisplaySize(this.screenUtility.width, this.screenUtility.height);
		this._sprite.gameObject.setOrigin(0.5, 1);

		this.event.emit(this.eventName.onCreateFinish);
	}

	get displayHeightRatio (): number {
		return this._sprite.transform.displayToOriginalHeightRatio;
	}

}