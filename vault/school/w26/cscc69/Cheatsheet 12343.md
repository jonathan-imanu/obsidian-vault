OS must virtualize memory, CPU, and ensure persistence.
### Sync.

Locks: `init`, `acquire`, `release`
Condition Varaibles:
- `cond_wait(cond, lock)`: Given we are holding the lock when calling `cond_wait()`, it unlocks the lock and sleeps until cond is signaled then re-acquires the lock before resuming execution
- `cond_signal(cond)`: signal the condition variable `cond` to wake up the next thread
- `cond_broadcast(cond)`: signal the condition cond to wake up all threads
Semaphores (no concept of ownership):
- `sema_post()`: wake thread if one is waiting
- `sema_wait()`

 A spin lock implemented without `test-and-set` has a race condition if context happens in between check and set.
 - `test-and-set`: Atomically writes to the memory location and returns its old value in a single indivisible step
### Concurrency

Interrupts can be either internal or external.

- **Internal Interrupts**: Caused by executing instructions. Can be either a fault (dividing by 0) or a trap instruction to initiate a system call.
- **External Interrupts**: Caused by hardware devices needing attention. The *Programmable Interrupt Controller (PIC)* prioritizes interrupts and specifies correct interrupt handler. 

To handle an interrupt:
- The CPU stops the currently running program and gives control to the relevant handler within the Interrupt Descriptor Table
- The handler saves the current state of the running program
- The handler executes
- Depending on the interrupt, the handler will restore or halt the running program.
#### Context Switching

OS receives System Clock Interrupt or a System Call Trap 
1. suspends the execution of the running thread
2. saves its execution context 
3. changes thread's state to ready (timeout) or waiting (I/O request ) 
4. elects a new thread from the ones in the ready state 
5. changes its state to running 
6. restores its execution context 
7. resumes its execution

On I/O interupt:
1. execute I/O
2. switch to thread that was waiting on I/O to readu
3. resume program execution state

On fault:
1. suspend current thread execution and terminate

**What makes a critical section?**

1. Mutual Exclusion
2. Progress
3. Bounded Waiting: If some thread T is waiting on the critical section, then T will eventually enter the critical section
4.  Performance

**Priority Scheuduling**: A partial fix for this problem is for H to "donate" its priority to L while L is holding the lock, then recall the donation once L releases (and thus H acquires) the lock.
#### Deadlocks

Deadlock is when one thread is trying to acquire a resource held
by another thread and vice versa

**What makes a deadlock?**
- Mutual exclusion
- Circular wait
- No pre-emption
- Hold and wait
### Process vs. Threads
![[Multi-threaded Process.png]]

Each process has a **process control block**. The PCB has:
- Pid (process id) and PPid (Parent process)
- Address space
- Open files
- Other stuff
#### Threads

Each thread has a **thread control block**. The TCB has:
- Tid
- State
- Registers
- Pointer to PCB

The OS manages a collection of TCB queues for each state and type of blocking IO. They are either ready, running, or waiting.

**Context Switching:** Save execution context (e.g. program counter and registers). Move TCB to ready queue.
##### Mapping Models

**One-to-one**: The kernel manages and schedules threads and handles thread operations. Good for scheuduling, bad for speed. 

**Many-to-one**: One kernel thread per process thread management and scheduling is delegated to a library (user level). Very lightweight and fast. All threads can be blocked if one of them is waiting for an event. Cannot be scheduled on multiple cores.

**Many-to-many**: User threads implemented on kernel threads. Multiple kernel-level threads per process. Get the parallelism benefits of one-to-one without the per-thread overhead. Complex. Need scheduling at two levels. Need coordination between user and kernel level schedulers.
#### Creation

To create a processes (`fork()`), the OS must:
- Create and initialize a PCB
- Create a new address space
- Init. the address space with a copy of parent address space
	- Both parent and child share the same physical pages (copy-on-write)
- Init. kernel resources to point to parent resources
- Create kernel thread and place that thread onto the ready queue

