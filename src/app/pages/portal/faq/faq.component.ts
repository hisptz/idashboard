import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  @Input() portalFAQ : any;

  constructor(private faqSanitizer: DomSanitizer) { }

  ngOnInit() {
    console.log('CAINAM FAQS TS: ' + JSON.stringify(this.portalFAQ));
  }

  openOtherFAQItems(event, id) {
    console.log("I'm CLicked By Cainam");
  }

  openCity(evt, elementID, data) {
    if (data.faq.faqMenu.id === elementID) {
      console.log('CAINAM TESTING: ' + JSON.stringify(data.faq.faqMenu.id));
    } else {
      console.log('CAINAM TESTING: ' + JSON.stringify(data.faq));
    }

    // let i, tabcontent, tablinks;
    // tabcontent = document.getElementsByClassName('tabcontent');
    // for (i = 0; i < tabcontent.length; i++) {
      
    // }

    // document.getElementById(tabIndex).style.display = 'block';
    // evt.currentTarget.className += ' active';
  }

  trustedUrl(url) {
    console.log(url);
    return this.faqSanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
