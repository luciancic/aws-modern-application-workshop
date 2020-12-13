#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { CdkStack } from "../lib/cdk-stack";
import { NetworkStack } from "../lib/network-stack";
import { EcrStack } from "../lib/ecr-stack";

const app = new cdk.App();
new CdkStack(app, "misfits-bucket");
const networkStack = new NetworkStack(app, "misfits-network");
new EcrStack(app, "misfits-ecr");
