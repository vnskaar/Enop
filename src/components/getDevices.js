import React, { useState, useEffect } from "react";


function GetDevices() {
  
  const hostname = "192.168.2.65"
  const port = "1884"
  const user = "jesper"
  const password = "jesper"
  
  fetch('/getDevices' + "?" + "hostname=" + hostname + "&" + "port="
    + port + "&" + "user=" + user + "&" + "password=" + password).then(res =>
    res.json()).then(data => {
      console.log(data);

    })
}

export default GetDevices;

