import Ember from 'ember';

export default Ember.Component.extend({
    classNames:['filter'],
    columnValue:'',
    userValue:'',
    userList:[],
    filterList:["Equal","NotEqual","Null","NotNull"],
    columnList:Ember.computed('filterValue',function(){
         if(this.get('filterValue')==="NotNull"){
             return ["AllColumn","FirstName", "LastName", "City", "Department", "JobTitle", "Email", "PhoneNumber", "CompanyName", "Country", "PostalCode", "IsAdmin", "IsGuestUser", "FaxNumber", "SigninStatus", "State"];
         }
         else{
             return ["FirstName", "LastName", "City", "Department", "JobTitle", "Email", "PhoneNumber", "CompanyName", "Country", "PostalCode", "IsAdmin", "IsGuestUser", "FaxNumber", "SigninStatus", "State"];
         }
    }),
    filterValue:'',
    filteredData:[],
    isColumnSelected:Ember.computed('columnValue',function(){
        if(this.get('columnValue')==="" || this.get('columnValue')===null){
            return false;
        }
        else{
            return true;
        }
    }),
    ifValueChange:Ember.observer('columnValue','filterValue','userValue',function(){
       this.get('setFilterValue')(this.get('columnValue'),this.get('filterValue'),this.get('userValue')); 
    }),
    isFilter:Ember.computed('columnValue','filterValue',function(){
        if(
            (this.get('columnValue')!==null && this.get('columnValue')!=="")&&
            (this.get('filterValue')!==null && this.get('filterValue')!=="")&&
            (this.get('userValue')!==null && this.get('userValue')!=="")
         ){
            return true;
        }
        else if(
            (this.get('columnValue')!==null && this.get('columnValue')!=="")&&
            (this.get('filterValue')!==null && this.get('filterValue')!=="")&&
            (this.get('userValue')===null || this.get('userValue')==="")&&
            (this.get('isFilterNull')===true)
        ){
               return true;
        }
        else{
            return false;
        }
    }),
    isFilterNull:Ember.computed('filterValue',function(){
            if(this.get('filterValue')=="Null" || this.get('filterValue')=="NotNull"){
                return true;
            }
            else{
                return false;
            }

    }),
    filterData(){
       if(
           (this.get('columnValue')!==null && this.get('columnValue')!=="")&&
           (this.get('filterValue')!==null && this.get('filterValue')!=="") &&
           (this.get('userValue')!==null && this.get('userValue')!=="")
        ){
               $.getJSON("https://localhost:44347/api/users/filter?column="+this.get('columnValue')+"&option="+this.get('filterValue')+"&value="+this.get('userValue')).then((res)=>{
                 this.set('filteredData',res);
                 this.get('setFilterData')(this.get('filteredData'));
                 this.get('setFilter')(this.get('isFilter'));
               }).catch(()=>{
                   console.log("An error has occuresd");
               });
           }
           else if(
            (this.get('columnValue')!==null && this.get('columnValue')!=="")&&
            (this.get('filterValue')!==null && this.get('filterValue')!=="")&&
            (this.get('userValue')===null || this.get('userValue')==="")&&
            (this.get('isFilterNull')===true)
        ){
            $.getJSON("https://localhost:44347/api/users/filter?column="+this.get('columnValue')+"&option="+this.get('filterValue')).then((res)=>{
                this.set('filteredData',res);
                this.get('setFilterData')(this.get('filteredData'));
                this.get('setFilter')(this.get('isFilter'));
              }).catch(()=>{
                  console.log("An error has occuresd");
              });
        }
           else{
            this.get('setFilter')(false);
           }
 
    },
    actions:{
        onSelectColumn(val){
            this.set('columnValue',val);
            if(this.get('columnValue')==="" || this.get('columnValue')===null){
                this.set('filterValue',"");
                this.set('userValue',"");
                this.get('setFilter')(false);
            }
            this.filterData();
        },
        
        onSelectFilter(val){
           this.set('filterValue',val);
           this.filterData();
        },
        onSelectValue(val){
            this.set('userValue',val);
            this.filterData();
        },
        onUserValue(){
            if(this.get('columnValue')!=="" && this.get('columnValue')!==null){
                $.getJSON("https://localhost:44347/api/users/column?value="+this.get('columnValue')).then((res)=>{
                    this.set('userList',res);
                }).catch((er)=>{
                 console.log(er);
                  });
            }
           
        },
        clearColumn(){
            this.set('columnValue',"");
            this.set('userValue',"");
            this.set('filterValue',"");
            this.get('setFilter')(false);
        }

    }
});
