import { promises as fsp } from "fs";
import { resolve } from "path";

export async function createInvoice(): Promise<Buffer> {
  const pathStr = resolve(__dirname, "../base-example.xml");
  console.log(__dirname, pathStr);
  const xmlBuff = await fsp.readFile(pathStr);
  return xmlBuff;
}
