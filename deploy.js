import Core from '@alicloud/pop-core';
import { execSync } from 'child_process';
import dotenv from 'dotenv';



// Alibaba Cloud ECS configuration
dotenv.config();
const accessKeyId = process.env.ALIBABA_ECS_ACCESS_KEY;
const accessKeySecret = process.env.ALIBABA_ECS_SECRET_KEY;
const regionId = process.env.ALIBABA_ECS_REGION;
const instanceId = process.env.ALIBABA_ECS_INSTANCE_ID;

console.log({accessKeyId,accessKeySecret,regionId,instanceId})

// Local code directory
const localCodeDir = '/path/to/your/local/code';

// Remote directory on ECS instance
const remoteDir = '/path/to/remote/directory';

// Create an ECS client instance
const client = new Core({
    accessKeyId,
    accessKeySecret,
    endpoint: `https://${regionId}.ecs.aliyuncs.com`,
    apiVersion: '2014-05-26',
});

// Copy the local code to the ECS instance using SCP
execSync(`scp -r ${localCodeDir} root@${instanceId}:${remoteDir}`);

console.log('Code deployed successfully to Alibaba ECS!');
