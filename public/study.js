// Study Mode

  var hellos = function(){
    var divClicks = document.getElementsByClassName("clickToShow");
    for(i=0; i < divClicks.length; i++){
        var click = divClicks[i];
        
        var close = function(){            
            click.addEventListener("click", function(e){
                e.preventDefault();
                var curr_class= this.getElementsByTagName('div')[0].className;
                var divs = document.getElementsByClassName('show');
                
                for(var i = 0; i < divs.length; i++)
                {                                          
                    divs[i].className = "hidden";
                }

                if(curr_class == "show"){                    
                    this.childNodes[3].setAttribute("class", "hidden");                    
                } else {
                    this.childNodes[3].setAttribute("class", "show");
                }
            },false);
        }();
    }
}();
