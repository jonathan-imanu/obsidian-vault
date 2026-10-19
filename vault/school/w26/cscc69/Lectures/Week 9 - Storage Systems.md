Threats include device failures, crashes, and bugs causing corruption or inconsistency. 
# RAID Variations

RAID stands for **Redundant array of inexpensive disks**. 
## Striping (RAID-0)  

**Idea:** Split data across disks for parallel access  
**Pros:** High throughput, full capacity utilization  
**Cons:** No redundancy, any disk failure causes data loss  
## Disk mirroring (RAID-1)  

**Idea:** Keep identical copies of data on two disks  
**Pros:** High reliability, simple design, faster reads  
**Cons:** 2× space overhead, slower writes (must update both)  
## Striping + Parity disks (RAID-4)

**Idea:** Use parity to reconstruct data on failure  
**Pros:** Lower space overhead than mirroring, tolerates one disk failure  
**Cons:** Slower writes (parity updates), RAID-4 has parity disk bottleneck    
## Striping the parity (RAID-5)  

**Idea:** Distribute parity across disks  
**Pros:** Removes single parity disk bottleneck  
**Cons:** Writes still expensive because we need to read and update parity
# Latent Sector Failures  

The disk stores with each sector some error correcting code. 

**Sector Failure**: If too many bits are corrupted, ECC isn't enough to correct. 
- We need RAID to recover

To recover we remap the bad sector to somewhere else on disk.

*Sector failures are latent*. We only discover them while reading / accessing the sector. We use a scrubber to detect bad sectors.
- **Scrubber:** Background process that reads all data, detects bad sectors and uses RAID to correct

**Why is latent failure bad?**

Suppose sector X on disk A has failed. We could recover using disk B but before we access sector X disk B fails. This means that we 