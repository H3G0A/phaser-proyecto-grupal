import Phaser from "phaser"


export default class EndGameScene extends Phaser.Scene {
	constructor() {
		super({key: "endScreen"})
	}

	preload() {
		this.load.image('endBG', '../../res/endScreen.png');
	}

	create() {
		// Add background
		this.add.image(480, 320, 'endBG');

		this.input.on("pointerdown", () => this.scene.start("Level1"));
	}

	update() {
		
	}
}
