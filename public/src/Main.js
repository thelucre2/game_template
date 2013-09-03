Game = {
	// grid size and tile size
	mapGrid: {
		width: 24,
		height: 16,
		tile: {
			width: 16,
			height: 16
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
    Crafty.background( 'rgb(249, 223, 125)' );

    Crafty.e('PlayerCharacter').at(5,5);

    // terrain actors
    var maxVillages = 5;
    for (var x = 0; x < Game.mapGrid.width; x++) {
      for (var y = 0; y < Game.mapGrid.height; y++) {
      	var atEdge = x == 0 || x == Game.mapGrid.width - 1 ||
      			y ==0 || y == Game.mapGrid.height - 1;

      	if(atEdge) {
      		// set tree
      		Crafty.e('Tree').at(x,y);
      	} else if(Math.random() < 0.06) {
      		// place a bush
      		Crafty.e('Bush').at(x,y);
      	} else if (Math.random() < 0.02 && Crafty('Village').length <= maxVillages) {
          Crafty.e('Village').at(x, y);

        }
      }
    }
  }
}