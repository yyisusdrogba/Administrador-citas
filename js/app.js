//Variables de llenado 
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

//User interface
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

let editando;
//Definimos las clases

class Citas{
    constructor(){
        this.citas = [];
    }

    agregarCita(cita){
        this.citas = [...this.citas,cita];
        console.log(this.citas)
    }

    eliminarCita(id){
        this.citas = this.citas.filter(citas=>citas.id !== id)
    }

    editarCita(citaActualizada){
        this.citas = this.citas.map(citas => citas.id === citaActualizada.id ? citaActualizada : citas);
    }
}

class UI {
    
    imprimirAlerta(mensaje,tipo){

        //Creamos y damos estilo a un div el cual contrandra el mensaje de campos incompletos
        const div = document.createElement('DIV');
        div.classList.add('text-center','alert','d-block','col-12');

        //Agregamos el mensaje como parametro
        div.textContent = mensaje;


        if(tipo === 'error'){
            div.classList.add('alert-danger');
        }else{
            div.classList.add('alert-success');
        }

    

        //Lo agregamos en el DOOM

        document.querySelector('#contenido').insertBefore(div,document.querySelector('.agregar-cita'));

        //Se quita nuestro mensaje despues de 5seg
        setTimeout(()=>{
            div.remove();
        },5000)
    }

    imprimirCitas({citas}){

        this.limpiarHTML();

        citas.forEach((cita)=>{
            const {mascota,propietario,telefono,fecha,hora,sintomas,id} = cita;

            const divCitas = document.createElement('DIV');
            divCitas.classList.add('cita','p-3');
            divCitas.dataset.id = id;

            //Scripting de los elementos de la cita
            const mascotaParraf = document.createElement('H2');
            mascotaParraf.classList.add('card-tittle','font-weight-bolder');
            mascotaParraf.textContent = mascota;

            const propietarioParraf = document.createElement('P');
            propietarioParraf.innerHTML = 
            `
              <span class="font-weight-bolder">Propietario: </span> ${propietario};
            `;

            const telefonoParraf = document.createElement('P');
            telefonoParraf.innerHTML = 
            `
              <span class="font-weight-bolder">Telefono: </span> ${telefono};
            `;
            
            const fechaParraf = document.createElement('P');
            fechaParraf.innerHTML = 
            `
              <span class="font-weight-bolder">Fecha: </span> ${fecha};
            `;

            const horaParraf = document.createElement('P');
            horaParraf.innerHTML = 
            `
              <span class="font-weight-bolder"> Hora: </span> ${hora};
            `;

            const sintomasParraf = document.createElement('P');
            sintomasParraf.innerHTML = 
            `
              <span class="font-weight-bolder">Sintomas: </span> ${sintomas};
            `;


            //Boton para eliminar cita
            const btnEliminar = document.createElement('BUTTON');
            btnEliminar.classList.add('btn','btn-danger','mr-2');
            btnEliminar.innerHTML ='Eliminar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';

            //boton para eliminar una cita
            btnEliminar.onclick = ()=>{
                eliminarCita(id);
            }

            //Añade un boton para editar
            const bntEditar = document.createElement('BUTTON');
            bntEditar.classList.add('btn','btn-info');
            bntEditar .innerHTML = 'Editar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>'
            bntEditar.onclick = ()=>{
                cargarEdicion(cita);
            }
            
            //Agregar los parrafos a divCita
            divCitas.appendChild(mascotaParraf);
            divCitas.appendChild(propietarioParraf);
            divCitas.appendChild(telefonoParraf);
            divCitas.appendChild(fechaParraf);
            divCitas.appendChild(horaParraf);
            divCitas.appendChild(sintomasParraf);
            divCitas.appendChild(btnEliminar);
            divCitas.appendChild(bntEditar);

         

            //Agregar citas en el HTML
            contenedorCitas.appendChild(divCitas);
        })
    }

    //Limpiara nuestro HTML 
    limpiarHTML(){
        while(contenedorCitas.firstChild){  
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }

}

const ui = new UI();
const administrarCitas = new Citas();

//Funcion que va escuchar los demas eventos
eventListenner();
function eventListenner(){
    //Evento de inputs 
    mascotaInput.addEventListener('input',datosCita);
    propietarioInput.addEventListener('input',datosCita);
    telefonoInput.addEventListener('input',datosCita);
    fechaInput.addEventListener('input',datosCita);
    horaInput.addEventListener('input',datosCita);
    sintomasInput.addEventListener('input',datosCita);

    //Evento de submit formulario
    formulario.addEventListener('submit',nuevaCita);
}

//Objeto que contendra los datos

const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: '',
}

//Funcion la cual ira llenando nuestro objeto 'citaObj'
function datosCita(e){
    citaObj [e.target.name] = e.target.value;
 }


function nuevaCita(e){
    e.preventDefault();

    const {mascota,propietario,telefono,fecha,hora,sintomas} = citaObj;

    //Condicion que si alguno de nuestros inputs esta vacio arroje un mensaje de campor requeridos 
    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === ''){
        console.log('Los campos no estan llenos');
        ui.imprimirAlerta('Todos los campos tienen que ir llenos','error');
        return;
    }


    if(editando){

        //Pasar el objeto de la cita a edicion
        ui.imprimirAlerta('Se edito correctamente');

        //Pasar el objeto de la cita a edicion
        administrarCitas.editarCita(({...citaObj}))


        //Regresar texto del boton a original
        formulario.querySelector('button[type="submit"]').textContent='Crear cita';

        //Quitar el modo edicion
        editando = false;

    }else{
    //Generamos un ID
    citaObj.id = Date.now();

    //Creamos una nueva cita
    administrarCitas.agregarCita({...citaObj});   

    //Mensaje de se agrego correctamente
    ui.imprimirAlerta('Se agrego correctamente');
    
 }


    //Reiniciamos el objeto
    reiniciarObjeto();

    //Reiniciamos el formulario
    formulario.reset();

    //Mostrar citas en el HTML
    ui.imprimirCitas(administrarCitas);

}

//Funcion que va a reiniciar nuestro objeto una vez se renicie el form
function reiniciarObjeto(){
    citaObj.mascota = '';
    citaObj.propietario = ''; 
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

function eliminarCita(id){
    //Elimina una cita
    administrarCitas.eliminarCita(id);

    //Muestra un msj
    ui.imprimirAlerta('La cita se elimino correctamente');

    //refrescar las citas
    ui.imprimirCitas(administrarCitas);

}

//Cargga los datos y el modo edicion
function cargarEdicion(cita){
    const {mascota,propietario,telefono,fecha,hora,sintomas,id} = cita;


    //Edita los inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    //Edita el objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    formulario.querySelector('button[type="submit"]').textContent='Guardar Cambios'

    editando = true;


}