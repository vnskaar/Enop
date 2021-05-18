import time
from flask import Flask
from flask import request
import json
import threading
import requests
import socket

import paho.mqtt.publish as publish
import paho.mqtt.subscribe as subscribe
import paho.mqtt.client as mqtt

app = Flask(__name__)

topic = "pt:j1/mt:cmd/rt:app/rn:tpflow/ad:1"

jsonFile = open('flowUpdate.json')
flowUpdateDefinition = json.load(jsonFile)
jsonFile.close()

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
devices = {"Devices": []}


def checkIP(ip):
    try:
        socket.inet_aton(ip)
        return True
    except socket.error:
        return False


def on_connect(client, userdata, flags, rc):
    global flag_connected
    flag_connected = 1
    return "Connection success!"


def on_disconnect(client, userdata, rc):
    global flag_connected
    flag_connected = 0
    return "Connection disconnected"


@app.route('/checkConnection')
def checkConnection():
    hostname = request.args.get('hostname')
    port = 1884
    user = request.args.get('user')
    password = request.args.get('password')

    if user == "sensor" and password == "sensor" and hostname == "":
        return {"Status": "Connection bypassed. Welcome!"}

    if hostname:
        if checkIP(hostname):
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
        print("Something went wrong")
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
            return "Something went wrong when trying to read message"

        try:
            with open("../src/assets/jsonData/deviceList.json", "w+") as f:
                f.write(json.dumps(newMsg, indent=4))
                f.close()
        except Exception as e:
            print("Something went wrong, errormessage:", e)
            print("Exceptiontype:", type(e))
            return "Something went wrong, errormessage:", e

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
        print("Exceptiontype:", type(e))
        return "Something went wrong, errormessage:", e
    pass


# ----------==========SE OM DEN KAN FJERNES ??==========---------
# ----------==========SE OM DEN KAN FJERNES ??==========---------
# ----------==========SE OM DEN KAN FJERNES ??==========---------
# ----------==========SE OM DEN KAN FJERNES ??==========---------
# ----------==========SE OM DEN KAN FJERNES ??==========---------
# ----------==========SE OM DEN KAN FJERNES ??==========---------
# ----------==========SE OM DEN KAN FJERNES ??==========---------
# ----------==========SE OM DEN KAN FJERNES ??==========---------

def sendCommand(hostname, port, auth):
    hostname = request.args.get('hostname')
    port = 1884
    user = request.args.get('user')
    password = request.args.get('password')
    auth = {
        "username": user,
        "password": password
    }
    try:
        x = threading.Thread(target=waitForResponse, args=(hostname, port, auth))
        x.start()
        publish.single(topic, payload=getRegistryDevices, hostname=hostname, port=1884, auth=auth)
        x.join()
    except Exception as e:
        print("Something fecked", e)
        print("Exception type:", e)

    pass


# ----------==========SE OM DEN OVER KAN FJERNES ??==========---------
# ----------==========SE OM DEN OVER KAN FJERNES ??==========---------
# ----------==========SE OM DEN OVER KAN FJERNES ??==========---------
# ----------==========SE OM DEN OVER KAN FJERNES ??==========---------
# ----------==========SE OM DEN OVER KAN FJERNES ??==========---------
# ----------==========SE OM DEN OVER KAN FJERNES ??==========---------
# ----------==========SE OM DEN OVER KAN FJERNES ??==========---------
# ----------==========SE OM DEN OVER KAN FJERNES ??==========---------

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

    if not hostname or not user or not password:
        print("You did not supply either hostname, username or password")
        return "You did not supply either hostname, username or password"

    if not checkIP(hostname):
        return "Connection failed, invalid IP"

    print("Hostname:", hostname, "User:", user, "Password:", password)

    x = threading.Thread(target=waitForResponse, args=(hostname, port, auth))
    x.start()
    time.sleep(0.1)
    publish.single(topic, payload=getRegistryDevices, hostname=hostname, port=1884, auth=auth)
    x.join()
    return devices


@app.route('/updateSchedule')
def updateSchedule():
    hostname = request.args.get('hostname')
    port = 1884
    user = request.args.get('user')
    password = request.args.get('password')
    auth = {
        "username": user,
        "password": password
    }

    if not hostname or not user or not password:
        return {"Status": "Hostname, user or password is not provided"}

    up = request.args.get('up')
    leave = request.args.get('leave')
    home = request.args.get('home')
    sleep = request.args.get('sleep')

    setWake(hostname, auth, up)
    setAway(hostname, auth, leave)
    setHome(hostname, auth, home)
    setSleep(hostname, auth, sleep)
    return {"Status": "Automations sent successfully"}


