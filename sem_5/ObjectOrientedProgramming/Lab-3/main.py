#!/usr/local/bin/python3

from Geometry import dot
from Geometry.coordinatesys import CoordinateSystem

def main():
    coordinateSys = CoordinateSystem()
    coordinateSys.addVector(
        name = 'AB',
        startDot=dot.Dot('A',x=-1,y=0,z=2), 
        endDot=dot.Dot("B", x=1,y=-2,z=3)
    )
    coordinateSys.addVector(
        name = 'CD',
        startDot=dot.Dot('C',x=1,y=1,z=1),
        endDot=dot.Dot("D")
    )
    print(coordinateSys.vectors)
    print(coordinateSys.dots)

if __name__ == "__main__":
    main()