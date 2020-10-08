import { GameplayLoaderController } from "./loader/GameplayLoaderController";
import { LoadingSceneView } from "./LoadingSceneView";
import { BaseSceneController } from "../../modules/core/BaseSceneController";
import { SceneListKey } from "../../info/GameInfo";
import { LoadingLoaderController } from "./loader/LoadingLoaderController";

export class LoadingSceneController extends BaseSceneController {

	view: LoadingSceneView;
	loadingLoaderController: LoadingLoaderController;
	gameplayLoaderController: GameplayLoaderController;

	constructor () {
		super(SceneListKey.LOADING);
	}

	init (): void {
		this.view = new LoadingSceneView(this);
		this.loadingLoaderController = new LoadingLoaderController(this);
		this.gameplayLoaderController = new GameplayLoaderController(this);
	}

	create(): void {}

	preload (): void {
		this.loadBootResources();
	}

	loadBootResources (): void {
		this.load.once('complete', this.onCompleteLoadBoot.bind(this));
		this.loadingLoaderController.loadResources();
		this.load.start(); // Execute: onCompleteLoadBoot
	}

	onCompleteLoadBoot (): void {
		this.view.create();
		this.load.on('progress', (value: number) => {
			this.view.updateLoading(value);
		});

		this.load.once('complete', this.onCompleteLoad.bind(this));
		this.loadResources();
		this.load.start(); // Execute: onCompleteLoad
	}

	loadResources (): void {
		// LOAD ALL GAME FILE HERE!
		this.gameplayLoaderController.loadResources();
	}

	onCompleteLoad (): void {
		this.load.removeAllListeners();
		this.scene.start(SceneListKey.TITLE);
	}

}