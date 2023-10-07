#include <iostream>

template <typename T>
void Swap(T&a, T&b)
{
    T temp = a;
    a = b;
    b = temp;
    std::cout << "Swap(T&a, T&b)" << std::endl;
}

template <>
void Swap(int&a, int&b)
{
    std::cout << "Swap(int&a, int&b)" << std::endl; 
}


int main()
{
    int a = 1, b = 2;
    Swap(a, b);

    float c = 1.0f, d = 2.0f;
    Swap(c, d);

    return 0;
}