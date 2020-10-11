import { CustomTypes } from "../../../../types/custom";
import { BaseView } from "../../../modules/core/BaseView";
import { Image } from "../../../modules/gameobjects/Image";
import { ScreenUtilController } from "../../../modules/screenutility/ScreenUtilController";

const EventNames = {
	onClick: "onClick",
	onClickConfirm: "onClickConfirm",
	onCreateFinish: "onCreateFinish",
};

export class ObstacleView implements BaseView {

	event: Phaser.Events.EventEmitter;
	screenUtility: ScreenUtilController;
	eventName: typeof EventNames;

	private _displayPercentage: number;
	private _obstacles: CustomTypes.Gameplay.GameData.ObstacleData;

	constructor (private _scene: Phaser.Scene) {
		this.event = new Phaser.Events.EventEmitter();
		this.screenUtility = ScreenUtilController.getInstance();
		this.eventName = EventNames;
	}

	create (displayPercentage: number, obstacles: CustomTypes.Gameplay.GameData.ObstacleData): void {
		this._displayPercentage = displayPercentage;
		this._obstacles = obstacles;
		this.createObstacles();

		this.event.emit(this.eventName.onCreateFinish);
	}

	private createObstacles (): void {
		for (const key in this._obstacles) {
			if (!Reflect.has(this._obstacles, key)) continue;
			const obstacles = this._obstacles[key];
			for (let i = obstacles.length-1; i >= 0; i--) {
				const obstacle = obstacles[i];
				const point = obstacle.position;
				const sprite = new Image(this._scene, this.screenUtility.width * point.x, this.screenUtility.height * point.y, obstacle.texture);
				sprite.transform.setToScaleDisplaySize(this._displayPercentage);
				const equipment = new Image(this._scene, this.screenUtility.width * obstacle.equip.value.x, this.screenUtility.height * obstacle.equip.value.y, obstacle.equip.key);
				this.setInteractive(sprite.gameObject, obstacle, equipment.gameObject);

				equipment.transform.setToScaleDisplaySize(this._displayPercentage);
				equipment.gameObject.setOrigin(0.5, 0).setVisible(false);
			}
		}
	}

	private setInteractive (gameObject: Phaser.GameObjects.Image, obstacle: CustomTypes.Gameplay.GameData.ObstacleInfo, equip: Phaser.GameObjects.Image): void {
		gameObject.setInteractive({ useHandCursor: true })
		.on('pointerup', () => this._scene.tweens.add({
			targets: gameObject,
			props: {
				scale: { getStart: () => gameObject.scaleY * 0.95, getEnd: () => gameObject.scaleY },
			},
			duration: 150,
			onComplete: () => {
				this.event.emit(this.eventName.onClick, obstacle.id, equip);
			}
		}));
	}

}