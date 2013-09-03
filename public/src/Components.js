// Grid allows an element to be on a grid of tiles
Crafty.c('Grid', {
	init: function() {
		this.attr({
			w: Game.mapGrid.tile.width,
			h: Game.mapGrid.tile.height
		})
	},

	// locate this entity at a position on the grid
	at: function(x,y) {
		if (x === undefined || y === undefined ) {
			return { x: this.x / Game.mapGrid.tile.width,
							 y: this.y / Game.mapGrid.tile.width }
		} else {
			this.attr({ x: x * Game.mapGrid.tile.width,
									y: y * Game.mapGrid.tile.height });
			return this;
		}
	}
});

Crafty.c('Actor', {
	init: function() {
		this.requires('2D, Canvas, Grid');
	},

	to: function(x,y) {
		this.x = x * Game.mapGrid.tile.width;
		this.y = y * Game.mapGrid.tile.height;
	}
});

Crafty.c('Teleport', {
	init: function() {
		this.requires('Actor, Color')
			.color( 'rgb(180, 200, 255)' );
		this.attr( { telx: 1, tely: 1 });
	},

	collect: function() {
		Crafty.trigger('TeleportHit', this);
	}
});

Crafty.c('PlayerCharacter', {
	init: function() {
		this.requires('Actor, Fourway, Color, Collision')
			.fourway(4)
			.color( 'rgb(20, 75, 40)' )
			.stopOnSolids()
			.onHit('Village', this.visitVillage)
			.onHit('Teleport', this.teleport);
	},

	stopOnSolids: function() {
		this.onHit('Solid', this.stopMovement );
		return this;
	},

	stopMovement: function() {
		this._speed = 0;
		if (this._movement) {
			this.x -= this._movement.x;
			this.y -= this._movement.y;
		}
	},

	visitVillage: function(data) {
		village = data[0].obj;
		village.collect();
	},

	teleport: function(data) {
		teleport = data[0].obj;
		this.to( teleport.telx, teleport.tely );
	}
});

Crafty.c('Village', {
	init: function() {
		this.requires('Actor, Color')
			.color( 'rgb(170, 125, 40)');
	},

	collect: function() {
		this.destroy();
		Crafty.trigger('VillageVisited', this);
	}
});

Crafty.c('Tree', {
	init: function() {
		this.requires('Actor, Solid, Color');
		this.color( 'rgb(5, 105, 10)' );
	}
});

Crafty.c('Bush', {
	init: function() {
		this.requires('Actor, Solid, Color');
		this.color('rgb(20, 185, 40)');
	}
});