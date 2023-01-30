import Phaser from 'phaser'
import Player from '../characters/Player';
import Koopa from '../enemies/Koopa';
import Mummy from '../enemies/Mummy';
import Soldier from '../enemies/Soldier';
import HUD from '../HUD/HUD';
import MovingPlatform from '../MovingPlatform';
import Coin from '../power_ups/Coin';
import Heart from '../power_ups/Heart';
import Lightning from '../power_ups/Lightning';
import Star from '../power_ups/Star';
import Trampoline from '../Trampoline';
export default class FirstLevelScene extends Phaser.Scene
{
    constructor(){
        super({key: "Level1"});
    }

    preload(){
        this.load.image("tileset", "res/Tileset.png");
        this.load.image("flag", "res/flag.png");
        this.load.tilemapTiledJSON("map1", "res/levels/level1.json");

        this.load.spritesheet('player', '../../res/player/idle/idle_sprite.png', { frameWidth: 71, frameHeight: 67 });
        this.load.spritesheet('player-walk-right', 'res/player/walk/player_walk_right.png', { frameWidth: 71, frameHeight: 67 });
		this.load.spritesheet('player-walk-left', 'res/player/walk/player_walk_left.png', { frameWidth: 71, frameHeight: 67 });
		this.load.spritesheet('player-shoot-right', 'res/player/shoot/shoot_right.png', { frameWidth: 71, frameHeight: 67 });
		this.load.spritesheet('player-shoot-left', 'res/player/shoot/shoot_left.png', { frameWidth: 71, frameHeight: 67 });
		this.load.spritesheet('player-hurt', 'res/player/hurt/hurt.png', { frameWidth: 71, frameHeight: 67 });
		this.load.spritesheet('player-jump', 'res/player/jump/jump_sprite.png', { frameWidth: 71, frameHeight: 67 });
        this.load.spritesheet('run-shoot-right', 'res/player/run-shoot/run-shoot-right.png', { frameWidth: 71, frameHeight: 67 });
        this.load.spritesheet('run-shoot-left', 'res/player/run-shoot/run-shoot-left.png', { frameWidth: 71, frameHeight: 67 });

        this.load.spritesheet('mummy', '../../res/enemies/mummy37x45.png', { frameWidth: 37, frameHeight: 45 });
		this.load.spritesheet('player', '../../res/player/idle/idle_sprite.png', { frameWidth: 71, frameHeight: 67 });
		this.load.atlas('soldier', '../../res/enemies/soldier_spritesheet.png', '../../res/enemies/soldier_spritesheet.json');
		this.load.image('bullet', '../../res/enemies/bullet.png');
		this.load.atlas('koopa', '../../res/enemies/koopa.png', '../../res/enemies/koopa_spritesheet.json');

        this.load.image('bullet', '../../res/enemies/bullet.png');
		this.load.image('supershot', '../../res/super_shot.png');


        this.load.image("coin", "res/power_ups/gold_coin.png");
        this.load.image('heart', '../../res/power_ups/heart.png');
        this.load.image('lightning', '../../res/power_ups/blue_power_icon.png');
        this.load.image('star', '../../res/power_ups/star.png');

        this.load.image('box', '../../res/box.png');
        this.load.spritesheet('trampoline', '../../res/trampoline_mushroom.png', { frameWidth: 64, frameHeight: 31 });

        this.load.audio('coin', '../../res/audio/coin.mp3');
		this.load.audio('heart', '../../res/audio/heart.mp3');
		this.load.audio('lightning', '../../res/audio/lightning.mp3');
		this.load.audio('star', '../../res/audio/star.mp3');
		this.load.audio('super_shot', '../../res/audio/super_shot.mp3');
    }

