const emojiRegex: RegExp =
  /(:\w+:|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u27FF])/;
const discordRegex =
  /^https:\/\/(canary\.)?discord\.com\/api\/webhooks\/[0-9]+\/[a-zA-Z0-9_\-]+$/;
const slackRegex =
  /^https:\/\/hooks\.slack\.com\/services\/[a-zA-Z0-9_\-]+\/[a-zA-Z0-9_\-]+\/[a-zA-Z0-9_\-]+$/;
const hexColorRegex = /^#(?:[0-9a-fA-F]{3}){1,2}$/;

export { emojiRegex, discordRegex, slackRegex, hexColorRegex };
