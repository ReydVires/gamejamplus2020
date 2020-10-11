import { Assets } from "../../../library/AssetLoading";
import { LoaderHelper } from "../../../helper/LoaderHelper";
import { BaseLoaderController } from "../../../modules/core/BaseLoaderController";
import { CustomTypes } from "../../../../types/custom";

export class LoadingLoaderController implements BaseLoaderController {

	constructor (private _scene: Phaser.Scene) {}

	loadResources (): void {
		LoaderHelper.loadAssets(this._scene, Assets as CustomTypes.Asset.ObjectAsset);
	}

}