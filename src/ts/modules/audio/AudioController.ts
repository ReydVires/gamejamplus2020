export class AudioController {

	static instance: AudioController;

	private _scene: Phaser.Scene;
	private _bgm: Phaser.Sound.BaseSound;
	private _bgmKey: string;
	private _enableAudio: boolean;
	private _sfxCache: Map<string, Phaser.Sound.BaseSound>;
	private _isInitialize: boolean;

	private constructor () {}

	static getInstance (): AudioController {
		if (!AudioController.instance) {
			AudioController.instance = new AudioController();
		}
		return AudioController.instance;
	}

	init (scene: Phaser.Scene): Promise<void> {
		return new Promise((resolve, reject) => {
			if (this._isInitialize) reject();
			this._scene = scene;
			this._sfxCache = new Map<string, Phaser.Sound.BaseSound>();
			this._enableAudio = true;
			this._isInitialize = true;

			this._scene.sound.pauseOnBlur = true;
			document.addEventListener("blur", this.pauseBGM.bind(this));
			document.addEventListener("focus", () => { if (this.isEnable()) this.enable(); });
			document.addEventListener("visibilitychange", () => {
				if (document.visibilityState === "visible") {
					if (this.isEnable()) this.enable();
				}
				else if (document.visibilityState === "hidden") {
					this.pauseBGM();
				}
			});
			resolve();
		});
	}

	playBGM (key: string, config?: Phaser.Types.Sound.SoundConfig): void {
		this.stopBGM();
		if (!this._enableAudio) return;

		const bgmConfig = config ?? { loop: true };
		if (this._bgmKey === key) {
			this._bgm.play(bgmConfig);
		}
		else {
			this._bgmKey = key;
			this._bgm = this._scene.sound.add(key, bgmConfig);
			this._bgm.play();
		}
	}

	setBGMVolume (volume: number): void {
		if (this._bgm instanceof Phaser.Sound.WebAudioSound) this._bgm.setVolume(volume);
	}

	stopBGM (): void {
		if (this._bgm?.isPlaying) this._bgm.stop();
	}

	pauseBGM (): void {
		if (this._bgm?.isPlaying) this._bgm.pause();
	}

	playSFX (key: string, config?: Phaser.Types.Sound.SoundConfig, force: boolean = true): void {
		if (!this._enableAudio) return;
		if (!this._sfxCache.has(key)) {
			const sfx = this._scene.sound.add(key, config);
			sfx.play();
			this._sfxCache.set(key, sfx);
		}
		else {
			if (!force && this._sfxCache.get(key)?.isPlaying) return;
			this._sfxCache.get(key)?.play(config);
		}
	}

	enable (): void {
		if (this._bgm?.isPaused) this._bgm.resume();
		this._enableAudio = true;
	}

	disable (): void {
		this.stopBGM();
		this._enableAudio = false;
	}

	isEnable (): boolean {
		return this._enableAudio;
	}

	clearSFXCache (): void {
		for (let [key, sfx] of this._sfxCache) {
			sfx.destroy();
		}
		this._sfxCache.clear();
	}

}