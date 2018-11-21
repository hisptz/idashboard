import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-top-header-menu',
  templateUrl: './top-header-menu.component.html',
  styleUrls: ['./top-header-menu.component.css']
})
export class TopHeaderMenuComponent implements OnInit {

  @Input() portalConfigurations: any;
  @Input() allNews: any;
  pages: Array<any>;
  headerInfo: any;
  constructor() {
  }

  ngOnInit() {
    if (this.allNews && this.portalConfigurations) {
      this.headerInfo = this.portalConfigurations['header'];
      this.allNews.forEach((news) => {
        if (news.isItNew === true) {
          const pagesArr = [];
          this.portalConfigurations['pages'].forEach((page) => {
            if (page.id === 'TY89iyga57SQ') {
              const routerUrl = page.routeUrl;
              const newPage = {
                'id': page.id,
                'imgSrc': page.imgSrc,
                'routeUrl': routerUrl + '/' + news.id,
                'isHomePage': page.isHomePage,
                'name': page.name
              };
              pagesArr.push(newPage);
            } else {
              pagesArr.push(page);
            }
            this.pages = pagesArr;
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
