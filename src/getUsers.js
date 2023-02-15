const AWS = require("aws-sdk");

const getUsers = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  try {
    const result = await dynamodb
      .scan({
        TableName: "UserTable",
      })
      .promise();

    const users = result.Items;

    return {
      status: 200,
      body: users,
    };
  } catch (error) {
    return {
      status: 500,
      body: {
        message: "Error get users",
        error,
      },
    };
  }
};

module.exports = {
  getUsers,
};
