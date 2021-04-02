import { HiShieldCheck } from 'react-icons/hi';
import { useActions } from '../hooks/useActions';


function Succes() {
  const { setStep } = useActions()

  return (
    <div className="success">
      <div className="container">
        <HiShieldCheck className="successIcon" />
        <h1 className="title">Success</h1>
        <p>Your exchange order has been placed successfully and will be processed soon.</p>

        <button
          className="btn"
          onClick={() => setStep(1)}
        >
          Home
        </button>

        </div>
    </div>
  )
}

export default Succes
