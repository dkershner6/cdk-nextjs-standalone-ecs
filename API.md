# Next.js Standalone ECS Site

This is a standalone ECS site that uses Next.js and is deployed to AWS ECS.

It employs AWS EFS to share the `.next` directory between containers to facilitate proper Incremental Static Regeneration.

A Usage Guide will be available soon, but some minimal scripts will need to accompany any repo that uses this template. They are available in the `docker` folder.
# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### NextjsStandaloneEcsSite <a name="NextjsStandaloneEcsSite" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSite"></a>

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
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSite.property.dockerImageAsset">dockerImageAsset</a></code> | <code>aws-cdk-lib.aws_ecr_assets.DockerImageAsset</code> | *No description.* |
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

##### `dockerImageAsset`<sup>Required</sup> <a name="dockerImageAsset" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSite.property.dockerImageAsset"></a>

```typescript
public readonly dockerImageAsset: DockerImageAsset;
```

- *Type:* aws-cdk-lib.aws_ecr_assets.DockerImageAsset

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


## Structs <a name="Structs" id="Structs"></a>

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
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | *No description.* |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.clusterProps">clusterProps</a></code> | <code>aws-cdk-lib.aws_ecs.ClusterProps</code> | "vpc" handled by this construct, do not recommend providing (JSII will not let us omit). |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.containerProps">containerProps</a></code> | <code>aws-cdk-lib.aws_ecs.ContainerDefinitionProps</code> | "image" and "taskDefinition" handled by this construct, do not recommend providing (JSII will not let us omit). |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.cpuArchitecture">cpuArchitecture</a></code> | <code>aws-cdk-lib.aws_ecs.CpuArchitecture</code> | Set your desired CPU architecture. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.dockerImageAssetProps">dockerImageAssetProps</a></code> | <code>aws-cdk-lib.aws_ecr_assets.DockerImageAssetProps</code> | "platform" handled by this construct, do not recommend providing (JSII will not let us omit). |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.fileSystemAccessPointProps">fileSystemAccessPointProps</a></code> | <code>aws-cdk-lib.aws_efs.AccessPointProps</code> | "fileSystem" handled by this construct, do not recommend providing (JSII will not let us omit). |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.fileSystemPort">fileSystemPort</a></code> | <code>number</code> | The port on which the file system is available. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.fileSystemProps">fileSystemProps</a></code> | <code>aws-cdk-lib.aws_efs.FileSystemProps</code> | "vpc" handled by this construct, do not recommend providing (JSII will not let us omit). |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.gid">gid</a></code> | <code>string</code> | The POSIX group ID of the next.js docker user. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.logStreamPrefix">logStreamPrefix</a></code> | <code>string</code> | The log stream prefix where the container's logs will be stored in Cloudwatch Logs. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.nextjsContainerPort">nextjsContainerPort</a></code> | <code>number</code> | The port on which the Next.js application is available inside the container. |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.serviceProps">serviceProps</a></code> | <code>aws-cdk-lib.aws_ecs.FargateServiceProps</code> | "cluster" and "taskDefinition" handled by this construct, do not recommend providing (JSII will not let us omit). |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.taskDefinitionProps">taskDefinitionProps</a></code> | <code>aws-cdk-lib.aws_ecs.FargateTaskDefinitionProps</code> | "runtimePlatform" handled by this construct, do not recommend providing (JSII will not let us omit). |
| <code><a href="#cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.uid">uid</a></code> | <code>string</code> | The POSIX user ID of the next.js docker user. |

---

##### `elbTargetGroup`<sup>Required</sup> <a name="elbTargetGroup" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.elbTargetGroup"></a>

```typescript
public readonly elbTargetGroup: IApplicationTargetGroup;
```

- *Type:* aws-cdk-lib.aws_elasticloadbalancingv2.IApplicationTargetGroup

Must be on an ELB within the provided VPC.

---

##### `vpc`<sup>Required</sup> <a name="vpc" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

---

##### `clusterProps`<sup>Optional</sup> <a name="clusterProps" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.clusterProps"></a>

```typescript
public readonly clusterProps: ClusterProps;
```

- *Type:* aws-cdk-lib.aws_ecs.ClusterProps

"vpc" handled by this construct, do not recommend providing (JSII will not let us omit).

Deviations from default settings:
- "enableFargateCapacityProviders" is set to true.

---

##### `containerProps`<sup>Optional</sup> <a name="containerProps" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.containerProps"></a>

```typescript
public readonly containerProps: ContainerDefinitionProps;
```

- *Type:* aws-cdk-lib.aws_ecs.ContainerDefinitionProps

"image" and "taskDefinition" handled by this construct, do not recommend providing (JSII will not let us omit).

Complete deviation from default settings (as is required), but this is provided for overrides.

This will create an appropriate health check for the Next.js application, set sensible logging, the image, and the port.

---

##### `cpuArchitecture`<sup>Optional</sup> <a name="cpuArchitecture" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.cpuArchitecture"></a>

```typescript
public readonly cpuArchitecture: CpuArchitecture;
```

- *Type:* aws-cdk-lib.aws_ecs.CpuArchitecture
- *Default:* ecs.CpuArchitecture.X86_64

Set your desired CPU architecture.

Must be X86_64 if using FARGATE_SPOT, currently.
To build ARM64 on an X86_64 machine, you must have emulators installed. You can use this command:
docker run -it --rm --privileged tonistiigi/binfmt --install all

---

##### `dockerImageAssetProps`<sup>Optional</sup> <a name="dockerImageAssetProps" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.dockerImageAssetProps"></a>

```typescript
public readonly dockerImageAssetProps: DockerImageAssetProps;
```

- *Type:* aws-cdk-lib.aws_ecr_assets.DockerImageAssetProps

"platform" handled by this construct, do not recommend providing (JSII will not let us omit).

Docker Images must be created for every environment due to changing environment variables.

Deviations from default settings:
- "directory" defaults to "./".
- "platform" is handled by this construct to coincide with ECS.

---

##### `fileSystemAccessPointProps`<sup>Optional</sup> <a name="fileSystemAccessPointProps" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.fileSystemAccessPointProps"></a>

```typescript
public readonly fileSystemAccessPointProps: AccessPointProps;
```

- *Type:* aws-cdk-lib.aws_efs.AccessPointProps

"fileSystem" handled by this construct, do not recommend providing (JSII will not let us omit).

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
public readonly fileSystemProps: FileSystemProps;
```

- *Type:* aws-cdk-lib.aws_efs.FileSystemProps

"vpc" handled by this construct, do not recommend providing (JSII will not let us omit).

Deviations from default settings:
- "encrypted" is set to true.
- "lifecyclePolicy" is set to "AFTER_90_DAYS" in order to transition old builds to the IA class.
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
public readonly serviceProps: FargateServiceProps;
```

- *Type:* aws-cdk-lib.aws_ecs.FargateServiceProps

"cluster" and "taskDefinition" handled by this construct, do not recommend providing (JSII will not let us omit).

Deviations from default settings:
- "assignPublicIp" is set to true, rather than false. This is done because most Next.js applications are public.
  If you would rather use a NatGateway, you can override this prop.

---

##### `taskDefinitionProps`<sup>Optional</sup> <a name="taskDefinitionProps" id="cdk-nextjs-standalone-ecs.NextjsStandaloneEcsSiteProps.property.taskDefinitionProps"></a>

```typescript
public readonly taskDefinitionProps: FargateTaskDefinitionProps;
```

- *Type:* aws-cdk-lib.aws_ecs.FargateTaskDefinitionProps

"runtimePlatform" handled by this construct, do not recommend providing (JSII will not let us omit).

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



