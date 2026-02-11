A recap of the three key sorting algorithms.
# 1. Quick Sort

Divide & Conquer algorithm. 

**TLDR**

Quicksort divides the input array $A$ into two sections (which can be sorted in parallel). In the worst-case, quicksort can take time $O(n^2)$ but it takes $O(n \log n)$ time in the average case and always takes $O(\log n)$ space given an optimized version with tail calls (In the code below it doesn't take $O(n)$). The worst-case happens if the array is sorted.

```python
def partition(A: List[int], pivot: int) -> List[int]:
	l = 0
	r = len(A) - 1
	while l <= r:
		while l < len(A) and A[l] < A[pivot]:
			l += 1
		while r > -1 and A[r] > A[pivot]:
			r -= 1
		if l < r:
			A[r], A[l] = A[l], A[r]
		else:
			A[l], A[pivot] = A[pivot], A[l]
	return l		

def quick_sort_subarray(A: List[int], start: int, end: int):
	if start >= end:
		return
	pivot = partition(A, len(A) - 1)
	quick_sort(A, start, pivot - 1)
	quick_sort(A, pivot + 1, end)

def quick_sort(A: List[int]):
	quick_sort_subarray(A, 0, len(A) - 1)
```
# 2. Merge Sort

**TLDR**

Always runs in $O(n \log n)$ but takes up $O(n)$ space due to the auxiliary arrays and also puts $O(\log n)$ space on the call-stack.

```python
def merge_sort(list: [int]): 
	list_length = len(list) 
	if list_length == 1: 
		return list mid_point = list_length // 2 
	left_half = merge_sort(list[:mid_point]) 
	right_half = merge_sort(list[mid_point:]) 
	return merge(left_half, right_half)

def merge(left, right): 
	output = [] 
	i = j = 0 
	while i < len(left) and j < len(right): 
		if left[i] < right[j]: 
			output.append(left[i]) 
			i +=1 
		else:
			output.append(right[j]) 
			j +=1 
	
	output.extend(left[i:]) 
	output.extend(right[j:]) 
	return output
```
# 3. Heap Sort

**TLDR**

Chuck everything into a max heap then spam heap pops.
- Good for top $k$ elements
- This is what the Linux kernel uses instead of quicksort

