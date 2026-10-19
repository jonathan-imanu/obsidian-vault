![[Multi-threaded Process.png]]

- Every user thread is mapped to a kernel thread and the OS has its own kernel threads. These kernel threads are the unit of scheuduling in the OS.

# How does the OS/CPU knows to switch threads?

## Interrupts

Interrupts can be either internal or external.

- **Internal Interrupts**: Caused by executing instructions. Can be either a fault (dividing by 0) or a trap instruction to initiate a system call.
- **External Interrupts**: Caused by hardware devices needing attention. The *Programmable Interrupt Controller (PIC)* prioritizes interrupts and specifies correct interrupt handler. 

To handle an interrupt:
- The CPU stops the currently running program and gives control to the relevant handler within the Interrupt Descriptor Table
- The handler saves the current state of the running program
- The handler executes
- Depending on the interrupt, the handler will restore or halt the running program.
## Context Switching

Happens when we receive a system clock interrupt or a system call trap. 

The OS handles this by:
1. Suspending the execution of the running thread
2. Saving it's execution context
3. Changing the thread's state to ready or waiting
4. Electing a new thread from the ones in the ready state
5. Changing its state to running
6. Restoring that thread's execution context
7. Resuming that thread's execution
### Where does the OS keep this information?

The OS keeps track of state and execution context of threads using **Thread Control Blocks** and it maintains a collection of TCB queues. The OS will have one TCB queue for all ready threads and one for each type of blocking IO.
- *State*: Whether a thread is ready, running or waiting
- *Execution Context*: The registers, stack and heap of a thread
# Synchronization

## What constitutes a critical section?

1. Mutual Exclusion

If one thread is in the critical section then no other thread is.

2. Progress

- If thread T is not in the critical section, then T cannot prevent another thread from entering critical section. 
- A thread in the critical section will eventually leave it.

3. Bounded Waiting

- If some thread T is waiting on the critical section, then T will eventually enter the critical section

4. Performance

- The overhead of entering and exiting the critical section is small with respect to the work being done within it

## Locks / Mutex

A data structure that supports three methods at minimum:
1. `acquire`: waits until the mutex is unlocked 
2. `release`: unlocks the mutex allowing a waiting thread to enter the critical section
3. `init`: creates an unlocked mutex
## Condition Variables

A data structure that supports three operations:
- `cond_wait(cond, lock)`: Given we are holding the lock when calling `cond_wait()`, it unlocks the lock and sleeps until cond is signaled then re-acquires the lock before resuming execution
- `cond_signal(cond)`: signal the condition variable `cond` to wake up the next thread
- `cond_broadcast(cond)`: signal the condition cond to wake up all threads

## Deadlock

When one thread is trying to acquire a resource held by another thread and vice versa. Neither can make progress.

Four conditions for deadlocks:
- Mutual exclusion
- Circular wait
- No pre-emption
- Hold and wait
### How to avoid deadlocks?

- Make sure everyone acquires resources in the same order (make circular wait impossible)
- Detect circles and break them (e.g. kill one thread)
## Semaphores

Another data structure with an integer variable $R$, a queue and two operations:
- `sem_wait(sem_t *s)`
	- Decrements the value of the semaphore by 1
	- Wait in a queue if the value of semaphore is negative
- `sem_post(sem_t *s)`
	- Increment the value R of the semaphore by one

# Implementing Synchronization Primitives

When implementing synchronization primitives, we have to worry about external interrupts and context switches.

Consider the basic spin lock example:

```C
struct lock {
	int held = 0;
}

void acquire(struct lock *lock) {
	while (lock->held);
	// What if a context switch happens right here?
	// Between two threads that are both trying to acquire the same lock
	lock->held = 1;
}

void release (struct lock *lock) {
	lock->held = 0;
}
```

The solution is the `test-and-set` x86 CPU instruction that atomically writes to the memory location and returns the old value in a single indivisible step.
- The caller is responsible for testing if the operation has succeeded or not
# CPU Scheduling

![[ThreadStates.png]]
## Scheuduling Metrics

- **Throughput**: The number of threads that complete per unit time
- **Turnaround time**: Time for a thread to complete
- **Response time**: Time between waiting to ready transition and ready to running transition.

These are affected by the CPU utilization and the waiting time.

The importance of a metric depends on the system and job type.
- **Batch Systems care about job throughput and turnaround time**
- **Interactive systems care about response time**

*Systems are often optimized for average response time or average turnaround time.*
### No Starvation as a Requirement

**Starvation**: When a thread can't make progress because some other thread holds the resource it desires.
- Can either be a side effect of synchronization or scheuduling semantics.
## Algorithms

See OSTEP Chapter 7 for non-bolded terms.

- FCFS = FIFO
- SJF = Shortest-Job-First 
	- No presumption 
	- Treats the scheduler as an oracle that predict job length
- Round-Robin: Has a FIFO queue of jobs. Each job is given a quantum and runs that duration or until it yields at which point it gets moved to end of FIFO queue.
	- Quantum is typically between 1-100 ms

### **SRTF = Shortest-Remaining-Time-First**

If a new thread arrives CPU burst length less than time of current executing thread, preempt the current running thread. 
- Better for wait and turnaround time. 
- *Allows starvation*

### **Multilevel Queue**

Associate a priority with each thread and execute highest priority thread first. If same priority, do RR.
- Starvation of low priority threads is prevented by changing the priority over time
	- For ex, increasing priority as a function of waiting time
- Deciding priority, keep track of thread CPU usage.
	- Initial priorities are high. We assume they are interactive.
	- Reduce priorities of threads with high CPU usage
#### Priority Inversion and Donation

In a MLQ, a high-priority job `H` can be forced to wait on a lower priority job if that lower priority job holds a synchronization primitive needed by `H`. 

This is **priority inversion**. It's when a higher priority thread is forced to wait on a lower priority thread.

The fix is **priority donation**. The higher priority thread will donate some of it's priority to the lower priority thread.

### MLFQ

Has 5 rules BUT extremely similar to MLQ:
1. If Priority(A) > Priority(B), A runs
2. If Priority(A) = Priority(B), A & B run in round-robin fashion using the queue's quantum
3. When a job enters the system, it is placed at the highest priority
4. Once a job uses up its time allotment at a given level, its priority is reduced 
5. After some time period S, move all the jobs in the system to the topmost queue
