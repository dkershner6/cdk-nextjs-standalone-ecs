import { Size, RemovalPolicy } from 'aws-cdk-lib';
import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { CloudMapNamespaceOptions, AddCapacityOptions, ExecuteCommandConfiguration, EnvironmentFile, HealthCheck, LinuxParameters, LogDriver, PortMapping, Secret, SystemControl, Ulimit, CapacityProviderStrategy, CloudMapOptions, DeploymentCircuitBreaker, DeploymentController, FargatePlatformVersion, PropagatedTagSource, ServiceConnectProps } from 'aws-cdk-lib/aws-ecs';
import { LifecyclePolicy, OutOfInfrequentAccessPolicy, PerformanceMode, ThroughputMode } from 'aws-cdk-lib/aws-efs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as kms from 'aws-cdk-lib/aws-kms';

// Update types in this file freely to match as versions of aws-cdk-lib change.
// JSII will not let us use beautiful Omit types.

/**
 * ecs.ClusterProps Omit vpc
 */
export interface NextjsStandaloneEcsClusterProps {
/**
     * The name for the cluster.
     *
     * @default CloudFormation-generated name
     */
  readonly clusterName?: string;
  /**
     * The service discovery namespace created in this cluster
     *
     * @default - no service discovery namespace created, you can use `addDefaultCloudMapNamespace` to add a
     * default service discovery namespace later.
     */
  readonly defaultCloudMapNamespace?: CloudMapNamespaceOptions;
  /**
     * The ec2 capacity to add to the cluster
     *
     * @default - no EC2 capacity will be added, you can use `addCapacity` to add capacity later.
     */
  readonly capacity?: AddCapacityOptions;
  /**
     * Whether to enable Fargate Capacity Providers
     *
     * @default false
     */
  readonly enableFargateCapacityProviders?: boolean;
  /**
     * If true CloudWatch Container Insights will be enabled for the cluster
     *
     * @default - Container Insights will be disabled for this cluster.
     */
  readonly containerInsights?: boolean;
  /**
     * The execute command configuration for the cluster
     *
     * @default - no configuration will be provided.
     */
  readonly executeCommandConfiguration?: ExecuteCommandConfiguration;
}

/**
 * efs.FilesystemProps Omit vpc
 */
export interface NextjsStandaloneEcsFileSystemProps {
  /**
     * Security Group to assign to this file system.
     *
     * @default - creates new security group which allows all outbound traffic
     */
  readonly securityGroup?: ec2.ISecurityGroup;
  /**
     * Which subnets to place the mount target in the VPC.
     *
     * @default - the Vpc default strategy if not specified
     */
  readonly vpcSubnets?: ec2.SubnetSelection;
  /**
     * Defines if the data at rest in the file system is encrypted or not.
     *
     * @default - If your application has the '@aws-cdk/aws-efs:defaultEncryptionAtRest' feature flag set, the default is true, otherwise, the default is false.
     * @link https://docs.aws.amazon.com/cdk/latest/guide/featureflags.html
     */
  readonly encrypted?: boolean;
  /**
     * The file system's name.
     *
     * @default - CDK generated name
     */
  readonly fileSystemName?: string;
  /**
     * The KMS key used for encryption. This is required to encrypt the data at rest if @encrypted is set to true.
     *
     * @default - if 'encrypted' is true, the default key for EFS (/aws/elasticfilesystem) is used
     */
  readonly kmsKey?: kms.IKey;
  /**
     * A policy used by EFS lifecycle management to transition files to the Infrequent Access (IA) storage class.
     *
     * @default - None. EFS will not transition files to the IA storage class.
     */
  readonly lifecyclePolicy?: LifecyclePolicy;
  /**
     * A policy used by EFS lifecycle management to transition files from Infrequent Access (IA) storage class to
     * primary storage class.
     *
     * @default - None. EFS will not transition files from IA storage to primary storage.
     */
  readonly outOfInfrequentAccessPolicy?: OutOfInfrequentAccessPolicy;
  /**
     * The performance mode that the file system will operate under.
     * An Amazon EFS file system's performance mode can't be changed after the file system has been created.
     * Updating this property will replace the file system.
     *
     * @default PerformanceMode.GENERAL_PURPOSE
     */
  readonly performanceMode?: PerformanceMode;
  /**
     * Enum to mention the throughput mode of the file system.
     *
     * @default ThroughputMode.BURSTING
     */
  readonly throughputMode?: ThroughputMode;
  /**
     * Provisioned throughput for the file system.
     * This is a required property if the throughput mode is set to PROVISIONED.
     * Must be at least 1MiB/s.
     *
     * @default - none, errors out
     */
  readonly provisionedThroughputPerSecond?: Size;
  /**
     * The removal policy to apply to the file system.
     *
     * @default RemovalPolicy.RETAIN
     */
  readonly removalPolicy?: RemovalPolicy;
  /**
     * Whether to enable automatic backups for the file system.
     *
     * @default false
     */
  readonly enableAutomaticBackups?: boolean;
  /**
     * File system policy is an IAM resource policy used to control NFS access to an EFS file system.
     *
     * @default none
     */
  readonly fileSystemPolicy?: iam.PolicyDocument;
}

