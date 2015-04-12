
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-game', { create: create });

function create() {

    var text = "- phaser.io. gulp, dust, redis-cache, openresty";
    var style = { font: "30px Arial", fill: "#ff0044", align: "center" };

    var t = game.add.text(game.world.centerX-300, 0, text, style);

}
