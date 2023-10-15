import { APIGatewayProxyWebsocketHandlerV2 } from "aws-lambda"

export const handler: APIGatewayProxyWebsocketHandlerV2 = async (
  event,
  context
) => {
  console.log(JSON.stringify(event))
  console.log(JSON.stringify(context))

  return {
    statusCode: 200,
    body: "connected"
  }
}
