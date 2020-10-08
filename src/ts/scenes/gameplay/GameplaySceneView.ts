import { BaseView } from "../../modules/core/BaseView";
import { ScreenUtilController } from "../../modules/screenutility/ScreenUtilController";
import { Assets } from "../../library/AssetGameplay";
import { GraphicsButton as Button } from "../../modules/gameobjects/ui/GraphicsButton";
import { Image } from "../../modules/gameobjects/Image";
import { FontListKey, SceneListKey } from "../../info/GameInfo";

const EventNames = {
	onClickSFX: "onClickSFX",
	onCreateFinish: "onCreateFinish",
};

export class GameplaySceneView implements BaseView {

	event: Phaser.Events.EventEmitter;
	screenUtility: ScreenUtilController;
	eventName: typeof EventNames;

	constructor (private _scene: Phaser.Scene) {
		this.screenUtility = ScreenUtilController.getInstance();
		this.event = new Phaser.Events.EventEmitter();
		this.eventName = EventNames;
	}

	create (): void {
		const { centerX, centerY, width, height, ratio, screenPercentage } = this.screenUtility;

		const testSprite = new Image(this._scene, centerX, centerY * 0.5, Assets.phaser_logo.key);
		testSprite.transform.setMinPreferredDisplaySize(width * 0.3, height * 0.3);

		const restartBtn = new Button(this._scene, centerX, centerY * 1.2, "Restart", {
			color: 'black',
			fontFamily: FontListKey.ROBOTO,
		});
		restartBtn.transform.setToScaleDisplaySize(testSprite.transform.displayToOriginalHeightRatio * 1.5);
		restartBtn.labelText.gameObject.setFontSize(32 * restartBtn.transform.displayToOriginalHeightRatio);
		restartBtn.click.once(() => {
			this.event.emit(this.eventName.onClickSFX);
			const scene = this._scene.scene;
			scene.start(SceneListKey.TITLE);
		});

		const otherSprite = new Image(this._scene, centerX, centerY * 0.6, Assets.phaser_logo.key);
		otherSprite.transform.setToScreenPercentage(0.2 / ratio);

		this.event.emit(this.eventName.onCreateFinish);
	}

	update (time: number, dt: number): void {
		if (this._scene.input.keyboard.addKey('R').isDown) {
			const scene = this._scene.scene;
			scene.start(SceneListKey.TITLE);
		}
	}

}