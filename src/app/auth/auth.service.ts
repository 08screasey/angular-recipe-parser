import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import {Router} from '@angular/router';

export interface AuthResponseData { 
kind:string,
idToken:string,
email:string,
refreshToken:string,
expiresIn:string,
localId:string,
registered?:boolean}

@Injectable({providedIn:'root'})

 
export class AuthService {
	private tokenExpirationTimer:any;

	user = new BehaviorSubject<User>(null)
	constructor(private http:HttpClient, private router:Router){}
	signUp(email:string, password:string){
		return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD0N960UWXOVMwR1PxzznnJJkM9qQvF1XU", {email:email,
			password:password,
			returnSecureToken:true}).pipe(catchError(this.errResponse), tap((data)=>{
				const expDate = new Date(new Date().getTime() + +data.expiresIn*1000);
				const user = new User(data.localId, data.email, data.idToken, expDate);
				console.log(user);
				this.user.next(user);
				this.autoLogout(+data.expiresIn*1000);
				localStorage.setItem('userStorage', JSON.stringify(user))
			}))
	}

	signIn(email:string, password:string){
		return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD0N960UWXOVMwR1PxzznnJJkM9qQvF1XU", {
			email:email,
			password:password,
			returnSecureToken:true
		}).pipe(catchError(this.errResponse), tap((data)=>{
				const expDate = new Date(new Date().getTime() + +data.expiresIn*1000);
				const user = new User(data.localId, data.email, data.idToken, expDate);
				console.log(user);
				this.user.next(user);
				this.autoLogout(+data.expiresIn*1000)
				localStorage.setItem('userStorage', JSON.stringify(user))
			}))
	}
	logout(){
		this.user.next(null);
		localStorage.removeItem('userStorage');
		
		if(this.tokenExpirationTimer){
			clearTimeout(this.tokenExpirationTimer);
			this.tokenExpirationTimer = null;

		}
		this.router.navigate(['/authenticate']);
	}
	autoLogin(){
		const userData:{id:string,  email:string,  _token:string, _tokenExpirationDate:string} = JSON.parse(localStorage.getItem('userStorage'));
		const loadedUser = new User(userData.id, userData.email, userData._token, new Date(userData._tokenExpirationDate));
		if(loadedUser.token){
			console.log(loadedUser)
			
			const expirationDate:number = new Date(userData._tokenExpirationDate).getTime()-new Date().getTime();
			console.log(expirationDate);
			this.autoLogout(expirationDate); 
			this.user.next(loadedUser)
		}
	}

	autoLogout(expirationDuration:number){
		console.log(expirationDuration + "woops")
	 	this.tokenExpirationTimer = setTimeout(()=>{
			this.logout()
	 	},expirationDuration)
	 }


	private errResponse(err:HttpErrorResponse){
		let errorMessage = 'An error Occured';
				if(!err.error || !err.error.error){
					return throwError(errorMessage)
				}
				switch(err.error.error.message){

				case 'EMAIL_EXISTS':
				errorMessage = 'this email already exists';
				break;
				case 'EMAIL_NOT_FOUND':
				errorMessage = 'Email not found';
				break;
				case 'INVALID_PASSWORD':
				errorMessage = "This password is not correct";
			}
			return throwError(errorMessage)
	}}