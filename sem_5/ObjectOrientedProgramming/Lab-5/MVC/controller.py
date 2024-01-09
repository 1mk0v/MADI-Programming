from .model import Database
from .view import User

class UserManager():
    
    def __init__(
        self,
        store:Database,
        view:User
    ) -> None:
        self.store = store
        self.view = view

    def get_all(self):
        store = list()
        objects = self.store.get()
        for key in objects:
            store.append(self.view(id = key, name= objects[key]['name'], age=objects[key]['age']))
        return store
    
    def add(self, name:str, age:int):
        self.store.add({"name":name, "age":age})
        print(f'Add "name":{name}, "age":{age}')
 
    def delete(self, id:int):
        self.store.delete(id)
        print(f'Delete {id} element')