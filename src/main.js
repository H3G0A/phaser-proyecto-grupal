import Phaser from 'phaser'

import HelloWorldScene from './scenes/HelloWorldScene'
import EnemyTestScene from './scenes/EnemyTestScene'
import PowerUpTestScene from './scenes/PowerUpTestScene'

const config = {
	type: Phaser.AUTO,
	width: 960,
	height: 640,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 500 }
		}
	},
	scene: [PowerUpTestScene]
}

export default new Phaser.Game(config)
