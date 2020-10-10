import { CustomTypes } from "../../../../types/custom";
import { ObstacleView } from "./ObstacleView";

export class ObstacleController {

	private _view: ObstacleView;

	constructor (scene: Phaser.Scene) {
		this._view = new ObstacleView(scene);
	}

	init (displayPercentage: number, obstacles: CustomTypes.Gameplay.GameData.Coordinate): void {
		this._view.create(displayPercentage, obstacles);
	}

}