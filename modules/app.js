'use strict';

var drugLord = angular.module('drugLord',[]);

drugLord.controller('gameController',['$scope','cityService','playerService','actionService','warehouseService','tomorrowService',function($scope,cityServ,player,action,ware,tomm){
	$scope.start = false;

	$scope.startNewGame = function() {
		console.log("Hello");
		player.init();
		cityServ.initCities();
		$scope.setupPlayer();
		$scope.setupCityNMarket();

		var startBtn = document.getElementById("start");
		startBtn.innerHTML = "Restart";
		startBtn.className = "btn btn-warning col-xs-5";

		$scope.start = true;
	};

	$scope.setupPlayer = function(){
		$scope.playerName = player.name;
		$scope.playerCash = player.cash;
		$scope.playerDebt = player.debt;
		$scope.playerBank = player.bank;
		$scope.playerHealth = player.health;
		$scope.playerRank = player.rank;
		$scope.playerDays = player.dayCount;
		$scope.playerDaysLeft = player.day;
		$scope.playerCity = cityServ.currCity.name;
		$scope.pocketSize = player.pocket;
	};

	$scope.setupCityNMarket = function(){
		$scope.drugs = cityServ.currCity.market;
	};

	//other stuff
	$scope.selectedDrug = cityServ.selectedDrug;
	$scope.buyDrug = action.buyDrug;
	$scope.sellDrug = action.sellDrug;
	$scope.dumpDrug = action.dumpDrug;

	$scope.whdrugs = ware.whdrugs;
	$scope.selectedDrugWareHouse = ware.selectedDrugWareHouse;

	$scope.flyAway = function() {
		$scope.destinations = cityServ.getCityNames();
	};

	$scope.flyToCity = tomm.flyAway;

	$scope.$watch(function(){
		return player.cash;
	},function(newValue){
		if($scope.start) {
			$scope.setupPlayer();
		}
	});

	


	$scope.endGame = function() {
        var storage = window.localStorage;
        storage.setItem('DrugLordScore',""+play.name+","+play.cash);

        var injector = angular.injector();
        injector.invoke(['$rootScope',function($rootScope){
            $rootScope.$apply(function() {
                $rootScope.templateUrl = null;
            });
        }]);

        injector.get('$browser').destroy();
        injector = null;
        var host = document.getElementById('container');
        var parent = host.parentNode;
        angular.element(host).remove();
        angular.element(parent).append(host);

        console.log(storage);
    };
}]);