import { useState, useEffect } from 'react'
import { Forms } from './components/Forms'
import { CardCita } from './components/CardCita';

function App() {
  //funcion para guardar o verificar local storage
  let citasIniciales = []
  
  if(localStorage.getItem('citas')){
    citasIniciales = JSON.parse(localStorage.getItem('citas'))
  }

  const [allCitas, setAllCitas] = useState(citasIniciales)

  useEffect(() => {
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(allCitas))
    } else {
      localStorage.setItem('citas', JSON.stringify([]))
    }
  }, [allCitas]);
  //funcion que tome las citas actuales y agregue una nueva
  const crearCita = (cita) => {
    setAllCitas(prev=>[...prev, cita]);
  }

  //funcion para eliminar cita
  const eliminarCita = (id) => {
    const newCitas = allCitas.filter(cita=>cita.id !== id);
    setAllCitas(newCitas)
  }


  return (
    <>
      <h1>Administrador de pacientes</h1>
      <div className='container'>
        <div className='row'>
          <div className='one-half column'>

          <Forms
            crearCita={crearCita}/>
          </div>

          <div className='one-half column'>
            <h2>{allCitas.length === 0 ? 'No hay citas': 'Administra tus citas'}</h2>
            {
              allCitas.map((cita)=>{
                return <CardCita 
                        cita={cita}
                        key={cita.id}
                        eliminarCita={eliminarCita}/>
              })
            }
          </div>

        </div>

      </div>
    </>

  )
}

export default App
