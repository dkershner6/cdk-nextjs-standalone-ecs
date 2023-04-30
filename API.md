# Next.js Standalone ECS Site

[NPM Package](https://www.npmjs.com/package/cdk-nextjs-standalone-ecs)

[![View on Construct Hub](https://constructs.dev/badge?package=cdk-nextjs-standalone-ecs)](https://constructs.dev/packages/cdk-nextjs-standalone-ecs)

_Have a very simple use case for Next.js? Perhaps akin to what you would use a SPA (single page app) for? Check out [cdk-nextjs-export-s3-dynamic-routing](https://constructs.dev/packages/cdk-nextjs-export-s3-dynamic-routing)._

Deploy a Next.js site to AWS ECS supporting all version 13 features, including properly functioning, efficient Incremental Static Regeneration and Image Optimization.

This construct employs AWS EFS to share the `.next` directory between containers, as is [recommended by Vercel](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#self-hosting-isr).

## Getting Started

A full example including custom domain, SSL, and Cloudfront is in the `/example` folder. This construct can also be used with only a VPC and ALB as well, with no caching or custom domain.

You can see the requirements for this construct there, but they are also spelled out in detail below.

The full API of this construct is available in the [API.md](API.md) file.

## Requirements

### next.config.?s

- `output` must be set to `standalone`. This is what Vercel recommends for Docker based deployments.
- `experimental.isrMemoryCacheSize` must be set to zero. Without this, you can get odd responses when using ISR and having multiple containers.

### Scripts

Some minimal scripts that handle moving files around when a new build is created are required. They are available in the `docker` folder.

### Dockerfile

The following should be inserted during the final steps, just after the standalone folder is copied.

```
# Additions from NextjsStandaloneEcsSite
# We use curl to run the health check on the container
RUN apk add --update curl
# Copy our scripts to the root of the container
COPY --from=builder --chown=nextjs:nodejs app/docker ./
# Move the build out of the way of our .next folder shared across containers
RUN mv ./.next ./.next.currentBuild
RUN mkdir -p ./.next
RUN chown nextjs:nodejs ./.next
# End additions from NextjsStandaloneEcsSite
```

In addition, the final line in the Dockerfile should be changed to:

```
ENTRYPOINT ["sh","./startup.sh"]
```

Instead of any CMD or existing ENTRYPOINT. You can add to startup.sh if you need to run additional commands before the container starts.

# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### NextjsStandaloneEcsSite <a name="NextjsStandaloneEcsSite" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSite"></a>

This is a standalone ECS site that uses Next.js and is deployed to AWS ECS.

It employs AWS EFS to share the `.next` directory between containers to facilitate proper Incremental Static Regeneration.

This construct can also be used with only a VPC and ALB, with no caching or custom domain, or behind a Route53 domain and Cloudfront.

#### Initializers <a name="Initializers" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSite.Initializer"></a>

```typescript
import { NextjsStandaloneEcsSite } from 'cdk-nextjs-standalone-ecs'

new NextjsStandaloneEcsSite(scope: Construct, id: string, props: NextjsStandaloneEcsSiteProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSite.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSite.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSite.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps">NextjsStandaloneEcsSiteProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSite.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSite.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSite.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps">NextjsStandaloneEcsSiteProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSite.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSite.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSite.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSite.isConstruct"></a>

```typescript
import { NextjsStandaloneEcsSite } from 'cdk-nextjs-standalone-ecs'

NextjsStandaloneEcsSite.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSite.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSite.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSite.property.cluster">cluster</a></code> | <code>aws-cdk-lib.aws_ecs.Cluster</code> | *No description.* |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSite.property.container">container</a></code> | <code>aws-cdk-lib.aws_ecs.ContainerDefinition</code> | *No description.* |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSite.property.fileSystem">fileSystem</a></code> | <code>aws-cdk-lib.aws_efs.FileSystem</code> | *No description.* |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSite.property.fileSystemAccessPoint">fileSystemAccessPoint</a></code> | <code>aws-cdk-lib.aws_efs.AccessPoint</code> | *No description.* |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSite.property.service">service</a></code> | <code>aws-cdk-lib.aws_ecs.FargateService</code> | *No description.* |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSite.property.taskDefinition">taskDefinition</a></code> | <code>aws-cdk-lib.aws_ecs.TaskDefinition</code> | *No description.* |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSite.property.volume">volume</a></code> | <code>aws-cdk-lib.aws_ecs.Volume</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSite.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `cluster`<sup>Required</sup> <a name="cluster" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSite.property.cluster"></a>

```typescript
public readonly cluster: Cluster;
```

- *Type:* aws-cdk-lib.aws_ecs.Cluster

---

##### `container`<sup>Required</sup> <a name="container" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSite.property.container"></a>

```typescript
public readonly container: ContainerDefinition;
```

- *Type:* aws-cdk-lib.aws_ecs.ContainerDefinition

---

##### `fileSystem`<sup>Required</sup> <a name="fileSystem" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSite.property.fileSystem"></a>

```typescript
public readonly fileSystem: FileSystem;
```

- *Type:* aws-cdk-lib.aws_efs.FileSystem

---

##### `fileSystemAccessPoint`<sup>Required</sup> <a name="fileSystemAccessPoint" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSite.property.fileSystemAccessPoint"></a>

```typescript
public readonly fileSystemAccessPoint: AccessPoint;
```

- *Type:* aws-cdk-lib.aws_efs.AccessPoint

---

##### `service`<sup>Required</sup> <a name="service" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSite.property.service"></a>

```typescript
public readonly service: FargateService;
```

- *Type:* aws-cdk-lib.aws_ecs.FargateService

---

##### `taskDefinition`<sup>Required</sup> <a name="taskDefinition" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSite.property.taskDefinition"></a>

```typescript
public readonly taskDefinition: TaskDefinition;
```

- *Type:* aws-cdk-lib.aws_ecs.TaskDefinition

---

##### `volume`<sup>Required</sup> <a name="volume" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSite.property.volume"></a>

```typescript
public readonly volume: Volume;
```

- *Type:* aws-cdk-lib.aws_ecs.Volume

---

#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSite.property.RECOMMENDED_CACHE_POLICY">RECOMMENDED_CACHE_POLICY</a></code> | <code>aws-cdk-lib.aws_cloudfront.CachePolicyProps</code> | Included for convenience, this cache policy is very similar to Amplify's cache policy, but with a higher maxTtl. |

---

##### `RECOMMENDED_CACHE_POLICY`<sup>Required</sup> <a name="RECOMMENDED_CACHE_POLICY" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSite.property.RECOMMENDED_CACHE_POLICY"></a>

```typescript
public readonly RECOMMENDED_CACHE_POLICY: CachePolicyProps;
```

- *Type:* aws-cdk-lib.aws_cloudfront.CachePolicyProps

Included for convenience, this cache policy is very similar to Amplify's cache policy, but with a higher maxTtl.

---

## Structs <a name="Structs" id="Structs"></a>

### NextjsStandaloneEcsBaseServiceOptions <a name="NextjsStandaloneEcsBaseServiceOptions" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsBaseServiceOptions"></a>

ecs.BaseServiceOptions Omit cluster.

#### Initializer <a name="Initializer" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsBaseServiceOptions.Initializer"></a>

```typescript
import { NextjsStandaloneEcsBaseServiceOptions } from 'cdk-nextjs-standalone-ecs'

const nextjsStandaloneEcsBaseServiceOptions: NextjsStandaloneEcsBaseServiceOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsBaseServiceOptions.property.capacityProviderStrategies">capacityProviderStrategies</a></code> | <code>aws-cdk-lib.aws_ecs.CapacityProviderStrategy[]</code> | A list of Capacity Provider strategies used to place a service. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsBaseServiceOptions.property.circuitBreaker">circuitBreaker</a></code> | <code>aws-cdk-lib.aws_ecs.DeploymentCircuitBreaker</code> | Whether to enable the deployment circuit breaker. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsBaseServiceOptions.property.cloudMapOptions">cloudMapOptions</a></code> | <code>aws-cdk-lib.aws_ecs.CloudMapOptions</code> | The options for configuring an Amazon ECS service to use service discovery. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsBaseServiceOptions.property.deploymentController">deploymentController</a></code> | <code>aws-cdk-lib.aws_ecs.DeploymentController</code> | Specifies which deployment controller to use for the service. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsBaseServiceOptions.property.desiredCount">desiredCount</a></code> | <code>number</code> | The desired number of instantiations of the task definition to keep running on the service. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsBaseServiceOptions.property.enableECSManagedTags">enableECSManagedTags</a></code> | <code>boolean</code> | Specifies whether to enable Amazon ECS managed tags for the tasks within the service. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsBaseServiceOptions.property.enableExecuteCommand">enableExecuteCommand</a></code> | <code>boolean</code> | Whether to enable the ability to execute into a container. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsBaseServiceOptions.property.healthCheckGracePeriod">healthCheckGracePeriod</a></code> | <code>aws-cdk-lib.Duration</code> | The period of time, in seconds, that the Amazon ECS service scheduler ignores unhealthy Elastic Load Balancing target health checks after a task has first started. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsBaseServiceOptions.property.maxHealthyPercent">maxHealthyPercent</a></code> | <code>number</code> | The maximum number of tasks, specified as a percentage of the Amazon ECS service's DesiredCount value, that can run in a service during a deployment. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsBaseServiceOptions.property.minHealthyPercent">minHealthyPercent</a></code> | <code>number</code> | The minimum number of tasks, specified as a percentage of the Amazon ECS service's DesiredCount value, that must continue to run and remain healthy during a deployment. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsBaseServiceOptions.property.propagateTags">propagateTags</a></code> | <code>aws-cdk-lib.aws_ecs.PropagatedTagSource</code> | Specifies whether to propagate the tags from the task definition or the service to the tasks in the service. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsBaseServiceOptions.property.serviceConnectConfiguration">serviceConnectConfiguration</a></code> | <code>aws-cdk-lib.aws_ecs.ServiceConnectProps</code> | Configuration for Service Connect. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsBaseServiceOptions.property.serviceName">serviceName</a></code> | <code>string</code> | The name of the service. |

---

##### `capacityProviderStrategies`<sup>Optional</sup> <a name="capacityProviderStrategies" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsBaseServiceOptions.property.capacityProviderStrategies"></a>

```typescript
public readonly capacityProviderStrategies: CapacityProviderStrategy[];
```

- *Type:* aws-cdk-lib.aws_ecs.CapacityProviderStrategy[]
- *Default:* undefined

A list of Capacity Provider strategies used to place a service.

---

##### `circuitBreaker`<sup>Optional</sup> <a name="circuitBreaker" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsBaseServiceOptions.property.circuitBreaker"></a>

```typescript
public readonly circuitBreaker: DeploymentCircuitBreaker;
```

- *Type:* aws-cdk-lib.aws_ecs.DeploymentCircuitBreaker
- *Default:* disabled

Whether to enable the deployment circuit breaker.

If this property is defined, circuit breaker will be implicitly
enabled.

---

##### `cloudMapOptions`<sup>Optional</sup> <a name="cloudMapOptions" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsBaseServiceOptions.property.cloudMapOptions"></a>

```typescript
public readonly cloudMapOptions: CloudMapOptions;
```

- *Type:* aws-cdk-lib.aws_ecs.CloudMapOptions
- *Default:* AWS Cloud Map service discovery is not enabled.

The options for configuring an Amazon ECS service to use service discovery.

---

##### `deploymentController`<sup>Optional</sup> <a name="deploymentController" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsBaseServiceOptions.property.deploymentController"></a>

```typescript
public readonly deploymentController: DeploymentController;
```

- *Type:* aws-cdk-lib.aws_ecs.DeploymentController
- *Default:* Rolling update (ECS)

Specifies which deployment controller to use for the service.

For more information, see
[Amazon ECS Deployment Types](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-types.html)

---

##### `desiredCount`<sup>Optional</sup> <a name="desiredCount" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsBaseServiceOptions.property.desiredCount"></a>

```typescript
public readonly desiredCount: number;
```

- *Type:* number
- *Default:* When creating the service, default is 1; when updating the service, default uses the current task number.

The desired number of instantiations of the task definition to keep running on the service.

---

##### `enableECSManagedTags`<sup>Optional</sup> <a name="enableECSManagedTags" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsBaseServiceOptions.property.enableECSManagedTags"></a>

```typescript
public readonly enableECSManagedTags: boolean;
```

- *Type:* boolean
- *Default:* false

Specifies whether to enable Amazon ECS managed tags for the tasks within the service.

For more information, see
[Tagging Your Amazon ECS Resources](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-using-tags.html)

---

##### `enableExecuteCommand`<sup>Optional</sup> <a name="enableExecuteCommand" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsBaseServiceOptions.property.enableExecuteCommand"></a>

```typescript
public readonly enableExecuteCommand: boolean;
```

- *Type:* boolean
- *Default:* undefined

Whether to enable the ability to execute into a container.

---

##### `healthCheckGracePeriod`<sup>Optional</sup> <a name="healthCheckGracePeriod" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsBaseServiceOptions.property.healthCheckGracePeriod"></a>

```typescript
public readonly healthCheckGracePeriod: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* defaults to 60 seconds if at least one load balancer is in-use and it is not already set

The period of time, in seconds, that the Amazon ECS service scheduler ignores unhealthy Elastic Load Balancing target health checks after a task has first started.

---

##### `maxHealthyPercent`<sup>Optional</sup> <a name="maxHealthyPercent" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsBaseServiceOptions.property.maxHealthyPercent"></a>

```typescript
public readonly maxHealthyPercent: number;
```

- *Type:* number
- *Default:* 100 if daemon, otherwise 200

The maximum number of tasks, specified as a percentage of the Amazon ECS service's DesiredCount value, that can run in a service during a deployment.

---

##### `minHealthyPercent`<sup>Optional</sup> <a name="minHealthyPercent" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsBaseServiceOptions.property.minHealthyPercent"></a>

```typescript
public readonly minHealthyPercent: number;
```

- *Type:* number
- *Default:* 0 if daemon, otherwise 50

The minimum number of tasks, specified as a percentage of the Amazon ECS service's DesiredCount value, that must continue to run and remain healthy during a deployment.

---

##### `propagateTags`<sup>Optional</sup> <a name="propagateTags" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsBaseServiceOptions.property.propagateTags"></a>

```typescript
public readonly propagateTags: PropagatedTagSource;
```

- *Type:* aws-cdk-lib.aws_ecs.PropagatedTagSource
- *Default:* PropagatedTagSource.NONE

Specifies whether to propagate the tags from the task definition or the service to the tasks in the service.

Valid values are: PropagatedTagSource.SERVICE, PropagatedTagSource.TASK_DEFINITION or PropagatedTagSource.NONE

---

##### `serviceConnectConfiguration`<sup>Optional</sup> <a name="serviceConnectConfiguration" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsBaseServiceOptions.property.serviceConnectConfiguration"></a>

```typescript
public readonly serviceConnectConfiguration: ServiceConnectProps;
```

- *Type:* aws-cdk-lib.aws_ecs.ServiceConnectProps
- *Default:* No ports are advertised via Service Connect on this service, and the service cannot make requests to other services via Service Connect.

Configuration for Service Connect.

---

##### `serviceName`<sup>Optional</sup> <a name="serviceName" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsBaseServiceOptions.property.serviceName"></a>

```typescript
public readonly serviceName: string;
```

- *Type:* string
- *Default:* CloudFormation-generated name.

The name of the service.

---

### NextjsStandaloneEcsClusterProps <a name="NextjsStandaloneEcsClusterProps" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsClusterProps"></a>

ecs.ClusterProps Omit vpc.

#### Initializer <a name="Initializer" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsClusterProps.Initializer"></a>

```typescript
import { NextjsStandaloneEcsClusterProps } from 'cdk-nextjs-standalone-ecs'

const nextjsStandaloneEcsClusterProps: NextjsStandaloneEcsClusterProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsClusterProps.property.capacity">capacity</a></code> | <code>aws-cdk-lib.aws_ecs.AddCapacityOptions</code> | The ec2 capacity to add to the cluster. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsClusterProps.property.clusterName">clusterName</a></code> | <code>string</code> | The name for the cluster. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsClusterProps.property.containerInsights">containerInsights</a></code> | <code>boolean</code> | If true CloudWatch Container Insights will be enabled for the cluster. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsClusterProps.property.defaultCloudMapNamespace">defaultCloudMapNamespace</a></code> | <code>aws-cdk-lib.aws_ecs.CloudMapNamespaceOptions</code> | The service discovery namespace created in this cluster. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsClusterProps.property.enableFargateCapacityProviders">enableFargateCapacityProviders</a></code> | <code>boolean</code> | Whether to enable Fargate Capacity Providers. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsClusterProps.property.executeCommandConfiguration">executeCommandConfiguration</a></code> | <code>aws-cdk-lib.aws_ecs.ExecuteCommandConfiguration</code> | The execute command configuration for the cluster. |

---

##### `capacity`<sup>Optional</sup> <a name="capacity" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsClusterProps.property.capacity"></a>

```typescript
public readonly capacity: AddCapacityOptions;
```

- *Type:* aws-cdk-lib.aws_ecs.AddCapacityOptions
- *Default:* no EC2 capacity will be added, you can use `addCapacity` to add capacity later.

The ec2 capacity to add to the cluster.

---

##### `clusterName`<sup>Optional</sup> <a name="clusterName" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsClusterProps.property.clusterName"></a>

```typescript
public readonly clusterName: string;
```

- *Type:* string
- *Default:* CloudFormation-generated name

The name for the cluster.

---

##### `containerInsights`<sup>Optional</sup> <a name="containerInsights" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsClusterProps.property.containerInsights"></a>

```typescript
public readonly containerInsights: boolean;
```

- *Type:* boolean
- *Default:* Container Insights will be disabled for this cluster.

If true CloudWatch Container Insights will be enabled for the cluster.

---

##### `defaultCloudMapNamespace`<sup>Optional</sup> <a name="defaultCloudMapNamespace" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsClusterProps.property.defaultCloudMapNamespace"></a>

```typescript
public readonly defaultCloudMapNamespace: CloudMapNamespaceOptions;
```

- *Type:* aws-cdk-lib.aws_ecs.CloudMapNamespaceOptions
- *Default:* no service discovery namespace created, you can use `addDefaultCloudMapNamespace` to add a default service discovery namespace later.

The service discovery namespace created in this cluster.

---

##### `enableFargateCapacityProviders`<sup>Optional</sup> <a name="enableFargateCapacityProviders" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsClusterProps.property.enableFargateCapacityProviders"></a>

```typescript
public readonly enableFargateCapacityProviders: boolean;
```

- *Type:* boolean
- *Default:* false

Whether to enable Fargate Capacity Providers.

---

##### `executeCommandConfiguration`<sup>Optional</sup> <a name="executeCommandConfiguration" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsClusterProps.property.executeCommandConfiguration"></a>

```typescript
public readonly executeCommandConfiguration: ExecuteCommandConfiguration;
```

- *Type:* aws-cdk-lib.aws_ecs.ExecuteCommandConfiguration
- *Default:* no configuration will be provided.

The execute command configuration for the cluster.

---

### NextjsStandaloneEcsContainerDefinitionOptions <a name="NextjsStandaloneEcsContainerDefinitionOptions" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions"></a>

ecs.ContainerDefinitionOptions Omit image.

#### Initializer <a name="Initializer" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.Initializer"></a>

```typescript
import { NextjsStandaloneEcsContainerDefinitionOptions } from 'cdk-nextjs-standalone-ecs'

const nextjsStandaloneEcsContainerDefinitionOptions: NextjsStandaloneEcsContainerDefinitionOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.command">command</a></code> | <code>string[]</code> | The command that is passed to the container. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.containerName">containerName</a></code> | <code>string</code> | The name of the container. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.cpu">cpu</a></code> | <code>number</code> | The minimum number of CPU units to reserve for the container. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.disableNetworking">disableNetworking</a></code> | <code>boolean</code> | Specifies whether networking is disabled within the container. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.dnsSearchDomains">dnsSearchDomains</a></code> | <code>string[]</code> | A list of DNS search domains that are presented to the container. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.dnsServers">dnsServers</a></code> | <code>string[]</code> | A list of DNS servers that are presented to the container. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.dockerLabels">dockerLabels</a></code> | <code>{[ key: string ]: string}</code> | A key/value map of labels to add to the container. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.dockerSecurityOptions">dockerSecurityOptions</a></code> | <code>string[]</code> | A list of strings to provide custom labels for SELinux and AppArmor multi-level security systems. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.entryPoint">entryPoint</a></code> | <code>string[]</code> | The ENTRYPOINT value to pass to the container. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.environment">environment</a></code> | <code>{[ key: string ]: string}</code> | The environment variables to pass to the container. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.environmentFiles">environmentFiles</a></code> | <code>aws-cdk-lib.aws_ecs.EnvironmentFile[]</code> | The environment files to pass to the container. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.essential">essential</a></code> | <code>boolean</code> | Specifies whether the container is marked essential. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.extraHosts">extraHosts</a></code> | <code>{[ key: string ]: string}</code> | A list of hostnames and IP address mappings to append to the /etc/hosts file on the container. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.gpuCount">gpuCount</a></code> | <code>number</code> | The number of GPUs assigned to the container. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.healthCheck">healthCheck</a></code> | <code>aws-cdk-lib.aws_ecs.HealthCheck</code> | The health check command and associated configuration parameters for the container. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.hostname">hostname</a></code> | <code>string</code> | The hostname to use for your container. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.inferenceAcceleratorResources">inferenceAcceleratorResources</a></code> | <code>string[]</code> | The inference accelerators referenced by the container. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.linuxParameters">linuxParameters</a></code> | <code>aws-cdk-lib.aws_ecs.LinuxParameters</code> | Linux-specific modifications that are applied to the container, such as Linux kernel capabilities. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.logging">logging</a></code> | <code>aws-cdk-lib.aws_ecs.LogDriver</code> | The log configuration specification for the container. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.memoryLimitMiB">memoryLimitMiB</a></code> | <code>number</code> | The amount (in MiB) of memory to present to the container. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.memoryReservationMiB">memoryReservationMiB</a></code> | <code>number</code> | The soft limit (in MiB) of memory to reserve for the container. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.portMappings">portMappings</a></code> | <code>aws-cdk-lib.aws_ecs.PortMapping[]</code> | The port mappings to add to the container definition. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.privileged">privileged</a></code> | <code>boolean</code> | Specifies whether the container is marked as privileged. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.pseudoTerminal">pseudoTerminal</a></code> | <code>boolean</code> | When this parameter is true, a TTY is allocated. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.readonlyRootFilesystem">readonlyRootFilesystem</a></code> | <code>boolean</code> | When this parameter is true, the container is given read-only access to its root file system. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.secrets">secrets</a></code> | <code>{[ key: string ]: aws-cdk-lib.aws_ecs.Secret}</code> | The secret environment variables to pass to the container. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.startTimeout">startTimeout</a></code> | <code>aws-cdk-lib.Duration</code> | Time duration (in seconds) to wait before giving up on resolving dependencies for a container. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.stopTimeout">stopTimeout</a></code> | <code>aws-cdk-lib.Duration</code> | Time duration (in seconds) to wait before the container is forcefully killed if it doesn't exit normally on its own. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.systemControls">systemControls</a></code> | <code>aws-cdk-lib.aws_ecs.SystemControl[]</code> | A list of namespaced kernel parameters to set in the container. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.ulimits">ulimits</a></code> | <code>aws-cdk-lib.aws_ecs.Ulimit[]</code> | An array of ulimits to set in the container. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.user">user</a></code> | <code>string</code> | The user name to use inside the container. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.workingDirectory">workingDirectory</a></code> | <code>string</code> | The working directory in which to run commands inside the container. |

---

##### `command`<sup>Optional</sup> <a name="command" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.command"></a>

```typescript
public readonly command: string[];
```

- *Type:* string[]
- *Default:* CMD value built into container image.

The command that is passed to the container.

If you provide a shell command as a single string, you have to quote command-line arguments.

---

##### `containerName`<sup>Optional</sup> <a name="containerName" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.containerName"></a>

```typescript
public readonly containerName: string;
```

- *Type:* string
- *Default:* id of node associated with ContainerDefinition.

The name of the container.

---

##### `cpu`<sup>Optional</sup> <a name="cpu" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.cpu"></a>

```typescript
public readonly cpu: number;
```

- *Type:* number
- *Default:* No minimum CPU units reserved.

The minimum number of CPU units to reserve for the container.

---

##### `disableNetworking`<sup>Optional</sup> <a name="disableNetworking" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.disableNetworking"></a>

```typescript
public readonly disableNetworking: boolean;
```

- *Type:* boolean
- *Default:* false

Specifies whether networking is disabled within the container.

When this parameter is true, networking is disabled within the container.

---

##### `dnsSearchDomains`<sup>Optional</sup> <a name="dnsSearchDomains" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.dnsSearchDomains"></a>

```typescript
public readonly dnsSearchDomains: string[];
```

- *Type:* string[]
- *Default:* No search domains.

A list of DNS search domains that are presented to the container.

---

##### `dnsServers`<sup>Optional</sup> <a name="dnsServers" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.dnsServers"></a>

```typescript
public readonly dnsServers: string[];
```

- *Type:* string[]
- *Default:* Default DNS servers.

A list of DNS servers that are presented to the container.

---

##### `dockerLabels`<sup>Optional</sup> <a name="dockerLabels" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.dockerLabels"></a>

```typescript
public readonly dockerLabels: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* No labels.

A key/value map of labels to add to the container.

---

##### `dockerSecurityOptions`<sup>Optional</sup> <a name="dockerSecurityOptions" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.dockerSecurityOptions"></a>

```typescript
public readonly dockerSecurityOptions: string[];
```

- *Type:* string[]
- *Default:* No security labels.

A list of strings to provide custom labels for SELinux and AppArmor multi-level security systems.

---

##### `entryPoint`<sup>Optional</sup> <a name="entryPoint" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.entryPoint"></a>

```typescript
public readonly entryPoint: string[];
```

- *Type:* string[]
- *Default:* Entry point configured in container.

The ENTRYPOINT value to pass to the container.

> [https://docs.docker.com/engine/reference/builder/#entrypoint](https://docs.docker.com/engine/reference/builder/#entrypoint)

---

##### `environment`<sup>Optional</sup> <a name="environment" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.environment"></a>

```typescript
public readonly environment: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* No environment variables.

The environment variables to pass to the container.

---

##### `environmentFiles`<sup>Optional</sup> <a name="environmentFiles" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.environmentFiles"></a>

```typescript
public readonly environmentFiles: EnvironmentFile[];
```

- *Type:* aws-cdk-lib.aws_ecs.EnvironmentFile[]
- *Default:* No environment files.

The environment files to pass to the container.

> [https://docs.aws.amazon.com/AmazonECS/latest/developerguide/taskdef-envfiles.html](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/taskdef-envfiles.html)

---

##### `essential`<sup>Optional</sup> <a name="essential" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.essential"></a>

```typescript
public readonly essential: boolean;
```

- *Type:* boolean
- *Default:* true

Specifies whether the container is marked essential.

If the essential parameter of a container is marked as true, and that container fails
or stops for any reason, all other containers that are part of the task are stopped.
If the essential parameter of a container is marked as false, then its failure does not
affect the rest of the containers in a task. All tasks must have at least one essential container.

If this parameter is omitted, a container is assumed to be essential.

---

##### `extraHosts`<sup>Optional</sup> <a name="extraHosts" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.extraHosts"></a>

```typescript
public readonly extraHosts: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* No extra hosts.

A list of hostnames and IP address mappings to append to the /etc/hosts file on the container.

---

##### `gpuCount`<sup>Optional</sup> <a name="gpuCount" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.gpuCount"></a>

```typescript
public readonly gpuCount: number;
```

- *Type:* number
- *Default:* No GPUs assigned.

The number of GPUs assigned to the container.

---

##### `healthCheck`<sup>Optional</sup> <a name="healthCheck" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.healthCheck"></a>

```typescript
public readonly healthCheck: HealthCheck;
```

- *Type:* aws-cdk-lib.aws_ecs.HealthCheck
- *Default:* Health check configuration from container.

The health check command and associated configuration parameters for the container.

---

##### `hostname`<sup>Optional</sup> <a name="hostname" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.hostname"></a>

```typescript
public readonly hostname: string;
```

- *Type:* string
- *Default:* Automatic hostname.

The hostname to use for your container.

---

##### `inferenceAcceleratorResources`<sup>Optional</sup> <a name="inferenceAcceleratorResources" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.inferenceAcceleratorResources"></a>

```typescript
public readonly inferenceAcceleratorResources: string[];
```

- *Type:* string[]
- *Default:* No inference accelerators assigned.

The inference accelerators referenced by the container.

---

##### `linuxParameters`<sup>Optional</sup> <a name="linuxParameters" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.linuxParameters"></a>

```typescript
public readonly linuxParameters: LinuxParameters;
```

- *Type:* aws-cdk-lib.aws_ecs.LinuxParameters
- *Default:* No Linux parameters.

Linux-specific modifications that are applied to the container, such as Linux kernel capabilities.

For more information see [KernelCapabilities](https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_KernelCapabilities.html).

---

##### `logging`<sup>Optional</sup> <a name="logging" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.logging"></a>

```typescript
public readonly logging: LogDriver;
```

- *Type:* aws-cdk-lib.aws_ecs.LogDriver
- *Default:* Containers use the same logging driver that the Docker daemon uses.

The log configuration specification for the container.

---

##### `memoryLimitMiB`<sup>Optional</sup> <a name="memoryLimitMiB" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.memoryLimitMiB"></a>

```typescript
public readonly memoryLimitMiB: number;
```

- *Type:* number
- *Default:* No memory limit.

The amount (in MiB) of memory to present to the container.

If your container attempts to exceed the allocated memory, the container
is terminated.

At least one of memoryLimitMiB and memoryReservationMiB is required for non-Fargate services.

---

##### `memoryReservationMiB`<sup>Optional</sup> <a name="memoryReservationMiB" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.memoryReservationMiB"></a>

```typescript
public readonly memoryReservationMiB: number;
```

- *Type:* number
- *Default:* No memory reserved.

The soft limit (in MiB) of memory to reserve for the container.

When system memory is under heavy contention, Docker attempts to keep the
container memory to this soft limit. However, your container can consume more
memory when it needs to, up to either the hard limit specified with the memory
parameter (if applicable), or all of the available memory on the container
instance, whichever comes first.

At least one of memoryLimitMiB and memoryReservationMiB is required for non-Fargate services.

---

##### `portMappings`<sup>Optional</sup> <a name="portMappings" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.portMappings"></a>

```typescript
public readonly portMappings: PortMapping[];
```

- *Type:* aws-cdk-lib.aws_ecs.PortMapping[]
- *Default:* No ports are mapped.

The port mappings to add to the container definition.

---

##### `privileged`<sup>Optional</sup> <a name="privileged" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.privileged"></a>

```typescript
public readonly privileged: boolean;
```

- *Type:* boolean
- *Default:* false

Specifies whether the container is marked as privileged.

When this parameter is true, the container is given elevated privileges on the host container instance (similar to the root user).

---

##### `pseudoTerminal`<sup>Optional</sup> <a name="pseudoTerminal" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.pseudoTerminal"></a>

```typescript
public readonly pseudoTerminal: boolean;
```

- *Type:* boolean
- *Default:* false

When this parameter is true, a TTY is allocated.

This parameter maps to Tty in the "Create a container section" of the
Docker Remote API and the --tty option to `docker run`.

> [https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#container_definition_pseudoterminal](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#container_definition_pseudoterminal)

---

##### `readonlyRootFilesystem`<sup>Optional</sup> <a name="readonlyRootFilesystem" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.readonlyRootFilesystem"></a>

```typescript
public readonly readonlyRootFilesystem: boolean;
```

- *Type:* boolean
- *Default:* false

When this parameter is true, the container is given read-only access to its root file system.

---

##### `secrets`<sup>Optional</sup> <a name="secrets" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.secrets"></a>

```typescript
public readonly secrets: {[ key: string ]: Secret};
```

- *Type:* {[ key: string ]: aws-cdk-lib.aws_ecs.Secret}
- *Default:* No secret environment variables.

The secret environment variables to pass to the container.

---

##### `startTimeout`<sup>Optional</sup> <a name="startTimeout" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.startTimeout"></a>

```typescript
public readonly startTimeout: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* none

Time duration (in seconds) to wait before giving up on resolving dependencies for a container.

---

##### `stopTimeout`<sup>Optional</sup> <a name="stopTimeout" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.stopTimeout"></a>

```typescript
public readonly stopTimeout: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* none

Time duration (in seconds) to wait before the container is forcefully killed if it doesn't exit normally on its own.

---

##### `systemControls`<sup>Optional</sup> <a name="systemControls" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.systemControls"></a>

```typescript
public readonly systemControls: SystemControl[];
```

- *Type:* aws-cdk-lib.aws_ecs.SystemControl[]
- *Default:* No system controls are set.

A list of namespaced kernel parameters to set in the container.

> [https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#container_definition_systemcontrols](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#container_definition_systemcontrols)

---

##### `ulimits`<sup>Optional</sup> <a name="ulimits" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.ulimits"></a>

```typescript
public readonly ulimits: Ulimit[];
```

- *Type:* aws-cdk-lib.aws_ecs.Ulimit[]

An array of ulimits to set in the container.

---

##### `user`<sup>Optional</sup> <a name="user" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.user"></a>

```typescript
public readonly user: string;
```

- *Type:* string
- *Default:* root

The user name to use inside the container.

---

##### `workingDirectory`<sup>Optional</sup> <a name="workingDirectory" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions.property.workingDirectory"></a>

```typescript
public readonly workingDirectory: string;
```

- *Type:* string
- *Default:* /

The working directory in which to run commands inside the container.

---

### NextjsStandaloneEcsFargateServiceProps <a name="NextjsStandaloneEcsFargateServiceProps" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFargateServiceProps"></a>

ecs.FargateServiceProps Omit taskDefinition.

#### Initializer <a name="Initializer" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFargateServiceProps.Initializer"></a>

```typescript
import { NextjsStandaloneEcsFargateServiceProps } from 'cdk-nextjs-standalone-ecs'

const nextjsStandaloneEcsFargateServiceProps: NextjsStandaloneEcsFargateServiceProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFargateServiceProps.property.capacityProviderStrategies">capacityProviderStrategies</a></code> | <code>aws-cdk-lib.aws_ecs.CapacityProviderStrategy[]</code> | A list of Capacity Provider strategies used to place a service. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFargateServiceProps.property.circuitBreaker">circuitBreaker</a></code> | <code>aws-cdk-lib.aws_ecs.DeploymentCircuitBreaker</code> | Whether to enable the deployment circuit breaker. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFargateServiceProps.property.cloudMapOptions">cloudMapOptions</a></code> | <code>aws-cdk-lib.aws_ecs.CloudMapOptions</code> | The options for configuring an Amazon ECS service to use service discovery. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFargateServiceProps.property.deploymentController">deploymentController</a></code> | <code>aws-cdk-lib.aws_ecs.DeploymentController</code> | Specifies which deployment controller to use for the service. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFargateServiceProps.property.desiredCount">desiredCount</a></code> | <code>number</code> | The desired number of instantiations of the task definition to keep running on the service. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFargateServiceProps.property.enableECSManagedTags">enableECSManagedTags</a></code> | <code>boolean</code> | Specifies whether to enable Amazon ECS managed tags for the tasks within the service. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFargateServiceProps.property.enableExecuteCommand">enableExecuteCommand</a></code> | <code>boolean</code> | Whether to enable the ability to execute into a container. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFargateServiceProps.property.healthCheckGracePeriod">healthCheckGracePeriod</a></code> | <code>aws-cdk-lib.Duration</code> | The period of time, in seconds, that the Amazon ECS service scheduler ignores unhealthy Elastic Load Balancing target health checks after a task has first started. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFargateServiceProps.property.maxHealthyPercent">maxHealthyPercent</a></code> | <code>number</code> | The maximum number of tasks, specified as a percentage of the Amazon ECS service's DesiredCount value, that can run in a service during a deployment. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFargateServiceProps.property.minHealthyPercent">minHealthyPercent</a></code> | <code>number</code> | The minimum number of tasks, specified as a percentage of the Amazon ECS service's DesiredCount value, that must continue to run and remain healthy during a deployment. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFargateServiceProps.property.propagateTags">propagateTags</a></code> | <code>aws-cdk-lib.aws_ecs.PropagatedTagSource</code> | Specifies whether to propagate the tags from the task definition or the service to the tasks in the service. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFargateServiceProps.property.serviceConnectConfiguration">serviceConnectConfiguration</a></code> | <code>aws-cdk-lib.aws_ecs.ServiceConnectProps</code> | Configuration for Service Connect. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFargateServiceProps.property.serviceName">serviceName</a></code> | <code>string</code> | The name of the service. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFargateServiceProps.property.assignPublicIp">assignPublicIp</a></code> | <code>boolean</code> | Specifies whether the task's elastic network interface receives a public IP address. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFargateServiceProps.property.platformVersion">platformVersion</a></code> | <code>aws-cdk-lib.aws_ecs.FargatePlatformVersion</code> | The platform version on which to run your service. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFargateServiceProps.property.securityGroups">securityGroups</a></code> | <code>aws-cdk-lib.aws_ec2.ISecurityGroup[]</code> | The security groups to associate with the service. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFargateServiceProps.property.vpcSubnets">vpcSubnets</a></code> | <code>aws-cdk-lib.aws_ec2.SubnetSelection</code> | The subnets to associate with the service. |

---

##### `capacityProviderStrategies`<sup>Optional</sup> <a name="capacityProviderStrategies" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFargateServiceProps.property.capacityProviderStrategies"></a>

```typescript
public readonly capacityProviderStrategies: CapacityProviderStrategy[];
```

- *Type:* aws-cdk-lib.aws_ecs.CapacityProviderStrategy[]
- *Default:* undefined

A list of Capacity Provider strategies used to place a service.

---

##### `circuitBreaker`<sup>Optional</sup> <a name="circuitBreaker" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFargateServiceProps.property.circuitBreaker"></a>

```typescript
public readonly circuitBreaker: DeploymentCircuitBreaker;
```

- *Type:* aws-cdk-lib.aws_ecs.DeploymentCircuitBreaker
- *Default:* disabled

Whether to enable the deployment circuit breaker.

If this property is defined, circuit breaker will be implicitly
enabled.

---

##### `cloudMapOptions`<sup>Optional</sup> <a name="cloudMapOptions" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFargateServiceProps.property.cloudMapOptions"></a>

```typescript
public readonly cloudMapOptions: CloudMapOptions;
```

- *Type:* aws-cdk-lib.aws_ecs.CloudMapOptions
- *Default:* AWS Cloud Map service discovery is not enabled.

The options for configuring an Amazon ECS service to use service discovery.

---

##### `deploymentController`<sup>Optional</sup> <a name="deploymentController" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFargateServiceProps.property.deploymentController"></a>

```typescript
public readonly deploymentController: DeploymentController;
```

- *Type:* aws-cdk-lib.aws_ecs.DeploymentController
- *Default:* Rolling update (ECS)

Specifies which deployment controller to use for the service.

For more information, see
[Amazon ECS Deployment Types](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-types.html)

---

##### `desiredCount`<sup>Optional</sup> <a name="desiredCount" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFargateServiceProps.property.desiredCount"></a>

```typescript
public readonly desiredCount: number;
```

- *Type:* number
- *Default:* When creating the service, default is 1; when updating the service, default uses the current task number.

The desired number of instantiations of the task definition to keep running on the service.

---

##### `enableECSManagedTags`<sup>Optional</sup> <a name="enableECSManagedTags" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFargateServiceProps.property.enableECSManagedTags"></a>

```typescript
public readonly enableECSManagedTags: boolean;
```

- *Type:* boolean
- *Default:* false

Specifies whether to enable Amazon ECS managed tags for the tasks within the service.

For more information, see
[Tagging Your Amazon ECS Resources](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-using-tags.html)

---

##### `enableExecuteCommand`<sup>Optional</sup> <a name="enableExecuteCommand" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFargateServiceProps.property.enableExecuteCommand"></a>

```typescript
public readonly enableExecuteCommand: boolean;
```

- *Type:* boolean
- *Default:* undefined

Whether to enable the ability to execute into a container.

---

##### `healthCheckGracePeriod`<sup>Optional</sup> <a name="healthCheckGracePeriod" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFargateServiceProps.property.healthCheckGracePeriod"></a>

```typescript
public readonly healthCheckGracePeriod: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* defaults to 60 seconds if at least one load balancer is in-use and it is not already set

The period of time, in seconds, that the Amazon ECS service scheduler ignores unhealthy Elastic Load Balancing target health checks after a task has first started.

---

##### `maxHealthyPercent`<sup>Optional</sup> <a name="maxHealthyPercent" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFargateServiceProps.property.maxHealthyPercent"></a>

```typescript
public readonly maxHealthyPercent: number;
```

- *Type:* number
- *Default:* 100 if daemon, otherwise 200

The maximum number of tasks, specified as a percentage of the Amazon ECS service's DesiredCount value, that can run in a service during a deployment.

---

##### `minHealthyPercent`<sup>Optional</sup> <a name="minHealthyPercent" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFargateServiceProps.property.minHealthyPercent"></a>

```typescript
public readonly minHealthyPercent: number;
```

- *Type:* number
- *Default:* 0 if daemon, otherwise 50

The minimum number of tasks, specified as a percentage of the Amazon ECS service's DesiredCount value, that must continue to run and remain healthy during a deployment.

---

##### `propagateTags`<sup>Optional</sup> <a name="propagateTags" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFargateServiceProps.property.propagateTags"></a>

```typescript
public readonly propagateTags: PropagatedTagSource;
```

- *Type:* aws-cdk-lib.aws_ecs.PropagatedTagSource
- *Default:* PropagatedTagSource.NONE

Specifies whether to propagate the tags from the task definition or the service to the tasks in the service.

Valid values are: PropagatedTagSource.SERVICE, PropagatedTagSource.TASK_DEFINITION or PropagatedTagSource.NONE

---

##### `serviceConnectConfiguration`<sup>Optional</sup> <a name="serviceConnectConfiguration" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFargateServiceProps.property.serviceConnectConfiguration"></a>

```typescript
public readonly serviceConnectConfiguration: ServiceConnectProps;
```

- *Type:* aws-cdk-lib.aws_ecs.ServiceConnectProps
- *Default:* No ports are advertised via Service Connect on this service, and the service cannot make requests to other services via Service Connect.

Configuration for Service Connect.

---

##### `serviceName`<sup>Optional</sup> <a name="serviceName" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFargateServiceProps.property.serviceName"></a>

```typescript
public readonly serviceName: string;
```

- *Type:* string
- *Default:* CloudFormation-generated name.

The name of the service.

---

##### `assignPublicIp`<sup>Optional</sup> <a name="assignPublicIp" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFargateServiceProps.property.assignPublicIp"></a>

```typescript
public readonly assignPublicIp: boolean;
```

- *Type:* boolean
- *Default:* false

Specifies whether the task's elastic network interface receives a public IP address.

If true, each task will receive a public IP address.

---

##### `platformVersion`<sup>Optional</sup> <a name="platformVersion" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFargateServiceProps.property.platformVersion"></a>

```typescript
public readonly platformVersion: FargatePlatformVersion;
```

- *Type:* aws-cdk-lib.aws_ecs.FargatePlatformVersion
- *Default:* Latest

The platform version on which to run your service.

If one is not specified, the LATEST platform version is used by default. For more information, see
[AWS Fargate Platform Versions](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/platform_versions.html)
in the Amazon Elastic Container Service Developer Guide.

---

##### `securityGroups`<sup>Optional</sup> <a name="securityGroups" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFargateServiceProps.property.securityGroups"></a>

```typescript
public readonly securityGroups: ISecurityGroup[];
```

- *Type:* aws-cdk-lib.aws_ec2.ISecurityGroup[]
- *Default:* A new security group is created.

The security groups to associate with the service.

If you do not specify a security group, a new security group is created.

---

##### `vpcSubnets`<sup>Optional</sup> <a name="vpcSubnets" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFargateServiceProps.property.vpcSubnets"></a>

```typescript
public readonly vpcSubnets: SubnetSelection;
```

- *Type:* aws-cdk-lib.aws_ec2.SubnetSelection
- *Default:* Public subnets if `assignPublicIp` is set, otherwise the first available one of Private, Isolated, Public, in that order.

The subnets to associate with the service.

---

### NextjsStandaloneEcsFileSystemProps <a name="NextjsStandaloneEcsFileSystemProps" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFileSystemProps"></a>

efs.FilesystemProps Omit vpc.

#### Initializer <a name="Initializer" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFileSystemProps.Initializer"></a>

```typescript
import { NextjsStandaloneEcsFileSystemProps } from 'cdk-nextjs-standalone-ecs'

const nextjsStandaloneEcsFileSystemProps: NextjsStandaloneEcsFileSystemProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFileSystemProps.property.enableAutomaticBackups">enableAutomaticBackups</a></code> | <code>boolean</code> | Whether to enable automatic backups for the file system. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFileSystemProps.property.encrypted">encrypted</a></code> | <code>boolean</code> | Defines if the data at rest in the file system is encrypted or not. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFileSystemProps.property.fileSystemName">fileSystemName</a></code> | <code>string</code> | The file system's name. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFileSystemProps.property.fileSystemPolicy">fileSystemPolicy</a></code> | <code>aws-cdk-lib.aws_iam.PolicyDocument</code> | File system policy is an IAM resource policy used to control NFS access to an EFS file system. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFileSystemProps.property.kmsKey">kmsKey</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | The KMS key used for encryption. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFileSystemProps.property.lifecyclePolicy">lifecyclePolicy</a></code> | <code>aws-cdk-lib.aws_efs.LifecyclePolicy</code> | A policy used by EFS lifecycle management to transition files to the Infrequent Access (IA) storage class. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFileSystemProps.property.outOfInfrequentAccessPolicy">outOfInfrequentAccessPolicy</a></code> | <code>aws-cdk-lib.aws_efs.OutOfInfrequentAccessPolicy</code> | A policy used by EFS lifecycle management to transition files from Infrequent Access (IA) storage class to primary storage class. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFileSystemProps.property.performanceMode">performanceMode</a></code> | <code>aws-cdk-lib.aws_efs.PerformanceMode</code> | The performance mode that the file system will operate under. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFileSystemProps.property.provisionedThroughputPerSecond">provisionedThroughputPerSecond</a></code> | <code>aws-cdk-lib.Size</code> | Provisioned throughput for the file system. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFileSystemProps.property.removalPolicy">removalPolicy</a></code> | <code>aws-cdk-lib.RemovalPolicy</code> | The removal policy to apply to the file system. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFileSystemProps.property.securityGroup">securityGroup</a></code> | <code>aws-cdk-lib.aws_ec2.ISecurityGroup</code> | Security Group to assign to this file system. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFileSystemProps.property.throughputMode">throughputMode</a></code> | <code>aws-cdk-lib.aws_efs.ThroughputMode</code> | Enum to mention the throughput mode of the file system. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFileSystemProps.property.vpcSubnets">vpcSubnets</a></code> | <code>aws-cdk-lib.aws_ec2.SubnetSelection</code> | Which subnets to place the mount target in the VPC. |

---

##### `enableAutomaticBackups`<sup>Optional</sup> <a name="enableAutomaticBackups" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFileSystemProps.property.enableAutomaticBackups"></a>

```typescript
public readonly enableAutomaticBackups: boolean;
```

- *Type:* boolean
- *Default:* false

Whether to enable automatic backups for the file system.

---

##### `encrypted`<sup>Optional</sup> <a name="encrypted" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFileSystemProps.property.encrypted"></a>

```typescript
public readonly encrypted: boolean;
```

- *Type:* boolean
- *Default:* If your application has the '@aws-cdk/aws-efs:defaultEncryptionAtRest' feature flag set, the default is true, otherwise, the default is false.

Defines if the data at rest in the file system is encrypted or not.

> [https://docs.aws.amazon.com/cdk/latest/guide/featureflags.html](https://docs.aws.amazon.com/cdk/latest/guide/featureflags.html)

---

##### `fileSystemName`<sup>Optional</sup> <a name="fileSystemName" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFileSystemProps.property.fileSystemName"></a>

```typescript
public readonly fileSystemName: string;
```

- *Type:* string
- *Default:* CDK generated name

The file system's name.

---

##### `fileSystemPolicy`<sup>Optional</sup> <a name="fileSystemPolicy" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFileSystemProps.property.fileSystemPolicy"></a>

```typescript
public readonly fileSystemPolicy: PolicyDocument;
```

- *Type:* aws-cdk-lib.aws_iam.PolicyDocument
- *Default:* none

File system policy is an IAM resource policy used to control NFS access to an EFS file system.

---

##### `kmsKey`<sup>Optional</sup> <a name="kmsKey" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFileSystemProps.property.kmsKey"></a>

```typescript
public readonly kmsKey: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey
- *Default:* if 'encrypted' is true, the default key for EFS (/aws/elasticfilesystem) is used

The KMS key used for encryption.

This is required to encrypt the data at rest if @encrypted is set to true.

---

##### `lifecyclePolicy`<sup>Optional</sup> <a name="lifecyclePolicy" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFileSystemProps.property.lifecyclePolicy"></a>

```typescript
public readonly lifecyclePolicy: LifecyclePolicy;
```

- *Type:* aws-cdk-lib.aws_efs.LifecyclePolicy
- *Default:* None. EFS will not transition files to the IA storage class.

A policy used by EFS lifecycle management to transition files to the Infrequent Access (IA) storage class.

---

##### `outOfInfrequentAccessPolicy`<sup>Optional</sup> <a name="outOfInfrequentAccessPolicy" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFileSystemProps.property.outOfInfrequentAccessPolicy"></a>

```typescript
public readonly outOfInfrequentAccessPolicy: OutOfInfrequentAccessPolicy;
```

- *Type:* aws-cdk-lib.aws_efs.OutOfInfrequentAccessPolicy
- *Default:* None. EFS will not transition files from IA storage to primary storage.

A policy used by EFS lifecycle management to transition files from Infrequent Access (IA) storage class to primary storage class.

---

##### `performanceMode`<sup>Optional</sup> <a name="performanceMode" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFileSystemProps.property.performanceMode"></a>

```typescript
public readonly performanceMode: PerformanceMode;
```

- *Type:* aws-cdk-lib.aws_efs.PerformanceMode
- *Default:* PerformanceMode.GENERAL_PURPOSE

The performance mode that the file system will operate under.

An Amazon EFS file system's performance mode can't be changed after the file system has been created.
Updating this property will replace the file system.

---

##### `provisionedThroughputPerSecond`<sup>Optional</sup> <a name="provisionedThroughputPerSecond" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFileSystemProps.property.provisionedThroughputPerSecond"></a>

```typescript
public readonly provisionedThroughputPerSecond: Size;
```

- *Type:* aws-cdk-lib.Size
- *Default:* none, errors out

Provisioned throughput for the file system.

This is a required property if the throughput mode is set to PROVISIONED.
Must be at least 1MiB/s.

---

##### `removalPolicy`<sup>Optional</sup> <a name="removalPolicy" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFileSystemProps.property.removalPolicy"></a>

```typescript
public readonly removalPolicy: RemovalPolicy;
```

- *Type:* aws-cdk-lib.RemovalPolicy
- *Default:* RemovalPolicy.RETAIN

The removal policy to apply to the file system.

---

##### `securityGroup`<sup>Optional</sup> <a name="securityGroup" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFileSystemProps.property.securityGroup"></a>

```typescript
public readonly securityGroup: ISecurityGroup;
```

- *Type:* aws-cdk-lib.aws_ec2.ISecurityGroup
- *Default:* creates new security group which allows all outbound traffic

Security Group to assign to this file system.

---

##### `throughputMode`<sup>Optional</sup> <a name="throughputMode" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFileSystemProps.property.throughputMode"></a>

```typescript
public readonly throughputMode: ThroughputMode;
```

- *Type:* aws-cdk-lib.aws_efs.ThroughputMode
- *Default:* ThroughputMode.BURSTING

Enum to mention the throughput mode of the file system.

---

##### `vpcSubnets`<sup>Optional</sup> <a name="vpcSubnets" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFileSystemProps.property.vpcSubnets"></a>

```typescript
public readonly vpcSubnets: SubnetSelection;
```

- *Type:* aws-cdk-lib.aws_ec2.SubnetSelection
- *Default:* the Vpc default strategy if not specified

Which subnets to place the mount target in the VPC.

---

### NextjsStandaloneEcsSiteProps <a name="NextjsStandaloneEcsSiteProps" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps"></a>

#### Initializer <a name="Initializer" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.Initializer"></a>

```typescript
import { NextjsStandaloneEcsSiteProps } from 'cdk-nextjs-standalone-ecs'

const nextjsStandaloneEcsSiteProps: NextjsStandaloneEcsSiteProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.elbTargetGroup">elbTargetGroup</a></code> | <code>aws-cdk-lib.aws_elasticloadbalancingv2.IApplicationTargetGroup</code> | Must be on an ELB within the provided VPC. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.image">image</a></code> | <code>aws-cdk-lib.aws_ecs.ContainerImage</code> | Due to the complexity around maintaining references to Dockerfile and context, this is better built outside of this construct. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | *No description.* |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.clusterProps">clusterProps</a></code> | <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsClusterProps">NextjsStandaloneEcsClusterProps</a></code> | Deviations from default settings: - "enableFargateCapacityProviders" is set to true. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.containerProps">containerProps</a></code> | <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions">NextjsStandaloneEcsContainerDefinitionOptions</a></code> | Complete deviation from default settings (as is required), but this is provided for overrides. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.dockerImageAssetProps">dockerImageAssetProps</a></code> | <code>aws-cdk-lib.aws_ecr_assets.DockerImageAssetProps</code> | "platform" handled by this construct, do not recommend providing. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.fileSystemAccessPointProps">fileSystemAccessPointProps</a></code> | <code>aws-cdk-lib.aws_efs.AccessPointOptions</code> | Complete deviation from default settings. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.fileSystemPort">fileSystemPort</a></code> | <code>number</code> | The port on which the file system is available. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.fileSystemProps">fileSystemProps</a></code> | <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFileSystemProps">NextjsStandaloneEcsFileSystemProps</a></code> | Deviations from default settings: - "encrypted" is set to true. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.gid">gid</a></code> | <code>string</code> | The POSIX group ID of the next.js docker user. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.logStreamPrefix">logStreamPrefix</a></code> | <code>string</code> | The log stream prefix where the container's logs will be stored in Cloudwatch Logs. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.nextjsContainerPort">nextjsContainerPort</a></code> | <code>number</code> | The port on which the Next.js application is available inside the container. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.serviceProps">serviceProps</a></code> | <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFargateServiceProps">NextjsStandaloneEcsFargateServiceProps</a></code> | Deviations from default settings: - "assignPublicIp" is set to true, rather than false. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.taskDefinitionProps">taskDefinitionProps</a></code> | <code>aws-cdk-lib.aws_ecs.FargateTaskDefinitionProps</code> | "runtimePlatform" handled by this construct, do not recommend providing. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.uid">uid</a></code> | <code>string</code> | The POSIX user ID of the next.js docker user. |

---

##### `elbTargetGroup`<sup>Required</sup> <a name="elbTargetGroup" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.elbTargetGroup"></a>

```typescript
public readonly elbTargetGroup: IApplicationTargetGroup;
```

- *Type:* aws-cdk-lib.aws_elasticloadbalancingv2.IApplicationTargetGroup

Must be on an ELB within the provided VPC.

---

##### `image`<sup>Required</sup> <a name="image" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.image"></a>

```typescript
public readonly image: ContainerImage;
```

- *Type:* aws-cdk-lib.aws_ecs.ContainerImage

Due to the complexity around maintaining references to Dockerfile and context, this is better built outside of this construct.

---

*Example*

```typescript
const nextjsDockerImage = new ecrAssets.DockerImageAsset(this, 'NextjsDockerImage', {
 directory: "./"
});

image: ecs.ContainerImage.fromDockerImageAsset(
  nextjsDockerImage
)
```


##### `vpc`<sup>Required</sup> <a name="vpc" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

---

##### `clusterProps`<sup>Optional</sup> <a name="clusterProps" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.clusterProps"></a>

```typescript
public readonly clusterProps: NextjsStandaloneEcsClusterProps;
```

- *Type:* <a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsClusterProps">NextjsStandaloneEcsClusterProps</a>

Deviations from default settings: - "enableFargateCapacityProviders" is set to true.

---

##### `containerProps`<sup>Optional</sup> <a name="containerProps" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.containerProps"></a>

```typescript
public readonly containerProps: NextjsStandaloneEcsContainerDefinitionOptions;
```

- *Type:* <a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsContainerDefinitionOptions">NextjsStandaloneEcsContainerDefinitionOptions</a>

Complete deviation from default settings (as is required), but this is provided for overrides.

This will create an appropriate health check for the Next.js application, set sensible logging, the image, and the port.

---

##### `dockerImageAssetProps`<sup>Optional</sup> <a name="dockerImageAssetProps" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.dockerImageAssetProps"></a>

```typescript
public readonly dockerImageAssetProps: DockerImageAssetProps;
```

- *Type:* aws-cdk-lib.aws_ecr_assets.DockerImageAssetProps

"platform" handled by this construct, do not recommend providing.

Docker Images must be created for every environment due to changing environment variables.

Deviations from default settings:
- "directory" defaults to "./".
- "platform" is handled by this construct to coincide with ECS.

---

##### `fileSystemAccessPointProps`<sup>Optional</sup> <a name="fileSystemAccessPointProps" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.fileSystemAccessPointProps"></a>

```typescript
public readonly fileSystemAccessPointProps: AccessPointOptions;
```

- *Type:* aws-cdk-lib.aws_efs.AccessPointOptions

Complete deviation from default settings.

---

##### `fileSystemPort`<sup>Optional</sup> <a name="fileSystemPort" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.fileSystemPort"></a>

```typescript
public readonly fileSystemPort: number;
```

- *Type:* number
- *Default:* 2049

The port on which the file system is available.

---

##### `fileSystemProps`<sup>Optional</sup> <a name="fileSystemProps" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.fileSystemProps"></a>

```typescript
public readonly fileSystemProps: NextjsStandaloneEcsFileSystemProps;
```

- *Type:* <a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFileSystemProps">NextjsStandaloneEcsFileSystemProps</a>

Deviations from default settings: - "encrypted" is set to true.

"lifecyclePolicy" is set to "AFTER_90_DAYS" in order to transition old builds to the IA class.
- "removalPolicy" is set to DESTROY.

---

##### `gid`<sup>Optional</sup> <a name="gid" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.gid"></a>

```typescript
public readonly gid: string;
```

- *Type:* string
- *Default:* "1001"

The POSIX group ID of the next.js docker user.

---

##### `logStreamPrefix`<sup>Optional</sup> <a name="logStreamPrefix" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.logStreamPrefix"></a>

```typescript
public readonly logStreamPrefix: string;
```

- *Type:* string
- *Default:* "nextjs-standalone-ecs-site"

The log stream prefix where the container's logs will be stored in Cloudwatch Logs.

---

##### `nextjsContainerPort`<sup>Optional</sup> <a name="nextjsContainerPort" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.nextjsContainerPort"></a>

```typescript
public readonly nextjsContainerPort: number;
```

- *Type:* number
- *Default:* 3000

The port on which the Next.js application is available inside the container.

---

##### `serviceProps`<sup>Optional</sup> <a name="serviceProps" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.serviceProps"></a>

```typescript
public readonly serviceProps: NextjsStandaloneEcsFargateServiceProps;
```

- *Type:* <a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsFargateServiceProps">NextjsStandaloneEcsFargateServiceProps</a>

Deviations from default settings: - "assignPublicIp" is set to true, rather than false.

This is done because most Next.js applications are public.
  If you would rather use a NatGateway, you can override this prop.

---

##### `taskDefinitionProps`<sup>Optional</sup> <a name="taskDefinitionProps" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.taskDefinitionProps"></a>

```typescript
public readonly taskDefinitionProps: FargateTaskDefinitionProps;
```

- *Type:* aws-cdk-lib.aws_ecs.FargateTaskDefinitionProps

"runtimePlatform" handled by this construct, do not recommend providing.

No other deviations from default settings.

---

##### `uid`<sup>Optional</sup> <a name="uid" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.uid"></a>

```typescript
public readonly uid: string;
```

- *Type:* string
- *Default:* "1001"

The POSIX user ID of the next.js docker user.

---



