#!/usr/local/bin/python3

from Geometry import vector, dot


def main():
    vector1 = vector.Vector('AB', startDot=dot.Dot('A',x=-1,y=0,z=2), endDot=dot.Dot("B", x=1,y=-2,z=3))
    print("INIT", vector1.__repr__())
    vector2 = vector.Vector('CD', startDot=dot.Dot('C',x=1,y=1,z=1), endDot=dot.Dot("D"))
    print("INIT", vector2.__repr__())
    vector3 = vector1 + vector2
    vector3.name = 'AD'
    print(f"{vector1.__repr__()} + {vector2.__repr__()} = {vector3.__repr__()}")
    vector4 = vector1 - vector2
    vector4.name = "TY"
    print(f"{vector1.__repr__()} - {vector2.__repr__()} = {vector4.__repr__()}")
    vector5 = vector3 * 4
    vector5.name = 'AD5'
    print(f"{vector3.__repr__()} * 4 = {vector5.__repr__()}")

    print(vector1)
    print(vector2)
    print(vector3)
    print(vector4)
    print(vector5)

if __name__ == "__main__":
    main()