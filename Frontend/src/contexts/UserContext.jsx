import { createContext, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {

	const storedUser = JSON.parse(localStorage.getItem("user"));
	
	const [user, setUser] = useState(
		storedUser ? storedUser : null
	);

	return (
		<UserContext.Provider value={{user, setUser}}>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;