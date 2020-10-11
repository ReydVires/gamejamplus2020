import { CustomTypes } from "../../../types/custom";
import { ObstaclesListKey, ToolsListKey } from "../../info/GameInfo";
import { Assets } from "../../library/AssetGameplay";

export const gameplayData = {

	slimePoint: 500,
	checkpoint: {
		LEVEL_1: [
			<CustomTypes.Gameplay.GameData.CheckpointInfo> {
				key: "FIRST",
				value: new Phaser.Geom.Point(0.525, 0.38)
			},
			<CustomTypes.Gameplay.GameData.CheckpointInfo> {
				key: "SECOND",
				value: new Phaser.Geom.Point(0.215, 0.175)
			},
			<CustomTypes.Gameplay.GameData.CheckpointInfo> {
				key: "THIRD",
				value: new Phaser.Geom.Point(0.825, 0.155)
			},
		]
	},
	obstacle: {
		LEVEL_1: [
			<CustomTypes.Gameplay.GameData.ObstacleInfo> {
				id: ObstaclesListKey.BOOK_GREY,
				texture: Assets.obstacle_book_grey.key,
				position: new Phaser.Geom.Point(0.215, 0.215),
				tools: [
					{
						name: ToolsListKey.LADDER,
						cost: 100,
						texture: Assets.tools_stair.key,
					},
					{
						cost: 70,
						name: ToolsListKey.PLANK,
						texture: Assets.tools_plane.key,
					}
				],
				equip: {
					key: Assets.equip_stair.key,
					value: new Phaser.Geom.Point(0.215, 0.21)
				}
			},
			<CustomTypes.Gameplay.GameData.ObstacleInfo> {
				id: ObstaclesListKey.BOOK_BROWN,
				texture: Assets.obstacle_book_brown.key,
				position: new Phaser.Geom.Point(0.315, 0.35),
				tools: [
					{
						name: ToolsListKey.LADDER,
						cost: 90,
						texture: Assets.tools_stair.key,
					},
					{
						cost: 50,
						name: ToolsListKey.PLANK,
						texture: Assets.tools_plane.key,
					}
				],
				equip: {
					key: Assets.equip_stair.key,
					value: new Phaser.Geom.Point(0.525, 0.425)
				}
			},
			<CustomTypes.Gameplay.GameData.ObstacleInfo> {
				id: ObstaclesListKey.JUICE_CUP,
				texture: Assets.obstacle_cup.key,
				position: new Phaser.Geom.Point(0.875, 0.275),
				tools: [
					{
						name: ToolsListKey.LADDER,
						cost: 95,
						texture: Assets.tools_stair.key,
					},
					{
						cost: 80,
						name: ToolsListKey.PLANK,
						texture: Assets.tools_plane.key,
					}
				],
				equip: {
					key: Assets.equip_stair.key,
					value: new Phaser.Geom.Point(0.91, 0.275)
				}
			},
		]
	},

};