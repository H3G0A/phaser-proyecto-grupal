import Phaser from 'phaser'

export default class Trampoline extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, spriteName) {
		super(scene, x, y, spriteName);
		this.scene = scene;
		this.scene.add.existing(this);
		this.scene.physics.add.existing(this);
		this.setCollideWorldBounds(true);
		this.body.setAllowGravity(false);
		this.scene.physics.add.existing(this).setImmovable(true);
	}

	update() {}

}