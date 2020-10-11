import { BaseView } from "../../modules/core/BaseView";
import { ScreenUtilController } from "../../modules/screenutility/ScreenUtilController";
import { GraphicsButton as Button } from "../../modules/gameobjects/ui/GraphicsButton";
import { FontListKey, SceneListKey } from "../../info/GameInfo";
import { Rectangle } from "../../modules/gameobjects/Rectangle";
import { ToolView } from "./tool/ToolView";
import { Image } from "../../modules/gameobjects/Image";
import { Assets } from "../../library/AssetGameplay";
import { Text } from "../../modules/gameobjects/ui/Text";

const EventNames = {
	onSFXClick: "onSFXClick",
	onCreateFinish: "onCreateFinish",
};

export class GameplaySceneView implements BaseView {

	event: Phaser.Events.EventEmitter;
	screenUtility: ScreenUtilController;
	eventName: typeof EventNames;

	screenOverlay: Rectangle;
	tool: ToolView;
	slimePointText: Text;

	constructor (private _scene: Phaser.Scene) {
		this.screenUtility = ScreenUtilController.getInstance();
		this.event = new Phaser.Events.EventEmitter();
		this.eventName = EventNames;
	}

	create (displayPercentage: number, slimePoint: number): void {
		const { width } = this.screenUtility;

		const restartStyleBtn: Phaser.Types.GameObjects.Text.TextStyle = {
			color: 'black',
			fontFamily: FontListKey.ROBOTO,
		};
		const restartBtn = new Button(this._scene, 100, 64 * displayPercentage, "Restart", restartStyleBtn, {
			fill: 0xfafafa,
			alpha: 1,
			height: 64,
			width: 150
		});
		restartBtn.transform.setToScaleDisplaySize(displayPercentage * 1.5);
		restartBtn.labelText.gameObject.setFontSize(32 * restartBtn.transform.displayToOriginalHeightRatio);
		restartBtn.click.once(() => {
			this.event.emit(this.eventName.onSFXClick);
			const scene = this._scene.scene;
			scene.start(SceneListKey.TITLE);
		});

		this.tool = new ToolView(this._scene);

		this.createMisc(displayPercentage);
		this.createScreenOverlay();
		this.createHUD(displayPercentage, slimePoint);
		this.tool.create(displayPercentage, this.screenOverlay);

		this.event.emit(this.eventName.onCreateFinish);
	}

	private createMisc (displayPercentage: number): void {
		const bookRed = new Image(this._scene, 0, this.screenUtility.height, Assets.misc_book_a.key);
		bookRed.transform.setToScaleDisplaySize(displayPercentage);
		bookRed.gameObject.setOrigin(0.75, 0.825);
		const bookYellow = new Image(this._scene, this.screenUtility.width, this.screenUtility.height, Assets.misc_book_b.key);
		bookYellow.transform.setToScaleDisplaySize(displayPercentage);
		bookYellow.gameObject.setOrigin(0.2, 0.835);
	}

	private createScreenOverlay (): void {
		const color = 0x2d3436;
		const alpha = 0.55;
		this.screenOverlay = new Rectangle(this._scene, 0, 0, this.screenUtility.width, this.screenUtility.height, color);
		this.screenOverlay.gameObject.setOrigin(0).setAlpha(alpha).setInteractive().setVisible(false);
	}

	private createHUD (displayPercentage: number, slimePoint: number): void {
		const slimePointHolder = new Image(this._scene, this.screenUtility.width * 0.97, 100 * displayPercentage, Assets.slime_holder.key);
		slimePointHolder.transform.setToScaleDisplaySize(displayPercentage * 1.5);
		slimePointHolder.gameObject.setOrigin(1, 0.5);

		const slimePointPosText = slimePointHolder.transform.getDisplayPositionFromCoordinate(0.35, 0.5);
		this.slimePointText = new Text(this._scene, slimePointPosText.x, slimePointPosText.y, slimePoint.toString(), {
			fontFamily: FontListKey.ROBOTO,
			fontSize: `${32 * slimePointHolder.transform.displayToOriginalHeightRatio}px`,
			align: 'right'
		});
		this.slimePointText.gameObject.setOrigin(1, 0.5);
	}

	update (time: number, dt: number): void {
		if (this._scene.input.keyboard.addKey('Z').isDown) {
			const scene = this._scene.scene;
			scene.start(SceneListKey.TITLE);
		}
	}

	updateSlimePoint (value: number): void {
		const point = value <= 0 ? 0 : value;
		this.slimePointText.gameObject.setText(point.toString());
	}

}