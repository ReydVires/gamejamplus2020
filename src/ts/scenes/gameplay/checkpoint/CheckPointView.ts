import { CustomTypes } from "../../../../types/custom";
import { Assets } from "../../../library/AssetGameplay";
import { BaseView } from "../../../modules/core/BaseView";
import { Sprite } from "../../../modules/gameobjects/Sprite";
import { ScreenUtilController } from "../../../modules/screenutility/ScreenUtilController";

const EventNames = {
	onClick: "onClick",
	onCreateFinish: "onCreateFinish",
};

export class CheckPointView implements BaseView {

	event: Phaser.Events.EventEmitter;
	screenUtility: ScreenUtilController;
	eventName: typeof EventNames;

	private _displayPercentage: number;
	private _checkpoints: CustomTypes.Gameplay.GameData.Coordinate;
	private _sprites: Sprite[];

	constructor (private _scene: Phaser.Scene) {
		this.event = new Phaser.Events.EventEmitter();
		this.screenUtility = ScreenUtilController.getInstance();
		this.eventName = EventNames;
	}

	create (displayPercentage: number, checkpoints: CustomTypes.Gameplay.GameData.Coordinate): void {
		this._displayPercentage = displayPercentage;
		this._checkpoints = checkpoints;
		this.createCheckpoints();

		this.event.emit(this.eventName.onCreateFinish);
	}

	private createCheckpoints (): void {
		this._sprites = [];
		for (const key in this._checkpoints) {
			if (!Reflect.has(this._checkpoints, key)) continue;
			const points = this._checkpoints[key];
			for (let i = 0; i < points.length; i++) {
				const point = points[i]?.value;
				const sprite = new Sprite(this._scene, this.screenUtility.centerX * point.x, this.screenUtility.centerY * point.y, Assets.checkpoint.key, 0);
				sprite.transform.setToScaleDisplaySize(this._displayPercentage);
				this.setInteractive(sprite.gameObject, i, points[i].key);
				this._sprites.push(sprite);
			}
		}
	}

	private setInteractive (gameObject: Phaser.GameObjects.Sprite, index: number, id: string): void {
		gameObject.setInteractive({ useHandCursor: true })
		.on('pointerup', () => this._scene.tweens.add({
			targets: gameObject,
			props: {
				alpha: { getStart: () => 0.65, getEnd: () => 1 }
			},
			duration: 150,
			onComplete: () => {
				this.event.emit(this.eventName.onClick, index, id);
			}
		}));
	}

}