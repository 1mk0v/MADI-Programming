import socket
import datetime
import time
import json
import threading
from Tools import BaseElement

class Source(BaseElement):
    
    def __init__(
            self,
            name: str = 'Source',
            host: str = '127.0.0.1',
            port: int = 8000,
            connectHost: str = '127.0.0.1',
            connectPort: int = 8000,
            intensity: float | int = 0.67) -> None:
         super().__init__(name, host, 'client', port, connectHost, connectPort)
         self.intensity = intensity
         self.sendedDataCount = 0
         self.datetime = datetime.datetime.utcnow()

    def getGeneratedData(self):
        return json.dumps({
            "id": self.sendedDataCount,
            "datetime": self.datetime.isoformat(),
            "data": f"Data of {self.sendedDataCount} ID"
        })
    

    def _runClient(self):
        elementSocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        elementSocket.connect((self.connectHost, self.connectPort))
        print(f'Client [{self.name}] polling to ({self.connectHost}, {self.connectPort})')
        try:
            while True:
                elementSocket.send(self.getGeneratedData().encode('utf-8'))
                response = elementSocket.recv(1024)
                response = response.decode("utf-8")
                print(f"[{self.name}] Received: {response}")
                time.sleep(1)
        except Exception as e:
            print(f"Error: {e}")
        finally:
            # close client socket (connection to the server)
            elementSocket.close()
            print("Connection to server closed")
        

if __name__ == "__main__":
    thread = threading.Thread(target=Source(connectPort = 8002).run)
    thread.setName("SOURCE")
    thread.start()