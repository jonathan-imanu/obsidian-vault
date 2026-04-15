The fundamental structures of a software system and the discipline of creating such structures.

Key elements include:
- Components
- Connectors
- Configuration
- Constraints

![[Arch. Control Panel.png]]

The quality of an architecture can be determined via NFRS that define system behavior beyond just features. These NFRs have trade-offs meaning that improving one may weaken the other.
## Attributes of an Architecture
### Scalability

The ability to handle increased load without performance degradation.

There are two types:
1. Vertical scaling (scale-up): Increasing the size of an existing instance by increasing memory, CPU, etc.
2. Horizontal scaling (scale-out): Adding more instances 

We also have:
1. Read scalability: CDN, caching
2. Write scalability: DB partitioning / sharding
3. Elastic scalability: Auto-scaling on cloud
### Performance 

The speed at which a system processes requests. This includes latency, throughput  and load time. It can be optimized via caching, compression, indexing, etc.
### Availability

The uptime of a system (measured in 9s). Downtime can happen due to server crashes, DB failures and network outages.
### Maintainability

The ease of modifying the system with minimal risk. 
### Security

Protecting the system from unauthorized access and breaches.
## CAP Theorem

There are tradeoffs between the quality attributes of an architecture. The CAP theorem is a good example:

CAP: Consistency vs Availability vs Partition Tolerance ![[CAP.png]]
## The C4 Model Overview

C4 = Context, Container, Component, Code

Helps to visualize software at different levels of abstraction.

![[C4.png]]

**Context:** How the system fits into the environment
**Containers**: The major building blocks of your system
**Components**: The modules and components that exist inside a container
**Code**: A class diagram 
## Monolithic Architecture

A single, self-contained application where all functionality is in one tightly integrated codebase. This is deployed and run as one process.

Key characteristics:
- Tightly coupled components
- Shared memory and codebase
- Deployed as one unit
- Easy to develop early on
- Hard to scale selectively

Monoliths are deployed as a single artifact and scaling them may require duplicating the whole app. 

**Pros**:
- Ease of development (initially), deployment and testing
- Performant because there is no network overhead between modules
**Cons**:
- Hard to scale specific features
- Long build and development times
- Barrier to team scaling
- Small changes to a single layer or component require a full redeploy.
## Layered Architecture

A logical separation of concerns that is often used inside monolithic applications.
### 3 Tier vs N Tier

**3 Tier**: Presentation, Logic, Data
**N Tier**: Same logic but layers may be deployed separately

