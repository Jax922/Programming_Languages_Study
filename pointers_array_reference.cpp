int main() {
	char cs[6];
	char* p1;

	char* p2 = &cs[4];

	int v[] = { 1,2,3,4,5 };
	for (auto& x : v)
	{
		++x;
	}


	// null pointer
	double* pd = nullptr;
	int* x = nullptr;
	if (pd == nullptr)
	{
		// do something
	}




	return 0;
}