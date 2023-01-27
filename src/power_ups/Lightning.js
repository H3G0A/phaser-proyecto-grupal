import Phaser from 'phaser'
import PowerUp from './PowerUp'

export default class Lightning extends PowerUp {

	constructor(scene, x, y, distance, spriteName) {
		super(scene, x, y, spriteName);
	}

	// Executed when the power up is picked up
	executePowerUpAction(player, hud) {
		hud.addLightning(); // Add lightning indicator to HUD
		player.addSuperShot(); // Let the player execute a 'Super Shot'
		this.scene.lightningSound.play(); // Play sound
		this.disableBody(true, true); // Destroy item
	}
}