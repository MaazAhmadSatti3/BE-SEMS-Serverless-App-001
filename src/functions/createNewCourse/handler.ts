import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { isCodeExist, saveCourse } from "@libs/dynamodb";
import { middyfy } from "@libs/lambda";
import { v4 as uuid } from "uuid";

import schema from "./schema";

const saveCourseH: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const data = event.body;

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
    const query = {
      TableName: "SEMSCRUD",
      Item: {
        id: uuid(),
        coursecode: data.coursecode,
        coursetitle: data.coursetitle,
        CH: data.CH,
      },
    };
    const response = await saveCourse(query);

    return formatJSONResponse({
      response,
      message: "New Course Created",
    });
  }
};
export const main = middyfy(saveCourseH);
