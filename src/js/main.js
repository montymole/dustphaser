var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-game', {
        preload: preload,
        create: create,
        update: update,
        render: render
    }),

    cursors;

function preload() {

    game.stage.backgroundColor = '#888';

    game.load.spritesheet('test', '/img/test.png', 64, 64, 3);
}


function create() {

	for (var i = 10; i >= 0; i--) {
		spriteTest();
	};
	

    cursors = game.input.keyboard.createCursorKeys();

}

function update() {

}


function render() {
    game.debug.inputInfo(32, 32);
}

function spriteTest() {

    var mySpr = game.add.sprite(Math.random()*300, Math.random()*300, 'test');
    mySpr.animations.add('w');
    mySpr.animations.play('w', 15, true);

    return mySpr;
}
