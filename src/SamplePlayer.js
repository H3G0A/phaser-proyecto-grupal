import Phaser from 'phaser'
import SuperShot from './power_ups/SuperShot'

export default class Mummy extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, spriteName) {
		super(scene, x, y, spriteName);
		this.scene = scene;
		this.scene.add.existing(this);
		this.scene.physics.add.existing(this);
		this.setCollideWorldBounds(true);
		this.cursors = this.scene.input.keyboard.createCursorKeys();
		this.body.immovable = false;
		this.isOnPlatform = false;
		this.currentPlatform = undefined;

		this.damage = 1;
		this.takingDamage = false;
		this.health = 3;
		this.inmunity = false;
		this.superShot = false;
		
		this.superShotOffsetX = 100;
		this.superShotOffsetY = -10;
	}

	takeDamage(damage) {
		if (!this.takingDamage && !this.inmunity) {
			this.health -= damage;
			this.checkDeath();
			console.log(this.health);
			this.takingDamage = true;
			this.scene.getHUD().setLifes(this.health);
			setTimeout(() => { this.takingDamage = false }, 1000);
		}
	}

	// Adds inmunity when picking up a star
	addInmunity(){
		this.inmunity = true;

		this.flashAnimation = this.scene.tweens.add({
			targets: this,
			alpha: 0,
			ease: 'Power0',  
			duration: 500,
			repeat: -1,
			yoyo: true
		});
	}

	// Removes inmunity
	removeInmunity(){
		this.inmunity = false;
		this.flashAnimation.stop();
	}

	// Adds 'Super Shot' when picking up a lightning
	addSuperShot(){
		this.superShot = true;
	}

	// Executes 'Super Shot'
	executeSuperShot(){
		if (this.superShot){
			this.superShot = false;
			this.scene.getHUD().removeLightning();
			this.scene.superShotSound.play();
			var superShotBullet = new SuperShot (this.scene, this.x + this.superShotOffsetX, this.y + this.superShotOffsetY, 'supershot', 1);
			superShotBullet.setScale(0.5);
			this.scene.superShotArray.push(superShotBullet);
			superShotBullet.generateSuperShot();
		}
	}

	// Heals when picking up a heart
	heal(){
		this.health += 1;
		return this.health;

	}
	
	checkDeath(){
		if (this.health <= 0) {
			console.log('Player death');
			this.disableBody(true, true);
		}
	}

	bounce(velocity) {
		this.setVelocityY(velocity)
	}

	update() {
		if (this.cursors.up.isDown) {
			this.setVelocityY(-330);
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
			//this.scene.add.text(100, 200, 'GAME OVER', { fontSize: '100px', fill: '#0'});
			this.disableBody(true, true);
		}

		if (this.isOnPlatform && this.currentPlatform) { // Executed when the player is on a moving platform
			this.body.position.x += this.currentPlatform.body.x - this.currentPlatform.previousX;
			this.body.position.y += this.currentPlatform.body.y - this.currentPlatform.previousY;
		}
	}
}