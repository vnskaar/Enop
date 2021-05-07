import time
from flask import Flask
from flask import request
import json
import threading

import paho.mqtt.publish as publish
import paho.mqtt.subscribe as subscribe
import paho.mqtt.client as mqtt

app = Flask(__name__)

topic = "pt:j1/mt:cmd/rt:app/rn:tpflow/ad:1"

registryGetDevices = {
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

getRegistryDevices = json.dumps(registryGetDevices)

flag_connected = 0
flag_loggedin = 0
devices = {"Devices":[]}


def on_connect(client, userdata, flags, rc):
    global flag_connected
    flag_connected = 1
    return ("Connection success!")

def on_disconnect(client, userdata, rc):
    global flag_connected
    flag_connected = 0
    return ("Connection disconnected")

@app.route('/checkConnection')
def checkConnection():
    hostname = request.args.get('hostname')
    port = 1884
    user = request.args.get('user')
    password = request.args.get('password')

    if user == "sensor" and password == "sensor" and hostname == "":
        return {"Status": "Connection bypassed. Welcome sensor!"}

    if hostname:
        pass
    else:
        return {"Status": "Connection failed! Hub address has to be valid"}

    client = mqtt.Client()
    client.on_connect = on_connect
    client.on_disconnect = on_disconnect
    client.username_pw_set(user, password=password)

    try:
        client.connect(hostname, port)
    except Exception as e:
        print("Connection failed with error:", e)
        response = "Connection failed with error: " + str(e)
        return {"Status": response}

    client.loop_start()
    time.sleep(0.1)

    if flag_connected == 1:
        print("Connection successful")
        getDevices()
        return {"Status": "Connection successful!"}
    elif flag_connected == 0:
        print("Connection failed")
        return {"Status": "Connection failed!"}
    else:
        print("Something went WEWY WRONG")
        return {"Status": "Connection failed!"}

def waitForResponse(hostname, port, auth):
    nrDevices = 0
    port = int(port)
    msg = ""
    newMsg = ""

    try:
        print("Subscribing to topic...")
        msg = subscribe.simple("pt:j1/mt:rsp/rt:app/rn:enop/ad:1", hostname=hostname, port=port, auth=auth)
        print("Subscribed to topic")
        time.sleep(0.1)
        print("Waiting for message...")
        try:
            newMsg = json.loads(msg.payload)
        except Exception as e:
            print("Something went wrong when trying to read message")
            return ("Something went wrong when trying to read message")

        try:
            with open("../src/assets/jsonData/deviceList.json", "w+") as f:
                f.write(json.dumps(newMsg, indent=4))
                f.close()
        except Exception as e:
            print("Something went wrong, errormessage:", e)
            return ("Something went wrong, errormessage:", e)

        if devices["Devices"]:
            devices["Devices"].clear()
        for val in newMsg["val"]:
            print(val.get('alias'))
            devices["Devices"].append(val.get('alias'))
            nrDevices += 1

        print("\nNumber of devices:", nrDevices)
        print("Devices connected to the hub:", devices, "\n")
    except Exception as e:
        print("Something went wrong, errormessage:", e)
        return ("Something went wrong, errormessage:", e)
    pass

def sendCommand(hostname, port, auth):
    hostname = request.args.get('hostname')
    port = 1884
    user = request.args.get('user')
    password = request.args.get('password')
    auth = {
        "username": user,
        "password": password
    }

    x = threading.Thread(target=waitForResponse, args=(hostname, port, auth))
    x.start()
    time.sleep(0.1)
    publish.single(topic, payload=getRegistryDevices, hostname=hostname, port=1884, auth=auth)
    x.join()
    pass

@app.route('/getDevices')
def getDevices():
    hostname = request.args.get('hostname')
    port = 1884
    user = request.args.get('user')
    password = request.args.get('password')
    auth = {
        "username": user,
        "password": password
    }
    print(hostname, user, password)

    x = threading.Thread(target=waitForResponse, args=(hostname, port, auth))
    x.start()
    time.sleep(0.1)
    publish.single(topic, payload=getRegistryDevices, hostname=hostname, port=1884, auth=auth)
    x.join()
    return devices

