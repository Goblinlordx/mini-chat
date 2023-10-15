import { APIGatewayProxyWebsocketHandlerV2 } from "aws-lambda"

export const handler: APIGatewayProxyWebsocketHandlerV2 = async (
  event,
  context
) => {
  const { connectionId } = event.requestContext
  console.log(connectionId)

  return {}
}
