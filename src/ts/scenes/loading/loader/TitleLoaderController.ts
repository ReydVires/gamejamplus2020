import { Assets } from "../../../library/AssetTitle";
import { LoaderHelper } from "../../../helper/LoaderHelper";
import { BaseLoaderController } from "../../../modules/core/BaseLoaderController";

export class TitleLoaderController implements BaseLoaderController {

	constructor (private _scene: Phaser.Scene) {}

	loadResources (): void {
		LoaderHelper.loadAssets(this._scene, Assets);
	}

}