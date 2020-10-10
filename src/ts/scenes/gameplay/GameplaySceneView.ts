import { BaseView } from "../../modules/core/BaseView";
import { ScreenUtilController } from "../../modules/screenutility/ScreenUtilController";
import { GraphicsButton as Button } from "../../modules/gameobjects/ui/GraphicsButton";
import { FontListKey, SceneListKey } from "../../info/GameInfo";
import { Rectangle } from "../../modules/gameobjects/Rectangle";
import { ToolView } from "./tool/ToolView";

const EventNames = {
	onClickSFX: "onClickSFX",
	onCreateFinish: "onCreateFinish",
};

export class GameplaySceneView implements BaseView {

	event: Phaser.Events.EventEmitter;
	screenUtility: ScreenUtilController;
	eventName: typeof EventNames;

	screenOverlay: Rectangle;
	tool: ToolView;

	constructor (private _scene: Phaser.Scene) {
		this.screenUtility = ScreenUtilController.getInstance();
		this.event = new Phaser.Events.EventEmitter();
		this.eventName = EventNames;
	}

	create (displayPercentage: number): void {
		const { width } = this.screenUtility;

		const restartStyleBtn: Phaser.Types.GameObjects.Text.TextStyle = {
			color: 'black',
			fontFamily: FontListKey.ROBOTO,
		};
		const restartBtn = new Button(this._scene, width * 0.875, 64 * displayPercentage, "Restart", restartStyleBtn, {
			fill: 0x95a5a6,
			alpha: 1,
			height: 64,
			width: 150
		});
		restartBtn.transform.setToScaleDisplaySize(displayPercentage * 1.5);
		restartBtn.labelText.gameObject.setFontSize(32 * restartBtn.transform.displayToOriginalHeightRatio);
		restartBtn.click.once(() => {
			this.event.emit(this.eventName.onClickSFX);
			const scene = this._scene.scene;
			scene.start(SceneListKey.TITLE);
		});

		this.tool = new ToolView(this._scene);

		this.createScreenOverlay();
		this.tool.create(displayPercentage, this.screenOverlay);

		this.event.emit(this.eventName.onCreateFinish);
	}

	private createScreenOverlay (): void {
		const color = 0x2d3436;
		const alpha = 0.55;
		this.screenOverlay = new Rectangle(this._scene, 0, 0, this.screenUtility.width, this.screenUtility.height, color);
		this.screenOverlay.gameObject.setOrigin(0).setAlpha(alpha).setInteractive().setVisible(false);
	}

	update (time: number, dt: number): void {
		if (this._scene.input.keyboard.addKey('Z').isDown) {
			const scene = this._scene.scene;
			scene.start(SceneListKey.TITLE);
		}
	}

}