import Phaser from "phaser"
import BossDemon from "../enemies/BossDemon";
import Mummy from '../enemies/Mummy'
import Player from '../characters/Player'

export default class FinalBossScene extends Phaser.Scene {
	constructor(){
        super({key: "boss"});
    }

	preload() {
		this.load.image('tile', 'res/TileseBossStage.png');
		this.load.tilemapTiledJSON('map','res/bossfinal2.json');
		this.load.spritesheet('player', 'res/player/idle/idle_sprite.png', { frameWidth: 71, frameHeight: 67 });
		this.load.spritesheet('demon', '../../res/enemies/hell-beast-id.png', { frameWidth: 55, frameHeight: 67 });
		this.load.spritesheet('player-walk-right', 'res/player/walk/player_walk_right.png', { frameWidth: 71, frameHeight: 67 });
		this.load.spritesheet('player-walk-left', 'res/player/walk/player_walk_left.png', { frameWidth: 71, frameHeight: 67 });
		this.load.spritesheet('player-shoot-right', 'res/player/shoot/shoot_right.png', { frameWidth: 71, frameHeight: 67 });
		this.load.spritesheet('player-shoot-left', 'res/player/shoot/shoot_left.png', { frameWidth: 71, frameHeight: 67 });
		this.load.spritesheet('player-hurt', 'res/player/hurt/hurt.png', { frameWidth: 71, frameHeight: 67 });
		this.load.spritesheet('player-jump', 'res/player/jump/jump_sprite.png', { frameWidth: 71, frameHeight: 67 });
		this.load.image('bullet', '../../res/enemies/bullet.png');
		this.load.image('supershot', '../../res/super_shot.png');
		//this.load.spritesheet('mummy', '../../res/enemies/mummy37x45.png', { frameWidth: 37, frameHeight: 45 });
	}
	create() {
		//Add tile map to the key
		var map = this.make.tilemap({key: 'mapBoss'});

		//Add tileset to the tile
		var tiles = map.addTilesetImage('TileseBossStage', 'tileBoss');

		//Declare layers in order
		var layerFondo = map.createLayer('fondo', tiles, 0, 0);
		var layerMountain = map.createLayer('mountain', tiles, 0, 0);
		var layerProp = map.createLayer('prop', tiles, 0, 0);
		var layerSuelo = map.createLayer('suelo', tiles, 0, 0);

		//Add collider to the layer
		layerSuelo.setCollisionByExclusion([-1] , true);

		// Add player and enemies
		this.player = new Player(this, 200, 100, 'player');
		this.demon = new BossDemon(this, 850, 300, 0, 'demon');

		// Config camera and make follow player
		this.cameras.main.setBounds(0,0,layerFondo.displayWidth, layerFondo.displayHeight);
		this.cameras.main.startFollow(this.player);

		//this.mummy = new Mummy(this, 400, 300, 0, 'mummy');

		this.superShotArray = [];
		// Set collisions damage
		this.physics.add.overlap(this.player, this.demon, () => { this.player.takeDamage(this.demon.damage) }, null, this);
		this.physics.add.overlap(this.demon, this.superShotArray, () => { this.demon.takeDamage(this.superShotArray[0].damage)}, null, this);
		this.physics.add.overlap(this.demon, this.player.bulletGroup, (player, bullet) => {
			this.demon.takeDamage(this.player.bulletGroup.damage);
			bullet.destroy();
		}, null, this);
		//this.physics.add.overlap(this.player, this.mummy, () => { this.player.takeDamage(this.mummy.damage) }, null, this);

		//Set collisions to the entities and the player
		this.physics.add.collider(this.player, layerSuelo);
		this.physics.add.collider(this.demon, layerSuelo);
		//this.physics.add.collider(this.mummy, layerSuelo);

		//Set player collision with entities
		this.physics.add.collider(this.player, this.demon);
		//this.physics.add.collider(this.player, this.mummy);

		//Scale Final Boss
		this.demon.scale = 3.5;

		this.input.on("pointerdown", () => this.scene.start("Level1"));
	}
	update() {
		const cam = this.cameras.main;
		this.player.update();
		this.demon.update();
		//this.mummy.update();
	}
}
