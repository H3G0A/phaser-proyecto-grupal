import Phaser from 'phaser'

export default class Enemy extends Phaser.Physics.Arcade.Sprite {

	constructor(scene, x, y, spriteName) {
		super(scene, x, y, spriteName);
		this.scene = scene;
		this.scene.add.existing(this);
		this.scene.physics.add.existing(this);
		this.health = 3;
		this.damage = 1;
		this.takingDamage = false;
	}

	takeDamage(damage) {
		this.health -= damage;
		this.checkDeath();
		console.log(this.health);
		
	}

	checkDeath(){
		if (this.health <= 0) {
			console.log('enemy death');
			this.disableBody(true, true);
		}
	}

}
