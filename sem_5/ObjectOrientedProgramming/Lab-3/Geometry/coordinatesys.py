from .dot import Dot
from .vector import Vector

class CoordinateSystem:

    __instance = None

    def __new__(cls, *args, **kwargs):
        if cls.__instance is None:
            cls.__instance = super().__new__(cls)
        else:
            raise Exception('This class is already using')
        return cls.__instance
    
    def __init__(self) -> None:
        self.dots = list()
        self.vectors = list()

    def addDot(self, dot:Dot = None, name = None, x= None, y= None, z= None):
        if dot != None:
            dot.name = name if name != None else dot.name
            dot.x = x if x != None else dot.x
            dot.x = y if y != None else dot.y
            dot.x = z if z != None else dot.z
        self.dots.append(dot)
        return dot
    
    def addVector(self, vector:Vector = None, name = None, 
                  startDot:Dot = None,
                  endDot:Dot = None,
                  x = None, y = None, z = None):
        if vector != None:
            vector.name = name if name != None else vector.name
            vector.x = x if x != None else vector.x
            vector.x = y if y != None else vector.y
            vector.x = z if z != None else vector.z
        elif startDot != None and endDot != None:
            print(startDot, endDot)
            vector = Vector(name, startDot, endDot)
            self.addDot(startDot)
            self.addDot(endDot)
        else:
            exit()
        self.vectors.append(vector)
        return vector