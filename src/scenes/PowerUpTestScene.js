import Phaser from "phaser"
import Heart from '../power_ups/Heart'
import Coin from '../power_ups/Coin'
import Star from '../power_ups/Star'
import Lightning from '../power_ups/Lightning'
import HUD from '../HUD/HUD'
import Player from '../characters/Player'
import MovingPlatform from "../MovingPlatform"
import Mummy from "../enemies/Mummy"

export default class HelloWorldScene extends Phaser.Scene {
	constructor() {
		super('hello-world')
	}

	preload() {
		// Images and spritesheets
		this.load.image('sea', '../../res/sea.png')
		this.load.image('heart', '../../res/power_ups/heart.png');
		this.load.image('coin', '../../res/power_ups/gold_coin.png');
		this.load.image('star', '../../res/power_ups/star.png');
		this.load.image('lightning', '../../res/power_ups/blue_power_icon.png');
		this.load.image('supershot', '../../res/super_shot.png');
		this.load.image('box', '../../res/box.png');
		this.load.image('bullet', '../../res/enemies/bullet.png');

		this.load.spritesheet('mummy', '../../res/enemies/mummy37x45.png', { frameWidth: 37, frameHeight: 45 });
		this.load.spritesheet('player', '../../res/player/idle/idle_sprite.png', { frameWidth: 71, frameHeight: 67 });
		this.load.spritesheet('player-walk-right', 'res/player/walk/player_walk_right.png', { frameWidth: 71, frameHeight: 67 });
		this.load.spritesheet('player-walk-left', 'res/player/walk/player_walk_left.png', { frameWidth: 71, frameHeight: 67 });
		this.load.spritesheet('player-shoot-right', 'res/player/shoot/shoot_right.png', { frameWidth: 71, frameHeight: 67 });
		this.load.spritesheet('player-shoot-left', 'res/player/shoot/shoot_left.png', { frameWidth: 71, frameHeight: 67 });
		this.load.spritesheet('player-hurt', 'res/player/hurt/hurt.png', { frameWidth: 71, frameHeight: 67 });
		this.load.spritesheet('player-jump', 'res/player/jump/jump_sprite.png', { frameWidth: 71, frameHeight: 67 });

		// Sounds
		this.load.audio('coin', '../../res/audio/coin.mp3');
		this.load.audio('heart', '../../res/audio/heart.mp3');
		this.load.audio('lightning', '../../res/audio/lightning.mp3');
		this.load.audio('star', '../../res/audio/star.mp3');
		this.load.audio('super_shot', '../../res/audio/super_shot.mp3');
	}

	create() {
		// Add background
		this.add.image(400, 300, 'sea').setScale(10);

		// Add power-ups
		this.heart = new Heart(this, 400, 500, 300, 'heart');
        this.heart.setScale(0.05);
		this.coin = new Coin(this, 400, 700, 300, 'coin');
        this.coin.setScale(0.05);
		this.star = new Star(this, 600, 700, 300, 'star');
        this.star.setScale(0.05);
		this.lightning = new Lightning(this, 600, 500, 300, 'lightning');
        this.lightning.setScale(0.05);

		// Add sounds
		this.coinSound = this.sound.add('coin');
		this.heartSound = this.sound.add('heart');
		this.lightningSound = this.sound.add('lightning');
		this.starSound = this.sound.add('star');
		this.superShotSound = this.sound.add('super_shot');

		// Add enemy
		this.mummy = new Mummy(this, 550, 550, 100, 'mummy');

		// Add HUD
		this.hud = new HUD(this);

		// Add player
		this.player = new Player(this, 200, 100, 'player');

		// Add moving platforms
		this.movingPlatforms = [];
		this.movingPlatforms.push(new MovingPlatform(this, 100, 300, 'box', 300, 300));
		this.movingPlatforms.push(new MovingPlatform(this, 400, 500, 'box', 400, 300));

		this.superShotArray = [];

		// Add keys
		this.superShotKey = this.input.keyboard.addKey('X');

		// Set keys actions
		// this.superShotKey.on('down', () => { this.player.executeSuperShot() }, null);

		// Set collisions
		this.physics.add.collider(this.movingPlatforms, this.player, this.collidePlayerPlatform, null, this);
		this.physics.add.overlap(this.player, this.heart, () => { this.heart.executePowerUpAction(this.player, this.hud) }, null, this);
		this.physics.add.overlap(this.player, this.coin, () => { this.coin.executePowerUpAction(this.hud) }, null, this);
		this.physics.add.overlap(this.player, this.star, () => { this.star.executePowerUpAction(this.player) }, null, this);
		this.physics.add.overlap(this.player, this.lightning, () => { this.lightning.executePowerUpAction(this.player, this.hud) }, null, this);
		this.physics.add.overlap(this.mummy, this.superShotArray, () => { this.mummy.takeDamage(this.superShotArray[0].damage) }, null, this);

		this.physics.add.overlap(this.player, this.mummy, () => { this.player.takeDamage(this.mummy.damage) }, null, this);
	}

	update() {
		this.player.update();
		this.mummy.update();
		if (this.player.currentPlatform){
			if (this.player.currentPlatform.body.touching.none){
				this.player.isOnPlatform = false;
				this.player.currentPlatform = undefined;
			}
		}
	}


	// Get scene HUD
	getHUD() {
		return this.hud;
	}

	// For collisions between player and moving platforms
	collidePlayerPlatform(platform, player) {
		if (platform.body.touching.up && player.body.touching.down) {
			player.isOnPlatform = true;
			player.currentPlatform = platform;
		}
		else{
			player.isOnPlatform = false;
			player.currentPlatform = undefined;
		}
	}
}
