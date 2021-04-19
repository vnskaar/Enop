import time
from flask import Flask
import paho.mqtt.client as mqtt
import json
import paho.mqtt.publish as publish

app = Flask(__name__)

topic = "pt:j1/mt:cmd/rt:ad/rn:enop/ad:1"
hostname = "192.168.2.65"

getExtendedSet = {
  "serv": "flask_backend",
  "type": "cmd.config.extended_set",
  "val_t": "string",
  "val" : "Vi tester backenden",
  "resp_to": "pt:j1/mt:rsp/rt:app/rn:flask_backend/ad:1",
  "src": "flask_backend",
  "ver": "1",
  "topic": "pt:j1/mt:cmd/rt:ad/rn:flask_backend/ad:1"
}

getExtendedSetjson = json.dumps(getExtendedSet)

auth = {
    "username" : "jesper",
    "password" : "jesper"
}

@app.route("/sendCommand")
def sendCommand():
	publish.single(topic, payload=getExtendedSetjson, qos=0, retain=False, hostname=hostname,
    port=1884, client_id="", keepalive=60, will=None, auth=auth, tls=None,
    protocol=mqtt.MQTTv311, transport="tcp")

	return("Command sent!")

@app.route('/time')
def get_current_time():
	seconds = time.time()
	local_time = time.ctime(seconds)
	return {'time': local_time}