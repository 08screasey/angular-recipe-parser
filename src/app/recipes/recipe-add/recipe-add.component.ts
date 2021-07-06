import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../shared/recipes.service';
import { FormGroup, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-recipe-add',
  templateUrl: './recipe-add.component.html',
  styleUrls: ['./recipe-add.component.css']
})
export class RecipeAddComponent implements OnInit {

  constructor(private recipeService:RecipeService, private router:Router, private route:ActivatedRoute) { }
loadedRecipe;
loading = false;
onPreview(){
	if(this.loadedRecipe){return '10px'}
		else{return '150px'}
}
addNewRecipe(recipe:NgForm){
	this.loading = true
	const formUrl = recipe.controls.recipeUrl.value;
	this.recipeService.convertRecipes(formUrl).subscribe((data)=>{
		this.loadedRecipe = data;
		this.loading = false})
	//	this.recipeService.saveRecipe(data);this.recipeService.userRecipes.push(data);
		//this.recipeService.userRecipesChanged.next(this.recipeService.userRecipes.slice());
	//this.router.navigate(['../'], {relativeTo:this.route})});
	
}
  ngOnInit() {
  }

}
