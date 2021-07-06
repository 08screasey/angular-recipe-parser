import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';

import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './recipes/recipe-list/recipe-item/recipe-details/recipe-details.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ShortenPipe } from './shared/recipe.pipe';
import { urlParsePipe } from './shared/url.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecipeAddComponent } from './recipes/recipe-add/recipe-add.component';
import { RecipeSearchComponent } from './recipes/recipe-search/recipe-search.component';
import { UserRecipesComponent } from './user-recipes/user-recipes.component';
import { RecipeSearchListComponent } from './recipes/recipe-search/recipe-search-list/recipe-search-list.component';
import { RecipeEditComponent } from './recipes/recipe-list/recipe-item/recipe-details/recipe-edit/recipe-edit.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailsComponent,
    RecipeItemComponent,
    ShortenPipe,
    urlParsePipe,
    RecipeAddComponent,
    RecipeSearchComponent,
    UserRecipesComponent,
    RecipeSearchListComponent,
    RecipeEditComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot()
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:AuthInterceptorService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
