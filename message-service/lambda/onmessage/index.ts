import {
  APIGatewayEventWebsocketRequestContextV2,
  APIGatewayProxyWebsocketEventV2,
} from "aws-lambda"

export const handler = async (
  event: APIGatewayProxyWebsocketEventV2,
  context: APIGatewayEventWebsocketRequestContextV2
) => {
  console.log(JSON.stringify(event))
  console.log(JSON.stringify(context))

  return { statusCode: 200 }
}
