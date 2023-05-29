const crypto = require("crypto");
const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns a valid key when given an input with no partitionKey property", () => {
    const mockCreateHash = jest.spyOn(crypto, "createHash");
    mockCreateHash.mockImplementation(() => ({
      update: () => ({
        digest: () => "hash",
      }),
    }));

    const trivialKey = deterministicPartitionKey({ invalidProperty: "0" });
    expect(trivialKey).toBe("hash");
  });

  it("Returns a valid key when given an input with partitionKey property", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: "123" });
    expect(trivialKey).toBe("123");
  });

  it("Returns a valid key when given an input with partitionKey length greater than 256 chars", () => {
    const mockCreateHash = jest.spyOn(crypto, "createHash");
    mockCreateHash.mockImplementation(() => ({
      update: () => ({
        digest: () => "hash",
      }),
    }));

    const trivialKey = deterministicPartitionKey({
      partitionKey:
        "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    });
    expect(trivialKey).toBe("hash");
  });
});
