import { CustomTypes } from "../../types/custom";
import { Assets } from "./AssetLoading";

export const Animations: CustomTypes.Asset.AnimationAsset = {

	loading_text: {
		key: 'loading_text',
		type: 'ANIMATION',
		spritesheetRef: Assets.loading_text.key,
		start: 0,
		end: 3,
		frameSpeed: 4,
		loop: true
	},

};