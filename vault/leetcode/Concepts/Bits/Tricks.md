#### Getting LSB

```python
lsb = mask & -mask
```

##### Precomputing based on Bitmasks

```python
og_array = some array of length n
dp = [0] * masks
for mask in range(masks):
	lsb = mask & -mask
	i = lsb.bit_length() - 1
	dp[mask] = some relation between dp[mask ^ lsb] + og[lsb]
```
#### Getting Bit Length (Highest Set Bit)

```python
bit.bit_length() # in python
```

```cpp
unsigned bits, var = (x < 0) ? -x : x; // in cpp or anything else
for(bits = 0; var != 0; ++bits) var >>= 1;
```