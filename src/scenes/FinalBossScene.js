import Phaser from "phaser"
import BossDemon from "../enemies/BossDemon";
import Mummy from '../enemies/Mummy'
import Player from '../characters/Player'
import HUD from "../HUD/HUD";

export default class FinalBossScene extends Phaser.Scene {
	constructor(){
        super({key: "boss"});
    }

	preload() {
		this.load.image('tileBoss', 'res/TileseBossStage.png');
		this.load.tilemapTiledJSON('mapBoss','res/levels/bossfinal2.json');
		this.load.spritesheet('player', 'res/player/idle/idle_sprite.png', { frameWidth: 71, frameHeight: 67 });
		this.load.spritesheet('demon', '../../res/enemies/hell-beast-id.png', { frameWidth: 55, frameHeight: 67 });
		this.load.spritesheet('player-walk-right', 'res/player/walk/player_walk_right.png', { frameWidth: 71, frameHeight: 67 });
		this.load.spritesheet('player-walk-left', 'res/player/walk/player_walk_left.png', { frameWidth: 71, frameHeight: 67 });
		this.load.spritesheet('player-shoot-right', 'res/player/shoot/shoot_right.png', { frameWidth: 71, frameHeight: 67 });
		this.load.spritesheet('player-shoot-left', 'res/player/shoot/shoot_left.png', { frameWidth: 71, frameHeight: 67 });
		this.load.spritesheet('player-hurt', 'res/player/hurt/hurt.png', { frameWidth: 71, frameHeight: 67 });
		this.load.spritesheet('player-jump', 'res/player/jump/jump_sprite.png', { frameWidth: 71, frameHeight: 67 });
		this.load.spritesheet('run-shoot-right', 'res/player/run-shoot/run-shoot-right.png', { frameWidth: 71, frameHeight: 67 });
        this.load.spritesheet('run-shoot-left', 'res/player/run-shoot/run-shoot-left.png', { frameWidth: 71, frameHeight: 67 });
		this.load.image('bullet', '../../res/enemies/bullet.png');
		this.load.image('supershot', '../../res/super_shot.png');
	}
	create() {
		//Add tile map to the key
		var map = this.make.tilemap({key: 'mapBoss'});

		//Add tileset to the tile
		var tiles = map.addTilesetImage('TileseBossStage', 'tileBoss');
		console.log(tiles)
		//Declare layers in order
		var layerFondo = map.createLayer('fondo', tiles, 0, 0);
		var layerMountain = map.createLayer('mountain', tiles, 0, 0);
		var layerProp = map.createLayer('prop', tiles, 0, 0);
		var layerSuelo = map.createLayer('suelo', tiles, 0, 0);

		//Add collider to the layer
		layerSuelo.setCollisionByExclusion([-1] , true);

		// Add player and enemies
		this.player = new Player(this, 200, 400, 'player');
		this.hud = new HUD(this);
		this.demon = new BossDemon(this, 850, 300, 0, 'demon');

		// Config camera and make follow player
		this.cameras.main.setBounds(0,0,layerFondo.displayWidth, layerFondo.displayHeight);
		this.cameras.main.startFollow(this.player);

		this.superShotArray = [];
		// Set collisions damage
		this.physics.add.overlap(this.player, this.demon, () => { this.player.takeDamage(this.demon.damage) }, null, this);
		this.physics.add.overlap(this.demon, this.superShotArray, () => { this.demon.takeDamage(this.superShotArray[0].damage)}, null, this);
		this.physics.add.overlap(this.demon, this.player.bulletGroup, (player, bullet) => {
			this.demon.takeDamage(this.player.bulletGroup.damage);
			bullet.destroy();
		}, null, this);

		//Set collisions to the entities and the player
		this.physics.add.collider(this.player, layerSuelo);
		this.physics.add.collider(this.demon, layerSuelo);

		//Set player collision with entities
		this.physics.add.collider(this.player, this.demon);

		//Scale Final Boss
		this.demon.scale = 3.5;

		//destroy bullets on terrain collision
        this.physics.add.collider( layerSuelo, this.player.bulletGroup, (bullet, layer) => {bullet.destroy()} );
	}

	startGame(){
		this.scene.start("endScreen");
	}

	update() {
		const cam = this.cameras.main;
		this.player.update();
		this.demon.update();
	}
	
	getHUD() {
		return this.hud;
	}
}
