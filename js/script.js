// -------------------
// CARRITO DE COMPRAS
// -------------------
//     variables 
// creamos la ruta desde html hacia javascript en forma de variable.

const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

// ponemos a funcionar el evento

cargarEventListeners();

// creamos el evento CLICK - "agregar al carrito"
//-------------------------------------------------
// creamos el evento CLICK - "eliminar del carrito/ X "

function cargarEventListeners(){
    // "agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso)

    // eliminar del carrito " X "
    carrito.addEventListener('click', eliminarProducto)

    //vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () =>{
        articulosCarrito = [];
        limpiarHTML(); // eliminamos todo el HTML.
    })
}

// funciones
// agregamos la ruta del evento que creamos recien.

function agregarCurso(e){
    e.preventDefault(); //previene el href #
    // console.log(e.target.classList) para consultar en que clase podemos poner el boton agregar.
    if(e.target.classList.contains('agregar-carrito')){
        // const cursoSeleccionado = e.target.parentElement; 
        const clickProducto = e.target.parentElement;
        // console.log(e.target.parentElement.parentElement) para consultar en que lugar nos encontramos, parent=PADRE
    leerDatosCurso(clickProducto);
    }
}

// agregamos los datos a un objeto, poniendo la funcion leerDatosCurso y el parametro producto. mientras que el parametro producto trae la ruta/indicacion de clickProducto

function leerDatosCurso(producto){

    const infoCard = {
        imagen: producto.querySelector('img').src,
        precio: producto.querySelector('p').textContent,
        titulo: producto.querySelector('h1').textContent,
        id: producto.querySelector('button').getAttribute('data-id'),
        cantidad: 1

    }
    //procedemos a actulizar la cantidad de productos entre si.. si el elemento ya existe en el carrito. si no existe se agrega
    // .some te permite iterar sobre un arreglo/array de objetos y verificar si un elemento existe en el.
    //revisamos si un elemento existe en el carrito con esta variable.
    const existe = articulosCarrito.some( producto => producto.id === infoCard.id)
    // console.log(existe)
        //si el producto ya existe en el carrito, actualizamos la cantidad.
        if(existe){
            // actualizamos la cantidad.
            // .map va a ir iterando sobre cada uno de los prod del carrito.
            const cursos = articulosCarrito.map( producto => {
                // si producto.id es igual igual a infoCard.id -----> hacemos esttto
                if(producto.id === infoCard.id){
                    // producto.cantidad = producto.cantidad + 1 // prueba mia sale mal xD
                    producto.cantidad++;
                    return producto; // retorna el objeto actualizado.
                } else{
                    return producto; // retorna los objetos que no son duplicados.
                }

            })
        } else{
            //si prod no existe agrega el arreglo/array al carrito.
            articulosCarrito = [...articulosCarrito, infoCard];
        }


    // //agregamos al array vacio, ...articulosCarrito porque tiene que cargar lo que ya tenia antes.
    // // articulosCarrito = [infoCard];
    // articulosCarrito = [...articulosCarrito, infoCard];

    console.log(articulosCarrito);

    carritoHTML()
}

// creamos la funcion que crea el contenido agregado al carrito con el evento de recien.
// por eso le ponemos carritoHTML porque crea el contenido HTML dentro del carrito.
function carritoHTML(){

    limpiarHTML()

    // recorre el carrito y genera el HTML
    articulosCarrito.forEach( producto => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${producto.imagen}" width="60" height="60">
        </td>
        <td>
            ${producto.titulo}
        </td>
        <td>
            ${producto.precio}
        </td>
        <td>
            ${producto.cantidad}
        </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${producto.id}"> X </a>
        </td>
        `;
        // agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(row)
    })

}
// elimina los productos duplicados del tbody
function limpiarHTML(){
    // forma lenta
    contenedorCarrito.innerHTML = '';

}

// ELIMINAMOS RPODUCTOS DEL CARRITO. pero ya tenemos el evento click de eliminar creado desde los enventos arriba..
function eliminarProducto(e){
    // console.log("desde eliminar producto.")
    // console.log(e.target.classList)
    if(e.target.classList.contains('borrar-curso')){
        // console.log(e.target)
        // console.log(e.target.getAttribute('data-id'))
        const prodId = e.target.getAttribute('data-id')

        // //elimina del arreglo articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( producto => producto.id !== prodId)
        // console.log(articulosCarrito)

        // mandamos a llamar la funcion para que imprima lo que creo y lo borre 
        carritoHTML()


    }

}


