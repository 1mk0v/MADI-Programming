from . import BaseElement
import socket
import time
import threading 

class Delay(BaseElement):

    def __init__(
        self,
        name: str = 'Delay',
        host: str = '127.0.0.1',
        port: int = 8000,
        connectHost: str = '127.0.0.1',
        connectPort: int = 8001,
        delay:int = 0,
    ) -> None:
        super().__init__(name, host, 'client', port, connectHost, connectPort)
        self.delay = delay
        self.myCount = 0

    def _runClient(self):
        elementSocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        elementSocket.connect((self.connectHost, self.connectPort))
        print(f'Client [{self.name}] polling to ({self.connectHost}, {self.connectPort})')
        try:
            while True:
                elementSocket.send("lastqueue".encode('utf-8'))
                response = elementSocket.recv(1024)
                response = response.decode("utf-8")
                time.sleep(1)
                print(f"[{self.name}] Received: {response}")
        except Exception as e:
            print(f"Error: {e}")
        finally:
            # close client socket (connection to the server)
            elementSocket.close()
            print("Connection to server closed")


if __name__ == "__main__":
    thread = threading.Thread(target=Delay(connectPort = 8002).run)
    thread.setName("DELAY")
    thread.start()