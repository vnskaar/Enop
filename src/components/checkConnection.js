import React, { useState, useEffect } from "react";

function CheckConnection(props) {
	const formData = props;
	
	const hostname = formData.hubAddress;
	const port = formData.hubPort;
	const user = formData.hubUsername;
	const password = formData.hubPassword;

	fetch('/checkConnection' + "?" + "hostname=" + hostname + "&" + "port="
    + port + "&" + "user=" + user + "&" + "password=" + password).then(res =>
    res.json()).then(data => {
      console.log(data);
    })
}

export default CheckConnection;

