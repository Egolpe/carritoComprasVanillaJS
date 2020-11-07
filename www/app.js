//Variables

const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos')
let articulosCarrito = []

cargarEventListeners()
function cargarEventListeners() {
    //Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso)
    
    //Elimina cursos del carrito
    carrito.addEventListener('click' , eliminarCurso)

    //Muestra los cursos del localStorage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || []

        carritoHTML()
    })

    //Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [] //reseteamos el carrito
        limpiarHTML() //eliminamos todo el html
    })
}


// funciones

function agregarCurso(e) {
    e.preventDefault()

    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado)
    }
}

// Elimina un curso del carrito
function eliminarCurso(e) {
    
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id')

        //Elimina del arreglo de artículosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId)
        
        carritoHTML()
    }
}

// Lee el contenido del HTML al que le damos click y extrae la informcación del curso

function leerDatosCurso(curso){
    console.log(curso)

    // Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisa si un elemento ya existe
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id )
    if(existe){
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++
                return curso //Retorna el objeto actualizado 
            }else {
                return curso //Este retorna los no actualizados 
            }
        })
        articulosCarrito = [...cursos]

    }else{
        articulosCarrito = [...articulosCarrito, infoCurso]
    }

   //Agrega elementos al arreglo de carrito
   
   console.log(articulosCarrito)

   carritoHTML()
}

//Muestra el carrito de compras en el HTML
function carritoHTML() {

    //Limpiar el HTML
    limpiarHTML()


    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `

        //Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row)
    })

    //Agregar el carrito de compras al Storage
    sincronizarStorage()
}

function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito))
}

//Elmina los cursos del tbody
function limpiarHTML(){
    //Forma lenta
    // contenedorCarrito.innerHTML = ''

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}
