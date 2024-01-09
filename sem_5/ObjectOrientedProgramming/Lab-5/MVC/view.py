

class User():

    def __init__(
            self,
            id:int,
            name:str,
            age:int            
    ) -> None:
        self.id = id
        self.name = name
        self.age = age

    def isAdult(self):
        if self.age > 17:
            return True
        return False