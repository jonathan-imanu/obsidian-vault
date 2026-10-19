## What?

NAND flash memory-based drives. They are based on NAND flash cells.
- Each flash cell can hold 1-5 bites.
- Cells on a chip are organized into pages.
- Multiple pages are organized into erase blocks

They support:
- Reading a page.
	- Fast. Happen at the granularity of pages.
- Writing to an erased page
	- 10x slower than reads. Happen at the granularity of pages.
- Erasing a block
	- 10x slower than writes. Happen at the granularity of erase blocks.
## Pros vs. Cons

### Pros

SSDs have the following advantages over disks:
- much faster than hard drives
- support random access
- more resilient against physical damage
- reduced power consumption
### Cons

- Flash memory is written in pages, but erased in blocks. **It can become fragmented and needs GC!**
- *Flash memory can only be erased / written a fixed number of times*
	- Wear leveling trying to balance writes over blocks
## Architecture

SSD maintains a map of LBNs to pages.
### Writes

Block storage devices expose storage as linear array of logical blocks
- These blocks are unrelated to flash erase blocks

OS issues a write with data D to LBN A:
1. If the page corresponding to LBN A is non-empty, it does NOT overwrite but rather finds an erased page to write D and the LBN A page is GC later.
### Wear Levelling

- Dynamic wear leveling
	- Controller spreads new writes across blocks that have the lowest erase counts
- Static wear levelling
	- The controller occasionally relocates long-lived (“static”) data out of low-wear blocks into higher-wear blocks. Frees the low-wear blocks so they can take future writes.

*Dynamic wear leveling only affects frequently written data. Static data can remain in low-wear blocks forever, so static wear leveling moves it to ensure all blocks age evenly.*
#### Write Amplification

- **The number of actual writes to the device is larger than the number of writes the OS issues to the device.** 
- Caused by GC and wear levelling.

WAF = # bytes written to flash chips / # bytes issued to device by OS

Minimize WAF:
- sequential
- large writes
- no overwrites
### Garbage Collection

 Unless there is a write in the same spot, controller doesn't know which LBA's it can GC. 

There is a special SATA command TRIM that allows the OS to tell the SSD that specific LBAs are invalid and may be GCed. 

![[MLC vs. SLC.png]]