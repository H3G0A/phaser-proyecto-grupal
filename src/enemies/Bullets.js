import Phaser from 'phaser'

export default class Bullets extends Phaser.Physics.Arcade.Group {

	constructor(scene, spriteName) {
		super(scene.physics.world, scene);
		this.spriteName = spriteName;
		this.scene = scene;
		this.scene.add.existing(this);
		this.maxSize = 15;
	}

	autoDestroy(bullet) {
		setTimeout(() => {
			bullet.destroy();
		}, 2000);
	}

	generateBullet(x, y, direction) {
		let item = this.create(x, y, this.spriteName, 0, true, true);
		item.body.setAllowGravity(false);
		item.setVelocityX(direction * 200);

		// Destroy if reaches end of screen
		item.setCollideWorldBounds(true);
		item.body.onWorldBounds = true;
		item.body.world.on('worldbounds', (body) => {
			if (body.gameObject === item) {
				item.destroy();
			}
		}, item);

		// Destroy if reaches 5 seconds lifetime
		this.autoDestroy(item);
	}

}
