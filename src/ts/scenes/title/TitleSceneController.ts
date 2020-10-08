import { TitleSceneView } from "./TitleSceneView";
import { BaseSceneController } from "../../modules/core/BaseSceneController";
import { SceneListKey } from "../../info/GameInfo";

export class TitleSceneController extends BaseSceneController {

	view: TitleSceneView;

	constructor () {
		super(SceneListKey.TITLE);
	}

	init (): void {
		this.view = new TitleSceneView(this);

		this.onTapAction(() => this.scene.start(SceneListKey.GAMEPLAY));
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