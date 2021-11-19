import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { isEmailExist, saveStudent } from "@libs/dynamodb";
import { middyfy } from "@libs/lambda";
import { v4 as uuid } from "uuid";

import schema from "./schema";

const saveStudentH: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const data = event.body;

  const validation = {
    TableName: "SEMSCRUD",
    FilterExpression: "#email = :email",
    ExpressionAttributeNames: {
      "#email": "email",
    },
    ExpressionAttributeValues: {
      ":email": data.email,
    },
  };

  const validEmail = await isEmailExist(validation);

  if (validEmail) {
    return formatJSONResponse({
      message: "Student already exist",
    });
  } else {
    const query = {
      TableName: "SEMSCRUD",
      Item: {
        id: uuid(),
        name: data.name,
        email: data.email,
        age: data.age,
        dob: data.dob,
      },
    };

    const response = await saveStudent(query);

    return formatJSONResponse({
      response,
      message: "New Student Created",
    });
  }
};
export const main = middyfy(saveStudentH);
