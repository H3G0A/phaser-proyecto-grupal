import Phaser from 'phaser'

import FirstLevelScene from './scenes/FirstLevelScene'
import SecondLevelScene from './scenes/SecondLevelScene'
import ThirdLevelScene from './scenes/ThirdLevelScene'
import EnemyTestScene from './scenes/EnemyTestScene'
import PowerUpTestScene from './scenes/PowerUpTestScene'
import FinalBossScene from './scenes/FinalBossScene'
import TestPlayerScene from './scenes/TestPlayerScene'

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
	scene: [FirstLevelScene, SecondLevelScene, ThirdLevelScene, EnemyTestScene, FinalBossScene]
}

export default new Phaser.Game(config)
