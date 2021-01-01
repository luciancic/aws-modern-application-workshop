# Build a Modern Application on AWS

**Mythical Mysfits** is a (fictional) pet adoption non-profit that needs a more scalable way to show inventory and let families adopt them. This is an exercise in experimenting with modern application development on AWS.

## Overview

Modern applications are resilient, scalable collections of independent services that abstract away the underlying infrastructure. Modern application development leverages agile development practices, immutable deployments, and programmable infrastructure to continuously release new features to the business and end users.

AWS provides all the services and features required for a developer to create a modern application, and the tools to build it using modern development methodologies. This repo is a tutorial to create a sample web application that leverages concepts and approaches such as containers, infrastructure as code, CI/CD, and serverless code functions. The goal is to build, from the ground up, a sample website called **Mythical Mysfits** that enables visitors to adopt a fantasy creature as a pet. You can see a working sample of this website available at: www.mythicalmysfits.com

The site will present _mysfits_ available for adoption with some different characteristics about each. Users will be able to vote on which mysfits are their favorites, and then choose to adopt the mysfit they'd like to reserve for adoption. The Mythical Mysfits website you create will also allow you to gather insights about user behavior for future analyses.

This sample application will use many different AWS services and features that modern applications leverage on AWS. But, learning about _what_ those individual services and their features are is not the primary objective of this workshop. Instead, this workshop is meant to give you an experience of _how_ developers are able to build modern applications by interacting with those features and services through the development tools that AWS provides.

To learn more about how to build your own **Well Architected** and modern application on AWS, please [visit here](https://aws.amazon.com/architecture/well-architected/) for additional content about following AWS best practices in your own architecture.

## Using the AWS CDK

This project uses the python-cdk branch of the workshop, using python for the microservices, angular for the front-end and aws cdk for infrastructure-as-code.

### Useful commands

-   `cdk deploy` deploy this stack to your default AWS account/region
-   `cdk diff` compare deployed stack with current state
-   `cdk synth` emits the synthesized CloudFormation template

### AWS Developer Center

For more details on tools and services for developers provided by AWS, please visit our [Developer Center](https://developer.aws).<br/>
For information on best practices for modern application development, please [visit here](https://aws.amazon.com/modern-apps/).
