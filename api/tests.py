import unittest

import paho as mqtt

from api import app


# Methods/routes to test
# checkConnection, getDevices, updateSchedule

# The rest of methods
# on_connect, on_disconnect, waitForResponse, sendCommand, formatPayload
# setWake, setAway, setHome, setSleep, sendAutomation, automationOK

# DOING
#

# DONE
# getDevices, checkConnection, updateSchedule

class FlaskTestCases(unittest.TestCase):
    def test_connection_to_flask(self):
        print("\n--------------------------------")
        print("New test:", self, "\n")
        tester = app.test_client(self)
        response = tester.get('/checkConnection')
        self.assertEqual(response.status_code, 200)

    def test_wrongPath(self):
        print("\n--------------------------------")
        print("New test:", self, "\n")
        tester = app.test_client(self)
        response = tester.get('/a')
        self.assertEqual(response.status_code, 404)

    def test_checkConnection_correctCredentials(self):
        print("\n--------------------------------")
        print("New test:", self, "\n")
        tester = app.test_client(self)
        args = "?hostname=192.168.2.65&user=jesper&password=jesper"
        response = tester.get('/checkConnection' + args)
        self.assertEqual(response.status_code, 200)
        assert (b'"Status":"Connection successful!"' in response.data)

    def test_checkConnection_wrongCredentials(self):
        print("\n--------------------------------")
        print("New test:", self, "\n")
        tester = app.test_client(self)
        args = "?hostname=192.168.2.65&user=thisis&password=wrong"
        response = tester.get('/checkConnection' + args)
        self.assertEqual(response.status_code, 200)
        assert (b'"Status":"Connection failed!"' in response.data)

    def test_checkConnection_wrongIP(self):
        print("\n--------------------------------")
        print("New test:", self, "\n")
        tester = app.test_client(self)
        args = "?hostname=192.100.100.100&user=thisis&password=wrong"
        response = tester.get('/checkConnection' + args)
        self.assertEqual(response.status_code, 200)
        assert (b'"Status":"Connection failed with error:' in response.data)

    def test_checkConnection_invalidIP(self):
        print("\n--------------------------------")
        print("New test:", self, "\n")
        tester = app.test_client(self)
        args = "?hostname=999.100.100.100&user=thisis&password=wrong"
        response = tester.get('/checkConnection' + args)
        self.assertEqual(response.status_code, 200)
        assert (b'"Status":"Connection failed with error:' in response.data)

    def test_checkConnection_sensor(self):
        print("\n--------------------------------")
        print("New test:", self, "\n")
        tester = app.test_client(self)
        args = "?hostname=&user=demo&password=demo"
        response = tester.get('/checkConnection' + args)
        self.assertEqual(response.status_code, 200)
        assert (b'"Status":"Connection bypassed. Welcome!"' in response.data)

    def test_checkConnection_sensorWithIP(self):
        print("\n--------------------------------")
        print("New test:", self, "\n")
        tester = app.test_client(self)
        args = "?hostname=192.168.2.65&user=demo&password=demo"
        response = tester.get('/checkConnection' + args)
        self.assertEqual(response.status_code, 200)
        assert (b'"Status":"Connection failed!"' in response.data)

    def test_getDevices_connection(self):
        print("\n--------------------------------")
        print("New test:", self, "\n")
        tester = app.test_client(self)
        response = tester.get('/getDevices')
        self.assertEqual(response.status_code, 200)

    def test_getDevices_correctCredentials(self):
        print("\n--------------------------------")
        print("New test:", self, "\n")
        tester = app.test_client(self)
        args = "?hostname=192.168.2.65&user=jesper&password=jesper"
        response = tester.get('/getDevices' + args)
        self.assertEqual(response.status_code, 200)
        assert (b'Devices' in response.data)

    def test_getDevices_noCredentials(self):
        print("\n--------------------------------")
        print("New test:", self, "\n")
        tester = app.test_client(self)
        response = tester.get('/getDevices')
        self.assertEqual(response.status_code, 200)
        assert (b'You did not supply either hostname, username or password' in response.data)

    def test_getDevices_wrongCredentials_correctAddress(self):
        print("\n--------------------------------")
        print("New test:", self, "\n")
        tester = app.test_client(self)
        args = "?hostname=192.168.2.65&user=thisis&password=wrong"
        response = tester.get('/getDevices' + args)
        self.assertEqual(response.status_code, 500)

    def test_getDevices_wrongCredentials_wrongButValidAddress(self):
        print("\n--------------------------------")
        print("New test:", self, "\n")
        tester = app.test_client(self)
        args = "?hostname=192.100.100.100&user=thisis&password=wrong"
        response = tester.get('/getDevices' + args)
        self.assertEqual(response.status_code, 500)

    def test_getDevices_wrongCredentials_InvalidAddress(self):
        print("\n--------------------------------")
        print("New test:", self, "\n")
        tester = app.test_client(self)
        args = "?hostname=999.100.100.100&user=thisis&password=wrong"
        response = tester.get('/getDevices' + args)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(b'Connection failed, invalid IP', response.data)

    def test_updateSchedule_correctCredentials_allSchedulesFilled(self):
        print("\n--------------------------------")
        print("New test:", self, "\n")
        tester = app.test_client(self)
        args = "?hostname=192.168.2.65&user=jesper&password=jesper&up=07:00&leave=09:00&home=16:00&sleep=23:30"
        response = tester.get('/updateSchedule' + args)
        self.assertEqual(response.status_code, 200)
        assert (b'"Status":"Automations sent successfully for: wake, away, home, sleep"' in response.data)

    def test_updateSchedule_correctCredentials_noSchedulesFilled(self):
        print("\n--------------------------------")
        print("New test:", self, "\n")
        tester = app.test_client(self)
        args = "?hostname=192.168.2.65&user=jesper&password=jesper&up=&leave=&home=&sleep="
        response = tester.get('/updateSchedule' + args)
        self.assertEqual(response.status_code, 200)
        assert (b'"Status":"No timeschedules given"' in response.data)

    def test_updateSchedule_correctCredentials_oneScheduleFilled(self):
        print("\n--------------------------------")
        print("New test:", self, "\n")
        tester = app.test_client(self)
        args = "?hostname=192.168.2.65&user=jesper&password=jesper&up=&leave=&home=16:00&sleep="
        response = tester.get('/updateSchedule' + args)
        self.assertEqual(response.status_code, 200)
        assert (b'"Status":"Automations sent successfully for: home"' in response.data)


if __name__ == '__main__':
    unittest.main()
