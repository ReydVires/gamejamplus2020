import { CustomTypes } from "../../../../types/custom";
import { FontListKey } from "../../../info/GameInfo";
import { Assets } from "../../../library/AssetGameplay";
import { BaseView } from "../../../modules/core/BaseView";
import { Image } from "../../../modules/gameobjects/Image";
import { Rectangle } from "../../../modules/gameobjects/Rectangle";
import { GraphicsButton } from "../../../modules/gameobjects/ui/GraphicsButton";
import { Text } from "../../../modules/gameobjects/ui/Text";
import { ScreenUtilController } from "../../../modules/screenutility/ScreenUtilController";

const EventNames = {
	onClickTool: "onClickTool",
	onSFXClickTool: "onSFXClickTool",
	onSFXCancelTool: "onSFXCancelTool",
};

export class ToolView implements BaseView {

	event: Phaser.Events.EventEmitter;
	screenUtility: ScreenUtilController;
	eventName: typeof EventNames;

	screenOverlay: Rectangle | undefined;
	displayPercentage: number;
	maxTools: number = 5;

	toolsContainer: Phaser.GameObjects.Container;
	toolsHUD: Image;
	toolList: Image[];

	confirmContainer: Phaser.GameObjects.Container;
	toolInfoText: Text;

	selectedTool: CustomTypes.Gameplay.GameData.ToolInfo;

	constructor (private _scene: Phaser.Scene) {
		this.event = new Phaser.Events.EventEmitter();
		this.screenUtility = ScreenUtilController.getInstance();
		this.eventName = EventNames;
	}

	create (displayPercentage: number, screenOverlay?: Rectangle): void {
		this.screenOverlay = screenOverlay;
		this.displayPercentage = displayPercentage;
		this.toolList = [];
		this.createHUD();
		this.createTools();
		this.createConfrimPanel();
	}

	private createHUD (): void {
		this.toolsContainer = this._scene.add.container(0, 0).setDepth(20);
		this.toolsHUD = new Image(this._scene, this.screenUtility.centerX, this.screenUtility.centerY, Assets.tools_hud.key);
		this.toolsHUD.transform.setToScaleDisplaySize(this.displayPercentage);

		const exitPosBtn = this.toolsHUD.transform.getDisplayPositionFromCoordinate(0.98, 0.1);
		const exitBtn = new Image(this._scene, exitPosBtn.x, exitPosBtn.y, Assets.exit_btn.key);
		exitBtn.transform.setToScaleDisplaySize(this.toolsHUD.transform.displayToOriginalHeightRatio);
		exitBtn.gameObject.setInteractive({ useHandCursor: true }).on('pointerup', () => this._scene.tweens.add({
			targets: exitBtn.gameObject,
			props: {
				scale: { getStart: () => (exitBtn.gameObject.scaleY * 0.75), getEnd: () => exitBtn.gameObject.scaleY }
			},
			duration: 100,
			onComplete: () => this.hideToolsGUI()
		}));

		const gameobjects = [this.toolsHUD.gameObject, exitBtn.gameObject];
		this.toolsContainer.add(gameobjects).setVisible(false);
	}

	private createTools (): void {
		for (let i = 0; i < this.maxTools; i++) {
			const width = this.screenUtility.width / (this.maxTools + 1);
			const tool = new Image(this._scene, width * (i + 1), this.toolsHUD.gameObject.y * 1.02, "");
			tool.gameObject.setVisible(false);
			this.toolsContainer.add(tool.gameObject);
			this.toolList.push(tool);
		}
	}

