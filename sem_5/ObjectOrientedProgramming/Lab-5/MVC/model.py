class Database():

    def __init__(self) -> None:
        self.store = dict()

    def get(self):
        return self.store

    def add(self, value):
        index = 0
        if self.store != {}:
            index = list(self.store.keys())[-1] + 1
        self.store[index] = value
        return value

    def delete(self, index):
        deleted = self.store[index]
        del self.store[index]
        return deleted