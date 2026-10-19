A file system should have files as an abstraction for secondary storage.
- Organize files logically 
- Permit sharing of data between processes people and machines
- Protect data from unwanted access

Sees storage as a linear array of blocks.
## Disk Layout Strategies

Files systems define a block size (eg. 4KB):
- Disk space is allocated in granularity of file system **blocks**
- OS divides linear array of disk blocks exported by SSD/HDD into filesystem blocks.

Files can span multiple blocks. There are two ways of allocating and then finding all of the blocks for a given file:
### Contiguous Allocation

Like memory

- **Pros**: Fast and simplifies directory access
- **Cons**: Inflexible, causes fragmentation and needs compaction
### Linked Allocation

Each block points to the next, directory points to the first

- **Pros**: Good for sequential access 
- **Cons**: Bad for everything else.
### Indexed Structure

An "index block" contains pointers to many other blocks.
- Good for both random and sequential access
- May not multiple index blocks linked together
## Inode

A data structure that keeps track of information about a file (metadata) and which logical blocks contain the data stored in the file.

**Unix inodes implement an indexed structure for files**.

- Each file is represented by an inode. 
- Each inode contains file metadata & 15 block pointers
	- 12 direct, 1 indirect, 1 doubly indirect and 1 triple indirect. 
## Memory Organization 

![[Data Region.png]]

- **Data Region**: The space that stores user data.
- **Inode Table**: An array of on-disk inodes
	- Each inode is referred to by it's inode number
- **Bitmaps**: Indicates whether data blocks are free or allocated. We have two bitmaps:
	- **data bitmap**: for data region
	- **inode bitmap**: for inode table
- **Superblock**: Key information for the particular file system. OS reads this when first mounting the file system.
	- Eg. the number of inodes, begin location of inode table, location of root directory,. etc
## Directories 

- Directory contains a list of (entry name, inode number) pairs
- Each directory has two extra files `.` and `..`

Directories are implemented as files with special contents:
- List of names of all files inside the directory with each file's inode number
## Aside: FS Access Patterns

### `open("/foo/bar", O_RDONLY)`

![[Reading a File.png]]
- Inode has a field that indicates when it was lasted accessed so every `read` will also update teh inode
### `write()`

Assumes we allocate a new data block.

![[Writing to Disk.png]]
## Data and Inode Placement

The original Unix FS had two placement problems:
1. Data blocks allocated randomly in aging file systems
2. Inodes are allocated far from blocks
	1. All inodes at the beginning of disk are far from data
	2. Lots of file ops require going back and forth from inodes to data blocks

*These cause many long seeks.*
### Cylinder Groups 

**BSD Fast File System (FFS)** addressed placement problems using the notion of a cylinder group.

We put things that are frequently accessed together into the same cylinder group. **The main idea is just clustering**. 
- If you look at inode, you'll probably look at the file data too. So let's keep both in the same cylinder. Similarly let's also try and keep all inodes in a dir in the same cylinder group.
#### Mechanics

-  Disk partitioned into groups of cylinders 
- Data blocks in same file allocated in same cylinder group 
- Files in same directory allocated in same cylinder group
- Inodes for files allocated in same cylinder group as file data blocks

![[Cylinder Groups.png]]
- Gray is bitmaps
- Red is inodes
- Blue is data blocks