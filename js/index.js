Vue.component('cvrckovina', {
  props: ['data'],
  template: `<div class="item">
    <div class="image" v-if="data.obrazok"><img v-bind:src="obrazok(data.obrazok)" /></div>
    <div class="content">
      <div class="header" v-html="data.nazov"></div>
      <div class="meta">
        <span class="datum" v-if="data.datum" v-bind:data-tooltip="textDatumu(data.datum)"><i v-bind:class="ikonaDatumu(data.datum)"></i> {{ data.datum }}</span>
        <span class="datum" v-else><i class="info circle icon"></i> {{ data.typ ? data.typ : 'Oznam' }}</span>
        <span class="autor"><a v-bind:href="linkAutora(data.autor)"><i class="user icon"></i> {{ menoAutora(data.autor) }}</a></span>
        <span class="fotka" v-for="fotka in data.fotky"><a v-bind:href="fotka"><i class="camera icon"></i></a></span>
        <span class="priloha" v-for="priloha in data.prilohy"><a v-bind:href="priloha"><i class="paperclip icon"></i></a></span>
        <span class="detail" v-for="detail in data.detaily"><a v-bind:href="detail"><i class="search icon"></i></a></span>
        <span class="facebook" v-for="fb in data.facebook"><a v-bind:href="fb"><i class="facebook icon"></i></a></span>
      </div>
      <div class="description">
        <p v-for="text in data.text" v-html="text"></p>
      </div>
    </div>
  </div>`,
  methods: {
    obrazok: function (obrazok) {
      return 'obrazky/aktuality/' + obrazok;
    },
    porovnajDatum: function (datum) {
      let pole = datum.split('.');
      let den = pole[0].padStart(2, '0');
      let mesiac = pole[1].padStart(2, '0');
      let rok = pole[2];
      let d = new Date(`${rok}-${mesiac}-${den}T00:00:00`);
      let dnes = new Date();
      dnes.setHours(0, 0, 0, 0);
      if (dnes.getTime() > d.getTime()) {
        return true;
      }
      return false;
    },
    ikonaDatumu: function (datum) {
      let ikona = 'alternate';
      if (this.porovnajDatum(datum)) {
        ikona = 'check';
      }
      return 'calendar ' + ikona + ' icon';
    },
    textDatumu: function (datum) {
      let text = 'Pripravovaná';
      if (this.porovnajDatum(datum)) {
        text = 'Uskutočnená';
      }
      return text;
    },
    linkAutora: function (autor) {
      if (!autor || autor == 'cvc') {
        return 'informacie.html?id=zamestnanci';
      } else if (autor == '2kp') {
        return 'http://2keyplayers.com';
      } else {
        return 'informacie.html?id=' + autor;
      }
    },
    menoAutora: function (autor) {
      if (!autor || autor == 'cvc') {
        return 'CVČ';
      } else if (autor == '2kp') {
        return '2KP';
      } else if (autor == 'mt') {
        return 'Teta Marika';
      } else if (autor == 'kb') {
        return 'Teta Katka';
      } else if (autor == 'dd') {
        return 'Teta Diana';
      } else if (autor == 'rm') {
        return 'Teta Radka';
      } else if (autor == 'np') {
        return 'Ujo Norbi';
      } else if (autor == 'pf') {
        return 'Ujo Peťo';
      } else if (autor == 'ms') {
        return 'Teta Marcela';
      } else if (autor == 'mn') {
        return 'Teta Mia';
      } else if (autor == 'jh') {
        return 'Ujo Jano';
      } else {
        return 'CVČ';
      }
    }
  }
})

var app = new Vue({
  el: '#app',
  data: {
    najnovsie: null,
    cvrckoviny: null,
    starsie: null,
    zobrazene: 0,
    pocet: 5,
    dalsie: false,
    nahravam: false
  },
  methods: {
    prazdnePole: function (pole) {
      return !pole || pole.length == 0;
    },
    zobrazitDalsie: function (pauza) {
      if (pauza == undefined) {
        pauza = 1000;
      }
      this.nahravam = true;
      var self = this;
      setTimeout(function() {
        self.zobrazene = Math.min(self.pocet, self.starsie.length);
        self.cvrckoviny = self.cvrckoviny.concat(self.starsie.splice(0, self.zobrazene));
        self.dalsie = self.starsie.length > 0;
        self.nahravam = false;
      }, pauza);
    }
  },
  mounted: function() {
    $.getJSON('/data/cvrckoviny.json', function (json) {
      app.najnovsie = json;
      // remove last 'template' item
      app.najnovsie.shift();
    
      if (app.najnovsie.length > 2) {
        app.starsie = app.najnovsie.splice(2);
        app.cvrckoviny = [];
        app.zobrazitDalsie(0);
      }

      $(document).ready(function () {
        if (('ontouchstart' in document.documentElement) || ('ontouchstart' in window)) {
          $('#app').addClass('touch');
        }
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
    });
  }
})

// $.getJSON('/data/cvrckoviny.json', function (json) {
//   app.najnovsie = json;
//   // remove last 'template' item
//   app.najnovsie.shift();

//   if (app.najnovsie.length > 2) {
//     app.starsie = app.najnovsie.splice(2);
//     app.cvrckoviny = [];
//     app.zobrazitDalsie(0);
//   }
// });