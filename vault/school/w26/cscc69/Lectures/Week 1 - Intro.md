## Virtualization

The OS takes a physical resource and presents a virtual form of it to the user. 
- A physical resource can be a processor, memory or disk
The virtual form is more general, easy-to-use and has a standard interface.

It is this virtualization that's leads to the OS being sometimes referred to as a virtual machine.
### Virtualizing Memory

The physical memory is an array of bytes and physical memory addresses are indexes into this array BUT each process sees their own virtual address space.
- It is the OS who maps the address space presented to processes to physical memory.