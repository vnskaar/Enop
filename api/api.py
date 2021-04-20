import time
from flask import Flask
import paho.mqtt.client as mqtt
import json
import threading

import paho.mqtt.publish as publish
import paho.mqtt.subscribe as subscribe
import paho.mqtt.client as mqtt

app = Flask(__name__)

topic = "pt:j1/mt:cmd/rt:app/rn:vinculum/ad:1"
hostname = "192.168.2.65"

broker = hostname  	#Broker address
port = 1884        	#Broker port
user = "jesper"    	#Connection username
password = "jesper"	#Connection password

auth = {
    "username" : "jesper",
    "password" : "jesper"
}

broker_address= hostname  #Broker address
port = 1884               #Broker port
user = "jesper"                    #Connection username
password = "jesper"            #Connection password

pd7request = {
  "serv": "enop",
  "type": "cmd.pd7.request",
  "val_t": "object",
  "val": {
    "cmd": "get",
    "component": None,
    "id": None,
    "client": None,
    "param": {
      "components": [
        "state"
      ]
    },
    "requestId": "161890508294127"
  },
  "props": None,
  "tags": None,
  "resp_to": "pt:j1/mt:rsp/rt:cloud/rn:enop/ad:smarthome-app",
  "src": "enop",
  "ver": "1",
  "topic": "pt:j1/mt:cmd/rt:app/rn:vinculum/ad:1"
}

getpd7request = json.dumps(pd7request)

def waitForResponse():
	nrDevices = 0
	msg = ""
	msg = subscribe.simple("pt:j1/mt:rsp/rt:cloud/rn:enop/ad:smarthome-app", hostname=hostname, port=port, auth=auth)
	
	newMsg = json.loads(msg.payload)
	print("\n--==MESSAGE START==--\n")
	#print("This is the topic: %s\n\nThis is the payload:\n\n %s" % (msg.topic, msg.payload))
	for key, value in newMsg.items():
		print("Key:", key, "Value:", value)

	print("\n--==FOR LOOP==--\n")
	for device in newMsg["val"]["param"]["state"]["devices"]:
		nrDevices += 1
		print(device)
		print("\nNumber of devices:", nrDevices)
	#print(newMsg["val"])
	print("\n--==FOR LOOP END==--\n")	

	print("\n--==MESSAGE END==--\n")
	pass


@app.route("/sendCommand")
def sendCommand():
	x = threading.Thread(target=waitForResponse)
	x.start()
	time.sleep(0.1)

	publish.single(topic, payload=getpd7request, qos=0, retain=False, hostname=hostname,
    port=1884, client_id="", keepalive=60, will=None, auth=auth, tls=None,
    protocol=mqtt.MQTTv311, transport="tcp")

	x.join()

	return("Command sent!")

@app.route('/time')
def get_current_time():
	seconds = time.time()
	local_time = time.ctime(seconds)
	return {'time': local_time}