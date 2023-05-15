//un slice es una porcion de estado
//cuando la app es muy grande, se recomienda dividir el estado en varios slices

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    contador: 0,
    tareas: []
}

//createSlice siempre recibe estos valores
const sliceLista = createSlice({
    name: 'lista',
    initialState, //constante ya creada arriba
    //se puede crear los valores directamente aca


    reducers: {
        agregarTarea: (state,action) => {
            const {nombre, completado} = action.payload
            state.contador++
            state.tareas.push({nombre, completado})
        },
        eliminarTarea: (state,action) => {
            const nombre = action.payload
            state.tareas = state.tareas.filter(tarea => tarea.nombre !== nombre) //guardamos las tareas que no coincidan con la tarea a eliminar
            state.contador--
        },
        cambiarEstado: (state,action) => {
            let {nombre, completado} = action.payload            
            const filterState = state.tareas.filter(tarea => tarea.nombre !== nombre)
            completado = !completado

            filterState.push({nombre,completado})
            state.tareas = filterState
        },
        filtrar: (state,action) => {
            if (action.payload === 'completados') {
                state.tareas.filter(tarea => tarea.completado)
            } else if (action.payload === 'incompletos'){
                state.tareas.filter(tarea => tarea.completado === false)
            } 
        }
    }
})

export const {agregarTarea, eliminarTarea, cambiarEstado, filtrar} = sliceLista.actions
export default sliceLista.reducer