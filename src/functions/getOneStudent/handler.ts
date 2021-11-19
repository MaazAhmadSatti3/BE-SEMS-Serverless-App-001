import { formatJSONResponse } from "@libs/apiGateway";
import { getStudent } from "@libs/dynamodb";
import { middyfy } from "@libs/lambda";
import { Handler } from "aws-lambda";

const getStudentH: Handler = async (event) => {
  const { id } = event.pathParameters;
  // query to get one student
  const query = {
    TableName: "SEMSCRUD",
    Key: {
      id,
    },
  };
  const response = await getStudent(query);
  return formatJSONResponse({
    message: "Studnet Found",
    response,
  });
};

export const main = middyfy(getStudentH);
