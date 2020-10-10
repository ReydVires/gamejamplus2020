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

            type Coordinate = {
                [x: string]: CustomTypes.General.KeyValuePair<string, Phaser.Geom.Point>[]
            }

        }

    }

}