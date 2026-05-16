import { useEffect, useState, useRef } from 'react'
import './style.css'
import api from '../../services/api'
import Sidebar from '../../components/sidebar'
import Topbar from '../../components/topbar'
import SubscriptionTable from '../../components/subscriptionTable'
import Footer from '../../components/footer'

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
      <Sidebar />

      <main className='container'>
        <Topbar showForm={showForm} setShowForm={setShowForm} />

        <input className='search-input' placeholder='Search subscriptions...' type='text' value={search} onChange={(event) =>
          setSearch(event.target.value)} />
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
              <option value='' disabled>Select Status </option>
              <option value='Active'>Active</option>
              <option value='Paused'>Paused</option>
              <option value='Cancelled'>Cancelled</option>
            </select>

            <button type='button' onClick={createSubscription}> Add Subscription</button>
          </form>
        )}

        <SubscriptionTable
          filteredSubscriptions={filteredSubscriptions}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          editSubscription={editSubscription}
          deleteSubscription={deleteSubscription}/>

        <Footer
          totalMonthlyCost={totalMonthlyCost}
          activeSubscriptions={activeSubscriptions}
          annualCost={annualCost}/>
          
      </main>
    </div>
  )
}

export default Home