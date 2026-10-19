## Verification vs Validation

### Verification

*"Are we building the product right?"*
### Validation

*"Are we building the right product?"*
# Types of Testing

## Black Box Testing

Designed solely based on the specifications of the unit without any knowledge of its internal workings.
### Equivalence Class Testing

A black box test technique in which test scales are designed to exercise one representative member of each partition. 
### Boundary Testing 

A technique where we test values of the edges or boundaries of equivalence ranges that are most likely to cause faults.
## White Box Testing

Takes advantage of knowledge of the internal structure of the unit being tested. Structural coverage can be used to quantify the thoroughness of testing. 
### Structural Coverage Strategies 

#### Definition use Coverage

A definition-use is defined with respect to some variables:
- **Def**: location where $v$ is defined
- **Use**: location where $v$ is used

Can be used to define different testing criteria such as:
- Use every def
- Execute every use
#### Logic Coverage

Predicate coverage
- The test set should make each predicate evaluate to true and false
Clause coverage
- The test set should make each clause evaluate to true and false
Active clause coverage 
- Similar to clause coverage with the extra requirement that the clause should determine the predicate
## Functional Testing

Testing this black box testing type is related to the functional requirements of a system
## Non-Functional Testing 

This is a type of software testing that checks non-functional aspects such as performance, usability, reliability of a software application is a great example of a non-functional test.
## Regression Testing

Whenever developers change or modify their software even a small change can have unexpected consequences regression testing involves testing existing software applications to ensure that a change or addition hasn't broken any existing functionality.

![[Smoke vs Sanity vs Regression.png]]
