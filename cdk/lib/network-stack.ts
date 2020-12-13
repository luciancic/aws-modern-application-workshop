import { Stack, StackProps, Construct } from "@aws-cdk/core";
import * as ec2 from "@aws-cdk/aws-ec2";

export class NetworkStack extends Stack {
    public readonly vpc: ec2.Vpc;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        this.vpc = new ec2.Vpc(this, "VPC");
    }
}
