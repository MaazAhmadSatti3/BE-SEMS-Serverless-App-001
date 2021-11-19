import { formatJSONResponse } from "@libs/apiGateway";
import { getAllCourses } from "@libs/dynamodb";
import { middyfy } from "@libs/lambda";
import { Handler } from "aws-lambda";

const getListOfCourses: Handler = async (event) => {
  // query to get list of courses
  let query = {
    TableName: "SEMSCRUD",
    ProjectionExpression: "coursetitle, CH, coursecode",
  };

  let response = await getAllCourses(query);

  return formatJSONResponse({
    message: "All enrollments",
    response,
  });
};
export const main = middyfy(getListOfCourses);
