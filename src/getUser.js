const AWS = require("aws-sdk");

const getUser = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  try {
    const result = await dynamodb.get({
      TableName: "UserTable",
      Key: {
        id,
      },
    }).promise();

    const user = result.Item;

    if (result !== null) {
      return {
        status: 200,
        body: {
          user,
        },
      };
    } else {
      return {
        status: 404,
        message: "User not found",
      };
    }
  } catch (error) {
    return {
      status: 500,
      message: "Error get user by id",
    };
  }
};

module.exports = {
  getUser,
};