/**
 * ecs.ContainerDefinitionOptions Omit image
 */
export interface NextjsStandaloneEcsContainerDefinitionOptions {

  /**
     * The name of the container.
     *
     * @default - id of node associated with ContainerDefinition.
     */
  readonly containerName?: string;
  /**
     * The command that is passed to the container.
     *
     * If you provide a shell command as a single string, you have to quote command-line arguments.
     *
     * @default - CMD value built into container image.
     */
  readonly command?: string[];
  /**
     * The minimum number of CPU units to reserve for the container.
     *
     * @default - No minimum CPU units reserved.
     */
  readonly cpu?: number;
  /**
     * Specifies whether networking is disabled within the container.
     *
     * When this parameter is true, networking is disabled within the container.
     *
     * @default false
     */
  readonly disableNetworking?: boolean;
  /**
     * A list of DNS search domains that are presented to the container.
     *
     * @default - No search domains.
     */
  readonly dnsSearchDomains?: string[];
  /**
     * A list of DNS servers that are presented to the container.
     *
     * @default - Default DNS servers.
     */
  readonly dnsServers?: string[];
  /**
     * A key/value map of labels to add to the container.
     *
     * @default - No labels.
     */
  readonly dockerLabels?: {
    [key: string]: string;
  };
  /**
     * A list of strings to provide custom labels for SELinux and AppArmor multi-level security systems.
     *
     * @default - No security labels.
     */
  readonly dockerSecurityOptions?: string[];
  /**
     * The ENTRYPOINT value to pass to the container.
     *
     * @see https://docs.docker.com/engine/reference/builder/#entrypoint
     *
     * @default - Entry point configured in container.
     */
  readonly entryPoint?: string[];
  /**
     * The environment variables to pass to the container.
     *
     * @default - No environment variables.
     */
  readonly environment?: {
    [key: string]: string;
  };
  /**
     * The environment files to pass to the container.
     *
     * @see https://docs.aws.amazon.com/AmazonECS/latest/developerguide/taskdef-envfiles.html
     *
     * @default - No environment files.
     */
  readonly environmentFiles?: EnvironmentFile[];
  /**
     * The secret environment variables to pass to the container.
     *
     * @default - No secret environment variables.
     */
  readonly secrets?: {
    [key: string]: Secret;
  };
  /**
     * Time duration (in seconds) to wait before giving up on resolving dependencies for a container.
     *
     * @default - none
     */
  readonly startTimeout?: cdk.Duration;
  /**
     * Time duration (in seconds) to wait before the container is forcefully killed if it doesn't exit normally on its own.
     *
     * @default - none
     */
  readonly stopTimeout?: cdk.Duration;
  /**
     * Specifies whether the container is marked essential.
     *
     * If the essential parameter of a container is marked as true, and that container fails
     * or stops for any reason, all other containers that are part of the task are stopped.
     * If the essential parameter of a container is marked as false, then its failure does not
     * affect the rest of the containers in a task. All tasks must have at least one essential container.
     *
     * If this parameter is omitted, a container is assumed to be essential.
     *
     * @default true
     */
  readonly essential?: boolean;
  /**
     * A list of hostnames and IP address mappings to append to the /etc/hosts file on the container.
     *
     * @default - No extra hosts.
     */
  readonly extraHosts?: {
    [name: string]: string;
  };
  /**
     * The health check command and associated configuration parameters for the container.
     *
     * @default - Health check configuration from container.
     */
  readonly healthCheck?: HealthCheck;
  /**
     * The hostname to use for your container.
     *
     * @default - Automatic hostname.
     */
  readonly hostname?: string;
  /**
     * The amount (in MiB) of memory to present to the container.
     *
     * If your container attempts to exceed the allocated memory, the container
     * is terminated.
     *
     * At least one of memoryLimitMiB and memoryReservationMiB is required for non-Fargate services.
     *
     * @default - No memory limit.
     */
  readonly memoryLimitMiB?: number;
  /**
     * The soft limit (in MiB) of memory to reserve for the container.
     *
     * When system memory is under heavy contention, Docker attempts to keep the
     * container memory to this soft limit. However, your container can consume more
     * memory when it needs to, up to either the hard limit specified with the memory
     * parameter (if applicable), or all of the available memory on the container
     * instance, whichever comes first.
     *
     * At least one of memoryLimitMiB and memoryReservationMiB is required for non-Fargate services.
     *
     * @default - No memory reserved.
     */
  readonly memoryReservationMiB?: number;
  /**
     * Specifies whether the container is marked as privileged.
     * When this parameter is true, the container is given elevated privileges on the host container instance (similar to the root user).
     *
     * @default false
     */
  readonly privileged?: boolean;
  /**
     * When this parameter is true, the container is given read-only access to its root file system.
     *
     * @default false
     */
  readonly readonlyRootFilesystem?: boolean;
  /**
     * The user name to use inside the container.
     *
     * @default root
     */
  readonly user?: string;
  /**
     * The working directory in which to run commands inside the container.
     *
     * @default /
     */
  readonly workingDirectory?: string;
  /**
     * The log configuration specification for the container.
     *
     * @default - Containers use the same logging driver that the Docker daemon uses.
     */
  readonly logging?: LogDriver;
  /**
     * Linux-specific modifications that are applied to the container, such as Linux kernel capabilities.
     * For more information see [KernelCapabilities](https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_KernelCapabilities.html).
     *
     * @default - No Linux parameters.
     */
  readonly linuxParameters?: LinuxParameters;
  /**
     * The number of GPUs assigned to the container.
     *
     * @default - No GPUs assigned.
     */
  readonly gpuCount?: number;
  /**
     * The port mappings to add to the container definition.
     * @default - No ports are mapped.
     */
  readonly portMappings?: PortMapping[];
  /**
     * The inference accelerators referenced by the container.
     * @default - No inference accelerators assigned.
     */
  readonly inferenceAcceleratorResources?: string[];
  /**
     * A list of namespaced kernel parameters to set in the container.
     *
     * @default - No system controls are set.
     * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ecs-taskdefinition-systemcontrol.html
     * @see https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#container_definition_systemcontrols
     */
  readonly systemControls?: SystemControl[];
  /**
     * When this parameter is true, a TTY is allocated. This parameter maps to Tty in the "Create a container section" of the
     * Docker Remote API and the --tty option to `docker run`.
     *
     * @default - false
     * @see https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#container_definition_pseudoterminal
     */
  readonly pseudoTerminal?: boolean;
  /**
     * An array of ulimits to set in the container.
     */
  readonly ulimits?: Ulimit[];
}

