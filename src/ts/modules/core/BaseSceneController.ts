export abstract class BaseSceneController extends Phaser.Scene {

	constructor (config: string | Phaser.Types.Scenes.SettingsConfig) {
		super(config);
	}

	abstract init (): void;

	abstract create (): void;

}