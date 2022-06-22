// Study Mode

  let hellos = function(){
    let divClicks = document.getElementsByClassName("clickToShow");
    for(i=0; i < divClicks.length; i++){
        let click = divClicks[i];
        
        let close = function(){            
            click.addEventListener("click", function(e){
                e.preventDefault();
                let curr_class= this.getElementsByTagName('div')[0].className;
                let divs = document.getElementsByClassName('show');
                
                for(let i = 0; i < divs.length; i++)
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
