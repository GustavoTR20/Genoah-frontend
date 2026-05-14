import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/trash.png'
import api from '../../services/api'

function Home() {
  const [subscriptions, setSubscriptions] = useState([])
  const [search, setSearch] = useState('')

  const inputServiceName = useRef()
  const inputMonthlyPrice = useRef()
  const inputAccountEmail = useRef()
  const inputCategory = useRef()
  const inputStatus = useRef()

  async function getSubscriptions() {
    const subscriptionsFromApi = await api.get('/subscriptions')

    setSubscriptions(subscriptionsFromApi.data)
  }

  async function createSubscription() {
    await api.post('/subscriptions', {
      serviceName: inputServiceName.current.value,
      monthlyPrice: inputMonthlyPrice.current.value,
      accountEmail: inputAccountEmail.current.value,
      category: inputCategory.current.value,
      status: inputStatus.current.value
    })

    getSubscriptions()
  }

  async function deleteSubscription(id) {
    await api.delete(`/subscriptions/${id}`)

    getSubscriptions()
  }

  useEffect(() => {
    // getSubscriptions()
  }, [])

  const totalMonthlyCost = subscriptions.reduce(
    (acc, subscription) =>
      acc + Number(subscription.monthlyPrice),
    0
  )

  const annualCost = totalMonthlyCost * 12

  const activeSubscriptions = subscriptions.length

  const filteredSubscriptions = subscriptions.filter(
    (subscription) =>
      subscription.serviceName
        .toLowerCase()
        .includes(search.toLowerCase())
  )

  return (
    <div className='container'>
      <h1>Subscription Manager</h1>

      <div className='dashboard-cards'>
        <div className='dashboard-card'>
          <span>Monthly Total</span>
          <h2>€{totalMonthlyCost.toFixed(2)}</h2>
        </div>

        <div className='dashboard-card'>
          <span>Active Subscriptions</span>
          <h2>{activeSubscriptions}</h2>
        </div>

        <div className='dashboard-card'>
          <span>Annual Cost</span>
          <h2>€{annualCost.toFixed(2)}</h2>
        </div>
      </div>

      <input className='search-input' placeholder='Search subscriptions...' type='text' value={search} onChange={(event) => setSearch(event.target.value)} />

      <form>
        <input placeholder='Service Name' name='serviceName' type='text' ref={inputServiceName} />
        <input placeholder='Monthly Price' name='monthlyPrice' type='number' ref={inputMonthlyPrice} />
        <input placeholder='Account Email' name='accountEmail' type='email' ref={inputAccountEmail} />

        <select ref={inputCategory} defaultValue=''>
          <option value='' disabled> Select Category</option>
          <option value='Streaming'>Streaming</option>
          <option value='Music'>Music</option>
          <option value='Cloud'>Cloud</option>
          <option value='Fitness'>Fitness</option>
          <option value='Software'>Software</option>
          <option value='Education'>Education</option>
        </select>

        <select ref={inputStatus} defaultValue=''>
          <option value='' disabled>
            Select Status
          </option>

          <option value='Active'>Active</option>
          <option value='Paused'>Paused</option>
          <option value='Cancelled'>Cancelled</option>
        </select>

        <button type='button' onClick={createSubscription}> Add Subscription</button>
      </form>

      <div className='subscriptions-section'>
        <div className='subscriptions-header'>
          <h2>Your Subscriptions</h2>

          <span>
            {filteredSubscriptions.length} active services
          </span>
        </div>

        {filteredSubscriptions.map((subscription) => (
          <div key={subscription.id} className='subscription-row'>
            <div className='subscription-left'>
              <div className='subscription-icon'>
                {subscription.serviceName.charAt(0)}
              </div>

              <div>
                <h3>{subscription.serviceName}</h3>

                <span className='category-badge'>
                  {subscription.category}
                </span>

                <span
                  className={`status-badge ${subscription.status.toLowerCase()}`}>
                  {subscription.status}
                </span>

                <p>{subscription.accountEmail}</p>
              </div>
            </div>

            <div className='subscription-right'>
              <span className='price-tag'>
                €{subscription.monthlyPrice}
              </span>

              <button onClick={() => deleteSubscription(subscription.id)}>
                <img src={Trash} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home