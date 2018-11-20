import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-top-header-menu',
  templateUrl: './top-header-menu.component.html',
  styleUrls: ['./top-header-menu.component.css']
})
export class TopHeaderMenuComponent implements OnInit {

  @Input() portalPages: any;
  @Input() allNews: any;
  pages: Array<any>;
  constructor() {
  }

  ngOnInit() {
    if (this.allNews && this.portalPages) {
      this.allNews.forEach((news) => {
        console.log(this.portalPages);
        if (news.isItNew === true) {
          console.log('news', this.allNews);
          const pagesArr = [];
          this.portalPages.forEach((page) => {
            if (page.id === 'TY89iyga57SQ') {
              const routerUrl = page.routeUrl;
              const newPage = {
                'id': page.id,
                'imgSrc': page.imgSrc,
                'routeUrl': routerUrl + '/' + news.id,
                'isHomePage': page.isHomePage,
                'name': page.name
              };
              console.log(newPage);
              pagesArr.push(newPage);
            } else {
              console.log('p', page);
              pagesArr.push(page);
            }
            this.pages = pagesArr;
            console.log('pages new', this.pages);
          });
        }
      });
    }
  }


  setActiveClass(id) {
    const items = document.getElementsByClassName('top-btn');
    for (let count = 0; count < items.length; count++) {
      // document.getElementById(items[count].id).style.backgroundColor = '#2390D2';
    }
    // document.getElementById(id).style.backgroundColor = '#3779B6';
  }

  executeForNavigation () {
    const x = document.getElementById('myTopnav');
    if (x.className === 'topnav') {
      x.className += ' responsive';
    } else {
      x.className = 'topnav';
    }
  }
}
