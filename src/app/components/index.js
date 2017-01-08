import suggestion from './suggestion';
import votes from './votes';

const components = angular.module('components', [])
   .component('suggestion', suggestion)
   .component('votes', votes)


export default components;
