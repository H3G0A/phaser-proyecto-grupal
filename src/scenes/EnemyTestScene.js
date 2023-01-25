import Phaser from "phaser"
import Bullet from "../enemies/Bullet"
import Mummy from '../enemies/Mummy'
import Soldier from '../enemies/Soldier'
import SamplePlayer from '../SamplePlayer'

export default class HelloWorldScene extends Phaser.Scene {
	constructor() {
		super('hello-world')
	}

	preload() {
		this.load.image('sea', '../../res/sea.png');
		this.load.spritesheet('mummy', '../../res/enemies/mummy37x45.png', { frameWidth: 37, frameHeight: 45 });
		this.load.spritesheet('player', '../../res/player/idle/idle-1.png', { frameWidth: 71, frameHeight: 67 });
		this.load.atlas('soldier', '../../res/enemies/soldier_spritesheet.png', '../../res/enemies/soldier_spritesheet.json');
		this.load.image('bullet', '../../res/enemies/bullet.png');
	}

	create() {
		// Add background
		this.add.image(400, 300, 'sea').setScale(8);

		// Add player and enemies
		//this.mummy = new Mummy(this, 400, 300, 300, 'mummy');
		this.soldier = new Soldier(this, 400, 300, 300, 'soldier');
		this.player = new SamplePlayer(this, 200, 100, 'player');

		this.bullet = new Bullet(this, 400, 400, 'bullet');

		// Set collisions
		//this.physics.add.overlap(this.player, this.mummy, () => { this.player.takeDamage(this.mummy.damage) }, null, this);
		this.physics.add.overlap(this.player, this.soldier, () => { this.player.takeDamage(this.soldier.damage) }, null, this);
		
		// To test health of the enemy
		//this.physics.add.overlap(this.player, this.mummy, () => { this.mummy.takeDamage(this.player.damage) }, null, this);

	}

	update() {
		//this.mummy.update();
		this.soldier.update();
		this.player.update();
		this.bullet.update();
	}
}
