
import Phaser from 'phaser'

export default class Player extends Phaser.Physics.Arcade.Sprite {

	constructor(scene, x, y, spriteName) {
		super(scene, x, y, spriteName);
		this.scene = scene;
		this.scene.add.existing(this);
		this.scene.physics.world.enable(this);
		this.scene.physics.add.existing(this);
		this.setCollideWorldBounds(true);

		this.cursors = this.scene.input.keyboard.createCursorKeys();

		this.health = 100;
		this.damage = 30;
		this.takingDamage = false;

	}

	takeDamage(damage) {
		if (!this.takingDamage) {
			this.health -= damage;
			this.checkDeath();
			console.log(this.health);
			this.takingDamage = true;
			setTimeout(() => { this.takingDamage = false }, 1000);
		}
	}

	checkDeath(){
		if (this.health <= 0) {
			console.log('Player death');
			this.disableBody(true, true);
		}
	}

	update() {
		if (this.cursors.up.isDown == true) {
			this.setVelocityY(-500);
		}
		else if (this.cursors.down.isDown) {
			this.setVelocityY(200);
		}
		else if (this.cursors.left.isDown) {
			this.setVelocityX(-200);
		}
		else if (this.cursors.right.isDown) {
			this.setVelocityX(200);
		}
		else {
			this.setVelocityX(0);
		}


		if (this.health <= 0) {
			console.log('GAME OVER');
			this.disableBody(true, true);
		}

	}

}