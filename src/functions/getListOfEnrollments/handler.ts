import { formatJSONResponse } from "@libs/apiGateway";
import { getAllEnrollments } from "@libs/dynamodb";
import { middyfy } from "@libs/lambda";
import { Handler } from "aws-lambda";

const getListOfEnrollments: Handler = async (event) => {
  // query to get list of enrollments
  let query = {
    TableName: "SEMSCRUD",
    ProjectionExpression: "studentid, courseid, dateofassigment",
  };

  let response = await getAllEnrollments(query);

  return formatJSONResponse({
    message: "All Enrollments",
    response,
  });
};
export const main = middyfy(getListOfEnrollments);
