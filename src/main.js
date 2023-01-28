import Phaser from 'phaser'

import HelloWorldScene from './scenes/HelloWorldScene'
import EnemyTestScene from './scenes/EnemyTestScene'
import FinalBossScene from './scenes/FinalBossScene'
import TestPlayerScene from './scenes/TestPlayerScene'

const config = {
	type: Phaser.AUTO,
	width: 960,
	height:640,
	physics: {
		default: 'arcade',
		arcade: {
			debug: true,
			gravity: { y: 500 }
		}
	},
	scene: [TestPlayerScene]
	//scene: [EnemyTestScene]
}

export default new Phaser.Game(config)
