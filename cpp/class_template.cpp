#include <iostream>

using namespace std;


template <class T>
class Stack {
  public:
    Stack();
    Stack(int size) : size(size) {
      elems = new T[size];
      top = -1;
    };
    ~Stack() {
      delete[] elems;
    };
    void push(T elem);
    T pop();
  
  private:
    T* elems;
    int size;
    int top;
};

template <class T>
Stack<T>::Stack() {
  elems = new T[10];
  size = 10;
  top = -1;
}

template <class T>
void Stack<T>::push(T elem) {
  if (top == size - 1) {
    cout << "Stack is full" << endl;
    return;
  }
  elems[++top] = elem;
}

template <class T>
T Stack<T>::pop() {
  if (top == -1) {
    cout << "Stack is empty" << endl;
    return NULL;
  }
  return elems[top--];
}










int main()
{
  Stack<int> intStack(10);
  intStack.push(1);
  intStack.push(2);
  intStack.push(3);
  cout << intStack.pop() << endl;
}
