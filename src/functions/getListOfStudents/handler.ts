import { formatJSONResponse } from "@libs/apiGateway";
import { getAllStudents } from "@libs/dynamodb";
import { middyfy } from "@libs/lambda";
import { Handler } from "aws-lambda";

const getListOfStudents: Handler = async (event) => {
  let query = {
    TableName: "SEMSCRUD",
    ProjectionExpression: "#name, email, age, dob",
    ExpressionAttributeNames: {
      "#name": "name",
    },
  };

  let response = await getAllStudents(query);

  return formatJSONResponse({
    message: "All studnets",
    response,
  });
};
export const main = middyfy(getListOfStudents);
