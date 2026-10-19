In a program, **dynamic allocations** are done for data structures that could grow or shrink in size and are done on the Heap.
- **Static allocations** (aka Stack allocations): Are for data structures of a fixed size and are done by the compiler.

Recall the two main operations associated with heap allocation:

 1. `malloc(size)`: returns a pointer to a contiguous block of memory at least `size` bytes or `NULL`
2. `free(ptr)`: releases the previously-allocated block corresponding to `ptr`

Not every `malloc(size)` results in a system call to allocate more heap space. 
- `glibc` (the user-level library) requests larger memory chunks and only uses the system call when running low on space
- `glibc` is what decides how subdivide and reuse this memory
# The Heap Memory Allocation Problem

**This is a hard problem because `free`'s cause external fragmentation**. 

Fragmentation is really just an inability to use free memory that's caused by objects having different lifetimes and sizes.

It is the goal of a memory allocator to track which parts of memory are in use and which parts are free with no wasted space and time overhead. A good memory allocator minimizes fragmentation and avoids compaction.
- *It's theoretically impossible to solve fragmentation.*

**Compaction**: Moving allocated blocks in memory so that all free space is merged into one large contiguous block.
- Time consuming!
## Tracking Memory Allocation

Two main approaches: Bitmaps and Lists.

1. Bitmaps use less space but require sequential scans to find an N-unit chunk.
2. Free lists have higher space overhead since they use pointers but are faster for allocation.
### Bitmap

Has 1 bit per allocation unit. 
- To allocate a N-unit chunk we scan the bitmap for a sequence of N zero's
### Lists

#### Free Lists

A linked list of allocated and free segments
#### Implicit List

Each block has a header that records size and status. Searching for a free block is then `O(N)` where `N` is the number of blocks.
#### Explicit List

Store pointers in free blocks to create doubly-linked list. 


![[Explicit List.png]]

## Placement Algorithms

### First-Fit

Choose the first block that is large enough. The search can start at the beginning or where the previous search ended. 

Uses a free list sorted by either LIFO, FIFO or address.
### Best-Fit

Choose the block closest in size to the request. Minimize fragmentation by allocating space that leaves the smallest fragment.

**Data Structure**: The heap which is a list of free blocks each having a header holding the block size and a pointer to the next free block.
### Buddy Allocation

Round up allocations to power of 2 to make management faster.

**Data Structure**: Have $n$ free lists of blocks of size $2^i \text{ for } 0 = 1 \ldots n$ 

**Allocation Steps**:
0. Suppose we have a request to allocate 14 bytes of memory
1. Round up to the nearest power of 2, so we need to allocate 16 bytes of memory
2. Check the free list to see if a block of size 16 is available, if yes we are done.
3. Otherwise, check the higher powers of 2 (32, 64, ...) until we find a block that is available. 
4. Once we find a free block, we recursively divide it into 2 until we have have reached the desired size
	1. Only one half continues to get split here
	2. The other half is added to the free list
5. Now we have a suitable block!

**Free Steps**:
0. Suppose we need to free a block of size 32
1. We find the buddy of this block using xor.
2. If the buddy is free, insert the block to free list.
3. Otherwise, coalesce the blocks and repeatedly apply this find merge process
### Summary

Buddy allocation has fastest search, merge and avoids external fragmentation for requests of $2^n$.
- Used by Linux and FreeBSD

Best Fit vs First Fit
- First Fit is just better both in terms of speed and storage utilization but leaves many small fragments near the start of memory that have to be repeatably searched.
- Best fit can leave small fragments of memory behind that become unusable. 


