import Phaser from "phaser"
import BossDemon from "../enemies/BossDemon";
import Mummy from '../enemies/Mummy'
import SamplePlayer from '../SamplePlayer'

export default class FinalBossScene extends Phaser.Scene {

	preload() {
		this.load.image('tile', 'res/TileseBossStage.png');
		this.load.tilemapTiledJSON('map','res/bossfinal2.json');
		this.load.spritesheet('player', 'res/player/idle/idle-1.png', { frameWidth: 71, frameHeight: 67 });		
		this.load.spritesheet('demon', '../../res/enemies/hell-beast-id.png', { frameWidth: 55, frameHeight: 67 });	
		//this.load.spritesheet('mummy', '../../res/enemies/mummy37x45.png', { frameWidth: 37, frameHeight: 45 });	
	}
	create() {
		//Add tile map to the key
		var map = this.make.tilemap({key: 'map'});

		//Add tileset to the tile
		var tiles = map.addTilesetImage('TileseBossStage', 'tile');

		//Declare layers in order
		var layerFondo = map.createLayer('fondo', tiles, 0, 0);
		var layerMountain = map.createLayer('mountain', tiles, 0, 0);
		var layerProp = map.createLayer('prop', tiles, 0, 0);
		var layerSuelo = map.createLayer('suelo', tiles, 0, 0);
		
		//Add collider to the layer
		layerSuelo.setCollisionByExclusion([-1] , true);

		// Add player and enemies

		this.player = new SamplePlayer(this, 100, 0, 'player');
		this.demon = new BossDemon(this, 850, 300, 0, 'demon');
		//this.mummy = new Mummy(this, 400, 300, 0, 'mummy');
		
		// Set collisions damage
		this.physics.add.overlap(this.player, this.demon, () => { this.player.takeDamage(this.demon.damage) }, null, this);
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
	}
	update() {
		this.player.update();
		this.demon.update();
		//this.mummy.update();
	}
}
