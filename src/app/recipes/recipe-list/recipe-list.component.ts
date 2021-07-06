import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { RecipeService } from '../../shared/recipes.service';
import { Subscription } from 'rxjs';
import { FormGroup,NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
 @Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
filteredList;
recipeList;
formExpanded = false;
userValid: boolean = false;
recipeChangedSubscription:Subscription = this.recipeService.userRecipesChanged.subscribe(data=>{this.recipeList=data});
isFormCollapsed = true;
  constructor(private recipeService:RecipeService, private elRef:ElementRef, private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {

  	this.recipeList = this.route.snapshot.data.isRecipes;
    this.filteredList = this.recipeList;
  	console.log("hello");
  	console.log(this.recipeList);
  		console.log("hello")
  
  }
  searchExpand(){
    this.formExpanded = !this.formExpanded
  }
  filterRecipes(form:NgForm){
    console.log(form)
    const regExp = new RegExp(form.value.title, 'i')
    const filteredRecipes = this.recipeList.filter((recipe)=>{
      console.log(recipe)
      if(form.controls.meal.touched && form.value.meal.length>0){
        if(form.value.meal == recipe.meal && recipe.title.match(regExp)){
          console.log(recipe);
          return true
        }
      }else{
        return recipe.title.match(regExp)
      }
     }
    )
    console.log(filteredRecipes)
    this.filteredList = filteredRecipes
  }

  ngOnDestroy(){
  	this.recipeChangedSubscription.unsubscribe()
  }

}
