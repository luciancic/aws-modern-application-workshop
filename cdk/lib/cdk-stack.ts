import { Stack, StackProps, Construct, CfnOutput } from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import * as s3deploy from "@aws-cdk/aws-s3-deployment";
import * as cloudfront from "@aws-cdk/aws-cloudfront";
import * as origins from "@aws-cdk/aws-cloudfront-origins";

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, "Bucket");

    // create CDN and point to s3 bucket
    const cdn = new cloudfront.Distribution(this, "CloudFrontCDN", {
      defaultBehavior: { origin: new origins.S3Origin(bucket) },
    });

    // upload html file to s3 bucket
    new s3deploy.BucketDeployment(this, "Deployment", {
      destinationBucket: bucket,
      sources: [s3deploy.Source.asset("../web")],
    });

    new CfnOutput(this, "CDNURL", {
      value: cdn.distributionDomainName,
    });
    new CfnOutput(this, "BucketURL", {
      value: bucket.bucketDomainName,
    });
  }
}
