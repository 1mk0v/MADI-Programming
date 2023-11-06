class MathObject:

    def __init__(
            self,
            name:str = '',
            x: int | float = 0,
            y: int | float = 0,
            z: int | float = 0) -> None:
        self.name = name
        self.x = x
        self.y = y
        self.z = z

    def __repr__(self):
        return f'{self.__class__.__name__}(name={self.name}, x={self.x}, y={self.y},z={self.z})'
    
    def __add__(self, object):
        if type(object) != type(self):
            raise Exception(f"You must use type({self.__class__} with operator '+'")
        return self.__class__(
            x=self.x+object.x,
            y=self.y+object.y,
            z=self.z+object.z
        )

    def __sub__(self, object):
        if type(object) != type(self):
            raise Exception(f"You must use type({self.__class__}) with operator '-'")
        return self.__class__(
            x=self.x-object.x,
            y=self.y-object.y,
            z=self.z-object.z
        )
    
    def __mul__(self, num:int | float):
        if type(num) != int and type(num) != float:
            raise Exception("You must use int or float with operator '*'")
        return self.__class__(
            x=self.x*num,
            y=self.y*num,
            z=self.z*num
        )