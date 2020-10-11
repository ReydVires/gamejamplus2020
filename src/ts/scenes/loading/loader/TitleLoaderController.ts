import { Assets } from "../../../library/AssetTitle";
import { LoaderHelper } from "../../../helper/LoaderHelper";
import { BaseLoaderController } from "../../../modules/core/BaseLoaderController";
import { CustomTypes } from "../../../../types/custom";

export class TitleLoaderController implements BaseLoaderController {

	constructor (private _scene: Phaser.Scene) {}

	loadResources (): void {
		LoaderHelper.loadAssets(this._scene, Assets as CustomTypes.Asset.ObjectAsset);
	}

}