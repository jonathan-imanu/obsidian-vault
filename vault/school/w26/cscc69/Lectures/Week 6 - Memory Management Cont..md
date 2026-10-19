# Page Replacement Algorithms

Page replacement algorithms answer which page to evict from memory. The goal of such algorithms is to minimize page faults because going to disk is slow.

Bad page replacement algorithms or *not having enough physical memory for all processes* can cause **thrashing**.

**Thrashing / Overcommitted System**: When the OS spends most of the time in paging data back and forth from disk.
## FIFO

Evict the oldest page in the system.
## Belady's Anomaly and Algorithm

It's counterintuitive but having more physical memory (more PFNs so less pages going to disk) **does not mean we have fewer page faults!**
- FIFO is an example of an algorithm that suffers from Beladys
### Belady's Algorithm

Suppose we have an oracle that can tell us the future access date of a page. Belady's algorithm uses this oracle to have an algorithm that replaces the page whose access is the furthest in the future.
- **It's proven to be the optimal page replacement algorithm**
- *Purely theoretical and serves as a benchmark for other page replacement algorithms*
## LRU

Memory usage patterns have locality.
- Locality: For pages, this means that pages that have been used recently are more likely to have been used again

Implementing LRU is tricky. Using a direct timer value or maintaining a DS of pages is very expensive, so we approximate it.
### Algorithm

*Requires hardware support in the form of a use bit*. Hardware sets this bit whenever a page is referenced.

**Idea**: Do binary tracking of whether a page has been used recently or not based on the use bit.

**Data Structures**:
1. All pages of the system arranged in a circular list
2. A clock hand that points to some page

When we must evict a page the OS:

```
while page_list[clock_hand].use_bit == 1:
	page_list[clock_hand].use_bit = 0
swap page_list[clock_hand]
clock_hand += 1
```
## Random Eviction

Simplest and has no worst-case workloads. It avoids Belady's anomaly.
# Fixed vs. Variable Space Algorithms

## Fixed Space

- Each process is given a limit of pages it can use
- When it reaches the it replaces from it's own pages
	- This is **local replacement**
## Variable Space Algorithms

*Used by modern systems*

- Process' set of pages grows and shrinks dynamically
	- The replacement of pages is often follows **global replacement**. If process A needs more pages, we could drop evict a page used by process B.
# Working Set Model 

A process specific model for the dynamic locality of it's memory usage

WS(t,w) = {pages P | P was referenced in the time interval (t, t - w)}
- t is time
- w is working set window

A page is in the working set (WS) only if it was referenced in
the last w references. 
- The working set size is the # of unique pages in the working set

The working set size changes with program locality.
- Ideally we want the working set to be the set of pages a process
## Problems

It's hard to:
- determine w
- know when the working set changes

## Page Fault Frequency

A variable space algorithm that monitor the fault rate for each process:
- If the fault rate is above a high threshold, give it more memory
- If the fault rate is below a low threshold, take away memory

 *Hard to use PFF to distinguish between changes in locality and changes in size of working set size.*

