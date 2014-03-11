(function () {
  "use strict";

  var root;

  if (typeof exports === 'undefined') {
    window.me = window.me || {};
    window.me.joshbennett = window.me.joshbennett || {};
    root = window.me.joshbennett;
  } else {
    root  = exports;
  }
  
  (function () {
    var root = this;
    
    root.CommandLineGenerator = (function(){
    
      return {
      
        "getCommand": function(){
          throw "not implimented yet";
        },
        
        "getTimeFormatting": function(hour, minute, second){
        }
        
      };
    
    }());
    
    
  }).call(root);
  
}());