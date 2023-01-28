
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

		this.init();
	}

	init(){
        this
        .setBounce(0.2)
        .setCollideWorldBounds(true)
        .setGravityY(300)
        .setDepth(2);
    }

	update() {
		if (this.cursors.up.isDown && this.y >= 550) {
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
			console.log('GAME OVER');
			this.disableBody(true, true);
		}

	}

}