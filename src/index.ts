import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecrAssets from 'aws-cdk-lib/aws-ecr-assets';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as efs from 'aws-cdk-lib/aws-efs';
import * as elb from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export const DEFAULT_NEXTJS_DOCKER_USER_UID = '1001';
export const DEFAULT_NEXTJS_DOCKER_USER_GID = '1001';
export const DEFAULT_NEXTJS_FILE_SYSTEM_ACCESS_POINT_PATH =
    '/nextjs-standalone-ecs-site';
export const DEFAULT_NEXTJS_FILE_SYSTEM_PORT = 2049;
export const DEFAULT_NEXTJS_ECS_CPU_ARCHITECTURE = ecs.CpuArchitecture.X86_64;

export const DEFAULT_PATH_TO_DOCKERFILE = './';
export const DEFAULT_NEXTJS_CONTAINER_PORT = 3000;
export const DEFAULT_NEXTJS_LOG_STREAM_PREFIX = 'nextjs-standalone-ecs-site';

export const NEXTJS_VOLUME_NAME = 'nextjs-standalone-volume';

export interface NextjsStandaloneEcsSiteProps {
  vpc: ec2.IVpc;
  /**
     * Must be on an ELB within the provided VPC.
     */
  elbTargetGroup: elb.IApplicationTargetGroup;

  /**
     * The port on which the file system is available.
     *
     * @default 2049
     */
  fileSystemPort?: number;

  /**
     * Set your desired CPU architecture.
     * Must be X86_64 if using FARGATE_SPOT, currently.
     * To build ARM64 on an X86_64 machine, you must have emulators installed. You can use this command:
     * docker run -it --rm --privileged tonistiigi/binfmt --install all
     *
     * @default ecs.CpuArchitecture.X86_64
     */
  cpuArchitecture?: ecs.CpuArchitecture;

  /**
     * The POSIX user ID of the next.js docker user.
     *
     * @default "1001"
     */
  uid?: string;
  /**
     * The POSIX group ID of the next.js docker user.
     *
     * @default "1001"
     */
  gid?: string;

  /**
     * The port on which the Next.js application is available inside the container.
     *
     * @default 3000
     */
  nextjsContainerPort?: number;

  /**
     * The log stream prefix where the container's logs will be stored in Cloudwatch Logs.
     *
     * @default "nextjs-standalone-ecs-site"
     */
  logStreamPrefix?: string;

  /**
     * Deviations from default settings:
     * - "enableFargateCapacityProviders" is set to true.
     */
  clusterProps?: Omit<
  ecs.ClusterProps,
  'vpc' | 'enableFargateCapacityProviders'
  >;

  /**
     * Deviations from default settings:
     * - "encrypted" is set to true.
     * - "lifecyclePolicy" is set to "AFTER_90_DAYS" in order to transition old builds to the IA class.
     * - "removalPolicy" is set to DESTROY.
     */
  fileSystemProps?: Omit<efs.FileSystemProps, 'vpc'>;

  /**
     * Complete deviation from default settings.
     */
  fileSystemAccessPointProps?: Omit<efs.AccessPointProps, 'fileSystem'>;

  /**
     * "runtimePlatform" handled by this construct.
     *
     * No other deviations from default settings.
     */
  taskDefinitionProps?: Omit<
  ecs.FargateTaskDefinitionProps,
  'runtimePlatform'
  >;

  /**
     * Docker Images must be created for every environment due to changing environment variables.
     *
     * Deviations from default settings:
     * - "directory" is optional, and defaults to "./".
     * - "platform" is handled by this construct ot coincide with ECS.
     */
  dockerImageAssetProps?: Omit<
  ecrAssets.DockerImageAssetProps,
  'directory' | 'platform'
  > &
  Partial<Pick<ecrAssets.DockerImageAssetProps, 'directory'>>;

  /**
     * Complete deviation from default settings (as is required), but this is provided for overrides.
     *
     * This will create an appropriate health check for the Next.js application, set sensible logging, the image, and the port.
     */
  containerProps?: Omit<
  ecs.ContainerDefinitionProps,
  'image' | 'taskDefinition'
  >;

  /**
     * Deviations from default settings:
     * - "assignPublicIp" is set to true, rather than false. This is done because most Next.js applications are public.
     *   If you would rather use a NatGateway, you can override this prop.
     */
  serviceProps?: Omit<ecs.FargateServiceProps, 'cluster' | 'taskDefinition'>;
}

export class NextjsStandaloneEcsSite extends Construct {
  private readonly account: string;
  private readonly region: string;

  public readonly cluster: ecs.Cluster;

  public readonly fileSystem: efs.FileSystem;
  public readonly fileSystemAccessPoint: efs.AccessPoint;

  public readonly taskDefinition: ecs.TaskDefinition;
  public readonly volume: ecs.Volume;

  public readonly dockerImageAsset: ecrAssets.DockerImageAsset;

  public readonly container: ecs.ContainerDefinition;
  public readonly service: ecs.FargateService;

  constructor(
    scope: Construct,
    private readonly id: string,
    private readonly props: NextjsStandaloneEcsSiteProps,
  ) {
    super(scope, id);

    const stack = cdk.Stack.of(this);
    this.account = stack.account;
    this.region = stack.region;

    this.cluster = this.createCluster();
    this.fileSystem = this.createFileSystem();
    this.fileSystemAccessPoint = this.createFileSystemAccessPoint();
    this.taskDefinition = this.createTaskDefinition();
    this.volume = this.createVolume();
    this.dockerImageAsset = this.createImageAsset();
    this.container = this.createContainer();
    this.service = this.createService();
  }

