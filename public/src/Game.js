Game = {
	// grid size and tile size
	mapGrid: {
		width: 20,
		height: 20,
		tile: {
			width: 32,
			height: 32
		}
	},

	// the total width of the game screen
	width: function() {
		return Game.mapGrid.width * Game.mapGrid.tile.width
	},

	// total game screen height
	height: function() {
		return Game.mapGrid.height * Game.mapGrid.tile.height
	},

  // Initialize and start our game
  start: function() {

    // Start crafty and set a background color so that we can see it's working
    Crafty.init(Game.width(), Game.height());
    Crafty.viewport.init(640,480);
    Crafty.background( 'rgb(249, 223, 125)' );

    // start the scene (for event emitters?)
    Crafty.scene('Game');
    //Crafty.viewport.scale(2);
  }
}