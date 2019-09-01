$(document).ready(function () {

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

  // var ll = new google.maps.LatLng(48.6127996,20.9988147),
  // options = {
  //     zoom: 18.01,
  //     center: ll,
  //     mapTypeId: google.maps.MapTypeId.ROADMAP,
  //     mapTypeControl: !1,
  //     scrollwheel: !1,
  //     draggable: !0,
  //     navigationControl: !1
  // },
  // map = new google.maps.Map(document.getElementById("map-canvas"), options);

  // google.maps.event.addDomListener(window, "resize", function () {
  //   var e = map.getCenter();
  //   google.maps.event.trigger(map, "resize"), map.setCenter(ll)
  // });

  // var marker = new google.maps.Marker({
  //   position: ll,
  //   map: map
  // });
})