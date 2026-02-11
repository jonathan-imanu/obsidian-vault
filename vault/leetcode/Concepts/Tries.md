Also called a **Prefix Tree** is a data structure used efficiently store and retrieve keys in a dataset of strings. 

```python
class Node:
	def __init__(self):
		self.children = {}
		self.is_end_of_word = False

class Trie:
	def __init__(self):
		self.root = Node()
```