def formatPayload(when, time):
    if when == "WakeUp" or when == "Home":
        if when == "Home":
            flowUpdateDefinition["val"]["Description"] = "Energy Optimization Home"
        else:
            flowUpdateDefinition["val"]["Description"] = "Energy Optimization WakeUp"

        flowUpdateDefinition["val"]["Nodes"][1]["Config"]["DefaultValue"]["Value"]["id"] = "home"
        flowUpdateDefinition["val"]["Nodes"][1]["Ui"]["papp"]["nodeId"] = "home"
        flowUpdateDefinition["val"]["Nodes"][1]["Label"] = "Run mode: home"

    if when == "Away":
        flowUpdateDefinition["val"]["Description"] = "Energy Optimization Work"
        flowUpdateDefinition["val"]["Nodes"][1]["Config"]["DefaultValue"]["Value"]["id"] = "away"
        flowUpdateDefinition["val"]["Nodes"][1]["Ui"]["papp"]["nodeId"] = "away"
        flowUpdateDefinition["val"]["Nodes"][1]["Label"] = "Run mode: away"

    if when == "Sleep":
        flowUpdateDefinition["val"]["Description"] = "Energy Optimization Sleep"
        flowUpdateDefinition["val"]["Nodes"][1]["Config"]["DefaultValue"]["Value"]["id"] = "sleep"
        flowUpdateDefinition["val"]["Nodes"][1]["Ui"]["papp"]["nodeId"] = "sleep"
        flowUpdateDefinition["val"]["Nodes"][1]["Label"] = "Run mode: sleep"

    flowUpdateDefinition["val"]["Id"] = when
    nameAndLabel = "Klokka %s på Mandag, Tirsdag, Onsdag, Torsdag, Fredag" % time
    flowUpdateDefinition["val"]["Name"] = "enop"
    flowUpdateDefinition["val"]["Nodes"][0]["Label"] = nameAndLabel

    time = time.split(":")
    hours = time[0]
    minutes = time[1]
    expression = minutes + " " + hours + " * * 1,2,3,4,5"
    flowUpdateDefinition["val"]["Nodes"][0]["Config"]["Expressions"][0]["Expression"] = expression
    flowUpdateDefinition["val"]["Nodes"][0]["Config"]["Expressions"][0]["Name"] = nameAndLabel

    return json.dumps(flowUpdateDefinition)


def setWake(hostname, auth, time):
    if time != "":
        print("\nSetting wake time to:", time)
        sendAutomation(hostname, auth, formatPayload("WakeUp", time))
    else:
        print("Time not given, cant set wake time")


def setAway(hostname, auth, time):
    if time != "":
        print("\nSetting away time to:", time)
        sendAutomation(hostname, auth, formatPayload("Away", time))
    else:
        print("Time not given, cant set away time")


def setHome(hostname, auth, time):
    if time != "":
        print("\nSetting home time to:", time)
        sendAutomation(hostname, auth, formatPayload("Home", time))
    else:
        print("Time not given, cant set home time")


def setSleep(hostname, auth, time):
    if time != "":
        print("\nSetting sleep time to:", time)
        sendAutomation(hostname, auth, formatPayload("Sleep", time))
    else:
        print("Time not given, cant set sleep time")


def sendAutomation(hostname, auth, payload):
    x = threading.Thread(target=automationOK, args=(hostname, 1884, auth))
    x.start()
    time.sleep(0.1)
    publish.single(topic, payload=payload, hostname=hostname, port=1884, auth=auth)
    x.join()


def automationOK(hostname, port, auth):
    try:
        print("Subscribing to topic...")
        msg = subscribe.simple("pt:j1/mt:evt/rt:app/rn:tpflow/ad:1", hostname=hostname, port=port, auth=auth)
        print("Subscribed to topic")
        time.sleep(0.1)
        print("Waiting for message...")
        try:
            newMsg = json.loads(msg.payload)
        except Exception as e:
            print("Something went wrong when trying to read message: ", e)
            return "Something went wrong when trying to read message: ", e
        if newMsg['val'] == "ok":
            print("\nAutomation updated successfully")
            return "Automation updated successfully"
        else:
            return "Something fecked"
    except Exception as e:
        print("Something went wrong when trying to get response from hub", e)
        return "Something went wrong when trying to get response from hub", e
