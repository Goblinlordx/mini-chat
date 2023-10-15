import { APIGatewayProxyWebsocketHandlerV2 } from "aws-lambda"

export const handler: APIGatewayProxyWebsocketHandlerV2 = async (
  event,
  context
) => {
  console.log(JSON.stringify(event))

  return {
    statusCode: 200,
    body: "disconnected"
  }
}