/**
 * ecs.FargateServiceProps Omit taskDefinition
 */
export interface NextjsStandaloneEcsFargateServiceProps extends NextjsStandaloneEcsBaseServiceOptions {

  /**
     * Specifies whether the task's elastic network interface receives a public IP address.
     *
     * If true, each task will receive a public IP address.
     *
     * @default false
     */
  readonly assignPublicIp?: boolean;
  /**
     * The subnets to associate with the service.
     *
     * @default - Public subnets if `assignPublicIp` is set, otherwise the first available one of Private, Isolated, Public, in that order.
     */
  readonly vpcSubnets?: ec2.SubnetSelection;
  /**
     * The security groups to associate with the service. If you do not specify a security group, a new security group is created.
     *
     * @default - A new security group is created.
     */
  readonly securityGroups?: ec2.ISecurityGroup[];
  /**
     * The platform version on which to run your service.
     *
     * If one is not specified, the LATEST platform version is used by default. For more information, see
     * [AWS Fargate Platform Versions](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/platform_versions.html)
     * in the Amazon Elastic Container Service Developer Guide.
     *
     * @default Latest
     */
  readonly platformVersion?: FargatePlatformVersion;
}

/**
 * ecs.BaseServiceOptions Omit cluster
 */
export interface NextjsStandaloneEcsBaseServiceOptions {

