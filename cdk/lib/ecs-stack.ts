import { Construct, Stack, StackProps } from "@aws-cdk/core";
import * as ecs from "@aws-cdk/aws-ecs";
import * as ecsPatterns from "@aws-cdk/aws-ecs-patterns";
import { DockerImageAsset } from "@aws-cdk/aws-ecr-assets";
import * as path from "path";

export class EcsStack extends Stack {
    constructor(scope: Construct, id: string) {
        super(scope, id);

        const ecrImage = new DockerImageAsset(this, "misfits-image", {
            directory: path.join(__dirname, "../../app"),
        });

        new ecsPatterns.ApplicationLoadBalancedFargateService(this, "misfits-cluster", {
            taskImageOptions: {
                image: ecs.ContainerImage.fromDockerImageAsset(ecrImage),
                containerPort: 8080,
            },
        });
    }
}
