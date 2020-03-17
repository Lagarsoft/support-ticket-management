import {
    GET_FLOOR,
} from './actions'
import axios from 'axios'

export interface FloorState {
    name?: string
}

const initialState: FloorState = {
    name: undefined,
}

const spaces = (state = initialState, action: { type: string, floor: any }) => {
    switch (action.type) {
        case GET_FLOOR:
            return {
                ...state,
                name: action.floor.properties.name,
            }
        default:
            return state
    }
}

export const receiveFloor = (data: any) => {
    return { type: GET_FLOOR, floor: data}
}


export const fetchFloor = (floorId: any) => (dispatch: any) => {
    // call action fetching florr
    // dispatch()

    return axios.get(`http://localhost:3000/v1/floor/${floorId}`).then( response => {
        console.log(response.data)
        dispatch(receiveFloor(response.data))
    }).catch( error=>{
        console.log(error)
    })
}


export default spaces