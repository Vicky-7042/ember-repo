import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';

export default AjaxService.extend({
    host:'https://localhost:44347',
    namespace:'/api'
});
