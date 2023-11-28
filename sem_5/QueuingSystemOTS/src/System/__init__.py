
import threading

class QueuningSystem:

    def __init__(self,*args) -> None:
        self.elementsOfSystem = args

    def run(self):
        clients = list()
        for element in self.elementsOfSystem:
            # print(element.__dict__)
            if element.type == 'server':
                thread = threading.Thread(target=element.run)
                thread.start()
            else:
                clients.append(element)
            
        for client in clients:
            thread = threading.Thread(target=client.run)
            thread.start()
    
    def start(element):
        pass