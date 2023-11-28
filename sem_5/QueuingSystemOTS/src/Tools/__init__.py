import datetime
import socket


class BaseElement:
    
    usedURLs = []
    
    def __init__(
            self,
            name:str = 'Base Element Name',
            host:str = '127.0.0.1',
            type:str = 'server',
            port:int = 8000,
            connectHost:str = '127.0.0.1',
            connectPort:int = 8001,
            daemon:bool = False) -> None:
        self.name = name
        self.type = type
        self.host = host
        self.port = port
        self.connectHost = connectHost
        self.connectPort = connectPort
        options = {
            'server': self._runServer,
            'client': self._runClient
        }
        self.run = options[self.type]
        

    def _runClient(self):
        elementSocket = socket.socket()
        elementSocket.connect((self.connectHost, self.connectPort))
        elementSocket.sendall(b"Hello, world")
        data = elementSocket.recv(1024)

    def _runServer(self):
        elementSocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        elementSocket.bind((self.host , self.port))
        print(f'Server [{self.name}] start on {self.host, self.port}')
        elementSocket.listen(2)
        while True:
            conn, addr = elementSocket.accept()
            while True:
                data = conn.recv(1024)
                if not data:
                    break
                print(f"[{self.name}] Connection from {addr}")
                conn.send(data.upper())