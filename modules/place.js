'use strict';

drugLord.service('placeService',['playerService','warehouseService','cityService',function(player,whs,citys){
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
  place.vault=[];
	place.prevTarget = null;
  place.bankOperation = function(){
        var op=document.getElementsByName("operation");
            if(op[0].checked)
            {
               var cash=parseInt(document.getElementById("ammount").value);
               if((cash <= player.cash) && (cash >= 0))
               {
                   player.cash-=cash;
                   player.bank+=cash;
               }
               else
               {
                  window.alert("enter valid ammount");
               }    
            }
            else if(op[1].checked)
            {
                var cash=parseInt(document.getElementById("ammount").value);
                 if((cash <= player.bank) && (cash >= 0))
               {
                   player.cash+=cash;
                   player.bank-=cash;
               }
               else
               {
                  window.alert("enter valid ammount");
               }    
            }
    };
    place.payLone=function(){
       if(player.cash >= player.debt)
       {
        player.cash-=player.debt;
        player.debt-=player.debt;
       }
       else
       {
        window.alert("Your are Short of money");
       }
    };
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
      	   if((temp!= null) && (temp > 0) )
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
           else
           {
            window.alert("Enter valid value of quantity");
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
             if(temp < place.buyItems[i].qty  && temp > 0)
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
           e
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
place.pushInvault=function(){
  console.log("inside vault");
  for(var i=0;i< whs.whdrugs.length;i++)
  {
    console.log("inside for");
    console.log(whs.whdrugs[i].selected);
    if(whs.whdrugs[i].selected==true)
    {
      console.log("inside if");
      var temp=parseInt(window.prompt("You want to put "+whs.whdrugs[i].name+" into vault.\n You have avilable quantity is "+whs.whdrugs[i].qty+"\n Enter the quantity you want to put inside vault"));
      if((temp <= whs.whdrugs[i].qty) && (temp > 0) && (!isNaN(temp)))
      {
         var flag=check(i,place.vault,whs.whdrugs);
         if(flag == place.vault.length)
         { 
            if(temp < whs.whdrugs[i].qty)
            {
               place.vault.push({name:whs.whdrugs[i].name,price:whs.whdrugs[i].price,qty:temp,selected:false,});
               whs.whdrugs[i].qty-=temp;
            }
            else if(temp == whs.whdrugs[i].qty)
            {
               place.vault.push({name:whs.whdrugs[i].name,price:whs.whdrugs[i].price,qty:temp,selected:false,});
               whs.whdrugs.splice(i,1);          
            }
          }
          else
          {
             
             if(temp < whs.whdrugs[i].qty)
            {
               place.vault[flag].qty+=temp;
               whs.whdrugs[i].qty-=temp;
            }
            else if(temp == whs.whdrugs[i].qty)
            {
              place.vault[flag].qty+=temp;
               whs.whdrugs.splice(i,1);          
            }
          }    
      }
      else
      {
        window.alert(" Enter value in specifed range ");
      }
    }
  }
};
 function check(i,obj1,obj2)
{
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
}
place.selectVaultItems=function(e,index){
    for(var i=0; i < place.vault.length; i++) {
            place.vault[i].selected = false;
        }
       place.vault[index].selected = true;
        if(place.prevTarget == null) {
            e.currentTarget.className="list-group-item active";
            place.prevTarget = e.currentTarget;
        } else if(place.prevTarget == e.currentTarget) {
            if(e.currentTarget.className == "list-group-item active") {
                 e.currentTarget.className = "list-group-item";
               place.vault[index].selected = false;
            } else {
                 e.currentTarget.className = "list-group-item active";
                place.vault[index].selected = true;
            }
        }
        else {
            place.prevTarget.className="list-group-item";
            e.currentTarget.className="list-group-item active";
            place.prevTarget = e.currentTarget;
        }
};
place.pushInPocket=function()
{
  for(var i=0;i< place.vault.length;i++)
  {
    if(place.vault[i].selected == true)
    {

      var temp=parseInt(window.prompt("You want to push "+place.vault[i].name+" into market from vault.\n Enter quantity you want to push "));
      if( (temp <= place.vault[i].qty) && (temp >0) && (! isNaN(temp)))
      {
          var flag=check(i,whs.whdrugs,place.vault);
          if(flag == whs.whdrugs.length)
          { 
            if(temp < place.vault[i].qty)
            {
               whs.whdrugs.push({name:place.vault[i].name,price:place.vault[i].price,qty:temp,selected:false});
               place.vault[i].qty-=temp;
            }
            else if(temp == place.vault[i].qty)
            {
               whs.whdrugs.push({name:place.vault[i].name,price:place.vault[i].price,qty:temp,selected:false});
               place.vault.splice(i,1);          
            }
          }
          else
          {
             
            if(temp < place.vault[i].qty)
            {
               whs.whdrugs[flag].qty+=temp;
               place.vault[i].qty-=temp;
            }
            else if(temp == place.vault[i].qty)
            {
              whs.whdrugs[flag].qty+=temp;
              place.vault.splice(i,1);          
            }
          }  
      }
    }
  }
};


}]);