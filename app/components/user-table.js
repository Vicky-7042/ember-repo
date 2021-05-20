import Ember from 'ember';

export default Ember.Component.extend({
    classNames:['table'],
    index:Ember.computed('index',function(){
        console.log(this.get('index'));
        this.set('index',this.get('index')+1);
    })
});
