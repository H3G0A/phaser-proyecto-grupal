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
        var map = this.make.tilemap({key: "map2"});
        var tiles = map.addTilesetImage("Tileset", "tileset");
        var bgLayer = map.createLayer("background", tiles, 0, -2524);
        var waterLayer = map.createLayer("water", tiles, 0, -2524);
        var groundLayer = map.createLayer("ground", tiles, 0, -2524);
        var propsLayer = map.createLayer("props", tiles, 0, -2524);
        console.log(groundLayer)

        groundLayer.setCollisionByExclusion([], true);

        this.input.on("pointerdown", () => this.scene.start("Level3"));
    }

    update(){

    }
}