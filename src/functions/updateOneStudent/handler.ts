import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/apiGateway";
import { isEmailExist, updateStudent } from "@libs/dynamodb";
import { middyfy } from "@libs/lambda";
import schema from "./schema";

const updateStudentH: ValidatedEventAPIGatewayProxyEvent<typeof schema> =
  async (event) => {
    const data = event.body;
    const { id } = event.pathParameters;
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
        Key: {
          id,
        },
        UpdateExpression:
          "SET #name = :name, email = :email, age = :age, dob = :dob",
        ConditionExpression: "attribute_exists(id)",
        ExpressionAttributeValues: {
          ":name": data.name,
          ":email": data.email,
          ":age": data.age,
          ":dob": data.dob,
        },
        ExpressionAttributeNames: {
          "#name": "name",
        },
        ReturnValues: "ALL_NEW",
      };
      const response = await updateStudent(query);
      return formatJSONResponse({
        message: "Student updated",
        response,
      });
    }
  };

export const main = middyfy(updateStudentH);
