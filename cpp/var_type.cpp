#include <iostream>

enum  e1 : long long {
    x1,
    x2
};

void var_type_test () {
    long long x = 65536LL;
    unsigned long long y = 65536ULL;
    long long x_ = 65536;

    std::cout << "x size:" << sizeof x << ", x_ size :" << sizeof x_ << ", y size" << sizeof y << std::endl;

    std::cout << "enum e1 size:" << sizeof e1::x1 << std::endl;
    
    char16_t c1 = u'好';
    char32_t c2 = U'A';
    
    char str[] = u8"text";
    
    unsigned char c3 = 'A';

    std::cout << "str:" << str << ", c3 size :" << sizeof c3 << std::endl;

}


int main(int, char**) {
    var_type_test();

    return 0;
}