import { CustomTypes } from "../../../../types/custom";
import { GameState } from "../../../info/GameInfo";
import { gameplayData } from "../GameplayData";

const EventNames = {
	onGameStateChanged: "onGameStateChanged",
};

const OnGameStateChanged = (gameState: GameState) => {};

export class GameController {

	event: Phaser.Events.EventEmitter;
	eventName: typeof EventNames;
	private _gameState: GameState;

	private _slimePoint: number;
	private _checkpoints: CustomTypes.Gameplay.GameData.CheckpointData;
	private _obstacles: CustomTypes.Gameplay.GameData.ObstacleData;

	constructor (private _scene: Phaser.Scene) {
		this.event = new Phaser.Events.EventEmitter();
		this.eventName = EventNames;

		this._gameState = GameState.PREPARING;
	}

	init (): void {
		this._slimePoint = gameplayData.slimePoint;
		this._checkpoints = gameplayData.checkpoint;
		this._obstacles = gameplayData.obstacle;
	}

	get gameState (): GameState {
		return this._gameState;
	}

	get slimePoint (): number {
		return this._slimePoint;
	}

	get checkpoints (): CustomTypes.Gameplay.GameData.CheckpointData {
		return this._checkpoints;
	}

	get obstacles (): CustomTypes.Gameplay.GameData.ObstacleData {
		return this._obstacles;
	}

	subtractSlimePoint (value: number): boolean {
		const point = this._slimePoint - value;
		if (point <= 0) return false;
		this._slimePoint -= value;
		return true;
	}

	gameStatePlaying (): void {
		this._gameState = GameState.PLAYING;
	}

	gameStateGameover (): void {
		this._gameState = GameState.GAMEOVER;
	}

	gameStatePause (): void {
		this._gameState = GameState.PAUSE;
	}

	onGameStateChanged (events: typeof OnGameStateChanged): void {
		this.event.on(this.eventName.onGameStateChanged, events);
	}

}
