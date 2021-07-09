import { createInvoice, validateInvoice } from "./index";

async function go() {
  const invoice = await createInvoice();
  // validateInvoice(invoice);
  console.log(invoice);
}

// ...
go();
