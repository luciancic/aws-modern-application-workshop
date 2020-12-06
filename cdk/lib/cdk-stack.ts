import { Stack, StackProps, Construct, CfnOutput } from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import * as s3deploy from "@aws-cdk/aws-s3-deployment";

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, "Bucket", {
      websiteIndexDocument: "index.html",
      publicReadAccess: true,
    });

    // upload html file to s3 bucket
    new s3deploy.BucketDeployment(this, "Deployment", {
      destinationBucket: bucket,
      sources: [s3deploy.Source.asset("../web")],
    });

    new CfnOutput(this, "BucketURL", {
      value: bucket.bucketDomainName,
    });
  }
}
