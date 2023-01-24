import Phaser from 'phaser'

import TestPlayerScene from './scenes/TestPlayerScene'

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 300 }
		}
	},
	scene: [TestPlayerScene]
}

export default new Phaser.Game(config)
