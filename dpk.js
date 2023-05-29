const crypto = require("crypto");

const createHash = (data) => {
  const stringifiedData = JSON.stringify(data);
  return crypto.createHash("sha3-512").update(stringifiedData).digest("hex");
};

exports.deterministicPartitionKey = (event) => {
  const DEFAULT_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  if (!event) return DEFAULT_PARTITION_KEY;

  let candidate = event.partitionKey || createHash(event);

  if (candidate.length > MAX_PARTITION_KEY_LENGTH)
    candidate = createHash(candidate);

  return candidate;
};
