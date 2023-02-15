const AWS = require("aws-sdk");
const { v4 } = require("uuid");
const createUser = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { email, username, password } = JSON.parse(event.body);
  const createdAt = new Date();

  const id = v4();

  const newUser = {
    username,
    email,
    password,
    id,
    createdAt,
  };

  try {
    await dynamodb
      .put({
        TableName: "UserTable",
        Item: newUser,
      })
      .promise();
    return {
      status: 201,
      body: {
        username,
        email,
        password,
        id,
        createdAt,
      },
    };
  } catch (error) {
    return {
      status: 500,
      message: error,
    };
  }
};

module.exports = {
  createUser,
};
