'use strict';

var drugLord = angular.module('drugLord',[]);

drugLord.controller('gameController',['$scope','cityService','playerService','actionService','warehouseService','placeService',function($scope,cityServ,player,action,ware,place){
	$scope.start = false;

	$scope.startNewGame = function() {
		console.log("Hello");
		player.init();
		cityServ.initCities();
		$scope.setupPlayer();
		$scope.setupCityNMarket();
        $scope.storInventory=place.initInventory;
        var startBtn=document.getElementById("start");
        startBtn.innerHTML="Restart";
        startBtn.className="btn btn-warning col-xs-5";
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
	
	//action service
	$scope.buyDrug = action.buyDrug;
	$scope.sellDrug = action.sellDrug;
	$scope.dumpDrug = action.dumpDrug;
   
     //warehouse Service
	$scope.whdrugs = ware.whdrugs;
	$scope.selectedDrugWareHouse = ware.selectedDrugWareHouse;
    
      //place service
    $scope.selectedSellInvItem=place.selectInvItem;
    $scope.buyArray=place.buyItems;
    $scope.buyInventoryItem=place.buyItem;
    $scope.sellBuyInvItem=place.sellItem;
    $scope.selectedBuyInvItems=place.selectedBuyInvItems;
    $scope.vault=place.vault;
    $scope.moveInVault=place.pushInvault;
    $scope.pushInPocket=place.pushInPocket;
    $scope.selectVaultItems=place.selectVaultItems;
    $scope.bankOperation = place.bankOperation;
    $scope.payLone=place.payLone;
	
    //watch function
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