'use strict';

drugLord.service('playerService',[function() {
	var scope = this;

	scope.init = function() {
		scope.name = window.prompt('Please enter your name.');
		if(scope.name.length < 1) {
			scope.name = "GuestPlayer";
		}

		scope.index = 0;
		scope.cash = 1990;
		scope.bank = 0;
		scope.debt = 1000;
		scope.health = 100;
		scope.dayCount = 0;

		scope.ranks = ['Wannabe','Small Time Operator','Dealer','Big Time Dealer','Distributor'];
		scope.days = [30,35,40,45,50];
		scope.pockets = [10,25,100,600,2000];

		scope.rank = scope.ranks[scope.index];
		scope.day = scope.days[scope.index];
		scope.pocket = scope.pockets[scope.index];

		if(scope.cash < 40000) {
			setUpStuff(0);
		} else if (scope.cash < 100000) {
			setUpStuff(1);
		} else if (scope.cash < 500000) {
			setUpStuff(2);
		} else if (scope.cash < 1000000) {
			setUpStuff(3);
		} else if (scope.cash < 2000000) {
			setUpStuff(4);
		}

		function setUpStuff(ind) {
			scope.rank = scope.ranks[ind];
			scope.day = scope.days[ind];
			scope.pocket = scope.pockets[ind];
		}
	};


}]);