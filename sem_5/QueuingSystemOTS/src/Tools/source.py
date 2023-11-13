from socket import socket
from functools import partial
import logging
import aiohttp
import datetime
import json

from . import BaseElement

class Source(BaseElement):
    
    def __init__(
            self,
            name: str = 'Base Element Name',
            host: str = '127.0.0.1',
            type: str = 'client',
            port: int = 8000,
            connectHost: str = '127.0.0.1',
            connectPort: int = 8000,
            intensity: float | int = 0.67) -> None:
         super().__init__( name, host, type, port, connectHost, connectPort)
         self.intensity = intensity
         self.sendedDataCount = 0
         self.datetime = datetime.datetime.utcnow()

    def getGeneratedData(self):
        self.sendedDataCount+=1
        return json.dumps({
            "id": self.sendedDataCount,

            "datetime": self.datetime.isoformat(),

            "data": f"Data of {self.sendedDataCount} ID"
        })

    def activateFunction(self, socket:socket):
        data = self.getGeneratedData()
        socket.sendall(data)
        print(f'Data sending to {socket.__dict__}')
    
    def _runClient(self):
        return super()._runClient()

    # def _runClient(self,):
    #     return super()._runClient(self.activateFunction)