from . import MathObject

class Dot(MathObject):
    def __init__(self, name: str = '', x: int | float = 0, y: int | float = 0, z: int | float = 0) -> None:
        super().__init__(name, x, y, z)