To create a thread, the OS must:
- Allocate and init a TCB
- Allocate stack
- Put func, args on stack
- Put thread on ready list
#### Process

##### `exec`

Does not create a new process. Replaces image of process 
1. Stops the current process 
2. Loads the program “prog” into the process’ address space 
3. Initializes hardware context and args for the new program 
4. Places the PCB onto the ready queue
### CPU Scheuduling

**Non-preemptive**: Keeps CPU until completion. Best for batch system, expensive context switches.

**Preemptive**: CPU can be taken away (context switch). Best for interactive systems.

**Scheduling Metrics**:
- Throughput: # jobs/time
- Turnaround time: Time for a thread to complete
- Response time: Time between waiting to ready transition and ready to running transition.
**Secondary Criteria**
- CPU utilization: %CPU fraction of time CPU doing productive work 
- Waiting time: Avg(Twait) time each thread waits in the ready queue

The importance of a metric depends on the system and job type.
- **Batch Systems** care about job throughput and turnaround time
- **Interactive systems** care about response time

**Starvation**: A thread is prevented from making progress because some other thread has the resource it requires (could be CPU or a lock).

**Convoy effect / head-of-line blocking**: All other threads wait for the one big thread to release the CPU.

| Algorithm | Idea                            | Best Metric               | Problem         |
| --------- | ------------------------------- | ------------------------- | --------------- |
| FCFS      | Arrival order.                  | Simple, low overhead      | Convoy effect   |
| SJF       | Shortest job first.             | Best turnaround, waiting  | Need job length |
| SRTF      | Shortest remaining (preemptive) | Best turnaround (dynamic) | Starvation      |
| RR        | Time slices (quantum)           | Best response time        | Quantum tuning  |
| MLQ       | Fixed priority queues           | Priority control          | Starvation      |
| MLFQ      | Dynamic priorities              | Best overall balance      | Complex         |
- Quantum in RR should be much larger than context switch cost be not too large or become FCFS
**Priority Inversion**: High-priority thread blocked by lower-priority one holding a lock.
**Priority Donation**: High-priority thread temporarily boosts the lower-priority thread holding the lock.
#### MLQ

Associate a priority with each thread and execute highest priority thread first. If same priority, do RR.
- Starvation of low priority threads is prevented by changing the priority over time
	- For ex, increasing priority as a function of waiting time
- Deciding priority, keep track of thread CPU usage.
	- Initial priorities are high. We assume they are interactive.
	- Reduce priorities of threads with high CPU usage
#### MLFQ

Has 5 rules BUT extremely similar to MLQ:
1. If Priority(A) > Priority(B), A runs
2. If Priority(A) = Priority(B), A & B run in round-robin fashion using the queue's quantum
3. When a job enters the system, it is placed at the highest priority
4. Once a job uses up its time allotment at a given level, its priority is reduced 
5. After some time period S, move all the jobs in the system to the topmost queue
### Paging Precursors

A virtual address consists of a VPN and an offset (the LSBs). 
#### Attempt 1: Base & Bound Registers

Map each address space to a contiguous chunk of physical memory. 
- The hardware has two special registers `base` and `bound` that it uses to compute physical addresses as `physical addr = virtual addr. + base` and verifies `0 ≤ virtual address < bounds`, else trap to kernel.
- OS modifies the registers.

The main drawback is *internal fragmentation*.
#### Attempt 2: Segmentation

Each process has a collection of base/bound registers. The address space is built from many segments where each segment has it's own base and bound.

Advantages:
- Multiple segments per process
- Do not need entire process in memory
Disadvantages:
- Allows *external fragmentation* where unused small space in-between segments is wasted.
#### Attempt 3: Simple Paging

 - Divide virtual memory into fixed-size **pages**. 
 - Physical memory is divided up into page-sized **page frames**

Each process has a **page table** which is a mapping of virtual pages to physical pages (each mapping is a PTE).

