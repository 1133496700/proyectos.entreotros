// creamos este document.addeventlistener.(domcontentloaded) que es lo primero que hace despues de descargar todo el html.
// nos aseguramos que se haya descargado html

document.addEventListener('DOMContentLoaded', function(){


    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }
    // console.log(email)
    //seleccionamos los elementos de la interfaz (email,asunto,mensaje, botones.)
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMsj = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]')
    const btnReset = document.querySelector('#formulario button[type="reset"]')

    // console.log(inputAsunto,inputEmail,inputMsj)

    // creamos eventos.
    // inputEmail.addEventListener('blur', function(evento){
    //     // comprombamos que significa el blur.
    //     // console.log("sali del input")
    //     // console.log(evento.target.value) // lo que hace evento.target.value es recoletar la informacion escrita dentro del input.
    // });
    // inputAsunto.addEventListener('blur', function(evento){
    //     // console.log(evento.target.value)
    // });
    // inputMsj.addEventListener('blur', function(evento){
    //     // console.log(evento.target.value)
    // });

    // reutilizable
    // inputEmail.addEventListener('blur', validar)
    // inputAsunto.addEventListener('blur', validar)
    // inputMsj.addEventListener('blur', validar)

    inputEmail.addEventListener('input', validar)
    inputAsunto.addEventListener('input', validar)
    inputMsj.addEventListener('input', validar)

    btnReset.addEventListener('click', function(e){
        e.preventDefault();


        email.email = '';
        email.asunto = '';  // esto se hace antes de llamar el reset poqeue sino queda el boton sumbit
        email.mensaje = "";
        formulario.reset();
        comprobarEmail();


    })


    // EN ESTA FUNCION ESTAMOS VALIDANDO LOS DATOS DE CADA DIV, ESPACIO DONDE HAY UN INPUT
    function validar(e){
        // console.log("desde la funcion validar")
        // console.log(e.target.value) ----------REVISAMOS EL MENSAJE ESCRITO EN EL INPUT-------------

        //REVISAMOS EL ID DE CADA INPUT CON
        // console.log(e.target.id) y lo colocamos en el template string ${}

        // REVISAMOS LA POSICION DEL DIV DONDE SE ENCUENTRA CADA INPUT PARA PONER EL MENSAJE DE ERROR DEBAJO.
        // console.log(e.target.parentElement) // LO COLOCAMOS EN LA FUNCION MOSTRARALERTA(TIENE 2 PARAMETROS.)

        if(e.target.value.trim() === ""){ //trim elimina lo que no hay
            // console.log("no hay nada")
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement) // <-- e.target.parentElement le decimo en que posicion se pone de los div.
        // } else{
            // console.log("si hay algo")
            email[e.target.name] = '';
            comprobarEmail();
            return; // LO QUE HACE EL RETURN SERIA CORTAR LA EJECUSION, OSEA CORTARIA EL CONSOLE.LOG DE ABAJO
            // console.log("despues del if")
        }

        // console.log(e.target.value)// console.log(e.target.value) ----------REVISAMOS EL MENSAJE ESCRITO EN EL INPUT-------------
        // validarEmail(e.target.value) // console.log(e.target.value) ----------REVISAMOS EL MENSAJE ESCRITO EN EL INPUT-------------
        //___________________________________________________________________________________________________________________________
        if(e.target.id === "email" && !validarEmail(e.target.value)){
            mostrarAlerta("el email es invalido", e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        } 
        // limpia la alerta una vez que completamos el campo con lo que le pedimos.
        limpiarAlerta(e.target.parentElement) // e.target.parentElement ----- REVISAMOS EL PADRE DEL ELEMENTO ------

        //  ---------------    ASIGNAMOSS VALORES AL OBEJTO email ---------------------------------- 
        // con .name le indicamos de donde lo buscamos, lo tienen en HTML.
        email[e.target.name] = e.target.value.trim().toLowerCase(); // .trim() para eliminar espacios en blanco
                                                                    // .toLowerCase() para que todo este en minuscula
                                                                    // console.log(email)
        comprobarEmail();




    }


    // EN ESTA FUNCION ESTAMOS CREANDO LO VISUAL DEL MENSAJE EN EL HTML // mandamos llamar la funcion en validar
    function mostrarAlerta(mensaje, referencia){
        // COMPROBAMOS SI YA EXISTE ALERTA.
        // const alerta = document.querySelector('.desdeJava') O PODEMOS LIMITARLO, MENCIONANDO SOLO A 
        // const alerta = referencia.querySelector('.desdeJava')
        // if(alerta){
        //     alerta.remove()
        // }
        // CREAMOS LA FUNCION limpiarAlerta(referencia seria parametro indicador de borrar)
        limpiarAlerta(referencia)

        // creamos un parrafo en base a esta mostrarAlerta()
        const error = document.createElement('P');
        // console.log(error)
        error.textContent = mensaje;
        // console.log(error);
        // agregamos la clase que le da estilo a lo ingresado con appendChild.
        error.classList.add('desdeJava')

        // inyectar el error al formulario 
        // formulario.appendChild(error) CAMBIAMOS A REFERENCIA, QUE ES EL PARAMETRO QUE LE INDICAMOS EL LUGAR DE CADA DIV.
        referencia.appendChild(error)

        // formulario.innerHTML = error REMPLAZA TODO EL CONTENIDO.

    }

    // limpia la alerta una vez que completamos el campo con lo que le pedimos. // mandamos llamar la funcion en validar
    function limpiarAlerta(referencia){
        const alerta = referencia.querySelector('.desdeJava')
        if(alerta){
            alerta.remove()
        }
    }

    // creamos funcion que valida el email. // mandamos llamar la funcion en validar
    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/; // codigo traigo de git. expresion regular para email, en javascript.
        const resultado = regex.test(email) // test es el metodo que le pasamos para comprobar el parametro email de la funcion.
        // console.log(resultado)
        return resultado;
        
    }
    function comprobarEmail(){
        // console.log(email)
        // console.log(Object.values(email).includes('')) ESTO RETORNA TRUE. ESTE OBJETO SE CONVIERTE EN ARRAY.
        //                                                 Y SE PUEDE EMPEZAR A USAR ARRAY METHODS.
        //                    .values() 
        if(Object.values(email).includes('')){
            // console.log(email)

            btnSubmit.disabled = true;
            return;
        }
            btnSubmit.disabled = false;
        
                                                        
    }



})

