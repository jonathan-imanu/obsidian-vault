## Service Oriented Architecture

An architectural style that supports service reusability, loose coupling and interoperability. Services expose well-defined interfaces over a network and communicate using standardized protocols and formats.
### Principles

- Loose Coupling – Services operate independently.
- Interoperability – Works across platforms.
- Reusability – Services can be reused across apps.
- Discoverability – Services registered and searchable.
- Abstraction – Service hides implementation details.
### High Level Architecture

- Service consumers call services through a service contract
- Services are exposed using endpoints
- Messaging occurs over standard protocols
### Enterprise Service Bus

A middleware that routes, transforms and mediates service messages. This helps with orchestration, security, monitoring and logging. This also enables centralized control.

![[Enterprise Service Bus.png]]
### SOA vs Microservice

**TLDR:** SOA's are older. They use heavier protocols (SOAP, XML) and are generally homogenous relying on enterprise stacks like .NET. They also rely on an ESB for routing and are co-deployed together. This makes independent scaling harder.
### Moving from SOA to Microservice

Identify domain boundaries, decompose coarse-grained services and gradually introduce REST/JSON or gRPC. 
## Microservices

An architectural style where applications are composed of small independent services where each service focuses on a single business capability. 
- These services communicate over lightweight protocols like REST, gRPC or messaging.
- Must be able to handle network failures and timeouts gracefully
### Characteristics

- Single responsibility
- Services can be deployed and updated independently
- Allows teams to choose tools and languages per service
- Fault isolation: A failure in one service doesn't bring down everything
## Event Driven Architecture

A design paradigm centered around events that promotes loose coupling and high scalability. 

**It enables asynchronous communication between components**
- Event producers can emit events without waiting and consumers can handle events at their own pace.
### What constitutes an event?

A significant state change. 
- Must be immutable and descriptive. 
- Contains metadata

They should be thought of a first class citizens that drive logic, workflows and data flows. They are stored, versioned and replayable.
- Central to system design NOT just a trigger
### Publisher & Event Broker

- Events are published to a topic/channel. 
- Multiple subscribers can receive these events. 

Middlewares like Kafka or RabbitMQ can handle delivery, retries and message durability.
## Event Sourcing and the CQRS Architecture

Used when:
- Asymmetry between read and writes
- Domain has complex logic and audit / traceability needs
- Eventual consistency is acceptable

![[CQRS.png]]

### Event Sourcing

State is rebuilt by replaying a sequence of past events that are immutable and append-only. The resulting **Event Log** is the source of truth. 
- It enables full audit trails and historical debugging as well as projections and rebuilding state.
#### What's a Projection?

Something that transforms events into queryable views. It can be rebuilt anytime by replaying events. Multiple projections can be derived from the same event stream.
### CQRS

Consists of:
1. Commands: write operations that change state
2. Queries: read operations without side effects

The separation of the two enables scalability and independent optimization.
#### Write Model

- Handles domain logic and business rules.
- Emits events upon state changes that are persisted in the event store.
- Commands are validated and processed synchronously
#### Read Model

- Built from projected events for fast querying
- Use optimized schemas
- Can have multiple views for different use cases
- Eventual consistency with write model
## Modularity

- Coupling: How well modules work together
- Cohesion: How well module meets a singly designed goal
## Encoding

Given a string, create a short yet unique key that is guaranteed to not collide with existing keys.
- *Example problem was designing a URL shortener*

Examples of encoding schemas include:
- Base 36
- Base 62
- Base 64
### Using a Hash Function

**Pros**:
1. Fast and cheap
2. URL can be hashed into fixed 128 bit string
**Cons**:
3. Something like MD5 hash function is cryptographically broken
4. Even using a better hash function, collisions are unavoidable
### Encoded Counter

Increase every time a new short link is created

**Pros**:
1. Creates unique and short keys for low count values
**Cons**:
2. No fixed length will slowly increase across requests
### Key Range

Generate 6 digit key before hand that's stored in the database:

**Pros**:
- Truely unique keys with no collision
**Cons**:
- Storage resource intensive.
## Misc.

**Data Consistency:** The data is consistent if it appears to be the same in all corresponding nodes at the same time.
**Latency**: The amount of time it takes for a single message to be delivered.