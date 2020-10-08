import { ScreenUtilController } from "../../modules/screenutility/ScreenUtilController";
import { BaseView } from "../../modules/core/BaseView";
import { Text } from "../../modules/gameobjects/ui/Text";
import { CONFIG, FontListKey } from "../../info/GameInfo";

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
		const { centerX, centerY } = this.screenUtility;
		const textContent = "The quick brown fox jump";
		const colorContent = "#fafafa";
		const fontSizeContent = `${45 * this.screenUtility.screenPercentage}px`;

		const defaultFont = new Text(this._scene, centerX, centerY, textContent, { fontSize: fontSizeContent, color: colorContent });
		defaultFont.gameObject.setOrigin(0.5);

		const arialFont = new Text(this._scene, centerX, defaultFont.gameObject.y + defaultFont.gameObject.height, textContent, { fontFamily: FontListKey.ARIAL, fontSize: fontSizeContent, color: colorContent });
		arialFont.gameObject.setOrigin(0.5);

		const customFont = new Text(this._scene, centerX, arialFont.gameObject.y + arialFont.gameObject.height, textContent, { fontFamily: FontListKey.ROBOTO, fontSize: fontSizeContent, color: colorContent });
		customFont.gameObject.setOrigin(0.5);

		const playText = new Text(this._scene, centerX, arialFont.gameObject.y + arialFont.gameObject.height * (5 * this.screenUtility.ratio), "[TAP/SPACE TO PLAY!]", { fontFamily: FontListKey.ROBOTO, fontSize: fontSizeContent, color: colorContent });
		playText.transform.setMinPreferredDisplaySize(this.screenUtility.width * 0.7, playText.transform.heightAspectRatio);
		playText.gameObject.setOrigin(0.5);

		const modeText = new Text(this._scene, 16, 16, `MODE: ${CONFIG.MODE}`, { fontFamily: FontListKey.ROBOTO, fontSize: `${38 * this.screenUtility.screenPercentage}px`, color: colorContent });
		modeText.gameObject.setOrigin(0);

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