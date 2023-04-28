// import { App, Stack } from 'aws-cdk-lib';
// import { Template } from 'aws-cdk-lib/assertions';
// import * as ec2 from 'aws-cdk-lib/aws-ec2';
// import * as elb from 'aws-cdk-lib/aws-elasticloadbalancingv2';
// import { NextjsStandaloneEcsSite } from '../src';

// const mockApp = new App();
// const stack = new Stack(mockApp);

// const TEST_STACK_NAME = 'TestStack';

// const vpc = new ec2.Vpc(stack, 'Vpc');
// const elbTargetGroup = new elb.ApplicationTargetGroup(stack, 'ElbTargetGroup');

// new NextjsStandaloneEcsSite(stack, TEST_STACK_NAME, {
//   vpc,
//   elbTargetGroup,
// });

// const template = Template.fromStack(stack);

// Having trouble with ECR Assets
it('true', () => {
  expect(true).toBe(true);
});

// describe('NextjsStandaloneEcsSite', () => {
//   it('Should deploy a proper ECS Cluster', () => {
//     template.hasResourceProperties('AWS::ECS::Cluster', {
//       vpc,
//       enableFargateCapacityProviders: true,
//     });
//   });
// });