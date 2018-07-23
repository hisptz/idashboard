import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'createAbsoluteUrl'
})
export class CreateAbsoluteUrlPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const sPath = value;
    let nUpLn; let sDir = '';
    let nStart = 0;
    for (let nEnd; nEnd = sPath.indexOf('/../', nStart), nEnd > -1; nStart = nEnd + nUpLn) {
      nUpLn = /^\/(?:\.\.\/)*/.exec(sPath.slice(nEnd))[0].length;
      sDir = (sDir + sPath.substring(nStart, nEnd)).replace(new RegExp('(?:\\\/+[^\\\/]*){0,' + ((nUpLn - 1) / 3) + '}$'), '/');
    }
    // console.log('the pipe result', sDir + sPath.substr(nStart));
    return sDir + sPath.substr(nStart);
    // return value;
  }

}
