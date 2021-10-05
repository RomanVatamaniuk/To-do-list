let degrees = 0;
let body = document.querySelector('body');
let turn = document.querySelector('.switch');
let c = 0;
let timer =  setInterval( function(){
                degrees++;
                body.style.backgroundImage = `linear-gradient( ${degrees}deg, #053742, #39A2DB, #A2DBFA)`;
                        
}, 10000/360);     


turn.addEventListener('click', function(){  
if(c==0){
        clearInterval(timer);
        c = 1;
}  else{
        c = 0;
        timer = setInterval( function(){
                degrees++;
                body.style.backgroundImage = `linear-gradient( ${degrees}deg, #053742, #39A2DB, #A2DBFA)`;               
                }, 10000/360);              
        };
});
