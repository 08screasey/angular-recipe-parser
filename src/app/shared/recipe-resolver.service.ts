import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { RecipeService } from './recipes.service';

@Injectable({providedIn:'root'})

export class RecipeResolver implements Resolve<any>{

constructor(private recipeService:RecipeService){}

resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot): Observable<any> |Promise<any> | any {

const recipes = []

this.recipeService.loadUserRecipes().subscribe(data=>{this.recipeService.userRecipes = data;
		console.log(this.recipeService.userRecipes)
		recipes.push(...data);
	this.recipeService.userRecipesChanged.next(this.recipeService.userRecipes.slice())})
return recipes

}

}