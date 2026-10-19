## Cloud Types

### Private / On-premises Cloud 

Owned and operated by a single organization and deployed within their data centers.
- Offers increased privacy, security and control

Best choice for strict compliance, security and data privacy requirements.
### Public Cloud

Provided by third-party service providers where computing resources are shared amongst users.
- Cost-effective, scalable and flexible

Providers manage infrastructure, maintenance, and updates
### Hybrid Cloud

A mix of both infrastructures that leverages the benefits of both
## Cloud Platforms - Hosting Models

### IaaS: Infra as a Service

### CaaS: Container as a Service

### PaaS: Platform as a Service

### FaaS: Functions a a Service

### SaaS: Software as a Service

### Serverless 

## Cloud Path of Legacy Applications

### Level 1: Infra-Ready Apps in the Cloud

Migrate or rehost on-premises apps to IaaS
### Level 2: Cloud-Enhanced Apps

Use modern cloud technologies and leverage cloud-managed services
### Level 3: Cloud-Native Apps

Transition to PaaS computing platforms. Implement cloud-native applications and microservices architecture. 
## Container Runtimes

What executes and manages containers. It provides the necessary environment to run containerized apps.
### containerd

Docker's container runtime, also operable independently. It's lightweight and
focuses on core container execution functionalities.
### CRI-O

Lightweight container runtime designed specifically for Kubernetes. Implements the
Kubernetes Container Runtime Interface (CRI), allowing Kubernetes to use any
OCI-compliant runtime.
### runc 

Low-level container runtime based on the Open Container Initiative (OCI) runtime
specification. It's the default runtime used by containerd and can also be used standalone
for running containers
