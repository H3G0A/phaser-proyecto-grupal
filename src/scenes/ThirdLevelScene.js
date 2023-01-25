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
        var map = this.make.tilemap({key: "map3"});
        var tiles = map.addTilesetImage("Tileset", "tileset");
        var bgLayer = map.createLayer("background", tiles, 0, -2524);
        var waterLayer = map.createLayer("water", tiles, 0, -2524);
        var groundLayer = map.createLayer("ground", tiles, 0, -2524);
        var propsLayer = map.createLayer("props", tiles, 0, -2524);

        groundLayer.setCollisionByExclusion([], true);

        this.input.on("pointerdown", () => this.scene.start("Level1"));
    }

    update(){

    }
}