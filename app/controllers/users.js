import Ember from 'ember';


export default Ember.Controller.extend({
    isFilter:false,
    filteredData:[],
    nullCount:'',
    columnValue:'',
    filterValue:'',
    userValue:'',
    toShowNullCount:false,
    setFilterData(filteredData){
        this.set('filteredData',filteredData);
    },
    setFilter(isFilter){
        this.set('isFilter',isFilter);
        if(isFilter===false){
            this.set('toShowNullCount',false);
        }
    },
    setFilterValue(col,fil,user){
        this.set('columnValue',col);
        this.set('filterValue',fil);
        this.set('userValue',user);
    },
    actions:{
        getNullCount(){
            const nullcountmap=[];
            Ember.$.getJSON("https://localhost:44347/api/users/nullcount?col="+this.get('columnValue')+"&opt="+this.get('filterValue')+"&val="+this.get('userValue')).then((res)=>{
                console.log(res);
                Object.keys(res).forEach(function(key) {
                    nullcountmap.push({
                        column:key,
                        count:res[key]
                    });
                });
                nullcountmap.sort((a,b)=>{
                    return a.count<b.count?1:-1;
                });
                while(nullcountmap.length>5){
                    nullcountmap.pop();
                }
               this.set('nullCount',nullcountmap);
            });
         this.set('toShowNullCount',true);
        },
        clear(){
            this.set('toShowNullCount',false);
        }

    }
});
