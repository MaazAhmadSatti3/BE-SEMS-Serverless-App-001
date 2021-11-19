import { formatJSONResponse } from "@libs/apiGateway";
import { deleteStudent } from "@libs/dynamodb";
import { middyfy } from "@libs/lambda";
import { Handler } from "aws-lambda";

const updateStudentH: Handler = async (event) => {
  const { id } = event.pathParameters;
  // query to update student
  const query = {
    TableName: "SEMSCRUD",
    Key: {
      id,
    },
  };
  const response = await deleteStudent(query);
  return formatJSONResponse({
    message: "Studnet Deleted",
    response,
  });
};

export const main = middyfy(updateStudentH);
