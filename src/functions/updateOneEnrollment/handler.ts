import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/apiGateway";
import { isEnrollExist, updateCourse } from "@libs/dynamodb";
import { middyfy } from "@libs/lambda";
import schema from "./schema";

const updateEnrollmentH: ValidatedEventAPIGatewayProxyEvent<typeof schema> =
  async (event) => {
    const data = event.body;
    const { id } = event.pathParameters;

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
        Key: {
          id,
        },
        FilterExpression:
          "SET courseid = :courseid, studentid = :studentid, dateofassigment = :dateofassigment",
        ConditionExpression: "attribute_exists(id)",
        ExpressionAttributeValues: {
          ":courseid": data.courseid,
          ":studentid": data.studentid,
          ":dateofassigment": data.dateofassigment,
        },
        ReturnValues: "ALL_NEW",
      };
      const response = await updateCourse(query);
      return formatJSONResponse({
        message: "Enrollment updated",
        response,
      });
    }
  };

export const main = middyfy(updateEnrollmentH);
