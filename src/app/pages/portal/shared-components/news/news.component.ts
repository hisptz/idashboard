import {Component, Input, OnInit} from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  @Input() allNews: any;
  constructor() { }

  ngOnInit() {
    $.fn.liScroll = function(settings) {
      settings = $.extend({
        travelocity: 0.02
      }, settings);
      return this.each(function() {
        const $strip = $(this);
        $strip.addClass('newsticker')
        let stripHeight = 1;
        $strip.find('li').each(function(i) {
          stripHeight += ($(this, i).outerHeight(true)) / 1.5;
        });
        const $mask = $strip.wrap('<div class=' + '"mask"' + '></div>');
        const $tickercontainer = $strip.parent().wrap('<div class=' + '"tickercontainer"' + '></div>');
        const containerHeight = ($strip.parent().parent().height()) / 1.5;
        $strip.height(stripHeight);
        const totalTravel = stripHeight;
        const defTiming = totalTravel / settings.travelocity;
        function scrollnews(spazio, tempo) {
          $strip.animate({top: '-=' +  spazio}, tempo, 'linear', function() {$strip.css('top', containerHeight); scrollnews(totalTravel, defTiming);});
        }
        scrollnews(totalTravel, defTiming);
        $strip.hover(function() {
            $(this).stop();
          },
          function() {
            const offset = $(this).offset();
            const residualSpace = offset.top + stripHeight;
            const residualTime = residualSpace / settings.travelocity;
            scrollnews(residualSpace, residualTime);
          });
      });
    };

    $(function() {
      $('ul#scrollingUl').liScroll();
    });
  }

}
