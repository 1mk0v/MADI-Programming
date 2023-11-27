import math
from .dot import Dot
from . import MathObject


class Vector(MathObject):

    def __init__(
            self,
            name: str = '',
            startDot: Dot = None,
            endDot: Dot = None,
            x: int | float | None = None, 
            y: int | float | None = None, 
            z: int | float | None = None) -> None:
        self.__startDot = startDot
        self.__endDot = endDot
        self.name = name
        self.x = x
        self.y = y
        self.z = z
        if (self.__startDot != None and self.__endDot != None and self.name == ''):
            self.name = self.__startDot.name + self.__endDot.name
        if (x == None or y == None or z == None):
            newDot = self.__endDot - self.__startDot
            self.x, self.y, self.z = newDot.x, newDot.y, newDot.z
        self.__length = math.sqrt(self.x**2 + self.y**2 + self.z**2)
       
    @property
    def length(self):
        return self.__length

    @length.setter
    def length(self):
        raise ValueError("You can't set length. It's private.")
    
    @length.deleter
    def length(self):
        raise Exception("You can't delete this!")
    
    def __str__(self):
        return super().__str__() + f'\n\tLength = {self.length}'