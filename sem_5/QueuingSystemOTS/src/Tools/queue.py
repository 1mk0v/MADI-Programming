from . import BaseElement

class Queue(BaseElement):

    def __init__(
            self,
            name:str = 'SourceName',
            host:str = '127.0.0.1',
            port: int = 8000,
            sentHost: str = '127.0.0.1',
            sentPort: int = 8001,
            maxLength:int = 16) -> None:
        super().__init__(name, host, port, sentHost, sentPort)
        self.maxLength = maxLength
        self.storage = list()

    def __str__(self) -> str:
        return self.storage.__str__()

    def getLast(self):
        return self.storage.pop()

    def add(self, data):
        if len(self.storage) + 1 > self.maxLength:
            raise BufferError('Queue is full')
        self.storage.append(data)
        