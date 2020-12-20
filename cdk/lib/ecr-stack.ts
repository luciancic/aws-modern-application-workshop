import { Stack, StackProps, Construct } from "@aws-cdk/core";
import { DockerImageAsset } from "@aws-cdk/aws-ecr-assets";
import * as path from "path";

export class EcrStack extends Stack {
    public readonly ecrImage: DockerImageAsset;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        this.ecrImage = new DockerImageAsset(this, "misfits-image", {
            directory: path.join(__dirname, "../../app"),
        });
    }
}
