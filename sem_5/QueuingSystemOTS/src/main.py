import asyncio
import datetime
from Tools import source
from Tools import BaseElement
from System import QueuningSystem

async def main():
    # date = datetime.datetime.utcnow().isoformat()
    # print(date)
    queuningSystem = QueuningSystem(
        BaseElement(
            name='Test element 2',
            port = 8000,
        ),
        BaseElement(
            type='client',
            connectPort=8000
        )
    )
    queuningSystem.run()

if __name__ == '__main__':
    asyncio.run(main())