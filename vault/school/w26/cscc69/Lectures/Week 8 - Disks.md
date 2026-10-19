- Data stored as **magnetic orientation** on a spinning platter
- A **mechanical arm** moves to the right location

![[Hard Disk.png]]

- Each side of a platter is called a surface
- Each surface is organized into tracks
- Tracks organized into sectors

Disk service time is broken down into:
- Seek
- Rotational latency
- Data transfer

![[Disk Service Time.png]]

HDD friendly workloads have: 
- High locality 
- Large request sizes 

We try to design file systems so workloads they generate have those properties.
# Disk Storage 

 Disks expose storage as linear array of blocks.
 - Each block is 512 bytes or 4 KB
 - Number of blocks is disk capacity / block size

Disk tries to map blocks close in LBN space to physical disk locations that are close to each other.
## Complications

### Zones

In an HDD, the disk surface is divided into concentric tracks, and those tracks are grouped into zones.

Zones are a complication because they introduce non-uniform physical layout and performance, even though the disk presents a simple linear block interface.
### Defect Management

Disks keep spare sectors that are used in case portions of the media become unusable.
### Skew

A request spans 2 tracks. The track skew can prevent unnecessary rotation.
## Scheduling

**Seeks are expensive**, unless there are request queues disk scheduling has minimal impact. Modern disks do the scheduling themselves. 

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
- LOOK / C-LOOK 
	- Like SCAN/C-SCAN but only go as far as last request in each direction (not full width of the disk)

