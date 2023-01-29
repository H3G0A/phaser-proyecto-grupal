
import Phaser from 'phaser'
import SuperShot from '../power_ups/SuperShot'
import Bullets from '../enemies/Bullets';

export default class Player extends Phaser.Physics.Arcade.Sprite {

	constructor(scene, x, y, spriteName) {
		super(scene, x, y, spriteName);
		this.scene = scene;
		this.scene.add.existing(this);
		this.scene.physics.world.enable(this);
		this.scene.physics.add.existing(this);
		this.setCollideWorldBounds(true);
		this.cursors = this.scene.input.keyboard.createCursorKeys();
		this.spaceKey = this.scene.input.keyboard.addKey('SPACE');
		this.superShotKey = this.scene.input.keyboard.addKey('X');
		this.body.setSize(25, 55);
		this.body.offset.y = 13;

		this.scene.anims.create(
			{
				key: 'player-walk-right',
				frames: this.scene.anims.generateFrameNumbers('player-walk-right', { start: 0, end: 15 }),
				frameRate: 10,
				repeat : 1
			}
		);

		this.scene.anims.create(
			{
				key: 'player-walk-left',
				frames: this.scene.anims.generateFrameNumbers('player-walk-left', { start: 0, end: 15 }),
				frameRate: 10,
				repeat : 1
			}
		);

		this.scene.anims.create(
			{
				key: 'player-jump',
				frames: this.scene.anims.generateFrameNumbers('player-jump', { start: 0, end: 3 }),
				frameRate: 10,
				repeat : 1
			}
		);

		this.scene.anims.create(
			{
				key: 'player-hurt',
				frames: this.scene.anims.generateFrameNumbers('player-hurt', { start: 0, end: 0 }),
				frameRate: 10,
				repeat : 2
			}
		);

		this.scene.anims.create(
			{
				key: 'shoot-right',
				frames: this.scene.anims.generateFrameNumbers('player-shoot-right', { start: 0, end: 0 }),
				frameRate: 10,
				repeat : 2
			}
		);

		this.scene.anims.create(
			{
				key: 'shoot-left',
				frames: this.scene.anims.generateFrameNumbers('player-shoot-left', { start: 0, end: 0 }),
				frameRate: 10,
				repeat : 2
			}
		);

		this.scene.anims.create(
			{
				key: 'stay',
				frames: this.scene.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
				frameRate: 10,
				repeat : -1
			}
		);



		this.health = 3;
		this.damage = 30;
		this.takingDamage = false;
		this.inmunity = false;
		this.superShot = false;

		this.superShotOffsetX = 100;
		this.superShotOffsetY = -10;
		this.isOnPlatform = false;
		this.currentPlatform = undefined;

		this.bulletGroup = new Bullets(this.scene, 'bullet');

		if(this.health >0 ){
			this.play('stay');
		}

	}

	takeDamage(damage) {
		if (!this.takingDamage) {
			this.health -= damage;
			this.checkDeath();
			console.log(this.health);
			this.takingDamage = true;
			this.scene.getHUD().setLifes(this.health);
			setTimeout(() => { this.takingDamage = false }, 1000);
		}
	}

	bounce(velocity) {
		this.play('player-jump').on('animationcomplete', () => {this.play('stay')});
		this.setVelocityY(velocity)
	}

	checkDeath(){
		if (this.health <= 0) {
			console.log('Player death');
			this.disableBody(true, true);
		}else{
			this.play('player-hurt').on('animationcomplete', () => {this.play('stay')});
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

	shoot(direction){
		if(direction > 0){
			this.anims.play('shoot-right',true).on('animationcomplete', () => {this.play('stay')});
		}else{
			this.anims.play('shoot-left',true).on('animationcomplete', () => {this.play('stay')});
		}
		setTimeout(() => {
			this.bulletGroup.generateBullet(this.body.position.x + 50 , this.body.position.y + 30, direction);
		}, 300);
	}

	// Executes 'Super Shot'
	executeSuperShot(direction){
		if (this.superShot){
			if(direction > 0){
				this.anims.play('shoot-right',true).on('animationcomplete', () => {this.play('stay')});
			}else{
				this.anims.play('shoot-left',true).on('animationcomplete', () => {this.play('stay')});
			}
			this.superShot = false;
			this.scene.getHUD().removeLightning();
			this.scene.superShotSound.play();
			var superShotBullet = new SuperShot (this.scene, this.x + this.superShotOffsetX, this.y + this.superShotOffsetY, 'supershot', direction);
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

	update() {

		if (this.cursors.up.isDown == true && this.body.onFloor()) {
			if (!(this.anims.isPlaying && this.anims.currentAnim.key === 'player-jump')) {
				this.setVelocityY(-400);
				this.anims.play('player-jump',true).on('animationcomplete', () => {
					this.anims.play('stay',true);
					this.setVelocityY(0);
				});
			}
		}
		else if (this.cursors.down.isDown) {
			this.setVelocityY(200);
		}
		if (this.cursors.left.isDown && this.cursors.right.isUp) {
			this.setVelocityX(-200);
			if (!(this.anims.isPlaying && this.anims.currentAnim.key === 'player-jump')) {
				this.anims.play('player-walk-left',true).on('animationcomplete', () => {this.anims.play('stay',true)});
			}
		}
		else if(this.cursors.left.isUp && !this.cursors.right.isDown){
			if (this.anims.isPlaying && this.anims.currentAnim.key === 'player-walk-left') {
				this.setVelocityX(0);
				this.anims.play('stay',true);
			}
		}
		if (this.cursors.right.isDown) {
			this.setVelocityX(200);
			if (!(this.anims.isPlaying && this.anims.currentAnim.key === 'player-jump')) {
				this.anims.play('player-walk-right',true).on('animationcomplete', () => {this.anims.play('stay',true)});
			}
		}
		else if(this.cursors.right.isUp && !this.cursors.left.isDown){
			if (this.anims.isPlaying && this.anims.currentAnim.key === 'player-walk-right') {
				this.setVelocityX(0);
				this.anims.play('stay',true);
			}
		}
		if (this.spaceKey.isDown){
				if (this.anims.isPlaying && this.anims.currentAnim.key === 'player-walk-left') {
					this.shoot(-1);
				}else if (this.anims.isPlaying && this.anims.currentAnim.key === 'player-walk-right' || this.anims.currentAnim.key === 'stay') {
					this.shoot(1);
				}
		}else if (this.superShotKey.isDown){
			if (this.anims.isPlaying && this.anims.currentAnim.key === 'player-walk-left') {
				this.executeSuperShot(-1);
			}else if (this.anims.isPlaying && this.anims.currentAnim.key === 'player-walk-right' || this.anims.currentAnim.key === 'stay'){
				this.executeSuperShot(1);
			}
		}
		else if (this.cursors.left.isUp && this.cursors.right.isUp && this.cursors.down.isUp && this.cursors.up.isUp){
			this.setVelocityX(0);
		}


		if (this.health <= 0) {
			console.log('GAME OVER');
			this.disableBody(true, true);
		}

		if (this.isOnPlatform && this.currentPlatform) { // Executed when the player is on a moving platform
			this.body.position.x += this.currentPlatform.body.x - this.currentPlatform.previousX;
			this.body.position.y += this.currentPlatform.body.y - this.currentPlatform.previousY;
		}
	}

}