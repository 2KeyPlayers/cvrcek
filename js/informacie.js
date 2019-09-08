Vue.component('zamestnanec', {
  props: ['udaje'],
  template: `<div class="card">
    <a v-bind:id="udaje.id" v-bind:name="udaje.id"></a>
    <div class="ui slide masked reveal image" v-if="!udaje.pn">
      <img v-bind:src="obrazok(udaje.id)" class="visible content" />
      <img v-bind:src="fotka(udaje.id)" class="hidden content" />
    </div>
    <div class="blurring dimmable image" v-if="udaje.pn">
      <div class="ui active inverted dimmer">
        <div class="content">
          <div class="center">
            <p>{{ udaje.pn }}</p>
          </div>
        </div>
      </div>
      <img v-bind:src="obrazok(udaje.id)" />
    </div>
    <div class="content" v-bind:data-content="udaje.meno">
      <div class="header">{{ udaje.prezyvka }}</div>
      <div class="meta">{{ udaje.pozicia }}</div>
    </div>
    <div class="kredity extra content" v-if="udaje.kredity" v-on:click="nastavZamestnanca(udaje)">
      <i class="graduation cap icon"></i> Kredity: {{ zratajKredity(udaje.kredity) }}
    </div>
    <div class="extra content" v-else>
      &nbsp;
    </div>
  </div>`,
  methods: {
    obrazok: function (id) {
      return 'obrazky/zamestnanci/' + id + '.svg';
    },
    fotka: function (id) {
      return 'obrazky/zamestnanci/foto-' + id + '.jpg';
    },
    zratajKredity: function (kredity) {
      let pocetKreditov = 0;
      if (kredity) {
        kredity.forEach(kredit => {
          if (kredit.pocet) {
            pocetKreditov = pocetKreditov + kredit.pocet;
          }
        });
      }
      return pocetKreditov;
    },
    nastavZamestnanca: function (zamestnanec) {
      this.$emit('zobraz-zamestnanca', zamestnanec);
    }
  }
})

var app = new Vue({
  el: '#app',
  data: {
    zamestnanec: {
      meno: '',
      kredity: []
    },
    interni: null,
    externi: null
  },
  methods: {
    prazdnePole: function (pole) {
      return !pole || pole.length == 0;
    },
    zobrazZamestnanca: function (zamestnanec) {
      this.zamestnanec = zamestnanec;
      $('.vzdelavanie.modal').modal('show');
    }
  },
  mounted: function() {
    $.getJSON('/data/zamestnanci.json', function (json) {
      app.interni = json.filter(zamestnanec => (!zamestnanec.ext || zamestnanec.ext != 1));
      app.externi = json.filter(zamestnanec => (zamestnanec.ext && zamestnanec.ext == 1));

      $(document).ready(function () {
        if (('ontouchstart' in document.documentElement) || ('ontouchstart' in window)) {
          $('#app').addClass('touch');
        }
        $('.cards .card .content').popup();
        $('.colors .label').popup();
        inicializuj();
      });
    });
  }
})
