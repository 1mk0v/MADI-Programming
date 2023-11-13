import datetime
import socket


class BaseElement:
    
    usedURLs = []
    
    def __init__(
            self,
            name:str = 'Base Element Name',
            host:str = '127.0.0.1',
            port:int = 8000,
            connectHost:str = '127.0.0.1',
            connectPort:int = 8001) -> None:
        self.name = name
        self.host = host
        self.port = port
        self.connectHost = connectHost
        self.connectPort = connectPort

    def runClient(self):
        pass

    def runServer(self):
        elementSocket = socket.socket()
        elementSocket.bind((self.host , self.port))
        print(f'Server [{self.name}] start on {self.host, self.port}')
        while True:
            elementSocket.listen(1)
            conn, addr = elementSocket.accept()
            print(f"[{self.name}] Connection from {addr}")
            while True:
                data = conn.recv(1024)
                if not data:
                    break
                conn.send(data.upper())
        