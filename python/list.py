squares = []
for x in range(10):
    squares.append(x**2)

from collections import deque
queue = deque(squares)
queue.append(100)
queue.appendleft(1)

