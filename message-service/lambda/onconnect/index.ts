import { APIGatewayAuthorizerEvent, APIGatewayEventRequestContext } from "aws-lambda"

export const handler = async (
  event: APIGatewayAuthorizerEvent,
  context: APIGatewayEventRequestContext
) => {
  console.log(JSON.stringify(event))
  console.log(JSON.stringify(context))
}
