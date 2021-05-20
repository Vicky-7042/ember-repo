import Ember from 'ember';

export default Ember.Route.extend({
    async model(){
      const response = await $.getJSON("https://localhost:44347/api/users");
        return response;
  }
  
});
