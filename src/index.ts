import { promises as fsp } from "fs";
import { resolve } from "path";
import { compile } from "handlebars";
import { Schema } from "node-schematron";

export async function validateInvoice(invoice: string): Promise<boolean> {
  const schemaPeppol = await fsp.readFile(resolve(__dirname, "../schematron/PEPPOL-EN16931-UBL.sch"));
  const schema = Schema.fromString(schemaPeppol.toString());
  const results = schema.validateString(invoice, { debug: true });
  console.log(results);
  return true;
}


export async function createInvoice(): Promise<string> {
  const pathStr = resolve(__dirname, "../templates/billing-3.0.template");
  // console.log(__dirname, pathStr);
  const source: Buffer = await fsp.readFile(pathStr);
  const template = compile(source.toString());
  const data = {
    ID: "Snippet1",
    IssueDate: "2017-11-13",
    DueDate: "2017-12-01",
    IssueTypeCode: 380,
    DocumentCurrencyCode: "EUR",
    AccountingCost: "4025:123:4343",
    BuyerReference: "0150abc",
    SupplierEndpointSchemeID: "0088", // ISO 6523 https://docs.peppol.eu/poacc/billing/3.0/codelist/ICD/
    SupplierEndpointID: "9482348239847239874",
    SupplierPartyID: "99887766",
    SupplierName: "SupplierTradingName Ltd.",
    SupplierStreetName: "Main street 1",
    SupplierAdditionalStreetName: "Postbox 123",
    SupplierCityName: "London",
    SupplierPostalZone: "GB 123 EW",
    SupplierCountryCode: "GB",
    SupplierTaxSchemeCompanyID: "GB1232434",
    SupplierTaxScheme: "VAT",
    SupplierLegalName: "SupplierOfficialName Ltd",
    SupplierLegalCompanyID: "GB983294",
    CustomerEndpointSchemeID: "0002",
    CustomerEndpointID: "FR23342",
    CustomerPartySchemeID: "0002", // FIXME: doesn't exist for supplier?
    CustomerPartyID: "FR23342",
    CustomerName: "BuyerTradingName AS",
    CustomerStreetName: "Hovedgatan 32",
    CustomerAdditionalStreetName: "Po box 878",
    CustomerCityName: "Stockholm",
    CustomerPostalZone: "456 34",
    CustomerCountryCode: "SE",
    CustomerTaxSchemeCompanyID: "SE4598375937",
    CustomerTaxScheme: "VAT",
    CustomerLegalName: "Buyer Official Name",
    CustomerLegalSchemeID: "0183", // FIXME: doesn't exist for supplier?
    CustomerLegalCompanyID: "39937423947",
    CustomerContactName: "Lisa Johnson",
    CustomerContactTelephone: "23434234",
    CustomerContactEmail: "lj@buyer.se",
    DeliveryActualDate: "2017-11-01",
    DeliveryLocationScheme: "0088",
    DeliveryLocationId: "9483759475923478",
    DeliveryLocationStreetName: "Delivery street 2",
    DeliveryLocationAdditionalStreetName: "Building 56",
    DeliveryCityName: "Stockholm",
    DeliveryPostalZone: "21234",
    DeliveryCountryCode: "SE",
    DeliveryPartyName: "Delivery party Name",
    PaymentMeansName: "Credit transfer",
    PaymentMeansCode: "30",
    PaymentID: "Snippet1",
    PayeeFinancialAccountID: "IBAN32423940",
    PayeeFinancialAccountName: "AccountName",
    PayeeFinancialInstitutionBranch: "BIC324098",
    PaymentTermsNote: "Payment within 10 days, 2% discount",
  };
  return template(data);
}
