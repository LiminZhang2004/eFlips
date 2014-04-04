Eflips = {}

Eflips.itemList = (function () {

    var viewModel = kendo.observable({
        itemList: {},
        property : {}
    });

    //fetches the list of movies from the service
    //depending on the listType filter
    function getMovieList(listType) {
    
        //service call
        console.log("test log");
      
       //var list = [{Id : 1, Name : "Name", ReleaseYear : 1989, Rating : 9, Reviews : "Great"}, {Id : 1, Name : "Name2", ReleaseYear : 1999, Rating : 10, Reviews : "Great"}]; 
        
        //viewModel.set("itemList", list);  
          var movieListoptions = {
            url: "http://ip.jsontest.com/",
            data: { listType: listType },
            requestType: "GET",
            dataType: "JSON",
            callBack: callBack
        };
        //service call
        Eflips.dataAccess.callService(movieListoptions);
    }
    //callback method from service call
    function callBack(result) {
        if (result.success === true) {
            //alert(result.data.ip);
            viewModel.set("itemList", [result.data]);                       
        }
    }

    //this event is fired when movie list
    //type is changed from the UI
    function listTypeSelected(e) {

        getMovieList(e.sender.selectedIndex);
    }
    //Loading the movie list with listType= 0
    //which is Now Running list
    function init(){
        
        getMovieList(0);
        
        viewModel.set("property", {name : "My home", address : "Edmonton"});  
        
    }

    return {
        initialize: init,
        getMovieList: getMovieList,
        viewModel: viewModel,
        listTypeSelected: listTypeSelected
    }
 
})();