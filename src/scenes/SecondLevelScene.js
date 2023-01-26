import Phaser from 'phaser'
export default class SecondLevelScene extends Phaser.Scene
{
    constructor(){
        super({key: "Level2"});
    }

    preload(){
        this.load.tilemapTiledJSON("map2", "res/levels/level2.json");
    }

    create(){
        const Yoffset = -2524;
        var map = this.make.tilemap({key: "map2"});
        var tiles = map.addTilesetImage("Tileset", "tileset");
        var bgLayer = map.createLayer("background", tiles, 0, 0 + Yoffset);
        var waterLayer = map.createLayer("water", tiles, 0, 0 + Yoffset);
        var groundLayer = map.createLayer("ground", tiles, 0, 0 + Yoffset);
        var propsLayer = map.createLayer("props", tiles, 0, 0 + Yoffset);

        groundLayer.setCollisionByExclusion([], true);

        this.input.on("pointerdown", () => this.scene.start("Level3"));
        this.flag = this.add.image(10784, 3022 + Yoffset, "flag");
        this.physics.add.existing(this.flag, true);
        this.player = null; //PLACEHOLDER PARA EL JUGADOR
        this.physics.add.overlap(this.player, this.flag, this.nextLevel, null, this);
    }

    update(){

    }

    nextLevel(){
        this.scene.start("Level3");
    }
}