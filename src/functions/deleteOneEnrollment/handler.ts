import { formatJSONResponse } from "@libs/apiGateway";
import { deleteEnrollment } from "@libs/dynamodb";
import { middyfy } from "@libs/lambda";
import { Handler } from "aws-lambda";

const deleteEnrollmentH: Handler = async (event) => {
  const { id } = event.pathParameters;
  // query to delete enrollment
  const query = {
    TableName: "SEMSCRUD",
    Key: {
      id,
    },
  };
  const response = await deleteEnrollment(query);
  return formatJSONResponse({
    message: "Enrollment Deleted",
    response,
  });
};

export const main = middyfy(deleteEnrollmentH);
