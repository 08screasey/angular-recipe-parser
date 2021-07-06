export interface Recipe {
	title:string, 
	time:number,  
	servings:number, 
	imagePath:string,
	ingredients?:string[],
	instructions?: string[],
	id?:string,
	meal?:string,
	dbId?:string,
	sourceUrl?:string,
}