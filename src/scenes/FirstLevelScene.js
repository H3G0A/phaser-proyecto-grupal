import Phaser from 'phaser'
import Player from '../characters/Player';
import HUD from '../HUD/HUD';
import Coin from '../power_ups/Coin';
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


        this.load.image("coin", "res/power_ups/gold_coin.png");
        this.load.image('heart', '../../res/power_ups/heart.png');
        this.load.image('lightning', '../../res/power_ups/blue_power_icon.png');

        this.load.audio('coin', '../../res/audio/coin.mp3');
        this.load.audio('heart', '../../res/audio/heart.mp3');
		this.load.audio('lightning', '../../res/audio/lightning.mp3');
    }

    create(){
        //TILEMAP
        const Yoffset = -956;
        var map = this.make.tilemap({key: "map1"});
        var tiles = map.addTilesetImage("Tileset", "tileset");
        var bgLayer = map.createLayer("background", tiles, 0, 0 + Yoffset);
        var waterLayer = map.createLayer("water", tiles, 0, 0 + Yoffset);
        var groundLayer = map.createLayer("ground", tiles, 0, 0 + Yoffset);
        var propsLayer = map.createLayer("props", tiles, 0, 0 + Yoffset);
        
        groundLayer.setCollisionByExclusion([-1], true);
        
        this.input.on("pointerdown", () => this.scene.start("Level2")); //DEBUG PARA CAMBIAR DE ESCENA HASTA QUE SE AÑADA EL JUGADOR
        
        //PLAYER AND FLAG
        this.flag = this.add.image(9024, 1103 + Yoffset, "flag");
        this.physics.add.existing(this.flag, true);
        this.player = new Player(this, 300, 440, 'player');
        this.physics.add.overlap(this.player, this.flag, this.nextLevel, null, this);
        this.physics.add.collider(this.player, groundLayer, null, null, this);

        //COINS
        var coinsLayer = map.objects[0].objects;
        var coins = this.physics.add.staticGroup();
        for (let i = 0; i < coinsLayer.length; i++) {
            const coin = coinsLayer[i];
            coins.add(new Coin(this, coin.x, coin.y + Yoffset, "coin").setScale(.05));
        }
        this.coinSound = this.sound.add('coin');
       
        //POWER UPS


        //ENEMIES

        
        this.heartSound = this.sound.add('heart');
		this.lightningSound = this.sound.add('lightning');
        this.hud = new HUD(this);
    }

    update(){

    }

    nextLevel(){
        this.scene.start("Level2");
    }
}