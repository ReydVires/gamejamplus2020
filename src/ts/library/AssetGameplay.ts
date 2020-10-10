import { CustomTypes } from "../../types/custom";

export const Assets: CustomTypes.Asset.ObjectAsset = {

	bg_game: {
		key: "bg_game",
		url: "assets/img/bg/img_bg_game.png",
		type: "STATIC"
	},
	obstacle_a: {
		key: "obstacle_a",
		url: "assets/img/obstacles/img_obstacle_a.png",
		type: "STATIC"
	},
	obstacle_b: {
		key: "obstacle_b",
		url: "assets/img/obstacles/img_obstacle_b.png",
		type: "STATIC"
	},
	obstacle_c: {
		key: "obstacle_c",
		url: "assets/img/obstacles/img_obstacle_c.png",
		type: "STATIC"
	},
	baloon_decline: {
		key: "baloon_decline",
		url: "assets/img/slime/img_baloon_decline.png",
		type: "STATIC" // SPRITESHEET?
	},
	slime_char: {
		key: "slime_char",
		url: "assets/img/slime/spr_slime_char.png",
		type: "STATIC" // SPRITESHEET?
	},
	checkpoint: {
		key: "checkpoint",
		url: "assets/img/gui/spr_checkpoint.png",
		type: "STATIC" // SPRITESHEET?
	},
	sfx_click: {
		key: "sfx_click",
		url: ["assets/audio/sfx/sfx_click.mp3"],
		type: "AUDIO"
	},

};