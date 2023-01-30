import Phaser from 'phaser'

export default class MovingPlatform extends Phaser.Physics.Arcade.Sprite  {

	constructor(scene, x, y, spriteName, destinoX, destinoY) {
		super(scene, x, y, spriteName);
		this.spriteName = spriteName;
		this.scene = scene;
        this.scene.add.existing(this);
		this.scene.physics.add.existing(this);
		this.body.setAllowGravity(false);
        this.body.setImmovable();
        this.previousX = x;
        this.previousY = y;
        this.vx = 0;
        this.vy = 0;

        // Animate platform
        this.scene.tweens.add({
            targets: this,
            x: destinoX,
            y: destinoY,
            ease: 'Linear',
            duration: 4000,
            repeat: -1,
            yoyo: true,
            onUpdate: () => {
                this.previousX = this.body.position.x;
                this.previousY = this.body.position.y; 
              }
          });
	}
}