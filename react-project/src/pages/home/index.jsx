import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/trash.png'
import api from '../../services/api'

function Home() {
  const [subscriptions, setSubscriptions] = useState([])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const inputServiceName = useRef()
  const inputMonthlyPrice = useRef()
  const inputAccountEmail = useRef()
  const inputCategory = useRef()
  const inputStatus = useRef()

  async function getSubscriptions() {
    const subscriptionsFromApi = await api.get('/subscriptions')

    setSubscriptions(subscriptionsFromApi.data)
  }

  function editSubscription(subscription) {
    inputServiceName.current.value = subscription.serviceName
    inputMonthlyPrice.current.value = subscription.monthlyPrice
    inputAccountEmail.current.value = subscription.accountEmail
    inputCategory.current.value = subscription.category
    inputStatus.current.value = subscription.status

    setEditingId(subscription.id)
  }

  async function createSubscription() {
    const subscriptionData = {
      serviceName: inputServiceName.current.value,
      monthlyPrice: inputMonthlyPrice.current.value,
      accountEmail: inputAccountEmail.current.value,
      category: inputCategory.current.value,
      status: inputStatus.current.value
    }

    if (editingId) {
      await api.put(`/subscriptions/${editingId}`, subscriptionData)
      setEditingId(null)
    } else {
      await api.post('/subscriptions', subscriptionData)
    }

    inputServiceName.current.value = ''
    inputMonthlyPrice.current.value = ''
    inputAccountEmail.current.value = ''
    inputCategory.current.value = ''
    inputStatus.current.value = ''

    getSubscriptions()
    setShowForm(false)
  }

  async function deleteSubscription(id) {
    await api.delete(`/subscriptions/${id}`)

    getSubscriptions()
  }

 useEffect(() => {
  async function loadSubscriptions() {
    const subscriptionsFromApi = await api.get('/subscriptions')
    setSubscriptions(subscriptionsFromApi.data)
  }

  loadSubscriptions()
}, [])

  const totalMonthlyCost = subscriptions.reduce(
    (acc, subscription) =>
      acc + Number(subscription.monthlyPrice),
    0
  )

  const annualCost = totalMonthlyCost * 12

  const activeSubscriptions = subscriptions.length

  const filteredSubscriptions = subscriptions.filter(
    (subscription) => {

      const matchesSearch = subscription.serviceName.toLowerCase().includes(search.toLowerCase())

      const matchesStatus = statusFilter === 'All' ? true : subscription.status === statusFilter

      return matchesSearch && matchesStatus
    }
  )

  return (
    <div className='app-layout'>
      <aside className='sidebar'>
        <div className='sidebar-logo'>
          <div className='logo-icon'>G</div>

          <div>
            <h2>GENOAH</h2>
            <span>Full Stack Project</span>
          </div>
        </div>

        <nav className='sidebar-nav'>
          <button className='nav-item active'>Subscriptions</button>
          <button className='nav-item'>Dashboard</button>
        </nav>
      </aside>

      <main className='container'>
        <div className='topbar'>
          <h1>Manage Subscriptions</h1>


          <button className='topbar-button' onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Close' : '+ Add New'} 
          </button>
        </div>

        <input className='search-input' placeholder='Search subscriptions...' type='text' value={search} onChange={(event) => setSearch(event.target.value)} />

{showForm && (
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
        )}

        <div className='filters'>
          <button className={statusFilter === 'All' ? 'active-filter' : ''} onClick={() => setStatusFilter('All')}>
            All
          </button>

          <button
            className={statusFilter === 'Active' ? 'active-filter' : ''} onClick={() => setStatusFilter('Active')}>
            Active
          </button>

          <button className={statusFilter === 'Paused' ? 'active-filter' : ''} onClick={() => setStatusFilter('Paused')}>
            Paused
          </button>

          <button className={statusFilter === 'Cancelled' ? 'active-filter' : ''} onClick={() => setStatusFilter('Cancelled')}>
            Cancelled
          </button>
        </div>

        <div className='subscriptions-section'>
          <div className='subscriptions-header'>
            <h2>Your Subscriptions</h2>

            <span>
              {filteredSubscriptions.length} active services
            </span>
          </div>

          <div className='table-header'>
            <span>Service</span>
            <span>Category</span>
            <span>Status</span>
            <span>Price</span>
            <span>Actions</span>
          </div>

          {filteredSubscriptions.map((subscription) => (
            <div key={subscription.id} className='subscription-row'>
              <div className='table-service'>
                <div className='subscription-icon'>
                  {subscription.serviceName.charAt(0)}
                </div>

                <div>
                  <h3>{subscription.serviceName}</h3>
                  <p>{subscription.accountEmail}</p>
                </div>
              </div>

              <div className='table-category'>
                <span className='category-badge'>
                  {subscription.category}
                </span>
              </div>

              <div className='table-status'>
                <span className={`status-badge ${subscription.status.toLowerCase()}`}>
                  {subscription.status}
                </span>
              </div>

              <div className='table-price'>
                €{subscription.monthlyPrice}
              </div>

              <div className='table-actions'>
                <button className='edit-button' onClick={() => editSubscription(subscription)}> Edit </button>

                <button onClick={() => deleteSubscription(subscription.id)}>
                  <img src={Trash} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className='analytics-footer'>
          <div className='analytics-item'>
            <span>Monthly Spend</span>
            <h3>€{totalMonthlyCost.toFixed(2)}</h3>
          </div>

          <div className='analytics-item'>
            <span>Services</span>
            <h3>{activeSubscriptions}</h3>
          </div>

          <div className='analytics-item'>
            <span>Annual Cost</span>
            <h3>€{annualCost.toFixed(2)}</h3>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home