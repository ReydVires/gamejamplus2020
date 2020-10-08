import { Transform } from "../Transform";
import { Text } from "./Text";

type GraphicsInfo = {
	width: number,
	height: number,
	fill: number,
	alpha: number,
	radius?: number,
};

type LabelData = {
	content: string,
	style?: Phaser.Types.GameObjects.Text.TextStyle
};

type ToggleFunction = (isOn: boolean) => void;
type ButtonEvent = {
	on: Function,
	once: Function,
	toggle: (callback: ToggleFunction) => void,
	off: Function
};

const EventNames = {
	onClick: "onClick",
};

export class GraphicsButton {

	click: ButtonEvent;

	private readonly _textureKey: string;
	private _event: Phaser.Events.EventEmitter;
	private _eventName: typeof EventNames;

	private _graphicsInfo: GraphicsInfo;
	private _labelData: LabelData;
	
	private _gameObject: Phaser.GameObjects.Image;
	private _transform: Transform;
	private _labelText: Text;
	private _container: Phaser.GameObjects.Container;

	constructor (private _scene: Phaser.Scene, x: number, y: number, label = "", style?: Phaser.Types.GameObjects.Text.TextStyle, graphicsInfo?: GraphicsInfo) {
		this._event = new Phaser.Events.EventEmitter();
		this._eventName = EventNames;
		this._textureKey = "BUTTON_TEXTURE_" + this.randomStringKey();

		this._graphicsInfo = {
			width: (graphicsInfo?.width) ?? 128,
			height: (graphicsInfo?.height) ?? 58,
			fill: (graphicsInfo?.fill) ?? 0xfafafa,
			alpha: (graphicsInfo?.alpha) ?? 1,
			radius: (graphicsInfo?.radius) ?? 10
		};
		this._labelData = { content: label, style: style };
		this._container = this._scene.add.container(x, y);

		this.generateTexture()
			.create()
			.setInteractive()
			.clickActionEvent();
	}

	private randomStringKey (): string {
		return (+new Date * Math.random()).toString(36).substring(2, 7).toUpperCase();
	}

	private generateTexture (): this {
		this._scene.make.graphics({ x: 0, y: 0, add: false})
		.fillStyle(this._graphicsInfo.fill, this._graphicsInfo.alpha)
		.fillRoundedRect(0, 0, this._graphicsInfo.width, this._graphicsInfo.height, this._graphicsInfo.radius)
		.generateTexture(this._textureKey, this._graphicsInfo.width, this._graphicsInfo.height);
		return this;
	}

	private create (): this {
		this._gameObject = this._scene.add.image(0, 0, this._textureKey);
		this._transform = new Transform(this._scene, this._gameObject);

		this._labelText = new Text(this._scene, 0, 0, this._labelData.content, this._labelData.style);
		this._labelText.gameObject.setOrigin(0.5);

		this._container.add([this._gameObject, this._labelText.gameObject]);
		return this;
	}

	private setInteractive (): this {
		const alphaTween = this._scene.tweens.create({
			targets: this._container,
			props: {
				alpha: { getStart: () => this._graphicsInfo.alpha, getEnd: () => this._graphicsInfo.alpha * 0.8 }
			},
			yoyo: true,
			duration: 45,
		});
		const scaleTween = this._scene.tweens.create({
			targets: this._container,
			props: {
				scale: { getStart: () => 1, getEnd: () => 0.9 }
			},
			yoyo: true,
			duration: 45,
			onComplete: () => this._event.emit(this._eventName.onClick),
		});
		this._gameObject.setInteractive({ useHandCursor: true })
		.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
			alphaTween.play();
			scaleTween.play();
		});
		return this;
	}

	private clickActionEvent (): void {
		this.click = {
			on: (callback: Function) => {
				this._event.on(this._eventName.onClick, callback);
			},
			once: (callback: Function) => {
				this._event.once(this._eventName.onClick, () => {
					this._gameObject.disableInteractive();
					callback();
				});
			},
			toggle: (callback: (isOn: boolean) => void) => {
				const toggleKey = 'toggle';
				this._event.on(this._eventName.onClick, () => {
					const isOn: boolean = this._gameObject.getData(toggleKey) ?? false;
					callback(isOn);
					this._container.setAlpha(isOn ? 1 : 0.65);
					this._gameObject.setData(toggleKey, !isOn);
				});
			},
			off: (callback: Function) => {
				this._event.off(this._eventName.onClick, callback);
				this._gameObject.removeInteractive();
			}
		};
	}

	get container (): Phaser.GameObjects.Container { return this._container; }

	get gameObject (): Phaser.GameObjects.Image { return this._gameObject; }

	get transform (): Transform { return this._transform; }

	get labelText (): Text { return this._labelText; }

	setPosition (x: number, y: number): void {
		this._container.setPosition(x, y);
	}

}