    create(){
        //TILEMAP
        this.Yoffset = -956;
        this.deathLimit = 1660 + this.Yoffset; //When the player reach this height, kill him
        var map = this.make.tilemap({key: "map1"});
        var tiles = map.addTilesetImage("Tileset", "tileset");
        var bgLayer = map.createLayer("background", tiles, 0, 0 + this.Yoffset);
        var waterLayer = map.createLayer("water", tiles, 0, 0 + this.Yoffset);
        var groundLayer = map.createLayer("ground", tiles, 0, 0 + this.Yoffset);
        var propsLayer = map.createLayer("props", tiles, 0, 0 + this.Yoffset);
        groundLayer.setCollisionByExclusion([-1], true);

        //COINS
        var coinsLayer = map.objects[0].objects;
        this.coins = [];
        for (let i = 0; i < coinsLayer.length; i++) {
            const coin = coinsLayer[i];
            this.coins.push(new Coin(this, coin.x, coin.y + this.Yoffset, "coin").setScale(.05));
        }
        //HEARTS
        var heartsLayer = map.objects[1].objects;
        this.hearts = [];
        for (let i = 0; i < heartsLayer.length; i++) {
            const heart = heartsLayer[i];
            this.hearts.push(new Heart(this, heart.x, heart.y + this.Yoffset, "heart").setScale(.05));
        }
        //POWER UPS
        var lightningsLayer = map.objects[2].objects;
        this.lightnings = [];
        for (let i = 0; i < lightningsLayer.length; i++) {
            const lightning = lightningsLayer[i];
            this.lightnings.push(new Lightning(this, lightning.x, lightning.y + this.Yoffset, "lightning").setScale(.05));
        }
        this.superShotArray = [];
        this.superShotKey = this.input.keyboard.addKey('X');

        var starsLayer = map.objects[3].objects;
        this.stars = [];
        for (let i = 0; i < starsLayer.length; i++) {
            const star = starsLayer[i];
            this.stars.push(new Star(this, star.x, star.y + this.Yoffset, "star").setScale(.05));
        }
        //ENEMIES
            //Mummies
        var mummiesLayer = map.objects[4].objects;
        this.mummies = [];
        for (let i = 0; i < mummiesLayer.length; i++) {
            const mummy = mummiesLayer[i];
            this.mummies.push(new Mummy(this, mummy.x, mummy.y + this.Yoffset, 200, "mummy"));
        }
            //Soldiers
        var soldiersLayer = map.objects[5].objects;
        this.soldiers = [];
        for (let i = 0; i < soldiersLayer.length; i++) {
            const soldier = soldiersLayer[i];
            this.soldiers.push(new Soldier(this, soldier.x, soldier.y + this.Yoffset, "soldier"));
        }
            //Koopas
        var koopasLayer = map.objects[6].objects;
        this.koopas = [];
        for (let i = 0; i < koopasLayer.length; i++) {
            const koopa = koopasLayer[i];
            this.koopas.push(new Koopa(this, koopa.x, koopa.y + this.Yoffset, 130, "koopa"));
        }
        //BOXES
        var boxesLayer = map.objects[7].objects;
        this.boxes = [];
        for (let i = 0; i < boxesLayer.length; i++) {
            const box = boxesLayer[i];
            this.boxes.push(new MovingPlatform(this, box.x, box.y + this.Yoffset, "box", box.properties[0].value, box.y + this.Yoffset));
        }
        //JUMPING PADS
        var jumpPadsLayer = map.objects[8].objects;
        this.jumpPads = [];
        for (let i = 0; i < jumpPadsLayer.length; i++) {
            const pad = jumpPadsLayer[i];
            this.jumpPads.push(new Trampoline(this, pad.x, pad.y + 17 + this.Yoffset, "trampoline"));
        }
        //PLAYER AND FLAG
        this.flag = this.add.image(9024, 1103 + this.Yoffset, "flag");
        this.physics.add.existing(this.flag, true);

        this.player = new Player(this, 300, 400, 'player');
        this.hud = new HUD(this);
		this.cameras.main.setBounds(0, this.Yoffset, bgLayer.displayWidth, bgLayer.displayHeight);
		this.cameras.main.startFollow(this.player);

        //SET COLLISIONS
        this.physics.add.collider(this.player, groundLayer);
        this.boxes.forEach(box => {this.physics.add.collider(box, this.player, this.collidePlayerPlatform, null, this)});
        this.jumpPads.forEach(pad => {this.physics.add.collider(this.player, pad, () => { this.player.bounce(-600) }, null, this)});
        this.physics.add.overlap(this.player, this.flag, this.nextLevel, null, this);

            //Enemies
        this.mummies.concat(this.soldiers).concat(this.koopas).forEach(enemy => {
            this.physics.add.collider(enemy, groundLayer);
            this.physics.add.overlap(this.player, enemy, () => { this.player.takeDamage(enemy.damage) }, null, this);
            this.physics.add.overlap(enemy, this.superShotArray, () => { enemy.takeDamage(this.superShotArray[0].damage)}, null, this);
            this.physics.add.overlap(enemy, this.player.bulletGroup, (e, bullet) => {
                enemy.takeDamage(this.player.bulletGroup.damage);
                bullet.destroy();
            });
        });
        this.soldiers.forEach(soldier => {
            this.physics.add.overlap(this.player, soldier.bulletGroup, (player, bullet) => {
                this.player.takeDamage(soldier.damage);
                bullet.destroy();
            })
        })
        this.physics.add.collider(groundLayer, this.player.bulletGroup, (layer, bullet) => {bullet.destroy()} )//destroy bullets on terrain collision

            //Power ups
        this.coins.concat(this.hearts).concat(this.lightnings).concat(this.stars).forEach(powerUp => {
            this.physics.add.overlap(this.player, powerUp, () => {powerUp.executePowerUpAction(this.player, this.hud)})
        });

        //SET SOUNDS
        this.coinSound = this.sound.add('coin');
		this.heartSound = this.sound.add('heart');
		this.lightningSound = this.sound.add('lightning');
		this.starSound = this.sound.add('star');
		this.superShotSound = this.sound.add('super_shot');
    }

    update(){
        const cam = this.cameras.main;
		this.player.update();
        this.mummies.concat(this.soldiers).concat(this.koopas).forEach(enemy => {enemy.update()});

        if (this.player.currentPlatform){
			if (this.player.currentPlatform.body.touching.none){
				this.player.isOnPlatform = false;
				this.player.currentPlatform = undefined;
			}
		}

        if (this.player.y >= this.deathLimit){
            this.player.takeDamage(100);
        }
    }

    nextLevel(){
        this.scene.start("Level2");
    }

    getHUD() {
		return this.hud;
	}

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