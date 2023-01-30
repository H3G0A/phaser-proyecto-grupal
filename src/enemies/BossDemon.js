import Phaser from 'phaser'
import Enemy from './Enemy'

export default class BossDemon extends Enemy {

	constructor(scene, x, y, distance, spriteName) {
		super(scene, x, y, spriteName);
		this.health = 20;

		this.scene.anims.create(
			{
				key: 'demonWalk',
				frames: this.scene.anims.generateFrameNumbers(spriteName, { start: 0, end: 6 }),
				frameRate: 10,
				repeat: -1
			}
		);
		this.play('demonWalk');

		this.finishedRoute = false;
		this.initialPos = this.x;
		this.distance = distance;
	}

	patrolling (distance) {
		let endPos = this.initialPos + distance;
		if(this.x >= endPos){
			this.finishedRoute = true;
		}
		if(this.x <= this.initialPos){
			this.finishedRoute = false;
		}
		
		if(!this.finishedRoute){
			this.setVelocityX(-0);
			this.flipX = false;
		}
		else{
			this.setVelocityX(0);
			this.flipX = false;
		}
	}

	update() {
		this.patrolling(this.distance);
	}

}
