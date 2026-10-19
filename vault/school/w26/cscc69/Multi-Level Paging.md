## Data Structures

### Page Table Entries (PTE)

A PTE is primarily used for page replacement (LRU) and determined the physical memory location of a given page.

It contains the following information:
- PFN
- Valid bit: Is the corresponding virtual page in use by the process
- Present bit: Says whether the page is in memory. If not it's in swap space and the PTE has the disk location
- Protection bit: Allowed operations on the page
- Modify bit: Whether or not the page has been accessed
- Reference / Use bit: Whether the page has been accessed