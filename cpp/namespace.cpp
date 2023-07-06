#include <iostream>
using namespace std;

namespace NA
{
    int foo() {
        cout << "this is A namespace foo function" << endl;
    }
    inline namespace NB {
        //
    }
    
} // namespace NA


namespace NA::NC {
    int foo() {
        cout << "this is C namespace foo function"<< endl;
    }
}


int main() {

    NA::foo();
    NA::NC::foo();


    return 0;
}