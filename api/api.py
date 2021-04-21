import time
from flask import Flask
from flask import request
import paho.mqtt.client as mqtt
import json
import threading

import paho.mqtt.publish as publish
import paho.mqtt.subscribe as subscribe
import paho.mqtt.client as mqtt

app = Flask(__name__)

topic = "pt:j1/mt:cmd/rt:app/rn:tpflow/ad:1"

registryDevices = {
  "serv": "Energy Optimization",
  "type": "cmd.registry.get_devices",
  "val_t": "str_map",
  "val": {},
  "props": None,
  "tags": None,
  "resp_to": "pt:j1/mt:rsp/rt:app/rn:enop/ad:1",
  "src": "enop",
  "ver": "1"
}

getRegistryDevices = json.dumps(registryDevices)

hostname = ""
port = ""
user = ""
password = ""
auth = {}

connection = False

@app.route('/connectHub')
def connectHub():
	hostname = request.args.get('hostname')
	port = request.args.get('port')
	user = request.args.get('user')
	password = request.args.get('password')

	auth = {
	"username" : user,
	"password" : password
	}
	print(f'Trying to establish connection with %s on port %s as user %s' % (hostname, port, user))

	sendCommand(hostname, port, auth)
	response = {
		"Status" : "Connection established!"
	}

	return (response)

def waitForResponse(hostname, port, auth):
	nrDevices = 0
	devices = []
	port = int(port)

	msg = subscribe.simple("pt:j1/mt:rsp/rt:app/rn:enop/ad:1", hostname=hostname, port=port, auth=auth)
	newMsg = json.loads(msg.payload)

	for val in newMsg["val"]:
		nrDevices += 1
		devices.append(val.get('alias'))

	print("\nNumber of devices:", nrDevices)
	print("\nDevices connected to the hub:", devices,"\n")
	pass

def sendCommand(hostname, port, auth):
	x = threading.Thread(target=waitForResponse, args=(hostname, port, auth))
	x.start()
	time.sleep(0.1)

	publish.single(topic, payload=getRegistryDevices, hostname=hostname, port=1884, auth=auth)

	x.join()

	return("Command sent!")

@app.route('/time')
def get_current_time():
	seconds = time.time()
	local_time = time.ctime(seconds)
	return {'time': local_time}