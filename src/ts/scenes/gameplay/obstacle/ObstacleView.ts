import { CustomTypes } from "../../../../types/custom";
import { Assets } from "../../../library/AssetGameplay";
import { BaseView } from "../../../modules/core/BaseView";
import { Image } from "../../../modules/gameobjects/Image";
import { ScreenUtilController } from "../../../modules/screenutility/ScreenUtilController";

const EventNames = {
	onCreateFinish: "onCreateFinish",
};

export class ObstacleView implements BaseView {

	event: Phaser.Events.EventEmitter;
	screenUtility: ScreenUtilController;
	eventName: typeof EventNames;

	private _sprite: Image;

	constructor (private _scene: Phaser.Scene) {
		this.event = new Phaser.Events.EventEmitter();
		this.screenUtility = ScreenUtilController.getInstance();
		this.eventName = EventNames;
	}

	create (displayPercentage: number, obstacles: CustomTypes.Gameplay.GameData.Coordinate): void {
		this._sprite = new Image(this._scene, this.screenUtility.centerX, this.screenUtility.centerY, Assets.obstacle_a.key);
		this._sprite.transform.setToScaleDisplaySize(displayPercentage);
		console.log("obstacles::", obstacles);
	}

}