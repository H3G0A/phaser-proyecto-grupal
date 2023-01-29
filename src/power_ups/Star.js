import Phaser from 'phaser'
import PowerUp from './PowerUp'

export default class Star extends PowerUp {

	constructor(scene, x, y, spriteName) {
		super(scene, x, y, spriteName);
	}

	// Executed when the power up is picked up
	executePowerUpAction(player) {
		player.addInmunity(); // Add inmunity to player
		setTimeout(() => { player.removeInmunity() }, 5000); // Set inmunity timeout
		this.scene.starSound.play(); // Play sound
		this.disableBody(true, true); // Destroy item
	}
}