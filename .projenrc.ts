import { awscdk } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Derek Kershner',
  authorAddress: 'https://dkershner.com',
  cdkVersion: '2.77.0',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.0.0',
  name: 'cdk-nextjs-standalone-ecs',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/dkershner/cdk-nextjs-standalone-ecs.git',

  // deps: [],                /* Runtime dependencies of this module. */
  description: 'A CDK Construct for Next.js to deploy to an ISR capable ECS Fargate Service and Task',
  // devDeps: [],             /* Build dependencies for this module. */
  packageName: 'cdk-nextjs-standalone-ecs', /* The "name" in package.json. */

  stability: 'experimental',
});
project.synth();