**Pros**:
- This eliminates external fragmentation. 
- Simplifies allocation, free, and backing storage (swap space on disk) since we have to deal with fixed sized chunks of memory
**Cons:**
- Wastes lots of space as even unused pages have a PTE
- Still has internal fragmentation.
### Multi-Level Paging

**Don't store pages in the page table with invalid entries.**

The VPN of the virtual address now is broken into:
- Page Directory Index and Page Table Index

We have the following data structures:
- **Page Directory:** For each page of the page table (not virtual addr. a full page), we have a **page directory entry (PDE)** with:
	- valid bit says whether corresponding part of page table has any valid entries
	- PFN of a page table
- **Page Table:** Each entry (a PTE) has:
	- PFN
	- Valid
	- Present bit
	- Protection bits say what operations (read, write, execute) are allowed on page
	- Modify bit says whether or not the page has been written
	- Reference (use) bit says whether the page has been accessed

An access to an invalid page-directory entry will raise an exception. OS will handle in case of swap.

To help reduce the number of lookups, we have a **Translation Lookaside Buffer**.
- Think of TLBs like a cache.
- TLBs are special hardware to translate virtual page #'s to PTEs in a single machine cycle. 
- TLBs exploit locality: processes only use a handful of pages at a time TLB hit rate is a very important for performance (>99% of translations)

**Pros**:
- Only allocates page-table space that we need
- OS can grab the next free page
**Cons**: Complex. Extra memory accesses.

OS issues a read to some virtual address. The MMU does the following:
- If the VPN causes a hit in the TLB we return the PFN of the relevant page, otherwise each we the Page Directory.
- The MMU uses the PDI to find correct PDE in the Page Directory.  
- The PDE contains a valid bit and the PFN of the page table.  
- Given the valid bit is set, the MMU reads this page table using the PDE provided PFN and uses the PTI to find the correct page table entry.  
- From the PTE, the MMU computes and returns the physical location of the page.

**Paging Math**

- Virtual Address: No. of offset bits is $k$ if size of page is $2^k$ remaining is VPN
	- PTI & PDI entries: page_size / entry_size. This is entries per table and can be different!
	- PTI & PDI index = log2(page_size / entry_size)
- How many pages are mapped?
	- each PTE maps 1 page
	- each page table maps many pages
	- each PDE maps a whole region
- Total Pages: VA space / page size
- Single-Level Page Tables = Total Pages * PTE Size
	- Remember Size of Multi-Level Page Table  = Page Size 
- PTEs = Page Table Size / size of each PTE
- PDEs = Page Directory / size of each PDE
- Virtual Address to Physical Address
	- Compute offset size and use it to split addr to VPN and offset value
	- Given we have a VPN -> PFN mapping provided:
		- PA = PFN × page_size + offset 
- PA bits = PFN bits + Page bits
### Page Eviction

**Page fault:** Application tries to access page that is not in memory but on disk. Present bit indicates whether page is in memory. If not, page table entry contains disk location.
#### Eviction 

1. When the OS evicts a page, it sets the present bit in PTE to 0 and stores the location of the page in the swap file in the PTE.
2. When a process accesses the page, the invalid PTE causes a trap (page fault)
3. The trap will run the OS page fault handler.
4. Handler uses the invalid PTE to locate page in swap file on disk.
5. Reads page into a physical frame, updates PTE to point to it.
6. Might require evicting another page if no free physical frame
7. Restarts process.
#### Algorithms

**Idea**: Memory usage patterns often have locality.
##### Belady's

Replace the page whose access is the furthest in the future.
**Belady's Anomaly**: Having more physical memory does not automatically mean
fewer page faults.
##### Second Chance

An approximation of LRU. Needs a `use bit` that is set by hardware and only cleared by OS.

**Data Structures**:
1. All pages of the system arranged in a circular list
2. A clock hand that points to some page

- on hit, set the corresponding page's accessed bit to 1 (hardware)
- on miss (OS)
	- while hand's accessed bit is 1, set hand's accessed bit to 0 and move to next page
	- else if hand's accessed bit is 0, swap the hand's page with the new page and to move next page
