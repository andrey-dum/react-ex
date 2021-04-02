import {useDispatch} from 'react-redux'
import { bindActionCreators } from 'redux'


import * as appActions from '../store/actions'

const ActionCreators = {
    ...appActions
}


export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(ActionCreators, dispatch)
}