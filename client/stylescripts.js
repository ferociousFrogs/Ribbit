// Come back to this after MVP to implement rotating text in intro

import $ from 'jquery';

if ($.cookie('theme_csspath')) {
  $('link#theme-stylesheet').attr('href', $.cookie('theme_csspath'));
}
if ($.cookie('theme_layout')) {
  $('body').addClass($.cookie('theme_layout'));
}

$(() => {
  rotatingText();
});

/* =========================================
 *  rotating text
 *  =======================================*/

function rotatingText() {
  $('#intro .rotate').textrotator({
    animation: 'fade',
    speed: 3000
  });
}
