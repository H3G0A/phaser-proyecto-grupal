import Phaser from 'phaser'
import Bullet from './Bullet';
import Enemy from './Enemy'

export default class Soldier extends Enemy {

	constructor(scene, x, y, distance, spriteName) {
		super(scene, x, y, spriteName);

		this.scene.anims.create(
			{
				key: 'idle',
				frames: this.scene.anims.generateFrameNames(spriteName, {prefix: 'idle', end: 2, zeroPad: 0}),
				frameRate: 3,
				repeat: -1
			}
		);
		

		this.scene.anims.create(
			{
				key: 'shoot',
				frames: this.scene.anims.generateFrameNames(spriteName, {prefix: 'shoot', end: 4, zeroPad: 0}),
				frameRate: 10,
				repeat: -1
			}
		)
		this.play('shoot');

		this.shooting = false;
	}

	shoot(){
		if(!this.shooting){
			let newBullet = new Bullet(this.scene, 400, 400, 'bullet');
			this.shooting = true;
			setTimeout(() => { this.shooting = false }, 3000);
		}
	}

	update() {
		//this.shoot();
	}

}
