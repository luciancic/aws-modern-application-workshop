import { Stack, StackProps, Construct } from "@aws-cdk/core";
import { Repository } from "@aws-cdk/aws-ecr";

export class EcrStack extends Stack {
    public readonly ecrRepository: Repository;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        this.ecrRepository = new Repository(this, "misfits-repo");
    }
}
