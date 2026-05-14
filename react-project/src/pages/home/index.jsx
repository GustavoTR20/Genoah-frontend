import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/trash.png'
import api from '../../services/api'

function Home() {
  const [subscriptions, setSubscriptions] = useState([])

  const inputServiceName = useRef()
  const inputMonthlyPrice = useRef()
  const inputAccountEmail = useRef()

  async function getSubscriptions() {
    const subscriptionsFromApi = await api.get('/subscriptions')

    setSubscriptions(subscriptionsFromApi.data)
  }

  async function createSubscription() {
    await api.post('/subscriptions', {
      serviceName: inputServiceName.current.value,
      monthlyPrice: inputMonthlyPrice.current.value,
      accountEmail: inputAccountEmail.current.value
    })

    getSubscriptions()
  }

  async function deleteSubscription(id) {
    await api.delete(`/subscriptions/${id}`)

    getSubscriptions()
  }

  useEffect(() => {
    //  getSubscriptions()
  }, [])

  return (
    <div className='container'>
      <form>
        <h1>Subscription Manager</h1>

        <input placeholder='Service Name' name='serviceName' type='text' ref={inputServiceName} />
        <input placeholder='Monthly Price' name='monthlyPrice' type='number' ref={inputMonthlyPrice} />
        <input placeholder='Account Email' name='accountEmail' type='email' ref={inputAccountEmail} />

        <button type='button' onClick={createSubscription}> Add Subscription </button>
      </form>

      {subscriptions.map((subscription) => (
        <div key={subscription.id} className='card'>
          <div className='subscription-info'>
            <div>
              <h2>{subscription.serviceName}</h2>
              <p>{subscription.accountEmail}</p>
            </div>

            <span className='price-tag'>
              €{subscription.monthlyPrice}
            </span>
          </div>

          <button onClick={() => deleteSubscription(subscription.id)}>
            <img src={Trash} />
          </button>
        </div>
      ))}
    </div>
  )
}

export default Home