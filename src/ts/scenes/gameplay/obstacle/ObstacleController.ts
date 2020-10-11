import { CustomTypes } from "../../../../types/custom";
import { ObstacleView } from "./ObstacleView";

const OnClick = (id: string, equip: Phaser.GameObjects.Image) => {};

export class ObstacleController {

	private _view: ObstacleView;

	constructor (scene: Phaser.Scene) {
		this._view = new ObstacleView(scene);
	}

	init (displayPercentage: number, obstacles: CustomTypes.Gameplay.GameData.ObstacleData): void {
		this._view.create(displayPercentage, obstacles);
	}

	onClick (events: typeof OnClick): void {
		this._view.event.on(this._view.eventName.onClick, events);
	}

}