from Geometry import dot

def main():
    dot1 = dot.Dot('A')
    dot2 = dot.Dot('B', 0, 1)
    dot3 = dot1 + dot2
    dot3.name = 'C'
    dot4 = dot2 * 4
    dot4.name = 'D'
    print(dot1,'\n', dot2,'\n', dot3,'\n', dot4)


if __name__ == "__main__":
    main()