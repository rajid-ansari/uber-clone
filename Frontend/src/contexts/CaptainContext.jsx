import { createContext, useState } from 'react';

export const CaptainContext = createContext();

const CaptainProvider = ({ children }) => {

	const storedCaptain = JSON.parse(localStorage.getItem("captain"));
	
	const [captain, setCaptain] = useState(
		storedCaptain ? storedCaptain : null
	);

	return (
		<CaptainContext.Provider value={{captain, setCaptain}}>
			{children}
		</CaptainContext.Provider>
	);
};

export default CaptainProvider;