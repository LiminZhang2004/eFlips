

Eflips.itemList = (function () {

    var viewModel = kendo.observable({
        itemList: {},
        property : {}
    });

    //fetches the list of movies from the service
    //depending on the listType filter
    function getMovieList(listType) {
    
        //service call
        console.log("test log" +  Eflips.localDatabaseAccess);
      
        that = this;
        
       //var list = [{Name : "Soft Cost", Value:120}, {Name : "Exterior Cost", Value : 121}, {Name:"Interior Cost", Value:122}]; 
       that.callback = function(result) {
        
            console.log("get data" +  result.success + result.data[0].name);
            
            if (result.success === true) {
                //alert(result.data.ip);
                viewModel.set("itemList", result.data);   
                viewModel.set("property", {name : result.data[0].name, address : result.data[0].name});  
            }
        }
    
        
        Eflips.localDatabaseAccess.initialize(function(){
            
            Eflips.localDatabaseAccess.getProperty(that.callback), function() {alert("Error");}
        });
        
        
        //viewModel.set("itemList", list);  
          /*var movieListoptions = {
            url: "http://ip.jsontest.com/",
            data: { listType: listType },
            requestType: "GET",
            dataType: "JSON",
            callBack: callBack
        };
        //service call
        Eflips.remoteDataAccess.callService(movieListoptions);*/
    }
    //callback method from service call
  

    //this event is fired when movie list
    //type is changed from the UI
    function listTypeSelected(e) {

        getMovieList(e.sender.selectedIndex);
    }
    //Loading the movie list with listType= 0
    //which is Now Running list
    function init(){
        
        getMovieList(0);
        
    }

    return {
        initialize: init,
        getMovieList: getMovieList,
        viewModel: viewModel,
        listTypeSelected: listTypeSelected
    }
 
})();