#### Working Set

A working set of a process is used to model the dynamic locality of its memory usage. 
- `WS(t,w) = {pages P | P was referenced in the time interval (t, t-w)}`
t – time, w – working set window (measured in page refs)

The working set size changes with program locality
- During periods of poor locality, you reference more pages
- Within that period of time, the working set size is larger

**Problems**: Hard to determine w. Hard to know when the working set changes.
#### Page Fault Frequency (PFF)

A variable space algorithm. Monitor the fault rate for each process
- If the fault rate is above a high threshold, give it more memory
- If the fault rate is below a low threshold, take away memory

**Problem**: Hard to use PFF to distinguish between changes in locality and
changes in size of working set.

**Why?**
- control thrashing
- approximate the process’s working set 
- dynamically allocate memory more efficiently
### Memory Management

Not every `malloc(size)` results in a system call to allocate more heap space. 
- `glibc` (the user-level library) requests larger memory chunks and only uses the system call when running low on space
- `glibc` is what decides how subdivide and reuse this memory

#### Tracking Memory Allocation

Two main approaches: Bitmaps and Lists.

1. Bitmaps use less space but require sequential scans to find an N-unit chunk.
2. Free lists have higher space overhead since they use pointers but are faster for allocation.

**Free Lists:** A linked list of allocated and free segments
**Implicit List:** Each block has a header that records size and status. Searching for a free block is then `O(N)` where `N` is the number of blocks. 
**Explicit List:** Store pointers in free blocks to create doubly-linked list. 

#### Buddy Algorithm

We also have first and best fit. First fit is just better.

**Data Structure**: Have $n$ free lists of blocks of size $2^i \text{ for } 0 = 1 \ldots n$ 

**Allocation Steps**: Round up to the nearest power of 2. Check the free list to see if needed block available, if yes we are done. Otherwise, check the higher powers of 2 (32, 64, ...) until we find a block that is available. Once we find a free block, we recursively divide it into 2 until we have have reached the desired size. Only one half continues to get split here. The other half is added to the free list.

**Free Steps**:
0. Suppose we need to free a block of size 32
1. We find the buddy of this block using xor.
2. If the buddy is free, insert the block to free list.
3. Otherwise, coalesce the blocks and repeatedly apply this find merge process
### Disks

- Each side of a platter is called a surface
- Each surface is organized into tracks
- Tracks organized into sectors

Disk service time is broken down into:
- Seek (dominates)
- Rotational latency (2nd highest)
- Data transfer

HDD friendly workloads have: 
- High locality 
- Large request sizes 
#### Disk Storage 

 Disks expose storage as linear array of blocks.
 - Each block is 512 bytes or 4 KB
 - Number of blocks is disk capacity / block size

Disk tries to map blocks close in LBN space to physical disk locations that are close to each other.
##### Complications

**Zones:** The disk surface is divided into concentric tracks, and those tracks are grouped into zones. Introduce non-uniform physical layout and performance, even though the disk presents a simple linear block interface.

**Defect Management**: Disks keep spare sectors that are used in case portions of the media become unusable.

**Skew**: A request spans 2 tracks. The track skew can prevent unnecessary rotation.
#### Disk Scheuduling Algos

- FCFS (do nothing) 
	- Reasonable when load is low
	- Long waiting times for long request queues 
- SSTF (shortest seek time first) 
	- Minimize arm movement (seek time), maximize request rate 
	- Favors middle blocks/tracks 
- SCAN (elevator) 
	- Service requests in one direction until done, then reverse 
- C-SCAN
	- Like SCAN, but only go in one direction (typewriter) 
	- Provides more uniform wait time
- LOOK / C-LOOK 
	- Like SCAN/C-SCAN but only go as far as last request in each direction (not full width of the disk)
### SSDs

NAND flash memory-based drives. They are based on NAND flash cells.
- Each flash cell can hold 1-5 bites.
- Cells on a chip are organized into pages.
- Multiple pages are organized into erase blocks

