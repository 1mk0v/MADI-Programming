import asyncio
import threading
from Tools import source
from Tools import BaseElement
from System import QueuningSystem

async def main():
    queuningSystem = QueuningSystem(
        BaseElement(
            name='Test element',
            port=8000
        ),
        BaseElement(
            name='Test element 2',
            port = 8080
        ),
    )
    queuningSystem.run()

if __name__ == '__main__':
    asyncio.run(main())