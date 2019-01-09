Vue.component('kruzok', {
  props: ['data'],
  template: `<div class="card">
    <div class="content">
      <div class="header">{{ data.nazov }}</div>
      <div class="description">
        <div class="author">
          <a v-bind:href="linkVeduceho(data.veduci)"><img class="ui avatar image" v-bind:src="obrazokVeduceho(data.veduci)" /> {{ menoVeduceho(data.veduci) }}</a>
        </div>
      </div>
    </div>
    <div class="center aligned cinnost extra content" v-on:click="zobrazDetaily()">
      <p v-show="detaily" v-html="casMiesto(data.kedyKde)" class="left aligned"></p>  
      <i v-bind:class="'chevron ' + (detaily ? 'up' : 'down') + ' icon'"></i>
    </div>
  </div>`,
  data: function() {
    return {
      detaily: false
    }
  },
  methods: {
    zobrazDetaily: function () {
      this.detaily = !this.detaily;
    },
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
        return 'informacie.html?id=zamestnanci';
      } else {
        return 'informacie.html?id=' + veduci;
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
    prazdnePole: function (pole) {
      return !pole || pole.length == 0;
    }
  },
  mounted: function() {
    $.getJSON('/data/kruzky.json', function (json) {
      app.kruzky = json;

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

// $.getJSON('/data/kruzky.json', function (json) {
//   app.kruzky = json;
// });