  /**
     * The desired number of instantiations of the task definition to keep running on the service.
     *
     * @default - When creating the service, default is 1; when updating the service, default uses
     * the current task number.
     */
  readonly desiredCount?: number;
  /**
     * The name of the service.
     *
     * @default - CloudFormation-generated name.
     */
  readonly serviceName?: string;
  /**
     * The maximum number of tasks, specified as a percentage of the Amazon ECS
     * service's DesiredCount value, that can run in a service during a
     * deployment.
     *
     * @default - 100 if daemon, otherwise 200
     */
  readonly maxHealthyPercent?: number;
  /**
     * The minimum number of tasks, specified as a percentage of
     * the Amazon ECS service's DesiredCount value, that must
     * continue to run and remain healthy during a deployment.
     *
     * @default - 0 if daemon, otherwise 50
     */
  readonly minHealthyPercent?: number;
  /**
     * The period of time, in seconds, that the Amazon ECS service scheduler ignores unhealthy
     * Elastic Load Balancing target health checks after a task has first started.
     *
     * @default - defaults to 60 seconds if at least one load balancer is in-use and it is not already set
     */
  readonly healthCheckGracePeriod?: cdk.Duration;
  /**
     * The options for configuring an Amazon ECS service to use service discovery.
     *
     * @default - AWS Cloud Map service discovery is not enabled.
     */
  readonly cloudMapOptions?: CloudMapOptions;
  /**
     * Specifies whether to propagate the tags from the task definition or the service to the tasks in the service
     *
     * Valid values are: PropagatedTagSource.SERVICE, PropagatedTagSource.TASK_DEFINITION or PropagatedTagSource.NONE
     *
     * @default PropagatedTagSource.NONE
     */
  readonly propagateTags?: PropagatedTagSource;
  /**
     * Specifies whether to enable Amazon ECS managed tags for the tasks within the service. For more information, see
     * [Tagging Your Amazon ECS Resources](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-using-tags.html)
     *
     * @default false
     */
  readonly enableECSManagedTags?: boolean;
  /**
     * Specifies which deployment controller to use for the service. For more information, see
     * [Amazon ECS Deployment Types](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-types.html)
     *
     * @default - Rolling update (ECS)
     */
  readonly deploymentController?: DeploymentController;
  /**
     * Whether to enable the deployment circuit breaker. If this property is defined, circuit breaker will be implicitly
     * enabled.
     * @default - disabled
     */
  readonly circuitBreaker?: DeploymentCircuitBreaker;
  /**
     * A list of Capacity Provider strategies used to place a service.
     *
     * @default - undefined
     *
     */
  readonly capacityProviderStrategies?: CapacityProviderStrategy[];
  /**
     * Whether to enable the ability to execute into a container
     *
     *  @default - undefined
     */
  readonly enableExecuteCommand?: boolean;
  /**
     * Configuration for Service Connect.
     *
     * @default No ports are advertised via Service Connect on this service, and the service
     * cannot make requests to other services via Service Connect.
     */
  readonly serviceConnectConfiguration?: ServiceConnectProps;
}