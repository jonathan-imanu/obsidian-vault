An OSS systems monitoring and alerting toolkit.

![[Prometheus Arch..png]]
For a simplified mental model, just think of it as a scraping engine for metrics from instrumented applications and has a time-series database to store these metrics. It has PromQL (a DSL) so that this data can be exported accessed by data visualization applications (or anything that cares). 
