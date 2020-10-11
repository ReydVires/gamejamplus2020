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
	private _sprites: Image[];
	private _maxBg: number = 2;

	constructor (private _scene: Phaser.Scene) {
		this.event = new Phaser.Events.EventEmitter();
		this.screenUtility = ScreenUtilController.getInstance();
		this.eventName = EventNames;
	}

	create (): void {
		this._sprites = [];
		for (let i = this._maxBg; i > 0; i--) {
			const sprite = new Image(this._scene, this.screenUtility.centerX, this.screenUtility.height * (i - 1), Assets.bg_game.key);
			sprite.transform.setMinPreferredDisplaySize(this.screenUtility.width, this.screenUtility.height);
			sprite.gameObject.setOrigin(0.5, 1);
			this._sprites.push(sprite);
		}

		this.event.emit(this.eventName.onCreateFinish);
	}

	get displayHeightRatio (): number {
		return this._sprites[0].transform.displayToOriginalHeightRatio;
	}

}