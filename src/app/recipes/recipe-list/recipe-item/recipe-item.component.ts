import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { RecipeService } from '../../../shared/recipes.service';
import{ Subscription } from 'rxjs';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],

})
export class RecipeItemComponent implements OnInit {

isUser = this.route.snapshot.data.isUser;
isItemCollapsed:boolean;
recipe;
id;
imageLoaded = false;
recipeSubscription:Subscription;

  constructor(private router:Router, private route:ActivatedRoute, private recipeService:RecipeService) { }
@Input('i') index;
  ngOnInit() {

	this.isItemCollapsed = true;
	this.id = this.index;
	if(this.isUser){
	this.recipe = this.route.snapshot.data.isRecipes[this.id]
}else{
	this.recipe = this.recipeService.getRecipe(this.id)}

	}

	  onItemSwitch(){
	  	this.imageLoaded=!this.imageLoaded
  }

onDetailNavigate(id:number){
	if(this.isUser){console.log("this is a user");
this.router.navigate([this.recipe.dbId], {relativeTo:this.route})}
		else{
	this.recipeService.addFullRecipe(this.recipe.id, this.id).subscribe(data=>{console.log(data)
	const mappedIngredients = data['extendedIngredients'].map((ingredient)=>{return ingredient.originalString})
this.recipeService.recipes[this.id]['ingredients'] = mappedIngredients
const mappedInstructions = [];
data['analyzedInstructions'].forEach((obj)=>{const dataStep = obj.steps.map(data=>{console.log(data); return data['step']})
 ;
 console.log(dataStep)
 mappedInstructions.push(...dataStep)})
this.recipeService.recipes[this.id]['instructions'] = mappedInstructions;
this.recipeService.recipes[this.id]['sourceUrl'] = data['sourceUrl'];
console.log(this.recipeService.recipes[this.id]['sourceUrl'])
console.log(mappedInstructions);
this.router.navigate([this.id], {relativeTo:this.route})
})}
			

	
}

}
