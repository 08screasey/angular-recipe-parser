import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../shared/recipes.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
isMenuCollapsed: boolean;
isAuthenticated;
  constructor(private recipeService:RecipeService, private authService:AuthService) { }

onLoadRecipes(){
this.isMenuCollapsed = true;

console.log(this.recipeService.recipes)
}

onImportRecipes(){
this.isMenuCollapsed = true;
this.recipeService.loadUserRecipes()
}

  ngOnInit() {
  	this.isMenuCollapsed = true;
  	this.authService.user.subscribe(user=>{
  		this.isAuthenticated = !!user
  	});
  	
  }
onLogout(){
  this.isMenuCollapsed = true;
  this.authService.logout();

}
}
