'use strict';

drugLord.service('actionService',['cityService','warehouseService','playerService',function(city,whs,play){

var acScope=this;
acScope.poketSize=play.pockets;

acScope.sellDrug = function(){
       console.log("sell drugs");
       acScope.drugs=city.currCity.market;
       acScope.whdrugs=whs.whdrugs; 
       for(var i=0; i < acScope.whdrugs.length; i++ )
       {
            console.log("1");
            if(acScope.whdrugs[i].selected == true)
            {
              console.log("2");
              for(var j=0; j < acScope.drugs.length; j++)
              {
                   console.log("3");
                   //var tempname=acScope.whdrugs[i].name;
                   if(acScope.whdrugs[i].name == acScope.drugs[j].name)
                   {
                       console.log("4");
                       var temp=null,
                       tqty=acScope.drugs[j].qty,
                       sellCash=acScope.whdrugs[i].price;
                       temp=parseInt(window.prompt("You want to sell "+acScope.whdrugs[i].name+ "in the price of "+acScope.whdrugs[i].price+" ."+" \nYou Have availabe quantity is "+acScope.whdrugs[i].qty+" Enter quantity you want to sell"));
                       if(temp == acScope.whdrugs[i].qty)
                       {
                            console.log("4.1");
                            acScope.whdrugs.splice(i,1);
                            acScope.drugs[j].qty= tqty + temp ;
                            play.cash= play.cash + (temp * sellCash);
                       }
                       /*else if(temp < acScope.whdrugs[i].qty)
                       {
                            acScope.whdrugs[i].qty=acScope.whdrugs[i].qty - temp;
                            acScope.drugs[j].qty= tqty + temp ;
                            sellCash= pls.cash + (temp * sellCash);
                            pls.cashUpdate(sellCash);

                          pls.cash += temp*acScope.whdrugs[i].price;
                          acScope.whdrugs.splice(i,1);
                          acScope.drugs[j].qty= tqty + temp ;
                       }*/
                       else if(temp < acScope.whdrugs[i].qty)
                       {
                          console.log("4.2");
                          play.cash += temp*acScope.whdrugs[i].price;
                          acScope.whdrugs[i].qty=acScope.whdrugs[i].qty - temp;
                          acScope.drugs[j].qty= tqty + temp ;
                       }
                       else if(temp > acScope.whdrugs[i].qty)
                       {
                            window.alert("You have only "+acScope.whdrugs[i].qty+"\n Enter valid quantity");
                       }
                   }

              }
            }

       }
};

acScope.buyDrug = function(){
console.log("inside buy");
acScope.drugs=city.currCity.market;
acScope.whdrugs=whs.whdrugs;
for(var i=0;i < acScope.drugs.length;i++)
{
	if(acScope.drugs[i].selected == true)
     {
     	  var temp=0;
           temp=parseInt(window.prompt("You want to buy "+acScope.drugs[i].name+" price of $"+acScope.drugs[i].price+" availabe quantity is "+acScope.drugs[i].qty +"\n enter the quantity you want to buy"));
           if((temp <= acScope.drugs[i].qty) && temp!=null)
           {
              if (acScope.whdrugs.length >= 1)
               {
                   var flag=false;
                  for(var j=0; j < acScope.whdrugs.length ; j++)
                  {
                       if(acScope.drugs[i].name == acScope.whdrugs[j].name)
                       {
                          acScope.whdrugs[j].qty = acScope.whdrugs[j].qty + temp;
                          acScope.drugs[i].qty = acScope.drugs[i].qty - temp;
                          flag = true;
                          break;
                       }
                  }
                  if(!flag)
                  {
                    if(play.cash >= acScope.drugs[i].price * temp)
                    {
                      pushIntoPocket(i,temp);
                      play.cash -= acScope.drugs[i].price * temp;
                      console.log(play.cash);
                    }
                    else 
                    {
                      window.alert("You're short of money.");
                    }
                  }
               }
               else
               {
                   if(play.cash >= acScope.drugs[i].price * temp) {
                      pushIntoPocket(i,temp);
                      play.cash -= acScope.drugs[i].price * temp;
                      console.log(play.cash);
                    }
                    else {
                      window.alert("You're short of money.");
                    }
               }
            }
            else if((temp > acScope.drugs[i].qty) && temp != null)
            {
              window.alert("Please specify values within range!");
            }
          break;
     }
}
   function pushIntoPocket(i,temp)
   {
         var quantity = acScope.drugs[i].qty;
          acScope.drugs[i].selected=false;
          acScope.whdrugs.push({name :acScope.drugs[i].name, qty:temp, price: acScope.drugs[i].price, selected : false});
          acScope.drugs[i].qty=(quantity-temp);
   }

};
acScope.dumpDrug=function(){
  acScope.drugs=city.currCity.market;
  acScope.whdrugs=whs.whdrugs;
  //console.log("inside dumpDrug");
  for(var i=0;i < acScope.whdrugs.length;i++){
        // console.log(acScope.whdrugs[i]);
     if(acScope.whdrugs[i].selected == true)
     {
        var temp = null;
        temp=window.prompt("You want dump "+acScope.whdrugs[i].name+" You have available amount "+acScope.whdrugs[i].qty+"\n Enter the ammount you want to dump");
        
        //console.log(temp);
        
        if(temp != null){
                var quant= acScope.whdrugs[i].qty;
             
             if(temp==acScope.whdrugs[i].qty){
                  acScope.whdrugs.splice(i,1);
               }
             
             else if(temp < acScope.whdrugs[i].qty){
                  acScope.whdrugs[i].qty = quant - temp;
               }
             
             else if(temp > acScope.whdrugs[i].qty){
                  window.alert("You have only "+acScope.whdrugs[i].qty+" quantity"+"\nEnter valid Quantity");
               }
         // sconsole.log(acScope.whdrugs[i]);
       }
     }
  }
};

}]);