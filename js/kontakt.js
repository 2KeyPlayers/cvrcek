var app = new Vue({
  el: '#app',
  data: {
    pracovnyCas: null,
    typ: 'cvrcek'
  },
  methods: {
    zmenTyp: function (typ) {
      app.typ = typ;
    }
  },
  mounted: function() {
    $.getJSON('/data/pracovny-cas.json', function (json) {
      app.pracovnyCas = json;

      $(document).ready(function () {
        if (('ontouchstart' in document.documentElement) || ('ontouchstart' in window)) {
          $('#app').addClass('touch');
        }
        inicializuj();
      });
    });
  }
})
