Let $n = len(s_1), m = len(s_2)$

**Naive**

```C++
vector<int> findOccurences(string& s1, string& s2) {
	int n = s1.size(), m = s2.size();
	vector<int> occurences;
	if (n < m) {
		return occurences;
	}
	
	for (auto i = 0; i <= n - m; i++) {
		bool matched = true;
		for (auto j = i; j < i + m; j++) {
			if (s1[j] != s2[j - i]) {
				matched = false;
				break;
			}
		}
		
		if (matched) {
			occurences.push_back(i);
		}
	}
	
	return occurences;
}
```

**TC**: $O(N \cdot M)$

## The Z Algorithm 

```C++
vector<int> getZ(const string& s) {
    int n = s.size();
    std::vector<int> z(n, 0);
    int l = 0, r = 0;

    for (int i = 1; i < n; ++i) {
        // If i is inside the current box [l, r], reuse precomputed value
        if (i <= r) {
            z[i] = std::min(r - i + 1, z[i - l]);
        }

        // Try to extend the match beyond the current box
        while (i + z[i] < n && s[z[i]] == s[i + z[i]]) {
            z[i]++;
        }

        // If the new match extends past r, update the box [l, r]
        if (i + z[i] - 1 > r) {
            l = i;
            r = i + z[i] - 1;
        }
    }

    return z;
}
```