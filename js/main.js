let canvas = document.querySelector("canvas").getContext("2d");
let cont = 0;
let start = false;
let palabra = "";
let palabraOculta = "";
let palabras = ["AVION","BARCO","GATO","PIANO","COMPUTADORA"];
let repetido = [];
let input = document.querySelector("#word");
let error = document.querySelector("#errors");
let juego = document.querySelector("#gameScreen");
let opciones = document.querySelector("#gameOpts");
let letraTecleada = document.querySelector("#pulse");
let btnIniciarJuego = document.querySelector("#start");
let btnAgregarPalabraMenu = document.querySelector("#addWord");
let btnVolverJuego = document.querySelector("#return");
let btnAgregarPalabra = document.querySelector("#btnAddWord");
let txtsecretValue = document.querySelector("#secretValue");
let leyenda = document.querySelector("#title");
canvas.fillStyle = "black";
canvas.lineWidth = 2;
let palabraRandom = ()=>{
    
    return palabras[Math.ceil(Math.random()*palabras.length-1)];
};

 let drawLine = (x,y,a,b)=>{
    canvas.beginPath();
    canvas.moveTo(x,y);
    canvas.lineTo(a,b);
    canvas.stroke();
 };

 let drawHead = (x,y)=>{
     canvas.beginPath();
     canvas.arc(x,y,15,0,2*Math.PI);
     canvas.stroke();
 };


let dibujarPartes = ()=>{
    cont++;
    switch(cont){
        case 1:
            drawHead(220,25);
        break;

        case 2:
            drawLine(220,40,220,90);
        break;
            
        case 3:
            drawLine(200,60,220,60);    
        break;
                
        case 4:
            drawLine(220,60,240,60);
        break;
                    
        case 5:
           drawLine(220,90,200,110);
        break;
        
        case 6:
            drawLine(220,90,240,110);
        break;
        default:
            start = false;
            leyenda.textContent = "¡FIN DEL JUEGO! \n La palabra era: "+palabra; 
            
    } 
    
    

};
 let dibujarPrimerasPartes = ()=>{
    drawLine(100,130,200,130);
    drawLine(150,10,150,130);
    drawLine(150,10,220,10);
 };

let nuevoJuego = ()=>{
    canvas.clearRect(0,0,600,400);
    dibujarPrimerasPartes();
    leyenda.textContent = "¿Podrás adivinar?";
    letraTecleada.textContent = "";
    cont = 0;
    palabra = "";
    palabraOculta ="";
    repetido = [];
};
let leerTeclado = (bool)=>{
    if(bool){
 document.onkeypress = function(e){
     if(e.keyCode >= 65 && e.keyCode<=90 && start){
         if(!repetido.includes(e.key)){
            letraTecleada.textContent += e.key;
         validaLetra(e.key);
         repetido.push(e.key);
         }
         
     }else{
         alert("Solo letras mayúsculas | Inicia el juego para empezar | o ya acabó")
     }
 }

} else{
     document.onkeypress = function(e){return e.key;}
 }

}
let validaLetra = (letraPulsada)=>{
    if(palabra.includes(letraPulsada)){
        remplazar(letraPulsada);
        txtsecretValue.textContent = palabraOculta;
    }else{
        dibujarPartes(); 
    }
    if(palabra == palabraOculta){
        leyenda.textContent = "¡Felicidades, ganaste!"; 
        leerTeclado(false);
    }
};

let remplazar = (letra)=>{
    let arr = palabraOculta.split('');
    let pal = palabra.split('');
    let value = [];
    value = pal.forEach((e,i)=>{
        if(e==letra){
            arr[i] = letra;
        }
        
    });
    palabraOculta = arr.join('');
    console.log(arr);
};
btnIniciarJuego.addEventListener("click",()=>{
    juego.classList.remove("hidden");
    opciones.classList.add("hidden");
    nuevoJuego();
     palabra = palabraRandom();
     palabraOculta = palabra.replace(/./g,"_");
    start = true;
    leerTeclado(true);
    txtsecretValue.textContent = palabraOculta;
});

btnAgregarPalabraMenu.addEventListener("click",()=>{
    leerTeclado(false);
    juego.classList.add("hidden");
    opciones.classList.remove("hidden");
});

btnVolverJuego.addEventListener("click",()=>{

    juego.classList.remove("hidden");
    opciones.classList.add("hidden");
});

btnAgregarPalabra.addEventListener("click",()=>{
    

   
    if(!palabras.includes(input.value) && input.value.trim().length>0 && input.value.match(/.[A-Z]./g)){
        error.classList.add("hidden");
        input.value = input.value.toUpperCase();
        palabras.push(input.value);
        alert("Palabra agregada: "+input.value);
        input.value = "";
        input.focus();

    }else{
        error.classList.remove("hidden");
    }
});

dibujarPrimerasPartes();