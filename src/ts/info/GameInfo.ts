import { CustomTypes } from "../../types/custom";

declare const CONFIG: CustomTypes.CONFIG;
const _CONFIG = CONFIG;
export { _CONFIG as CONFIG };

export const SceneListKey = {
	BOOT: "BootScene",
	LOADING: "LoadingScene",
	TITLE: "TitleScene",
	GAMEPLAY: "GameplayScene",
};

export const FontListKey = {
	ROBOTO: "roboto",
	ARIAL: "Arial",
};

export const ToolsListKey = {
	LADDER: "Ladder",
	PLANK: "Plank",
};

export const ObstaclesListKey = {
	BOOK_A: "Book-A",
	WATCH: "Watch",
	WALL: "Wall",
};

export const enum GameState {
	PREPARING,
	PLAYING,
	PAUSE,
	GAMEOVER
}
