import { CustomTypes } from "../../types/custom";

export const Assets: CustomTypes.Asset.ObjectAsset = {

	phaser_logo: {
		key: "phaser_logo",
		url: "assets/img/test/img_phaser_logo.png",
		type: "STATIC"
	},
	sfx_click: {
		key: "sfx_click",
		url: ["assets/audio/sfx/sfx_click.mp3"],
		type: "AUDIO"
	}

};