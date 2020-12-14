import { Stack, StackProps, Construct, CfnOutput } from "@aws-cdk/core";
import { IRepository } from "@aws-cdk/aws-ecr";
import { DockerImageAsset } from "@aws-cdk/aws-ecr-assets";
import * as path from "path";

export class EcrStack extends Stack {
    public readonly ecrRepository: IRepository;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const asset = new DockerImageAsset(this, "misfits-image", {
            directory: path.join(__dirname, "../../app"),
        });

        this.ecrRepository = asset.repository;

        new CfnOutput(this, "ecr-repo-name", { value: this.ecrRepository.repositoryName });
    }
}
