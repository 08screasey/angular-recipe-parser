import {CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router} from '@angular/router';
import{Injectable} from '@angular/core';
import { AuthService } from './auth.service';
import {Observable} from 'rxjs';
import {map,tap, take} from 'rxjs/operators';

@Injectable({providedIn:'root'})

export class AuthReverseGuard implements CanActivate{
	constructor(private authService:AuthService, private router:Router){}

canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot){
	return this.authService.user.pipe(take(1), map(user=>{
		const isAuth = !!user;
		if(isAuth){
			return this.router.createUrlTree(['/recipes'])

		}
		return true


	}))
}

}