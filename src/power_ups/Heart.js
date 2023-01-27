import Phaser from 'phaser'
import PowerUp from './PowerUp'

export default class Heart extends PowerUp {

	constructor(scene, x, y, distance, spriteName) {
		super(scene, x, y, spriteName);
	}

	// Executed when the power up is picked up
	executePowerUpAction(player, hud) {
		let lifes = player.heal(); // Heal the player
		hud.setLifes(lifes); // Update HUD
		this.scene.heartSound.play(); // Play sound
		this.disableBody(true, true); // Destroy item
	}
}