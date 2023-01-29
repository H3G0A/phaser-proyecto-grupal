import Phaser from 'phaser'
export default class ThirdLevelScene extends Phaser.Scene
{
    constructor(){
        super({key: "Level3"});
    }

    preload(){
        this.load.tilemapTiledJSON("map3", "res/levels/level3.json");
    }

    create(){
        //TILEMAP
        const Yoffset = -2524;
        var map = this.make.tilemap({key: "map3"});
        var tiles = map.addTilesetImage("Tileset", "tileset");
        var bgLayer = map.createLayer("background", tiles, 0, 0 + Yoffset);
        var waterLayer = map.createLayer("water", tiles, 0, 0 + Yoffset);
        var groundLayer = map.createLayer("ground", tiles, 0, 0 + Yoffset);
        var propsLayer = map.createLayer("props", tiles, 0, 0 + Yoffset);

        groundLayer.setCollisionByExclusion([], true);

        this.input.on("pointerdown", () => this.scene.start("enemy"));

        //PLAYER AND FLAG
        this.flag = this.add.image(10850, 2351 + Yoffset, "flag");
        this.physics.add.existing(this.flag, true);
        this.player = null; //PLACEHOLDER PARA EL JUGADOR
        this.physics.add.overlap(this.player, this.flag, this.nextLevel, null, this);
    }

    update(){

    }

    nextLevel(){
        this.scene.start("Level1");
    }
}