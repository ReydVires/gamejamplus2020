import { ScreenUtilController } from "../../modules/screenutility/ScreenUtilController";
import { LoaderHelper } from "../../helper/LoaderHelper";
import { AudioController } from "../../modules/audio/AudioController";
import { BaseSceneController } from "../../modules/core/BaseSceneController";
import { FontListKey, SceneListKey } from "../../info/GameInfo";

export class BootSceneController extends BaseSceneController {

	constructor () {
		super(SceneListKey.BOOT);
	}

	init (): void {}

	create (): void {
		Promise.all([
			ScreenUtilController.getInstance().init(this),
			AudioController.getInstance().init(this),
			LoaderHelper.loadFonts([
				{ key: FontListKey.ROBOTO, type: 'FONT', url: 'assets/fonts/Roboto-Regular.ttf' },
			]),
		])
		.then(() => {
			this.scene.launch(SceneListKey.LOADING);
		})
		.catch((error) => Error("Bootscene::\n" + error));
	}

}