**CI:** Continuous Integration - Build, package and test applications automatically.
**CD:** Continuous Delivery - Automated deployment of software with little to no downtime for users.

**Pipelines**: The automated processes involved in building and deploying code. We can identify build issues by monitoring pipelines.
## Why CI/CD?

- Automation of the test build and deployment process
- Continuous feedback
- Early fault detection
- Improves team collaboration and system integration
# Deployment Patterns

## Blue / Green Deployment

A deployment scheme that allows for changes to be pushed while having no downtime for users. 

Traffic is routed to a container with the old code, while a new container is spun up with the new code. 

After building, the traffic rerouted and the old container can go down.
## Canary Deployment

Roll out changes to a small batch of users, receive and address feedback. Then roll out changes to the entire user base gradually.
## Ramped Deployment

Gradually changes the older version to the new version one instance at a time