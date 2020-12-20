import { Construct, Stack, StackProps } from "@aws-cdk/core";
import * as ec2 from "@aws-cdk/aws-ec2";
import * as ecrAssets from "@aws-cdk/aws-ecr-assets";
import * as ecs from "@aws-cdk/aws-ecs";
import * as ecsPatterns from "@aws-cdk/aws-ecs-patterns";
import * as iam from "@aws-cdk/aws-iam";

interface EcsStackProps extends StackProps {
    vpc: ec2.Vpc;
    ecrImage: ecrAssets.DockerImageAsset;
}

export class EcsStack extends Stack {
    public readonly ecsCluster: ecs.Cluster;
    public readonly ecsService: ecsPatterns.NetworkLoadBalancedFargateService;

    constructor(scope: Construct, id: string, props: EcsStackProps) {
        super(scope, id);

        this.ecsCluster = new ecs.Cluster(this, "misfits-cluster", { vpc: props.vpc });
        this.ecsCluster.connections.allowFromAnyIpv4(ec2.Port.tcp(8080));

        this.ecsService = new ecsPatterns.NetworkLoadBalancedFargateService(
            this,
            "misfits-service",
            {
                cluster: this.ecsCluster,
                desiredCount: 1,
                taskImageOptions: {
                    image: ecs.ContainerImage.fromDockerImageAsset(props.ecrImage),
                    containerPort: 8080,
                },
            }
        );
        this.ecsService.service.connections.allowFrom(
            ec2.Peer.ipv4(props.vpc.vpcCidrBlock),
            ec2.Port.tcp(8080)
        );

        const taskDefinitionPolicy = new iam.PolicyStatement();
        taskDefinitionPolicy.addActions(
            // Rules which allow ECS to attach network interfaces to instances
            // on your behalf in order for awsvpc networking mode to work right
            "ec2:AttachNetworkInterface",
            "ec2:CreateNetworkInterface",
            "ec2:CreateNetworkInterfacePermission",
            "ec2:DeleteNetworkInterface",
            "ec2:DeleteNetworkInterfacePermission",
            "ec2:Describe*",
            "ec2:DetachNetworkInterface",

            // Rules which allow ECS to update load balancers on your behalf
            //  with the information sabout how to send traffic to your containers
            "elasticloadbalancing:DeregisterInstancesFromLoadBalancer",
            "elasticloadbalancing:DeregisterTargets",
            "elasticloadbalancing:Describe*",
            "elasticloadbalancing:RegisterInstancesWithLoadBalancer",
            "elasticloadbalancing:RegisterTargets",

            //  Rules which allow ECS to run tasks that have IAM roles assigned to them.
            "iam:PassRole",

            //  Rules that let ECS create and push logs to CloudWatch.
            "logs:DescribeLogStreams",
            "logs:CreateLogGroup"
        );
        taskDefinitionPolicy.addAllResources();

        this.ecsService.service.taskDefinition.addToExecutionRolePolicy(taskDefinitionPolicy);

        const taskRolePolicy = new iam.PolicyStatement();
        taskRolePolicy.addActions(
            // Allow the ECS Tasks to download images from ECR
            "ecr:GetAuthorizationToken",
            "ecr:BatchCheckLayerAvailability",
            "ecr:GetDownloadUrlForLayer",
            "ecr:BatchGetImage",
            // Allow the ECS tasks to upload logs to CloudWatch
            "logs:CreateLogStream",
            "logs:CreateLogGroup",
            "logs:PutLogEvents"
        );
        taskRolePolicy.addAllResources();

        this.ecsService.service.taskDefinition.addToTaskRolePolicy(taskRolePolicy);
    }
}
