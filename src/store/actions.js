import { exAPI } from "../api/api";
import { GET_PAYMENT_METHODS, SET_AMOUNT, SET_LOADING, SET_STEP, SET_ERROR, CONFIRM } from "./actionTypes";

export function getPayMethods (payMethods) {
  return {
    type: GET_PAYMENT_METHODS,
    payload: payMethods
  }
}

export function setAmount (payload) {
  return {
    type: SET_AMOUNT,
    payload
  }
}
export function setLoading (payload) {
  return {
    type: SET_LOADING,
    payload
  }
}

export function setStep (payload) {
  return {
    type: SET_STEP,
    payload
  }
}
export function setError (payload) {
  return {
    type: SET_ERROR,
    payload
  }
}
export function confirm () {
  return {
    type: CONFIRM,
  }
}




export function fetchPayMethods() {
 return async dispatch => {
    dispatch(setLoading(true))
    try {
      const response = await exAPI.getPayMethods()
      dispatch(getPayMethods(response))
      dispatch(setLoading(false))
    } catch (error) {
        console.log(error);
        dispatch(setLoading(false))
    }
  }
}

export function fetchAmount() {
 return async (dispatch, getState) => {
    dispatch(setLoading(true))
    const {app} = getState()

    const params = {
      base: app.base,
      amount: app.base === "invoice" ? app.sellAmount : app.buyAmount,
      invoicePayMethod: Number(app.invoicePayMethod),
      withdrawPayMethod: Number(app.withdrawPayMethod)
    }

      try {
        const response = await exAPI.calculate(params)
        params.base === 'invoice'
          ? dispatch(setAmount({buyAmount: response.data.amount}))
          : dispatch(setAmount({sellAmount: response.data.amount}))
        dispatch(setError(null))
        dispatch(setLoading(false))
      } catch (error) {
          dispatch(setError({message: "Некорректные данные!"}))
          // dispatch(setError(error))
          dispatch(setLoading(false))
      }
    }
}


export function sendRequest() {
 return async (dispatch, getState) => {
    dispatch(setLoading(true))
    const {app} = getState()
    const options = {
      base: app.base,
      amount:  Number(app.sellAmount),
      invoicePayMethod: Number(app.invoicePayMethod),
      withdrawPayMethod: Number(app.withdrawPayMethod)
    }

    try {
      const response = await exAPI.createReq(options)

      if(response.message === "Success") {
        dispatch(setStep(2))
        dispatch(setError(null))
      } else {
        dispatch(setError(response.message))
      }

      dispatch(setLoading(false))

    } catch (error) {
        dispatch(setError(error))
        dispatch(setLoading(false))
    }
  }
}