import { useSelector } from 'react-redux'
import { useActions } from '../hooks/useActions'


function Details() {
  const state = useSelector(state => state.app)
  const { setStep, confirm } = useActions()
  let invoiceMethod = state.payMethods.invoice?.find(method => method.id === state.invoicePayMethod)
  let withdrawMethod = state.payMethods.withdraw?.find(method => method.id === state.withdrawPayMethod)

  return (
    <div className="details">

      <h2 className="title">Details</h2>

      <div className="container">
        <div className="detailsBlock">
          <div className="detailsRow">
            <h4>Sell</h4>
            <div>{state.sellAmount} - {invoiceMethod?.name }</div>
          </div>
          <div className="detailsRow">
            <h4>Buy</h4>
            {state.buyAmount} - {withdrawMethod?.name }
          </div>
        </div>

      <div className="detailsBtns">
        <button
            className="btn outlined"
            onClick={() => setStep(1)}
          >
          Cancel
        </button>
        <button
            className="btn"
            onClick={confirm}
          >
          Confirm
        </button>
      </div>

      </div>
    </div>
  )
}

export default Details
