![[Figure 1.4 Kubernetes Concepts.png]]

Some of the notes here are from *Kubernetes Patterns - Reusable Elements for Designing Cloud-Native Applications*.
# The Basic Primitives
## Pods

A Pod is an atomic unit of scheduling, deployment and runtime isolation for a group of containers. It is the smallest deployable unit. 
- All containers within a Pod are scheduled to the same host, deployed together and share filesystem, networking, etc.
- *Pods are ephemeral*
## Services

A primitive that binds service name to IP address and port number permanently. It exists because pods are ephemeral. 
- The named entry point for accessing an application
## Namespaces

A primitive for managing the resources themselves. 
- Have a staging and production namespace
# Patterns

## Controllers

Control loops that watch cluster state, by tracking at least one resource, and then take or request action. The goal of controllers is maintain the application at some target state. F
- A Job is an example of a built-in controller.
### Operators

A controller that uses a CRD to encapsulate operational knowledge for a specific application. 

Two types of CRDs; An Operator can act on multiple types.

- Installation CRDs: Handles installation of a CRD into the Kubernetes cluster
- Application CRDs
# Cluster Architecture

A Kubernetes cluster consists of a control plane plus a set of worker machines, called nodes, that run containerized applications. 
- Control Plane also runs on nodes of course. The placement of the control plane processes is determined at cluster bootstrap time.

![[K8s Cluster Arch..png]]
