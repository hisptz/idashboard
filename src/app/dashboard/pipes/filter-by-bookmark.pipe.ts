import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByBookmark'
})
export class FilterByBookmarkPipe implements PipeTransform {

  transform(value: any, showOnlyBookmark: boolean): any {

    if (!showOnlyBookmark) {
      return value;
    }

    return value.filter((valueItem) => valueItem.details.bookmarked && showOnlyBookmark);
  }

}
