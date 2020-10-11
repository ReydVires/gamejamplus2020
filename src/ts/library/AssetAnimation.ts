import { CustomTypes } from "../../types/custom";
import { Assets as  AssetLoading } from "./AssetLoading";
import { Assets as AssetGameplay } from "./AssetGameplay";

export const Animations: CustomTypes.Asset.AnimationAsset = {

	loading_text: {
		key: 'loading_text',
		type: 'ANIMATION',
		spritesheetRef: AssetLoading.loading_text.key,
		start: 0,
		end: 3,
		frameSpeed: 4,
		loop: true
	},
	slime_idle: {
		key: 'slime_idle',
		type: 'ANIMATION',
		spritesheetRef: AssetGameplay.slime_char.key,
		start: 0,
		end: 4,
		frameSpeed: 8,
		loop: true
	},

};