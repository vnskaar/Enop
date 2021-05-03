function CheckConnection(props) {
	const formData = props;
	
	const hostname = formData.hubAddress;
	const user = formData.hubUsername;
	const password = formData.hubPassword;

	fetch('/checkConnection' + "?" + "hostname=" + hostname + "&" + "user=" + user + "&" + "password=" + password).then(res =>
    res.json()).then(data => {
      console.log(data);
    })
}

export default CheckConnection;

