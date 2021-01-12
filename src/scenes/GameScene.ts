import Player from "../prefabs/Player";
import Chest from "../prefabs/Chest";

export default class GameScene extends Phaser.Scene {
	score: number;

	player;
	keys: object;
	wall: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
	chests: Phaser.Physics.Arcade.Group;
	goldPickupAudio: Phaser.Sound.BaseSound;

	constructor() {
		super("Game"); // Name of the scene
	}

	init() {
		this.score = 0;
		this.scene.launch("UI");
	}

	create() {
		this.createAudio();
		this.createWalls();
		this.createChests();
		this.createPlayer();
		this.addCollisions();
		this.createInput();
	}

	update() {
		this.player.update(this.keys);
	}

	createPlayer() {
		this.player = new Player(this, 32, 32, "characters", 0);
	}

	createInput() {
		this.keys = this.input.keyboard.addKeys({
			up: Phaser.Input.Keyboard.KeyCodes.W,
			down: Phaser.Input.Keyboard.KeyCodes.S,
			left: Phaser.Input.Keyboard.KeyCodes.A,
			right: Phaser.Input.Keyboard.KeyCodes.D,
		});
	}

	createWalls() {
		this.wall = this.physics.add.image(500, 100, "button1");
		this.wall.setCollideWorldBounds(true);
		this.wall.setImmovable();
	}

	addCollisions() {
		this.physics.add.collider(this.player, this.wall);
		this.physics.add.overlap(
			this.player,
			this.chests,
			this.collectChest,
			null,
			this
		);
	}

	createAudio() {
		this.goldPickupAudio = this.sound.add("goldSound");
	}

	createChests() {
		this.chests = this.physics.add.group();
		let maxChests = 3;
		let chestLocations = [
			[300, 300],
			[400, 300],
			[200, 400],
		];
		for (let i = 0; i < maxChests; i++) {
			this.spawnChest(chestLocations[i]);
		}
	}

	spawnChest(location) {
		let chest = this.chests.getFirstDead();
		if (chest) {
			chest.setPosition(location[0], location[1]);
			chest.makeActive();
			this.chests.add(chest);
		} else {
			this.chests.add(
				new Chest(this, location[0], location[1], "items", 0)
			);
		}
	}

	collectChest(player, chest) {
		this.score += chest.coins;
		this.goldPickupAudio.play();
		this.events.emit("updateScore", this.score);
		this.time.delayedCall(
			1000,
			() => {
				this.spawnChest([chest.x, chest.y]);
			},
			[],
			this
		);
		chest.makeInactive();
	}
}
