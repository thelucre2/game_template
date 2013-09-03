Crafty.scene('Game', function() {

  Crafty.viewport.scale(2);
  
	// set up occupied tiles space
	this.occupied = new Array(Game.mapGrid.width);
	for (var i = 0; i < Game.mapGrid.width; i++) {
    this.occupied[i] = new Array(Game.mapGrid.height);
    for (var y = 0; y < Game.mapGrid.height; y++) {
      this.occupied[i][y] = false;
    }
  }

	// setup the player
  this.player = Crafty.e('PlayerCharacter').at(5,5);

  Crafty.viewport.follow(this.player);

  this.occupied[this.player.at().x][this.player.at().y] = true;

  // terrain actors
  var maxVillages = 5;
  for (var x = 0; x < Game.mapGrid.width; x++) {
    for (var y = 0; y < Game.mapGrid.height; y++) {
    	var atEdge = x == 0 || x == Game.mapGrid.width - 1 ||
    			y ==0 || y == Game.mapGrid.height - 1;

    	if(atEdge) {
    		// set tree
    		Crafty.e('Tree').at(x,y);
    		this.occupied[x][y] = true;
    	} else if(Math.random() < 0.06
    						&& !this.occupied[x][y]) {
    		// place a bush
    		Crafty.e('Bush').at(x,y);
    	} else if (Math.random() < 0.02 
    						 && Crafty('Village').length <= maxVillages
    						 && !this.occupied[x][y]) {
        Crafty.e('Village').at(x, y);

      }
    }
  }

  this.player.to(10,2);
  this.teleport = Crafty.e('Teleport').at(5,5);
  this.teleport
    .attr( { telx: 22, tely: 14 });

  this.showVictory = this.bind('VillageVisited', function() {
  	if(!Crafty('Village').length) {
  		Crafty.scene('Victory');
  	}
  });
}, function() {
	this.unbind('VillageVisited', this.showVictory);
});

Crafty.scene('Victory', function() {
	Crafty.e('2D, DOM, Text')
		.attr( {x: 0, y: 0, w: 300} )
		.text('You win: \n\nOne fuckin\' patty...');
	
	this.restartGame = function() {
    Crafty.scene('Game');
  };
	this.bind('KeyDown', this.restartGame)

}, function() {
  this.unbind('KeyDown', this.restartGame);
});