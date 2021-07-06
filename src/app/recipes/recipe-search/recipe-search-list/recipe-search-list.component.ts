import { Component, OnInit, ElementRef } from '@angular/core';
import { RecipeService } from '../../../shared/recipes.service';
import { Subscription } from 'rxjs';
import { FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-search-list',
  templateUrl: './recipe-search-list.component.html',
  styleUrls: ['./recipe-search-list.component.css']
})
export class RecipeSearchListComponent implements OnInit {


cuisines = [null,"African","American","British","Cajun","Caribbean","Chinese","Eastern","European","French","German","Greek","Indian","Irish","Italian","Japanese","Jewish","Korean","Latin American","Mediterranean","Mexican","Middle Eastern","Nordic","Southern","Spanish","Thai","Vietnamese"]
recipeList;
userValid: boolean = false;
recipeChangedSubscription:Subscription = this.recipeService.recipesChanged.subscribe(data=>{this.recipeList=data});
isFormCollapsed = true;
  constructor(private recipeService:RecipeService, private elRef:ElementRef, private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {

  	this.recipeList = this.recipeService.getRecipes();
  
  }

submitForm(form:NgForm){
	console.log(form)
	const search = form.value.search;
  if(form.value.cuisine){
  const cuisine = form.value.cuisine;
this.recipeService.importRecipes(search, cuisine)}
else {this.recipeService.importRecipes(search)}
	this.router.navigate(['./'], {queryParams:{recipeName:form.value.search},
relativeTo:this.route})
}
}
