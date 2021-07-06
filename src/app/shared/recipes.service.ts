import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { HttpClient } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn:'root'})

export class RecipeService {
recipes = [];
userRecipes = [];
recipesChanged = new Subject<Recipe[]>()
userRecipesChanged = new Subject<Recipe[]>();
loggedInUser;
constructor(private http:HttpClient, private authService:AuthService){}

getRecipes(){
	
	return this.recipes.slice()
}

importRecipes(params:string, cuisine?:string){
	let posCuisine = '';
	if(cuisine){
		posCuisine = '&cuisine='+cuisine;
	}
	this.http.get<any>(`https://api.spoonacular.com/recipes/search?query=${params}&number=20${posCuisine}&diet=vegan&instructionsRequired=true&apiKey=6ff3037d879049c4b88e75c67eed0bb1`).pipe(map(data=>{
		const returnData = [];
		console.log(data)
		data.results.forEach((result)=>{
			const imagePath = data.baseUri + result.image
			const recipe:Recipe = {title:result.title, time:result.readyInMinutes, servings:result.servings, imagePath:imagePath, id: result.id}
			returnData.push(recipe);
		})
		return returnData
	}), tap(data=>{this.recipes=data})).subscribe(()=>{this.recipesChanged.next(this.recipes.slice())})
}
reset(){this.userRecipesChanged.next(null);
this.recipesChanged.next(null);
this.recipes = [];
this.userRecipes = []}
addFullRecipe(id:string, index:number){

return this.http.get(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=6ff3037d879049c4b88e75c67eed0bb1`)}

convertRecipes(customRecipe:string){
	
	return this.http.get<any>(`https://api.spoonacular.com/recipes/extract?url=${customRecipe}&apiKey=6ff3037d879049c4b88e75c67eed0bb1`).pipe(map(
		data=>{console.log(data);
			 const mappedIngredients = data.extendedIngredients.map((data=>{return data.originalString}));
			 const mappedInstructions = [];
			 data['analyzedInstructions'].forEach((obj)=>{const dataStep = obj.steps.map(data=>{console.log(data); return data['step']})
 ;
 console.log(dataStep)
 mappedInstructions.push(...dataStep)})
			const recipe:Recipe = {title:data.title, time:data.readyInMinutes, servings:data.servings, imagePath:data.image,sourceUrl:customRecipe, ingredients:mappedIngredients, instructions:mappedInstructions}
return recipe

		}))
}

getRecipe(id:string, boolean?:boolean){
if(boolean){
	return this.userRecipes.find(recipe=>{return recipe.dbId == id})}
	else{
	return this.recipes[parseInt(id)]}

}

saveRecipe(data:Recipe){
	return this.authService.user.pipe(take(1), exhaustMap(user=>{
		return this.http.post(`https://recipe-project-85c0f.firebaseio.com/${user.id}/recipes.json`, data)
	}))
	
}

loadUserRecipes(){
	return this.authService.user.pipe(take(1), exhaustMap(user=>{
	return this.http.get(`https://recipe-project-85c0f.firebaseio.com/${user.id}/recipes.json`)})).pipe(map(recipeData=>{
		const userRecipeArr = [];
		for(let key in recipeData){
			if(recipeData.hasOwnProperty(key)){
				userRecipeArr.push({...recipeData[key], dbId:key})
			}
		}return userRecipeArr
	}))
}

getUserRecipes(){
	return this.userRecipes.slice(); 
}

deleteRecipe(recipeId:string){
		const filteredRecipes = this.userRecipes.filter(recipe=>{return recipe.dbId != recipeId});
		this.userRecipes = filteredRecipes;
		this.userRecipesChanged.next(this.userRecipes.slice())
		return this.authService.user.pipe(take(1), exhaustMap(user=>{
	return this.http.delete(`https://recipe-project-85c0f.firebaseio.com/${user.id}/recipes/${recipeId}.json`)}))

	console.log(filteredRecipes)
	

}

updateRecipe(dbId:string, recipe:Recipe, index){
	this.userRecipes.splice(index,1,recipe);
	this.userRecipesChanged.next(this.userRecipes.slice());
	return this.authService.user.pipe(take(1), exhaustMap(user=>{
	return this.http.put(`https://recipe-project-85c0f.firebaseio.com/${user.id}/recipes/${dbId}.json`, recipe)}))
}

}