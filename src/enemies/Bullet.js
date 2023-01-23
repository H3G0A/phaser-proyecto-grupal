import Phaser from 'phaser'

export default class Bullet extends Phaser.Physics.Arcade.Sprite {

	constructor(scene, x, y, spriteName) {
		super(scene, x, y, spriteName);
		this.scene = scene;
		this.scene.add.existing(this);
		this.scene.physics.add.existing(this);
		this.body.allowGravity = false;
		this.setCollideWorldBounds(true);

		this.damage = 30;
	}

	update() {
		this.setVelocityX(10);
	}

}
