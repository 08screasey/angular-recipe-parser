import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name:'shorten'
})

export class ShortenPipe implements PipeTransform{
transform(value:any):any{
	if(value.length>40){
	return value.substring(0,40)+' ...'}
	else return value
}
}