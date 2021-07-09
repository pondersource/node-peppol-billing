import { createInvoice } from "../src/index";

describe("createInvoice", () => {
  it("returns a buffer", async () => {
    const xmlBuff = await createInvoice();
    expect(xmlBuff.length).toEqual(9228);
  });
});
