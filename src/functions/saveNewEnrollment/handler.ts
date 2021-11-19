import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { isEnrollExist, saveEnrollment } from "@libs/dynamodb";
import { middyfy } from "@libs/lambda";
import { v4 as uuid } from "uuid";

import schema from "./schema";

const saveEnrollmentH: ValidatedEventAPIGatewayProxyEvent<typeof schema> =
  async (event) => {
    const data = event.body;

    const validation = {
      TableName: "SEMSCRUD",
      FilterExpression: "#courseid = :courseid AND #studentid = :studentid",
      ExpressionAttributeNames: {
        "#courseid": "courseid",
        "#studentid": "studentid",
      },
      ExpressionAttributeValues: {
        ":courseid": data.courseid,
        ":studentid": data.studentid,
      },
    };

    const validCourse = await isEnrollExist(validation);

    if (validCourse) {
      return formatJSONResponse({
        message: "Enrollment already exist",
      });
    } else {
      const query = {
        TableName: "SEMSCRUD",
        Item: {
          id: uuid(),
          courseid: data.courseid,
          studentid: data.studentid,
          dateofassigment: data.dateofassigment,
        },
      };
      const response = await saveEnrollment(query);

      return formatJSONResponse({
        response,
        message: "New Enroll Created",
      });
    }
  };
export const main = middyfy(saveEnrollmentH);
