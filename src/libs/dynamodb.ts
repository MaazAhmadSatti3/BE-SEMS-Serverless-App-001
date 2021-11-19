import * as AWS from "aws-sdk";

// Dynamodb configuration for online and offline
const dynamoClient = process.env.IS_OFFLINE
  ? new AWS.DynamoDB.DocumentClient({
      region: "localhost",
      endpoint: "http://localhost:8000",
    })
  : new AWS.DynamoDB.DocumentClient({});

//  student CRUD
export const saveStudent = async (query) => {
  try {
    await dynamoClient.put(query).promise();
    return query.Item;
  } catch (error) {
    return "Student Not Saved";
  }
};

export const getStudent = async (query) => {
  try {
    const data = await dynamoClient.get(query).promise();
    return data;
  } catch (error) {
    return "Wrong ID";
  }
};

export const updateStudent = async (query) => {
  try {
    await dynamoClient.update(query).promise();
    return query.Item;
  } catch (error) {
    console.error(error);
    return "Student not found";
  }
};

export const deleteStudent = async (query) => {
  try {
    await dynamoClient.delete(query).promise();
    return query.Item;
  } catch (error) {
    return "Student not found";
  }
};

// Course CRUD

export const saveCourse = async (query) => {
  try {
    await dynamoClient.put(query).promise();
    return query.Item;
  } catch (error) {
    return "Course Not Saved";
  }
};

export const deleteCourse = async (query) => {
  try {
    await dynamoClient.delete(query).promise();
    return query.Item;
  } catch (error) {
    return "Invalid ID";
  }
};

export const updateCourse = async (query) => {
  try {
    await dynamoClient.update(query).promise();
    return query.Item;
  } catch (error) {
    console.error(error);
    return "Invalid ID";
  }
};

export const getCourse = async (query) => {
  try {
    const data = await dynamoClient.get(query).promise();
    return data;
  } catch (error) {
    return "Wrong ID";
  }
};

// Enrollment CRUD
export const saveEnrollment = async (query) => {
  try {
    await dynamoClient.put(query).promise();
    return query.Item;
  } catch (error) {
    return "Enrollment Not Saved";
  }
};

export const getEnrollment = async (query) => {
  try {
    const data = await dynamoClient.get(query).promise();
    return data;
  } catch (error) {
    return "Wrong ID";
  }
};

export const deleteEnrollment = async (query) => {
  try {
    await dynamoClient.delete(query).promise();
    return query.Item;
  } catch (error) {
    return "Invalid ID";
  }
};

// Get AlL Students, Courses, Enrollments

export const getAllStudents = async (query) => {
  try {
    const students = await dynamoClient.scan(query).promise();
    if (!students) throw Error(`No Students found`);
    return students;
  } catch (error) {
    console.error(error);
    return {
      message: "Unable to fetch",
    };
  }
};

export const getAllCourses = async (query) => {
  try {
    const courses = await dynamoClient.scan(query).promise();
    if (!courses) throw Error(`No Courses found`);
    return courses;
  } catch (error) {
    console.error(error);
    return {
      message: "Unable to fetch",
    };
  }
};

export const getAllEnrollments = async (query) => {
  try {
    const enrollments = await dynamoClient.scan(query).promise();
    if (!enrollments) throw Error(`No enrollments found`);
    return enrollments;
  } catch (error) {
    console.error(error);
    return {
      message: "Unable to fetch",
    };
  }
};

// student validation through email

export const isEmailExist = async (validation) => {
  const getEmail = await dynamoClient.scan(validation).promise();
  if (getEmail.Count === 0) {
    return false;
  } else {
    return true;
  }
};

// course validation through course code

export const isCodeExist = async (validation) => {
  const getCourse = await dynamoClient.scan(validation).promise();
  if (getCourse.Count === 0) {
    return false;
  } else {
    return true;
  }
};

// enroll validation through course and student id

export const isEnrollExist = async (validation) => {
  const getEnroll = await dynamoClient.scan(validation).promise();
  if (getEnroll.Count === 0) {
    return false;
  } else {
    return true;
  }
};
