import Enemy from './Enemy'

export default class Mummy extends Enemy {

	constructor(scene, x, y, distance, spriteName) {
		super(scene, x, y, spriteName);

		this.scene.anims.create(
			{
				key: 'walk',
				frames: this.scene.anims.generateFrameNumbers(spriteName, { start: 0, end: 17 }),
				frameRate: 10,
				repeat: -1
			}
		);
		this.play('walk');

		this.finishedRoute = false;
		this.initialPos = this.x;
		this.distance = distance;
	}

	patrolling (distance) {
		let endPos = this.initialPos - distance;
		if(this.x <= endPos){
			this.finishedRoute = true;
		}
		if(this.x >= this.initialPos){
			this.finishedRoute = false;
		}
		
		if(!this.finishedRoute){
			this.setVelocityX(-60);
			this.flipX = true;
		}
		else{
			this.setVelocityX(60);
			this.flipX = false;
		}
	}

	update() {
		this.patrolling(this.distance);
	}

}
