import { CustomTypes } from "../../types/custom";
import { CONFIG } from "../info/GameInfo";

export class LoaderHelper {

	static loadImage (scene: Phaser.Scene, ...imagesInfo: CustomTypes.Asset.AssetInfoType[]): void {
		for (const imageInfo of imagesInfo) {
			scene.load.image(imageInfo.key, CONFIG.BASE_ASSET_URL + imageInfo.url);
		}
	}

	static loadSpritesheet (scene: Phaser.Scene, ...spritesheetsInfo: CustomTypes.Asset.AssetInfoType[]): void {
		for (const spritesheetInfo of spritesheetsInfo) {
			scene.load.spritesheet(spritesheetInfo.key, CONFIG.BASE_ASSET_URL + spritesheetInfo.url, {
				frameWidth: spritesheetInfo.width as number,
				frameHeight: spritesheetInfo.height
			});
		}
	}

	static loadAudio (scene: Phaser.Scene, ...audiosInfo: CustomTypes.Asset.AssetInfoType[]): void {
		for (const audioInfo of audiosInfo) {
			if (audioInfo.type !== "AUDIO") continue;
			if (Array.isArray(audioInfo.url)) {
				const audioPath = audioInfo.url.map((path) => CONFIG.BASE_ASSET_URL + path);
				scene.load.audio(audioInfo.key, audioPath);
				continue;
			}
			scene.load.audio(audioInfo.key, CONFIG.BASE_ASSET_URL + audioInfo.url);
		}
	}

	static loadFonts (fonts: CustomTypes.Asset.AssetInfoType[]): Promise<any[]> {
		return Promise.all(fonts.map((v) => LoaderHelper.loadFont(v.key, v.url as string)));
	}

	static loadFont (key: string, url: string): Promise<any> {
		return new Promise((resolve, reject) => {
			const path = CONFIG.BASE_ASSET_URL + url;
			const element = document.createElement('style');
			document.head.appendChild(element);

			const styles = `@font-face {font-family: "${key}"; src: url("${path}")}`;
			element.innerHTML = styles;

			document.fonts.load('10pt "' + key + '"')
			.then(() => resolve())
			.catch(() => reject(Error('load font error :' + path)));
		});
	}

	static loadAssets (scene: Phaser.Scene, assets: CustomTypes.Asset.ObjectAsset): void {
		if (CONFIG.ENABLE_LOG) console.log("loadAssets::", assets);
		let assetInfo: CustomTypes.Asset.AssetInfoType;
		for (const key in assets) {
			assetInfo = assets[key];
			if (assetInfo.type === "STATIC") {
				scene.load.image(assetInfo.key, CONFIG.BASE_ASSET_URL + assetInfo.url);
			}
			else if (assetInfo.type === "SPRITESHEET") {
				scene.load.spritesheet(assetInfo.key, CONFIG.BASE_ASSET_URL + assetInfo.url, {
					frameWidth: assetInfo.width as number,
					frameHeight: assetInfo.height
				});
			}
			else if (assetInfo.type === "AUDIO") {
				if (Array.isArray(assetInfo.url)) {
					const audioPath = assetInfo.url.map((path: string) => CONFIG.BASE_ASSET_URL + path);
					scene.load.audio(assetInfo.key, audioPath);
					continue;
				}
				scene.load.audio(assetInfo.key, CONFIG.BASE_ASSET_URL + assetInfo.url);
			}
			else {
				console.warn("Asset type is undefined:", assetInfo);
			}
		}
	}

}