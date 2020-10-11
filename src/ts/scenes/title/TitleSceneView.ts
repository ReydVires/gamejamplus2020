import { ScreenUtilController } from "../../modules/screenutility/ScreenUtilController";
import { BaseView } from "../../modules/core/BaseView";
import { Text } from "../../modules/gameobjects/ui/Text";
import { CONFIG, FontListKey } from "../../info/GameInfo";
import { Image } from "../../modules/gameobjects/Image";
import { Assets } from "../../library/AssetTitle";

const EventNames = {
	onCreateFinish: "onCreateFinish",
	onTapAction: "onTapAction",
};

export class TitleSceneView implements BaseView {

	event: Phaser.Events.EventEmitter;
	screenUtility: ScreenUtilController;
	eventName: typeof EventNames;

	constructor (private _scene: Phaser.Scene) {
		this.screenUtility = ScreenUtilController.getInstance();
		this.event = new Phaser.Events.EventEmitter();
		this.eventName = EventNames;
	}

	create (): void {
		const { centerX, centerY, width, height } = this.screenUtility;
		const bg = new Image(this._scene, centerX, centerY, Assets.bg_title.key);
		bg.transform.setMinPreferredDisplaySize(width, height);

		this._scene.input.once(Phaser.Input.Events.POINTER_UP, () => this.event.emit(this.eventName.onTapAction));

		this.event.emit(this.eventName.onCreateFinish);
	}

	update (time: number, dt: number): void {
		const spaceKey = this._scene.input.keyboard.addKey('SPACE');
		if (spaceKey.isDown) {
			this.event.emit(this.eventName.onTapAction);
		}
	}

}