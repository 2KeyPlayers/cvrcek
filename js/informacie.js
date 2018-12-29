Vue.component('zamestnanec', {
  props: ['data'],
  template: `<div class="card">
    <a v-bind:name="data.id"></a>
    <div class="image">
      <img v-bind:src="obrazok(data.id)" />
    </div>
    <div class="content" v-bind:data-content="data.meno">
      <div class="header">{{ data.prezyvka }}</div>
      <div class="meta"> {{ data.pozicia }}</div>
    </div>
  </div>`,
  methods: {
    obrazok: function (id) {
      return 'obrazky/zamestnanci/' + id + '.svg';
    }
  }
})

var app = new Vue({
  el: '#app',
  data: {
    zamestnanci: null,
    interni: null,
    externi: null
  },
  methods: {
    prazdnePole: function(pole) {
      return !pole || pole.length == 0;
    }
  }
})

$.getJSON('/data/zamestnanci.json', function (json) {
  app.zamestnanci = json;
  app.interni = json.filter(zamestnanec => (!zamestnanec.ext || zamestnanec.ext != 1));
  app.externi = json.filter(zamestnanec => (zamestnanec.ext && zamestnanec.ext == 1));
});