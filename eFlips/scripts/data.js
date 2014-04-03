Eflips = {}

Eflips.movieList = (function () {

    var viewModel = kendo.observable({
        movieList: {}
    });

    //fetches the list of movies from the service
    //depending on the listType filter
    function getMovieList(listType) {
    
        //service call
        
      
       var movieLista = [{
            Id : 1, Name : "Name", ReleaseYear : 1989, Rating : 9, Reviews : "Great" 
       }]; 
        
        viewModel.set("movieList", movieLista);  
    }
    //callback method from service call
    function callBack(result) {
        if (result.success === true) {
            viewModel.set("movieList", result.data);                       
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
    }

    return {
        initialize: init,
        getMovieList: getMovieList,
        viewModel: viewModel,
        listTypeSelected: listTypeSelected
    }
 
})();