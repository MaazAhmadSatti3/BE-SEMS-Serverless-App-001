import type { AWS } from "@serverless/typescript";

import {
  saveStudent,
  getStudent,
  updateStudent,
  deleteStudent,
  saveCourse,
  getCourse,
  updateCourse,
  deleteCourse,
  saveEnrollment,
  getEnrollment,
  updateEnrollment,
  deleteEnrollment,
  getListOfStudents,
  getListOfCourses,
  getListOfEnrollments,
} from "@functions/index";

const serverlessConfiguration: AWS = {
  service: "serverless-task",
  frameworkVersion: "2",
  custom: {
    dynamodb: {
      stages: ["dev"],
      start: {
        port: 8000,
        migrate: true,
        seed: true,
      },
    },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
    },
  },
  plugins: [
    "serverless-esbuild",
    "serverless-dynamodb-local",
    "serverless-offline",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    lambdaHashingVersion: "20201221",
  },
  // import the function via paths
  functions: {
    saveStudent,
    getStudent,
    updateStudent,
    deleteStudent,
    saveCourse,
    getCourse,
    updateCourse,
    deleteCourse,
    saveEnrollment,
    getEnrollment,
    updateEnrollment,
    deleteEnrollment,
    getListOfStudents,
    getListOfCourses,
    getListOfEnrollments,
  },
  // All Resources
  resources: {
    Resources: {
      SEMSCRUD: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "SEMSCRUD",
          BillingMode: "PAY_PER_REQUEST",
          AttributeDefinitions: [
            {
              AttributeName: "id",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "id",
              KeyType: "HASH",
            },
          ],
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
