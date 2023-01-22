
import Phaser from 'phaser'
import Character from './Character'

export default class Player extends Character {
    constructor(scene, x, y, distance, spriteName) {
		super(scene, x, y, spriteName);

		this.scene.anims.create(
			{
				key: 'walk',
				frames: this.scene.anims.generateFrameNumbers(spriteName, { start: 0, end: 18 }),
				frameRate: 10,
				repeat: -1
			}
		);
		this.play('walk');

		this.finishedRoute = false;
		this.initialPos = this.x;
		this.distance = distance;
	}

}