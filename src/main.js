import Phaser from 'phaser'

import FirstLevelScene from './scenes/FirstLevelScene'
import SecondLevelScene from './scenes/SecondLevelScene'
import ThirdLevelScene from './scenes/ThirdLevelScene'

const config = {
	type: Phaser.AUTO,
	width: 960,
	height: 640,
	physics: {
		default: 'arcade',
		arcade: {
			debug: true,
			gravity: { y: 500 }
		}
	},
	scene: [FirstLevelScene, SecondLevelScene, ThirdLevelScene]
}

export default new Phaser.Game(config)
