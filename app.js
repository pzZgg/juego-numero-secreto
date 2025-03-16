/*por alguna razón si damos valores distintos de cero como el darle a numeroSecreto 
valor de numerorandom y a intentos le damos 1 se vuelve loco y no funciona el programa*/
let numeroSecreto = 0; /*acá le damos el valor a esta variable
que queremos usar, sería como definir una varaible normal onda let a = 7 pero en este
caso nosotros desnocemos el valor asignado y este valor es asignado por la llamada a 
una función*/

let intentos = 0;

let listaNumerosSorteados = [];

let numeroMaximo = 10;

function asignarTextoElemento(elemento, texto){
    let elementoGenerico = document.querySelector(elemento);
    elementoGenerico.innerHTML = texto; 
    return; 
}

function verificarIntento() { //a esta función la llamamos dentro de la etiqueta html la cual inicia el programa con el boton de intentar
    // let numeroDeUsuario = document.querySelector('input'); /*donde input es la etiqueta
    // representada en la página web como una cajita blanca para poder poner algo*/
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value); /*transformamos la cosa a entero, del document agarramos
    la cosa por su ID, por eso usamos el getElementById y dentro de su parámetro ponemos el id que haabíamos asignado dentro de la etiqueta
    html, por último, una vez seleccionado el elemento mediante la forma dada especificamos que queremos el valor, por eso el value*/
    console.log(intentos);
    console.log(typeof(numeroDeUsuario)); //comprobamos el tipo de dato
    console.log(numeroSecreto);
    console.log(typeof(numeroSecreto));
    console.log(numeroDeUsuario);
    console.log(numeroDeUsuario === numeroSecreto);//comparamos ambas variables pero las comparamos en valor y en tipo

    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p',`Acertaste el número en ${intentos} ${(intentos > 1) ? 'veces o intentos' : 'vez o intento'}`);
        asignarTextoElemento('h1', 'Fin del juego :D');
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        //El usuario no acertó.
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p','El número secreto es menor a lo que ingresaste');
        } else{
            asignarTextoElemento('p','El número secreto es mayor a lo que ingresaste');
        }/*la llamada consiste en seleccionar la etiqueta y como en este caso la función sólo
        sólo modifica el texto, le pasamos el texto que queremos mostrar*/
        intentos++;
        limpiarCaja();
    }
    return;
}

function limpiarCaja() {
    /*obtenemos el elemento que queremos modificar, en este tenemos dos opciones ya para seleccionar,
    el document.querySelector() y el selectById() o bien podemoshacer algo más loco, usar el query selector
    pero en vez de seleccionar por etiqueta le decimos al queryselector que vamos a seleccionar por ID,
    todo esto para referirnos al input, al mismo elemento el cuál capturó lo ingresado por el usuario y 
    al cual nosotros pudimos acceder mediante el ID. ID del input*/
    valorCaja = document.querySelector('#valorUsuario').value = '';
    //valorCaja.value = ''; //vacio es sólo comillas
}

function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del número secreto!');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}: `);
    numeroSecreto = generarNumeroSecreto(); /*en este caso no está solamente la llamada a la función
    dado que, si analizamos un poco, no queremos llamar a la función como tal para
    que haga algo sino que queremos el valor que nos da la función en este caso. Si
    solamente llamamos a función vamos a estar innicializando nomas pero no
    va a cumplir su onjetivo el cual es entregarnos un número*/
    intentos = 1;
}

function reiniciarJuego() {
    //lo que queremos es reiniciar el juego, para ello debemos de:
    //limpiar la caja
    limpiarCaja();
    //indicar mensaje de intervalo de números
    //generar número aleatorio
    //inicializar el número intentos
    condicionesIniciales(); //estas tres cosas las hace una función
    //deshabilitar el botón de intentos
    document.getElementById('reiniciar').setAttribute('disabled','true');
}

function generarNumeroSecreto () {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
    
    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);

    //si ya recorrimos todos los números. Esta es la condición par lidiar con la recursividad:
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p','Ya se recorrieron todos los números posibles!');
    } else { 
        //si el numero generado esta inlcuido en la lista
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto(); /*siempre que exista un numero ya dentro de la lista 
            el va a entrar en el if y va a volver a llamarse así mismo, es decir, va a volver a
            generar un nuevo numero que otra vez va a entrar al bloque de verificación para ver 
            si es que existe o no dentro de la lista y nuevamente si existe volverá hacer el mismo
            proceso hasta que ya no coincida con ningún elemento dentro de la lista dada*/
        } else {
            listaNumerosSorteados.push(numeroGenerado); /*acá lo que hacemos es, si entró 
            este bloque de código significa que el número todavía no fue utilizado por lo
            que nos sirve para usarlo una vez, luego para meterlo en la lista negra de
            numeros que ya no se pueden utilizar aprovechamos y lo agregamos ya esta lista
            mediante .push()*/
            return numeroGenerado; /*retornamos el valor "autorizado" para ser utilizado
        dado que pasó la verificación de que si se repite o no*/
        }
    }
}

condicionesIniciales(); /*pese a que esto está en la última línea es
lo primero que se ejecuta dado que se encuentra fuera de algún bloque
y js ya ejecuta todas las funciones según para tenerlas disponibles*/