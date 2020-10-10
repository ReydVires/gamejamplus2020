import { CustomTypes } from "../../../../types/custom";
import { CheckPointView } from "./CheckPointView";

const OnClick = (index: number, id: string) => {};

export class CheckPointController {

	private _view: CheckPointView;

	constructor (scene: Phaser.Scene) {
		this._view = new CheckPointView(scene);
	}

	init (displayPercentage: number, checkpoints: CustomTypes.Gameplay.GameData.CheckpointData): void {
		this._view.create(displayPercentage, checkpoints);
	}

	onClick (events: typeof OnClick): void {
		this._view.event.on(this._view.eventName.onClick, events);
	}

}