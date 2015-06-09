'use strict';

drugLord.service('drugService',['randomService','playerService', function(rS,play){
    var mark = this;
    mark.drugs1 = [];
    mark.initDrugs = function() {
    return new Array(
            {
                name:"Cocaine",
                qty : Math.round(rS.randomPrice(play.pocket)),
                price: Math.round(rS.randomPrice(10000)),
                selected : false
            },
            
            {
                name:"Crack",
                qty : Math.round(rS.randomPrice(play.pocket)),
                price: Math.round(rS.randomPrice(10000)),
                selected : false
            },
            
            {
                name:"Ecstacy",
                qty : Math.round(rS.randomPrice(play.pocket)),
                price: Math.round(rS.randomPrice(10000)),
                selected : false
            },
            
            {
                name:"Hashish",
                qty : Math.round(rS.randomPrice(play.pocket)),
                price: Math.round(rS.randomPrice(10000)),
                selected : false
            },
            
            {
                name:"Heroin",
                qty : Math.round(rS.randomPrice(play.pocket)),
                price: Math.round(rS.randomPrice(10000)),
                selected : false
            },
            
            {
                name:"Ice",
                qty : Math.round(rS.randomPrice(play.pocket)),
                price: Math.round(rS.randomPrice(1000)),
                selected : false
            },
            
            {
                name:"KAT",
                qty : Math.round(rS.randomPrice(play.pocket)),
                price: Math.round(rS.randomPrice(1000)),
                selected : false
            },
            
            {
                name:"LSD",
                qty : Math.round(rS.randomPrice(play.pocket)),
                price: Math.round(rS.randomPrice(1000)),
                selected : false
            },
            
            {
                name:"MDA",
                qty : Math.round(rS.randomPrice(play.pocket)),
                price: Math.round(rS.randomPrice(1000)),
                selected : false
            },
            
            {
                name:"Morphine",
                qty : Math.round(rS.randomPrice(play.pocket)),
                price: Math.round(rS.randomPrice(1000)),
                selected : false
            },
            
            {
                name:"Mushrooms",
                qty : Math.round(rS.randomPrice(play.pocket)),
                price: Math.round(rS.randomPrice(1000)),
                selected : false
            },
            
            {
                name:"Opium",
                qty : Math.round(rS.randomPrice(play.pocket)),
                price: Math.round(rS.randomPrice(1000)),
                selected : false
            },
            
            {
                name:"PCP",
                qty : Math.round(rS.randomPrice(play.pocket)),
                price: Math.round(rS.randomPrice(1000)),
                selected : false
            },
            
            {
                name:"Peyote",
                qty : Math.round(rS.randomPrice(play.pocket)),
                price: Math.round(rS.randomPrice(1000)),
                selected : false
            },
            
            {
                name:"Pot",
                qty : Math.round(rS.randomPrice(play.pocket)),
                price: Math.round(rS.randomPrice(1000)),
                selected : false
            },
            
            {
                name:"Special K",
                qty : Math.round(rS.randomPrice(play.pocket)),
                price: Math.round(rS.randomPrice(1000)),
                selected : false
            },
            
            {
                name:"Speed",
                qty : Math.round(rS.randomPrice(play.pocket)),
                price: Math.round(rS.randomPrice(1000)),
                selected : false
            }
        );

    };

    mark.getDrugs = function () {
        mark.drugs1 = mark.initDrugs();
        return mark.drugs1;
    };

    mark.initMarket = function() {
        mark.drugs = [];
        mark.indexes = [];
        mark.size = Math.round(rS.randomMin(7,17));

        mark.indexes = shuffle([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]);

        for(var i=0; i < mark.size; i++) {
            mark.drugs.push(mark.drugs1[mark.indexes[i]]);
        }

        mark.drugs.sort(compare);
        function compare(a,b){
            if(a.name > b.name) {
                return 1
            } else {
                return -1;
            }
        }

        return mark.drugs;
    };

    function shuffle(array) {
            var i = array.length,
            j = 0,
            temp;
            while (i--) {
                j = Math.floor(Math.random() * (i+1));
                // swap randomly chosen element with current element
                temp = array[i];
                array[i] = array[j];
                array[j] = temp;

            }
            return array;
        }


    mark.prevTarget = null;
    mark.selectedDrug = function(e,index) {
        //first mark all selected value to false
        for(var i=0; i < mark.drugs.length; i++) {
            mark.drugs[i].selected = false;
        }

        //mark the selected index drug as true
        mark.drugs[index].selected = true;

        //if item is selected for the first time
        if(mark.prevTarget == null) {
            e.currentTarget.className="list-group-item active";
            mark.prevTarget = e.currentTarget;
        } 
        // if the same item is selected, deselect it and mark selected as false
        else if(mark.prevTarget == e.currentTarget) {
            if(e.currentTarget.className == "list-group-item active") {
                e.currentTarget.className = "list-group-item";
                mark.drugs[index].selected = false;
            } else {
                e.currentTarget.className = "list-group-item active";
                mark.drugs[index].selected = true;
            }
        }
        //change previous item class and update current one
        else {
            mark.prevTarget.className="list-group-item";
            e.currentTarget.className="list-group-item active";
            mark.prevTarget = e.currentTarget;
        }
    };

}]);