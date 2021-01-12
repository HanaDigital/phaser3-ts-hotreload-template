export default class BootScene extends Phaser.Scene {
	constructor() {
		super("Boot"); // Name of the scene
	}

	preload(): void {
		this.loadImages();
		this.loadSpriteSheets();
		this.loadAudio();
	}

	create(): void {
		this.scene.start("Game");
	}

	// Utility functions:
	// Load Images
	loadImages(): void {
		this.load.image("button1", "assets/images/ui/blue_button01.png");
		this.load.image("button2", "assets/images/ui/blue_button02.png");
	}

	// Load SpriteSheets
	loadSpriteSheets(): void {
		this.load.spritesheet("items", "assets/images/items.png", {
			frameWidth: 32,
			frameHeight: 32,
		});
		this.load.spritesheet("characters", "assets/images/characters.png", {
			frameWidth: 32,
			frameHeight: 32,
		});
	}

	// Load Audio
	loadAudio(): void {
		this.load.audio("goldSound", ["assets/audio/Pickup.wav"]);
	}
}
