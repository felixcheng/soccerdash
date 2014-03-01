$(document).ready(function() {
  $('body').on('mouseenter', '.toggle', function() {
    $('.menu').animate({left: '0%', opacity: '1'}, 1000);
  })

  $('body').on('mouseleave', '.menu', function() {
    $('.menu').animate({left: '-31%', opacity: '0'}, 1000);
  })

  $('body').on('click', '.close', function() {
    $('.menu').animate({left: '-31%', opacity: '0'}, 1000);
  })

  $('body').append(
  '<a href="http://hackreactor.com"> \
  <img style="position: fixed; top: 0; right: 0; border: 0;" \
  src="http://i.imgur.com/x86kKmF.png" \
  alt="Built at Hack Reactor"> \
  </a>');

})
