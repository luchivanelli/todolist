import { configureStore } from "@reduxjs/toolkit";
import sliceLista from './sliceLista'


const store = configureStore({
    reducer: {
        lista: sliceLista,
    },
})

export default store