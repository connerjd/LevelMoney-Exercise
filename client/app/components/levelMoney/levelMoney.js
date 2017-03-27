import angular from 'angular';
import levelMoneyComponent from './levelMoney.component';

let levelMoneyModule = angular.module('levelMoney', [])

.component('levelMoney', levelMoneyComponent)

.name;

export default levelMoneyModule;
