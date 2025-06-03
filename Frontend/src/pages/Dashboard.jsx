import { useContext } from 'react'
import {UserContext} from '../contexts/UserContext'

const Dashboard = () => {

	const { user } = useContext(UserContext);
  return (
	<div>{ user.fullname.first }</div>
  )
}

export default Dashboard