import { formatJSONResponse } from "@libs/apiGateway";
import { deleteCourse } from "@libs/dynamodb";
import { middyfy } from "@libs/lambda";
import { Handler } from "aws-lambda";

const deleteCourseH: Handler = async (event) => {
  const { id } = event.pathParameters;
  const query = {
    TableName: "SEMSCRUD",
    Key: {
      id,
    },
  };
  const response = await deleteCourse(query);
  return formatJSONResponse({
    message: "Course Deleted",
    response,
  });
};

export const main = middyfy(deleteCourseH);
