## Lazy Deletions

A nice strategy for cases in which we may want a heap to keep track of extrema but have frequent deletions and additions is combining lazy deletions with a frequency hashmap.

The below example ([239. Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/)) uses the negative trick to make Python's min-heap a max-heap:

```python
class Solution:
	def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
		result = []
		n = len(nums)
		
		freq = defaultdict(int)
		# this will be of size n in worst case 
		# worst case is when elements are in asc order
		heap = [] 
		

		# O(k)
		# initially populate heap and hashmap
		for i in range(k):
			heap.append(-nums[i])
			freq[nums[i]] += 1

		heapq.heapify(heap)

		for i in range(n - k + 1):
			window_max = -heap[0]
		
			# ignore and handle invalid maxes
			# this amortizied to O(log n) time 
			# n - k total pops at most
			while heap and freq[window_max] == 0:
				heapq.heappop(heap)
				window_max = -heap[0]
				result.append(window_max)
		
			# we lazily delete element at index i 
			freq[nums[i]] -= 1
			if i + k < n:
				# add element at index i + k to window
				# O(log n)
				heapq.heappush(heap, -nums[i + k])
				freq[nums[i + k]] += 1

	return result
```