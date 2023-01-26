import Phaser from "phaser"
import BossDemon from "../enemies/BossDemon";
import Mummy from '../enemies/Mummy'
import SamplePlayer from '../SamplePlayer'

export default class FinalBossScene extends Phaser.Scene {

	preload() {
		this.load.image('tile', 'res/TileseBossStage.png');
		this.load.tilemapTiledJSON('map','res/bossfinal2.json');
		this.load.spritesheet('player', 'res/player/idle/idle-1.png', { frameWidth: 71, frameHeight: 67 });
		this.load.spritesheet('demon', '../../res/enemies/hell-beast-idle.png', { frameWidth: 47, frameHeight: 67 });
	}
	create() {

		var map = this.make.tilemap({key: 'map'});

		var tiles = map.addTilesetImage('TileseBossStage', 'tile');

		var layerFondo = map.createLayer('fondo', tiles, 0, 0);
		var layerMountain = map.createLayer('mountain', tiles, 0, 0);
		var layerProp = map.createLayer('prop', tiles, 0, 0);
		var layerSuelo = map.createLayer('suelo', tiles, 0, 0);
		
		layerSuelo.setCollisionByExclusion([-1] , true);
		// Add player and enemies
		this.demon = new BossDemon(this, 200, 300, 0, 'demon');
		this.player = new SamplePlayer(this, 0, 0, 'player');
		// Set collisions
		this.physics.add.overlap(this.player, this.demon, () => { this.player.takeDamage(this.demon.damage) }, null, this);
		this.physics.add.collider(this.player, layerSuelo);
		this.physics.add.collider(this.demon, layerSuelo);
	}
	update() {
		this.demon.update();
		this.player.update();
	}
}
