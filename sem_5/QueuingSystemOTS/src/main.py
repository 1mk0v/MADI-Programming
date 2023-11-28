import asyncio
import datetime
import threading
from Tools.source import Source
from Tools.delay import Delay
from Tools.queue import Queue
from System import QueuningSystem

async def main():

    queuningSystem = QueuningSystem(
        Delay(
            name="Admin",
            connectPort=8002,
            delay=0.5
        ),
        Queue(
            name="Queue",
            port=8002
        ),
        Source(
            name = "Source",
            connectPort=8002
        )
    )
    queuningSystem.run()

if __name__ == '__main__':
    asyncio.run(main())
