import { GET_PAYMENT_METHODS, CONFIRM, SET_AMOUNT, SET_LOADING, SET_STEP, SET_ERROR } from "./actionTypes"


const initialState = {
  payMethods: {},
  loading: false,
  error: null,
  sellAmount: 0,
  buyAmount: 0,
  step: 1,
  base: "invoice",
  amount: 0,
  invoicePayMethod: 0,
  withdrawPayMethod: 0

}



export default function appReducer (state=initialState, action) {
  switch(action.type) {
    case GET_PAYMENT_METHODS:
      return {
        ...state,
        payMethods: {...action.payload},
        invoicePayMethod: action.payload.invoice[0].id,
        withdrawPayMethod: action.payload.withdraw[0].id,
      }
    case SET_AMOUNT:
      return {
        ...state,
        ...action.payload
      }
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload

      }
    case SET_STEP:
      return {
        ...state,
        step: action.payload
      }
    case SET_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case CONFIRM:
      return {
        ...state,
        sellAmount: 0,
        buyAmount: 0,
        step: 3,
        base: "invoice",
        amount: 0,
      }

    default:
      return state
  }

}


