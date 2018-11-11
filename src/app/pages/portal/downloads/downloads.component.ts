import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.css']
})
export class DownloadsComponent implements OnInit {

  @Input() downloads: any;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    console.log('CAINAM DOWNLOAD TS: ' + JSON.stringify(this.downloads));
  }

  openCity(evt, downloadOption) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = 'none';
    }
    tablinks = document.getElementsByClassName('tablinks');
    console.log('tab links', tablinks);
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(' active', '');
      if (tablinks[i].id === 'btn-' + downloadOption) {
        console.log('tablinks[i].id', tablinks[i].id);
        console.log('downloadOption', 'btn-' + downloadOption);
        document.getElementById(tablinks[i].id).classList.add('active');
      }
    }
    document.getElementById(downloadOption).style.display = 'block';
    evt.currentTarget.className += ' active';
  }

  trustedUrl(url) {
    console.log(url);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
