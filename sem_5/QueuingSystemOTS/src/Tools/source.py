import logging
import aiohttp
import datetime
import json

from . import BaseElement

class Source(BaseElement):
    
    def __init__(
            self,
            name: str = 'SourceName',
            host: str = '127.0.0.1',
            port: int = 8000,
            sentHost: str = '127.0.0.1',
            sentPort: int = 8001,
            intensity: float | int = 0.67) -> None:
        super().__init__(name,host,port,sentHost,sentPort)
        self.intensity = intensity
        self.sendedDataCount = 0

    def getGeneratedData(self):
        self.sendedDataCount+=1
        return json.dumps({
            "id": self.sendedDataCount,
            "datetime": self.datetime.__str__(),
            "data": f"Data of {self.sendedDataCount} ID"
        })
    
    async def start(self):
        async with aiohttp.ClientSession() as session:
            while 1:
                # response = await session.post(
                #     url=self.urlToSent,

                #     data=self.getGeneratedData(),

                #     headers={"Content-Type": "application/json"}
                # )
                # logging.info(await response.json())
                logging.info(msg=self.getLogging(self.getGeneratedData()))
                # time.sleep(1)