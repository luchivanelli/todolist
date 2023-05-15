import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useState } from "react"
import {agregarTarea, eliminarTarea, cambiarEstado, filtrar} from '../redux/sliceLista'

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


    return (
        <div>
            <div>
                <label>Agregar tarea:</label>
                <input type="text" value={value} onChange={handleChange}/>
                <button onClick={agregar}>+ Agregar</button>
            </div>
            <button onClick={()=> dispatch(filtrar('completados'))}>Completados</button>
            <button onClick={()=> dispatch(filtrar('incompletos'))}>Incompletos</button>
            <button onClick={()=> dispatch(filtrar(''))}>Mostrar todos</button>
            <ul>
                {lista.tareas.map(tarea => {
                    if (tarea.completado) {
                        return (
                            <div key={tarea.nombre}>
                                <li className="tarea tareaCompletada" onClick={()=> dispatch(cambiarEstado(tarea))}>{tarea.nombre}</li>
                                <button onClick={()=> dispatch(eliminarTarea(tarea.nombre))}>Eliminar tarea</button>
                            </div>
                        )
                    } else {
                        return (
                            <div key={tarea.nombre}>
                                <li className="tarea" onClick={()=> dispatch(cambiarEstado(tarea))}>{tarea.nombre}</li>
                                <button onClick={()=> dispatch(eliminarTarea(tarea.nombre))}>Eliminar tarea</button>
                            </div>
                        )
                    }
                })}
            </ul>
        </div>
    )
}

export default Lista