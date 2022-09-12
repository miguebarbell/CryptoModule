export const divStyles = {
	display       : "flex",
	flexDirection : "column",
	alignItems    : "center",
	justifyContent: "center",
	// fontFamily: 'Montserrat'
	fontFamily: 'Chakra Petch'
};
const AddCurrencies = () => {

	return (
		<div style={divStyles}>
			<h1>Ops! you are not watching any currency yet!</h1>
			<h4>Search and add any cryptocurrency you want to watch from the list below.</h4>
		</div>
	);
};
export default AddCurrencies;
