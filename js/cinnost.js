Vue.component('kruzok', {
  props: ['data'],
  template: `<div class="card" v-bind:data-html="casMiesto(data.kedyKde)">
    <div class="content">
      <div class="header">{{ data.nazov }}</div>
      <div class="description">
        <div class="author">
          <a v-bind:href="linkVeduceho(data.veduci)"><img class="ui avatar image" v-bind:src="obrazokVeduceho(data.veduci)" /> {{ menoVeduceho(data.veduci) }}</a>
        </div>
      </div>
    </div>
  </div>`,
  methods: {
    casMiesto: function (kedyKde) {
      return kedyKde.join('<br />');
    },
    obrazokVeduceho: function (veduci) {
      if (!veduci || veduci == 'cvc') {
        return 'obrazky/cvrcek.svg';
      } else {
        return 'obrazky/zamestnanci/' + veduci + '.svg';
      }
    },
    linkVeduceho: function (veduci) {
      if (!veduci || veduci == 'cvc') {
        return 'informacie.html#zamestnanci';
      } else {
        return 'informacie.html#' + veduci;
      }
    },
    menoVeduceho: function (veduci) {
      if (!veduci || veduci == 'cvc') {
        return 'CVČ';
      } else if (veduci == 'mt') {
        return 'Teta Marika';
      } else if (veduci == 'kb') {
        return 'Teta Katka';
      } else if (veduci == 'dd') {
        return 'Teta Diana';
      } else if (veduci == 'rm') {
        return 'Teta Radka';
      } else if (veduci == 'np') {
        return 'Ujo Norbi';
      } else if (veduci == 'pf') {
        return 'Ujo Peťo';
      } else if (veduci == 'ms') {
        return 'Teta Marcela';
      } else if (veduci == 'mn') {
        return 'Teta Mia';
      } else if (veduci == 'jh') {
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
    kruzky: null
  },
  methods: {
    prazdnePole: function(pole) {
      return !pole || pole.length == 0;
    }
  }
})

$.getJSON('/data/kruzky.json', function (json) {
  app.kruzky = json;
});