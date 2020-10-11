import { CustomTypes } from "../../../../types/custom";
import { Assets } from "../../../library/AssetGameplay";
import { BaseView } from "../../../modules/core/BaseView";
import { Image } from "../../../modules/gameobjects/Image";
import { Sprite } from "../../../modules/gameobjects/Sprite";
import { GraphicsButton } from "../../../modules/gameobjects/ui/GraphicsButton";
import { Text } from "../../../modules/gameobjects/ui/Text";
import { ScreenUtilController } from "../../../modules/screenutility/ScreenUtilController";

const EventNames = {
	onClick: "onClick",
	onClickConfirm: "onClickConfirm",
	onClickCancel: "onClickCancel",
	onCreateFinish: "onCreateFinish",
};

export class CheckPointView implements BaseView {

	event: Phaser.Events.EventEmitter;
	screenUtility: ScreenUtilController;
	eventName: typeof EventNames;

	private _displayPercentage: number;
	private _checkpoints: CustomTypes.Gameplay.GameData.CheckpointData;
	private _sprites: Sprite[];

	private _confirmContainer: Phaser.GameObjects.Container;
	private _selectedCheckpoint: CustomTypes.General.KeyValuePair<string, Phaser.Geom.Point>;

	constructor (private _scene: Phaser.Scene) {
		this.event = new Phaser.Events.EventEmitter();
		this.screenUtility = ScreenUtilController.getInstance();
		this.eventName = EventNames;
	}

	create (displayPercentage: number, checkpoints: CustomTypes.Gameplay.GameData.CheckpointData): void {
		this._displayPercentage = displayPercentage;
		this._checkpoints = checkpoints;
		this.createCheckpoints();
		this.createConfrimPanel();

		this.event.emit(this.eventName.onCreateFinish);
	}

	private createCheckpoints (): void {
		this._sprites = [];
		for (const key in this._checkpoints) {
			if (!Reflect.has(this._checkpoints, key)) continue;
			const points = this._checkpoints[key];
			for (let i = 0; i < points.length; i++) {
				const point = points[i].value;
				const sprite = new Sprite(this._scene, this.screenUtility.width * point.x, this.screenUtility.height * point.y, Assets.checkpoint.key, 0);
				sprite.transform.setToScaleDisplaySize(this._displayPercentage * 0.785);
				this.setTweenEffect(sprite.gameObject);
				this.setInteractive(sprite.gameObject, points[i].key, new Phaser.Geom.Point(sprite.gameObject.x, sprite.gameObject.y));
				this._sprites.push(sprite);
			}
		}
	}

	private setInteractive (gameObject: Phaser.GameObjects.Sprite, key: string, pos: Phaser.Geom.Point): void {
		gameObject.setInteractive({ useHandCursor: true })
		.on('pointerup', () => this._scene.tweens.add({
			targets: gameObject,
			props: {
				scale: { getStart: () => gameObject.scaleY * 0.925, getEnd: () => gameObject.scaleY }
			},
			duration: 150,
			onComplete: () => {
				this._selectedCheckpoint = {key: key, value: pos};
				this.event.emit(this.eventName.onClick, key);
				this.showConfirmPanel();
			}
		}));
	}

	private setTweenEffect (gameObject: Phaser.GameObjects.Sprite): void {
		this._scene.tweens.add({
			targets: gameObject,
			props: {
				alpha: { getStart: () => 1, getEnd: () => 0.4 }
			},
			yoyo: true,
			repeat: -1,
			duration: Phaser.Math.Between(500, 1000)
		});
	}

	private createConfrimPanel (): void {
		this._confirmContainer = this._scene.add.container(this.screenUtility.centerX, this.screenUtility.centerY).setDepth(20);
		const panel = new Image(this._scene, this.screenUtility.centerX, this.screenUtility.centerY, Assets.panel_confirm_checkpoint.key);
		panel.transform.setToScaleDisplaySize(this._displayPercentage);

		const buttonRatio = 1.65;
		const confirmPosBtn = panel.transform.getDisplayPositionFromCoordinate(0.3, 0.72);
		const confirmBtn = new GraphicsButton(this._scene, confirmPosBtn.x, confirmPosBtn.y, "Yes", {
			color: 'black',
			fontSize: `${42 * panel.transform.displayToOriginalHeightRatio}px`
		});
		confirmBtn.transform.setToScaleDisplaySize(this._displayPercentage * buttonRatio);
		confirmBtn.click.on(() => {
			this.hideConfirmPanel();
			this.event.emit(this.eventName.onClickConfirm, this._selectedCheckpoint);
		});

		const cancelPosBtn = panel.transform.getDisplayPositionFromCoordinate(0.7, 0.72);
		const cancelBtn = new GraphicsButton(this._scene, cancelPosBtn.x, cancelPosBtn.y, "No", {
			color: 'black',
			fontSize: `${42 * panel.transform.displayToOriginalHeightRatio}px`
		});
		cancelBtn.transform.setToScaleDisplaySize(this._displayPercentage * buttonRatio);
		cancelBtn.click.on(() => {
			this.event.emit(this.eventName.onClickCancel);
			this.hideConfirmPanel();
		});

		const gameobjects = [
			panel.gameObject,
			confirmBtn.container,
			cancelBtn.container,
		];
		gameobjects.forEach((go) => go.setPosition(go.x - this.screenUtility.centerX, go.y - this.screenUtility.centerY));
		this._confirmContainer.add(gameobjects).setVisible(false);
	}

	private showConfirmPanel (): void {
		this._scene.tweens.add({
			onStart: () => this._confirmContainer.setVisible(true),
			targets: this._confirmContainer,
			props: {
				scale: { getStart: () => (this._confirmContainer.scaleY * 0.85), getEnd: () => this._confirmContainer.scaleY }
			},
			duration: 350,
			ease: Phaser.Math.Easing.Quartic.Out
		});
	}

	private hideConfirmPanel (): void {
		this._confirmContainer.setVisible(false);
	}

}