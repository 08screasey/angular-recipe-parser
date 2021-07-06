import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name:'urlParse'
})

export class urlParsePipe implements PipeTransform{
transform(value:any):any{
	var url = value;
var urlParts = url.replace('http://','').replace('https://','').split(/[/?#]/);
var domain = urlParts[0];
return domain
}
}