const AWS = require("aws-sdk");

const updateUser = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;
  const { email, username, password } = JSON.parse(event.body);

  try {
    await dynamodb
      .update({
        TableName: "UserTable",
        Key: { id },
        UpdateExpression: "set email = :email, username = :username",
        ExpressionAttributeValues: {
          ":email": email,
          ":username": username,
        },
        ReturnValues: "ALL_NEW",
      })
      .promise();

    return {
      status: 200,
      body: JSON.stringify({
        message: "user updated",
      }),
    };
  } catch (error) {
    return {
        status: 500,
        body: JSON.stringify({
            message: "error updating user",
            error
        })
    }
  }
};

module.exports = {
  updateUser,
};
