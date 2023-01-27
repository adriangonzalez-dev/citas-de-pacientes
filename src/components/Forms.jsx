import {useState} from 'react'
import {v4 as uuid} from 'uuid'
import PropTypes from 'prop-types'

//initial state
export const Forms = ({crearCita}) => {


    //state cita
    const [cita, setCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: '',
    });

    //state error 
    const [error, setError] = useState(false)

    //asignar valores del input al state
    const handleChange = (e) => {
        setCita({
            ...cita,
            [e.target.name]:e.target.value
        })
    }

    //Extraer valores
    const {mascota, propietario, fecha, hora, sintomas} = cita

    const handleSubmit = (e) => {
        e.preventDefault();
        
        //validar
        if( mascota.trim() === '' ||
            propietario.trim() === '' ||
            fecha.trim() === ''||
            hora.trim() === ''||
            sintomas.trim() === ''){
            
            setError(true)
            return;
        }

        //eliminar el error si pasa validacion
        setError(false);

        //asignar un id
        cita.id = uuid();

        //agregar cita a array
        crearCita(cita);

        //reiniciar form
        setCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: '',
        })
    }
  
    return (
    <>
        <h2>Crear Cita</h2>

        {error ? <p className='alerta-error'>Todos los campos son obligatorios</p> : ''} 

        <form onSubmit={handleSubmit}>
            <label>Nombre de Mascota</label>
            <input
                type='text'
                name='mascota'
                className='u-full-width'
                placeholder='Nombre de Mascota'
                onChange={handleChange}
                value={mascota}
            />

            <label>Nombre de dueño</label>
            <input
                type='text'
                name='propietario'
                className='u-full-width'
                placeholder='Nombre del dueño'
                onChange={handleChange}
                value={propietario}
            />

            <label>Fecha</label>
            <input
                type='date'
                name='fecha'
                className='u-full-width'
                onChange={handleChange}
                value={fecha}
            />

            <label>Nombre de dueño</label>
            <input
                type='time'
                name='hora'
                className='u-full-width'
                onChange={handleChange}
                value={hora}
            />

            <label>Sintomas</label>
            <textarea
                className='u-full-width'
                name='sintomas'
                onChange={handleChange}
                value={sintomas}
            ></textarea>

            <button 
                type='submit'
                className='u-full-width button-primary'
            >Crear cita</button>
        </form>
    </>
  )
}

Forms.propTypes = {
    crearCita: PropTypes.func
}