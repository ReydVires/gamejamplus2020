import { SlimeView } from "./SlimeView";

export class SlimeController {

	private _view: SlimeView;

	constructor (scene: Phaser.Scene) {
		this._view = new SlimeView(scene);
	}

	init (displayPercentage: number): void {
		this._view.create(displayPercentage);
	}

}