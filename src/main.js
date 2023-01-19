import Phaser from 'phaser'

import HelloWorldScene from './scenes/HelloWorldScene'
import EnemyTestScene from './scenes/EnemyTestScene'

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 500 }
		}
	},
	scene: [EnemyTestScene]
}

export default new Phaser.Game(config)
