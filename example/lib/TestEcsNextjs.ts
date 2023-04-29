import * as cdk from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as elbv2 from "aws-cdk-lib/aws-elasticloadbalancingv2";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as r53Targets from "aws-cdk-lib/aws-route53-targets";

import { Construct } from "constructs";
import { NextjsStandaloneEcsSite } from "cdk-nextjs-standalone-ecs";

/** Used to ensure access is only granted through Cloudfront */
const ARBITRARY_CLOUDFRONT_HEADER_KEY = "X-Arbitrary-Header";
const ARBITRARY_CLOUDFRONT_HEADER_VALUE = "235254756386655347";

const YOUR_DOMAIN_NAME = "yourdomain.com";

export class TestEcsNextjsStack extends cdk.Stack {
    private readonly hostedZone: route53.IHostedZone;
    private readonly vpc: ec2.Vpc;
    private readonly cluster: ecs.Cluster;
    private readonly elb: elbv2.ApplicationLoadBalancer;
    private readonly distribution: cloudfront.Distribution;

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        this.hostedZone = this.findHostedZone();
        this.vpc = this.createVpc();
        this.elb = this.createElb();
        this.createNextjsSite();
        this.distribution = this.createCloudFrontDistribution();
        this.createDnsRecord();
    }

    private findHostedZone(): route53.IHostedZone {
        return route53.HostedZone.fromLookup(this, "HostedZone", {
            domainName: YOUR_DOMAIN_NAME,
        });
    }

    private createVpc(): ec2.Vpc {
        return new ec2.Vpc(this, "Vpc", {
            maxAzs: 2,
            natGateways: 0
        });
    };

    private createElb(): elbv2.ApplicationLoadBalancer {
        return new elbv2.ApplicationLoadBalancer(this, 'LB', {
            vpc: this.cluster.vpc,
            internetFacing: true,
        });
    };    

    private createNextjsSite(): NextjsStandaloneEcsSite {
        const listener = this.elb.addListener('Listener', {
            port: 80,
        });

        const targetGroup = new elbv2.ApplicationTargetGroup(this, 'TargetGroup', {
            vpc: this.vpc,
            protocol: elbv2.ApplicationProtocol.HTTP,
        });

        listener.addTargetGroups('TargetGroups', {
            targetGroups: [targetGroup],
        });

       const site = new NextjsStandaloneEcsSite(this, "NextjsSite", {
            vpc: this.vpc,
            elbTargetGroup: targetGroup,
        });

        const serviceAutoScale = site.service.autoScaleTaskCount({
            minCapacity: 1,
            maxCapacity: 25,
        });

        serviceAutoScale.scaleOnCpuUtilization("CPUUtilizationScaling", {
            targetUtilizationPercent: 50,
            scaleOutCooldown: cdk.Duration.seconds(120),
        });

        return site;
    }

    private createCloudFrontDistribution = (): cloudfront.Distribution => {
        const certificate = new acm.Certificate(
            this,
            "MarketingCloudfrontCertificate",
            {
                domainName: YOUR_DOMAIN_NAME,
                validation: acm.CertificateValidation.fromDns(this.hostedZone),
            }
        );

        return new cloudfront.Distribution(this, "MarketingDistribution", {
            defaultBehavior: {
                origin: new origins.LoadBalancerV2Origin(this.elb, {
                    customHeaders: {
                        [ARBITRARY_CLOUDFRONT_HEADER_KEY]:
                            ARBITRARY_CLOUDFRONT_HEADER_VALUE,
                    },
                }),
                cachePolicy: cloudfront.CachePolicy.AMPLIFY,
                viewerProtocolPolicy:
                    cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
            },
            domainNames: [YOUR_DOMAIN_NAME],
            certificate,
        });
    };

    private createDnsRecord = (): route53.ARecord => {
        return new route53.ARecord(this, `${this.region}SupplyApiAliasRecord`, {
            recordName: YOUR_DOMAIN_NAME,
            target: route53.RecordTarget.fromAlias(
                new r53Targets.CloudFrontTarget(this.distribution)
            ),
            zone: this.hostedZone,
        });
    };
}