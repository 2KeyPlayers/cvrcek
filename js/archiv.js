Vue.component('cvrckovina', {
  props: ['data'],
  template: `<div class="item">
    <div class="image" v-if="data.obrazok"><img v-bind:src="obrazok(data.obrazok)" /></div>
    <div class="content">
      <div class="header" v-html="data.nazov"></div>
      <div class="meta">
        <span class="datum" v-if="data.datum"><i class="calendar icon"></i> {{ data.datum }}</span>
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
    linkAutora: function (autor) {
      if (!autor || autor == 'cvc') {
        return 'informacie.html#zamestnanci';
      } else if (autor == '2kp') {
        return 'http://2keyplayers.com';
      } else {
        return 'informacie.html#' + autor;
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
        return '???';
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
    zobrazitDalsie: function () {
      this.nahravam = true;
      var self = this;
      setTimeout(function() {
        self.zobrazene = Math.min(self.pocet, self.starsie.length);
        self.cvrckoviny = self.cvrckoviny.concat(self.starsie.splice(0, self.zobrazene));
        self.dalsie = self.starsie.length > 0;
        self.nahravam = false;
      }, 1000);
    }
  }
})

$.getJSON('/data/archiv/archiv2018.json', function (json) {
  app.najnovsie = json;

  if (app.najnovsie.length > 2) {
    app.starsie = app.najnovsie.splice(2);
    app.cvrckoviny = [];
    app.zobrazitDalsie();
  }
});