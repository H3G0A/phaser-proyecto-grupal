import Phaser from 'phaser'
import PowerUp from './PowerUp'

export default class Coin extends PowerUp {

	constructor(scene, x, y, spriteName) {
		super(scene, x, y, spriteName);
	}

	// Executed when the power up is picked up
	executePowerUpAction(player, hud) {
		hud.catchCoins(); // Update HUD and counter
		this.scene.coinSound.play(); // Play sound
		this.disableBody(true, true); // Destroy item
	}
}