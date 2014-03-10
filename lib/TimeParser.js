(function() {
  "use strict";
  
  var root;

  if(
    typeof module !== "undefined" && 
    module !== null && 
    typeof module.exports !== undefined && 
    module.exports !== null )
  {
    root = module.exports;

  }
  else
  {
    window.me = window.me || {};
    window.me.joshbennett = window.me.joshbennett || {};
    root = window.me.joshbennett;
  }

  (function(root){
    
    root.TimeParser = (function(){
      
      
      
    }());
    
  }(root));
  
  
}());