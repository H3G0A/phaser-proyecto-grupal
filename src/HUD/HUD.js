import Phaser from 'phaser'

export default class HUD  {

	constructor(scene) {
		this.scene = scene;
		this.scene.add.existing(this);
        this.coins = 0;
        this.heartArray = [];
        this.lightningIcon = null;

        // Initialize coins
        var coinsImage = this.scene.add.image(900, 80, 'coin').setScale(0.08);
        this.coinsText = this.scene.add.text(925, 75, '0', { fontSize: '30px', fill: '#0'});

        coinsImage.setScrollFactor(0,0);
        this.coinsText.setScrollFactor(0,0);

        // Initialize lifes
        this.setLifes(3);
	}

    // Update coins counter
    catchCoins(){
        this.coins++;
        this.coinsText.setText(this.coins.toString());
    }

    // Update lifes counter
    setLifes (lifesNumber){
        let leftPosition = 930; // Initialize left position

        for (let i = 0; i < this.heartArray.length; i++){ // Destroy current hearts
            this.heartArray[i].destroy();
        }

        this.heartArray = []; // Clean heart array
        
        for (let i = 0; i < lifesNumber; i++){ // Create new hearts
            this.heartArray.push(this.scene.add.image(leftPosition, 25, 'heart').setScale(0.08));
            leftPosition -= 50;
            this.heartArray[i].setScrollFactor(0,0);
        }
    }

    // Add lightning indicator to HUD
    addLightning (){
        this.lightningIcon = this.scene.add.image(30, 30, 'lightning').setScale(0.08);
        this.lightningIcon.setScrollFactor(0,0);
    }

    // Remove lightning indicator from HUD
    removeLightning (){
        this.lightningIcon.destroy();
    }
}