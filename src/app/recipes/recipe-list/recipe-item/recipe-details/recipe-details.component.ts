import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Recipe } from '../../../../shared/recipe.model';
import { RecipeService } from '../../../../shared/recipes.service';
import { NgForm, NgModel} from '@angular/forms'
@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
 @Input('addRecipe') addRecipe;
isUser = this.route.snapshot.data.isUser;
id:string;
recipe;
recipeUpload = false;
customServingIng;
editMode = false;
isSaved = this.route.snapshot.data.isSaved;
isLoading = false;
  constructor(private router:Router, private route:ActivatedRoute, private recipeService:RecipeService) { }

  ngOnInit() {
    console.log('inti')
this.id = this.route.snapshot.params['id'];

if(this.isUser == true){
  this.recipe = this.recipeService.userRecipes.find(recipe=>{return recipe.dbId == this.id});

this.recipeService.userRecipesChanged.subscribe(data=>{this.recipe=data.find(recipe=>{return recipe.dbId == this.id;
}); 
this.customServingIng = this.recipe.ingredients.slice();
console.log(this.recipe)})
}
	else{if(this.addRecipe){this.recipe=this.addRecipe; this.customServingIng = this.recipe.ingredients.slice()}
    else{ this.recipe = this.recipeService.recipes.find(recipe=>{return recipe.dbId == this.id})
    
this.recipe = this.recipeService.recipesChanged.subscribe((data)=>{this.recipe = data[this.id];
this.customServingIng = this.recipe.ingredients.slice()});}}
;
console.log("custom");
console.log(this.customServingIng)
  }

changeServings(form:NgForm){
  if(this.recipe.servings === form.value.servings || form.value.servings == null){
    this.customServingIng = this.recipe.ingredients
  }else{
    console.log(this.recipe.ingredients)
    var updatedIngredients = this.recipe.ingredients.map((ingredient)=>{
      const regex = /^\s*\d+\/*\d*/;
      if(regex.test(ingredient) == true){
      let number = ingredient.match(/^\d+\/*\d*/);
      console.log(number)
      let restOfIngredient = ingredient.slice(number.length);
      number = ((parseFloat(number)/this.recipe.servings)*form.value.servings);
      
      let updatedIngredient = number.toString().concat(restOfIngredient);
        console.log(updatedIngredient)
      return updatedIngredient}
      else {
        const number = (1/+this.recipe.servings)*form.value.servings;
        return number + 'x ' + ingredient
      }


    });
    console.log(updatedIngredients);
    this.customServingIng = updatedIngredients;
    console.log(this.customServingIng)
  }
}

onSaveData(){

  this.recipeUpload = true;
  return
  
 
  
}
onUploadRecipe(form:NgForm){
  this.recipe.meal = form.value.meal;
  this.recipeService.userRecipes.push(this.recipe);
   this.recipeService.userRecipesChanged.next(this.recipeService.userRecipes.slice());
    this.recipeService.saveRecipe(this.recipe).subscribe(data=>{console.log(data);
      this.router.navigate(['/recipes'])})
}
onWindowOpen(url: string){
    window.open(url, "_blank");
}

onDeleteData(){
	this.recipeService.deleteRecipe(this.recipe.dbId).subscribe(data=>{this.router.navigate(['../'], {relativeTo:this.route})});
	
}
onSubmit(form:NgForm){
  console.log(form)
  const updatedInstructions = form.value.instructions.split(/\n/)
 const ing = form.value.ingredients.split(/\n/)
 this.recipe = {title:form.value.title,
   servings:+form.value.servings,
   time:+form.value.time,
   instructions:updatedInstructions,
   ingredients:ing,
   imagePath:form.value.imgPath,
   meal:form.value.meal,
   dbId:this.recipe.dbId
   };
   if(this.isSaved){
     this.isLoading = true;
     this.recipeService.updateRecipe(this.recipe.dbId, this.recipe, this.id).subscribe(data=>{
       console.log(data);
       this.isLoading = false;
     })

   }
   this.editMode = false;
  console.log(ing)
}
}
