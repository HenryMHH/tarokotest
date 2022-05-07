import ContactModal from "components/contactModal";
import Contacts from "components/contacts";
import Nav from "components/nav";
import LoadingAnimation from "components/spinner";
import Toast from "components/toast";
import React from "react";
import { useSelector } from "react-redux";
import { selectSlice, userModalSlice } from "redux/selector";

function App() {
	const contactState = useSelector(selectSlice);
	const userModalState = useSelector(userModalSlice);
	return (
		<div className="App">
			<Nav />
			<Contacts />
			{contactState.isFetching && <LoadingAnimation isFullScreen />}
			{userModalState.isOpen && <ContactModal />}
			<Toast />
		</div>
	);
}

export default App;
