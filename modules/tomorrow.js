'use strict';

drugLord.service('tomorrowService',['cityService','playerService',function(cityServ, player) {
	var scope = this;

	scope.stayHere = function() {
		cityServ.initCities();
		player.dayCount += 1;
		player.cash -= 10;
	};

	scope.flyAway = function() {
		cityServ.flyToCity();
		player.dayCount += 1;
		player.cash -= 10;
	};
}]);