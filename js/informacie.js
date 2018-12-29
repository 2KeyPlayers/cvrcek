Vue.component('zamestnanec', {
  props: ['data'],
  template: `<div class="card">
    <a v-bind:name="data.id"></a>
    <div class="image">
      <img v-bind:src="obrazok(data.id)" />
    </div>
    <div class="content" v-bind:data-content="data.meno">
      <div class="header">{{ data.prezyvka }}</div>
      <div class="meta">{{ data.pozicia }}</div>
    </div>
    <!--div class="extra content" v-if="data.kredity">
      <a onclick="app.nastavZamestnanca(data.meno, data.kredity); $('.kredity.modal').modal('show')" style="width:100%"><i class="graduation cap icon"></i> Kredity: {{ zratajKredity(data.kredity) }}</a>
    </div>
    <div class="extra content" v-if="!data.kredity">
      <i class="graduation cap icon"></i> Kredity: 0</a>
    </div-->
    <div class="kredity extra content" v-if="data.kredity" v-bind:data-html="vzdelavanie(data.kredity)">
      <i class="graduation cap icon"></i> Kredity: {{ zratajKredity(data.kredity) }}</a>
    </div>
    <div class="extra content" v-if="!data.kredity">
      <i class="graduation cap icon"></i> Kredity: 0</a>
    </div>
  </div>`,
  data: {
    pocetKreditov: 0,
    vzdelavanie: null
  },
  methods: {
    obrazok: function (id) {
      return 'obrazky/zamestnanci/' + id + '.svg';
    },
    zratajKredity: function (kredity) {
      this.pocetKreditov = 0;
      if (kredity) {
        kredity.forEach(kredit => {
          if (kredit.pocet) {
            this.pocetKreditov = this.pocetKreditov + kredit.pocet;
          }
        });
      }
      return this.pocetKreditov;
    },
    vzdelavanie: function (kredity) {
      this.vzdelavanie = '';
      if (kredity) {
        kredity.forEach(kredit => {
          if (this.vzdelavanie.length > 0) {
            this.vzdelavanie = this.vzdelavanie.concat('<br />');
          }
          this.vzdelavanie = this.vzdelavanie.concat(kredit.nazov + ' [' + (kredit.pocet ? kredit.pocet : '-') + ']');
        });
      }
      return this.vzdelavanie;
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
    zamestnanci: null,
    interni: null,
    externi: null
  },
  methods: {
    prazdnePole: function (pole) {
      return !pole || pole.length == 0;
    }
    // nastavZamestnanca: function (meno, kredity) {
    //   this.zamestnanec = {
    //     meno: meno,
    //     kredity: kredity
    //   };
    // }
  }
})

$.getJSON('/data/zamestnanci.json', function (json) {
  app.zamestnanci = json;
  app.interni = json.filter(zamestnanec => (!zamestnanec.ext || zamestnanec.ext != 1));
  app.externi = json.filter(zamestnanec => (zamestnanec.ext && zamestnanec.ext == 1));
});