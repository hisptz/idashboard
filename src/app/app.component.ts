import {Component, HostListener, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AppState} from './store/app.reducers';
import {Store} from '@ngrx/store';
import * as currentUser from './store/current-user/current-user.actions';
import {getPage} from './store/pages/page.selectors';
import {Observable} from 'rxjs/Observable';
import {PageState} from './store/pages/page.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  page$: Observable<PageState>;
  pages: any;
  footer: string;
  pageToDisplay: string;
  constructor(
    private titleService: Title,
    private store: Store<AppState>
  ) {
    store.dispatch(new currentUser.LoadAction());
    this.page$ = store.select(getPage);
  }

  ngOnInit() {
    this.setTitle('Observatory');
    if (this.page$) {
      this.page$.subscribe((thePage) => {
        if (thePage) {
          console.log(thePage);
          this.pageToDisplay = thePage.headerContents;
          this.footer = thePage.footerContents;
          this.pages = thePage.pages;
        }
        if (thePage) {
          const pagesArr = []; const subMenus = [];
          if (thePage.id.indexOf('dashboards') >= 0) {
            thePage.pages.forEach((page) => {
              if (page.id !== 'home') {
                if (page.routeUrl.indexOf('dashboards') >= 0) {
                  const newHomePage = {
                    id: page.id,
                    name: 'Home',
                    category: 'leaf',
                    routeUrl: page.routeUrl
                  };
                  pagesArr.push(newHomePage);
                } else {
                  if (page.parentId === '' && page.category !== 'parent') {
                    pagesArr.push(page);
                  } else {
                    // create a new dropdown page
                    const newDropDownPage = {
                      id: page.id,
                      name: page.name,
                      category: 'parent',
                      routeUrl: page.routeUrl,
                      subMenu: []
                    };
                  }
                }
              }
            });
          } else {
            thePage.pages.forEach((page) => {
              if (page.category === 'leaf' && page.parentId === '') {
                pagesArr.push(page);
              } else if (page.category === 'parent') {
                // create a new dropdown page
                const newDropDownPage = {
                  id: page.id,
                  name: page.name,
                  category: 'parent',
                  routeUrl: page.routeUrl,
                  subMenu: []
                };
                pagesArr.push(newDropDownPage);
              } else {
                subMenus.push(page);
              }
            });
          }
          if (pagesArr.length > 0) {
            const newPagesArr = [];
            pagesArr.forEach((page) => {
              if (page.category === 'parent') {
                page.subMenu = subMenus;
                newPagesArr.push(page);
              } else {
                newPagesArr.push(page);
              }
            });
            if (newPagesArr.length > 0) {
              this.pages = newPagesArr;
            }
          }
          this.pageToDisplay = thePage.headerContents;
          this.footer = thePage.footerContents;
        }
      });
    }
  }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  setActiveClass(id) {
    const items = document.getElementsByClassName('top-btn');
    for (let count = 0; count < items.length; count++) {
      document.getElementById(items[count].id).style.backgroundColor = '#1d49af';
    }
    document.getElementById(id).style.backgroundColor = '#3779B6';
  }
}
