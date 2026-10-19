Virtual memory is an abstraction for the physical memory that is managed by the OS and provided to a program. As an abstraction it has the following goals:
- Enforce protection by disallowing programs to modify each others memory
- Be convenient abstraction for programming 
- Allow programs to see more memory than exists
## Attempt 1: Base & Bound Registers

Map each address space to a contiguous chunk of physical memory. 
- The hardware has two special registers `base` and `bound` that it uses to compute physical addresses as `physical addr = virtual addr. + base`

**Address translation** is done by the hardware, specifically the *memory-managed unit (MMU)* to convert virtual addresses to physical addresses. 

The OS decides on location of process and sets the registers. It must manage these registers for context-switching and change them to move the process in memory.

The main drawback is *internal fragmentation* where unused space inside a process' space is wasted.
## Attempt 2: Segmentation

Each process has a collection of base/bound registers. The address space is built from many segments where each segment has it's own base and bound.

Advantages:
- Multiple segments per process
- Do not need entire process in memory
Disadvantages:
- Allows *external fragmentation* where unused small space in-between segments is wasted.
## Attempt 3: Simple Paging

 - Divide virtual memory into fixed-size **pages**. 
 - Physical memory is divided up into page-sized **page frames**

This eliminates external fragmentation.

Each process has a **page table** which is a mapping of virtual pages to physical pages.
### Address Translation

Looks up the mapping from VPN to PFN in the page table
- VPN is the virtual page number
- PFN is the physical frame number

The virtual address consists of the VPN and an offset.
- 
The physical address consists of the PFN and an offset.

The per-process page table maps the VPN to PFN.
### Results

Paging does the following:
- eliminates external fragmentation
- simplifies allocation, free and backing storage since we have to deal with fixed sized chunks of memory

BUT it's really really memory intensive and there is still internal fragmentation of 0.5 pages per segment.
## Final Attempt: Multi-level page tables

Don't store pages in the page table with invalid entries.

The virtual address is still VPN and offset but the VPN is broken up into:
-  Page Directory Index and Page Table Index

The page directory contains a **page directory entry (PDE)** per page of the page table.
- The PDE has a valid bit and PFN
	- This valid bit tells us whether a corresponding part of the page table has any valid entires

An access to an invalid page-directory entry will raise an exception.

If the PDE is valid, we need to get the page table entry (PTE) from the page table corresponding to this page-directory entry.

### Results

- Only allocates page-table space in proportion to address space
- The OS grabs the next free page when it needs allocate or grow a page

BUT

- This solution is way more complex and has 3 memory accesses instead of 

## TLBs

Special hardware to translate virtual page #'s to PTEs in a single machine cycle.

TLBs exploit locality: processes only use a handful of pages at a time TLB hit rate is a very important for performance (>99% of translations)

## How page lookup works?

Process is executing on the CPU, and it issues a read to an address. The read goes to the TLB in the MMU:

![[Page Lookup.png]]

Case 1: TLB hit

1. All address are virtual address since the OS abstracts memory. 
2. From this virtual address, since we have a TLB hit, we get the corresponding PTE
3. The TLB validates that the PTE protection bits allow the type of access
4. Since the PTE is a mapping of VFN to PFN, we can use the MMU to get the physical address
	1. The MMU does this by combining the physical frame and offset 
5. The MMU reads from this physical address and returns value to CPU

Case 2: TLB miss

We must consult the page directory!

1. Recall that the VFN consists of the PDI & PTI. 
2. From the PDI, the OS indexes into the page directory and reads the PDE
3. From the PDE, the OS validates whether the access is allowed based on the valid bit. If invalid, we have a page fault.
4. From the PDE, we can obtain the page table base and use the PTI from the VPN to the the PTE
5. From the PTE, the steps are the same as they were for TLB hit

## Paged Virtual Memory

When there is not enough space in memory, the OS evicts a page to the swap file. By doing the following:

1. When the OS evicts a page, it sets the present bit in PTE to 0 and stores the location of the page in the swap file in the PTE
2. When a process accesses the page, the invalid PTE causes a trap
3. The trap will run the OS page fault handler
4. Handler uses the invalid PTE to locate page in swap file on disk
5. Reads page into a physcal frame and updates PTE to point to it
6. Restarts process

## Page Fault 

Application tries to access page that is not in memory but on disk. The present bit in a PTE indicates this.