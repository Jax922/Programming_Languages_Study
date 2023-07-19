
import numpy as np

A = np.array([[8,-3, 2], [4, 11, -1], [6, 3, 12]])
x = np.zeros(3)
b = np.array([20, 33, 36])

# Solve Ax = b

# Method 1: Jacobi iteration
def JacobiIter(A, x, b):
    new_x = x.copy()
    n = len(A)
    for i in range(n):
        res = b[i]
        for j in range(n):
            if j != i:
                res -= A[i][j] * x[j]
        new_x[i] = res / A[i][i]
    
    for i in range(n):
        x[i] = new_x[i]

    return x

# Method 2: Gauss-Seidel iteration
def GaussSeidelIter(A, x, b):
    new_x = x.copy()
    n = len(A)
    for i in range(n):
        res = b[i]
        for j in range(n):
            if j != i:
                res -= A[i][j] * new_x[j]
        new_x[i] = res / A[i][i]
    
    for i in range(n):
        x[i] = new_x[i]
    
    return x


if __name__ == '__main__':
    print("Jacobi Iteration:")
    for i in range(20):
        x = JacobiIter(A, x, b)
        print("Iteration {}: {}".format(i + 1, x))

    print("Gauss-Seidel Iteration:")
    for i in range(20):
        x = GaussSeidelIter(A, x, b)
        print("Iteration {}: {}".format(i + 1, x))
