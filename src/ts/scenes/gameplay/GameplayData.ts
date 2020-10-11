import { CustomTypes } from "../../../types/custom";
import { ObstaclesListKey, ToolsListKey } from "../../info/GameInfo";
import { Assets } from "../../library/AssetGameplay";

export const gameplayData = {

	checkpoint: {
		LEVEL_1: [
			<CustomTypes.Gameplay.GameData.CheckpointInfo> {
				key: "FIRST",
				value: new Phaser.Geom.Point(0.175, 0.625)
			},
			<CustomTypes.Gameplay.GameData.CheckpointInfo> {
				key: "SECOND",
				value: new Phaser.Geom.Point(0.2, 0.45)
			},
			<CustomTypes.Gameplay.GameData.CheckpointInfo> {
				key: "THIRD",
				value: new Phaser.Geom.Point(0.65, 0.23)
			},
			<CustomTypes.Gameplay.GameData.CheckpointInfo> {
				key: "FOURTH",
				value: new Phaser.Geom.Point(0.225, 0.1)
			},
		]
	},
	obstacle: {
		LEVEL_1: [
			<CustomTypes.Gameplay.GameData.ObstacleInfo> {
				id: ObstaclesListKey.BOOK_A,
				texture: Assets.obstacle_a.key,
				position: new Phaser.Geom.Point(0.35, 0.65),
				tools: [
					{
						name: ToolsListKey.LADDER,
						cost: 90,
						texture: Assets.tools_b.key,
					},
					{
						cost: 50,
						name: ToolsListKey.PLANK,
						texture: Assets.tools_b.key,
					}
				]
			},
			<CustomTypes.Gameplay.GameData.ObstacleInfo> {
				id: ObstaclesListKey.WATCH,
				texture: Assets.obstacle_b.key,
				position: new Phaser.Geom.Point(0.65, 0.35),
				tools: [
					{
						name: ToolsListKey.LADDER,
						cost: 100,
						texture: Assets.tools_a.key,
					},
					{
						cost: 70,
						name: ToolsListKey.PLANK,
						texture: Assets.tools_b.key,
					}
				]
			},
			<CustomTypes.Gameplay.GameData.ObstacleInfo> {
				id: ObstaclesListKey.WALL,
				texture: Assets.obstacle_c.key,
				position: new Phaser.Geom.Point(0.5, 0.2),
				tools: [
					{
						name: ToolsListKey.LADDER,
						cost: 95,
						texture: Assets.tools_b.key,
					},
					{
						cost: 80,
						name: ToolsListKey.PLANK,
						texture: Assets.tools_a.key,
					}
				]
			},
		]
	},

};