	private createConfrimPanel (): void {
		this.confirmContainer = this._scene.add.container(0, 0).setDepth(20);
		const panel = new Image(this._scene, this.screenUtility.centerX, this.screenUtility.centerY, Assets.panel_confirm.key);
		panel.transform.setToScaleDisplaySize(this.displayPercentage);

		const toolInfoPosText = panel.transform.getDisplayPositionFromCoordinate(0.5, 0.3);
		this.toolInfoText = new Text(this._scene, toolInfoPosText.x, toolInfoPosText.y, "Lorem dolor sit amet ipsum dolor sit amet amet ipsum dolor sit amet", {
			fontSize: `${32 * panel.transform.displayToOriginalHeightRatio}px`,
			color: 'black',
			fontFamily: FontListKey.ROBOTO,
			align: 'center',
			wordWrap: { width: panel.transform.disaplayWidth * 0.9 }
		});
		this.toolInfoText.gameObject.setOrigin(0.5, 0);

		const buttonRatio = 1.65;
		const confirmPosBtn = panel.transform.getDisplayPositionFromCoordinate(0.3, 0.8);
		const confirmBtn = new GraphicsButton(this._scene, confirmPosBtn.x, confirmPosBtn.y, "Confirm", {
			color: 'black',
			fontSize: `${42 * panel.transform.displayToOriginalHeightRatio}px`
		});
		confirmBtn.transform.setToScaleDisplaySize(this.displayPercentage * buttonRatio);
		confirmBtn.click.on(() => {
			this.hideConfirmPanel();
			this.hideToolsGUI();
			this.event.emit(this.eventName.onClickTool, this.selectedTool.name, this.selectedTool.cost);
		});

		const cancelPosBtn = panel.transform.getDisplayPositionFromCoordinate(0.7, 0.8);
		const cancelBtn = new GraphicsButton(this._scene, cancelPosBtn.x, cancelPosBtn.y, "Cancel", {
			color: 'black',
			fontSize: `${42 * panel.transform.displayToOriginalHeightRatio}px`
		});
		cancelBtn.transform.setToScaleDisplaySize(this.displayPercentage * buttonRatio);
		cancelBtn.click.on(() => this.hideConfirmPanel());

		const gameobjects = [
			panel.gameObject,
			this.toolInfoText.gameObject,
			confirmBtn.container,
			cancelBtn.container,
		];
		this.confirmContainer.add(gameobjects).setVisible(false);
	}

	private setInteractive (gameObject: Phaser.GameObjects.Image): void {
		gameObject.setInteractive({ useHandCursor: true })
		.on('pointerup', () => this._scene.tweens.add({
			targets: gameObject,
			props: {
				alpha: { getStart: () => 0.65, getEnd: () => 1 },
			},
			duration: 150,
			onComplete: () => {
				this.showConfirmPanel();
			}
		}));
	}

	private showConfirmPanel (): void {
		this.event.emit(this.eventName.onSFXClickTool);
		this.screenOverlay?.gameObject.setVisible(true);
		if (this.screenOverlay) this.confirmContainer.addAt(this.screenOverlay.gameObject);
		const { name, cost } = this.selectedTool;
		const content = `Are you sure will buy this ${name} with cost ${cost}?`;
		this.toolInfoText.gameObject.setText(content);
		this.confirmContainer.setVisible(true);
	}

	private hideConfirmPanel (): void {
		this.event.emit(this.eventName.onSFXCancelTool);
		this.screenOverlay?.gameObject.setVisible(true);
		if (this.screenOverlay) this.toolsContainer.addAt(this.screenOverlay.gameObject); // FIXME Simplify it!
		this.confirmContainer.setVisible(false);
	}

	showToolsGUI (tools?: CustomTypes.Gameplay.GameData.ToolInfo[]): void {
		if (Array.isArray(tools)) {
			const maxTools = tools.length >= this.maxTools ? this.maxTools : tools.length;
			for (let i = 0; i < maxTools; i++) {
				this.selectedTool = tools[i];
				const toolHolder = this.toolList[i];
				toolHolder.transform.setToScaleDisplaySize(this.toolsHUD.transform.displayToOriginalHeightRatio * 0.65);
				toolHolder.gameObject.setTexture(this.selectedTool.texture);
				toolHolder.gameObject.setVisible(true);
				toolHolder.gameObject.setOrigin(0.55, 0.55);
				this.setInteractive(toolHolder.gameObject);
			}
		}
		this.screenOverlay?.gameObject.setVisible(true);
		if (this.screenOverlay) this.toolsContainer.addAt(this.screenOverlay.gameObject);
		this.toolsContainer.setVisible(true);
	}

	hideToolsGUI (): void {
		this.toolsContainer.setVisible(false);
	}

}