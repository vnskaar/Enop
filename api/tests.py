import unittest

import paho as mqtt

from api import app


# Methods/routes to test
# checkConnection, getDevices, updateSchedule

# The rest of methods
# on_connect, on_disconnect, waitForResponse, sendCommand, formatPayload
# setWake, setAway, setHome, setSleep, sendAutomation, automationOK


class BasicTestCase(unittest.TestCase):
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

    def test_getDevices_wrongCredentialsCorrectAddress(self):
        print("\n--------------------------------")
        print("New test:", self, "\n")
        tester = app.test_client(self)
        args = "?hostname=192.168.2.65&user=thisis&password=wrong"
        response = tester.get('/getDevices' + args)
        self.assertEqual(response.status_code, 500)

    def test_getDevices_wrongCredentialsWrongButValidAddress(self):
        print("\n--------------------------------")
        print("New test:", self, "\n")
        tester = app.test_client(self)
        args = "?hostname=192.100.100.100&user=thisis&password=wrong"
        response = tester.get('/getDevices' + args)
        self.assertEqual(response.status_code, 500)

    def test_getDevices_wrongCredentialsWrongAndUnvalidAddress(self):
        print("\n--------------------------------")
        print("New test:", self, "\n")
        tester = app.test_client(self)
        args = "?hostname=999.100.100.100&user=thisis&password=wrong"
        response = tester.get('/getDevices' + args)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(b'Connection failed, invalid IP', response.data)


if __name__ == '__main__':
    unittest.main()
