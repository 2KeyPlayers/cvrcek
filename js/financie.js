$(document).ready(function () {

  $('span.copyright').html('2004-' + new Date().getFullYear());

  var href = window.location.href;
  var url = new URL(href);
  var id = url.searchParams.get("id");
  if (id && $('#' + id)) {
    $('html, body').animate({
      scrollTop: parseInt($('#' + id).offset().top)
    });
  }

});