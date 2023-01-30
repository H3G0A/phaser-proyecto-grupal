import Phaser from 'phaser'

import FirstLevelScene from './scenes/FirstLevelScene'
import SecondLevelScene from './scenes/SecondLevelScene'
import ThirdLevelScene from './scenes/ThirdLevelScene'
import FinalBossScene from './scenes/FinalBossScene'
import EndGameScene from './scenes/EndGameScene'

const config = {
	type: Phaser.AUTO,
	width: 960,
	height: 640,
	physics: {
		default: 'arcade',
		arcade: {
			debug: false,
			gravity: { y: 500 }
		}
	},
	scene: [FirstLevelScene, SecondLevelScene, ThirdLevelScene, FinalBossScene, EndGameScene]
}

export default new Phaser.Game(config)
