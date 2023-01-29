import Bullets from './Bullets';
import Enemy from './Enemy'

export default class Soldier extends Enemy {

	constructor(scene, x, y, spriteName) {
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
				frames: this.scene.anims.generateFrameNames(spriteName, {prefix: 'shoot', end: 5, zeroPad: 0}),
				frameRate: 5,
				repeat: 0
			}
		)
		this.flipX = true;
		this.play('idle');

		this.posX = x;
		this.posY = y;
		this.bulletOffsetX = -30;
		this.bulletOffsetY = -2;
		this.shooting = false;
		this.bulletGroup = new Bullets(this.scene, 'bullet')
	}

	shoot(){
		if(!this.shooting){
			this.play('shoot');
			setTimeout(() => {
				this.bulletGroup.generateBullet(this.posX + this.bulletOffsetX, this.posY + this.bulletOffsetY, -1);
			}, 600);

			this.shooting = true;
			setTimeout(() => { this.shooting = false }, 3000);
		}
	}

	update() {
		this.shoot();
	}

}
