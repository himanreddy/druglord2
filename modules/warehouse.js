'use strict';

drugLord.service('warehouseService',['playerService',function(play){
	var scope = this;
    scope.whdrugs = [];
	scope.wareHouseSize=10;

	scope.prevTarget = null;
    scope.selectedDrugWareHouse = function(e,index) {
        for(var i=0; i < scope.whdrugs.length; i++) {
            scope.whdrugs[i].selected = false;
        }
        scope.whdrugs[index].selected = true;
        if(scope.prevTarget == null) {
            e.currentTarget.className="list-group-item active";
            scope.prevTarget = e.currentTarget;
        } else if(scope.prevTarget == e.currentTarget) {
            if(e.currentTarget.className == "list-group-item active") {
                 e.currentTarget.className = "list-group-item";
                scope.whdrugs[index].selected = false;
            } else {
                 e.currentTarget.className = "list-group-item active";
                scope.whdrugs[index].selected = true;
            }
        }
        else {
            scope.prevTarget.className="list-group-item";
            e.currentTarget.className="list-group-item active";
            scope.prevTarget = e.currentTarget;
        }
        
    };
    

}]);


