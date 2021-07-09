import { promises as fsp } from "fs";
import { resolve } from "path";

export async function createInvoice(): Promise<Buffer> {
  const pathStr = resolve(__dirname, "../templates/billing-3.0.template");
  // console.log(__dirname, pathStr);
  const xmlBuff = await fsp.readFile(pathStr);
  return xmlBuff;
}
