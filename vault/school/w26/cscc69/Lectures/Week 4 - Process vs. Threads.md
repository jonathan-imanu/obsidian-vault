### TLDR

A process is an abstraction for a running program whereas a thread is an abstraction for a single running instance of said program. A process can have multiple threads. 

It is more expensive to create processes, do inter-process communication, and context switch between processes.

The primary use case for processes are when we want to run a different program or want memory and failure isolation.
## Data Structures

Each process has a **process control block**. The PCB has:
- Pid (process id) and PPid (Parent process)
- Address space
- Open files
- Other stuff

Each thread has a **thread control block**. The TCB has:
- Tid
- State
- Registers
- Pointer to PCB
## Creation

To create a processes, the OS must:
- Create and initialize a PCB
- Create a new address space
- Init. the address space with a copy of parent address space
- Init. kernel resources to point to parent resources
- Create kernel thread and place that thread onto the ready queue

To create a thread, the OS must:
- Allocate and init a TCB
- Allocate stack
- Put func, args on stack
- Put thread on ready list