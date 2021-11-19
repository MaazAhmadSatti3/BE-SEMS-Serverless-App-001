import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/apiGateway";
import { isCodeExist, updateCourse } from "@libs/dynamodb";
import { middyfy } from "@libs/lambda";
import schema from "./schema";

const updateCourseH: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const data = event.body;
  const { id } = event.pathParameters;
// validation on basis of course code
  const validation = {
    TableName: "SEMSCRUD",
    FilterExpression: "#coursecode = :coursecode",
    ExpressionAttributeNames: {
      "#coursecode": "coursecode",
    },
    ExpressionAttributeValues: {
      ":coursecode": data.coursecode,
    },
  };

  const validCourse = await isCodeExist(validation);

  if (validCourse) {
    return formatJSONResponse({
      message: "Course already exist",
    });
  } else {
    // query to update course
    const query = {
      TableName: "SEMSCRUD",
      Key: {
        id,
      },
      UpdateExpression:
        "SET coursecode = :coursecode, coursetitle = :coursetitle, CH = :CH",
      ConditionExpression: "attribute_exists(id)",
      ExpressionAttributeValues: {
        ":coursecode": data.coursecode,
        ":coursetitle": data.coursetitle,
        ":CH": data.CH,
      },
      ReturnValues: "ALL_NEW",
    };
    const response = await updateCourse(query);
    return formatJSONResponse({
      message: "Course updated",
      response,
    });
  }
};

export const main = middyfy(updateCourseH);
