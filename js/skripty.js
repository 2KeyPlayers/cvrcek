function inicializuj() {
  $('span.copyright').html('2004-' + new Date().getFullYear());
  $('.message .close').on('click', function() {
    $(this)
      .closest('.message')
      .transition('fade')
    ;
  });

  var href = window.location.href;
  var url = new URL(href);
  var id = url.searchParams.get("id");
  if (id && $('#' + id)) {
    $('html, body').animate({
      scrollTop: parseInt($('#' + id).offset().top)
    });
  }
}

function hore() {
  $('html, body').animate({
    scrollTop: 0
  }, 500);
}
