export default class Player extends Phaser.Physics.Arcade.Image {
	speed: number;

	constructor(
		scene: Phaser.Scene,
		x: number,
		y: number,
		key: string,
		frame: number
	) {
		super(scene, x, y, key, frame);
		this.scene = scene;

		this.speed = 160;

		// Physics
		this.scene.physics.world.enable(this);
		this.setImmovable(false);
		this.setScale(2);
		this.setCollideWorldBounds(true);
		this.scene.add.existing(this);
	}

	update(cursors) {
		if (cursors.left.isDown) {
			this.setVelocityX(-this.speed);
		} else if (cursors.right.isDown) {
			this.setVelocityX(this.speed);
		} else {
			this.setVelocityX(0);
		}

		if (cursors.up.isDown) {
			this.setVelocityY(-this.speed);
		} else if (cursors.down.isDown) {
			this.setVelocityY(this.speed);
		} else {
			this.setVelocityY(0);
		}
	}
}
