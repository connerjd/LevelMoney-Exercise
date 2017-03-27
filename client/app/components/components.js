import angular from 'angular';
import Home from './home/home';
import LevelMoney from './levelMoney/levelMoney';

let componentModule = angular.module('app.components', [
    Home,
    LevelMoney
])

    .name;

export default componentModule;
