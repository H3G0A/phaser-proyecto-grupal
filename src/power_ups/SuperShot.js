import Phaser from 'phaser'

export default class SuperShot extends Phaser.Physics.Arcade.Sprite  {

	constructor(scene, x, y, spriteName, direction) {
		super(scene, x, y, spriteName);
		this.spriteName = spriteName;
		this.scene = scene;
		this.scene.physics.add.existing(this);
		this.body.setAllowGravity(false);
		this.body.velocity.x = direction * 600;
		this.damage = 3;
	}

	// Destroy item if reaches 5 seconds lifetime
	autoDestroy() {
		setTimeout(() => {
			this.destroy();
		}, 2000);
	}

	// Execute a 'Super Shot'
	generateSuperShot() {
		this.scene.add.existing(this); //Add beam to the scene
		this.autoDestroy(); // Set destroying timeout
	}

}