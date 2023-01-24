
import Phaser from 'phaser'
import Character from './Character'

export default class Player extends Character {
    constructor(scene, x, y, distance, spriteName) {
		super(scene, x, y, spriteName);

		this.scene.add.existing(this);
		this.scene.physics.add.existing(this);
		this.setCollideWorldBounds(true);
		this.cursors = this.scene.input.keyboard.createCursorKeys();

		this.finishedRoute = false;
		this.initialPos = this.x;
		this.distance = distance;
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