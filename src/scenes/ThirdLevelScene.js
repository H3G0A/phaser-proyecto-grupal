import Phaser from 'phaser'
export default class ThirdLevelScene extends Phaser.Scene
{
    constructor(){
        super("Level1");
    }

    preload(){
        this.load.image("tileset", "res/Tileset.png");
        this.load.tilemapTiledJSON("map", "res/levels/level3.json");
    }

    create(){
        var map = this.make.tilemap({key: "map"});
        var tiles = map.addTilesetImage("Tileset", "tileset");
        var bgLayer = map.createLayer("background", tiles, 0, -2524);
        var waterLayer = map.createLayer("water", tiles, 0, -2524);
        var groundLayer = map.createLayer("ground", tiles, 0, -2524);
        var propsLayer = map.createLayer("props", tiles, 0, -2524);

        groundLayer.setCollisionByExclusion([], true);
    }

    update(){

    }
}