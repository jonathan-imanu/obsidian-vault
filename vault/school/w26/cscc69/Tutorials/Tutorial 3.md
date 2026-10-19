# Tutorial 3: Synchronization (Questions)

1. What is a critical section? Can you identify a critical section in the Pintos test `threads/alarm-wait.c`?

A section where multiple threads could access shared data. Line 149 of `alarm-wait.c`
    
2. Could you explain in details how this critical section could lead to a race condition bug and how that bug would affect the value of the variable `output_pos`?

	1. derefernce
    
3. What is a mutex (a.k.a lock)?

It allows one thread to "lock-down" a section of code guarded by `lock-acquire` forcing other threads who have also reached that section of code to wait until the thread with the lock has done a `lock-release`
    
5. What is a semaphore? How is it different from lock / mutex?
    
6. In the test `threads/priority-sema.c`, there are 10 threads executed in parallel (11 if you count the main thread). Could you give three scenarios of execution in which the maximum value of the semaphore is either 1, 2 or 10?
    
7. Here is a very naive implementation of a lock. Could you explain why disabling the interrupts while holding the lock seems to be a good idea at first?
    
    ```
     struct lock { 
     } 
    
     void acquire (lock) { 
         disable_interrupts();
     } 
    
     void release (lock) { 
         enable_interrupts(); 
     }
    ```
    
8. However, could you also also explain why it is actually not a good idea after all?
    
9. How are locks actually implemented in Pintos?
    
10. Semaphores operations P and V requires multiple CPU instructions, how does Pintos ensure those operations are atomic?
    
11. What is a deadlock? Can you give a simple example of a deadlock?

There are 4 things needed for a deadlock to happen:

1. mutual exclusion
2. hold and wait
3. no preemption
4. circular wait

