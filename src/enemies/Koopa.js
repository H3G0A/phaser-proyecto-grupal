import Enemy from './Enemy'

export default class Koopa extends Enemy {
	constructor(scene, x, y, distance, spriteName) {
		super(scene, x, y, spriteName);

		this.scene.anims.create(
			{
				key: 'fly',
				frames: this.scene.anims.generateFrameNames(spriteName, {prefix: 'koopa', end: 3, zeroPad: 0}),
				frameRate: 5,
				repeat: -1
			}
		);
		this.play('fly');
		this.body.setAllowGravity(false)

		this.initialPos = this.y;
		this.finishedRoute = false;
		this.distance = distance;

	}

	patrolling (distance) {
		let endPos = this.initialPos + distance;
		if(this.y >= endPos){
			this.finishedRoute = true;
		}
		if(this.y <= this.initialPos){
			this.finishedRoute = false;
		}
		
		if(!this.finishedRoute){
			this.setVelocityY(60);
		}
		else{
			this.setVelocityY(-60);
		}
	}

	update(){
		this.patrolling(this.distance);
	}
}