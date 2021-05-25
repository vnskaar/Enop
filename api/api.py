import time
from flask import Flask
from flask import request
import json
import threading
import socket

import paho.mqtt.publish as publish
import paho.mqtt.subscribe as subscribe
import paho.mqtt.client as mqtt

app = Flask(__name__)

# Topic for sending/receiving messages on the mqtt broker/smart hub
topic = "pt:j1/mt:cmd/rt:app/rn:tpflow/ad:1"

# json-file which is stored and later manipulated to send correct automations
jsonFile = open('flowUpdate.json')
flowUpdateDefinition = json.load(jsonFile)
jsonFile.close()

# json snippet that is used to get the devices connected to the mqtt broker/smart hub
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


# Checks if the IP given is a valid one, using socket.inet_aton
def checkIP(ip):
    try:
        socket.inet_aton(ip)
        return True
    except socket.error:
        return False


# standard callbacks used for the mqtt client connection
def on_connect(client, userdata, flags, rc):
    global flag_connected
    flag_connected = 1
    return "Connection success!"


def on_disconnect(client, userdata, rc):
    global flag_connected
    flag_connected = 0
    return "Connection disconnected"


# Method for checking the connection the the smart hub
@app.route('/checkConnection')
def checkConnection():
    # Takes inn arguments and uses these for checking connection
    hostname = request.args.get('hostname')
    port = 1884
    user = request.args.get('user')
    password = request.args.get('password')

    # Gives the option to bypass the need of smart hub by logging in as demo
    if user == "demo" and password == "demo" and hostname == "":
        return {"Status": "Connection bypassed. Welcome!"}

    # Checks if the hostname aka IP is a valid IP-address
    if hostname:
        if checkIP(hostname):
            pass
    else:
        return {"Status": "Connection failed! Hub address has to be valid"}

    # Giving the correct credentials and setting up the mqtt connection
    client = mqtt.Client()
    client.on_connect = on_connect
    client.on_disconnect = on_disconnect
    client.username_pw_set(user, password=password)

    # Trying to connect to the mqtt broker/smart hub
    try:
        client.connect(hostname, port)
    except Exception as e:
        print("Connection failed with error:", e)
        response = "Connection failed with error: " + str(e)
        return {"Status": response}

    client.loop_start()
    time.sleep(0.1)

    # Depending on if the connection is up and running or failed
    # returns the correct status
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


# This method needs to be ran as a new thread because its a blocking method
# Subscribes to a mqtt broker topic and waits for a message
# Writes this message to file and to devices list
def waitForResponse(hostname, port, auth):
    nrDevices = 0
    port = int(port)
    msg = ""
    newMsg = ""

    # Tries to subscribe to the topic with the given username and password
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

        # Tries to open and write the message received to file named deviceList.json
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


# Get the devices by sending a mqtt message, waiting for the response with waitForResponse
# Runs the waitForResponse as a new thread, which updates the device array with the
# devices given from the mqtt broker, then returns this
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


# Sends the time schedules given in the wizard to the smarthub for automations
# Calls the respective methods for each of the times, gets true/false back
# then updates timeSchedules list accordingly, which removes the times that
# are not given, then returns message about which times have been updated
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
    timeSchedules = ["wake", "away", "home", "sleep"]

    if not setWake(hostname, auth, up):
        timeSchedules.remove("wake")
    if not setAway(hostname, auth, leave):
        timeSchedules.remove("away")
    if not setHome(hostname, auth, home):
        timeSchedules.remove("home")
    if not setSleep(hostname, auth, sleep):
        timeSchedules.remove("sleep")

    if len(timeSchedules) > 0:
        out = "Automations sent successfully for: "
        out += ', '.join([str(t) for t in timeSchedules])
        return {"Status": out}

    if len(timeSchedules) == 0:
        return {"Status": "No timeschedules given"}


# Formats the message that is going to be sent to the mqtt broker/smart hub
# Its a huge json file stored as flowUpdate.json, which is manipulated and changed based
# on the time and which time schedule given
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


# These methods sets the time if there is give one, then calls sendAutomation with the
# correct credentials and a formatted json file with the formatPayload method
# returns True/False based on if time is given or not
def setWake(hostname, auth, time):
    if time != "":
        print("\nSetting wake time to:", time)
        sendAutomation(hostname, auth, formatPayload("WakeUp", time))
        return True
    else:
        print("Time not given, cant set wake time")
        return False


def setAway(hostname, auth, time):
    if time != "":
        print("\nSetting away time to:", time)
        sendAutomation(hostname, auth, formatPayload("Away", time))
        return True
    else:
        print("Time not given, cant set away time")
        return False


def setHome(hostname, auth, time):
    if time != "":
        print("\nSetting home time to:", time)
        sendAutomation(hostname, auth, formatPayload("Home", time))
        return True
    else:
        print("Time not given, cant set home time")
        return False


def setSleep(hostname, auth, time):
    if time != "":
        print("\nSetting sleep time to:", time)
        sendAutomation(hostname, auth, formatPayload("Sleep", time))
        return True
    else:
        print("Time not given, cant set sleep time")
        return False


# Sends the automation message to the mqtt broker/smart hub
def sendAutomation(hostname, auth, payload):
    x = threading.Thread(target=automationOK, args=(hostname, 1884, auth))
    x.start()
    time.sleep(0.1)
    publish.single(topic, payload=payload, hostname=hostname, port=1884, auth=auth)
    x.join()


# Subscribes to the correct topic on the mqtt broker/smart hub
# Waits for OK response from the automations message
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
            return "Something went wrong when trying to send automations"
    except Exception as e:
        print("Something went wrong when trying to get response from hub", e)
        return "Something went wrong when trying to get response from hub", e
