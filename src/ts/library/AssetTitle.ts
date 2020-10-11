import { CustomTypes } from "../../types/custom";

export const Assets: CustomTypes.Asset.ObjectAsset = {

	bg_title: {
		key: "bg_title",
		url: "assets/img/bg/img_bg_title.png",
		type: "STATIC"
	},
	bgm_main: {
		key: "bgm_main",
		url: ["assets/audio/bgm/bgm_main.mp3"],
		type: "AUDIO"
	},
	sfx_click_confirm: {
		key: "sfx_click_confirm",
		url: ["assets/audio/sfx/sfx_click_confirm.mp3"],
		type: "AUDIO"
	},

};