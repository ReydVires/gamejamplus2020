/// <reference path="../node_modules/phaser/types/phaser.d.ts" />

import { CONFIG } from './ts/info/GameInfo';
import { BootSceneController } from './ts/scenes/boot/BootSceneController';
import { LoadingSceneController } from './ts/scenes/loading/LoadingSceneController';
import { TitleSceneController } from './ts/scenes/title/TitleSceneController';
import { GameplaySceneController } from './ts/scenes/gameplay/GameplaySceneController';

console.assert(typeof CONFIG !== "undefined", "CONFIG is undefined!");
if (CONFIG.ENABLE_LOG) console.log("[CONFIG]", CONFIG);

let renderType = Phaser.CANVAS;
if (/Firefox/i.test(navigator.userAgent)) {
	renderType = Phaser.WEBGL;
}

const calculateScreen = () => {
	let actualWidth = window.innerWidth < 480 ? window.innerWidth * window.devicePixelRatio : window.innerWidth;
	let actualHeight = window.innerWidth < 480 ? window.innerHeight * window.devicePixelRatio : window.innerHeight;
	let actualZoom = window.innerWidth < 480 ? 1 / window.devicePixelRatio : 1;
	let isLandscape = window.innerWidth > window.innerHeight;

	if (isLandscape) {
		actualWidth = actualHeight * (3 / 4);
	}

	// Modulo 2 to prevent bleeding tile
	actualWidth = Math.round(actualWidth);
	actualHeight = Math.round(actualHeight);

	if (actualWidth % 2 != 0) {
		actualWidth++;
	}
	if (actualHeight % 2 != 0) {
		actualHeight++;
	}

	return {
		actualWidth,
		actualHeight,
		actualZoom,
		isLandscape
	};
};

const screenProfile = calculateScreen();

const scenes: Function[] = [
	BootSceneController,
	LoadingSceneController,
	TitleSceneController,
	GameplaySceneController,
];

const gameConfig: Phaser.Types.Core.GameConfig = {
	version: CONFIG.VERSION,
	banner: { hidePhaser: !CONFIG.ENABLE_LOG },
	type: renderType,
	parent: 'game',
	backgroundColor: '#3498db',
	scale: {
		mode: Phaser.Scale.NONE,
		width: screenProfile.actualWidth,
		height: screenProfile.actualHeight,
		zoom: screenProfile.actualZoom
	},
	seed: [((+new Date()).toString(16) + (Math.random() * 100000000 | 0).toString(16))],
	scene: scenes,
	input: { activePointers: 3 },
	dom: {
		createContainer: true
	},
	render: {
		antialias: false,
		pixelArt: false,
		roundPixels: false,
	},
};

const game = new Phaser.Game(gameConfig);

window.addEventListener('resize', () => {
	const screenProfile = calculateScreen();
	game.scale.resize(screenProfile.actualWidth, screenProfile.actualHeight);
	game.scale.setZoom(screenProfile.actualZoom);
});