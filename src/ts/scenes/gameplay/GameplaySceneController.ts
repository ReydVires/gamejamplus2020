import { AudioController } from "../../modules/audio/AudioController";
import { SceneListKey } from "../../info/GameInfo";
import { Assets as Audio } from "../../library/AssetGameplay";
import { BaseSceneController } from "../../modules/core/BaseSceneController";
import { GameplaySceneView } from "./GameplaySceneView";

export class GameplaySceneController extends BaseSceneController {

	view: GameplaySceneView;
	audioController: AudioController;

	constructor () {
		super(SceneListKey.GAMEPLAY);
	}

	init (): void {
		this.view = new GameplaySceneView(this);
		this.audioController = AudioController.getInstance();

		this.onClickSFX(() => this.audioController.playSFX(Audio.sfx_click.key));
		this.onCreateFinish(() => {});
	}

	create (): void {
		this.view.create();
	}

	update (time: number, dt: number): void {
		this.view.update(time, dt);
	}

	onClickSFX (event: Function): void {
		this.view.event.on(this.view.eventName.onClickSFX, event);
	}

	onCreateFinish (event: Function): void {
		this.view.event.once(this.view.eventName.onCreateFinish, event);
	}

}