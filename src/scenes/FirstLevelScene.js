import Phaser from 'phaser'
export default class FirstLevelScene extends Phaser.Scene
{
    constructor(){
        super({key: "Level1"});
    }

    preload(){
        this.load.image("tileset", "res/Tileset.png");
        this.load.image("flag", "res/flag.png");
        this.load.tilemapTiledJSON("map1", "res/levels/level1.json");
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
        
        groundLayer.setCollisionByExclusion([], true);
        
        this.input.on("pointerdown", () => this.scene.start("Level2")); //DEBUG PARA CAMBIAR DE ESCENA HASTA QUE SE AÑADA EL JUGADOR
        
        //PLAYER AND FLAG
        this.flag = this.add.image(9024, 1103 + Yoffset, "flag");
        this.physics.add.existing(this.flag, true);
        this.player = null; //PLACEHOLDER PARA EL JUGADOR
        this.physics.add.overlap(this.player, this.flag, this.nextLevel, null, this);
    }

    update(){

    }

    nextLevel(){
        this.scene.start("Level2");
    }
}