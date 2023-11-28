
class Queue(BaseElement):

    def __init__(
            self,
            name:str = 'SourceName',
            host:str = '127.0.0.1',
            port: int = 8000,
            connectHost: str = '127.0.0.1',
            connectPort: int = 8001,
            maxLength:int = 16) -> None:
        super().__init__(name, host, 'server', port, connectHost, connectPort)
        self.maxLength = maxLength
        self.storage = list()


    def __str__(self) -> str:
        return self.storage.__str__()

    def getLast(self):
        if len(self.storage) < 1:
            return ''
        return self.storage.pop()

    def add(self, data):
        if len(self.storage) + 1 > self.maxLength:
            raise BufferError()
        self.storage.append(data)
    

    def handle_client(self, client_socket:socket.socket, addr):
        try:
            while True:
                request = client_socket.recv(1024).decode("utf-8")
                if request.lower() != "get/lastqueue":
                    client_socket.send("closed".encode("utf-8"))
                    break
                print(f"[{self.name}] Received: {request}")
                client_socket.send("accepted".encode("utf-8"))
        except Exception as e:
            print(f"Error when hanlding client: {e}")
        finally:
            client_socket.close()
            print(f"Connection to client ({addr[0]}:{addr[1]}) closed")

    def _runServer(self):
        try:
            elementSocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            elementSocket.bind((self.host , self.port))
            elementSocket.listen(2)
            print(f'Server [{self.name}] listen on {self.host, self.port}')
            while True:
                client_socket, addr = elementSocket.accept()
                print(f"[{self.name}] Accepted connection from {addr[0]}:{addr[1]}")
                thread = threading.Thread(target=self.handle_client, args=(client_socket, addr,))
                thread.start()
        except Exception as e:
            print(f"Error: {e}")
        finally:
            elementSocket.close()


if __name__ == "__main__":
    thread = threading.Thread(target=Queue(port=8002).run)
    thread.setName("QUEUE")
    thread.start()