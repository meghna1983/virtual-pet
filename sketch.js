var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var lastFed

//create feed and lastFed variable here
var button

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
 button=createButton("feed the food")
button.position(600,95)
button.mousePressed(feedDog)

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  fedtime=database.ref('Feed Time')
  fedtime.on("value",function(data){
   lastFed=data.val()
  })


  
 
  //write code to display text lastFed time here
if(lastFed>=12){
  //show time in PM format when lastFed is greater than 12
}else if (lastFed==0){
text("Lat feed  :12 AM",350,30)
}else{
  //show time in AM format when lastFed  is less than 12
}


 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
var food_stock_val=food.Obj.getFoodStock()
if(food_stock_val<=0){
  foodObj.updateFoodStock(food_stock_val *0)
}else{
  foodObj.updateFoodStock(food_stock_val  -1)
}
database.ref('/').update({
  Food:foodObj.getFoodStock(),
  FeedTime:hour()
})

}



//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
