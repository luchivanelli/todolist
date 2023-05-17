import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useState } from "react"
import {agregarTarea, eliminarTarea, cambiarEstado} from '../redux/sliceLista'




const Lista = ()=> {
    const lista = useSelector((state)=> state.lista)
    const dispatch = useDispatch()
    const [value, setValue] = useState('')

    const agregar = ()=> {
        dispatch(agregarTarea({nombre: value, completado: false}))
        setValue('')
    }

    const handleChange = (e)=> {
        setValue(e.target.value)
    }

    const filtrar = (data)=> {
        const tareas = document.querySelectorAll('.seccion__tareas__tarea')

        tareas.forEach(tarea => {
            tarea.classList.remove('ocultar-tarea')
        })

        if (data === 'completados') {
            const tareas = document.querySelectorAll('.seccion__tareas__tarea-incompleta')
            tareas.forEach(tarea=> {
                tarea.classList.add('ocultar-tarea')
            })
            
        } else if (data === 'incompletos'){
            const tareas = document.querySelectorAll('.seccion__tareas__tarea-completada')
            tareas.forEach(tarea=> {
                tarea.classList.add('ocultar-tarea')
            })
        } else {
            tareas.forEach(tarea => {
                tarea.classList.remove('ocultar-tarea')
            })
        }
    }

    return (
        <div className='seccion'>
            <div className='seccion__agregar'>
                <label>Agregar tarea:</label>
                <input type="text" value={value} onChange={handleChange}/>
                <button onClick={agregar}>+ Agregar</button>
            </div>
            <p className='seccion__info'>Presione sobre una tarea para marcala como completada. Si quiere desmarcarla, presione nuevamente</p>
            <div className='seccion__filtros'>
                <button onClick={()=> filtrar('completados')}>✔ Completados</button>
                <button onClick={()=> filtrar('incompletos')}>✘ Incompletos</button>
                <button onClick={()=> filtrar('')}>➤ Mostrar todos</button>
            </div>
            <ul className='seccion__tareas'>
                {lista.tareas.map(tarea => {
                    if (tarea.completado) {
                        return (
                            <div key={tarea.nombre} className="seccion__tareas__tarea seccion__tareas__tarea-completada">
                                <li  onClick={()=> dispatch(cambiarEstado(tarea))} className='tarea-completada'>{tarea.nombre}</li>
                                <button onClick={()=> dispatch(eliminarTarea(tarea.nombre))}>- Eliminar</button>
                            </div>
                        )
                    } else {
                        return (
                            <div key={tarea.nombre} className="seccion__tareas__tarea seccion__tareas__tarea-incompleta">
                                <li  onClick={()=> dispatch(cambiarEstado(tarea))}>{tarea.nombre}</li>
                                <button onClick={()=> dispatch(eliminarTarea(tarea.nombre))}>- Eliminar</button>
                            </div>
                        )
                    }
                })}
            </ul>
        </div>
    )
}

export default Lista