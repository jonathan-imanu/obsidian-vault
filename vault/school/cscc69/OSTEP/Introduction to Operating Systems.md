**Von Neumann model of computing:** Program running -> Instruction Execution -> Processor FDE cycle

An OS is simply a body of software that makes it easier to interact with the hardware. Some core activities of the OS:

- **Virtualization:** Is a general technique done by operating systems to take a physical resource (processor, memory or disk) and transform it into a more general, powerful version of itself.
- Exports a "standard library" for users to interact with the OS (a few 100 system calls)
- Is a **resource manager** since virtualization allows many programs to share the same physical resources (such as CPU)
### System Calls vs Procedure Calls

A system call transfers control (i.e., jumps) into the OS while simultaneously raising the hardware privilege level. 
- User applications run in what is referred to as user mode which means the hardware restricts what applications can do. 
- When a system call executes, it is done with the special `trap` hardware instruction so control is transferred to a *trap handler* and the privilege level is set to kernel mode. 
- When OS is done servicing a system call, it has a `return-from-trap` instruction which reverts to user mode and passes back control









