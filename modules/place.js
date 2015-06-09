'use strict';

drugLord.service('placeService',['playerService',function(player){
	var place=this;
	place.initInventory=[
		       {
                  name: "Knife",
                  type: "Weapon",
                  price:100,
                  selected: false
		       },
		       {
                  name: "Pistol",
                  type: "Weapon",
                  price:500,
                  selected: false
		       },
		       {
		       	  name: "Pistol Bullet",
                  type: "Ammo",
                  price:5,
                  selected: false
		       },
		       {
		       	  name: "Short Gun",
                  type: "Weapon",
                  price:2500,
                  selected: false

		       },
		       {
		       	  name: "Short Gun Shell",
                  type: "Ammo",
                  price:5,
                  selected: false

		       },
		       {
		       	name: "Machine Gun",
                  type: "Weapon",
                  price:4000,
                  selected: false

		       },
		       {
		       	  name: "Machine Gun Bullet",
                  type: "Ammo",
                  price:5,
                  selected: false
		       },
		       {
		       	  name: "Hand Grenade",
                  type: "Ammo",
                  price:500,
                  selected: false
		       },
		       {
		       	  name: "Rocket Launcher",
                  type: "Weapon",
                  price:10000,
                  selected: false
		       },
		       {
		       	  name: "Rocket",
                  type: "Ammo",
                  price:500,
                  selected: false
		       },
		       {
		       	  name: "Heavy Leather Coat",
                  type: "Armor",
                  price:1000,
                  selected: false
		       },

		       {
		       	  name: "Bullet Proof Vest",
                  type: "Armor",
                  price:10000,
                  selected: false
		       },

		       {
		       	  name: "Can of No-Scent",
                  type: "Item",
                  price:1000,
                  selected: false
		       }
	];
	place.buyItems=[];
	place.prevTarget = null;
	place.selectInvItem=function(e,index){

       console.log("inside fun");
        for(var i=0; i < place.initInventory.length; i++) {
            place.initInventory[i].selected = false;
        }
        place.initInventory[index].selected = true;
        if(place.prevTarget == null) {
            e.currentTarget.className="list-group-item active";
            place.prevTarget = e.currentTarget;
        } else if(place.prevTarget == e.currentTarget) {
            if(e.currentTarget.className == "list-group-item active") {
                 e.currentTarget.className = "list-group-item";
                place.initInventory[index].selected = false;
            } else {
                 e.currentTarget.className = "list-group-item active";
                place.initInventory[index].selected = true;
            }
        }
        else {
            place.prevTarget.className="list-group-item";
            e.currentTarget.className="list-group-item active";
            place.prevTarget = e.currentTarget;
        }
        
  };
  place.buyItem=function(){
      for(var i=0;i <  place.initInventory.length;i++)
      {
      	if( place.initInventory[i].selected == true)
      	{
      		var temp=parseInt(window.prompt("You want to buy "+ place.initInventory[i].name +" at the price of "+ place.initInventory[i].price+"\n Enter the quantity you want to buy"));
      	   if(temp!= null)
      	   {
      	     var requied_cost=place.initInventory[i].price*temp;
      	     if(player.cash > requied_cost)
      	     {
      	     	player.cash-=requied_cost;
      	         console.log("update cash"+player.cash);

      	     	place.buyItems.push({ name:place.initInventory[i].name, price:place.initInventory[i].price, type : place.initInventory[i].type, selected : false, qty :temp});
      	        console.log(place.buyItems);
      	     }
      	   }
      	}
      }
  };

place.sellItem=function(){
	if(place.buyItems.length >= 0)
	{	
    for(var i=0;i <  place.buyItems.length;i++)
      {
      	if(place.buyItems[i].selected == true)
      	{
      		var temp=parseInt(window.prompt("You want to sell "+ place.buyItems[i].name +" at the price of "+ place.buyItems[i].price+"you have avilabe quantity "+place.buyItems[i].qty+"\n Enter the quantity you want to sell"));
      	   if(temp!= null)
      	   {
           if(temp < place.buyItems[i].qty)
      	     {
      	     	  player.cash+=(temp*place.buyItems[i].price);
      	        place.buyItems[i].qty-=temp

      	     }
             else if(temp == place.buyItems[i].qty)
             {
                 player.cash+=(temp*place.buyItems[i].price);
                 place.buyItems.splice(i,1);
             }
             else
             {
                 window.alert("Enter the quantity in specifed range");
             }
      	   }
      	}
      }
    }
    else
    {
      window.alert("You have no items for sell");

    }
};
place.selectedBuyInvItems=function(e,index){
    for(var i=0; i < place.buyItems.length; i++) {
            place.buyItems[i].selected = false;
        }
       place.buyItems[index].selected = true;
        if(place.prevTarget == null) {
            e.currentTarget.className="list-group-item active";
            place.prevTarget = e.currentTarget;
        } else if(place.prevTarget == e.currentTarget) {
            if(e.currentTarget.className == "list-group-item active") {
                 e.currentTarget.className = "list-group-item";
               place.buyItems[index].selected = false;
            } else {
                 e.currentTarget.className = "list-group-item active";
                place.buyItems[index].selected = true;
            }
        }
        else {
            place.prevTarget.className="list-group-item";
            e.currentTarget.className="list-group-item active";
            place.prevTarget = e.currentTarget;
        }
};

}]);