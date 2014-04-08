
Eflips.localDatabaseAccess = (function (global) {
    
   
   var database;
    
   var openDb = function(onSuccess) {
   if (window.navigator.simulator === true) {
        // For debugin in simulator fallback to native SQL Lite
        console.log("Use built in SQL Lite");
        database = window.openDatabase("Todo", "1.0", "Cordova Demo", 200000);
    }
    else {
        database = window.sqlitePlugin.openDatabase("Todo");
    }
       
       onSuccess();
   };
     
    
    var createTable = function(onSuccess) {
           
     console.log("to create data source");
        
    var dataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "/Simulator/data/databaseSchema.txt",
                        dataType: "text"
                    }
                }
            });
        
    dataSource.fetch(function() {
        
          
        
        var statementsString = this.data().join('');
        
       console.log("fetch success");
        
        var db = database;
        
	    db.transaction(function(tx) {
		
             console.log("To transform");
            
            var statements = statementsString.split("\n");
            
            for(i = 0; i < statements.length; i++) {
                console.log("To execute " + statements[i]);
              tx.executeSql(statements[i], [], onSuccess, onError);
            }
            
            onSuccess();
        });
          
        },                  
        onError);                        
	   }
       

           
    var onError = function(e) {
    	console.log("Error: " + e.message);
    } 
      
    var onSuccess = function() {
    	console.log("sucess: ");
    }
          

    var getProp = function(onSuccess, onError) {

        console.log("To get prop " + onSuccess);
        
    	var getData = function (row) {
    		return {name:row.name, value:row.value};
    	}
        
    	var transform = function (tx, rs) {
    		var items = [];

             console.log("To transform  rows");
            
            for (var i = 0; i < rs.rows.length; i++) {
    			items.push(getData(rs.rows.item(i)));
    		}
          
    		onSuccess({success:true, data:items});
    	}
        
    	var db = database;

    	
	    
        db.transaction(function(tx) {
        
        console.log("To retrieve db");
		tx.executeSql("SELECT * FROM Properties", [], 
					  transform, 
					  onError);
    	});
    }
      
    var init = function (onSuccess, onError) {

        console.log("To initalize");
        openDb(function() {
			createTable(onSuccess, onError);
        }, onError); 	
    }     

    console.log("To initalize localData");
    
    return {
        initialize:init,
        getProperty: getProp
    }
    
})(window);


