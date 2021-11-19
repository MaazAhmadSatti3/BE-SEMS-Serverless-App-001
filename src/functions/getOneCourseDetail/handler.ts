import { formatJSONResponse } from "@libs/apiGateway";
import { getCourse } from "@libs/dynamodb";
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
  const response = await getCourse(query);
  return formatJSONResponse({
    message: "Course Found",
    response,
  });
};

export const main = middyfy(getCourseH);
