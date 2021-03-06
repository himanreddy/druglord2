'use strict';

drugLord.service('cityService',['drugService',function(dcs){
	var scope = this;
	scope.cities = ["Austin, USA", "Beijing, China", "Boston, USA", "Detroit, USA", "London, England", "Los Angeles, USA", "Miami, USA", "Moscow, Russia", "New York, USA", "Paris, France", "San Francisco, USA", "St. Peteresburg, Russia", "Sydney, Australia", "Toronto, Canada", "Vancouver, Canada"];

	scope.initCities = function() {
		console.log("initcities");
		scope.init();
		scope.initVault();
	};

	scope.init = function() {
		scope.cityObjs = [];
		for(var i = 0, n = scope.cities.length; i < n; i++) {
			scope.cityObjs.push(
				{
					name : scope.cities[i], 
					drugs : dcs.getDrugs(), 
					market : dcs.initMarket(), 
					isHere : false
				}
			);
		}
		console.log(scope.cityObjs);
		scope.currCity = scope.cityObjs[0];
		scope.currCity.isHere = true;
	};

	scope.flyToCity = function(cityName) {
		scope.init();
		for(var i =0, n = scope.cityObjs.length; i < n; i++) {
			if (scope.cityObjs[i].name == cityName) {
				scope.currCity = scope.cityObjs[i];
				scope.currCity.isHere = true;
				continue;
			};
			scope.cityObjs[i].isHere = false;
		}
	};

	scope.getCityNames = function() {
			var arr = new Array();
			for(var i =0, n = scope.cityObjs.length; i < n; i++) {
				if(scope.cityObjs[i].isHere) {
					continue;
				}
				arr.push(scope.cityObjs[i].name);
			}

		return arr;
	};

	scope.getCityObjs = function() {
		return scope.cityObjs;
	};

	scope.initVault = function() {
		scope.cityVault = [];
		for(var i =0, n = scope.cities.length; i<n; i++) {
			scope.cityVault.push({name:scope.cities[i],vault:[]});
		}
	};

	scope.getCityVault = function(name) {
		for(var i=0, n=scope.cityVault.length; i < n; i++) {
			if(scope.cityVault[i].name == name) {
				return scope.cityVault[i];
			}
		}
	};

    scope.vaultInfo=[];
	
	scope.cityVaultsInfo = function() {
		console.log("inside cityVaultsInfo");
		for(var i =0, n = scope.getCityObjs().length;i<n; i++) 
		{
			if(scope.cityObjs[i].vault.length > 0) 
			{
				       if(!isNaN(scope.vaultsInfo))
				       {
				       	  var flag = scope.check(i,scope.valtsInfo,scope.cityObjs);
				          if(flag == scope.valtsInfo.length)
				         {
				           scope.vaultInfo.push({name:scope.cityObjs[i].name,vault:scope.cityObjs[i].vault}); 
				         }
				         else
				         {
				       	   scope.vaultInfo.vault[flag].qty=scope.cityObjs[i].vault.qty;
				         }
				       }
				       else
				       {
				       	  scope.vaultInfo.push({name:scope.cityObjs[i].name,vault:scope.cityObjs[i].vault});
						}			
			}

		}
	};
	scope.check=function(i,obj1,obj2) {
		var flag=0;
		for( var j=0;j<obj1.length;j++)
		{
		   console.log("inside check");
		if( obj1[j].name == obj2[i].name )
		{
		  break;
		}
		flag++;
		}
		return flag;
	};			

	scope.getVaultInfo = function(){
		return scope.vaultInfo;
	};

	scope.prevTarget = null;
    scope.selectedDrug = function(e,index) {
        //first mark all selected value to false
        for(var i=0; i < scope.currCity.market.length; i++) {
            scope.currCity.market[i].selected = false;
        }

        //mark the selected index drug as true
        scope.currCity.market[index].selected = true;

        //if item is selected for the first time
        if(scope.prevTarget == null) {
            e.currentTarget.className="list-group-item active";
            scope.prevTarget = e.currentTarget;
        } 
        // if the same item is selected, deselect it and mark selected as false
        else if(scope.prevTarget == e.currentTarget) {
            if(e.currentTarget.className == "list-group-item active") {
                e.currentTarget.className = "list-group-item";
                scope.currCity.market[index].selected = false;
            } else {
                e.currentTarget.className = "list-group-item active";
                scope.currCity.market[index].selected = true;
            }
        }
        //change previous item class and update current one
        else {
            scope.prevTarget.className="list-group-item";
            e.currentTarget.className="list-group-item active";
            scope.prevTarget = e.currentTarget;
        }
    };

}]);