export declare namespace CustomTypes {

    type CONFIG = {
        VERSION: string,
        MODE: 'DEVELOPMENT' | 'STAGING' | 'PRODUCTION',
        ENABLE_LOG: boolean,
        ON_DEBUG: boolean,
        ENABLE_PHYSICS_DEBUG: boolean,
        BASE_ASSET_URL: string
    }

    namespace General {

        type KeyValuePair<K, V> = {
            key: K,
            value: V
        }

    }

    namespace Asset {

        type Types = 'STATIC' | 'SPRITESHEET' | 'ANIMATION' | 'AUDIO' | 'FONT'

        type BaseAssetInfoType = {
            key: string,
            type: Types
        }

        type AssetInfoType = BaseAssetInfoType & {
            url: string | string[],
            width?: number,
            height?: number,
            config?: object
        }

        type AnimationInfoType = BaseAssetInfoType & {
            spritesheetRef: string,
            start: number,
            end: number,
            frameSpeed: number,
            loop?: true
        }

        interface ObjectAsset {
            [key: string]: AssetInfoType
        }

        interface AnimationAsset {
            [key: string]: AnimationInfoType
        }

    }

    namespace Gameplay {

        namespace GameData {

            type CheckpointInfo = CustomTypes.General.KeyValuePair<string, Phaser.Geom.Point>;

            type CheckpointData = {
                [x: string]: CheckpointInfo[]
            }

            type ObstacleInfo = {
                id: string,
                texture: string,
                position: Phaser.Geom.Point,
                tools: ToolInfo[]
            }

            type ObstacleData = {
                [x: string]: ObstacleInfo[]
            }

            type ToolInfo = {
                name: string,
                cost: number,
                texture: string
            }

        }

    }

}