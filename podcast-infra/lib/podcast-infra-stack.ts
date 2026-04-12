import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';

export class PodcastInfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // S3: Scripts bucket (Aivaro uploads generated scripts here)
    const scriptsBucket = new s3.Bucket(this, 'ScriptsBucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // S3: Output bucket (audio + manifest)
    const outputBucket = new s3.Bucket(this, 'OutputBucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      publicReadAccess: true,
      blockPublicAccess: new s3.BlockPublicAccess({
        blockPublicAcls: false,
        ignorePublicAcls: false,
        blockPublicPolicy: false,
        restrictPublicBuckets: false,
      }),
      cors: [{
        allowedOrigins: ['https://www.amllamojha.com', 'https://amllamojha.com', 'http://localhost:5173'],
        allowedMethods: [s3.HttpMethods.GET],
        allowedHeaders: ['*'],
      }],
    });

    // Lambda: Orchestrator (reads script, calls Polly, uploads audio)
    const orchestrator = new NodejsFunction(this, 'Orchestrator', {
      entry: path.join(__dirname, '../lambda/orchestrator/index.js'),
      handler: 'handler',
      runtime: Runtime.NODEJS_20_X,
      timeout: cdk.Duration.minutes(15),
      memorySize: 512,
      environment: {
        SCRIPTS_BUCKET: scriptsBucket.bucketName,
        OUTPUT_BUCKET: outputBucket.bucketName,
      },
      bundling: {
        externalModules: [],
      },
    });

    // Permissions
    scriptsBucket.grantRead(orchestrator);
    outputBucket.grantReadWrite(orchestrator);

    orchestrator.addToRolePolicy(new iam.PolicyStatement({
      actions: ['polly:SynthesizeSpeech'],
      resources: ['*'],
    }));

    // Outputs
    new cdk.CfnOutput(this, 'ScriptsBucketName', { value: scriptsBucket.bucketName });
    new cdk.CfnOutput(this, 'OutputBucketName', { value: outputBucket.bucketName });
    new cdk.CfnOutput(this, 'OrchestratorArn', { value: orchestrator.functionArn });
  }
}
