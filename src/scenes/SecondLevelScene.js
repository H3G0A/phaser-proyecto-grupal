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
export default class SecondLevelScene extends Phaser.Scene
{
    constructor(){
        super({key: "Level2"});
    }

    preload(){
        this.load.tilemapTiledJSON("map2", "res/levels/level2.json");
    }

    create(){
        //TILEMAP
        this.Yoffset = -2524;
        this.deathLimit = 3254 + this.Yoffset; //When the player reach this height, kill him
        var map = this.make.tilemap({key: "map2"});
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
        this.flag = this.add.image(10815, 3022 + this.Yoffset, "flag");
        this.physics.add.existing(this.flag, true);

        this.player = new Player(this, 128, 2753 + this.Yoffset, 'player');
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
            //destroy bullets on terrain collision
        this.physics.add.collider( groundLayer, this.player.bulletGroup, (bullet, layer) => {bullet.destroy()} );

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
        this.scene.start("Level3");
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

    startGame() {
        this.scene.start('Level2');
    }
}