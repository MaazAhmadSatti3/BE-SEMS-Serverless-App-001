import { formatJSONResponse } from "@libs/apiGateway";
import { getEnrollment } from "@libs/dynamodb";
import { middyfy } from "@libs/lambda";
import { Handler } from "aws-lambda";

const getCourseH: Handler = async (event) => {
  const { id } = event.pathParameters;
  const query = {
    TableName: "SEMSCRUD",
    Key: {
      id,
    },
  };
  const response = await getEnrollment(query);
  return formatJSONResponse({
    message: "Enrollment Found",
    response,
  });
};

export const main = middyfy(getCourseH);
