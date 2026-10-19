## UML

A common design language used to describe the structure and the behavior of software systems.

Primarily used for:
- helping devs communicate
- requirements analysis, specification and design
- generating code with tools
### Class Diagrams

Has three sections:
1. class name
2. attributes
3. operations
	1. if method has a return value add a colon after the closing parenthesis followed by the return type.

![[Class Diagram UML.png]]
- This diagram is missing the visibility of attributes and operations

Attributes and operations should also have their class visibility reflected before their name. 
Levels are as follows:
- `+` for public
- `-` for private
- `#` for protected
### Relationships

![[UML Relationships.png]]

**Association vs Aggregation**

Association means these objects are related somehow whereas aggregation means this object is made up of these parts.

**Composition**

Not class composition (the design principle). When the parts cannot exist without the whole, like rooms in a house.

**Generalization**

For child parent relationships, the parent is the generalized version of a child.
## Sequence Diagram

Describes the flow of logic in one particular scenario. The time sequence of the objects participating in the interaction.

![[Sequence Diagram.png]]
## Statechart Diagram

Describes the state changes of an object. There are three main components:
1. State: Represents the current condition of an object
2. Transition: Shows that an object switches state
3. Event: Triggers a transition

![[Statechart Diagram.png]]
# SOLID

## Single Responsibility Principle

## Open Closed Principle

Software entities should be open for extension but closed for modification.

**Closed for Modification**: To add new features we should not have to modify existing code
**Open for Extension**: We should be able to add new features to a software component

Following OCP makes it easy to add new features. Adhering to it often requires decoupling, which in turn, automatically follows SRP. 
- SOLID principles are intertwined and interdependent
- SOLID principles are more effective when combined together
## Liskov Substitution Principle

Objects should be replaceable with their subtypes without affecting the correctness of the program.

**Advantages**:
- Code that adheres to LSP is loosely dependent to each other and encourages code reusability
- Code that does not adhere to LSP is tightly coupled and creates unnecessary entanglements
## Interface Segregation Principle

No client should be forced to depend on methods it doesn't use.

To find violations:
- Fat interfaces with a large number of methods
- Low cohesion where different methods in the same interface have entirely different function

## Dependency Inversion Principle

High-level modules (business logic) should not depend on low-level modules (implementation details); both must depend on abstractions.