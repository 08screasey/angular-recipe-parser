import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './auth/auth.guard';
import {AuthReverseGuard} from './auth/auth-reverse.guard';
import { RecipeResolver } from './shared/recipe-resolver.service';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeAddComponent } from './recipes/recipe-add/recipe-add.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './recipes/recipe-list/recipe-item/recipe-details/recipe-details.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeSearchComponent } from './recipes/recipe-search/recipe-search.component'
import { UserRecipesComponent } from './user-recipes/user-recipes.component';
import { RecipeSearchListComponent } from './recipes/recipe-search/recipe-search-list/recipe-search-list.component'

const appRoutes:Routes = [
{path:'recipes', component:RecipesComponent, canActivate:[AuthGuard] ,children:[
	{path:'', component:UserRecipesComponent, pathMatch:'full', data:{isUser:true, isSaved:true}, resolve:{isRecipes:RecipeResolver}},
	{path:'add', component:RecipeAddComponent}, 
	{path:'search', component:RecipeSearchComponent, children:[
		{path:'', component:RecipeSearchListComponent, pathMatch:'full'},
		{path:':id', component:RecipeDetailsComponent, data:{isUser:false, isSaved:false}}]},
	{path:':id', component:RecipeDetailsComponent, data:{isUser:true, isSaved:true}, resolve:{isRecipes:RecipeResolver}},
	
		
	]},
	{path:'authenticate', component:AuthComponent, canActivate:[AuthReverseGuard]},
	{path:'', redirectTo:'authenticate', pathMatch:'full'}];

@NgModule({
	imports:[RouterModule.forRoot(appRoutes)],
	exports:[RouterModule]
})

export class AppRoutingModule{}