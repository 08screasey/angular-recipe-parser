import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import {Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RecipeService } from '../shared/recipes.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

isUser = true;
isLoading = false;
error:string = null;


changeForm(){
	this.isUser = !this.isUser
}

onSubmit(form:NgForm){
const email = form.value.email;
const password = form.value.password;
let authObs:Observable<AuthResponseData>;

if(this.isUser){
this.isLoading = true;
authObs = this.authService.signIn(email, password)
}else{

	this.isLoading = true
	authObs = this.authService.signUp(email, password)
}
authObs.subscribe(data=>{
		console.log(data); 
		this.isLoading=false;
		this.error = null;
		
		this.router.navigate(['/recipes'])
		}, 
		err=>{console.log(err);

			this.isLoading = false;
			this.error = err});
form.reset()

}


  constructor(private authService:AuthService, private router:Router, private recipeService:RecipeService) { }

  ngOnInit() {
  	this.recipeService.reset();
  }

}
