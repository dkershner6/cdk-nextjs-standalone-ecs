#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { TestEcsNextjsStack } from "../lib/TestEcsNextjs";

const app = new cdk.App();

new TestEcsNextjsStack(app, "TestEcsNextjsStack", {
    env: {
        account: "714174465035", region: "us-west-2"
    }
});