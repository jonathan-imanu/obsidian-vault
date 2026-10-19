## The Crash Consistency Problem

We don't ever want the system being in an inconsistent state if the system crashes. 

Recall that writing a new data block to a file causes updates to the data bitmap, the inode and the data blocks. If a crash occurs, we could have inconsistent state if:
- Inode is updated but the data block write failed so user sees garbage
- Bitmap is updated but data block isn't so we have a space leak
- Inode and data block are updated by bitmap so some data could be silently rewritten

### What does this happen?

Because these operations aren't atomic! This is hard though: 
- Disks only say that the will commit one sector write at a time
- Crashes or power loss could occur between these updates

There are two solutions:
1. File system checker (`fsck`)
2. Journaling

# File System Checker (`fsck`)

A Unix tool for finding inconsistencies and repair them. Check super block, free block, Inode state, etc. for inconsistencies.

For example:
- Scan all inodes + indirect blocks and check their pointers 
- Compare pointers against allocation bit map: 
	- If a pointer points to a block make sure bitmap marks it as allocated 
	- If not, set bit in bitmap
### Limitations

- There are problems that it can't fix.
	- For ex, inode links.
- There are problems that it can't detect.
- Super complex and internal semantics are tightly coupled to filesystem internals
- Overly paranoid and expensive
- It can only really make the **file system metadata** internally consistent.
# Journaling (WAL)

**Idea**: Before doing any update, we record what we intend to do. If a crash happens while doing the update, check our journal!

![[Journal Disk Layout.png]]
- Ext2 is just the Cylinder group stuff in Lecture 10

## The Process

#### 1. Journal Write

Write the transaction to the log and wait for these writes to complete.

A transaction contains:
- TxB: Transaction begin block
- metadata + data. This is the exact content of the blocks themselves and is called **physical logging**.
- TxE 
#### 2. Journal Commit

Write the transaction commit block. 
- This is the checksum computed over all block pending data
#### 3. Checkpoint

Only once this transaction is on disk, do we update the actual underlying data structures. 

Now write the pending metadata and data updates to their final locations.
- This is called **checkpointing**

Update the journal superblock to mark that this transaction has been checkpointed.
#### 4. Free

##### Idea

We only have finite space.

Once a transaction has been checkpointed, we don't need them anymore!

So treat the journal as a circular data structure.

The journal has a super block that keeps track of oldest and newest **not-checkpointed** transaction in the log. 

##### The Actual Step

Some time after checkpoint, mark the transaction as free in the journal by updating the superblock.
## Crash Recovery

#### Case 1: Transaction has been fully written to journal but before checkpoint

We can recover the update by:
- Scanning the journal for all **complete** transactions
- Replaying each transaction
#### Case 2: Transaction is missing TxE

Ignore the transaction.
### The Potential Case 3: Transaction has TxE but is Missing Data

**How can this happen?**

Remember disk writes can happen in any order! 

So if we attempt to write (TxB, pending data, TxE) it's completely within the realm of possibly for the pending data reflected in the journal to be incomplete if a crash happened in the middle.
##### **How to fix this problem?**

*Idea 1*: For each piece of the pending data, write it then call `sync()`
- This is super slow and breaks the sequentiality of writes!

*Idea 2*: If a transaction is complete, it should be correct.

Can accomplish by breaking up the transaction into two steps:
1. Write everything except the `TxE`
2. Write the `TxE`
##### The chosen solution

Compute a checksum over all 5 blocks and log checksum with TxB and TxE.
- During replay, validate the transaction content and check completeness by computing the checksum.
## Batching Log Updates

An optimization. 

To reduce excessive write disk traffic, journaling has global transactions:
- Write the content of the global transaction forced by synchronous request. 
- Write the content of the global transaction after timeout of 5 seconds

**Having a global in-memory transaction means that we could lose a lot more when a crash happens!**
## Metadata / Ordered Journaling

We write every data block to disk twice.
- Commit to log
- Checkpoint to on-disk location
#### Idea

Don't write user data to the journal, write it before the transaction!
- So it only contains inode and bitmap updates.
### The Protocol

1. Data Write
2. Journal Metadata Write
3. Journal Commit
4. Checkpoint metadata 
5. Free
#### Why would anyone ever use regular journaling?

For overwrites!

Metadata journaling could write data to a file but then if a crash happens the inode metadata updates (the timestamp) won't be recorded. 

