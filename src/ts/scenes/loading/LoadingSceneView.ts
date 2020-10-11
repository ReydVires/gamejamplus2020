import { BaseView } from "../../modules/core/BaseView";
import { ScreenUtilController } from "../../modules/screenutility/ScreenUtilController";
import { Text } from "../../modules/gameobjects/ui/Text";
import { Assets } from "../../library/AssetLoading";
import { AnimationHelper } from "../../helper/AnimationHelper";
import { Animations } from "../../library/AssetAnimation";
import { Sprite } from "../../modules/gameobjects/Sprite";
import { FontListKey } from "../../info/GameInfo";

export class LoadingSceneView implements BaseView {

	event: Phaser.Events.EventEmitter;
	screenUtility: ScreenUtilController;
	private _progressText: Text;
	private _bar: Sprite;
	private _progressBar: Phaser.GameObjects.Graphics;

	constructor (private _scene: Phaser.Scene) {
		this.screenUtility = ScreenUtilController.getInstance();
	}

	create (): void {
		const bg = new Sprite(this._scene, this.screenUtility.centerX, this.screenUtility.centerY, Assets.bg_loading.key);
		bg.transform.setMinPreferredDisplaySize(this.screenUtility.width, this.screenUtility.height);

		const mascot = new Sprite(this._scene, this.screenUtility.centerX, this.screenUtility.centerY * 0.65, Assets.slime_loading.key);
		mascot.transform.setToScaleDisplaySize(bg.transform.displayToOriginalHeightRatio * 0.85);

		const frame = new Sprite(this._scene, this.screenUtility.centerX, this.screenUtility.centerY, Assets.loading_frame.key);
		frame.transform.setMaxPreferredDisplaySize(this.screenUtility.width, this.screenUtility.height);
		frame.gameObject.setOrigin(0.5)
			.setDepth(1)
			.setAlpha(1);

		const loadingPosTextAnim = frame.transform.getDisplayPositionFromCoordinate(0.5, 0.3);
		const loadingTextAnim = new Sprite(this._scene, 0, 0, Assets.loading_text.key);
		loadingTextAnim.transform.setToScaleDisplaySize(frame.transform.displayToOriginalWidthRatio);
		loadingTextAnim.gameObject.setOrigin(0.5, 1)
			.setPosition(loadingPosTextAnim.x, loadingPosTextAnim.y);

		AnimationHelper.AddAnimation(this._scene, Animations.loading_text);
		loadingTextAnim.gameObject.play(Animations.loading_text.key);

		this._bar = new Sprite(this._scene, frame.gameObject.x, frame.gameObject.y, Assets.loading_bar.key);
		this._bar.transform.setMaxPreferredDisplaySize(this.screenUtility.width, this.screenUtility.height);
		this._bar.gameObject.setOrigin(0.5)
			.setDepth(2)
			.setAlpha(1);

		this._progressText = new Text(this._scene, frame.gameObject.x, frame.gameObject.y, '0%', {
			color: '#ffd561', fontStyle: 'bold', align: 'center', fontFamily: FontListKey.ROBOTO
		});
		this._progressText.gameObject
			.setOrigin(0.5, 0.55).setDepth(20)
			.setFontSize(38 * this._bar.transform.displayToOriginalHeightRatio);

		this._progressBar = this._scene.add.graphics();
		this._progressBar.setVisible(false);
	}

	updateLoading (value: number): void {
		const mask = this._progressBar.createGeometryMask();
		this._bar.gameObject.setMask(mask);

		const percent = Math.round(value * 100).toString() + " %";
		this._progressText.gameObject.setText(percent);

		this._progressBar.clear();
		this._progressBar.fillStyle(0xffffff, 1);

		const height = this._bar.gameObject.displayHeight - 60;
		const width = this._bar.gameObject.displayWidth - 70;
		this._progressBar.fillRect(this._bar.gameObject.x - width/2, this._bar.gameObject.y - height/2, value * width, height);
	}

}