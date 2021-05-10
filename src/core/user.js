import Vue from 'vue';
import VueStorage from 'vue-ls';
// import VConsole from 'vconsole';

const _ = require('lodash');

const config =  {
  // vue-ls options
  storageOptions: {
    namespace: 'pro__', // key prefix
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'local' // storage name session, local, memory
  },
  storageOptionsSession: {
    namespace: 'pro__', // key prefix
    name: 'ss', // name variable Vue.[ss] or this.[$ls],
    storage: 'session' // storage name session, local, memory
  }
};

Vue.use(_.clone(VueStorage), config.storageOptions);
Vue.use(_.clone(VueStorage), config.storageOptionsSession);