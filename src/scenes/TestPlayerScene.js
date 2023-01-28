import Phaser from 'phaser'
import Player from '../characters/Player'
export default class TestPlayerScene extends Phaser.Scene
{
	constructor()
	{
		super('test-player')
	}

	preload()
    {
        this.load.image('sea', '../../res/sea.png')
		this.load.spritesheet('player', '../../res/player/idle/idle-1.png', { frameWidth: 71, frameHeight: 67 });
    }

    create()
    {
        // Add background
		this.add.image(400, 300, 'sea').setScale(8);
        this.cameras.main.setBounds(0, 0, 400 * 2, 300);

        this.cursors = this.input.keyboard.createCursorKeys();

        // Add player
		this.player = new Player(this, 200, 100, 'player');

        this.cursors = this.input.keyboard.createCursorKeys();



        this.cameras.main.startFollow(this.player, true);
    }

    update()
    {
        const cam = this.cameras.main;
        this.player.update();
    }
}