They support:
- Reading a page: Fast. Happen at the granularity of pages.
- Writing to an erased page: 10x slower than reads. Happen at the granularity of pages.
- Erasing a block: 10x slower than writes. Happen at the granularity of erase blocks. The difference in granularity between writes and erases can lead to fragmentation.

**Pros** over disks:
- much faster than hard drives
- support random access
- more resilient against physical damage
- reduced power consumption
**Tradeoffs**:
- Flash memory is written in pages, but erased in blocks. **It can become fragmented and needs GC!**
- *Flash memory can only be erased / written a fixed number of times*
	- Wear leveling trying to balance writes over blocks

**Writes**: OS issues a write with data D to LBN A. If the page (P) corresponding to LBN A is non-empty, it does NOT overwrite but rather finds an erased page to write D. We marked P as obsolete. It will be GC later.

**Dynamic wear leveling:** The controller spreads new writes across blocks
that have the lowest erase counts
**Static wear leveling:** The controller occasionally relocates long-lived (“static”) data out of low-wear blocks into higher-wear blocks. Frees the low-wear blocks so they can take future writes.

**TRIM**: Special SATA command TRIM that allows the OS to tell the SSD that specific LBAs are
invalid, may be GCed.
- Needed since most file systems don't delete data.

**Multi-Level Cell**: Multiple bits per flash cell. Higher capacity and cheaper
than SLC flash. Lower throughput due to the need for error correction. Needs more power thatn SLC. 

**Single-Level Cell**: One bit per flash cell. Lower capacity and more
expensive. Higher throughput.
### RAID

Redundant Array of Inexpensive Disks: spread data across multiple disks for speed or reliability
  
***Parity***: extra recovery info calculated from your data. If one disk dies, the parity lets you reconstruct the lost data. One parity block can protect many data blocks.

| **RAID Level** | **Idea** | **Pros** | **Cons** |
| --- | --- | --- | --- |
| **RAID 0 (striping)** | Split data across disks | Parallel access → fast reads/writes | No redundancy — one failure = total data loss |
| **RAID 1 (mirroring)** | Identical copy on two disks | Simple; survives one disk failure | 2× space overhead; writes slower |
| **RAID 4 (parity)** | Stripe data + one dedicated parity disk for recovery | Less overhead than mirroring | Parity disk is a bottleneck for all writes |
| **RAID 5 (parity)** | Like RAID 4 but parity distributed across disks | No single parity bottleneck | Writes are expensive (read-modify-write parity) |
| **RAID 6** | Like RAID 5 but with two parity blocks | Survives two disk failures | Even higher write cost |
### FS 

**Hard link**: two different names pointing to the same inode. Both names refer to the exact same file. Data only deleted when all names are removed (link count hits 0) & no process has data open.
#### Disk Layout

**Contiguous Allocation**: Fast and simplifies directory access. Inflexible, causes fragmentation and needs compaction
**Linked Allocation**: Each block points to the next, directory points to the first. Good for sequential access.
**Indexed Structure**: An "index block" contains pointers to many other blocks. Good for both random and sequential access. 

![[Data Region.png]]
- **Super block** contains key information for particular file system. Eg the number of inodes, begin location of inode table, location of root directory,. etc. When mounting a file system, OS will read the superblock first, to initialize various information.

**Problems with this approach**:
1. Data blocks allocated randomly in aging file systems
2. Inodes allocated far from block

![[Cylinder Groups.png]]

#### Directories

- Implemented just like files
- Have two special contents `.` and `..`
- Their data blocks have a list of (entry name, inode number) pairs
### FS Consistency
#### fsck

A Unix tool for finding inconsistencies and repair them. Check super block, free block, Inode state, etc. for inconsistencies.
- There are problems that it can't detect.
- Super complex and internal semantics are tightly coupled to filesystem internals
- Too slow.
#### Journaling

Treat the journal log as a circular data structure, reusing it over and over.

1. Journal Write
2. Journal Commit
3. Checkpoint
4. Free

