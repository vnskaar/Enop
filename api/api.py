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


newFlow = {
        "serv": "tpflow",
        "type": "cmd.flow.update_definition",
        "val_t": "object",
        "val": {
            "Description": "Run mode: away ",
            "Group": "timer",
            "Name": "enop optimization",
            "Nodes": [
                {
                    "Service": "tpflow",
                    "Label": "Klokka 11:00 i ukedagene",
                    "Type": "time_trigger",
                    "Config": {
                        "Expressions": [
                            {
                                "Expression": "0 08 * * 0,1,5,6", # 0=Søndag -> 6=Lørdag
                                "Name": "Klokka 11:00 i ukedagene"
                            }
                        ], # Hvis denne fjernes så kan man ikke endre tidspunkt for automasjonen i FH-app
                        "GenerateAstroTimeEvents": False,
                        "Latitude": 59.9322791,
                        "Longitude": 10.7720139,
                        "SunriseTimeOffset": None,
                        "SunsetTimeOffset": None
                    },
                    "Ui": { # Hvis UI fjernes, så kan ikke automasjonen redigeres i FH-app
                        "papp": {
                            "nodeName": "time",
                            "nodeId": None,
                            "nodeType": "Timer"
                        }
                    },
                    "IsVariableGlobal": None
                },
                {
                    "Address": "pt:j1/mt:cmd/rt:app/rn:vinculum/ad:1",
                    "Id": "74",
                    "ErrorTransition": None,
                    "Service": "vinculum",
                    "Label": "Run mode: away",
                    "ServiceInterface": "cmd.pd7.request",
                    "SuccessTransition": None,
                    "TimeoutTransition": None,
                    "Type": "action",
                    "Config": {
                        "DefaultValue": {
                            "Value": {
                                "cmd": "set",
                                "component": "mode",
                                "id": "away",
                                "param": {},
                                "requestId": 25
                            },
                            "ValueType": "object"
                        },
                        "ResponseToTopic": "pt:j1/mt:rsp/rt:app/rn:tpflow/ad:1"
                    },
                    "Ui": { # Hvis denne fjernes kan man ikke få opp noe info om automasjonen i FH-app
                        "papp": {
                            "nodeName": "modes",
                            "nodeId": "away",
                            "nodeType": None
                        }
                    },
                    "IsVariableGlobal": None
                }
            ]
        },
        "props": None,
        "tags": None,
        "src": "app",
        "ver": "1"
}

getRegistryDevices = json.dumps(registryDevices)
getRegistryDevices = json.dumps(newFlow)

"""
hostname = "wronk"
port = "wronk"
user = "wronk"
password = "wronk"
auth = {}
"""


@app.route('/checkConnection')
def checkConnection():
    hostname = request.args.get('hostname')
    port = 1884
    user = request.args.get('user')
    password = request.args.get('password')

    auth = {
        "username": user,
        "password": password
    }

    print(f'Trying to establish connection with %s on port %s as user %s' % (hostname, port, user))

    try:
        sendCommand(hostname, port, auth)

        response = {
            "Status": "Connection established!"
        }
        print(response)
    except Exception as e:
        print("Connection failed, errormessage:", e)

        response = {
            "Status": "Connection failed"
        }
        print(response)

    return (response)


def waitForResponse(hostname, port, auth):
    nrDevices = 0
    devices = []
    port = int(port)
    msg = ""
    newMsg = ""

    try:
        print("Subscribing to topic...")
        #msg = subscribe.simple("pt:j1/mt:rsp/rt:app/rn:enop/ad:1", hostname=hostname, port=port, auth=auth)
        msg = subscribe.simple("pt:j1/mt:evt/rt:app/rn:tpflow/ad:1", hostname=hostname, port=port, auth=auth)
        print("Subscribed to topic")
        time.sleep(0.1)
        print("Waiting for message...")
        newMsg = json.loads(msg.payload)
        print("\n--==MESSAGE==--")
        for val in newMsg["val"]:
            nrDevices += 1
            devices.append(val.get('alias'))

        print("\nNumber of devices:", nrDevices)
        print("Devices connected to the hub:", devices, "\n")
    except Exception as e:
        print("Somethings went wrong, errormessage:", e)
        return ("Somethings went wrong, errormessage:", e)
    pass


def sendCommand(hostname, port, auth):
    x = threading.Thread(target=waitForResponse, args=(hostname, port, auth))
    x.start()
    time.sleep(0.1)
    publish.single(topic, payload=getRegistryDevices, hostname=hostname, port=1884, auth=auth)
    x.join()
    pass
