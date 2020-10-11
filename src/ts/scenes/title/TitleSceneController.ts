import { TitleSceneView } from "./TitleSceneView";
import { BaseSceneController } from "../../modules/core/BaseSceneController";
import { SceneListKey } from "../../info/GameInfo";
import { AudioController } from "../../modules/audio/AudioController";
import { Assets as Audio } from "../../library/AssetTitle";

export class TitleSceneController extends BaseSceneController {

	view: TitleSceneView;
	audioController: AudioController;

	constructor () {
		super(SceneListKey.TITLE);
	}

	init (): void {
		this.view = new TitleSceneView(this);
		this.audioController = AudioController.getInstance();

		this.audioController.playBGM(Audio.bgm_main.key, false);

		this.onTapAction(() => {
			this.audioController.playSFX(Audio.sfx_click_confirm.key);
			this.cameras.main.fadeOut(300).once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
				this.scene.start(SceneListKey.GAMEPLAY);
			});
		});
		this.onCreateFinish(() => {});
	}

	create (): void {
		this.view.create();
	}

	update (time: number, dt: number): void {
		this.view.update(time, dt);
	}

	onTapAction (callback: Function): void {
		this.view.event.on(this.view.eventName.onTapAction, callback);
	}

	onCreateFinish (callback: Function): void {
		this.view.event.once(this.view.eventName.onCreateFinish, callback);
	}

}