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
port = 1884                         #Broker port
user = "jesper"                    #Connection username
password = "jesper"            #Connection password

testFullSend = {
  "serv": "vinculum",
  "type": "cmd.pd7.request",
  "val_t": "object",
  "val": {
    "cmd": "get",
    "component": None,
    "id": None,
    "client": None,
    "param": {
      "components": [
        "room"
      ]
    },
    "requestId": "161883590955573"
  },
  "props": None,
  "tags": None,
  "resp_to": "pt:j1/mt:rsp/rt:cloud/rn:remote-client/ad:smarthome-app",
  "src": "app",
  "ver": "1",
  "topic": "pt:j1/mt:cmd/rt:app/rn:vinculum/ad:1"
}

getExtendedSet = {
  "serv": "enop",
  "type": "cmd.registry.get_devices",
  "val_t": "str_map",
  "val" : {},
  "resp_to": "pt:j1/mt:rsp/rt:app/rn:enop/ad:1",
  "src": "flask_backend",
  "ver": "1",
  "topic": "pt:j1/mt:cmd/rt:ad/rn:flask_backend/ad:1"
}

getExtendedSetjson = json.dumps(getExtendedSet)
getFullSend = json.dumps(testFullSend)

def waitForResponse():
	msg = subscribe.simple("pt:j1/mt:rsp/rt:cloud/rn:remote-client/ad:smarthome-app", hostname=hostname, port=port, auth=auth)
	print("\n--==MESSAGE START==--\n")
	print("%s %s" % (msg.topic, msg.payload))
	print("\n--==MESSAGE END==--\n")
	pass


@app.route("/sendCommand")
def sendCommand():
	x = threading.Thread(target=waitForResponse)
	x.start()
	time.sleep(0.1)

	publish.single(topic, payload=getFullSend, qos=0, retain=False, hostname=hostname,
    port=1884, client_id="", keepalive=60, will=None, auth=auth, tls=None,
    protocol=mqtt.MQTTv311, transport="tcp")

	x.join()

	return("Command sent!")

@app.route('/time')
def get_current_time():
	seconds = time.time()
	local_time = time.ctime(seconds)
	return {'time': local_time}