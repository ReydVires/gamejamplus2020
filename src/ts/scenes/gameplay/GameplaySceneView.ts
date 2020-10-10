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

		const restartStyleBtn: Phaser.Types.GameObjects.Text.TextStyle = {
			color: 'black',
			fontFamily: FontListKey.ROBOTO,
		};
		const restartBtn = new Button(this._scene, this.screenUtility.width * 0.875, 64 * screenPercentage, "Restart", restartStyleBtn, {
			fill: 0x95a5a6,
			alpha: 1,
			height: 64,
			width: 150
		});
		restartBtn.transform.setToScaleDisplaySize(screenPercentage * 1.5);
		restartBtn.labelText.gameObject.setFontSize(32 * restartBtn.transform.displayToOriginalHeightRatio);
		restartBtn.click.once(() => {
			this.event.emit(this.eventName.onClickSFX);
			const scene = this._scene.scene;
			scene.start(SceneListKey.TITLE);
		});

		this.event.emit(this.eventName.onCreateFinish);
	}

	update (time: number, dt: number): void {
		if (this._scene.input.keyboard.addKey('R').isDown) {
			const scene = this._scene.scene;
			scene.start(SceneListKey.TITLE);
		}
	}

}