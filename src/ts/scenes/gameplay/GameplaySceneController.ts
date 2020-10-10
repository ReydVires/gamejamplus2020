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

const OnClickTool = (name: string, cost: number) => {};

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

		this.obstacleController.onClick((id) => {
			console.log("obstacleController::", id);
			const obstaclesData = this.gameController.obstacles;
			for (const key in obstaclesData) {
				if (!Reflect.has(obstaclesData, key)) continue;
				const obstacles = obstaclesData[key];
				const obstacle = obstacles.find((val) => val.id === id);
				this.view.tool.showToolsGUI(obstacle?.tools);
				break;
			}
		});
		this.checkPointController.onClick((index, id) => {
			console.log("checkPointController::", index, id);
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

		this.onSFXClick(() => this.audioController.playSFX(Audio.sfx_click.key));
		this.onCreateFinish(() => {
			this.onClickTool((name, cost) => {
				console.log("onClickTool::", name, cost);
			});
		});
	}

	create (): void {
		this.view.create(this.backgroundController.getDisplayPercentage());
	}

	update (time: number, dt: number): void {
		this.view.update(time, dt);
	}

	onClickTool (events: typeof OnClickTool): void {
		this.view.tool.event.on(this.view.tool.eventName.onClickTool, events);
	}

	onSFXClick (events: Function): void {
		this.view.event.on(this.view.eventName.onSFXClick, events);
	}

	onCreateFinish (events: Function): void {
		this.view.event.once(this.view.eventName.onCreateFinish, events);
	}

}