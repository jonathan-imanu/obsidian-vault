
### Why?

Find cycles in Linked Lists in `O(1)` space and `O(n)` space.
##### Brute Force

The Brute Force or naive version of a cycle detection algorithm would take `O(n)` space. It uses that auxiliary space to keep track of the elements we have seen before
### Algorithm

We have two pointers, a fast pointer and a slow pointer. The fast pointer will move by two and the slow pointer will move by one each time.
- This algorithm is called the *Tortoise and Hare* algorithm because of these pointers

Here's how the algorithm works:

1. If there isn't a cycle, fast will reach the end of the list.
2. If there is a cycle, fast and slow will meet BUT this meeting isn't necessarily at the entry-point. 
3. To find the entry-point, move slow back to the start. Move both fast and slow by one until they meet again. It is this meeting spot that is the entry-point of the cycle.
#### Proof

Suppose we have a Linked List with a cycle.

We can subdivide this Linked List into three distinct pieces:
1. $X$: the part before the cycle
2. $Y$: the part before the meeting point
3. $Z$: the part after the meeting point

We can see that the length of the cycle is $L = Y + Z$

Then the distance traversed (call it $f$) by the fast pointer is:
- $f = X + c_1L + Y$ where $c_1$ is some constant
	- This is saying the fast pointer travelled the part before the cycle, went through the cycle some number of times and travelled the part before the meeting point
Similarly the distance travelled by the slow pointer is:
- $s = X + c_2L + Y$ where is $c_2$ is some OTHER constant 

Since fast is twice as fast as slow, it must be the case that $f = 2s$. 
If we sub-in and simplify, we get:
- $x = (c_1 - 2c_2)l - y$
	- It gets tricky after this part. 
- $x = (c_1 -2x_2 - 1)l + l - y$
- $x = c_3l + l - y$
	- Remember $l = x + y$
- $x = c_3 + y + z - y$
- $x = c_3l + z$