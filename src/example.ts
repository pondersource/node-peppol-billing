import { createInvoice } from "./index";

async function go() {
  const invoice = await createInvoice();
  console.log(invoice.toString());
}

// ...
go();
