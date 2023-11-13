document.addEventListener('keydown', function(event){ // keyboard shortcuts for using calculator
    let isShift = window.event.shiftKey ? true : false; // checks status of shift key
  
    if (event.keyCode == 48 || event.keyCode == 96){calc.passNum(0);}
    if (event.keyCode == 49 || event.keyCode == 97){calc.passNum(1);}
    if (event.keyCode == 50 || event.keyCode == 98){calc.passNum(2);}
    if (event.keyCode == 51 || event.keyCode == 99){calc.passNum(3);}
    if (event.keyCode == 52 || event.keyCode == 100){calc.passNum(4);}
    if (event.keyCode == 53 || event.keyCode == 101){calc.passNum(5);}
    if (event.keyCode == 54 || event.keyCode == 102){calc.passNum(6);}
    if (event.keyCode == 55 || event.keyCode == 103){calc.passNum(7);}
    if ((isShift == false && event.keyCode == 56) || event.keyCode == 104){calc.passNum(8);}
    if (event.keyCode == 57 || event.keyCode == 105){calc.passNum(9);}
    if ((isShift == true && event.keyCode == 56) || event.keyCode == 106){calc.passMethod('multiply');}    
    if ((isShift == true && event.keyCode == 187) || event.keyCode == 107){calc.passMethod('add');}
    if (event.keyCode == 189 || event.keyCode == 109){calc.passMethod('subtract');}
    if (event.keyCode == 190 || event.keyCode == 110){calc.passNum('decimal');}    
    if (event.keyCode == 191 || event.keyCode == 111){calc.passMethod('divide');}     
    if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 12){calc.clearDisplay();} // delete key 
    if ((isShift == false && event.keyCode == 187) || event.keyCode == 13){calc.doMath();} // return key
  }, true);
  
  // This is where the magic happens
  let calc = (function(){
    let displayText = document.getElementById('display');
      let method = '',
        storedMethod = '',
        stored = 0,
        display = 0,
        total = 0,
        decimal = false,
        solved = false,
        stringRequest = false;  
      
    displayText.innerHTML = 0;
    
    return {
      
      passNum: function(num){
      
          if(solved == true && stringRequest == false){
                  method = '', storedMethod = '', stored = 0, display = 0, total = 0, decimal = false, solved = false;
        }
      
        if(num == 'decimal' && decimal == false){ // includes decimal if one isn't already used
          display = display + '.';
          decimal = true; // set to true so that it can't be reused in the same number
        }
        
        if(num != 'decimal'){ // if not decimal then display the number
          if(display == 0 && decimal == false){
            display = num;
          } else {
            display = display + '' + num;
          }
        }
      
        displayText.innerHTML = display;
      },
      
      passMethod: function(m){ // stores the method selected (-*/+)
        method = m;
        stored = display; // moves display to stored
        display = 0;
        decimal = false;
        
        if(solved == true){
          stringRequest = true;
        }
        
          if(storedMethod != ''){
          document.getElementById(storedMethod).className = " ";
        }
        document.getElementById(method).className = "active";
        storedMethod = m;
      },
      
      doMath: function(){ // calls the saved method and evaluates using the stored and display values
        stored = parseFloat(stored);
        display = parseFloat(display);
            
        if(solved == false){ // if problem has been solved once then apply math to previous total instead 
          stored = stored;             
        } else {
          stored = parseFloat(total);
        }
        
        if(display == 0 && method == 'divide'){
          total = "undefined";
        }
        else if((stored == 0 || display == 0) && (method == 'divide' || method == 'multiply')){
          total = 0;
        } else {
          if(method == 'divide'){total = stored / display;}
          if(method == 'multiply'){total = stored * display;} 
          if(method == 'add'){total = stored + display;} 
          if(method == 'subtract'){total = stored - display;}  
        }      
        
        solved = true;
        displayText.innerHTML = total;   
        
        if(method != ''){
          document.getElementById(storedMethod).className = " ";  
          method = '';
        }
      },
      
      clearDisplay: function(){ // reset all variables to default
        stored = 0, display = 0, total = 0, decimal = false, solved = false, stringRequest = false;   
        
        if(method != ''){
          document.getElementById(storedMethod).className = " ";  
          method = '';
        }
        
        displayText.innerHTML = display;   
      }
    }; // close return
  })();