The journal has a super block that keeps track of oldest and newest **not-checkpointed** transaction in the log.  Some time after checkpoint, mark the transaction as free in the journal by updating the superblock.

Recovery replays complete transactions.
#### Metadata Journaling

1. Data Write
2. Journal Metadata Write
3. Journal Commit
4. Checkpoint metadata 
5. Free
### Pintos

#### Project 1 - Alarm Clock & Priority Donation

**Sync**:
- Locks are built on top on semaphoes
- Although semaphores operations P and V requires multiple CPU instructions, PintOS makes them atomic by disabling interrupts when manipulating semaphore state.
**Threads**
- Exactly one thread runs at a time.
- If no runnable thread exists, the idle thread runs.
**Scheuduling:**
- PintOS behavior is driven by moving threads between **lists/queues** like ready, blocked, sleeping. The scheduler picks from the ready set; sync primitives can move threads between states
#### Project 2 - User Programs

- **Process = thread**: Each user process has one thread, and switching processes means switching to that process’s page directory. 
	- User memory is per-process; kernel memory is global above `PHYS_BASE`.  
- **System calls are the user/kernel boundary.** User code traps into `syscall.c`. The kernel reads the syscall number and args from the **user stack** and dispatches from there.  
- **Per-process file descriptor table.** Each process has its own fd namespace; `0` and `1` are reserved for stdin/stdout, fds are **not inherited**, and reopening the same file gives distinct fd objects with separate positions.

**How system calls work**
-  User program calls a syscall like `write()` or `exit()`
- A trap switches execution from **user mode** to **kernel mode**
- The kernel syscall handler reads the **syscall number** and **arguments** from the user stack
- The kernel **validates pointers/arguments**
- It runs the requested kernel code
- It puts the return value in a register
- Control returns to the user program'
#### Project 3 - Virtual Memory

##### Brief

- All addresses manipulated by assembly instructions are virtual addresses. Assembly instructions never manipulate physical addresses.
- The translation from a virtual address to a physical address is done automatically by the MMU (Memory Management Unit) based on the information mapping stored in the page directory. The page directory can be stored anywhere in memory and its location is stored in the CR3 pointer.
- The kernel page directory maps the entire memory space so all adresses are valid and accessible. However, the user programs have a sparse page directory mapping and not all adresses are valid because not accessible (not mapped).
- A page number x in the kernel page directory might corresponds to a different page number in the user program.

A _swap slot_ is a continuous, page-size region of disk space in the swap partition.
##### Supplemental Page Table

Needed for:
1. On a page fault, the kernel looks up the virtual page that faulted in the supplemental page table to find out what data should be there. 
	1. Tracks which pages have been swapped
2. The kernel consults the supplemental page table when a process terminates, to decide what resources to free.
##### Frame Table

- Allows Pintos to efficiently implement an eviction policy, by choosing a page to evict when no frames are free. 
- Each entry in the frame table contains a pointer to the page, if any, that currently occupies it, and other data of your choice.
- Track free frames
##### Swap Table

- Tracks in-use and free swap slots.
- Allows for picking an unused swap slot for evicting a page from its frame to the swap partition. 
- It should allow freeing a swap slot when its page is read back or the process whose page was swapped is terminated.
##### mmap

- `mmap` lets a process treat a file like memory instead of using `read()` and `write()`
- The OS maps file-backed pages into the process’s virtual address space
- File data is usually loaded **lazily**, only when a page is first accessed and faults in
- Modified mapped pages are marked **dirty**
- Dirty pages are written back to the file when they are **evicted**, **unmapped**, or the process **exits**
- Pintos tracks each mapping so it knows which file and virtual pages belong together
- If multiple processes map the same file, they use the same underlying file but have separate virtual mappings
- The OS must prevent eviction of pages that are temporarily needed for I/O, such as pinned pages during DMA or file operations

Page faults in PintOS look like:
1. Locate the page that faulted in the supplemental page table.
2. Obtain a frame to store the page
3. Fetch data to frame
4. Point the page table entry to frame