import { AudioController } from "../../modules/audio/AudioController";
import { SceneListKey } from "../../info/GameInfo";
import { Assets as Audio } from "../../library/AssetGameplay";
import { BaseSceneController } from "../../modules/core/BaseSceneController";
import { GameplaySceneView } from "./GameplaySceneView";
import { SlimeController } from "./slime/SlimeController";
import { BackgroundController } from "./background/BackgroundController";
import { CheckPointController } from "./checkpoint/CheckPointController";
import { GameController } from "./game/GameController";
import { ObstacleController } from "./obstacle/ObstacleController";

export class GameplaySceneController extends BaseSceneController {

	view: GameplaySceneView;
	audioController: AudioController;
	gameController: GameController;
	backgroundController: BackgroundController;
	obstacleController: ObstacleController;
	checkPointController: CheckPointController;
	slimeController: SlimeController;

	constructor () {
		super(SceneListKey.GAMEPLAY);
	}

	init (): void {
		this.view = new GameplaySceneView(this);
		this.audioController = AudioController.getInstance();
		this.gameController = new GameController(this);
		this.backgroundController = new BackgroundController(this);
		this.obstacleController = new ObstacleController(this);
		this.checkPointController = new CheckPointController(this);
		this.slimeController = new SlimeController(this);

		this.checkPointController.onClick((index, id) => {
			console.log("Index::", index, id);
		});

		this.gameController.init();
		this.backgroundController.init();
		this.obstacleController.init(
			this.backgroundController.getDisplayPercentage(),
			this.gameController.obstacles
		);
		this.checkPointController.init(
			this.backgroundController.getDisplayPercentage(),
			this.gameController.checkpoints
		);
		this.slimeController.init(this.backgroundController.getDisplayPercentage());

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