import router from 'angular-ui-router';
import components from './components';
// import appComponent from './app.component';
import appController from './app.controller';
import themdb from './services/themdb.js';
import './app.styles.scss';

const app = angular.module('app', [
  router,

  components.name
]);

// app.component('app', appComponent);

app.service('themdb', themdb);
app.controller('appController', appController);


app.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $stateProvider
    .state({
      name: 'root',
      url: '/',
      component: 'votes'
    })
    .state({
      name: 'suggestion',
      url: '/suggestion',
      component: 'suggestion'
    })

  $urlRouterProvider.otherwise('/');
});

export default app;
