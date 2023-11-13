import threading

class QueuningSystem:

    def __init__(self,*args) -> None:
        self.elementsOfSystem = args

    def run(self):
        for element in self.elementsOfSystem:
            thread = threading.Thread(target=element.runServer)
            thread.start()