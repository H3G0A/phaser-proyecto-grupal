import Phaser from "phaser"
import Mummy from '../enemies/Mummy'
import Soldier from '../enemies/Soldier'
import Player from '../characters/Player'
import Koopa from "../enemies/Koopa"
import Trampoline from "../Trampoline"

export default class HelloWorldScene extends Phaser.Scene {
	constructor() {
		super('hello-world')
	}

	preload() {
		this.load.image('sea', '../../res/sea.png');
		this.load.spritesheet('mummy', '../../res/enemies/mummy37x45.png', { frameWidth: 37, frameHeight: 45 });
		this.load.spritesheet('player', '../../res/player/idle/idle_sprite.png', { frameWidth: 71, frameHeight: 67 });
		this.load.atlas('soldier', '../../res/enemies/soldier_spritesheet.png', '../../res/enemies/soldier_spritesheet.json');
		this.load.image('bullet', '../../res/enemies/bullet.png');
		this.load.atlas('koopa', '../../res/enemies/koopa.png', '../../res/enemies/koopa_spritesheet.json');
		this.load.spritesheet('player-walk', 'res/player/walk/player_walk.png', { frameWidth: 71, frameHeight: 67 });
		this.load.spritesheet('player-shoot', 'res/player/shoot/shoot.png', { frameWidth: 71, frameHeight: 67 });
		this.load.spritesheet('player-hurt', 'res/player/hurt/hurt.png', { frameWidth: 71, frameHeight: 67 });
		this.load.spritesheet('player-jump', 'res/player/jump/jump_sprite.png', { frameWidth: 71, frameHeight: 67 });

		this.load.spritesheet('trampoline', '../../res/trampoline_mushroom.png', { frameWidth: 64, frameHeight: 31 });
	}

	create() {
		// Add background
		this.add.image(400, 300, 'sea').setScale(8);

		// Add player and enemies
		this.player = new Player(this, 0, 550, 'player');
		this.mummy = new Mummy(this, 550, 550, 100, 'mummy');
		this.soldier = new Soldier(this, 800, 550, 'soldier');
		this.koopa = new Koopa(this, 300, 450, 100, 'koopa');

		// Add trampoline
		this.trampoline = new Trampoline(this, 175, 600, 'trampoline');

		// Set collisions
		this.physics.add.overlap(this.player, this.mummy, () => { this.player.takeDamage(this.mummy.damage) }, null, this);
		this.physics.add.overlap(this.player, this.soldier, () => { this.player.takeDamage(this.soldier.damage) }, null, this);
		this.physics.add.overlap(this.player, this.soldier.bulletGroup, () => { this.player.takeDamage(this.soldier.damage) }, null, this);
		this.physics.add.overlap(this.player, this.koopa, () => { this.player.takeDamage(this.koopa.damage) }, null, this);

		this.physics.add.collider(this.player, this.trampoline, () => { this.player.bounce(-600) }, null, this);

		// To test health of the enemy
		//this.physics.add.overlap(this.player, this.mummy, () => { this.mummy.takeDamage(this.player.damage) }, null, this);

	}

	update() {
		this.mummy.update();
		this.soldier.update();
		this.koopa.update();
		this.player.update();
	}
}
