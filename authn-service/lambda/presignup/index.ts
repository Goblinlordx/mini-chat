import { PreSignUpTriggerHandler } from "aws-lambda"

const EMAIL_DOMAIN_WHITELIST = new Set(
  (process.env.EMAIL_DOMAIN_WHITELIST ?? "")
    .split(",")
    .map((v) => v.trim())
    .filter((v) => v)
)
const EMAIL_WHITELIST = new Set(
  (process.env.EMAIL_WHITELIST ?? "")
    .split(",")
    .map((v) => v.trim())
    .filter((v) => v)
)

const RESTRICTED = (EMAIL_DOMAIN_WHITELIST.size + EMAIL_WHITELIST.size) > 0

export const handler: PreSignUpTriggerHandler = async (event, context) => {
  const { email } = event.request.userAttributes

  const [_, domain] = email.split("@")

  if (RESTRICTED && !EMAIL_DOMAIN_WHITELIST.has(domain) && !EMAIL_WHITELIST.has(email)) {
    throw new Error("must be authorized user to sign up")
  }

  return {}
}
