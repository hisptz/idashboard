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
    if (this.downloads) {
      console.log('downloads', this.downloads);
      document.getElementById('defaultOpen').click();
    }
  }

  openCity(evt, downloadOption) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = 'none';
    }
    tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(' active', '');
    }
    document.getElementById(downloadOption).style.display = 'block';
    evt.currentTarget.className += ' active';
  }

  trustedUrl(url) {
    console.log(url);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
