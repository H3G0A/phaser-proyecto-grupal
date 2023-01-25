import Phaser from 'phaser'
export default class FirstLevelScene extends Phaser.Scene
{
    constructor(){
        super({key: "Level1"});
    }

    preload(){
        this.load.image("tileset", "res/Tileset.png");
        this.load.tilemapTiledJSON("map1", "res/levels/level1.json");
    }

    create(){
        var map = this.make.tilemap({key: "map1"});
        var tiles = map.addTilesetImage("Tileset", "tileset");
        var bgLayer = map.createLayer("background", tiles, 0, -956);
        var waterLayer = map.createLayer("water", tiles, 0, -956);
        var groundLayer = map.createLayer("ground", tiles, 0, -956);
        var propsLayer = map.createLayer("props", tiles, 0, -956);
        console.log(groundLayer)

        groundLayer.setCollisionByExclusion([], true);

        this.input.on("pointerdown", () => this.scene.start("Level2"));
    
    }

    update(){

    }
}