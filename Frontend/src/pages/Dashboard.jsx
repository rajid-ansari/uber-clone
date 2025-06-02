import React, { useContext } from 'react'
import {UserContext} from '../contexts/UserContext'

const Dashboard = () => {

	const { user, setUser } = useContext(UserContext);
	console.log(user)
  return (
	<div>{ user.fullname.first }</div>
  )
}

export default Dashboard