  private createCluster(): ecs.Cluster {
    return new ecs.Cluster(this, `${this.id}-Cluster`, {
      ...this.props.clusterProps,
      vpc: this.props.vpc,
      enableFargateCapacityProviders: true,
    });
  }

  private createFileSystem(): efs.FileSystem {
    return new efs.FileSystem(this, `${this.id}-FileSystem`, {
      ...this.props.fileSystemProps,
      vpc: this.props.vpc,
      encrypted: true,
      lifecyclePolicy: efs.LifecyclePolicy.AFTER_90_DAYS,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
  }

  private createFileSystemAccessPoint(): efs.AccessPoint {
    const uid = this.props.uid ?? DEFAULT_NEXTJS_DOCKER_USER_UID;
    const gid = this.props.gid ?? DEFAULT_NEXTJS_DOCKER_USER_GID;

    return new efs.AccessPoint(this, `${this.id}-FileSystemAccessPoint`, {
      ...this.props.fileSystemAccessPointProps,
      fileSystem: this.fileSystem,
      path: DEFAULT_NEXTJS_FILE_SYSTEM_ACCESS_POINT_PATH,
      createAcl: {
        ownerUid: uid,
        ownerGid: uid,
        permissions: '755',
      },
      posixUser: {
        uid,
        gid,
      },
    });
  }

  private createTaskDefinition(): ecs.TaskDefinition {
    const taskDefinition = new ecs.FargateTaskDefinition(
      this,
      `${this.id}-TaskDefinition`,
      {
        ...this.props.taskDefinitionProps,
        runtimePlatform: {
          operatingSystemFamily: ecs.OperatingSystemFamily.LINUX,
          cpuArchitecture:
                        this.props.cpuArchitecture ??
                        DEFAULT_NEXTJS_ECS_CPU_ARCHITECTURE,
        },
      },
    );

    taskDefinition.addToTaskRolePolicy(
      new iam.PolicyStatement({
        actions: [
          'elasticfilesystem:ClientRootAccess',
          'elasticfilesystem:ClientWrite',
          'elasticfilesystem:ClientMount',
          'elasticfilesystem:DescribeMountTargets',
        ],
        resources: [
          `arn:aws:elasticfilesystem:${this.region}:${this.account}:file-system/${this.fileSystem.fileSystemId}`,
        ],
      }),
    );

    taskDefinition.addToTaskRolePolicy(
      new iam.PolicyStatement({
        actions: ['ec2:DescribeAvailabilityZones'],
        resources: ['*'],
      }),
    );

    return taskDefinition;
  }

  private createVolume(): ecs.Volume {
    const volume: ecs.Volume = {
      name: NEXTJS_VOLUME_NAME,
      efsVolumeConfiguration: {
        fileSystemId: this.fileSystem.fileSystemId,
        transitEncryption: 'ENABLED',
        transitEncryptionPort:
                    this.props.fileSystemPort ??
                    DEFAULT_NEXTJS_FILE_SYSTEM_PORT,
        authorizationConfig: {
          accessPointId: this.fileSystemAccessPoint.accessPointId,
          iam: 'ENABLED',
        },
      },
    };

    this.taskDefinition.addVolume(volume);

    return volume;
  }

  private createImageAsset(): ecrAssets.DockerImageAsset {
    return new ecrAssets.DockerImageAsset(
      this,
      `${this.id}-DockerImageAsset`,
      {
        directory:
                    this.props.dockerImageAssetProps?.directory ??
                    DEFAULT_PATH_TO_DOCKERFILE,
        platform:
                    this.props.cpuArchitecture === ecs.CpuArchitecture.ARM64
                      ? ecrAssets.Platform.LINUX_ARM64
                      : undefined, // Bug currently where there is no X64_86 option.
        ...this.props.dockerImageAssetProps,
      },
    );
  }

  private createContainer(): ecs.ContainerDefinition {
    const nextJsPort =
            this.props.nextjsContainerPort ?? DEFAULT_NEXTJS_CONTAINER_PORT;

    const container = this.taskDefinition.addContainer(
      `${this.id}-Container`,
      {
        image: ecs.ContainerImage.fromDockerImageAsset(
          this.dockerImageAsset,
        ),
        portMappings: [{ containerPort: nextJsPort }],
        logging: ecs.LogDrivers.awsLogs({
          streamPrefix:
                        this.props.logStreamPrefix ??
                        DEFAULT_NEXTJS_LOG_STREAM_PREFIX,
        }),
        healthCheck: {
          command: [
            'CMD-SHELL',
            `curl -f http://localhost:${nextJsPort} || exit 1`,
          ],
          retries: 3,
          timeout: cdk.Duration.seconds(5),
          interval: cdk.Duration.seconds(30),
        },
        ...this.props.containerProps,
      },
    );

    container.addMountPoints({
      sourceVolume: this.volume.name,
      containerPath: '/app/.next',
      readOnly: false,
    });

    return container;
  }

  private createService(): ecs.FargateService {
    const service = new ecs.FargateService(
      this,
      `${this.id}-FargateService`,
      {
        cluster: this.cluster,
        taskDefinition: this.taskDefinition,
        assignPublicIp: true,
        ...this.props.serviceProps,
      },
    );

    const efsPort =
            this.props.fileSystemPort ?? DEFAULT_NEXTJS_FILE_SYSTEM_PORT;

    service.connections.allowFrom(
      this.fileSystem,
      ec2.Port.tcp(efsPort),
      'Allow EFS access into Fargate Service',
    );

    service.connections.allowTo(
      this.fileSystem,
      ec2.Port.tcp(efsPort),
      'Allow EFS access from Fargate Service',
    );

    this.props.elbTargetGroup.addTarget(service);

    return service;
  }
}
