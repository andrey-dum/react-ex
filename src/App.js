import { useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import './App.css';
import Details from './components/Details';
import Loader from './components/Loader/Loader';
import Succes from './components/Succes';
import { useActions } from './hooks/useActions';
import { debounce } from './utils';



function App() {
  const { fetchPayMethods, fetchAmount, setAmount, sendRequest } = useActions()
  const state = useSelector(state => state.app)
  const {step, error, sellAmount, buyAmount} = useSelector(state => state.app)

  const debounceOnChange = useCallback(debounce(fetchAmount, 500), []);

  useEffect(() => {
    fetchPayMethods()
  }, [])

  const handleChangeSelect = (e) => {
    setAmount({invoicePayMethod: +e.target.value})
    if(sellAmount) {
      debounceOnChange()
    }
  }

  const handleChangeSelect2 = (e) => {
    setAmount({withdrawPayMethod: +e.target.value})
    if(buyAmount) {
      debounceOnChange()
    }
  }

  const handleClick = () => {
    sendRequest()
  }
  const handleChangeInput = (e) => {
    let val = e.target.value;
    setAmount({
      base: e.target.name,
      sellAmount: e.target.name === "invoice" ? val : state.amount,
      buyAmount: e.target.name === "withdraw" ? val : state.amount,
    })

    if (val) {
      debounceOnChange()
    }
  }

  return (
    <div className="app">
      <div className="appWraper">
        { step === 1 &&
          <div className="container">
            <div className="appHome">

              <div className="sell">
                <h2 className="title">Sell</h2>
                <div>
                    <select
                      value={state.invoicePayMethod}
                      onChange={handleChangeSelect}
                    >
                    { state.payMethods?.invoice?.map(el => (
                        <option
                          name={el.name}
                          key={el.id}
                          value={el.id}
                        >
                          {el.name}
                        </option>
                    )) }
                    </select>
                </div>

                <div className="textField">
                  <input
                    name="invoice"
                    type="text"
                    value={state.sellAmount}
                    onChange={handleChangeInput}
                    disabled={state.loading}
                  />
                    {state.loading && <Loader />}
                </div>

              </div>

              <div className="buy">

                <h2 className="title">Buy</h2>
                <div>
                  <select
                    value={state.withdrawPayMethod}
                    onChange={handleChangeSelect2}
                  >
                  { state.payMethods?.withdraw?.map(el => (
                      <option
                        name={el.name}
                        key={el.id}
                        value={el.id}
                      >
                        {el.name}
                      </option>
                  )) }
                  </select>
                </div>

                <div className="textField">
                  <input
                    name="withdraw"
                    value={state.buyAmount}
                    type="text"
                    onChange={handleChangeInput}
                  />
                  {state.loading && <Loader />}
                </div>
              </div>

            </div>

            {error && <div style={{color: 'red', marginBottom: 14}}>{error.message}</div> }

            <button
              className="btn"
              onClick={handleClick}
              disabled={!sellAmount || state.loading}
            >Exchange</button>
        </div>
      }

        {step === 2 && <Details /> }
        {step === 3 && <Succes /> }

      </div>

    </div>
  );
}

export default App;
