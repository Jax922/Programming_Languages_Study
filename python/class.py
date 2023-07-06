
class Dog:

    # class attribute
    species = "Canis"

    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def __str__(self) -> str:
        return f"{self.name} is {self.age} years old."
    
if __name__ == "__main__":
    miles = Dog("Miles", 4)
    print(miles)





