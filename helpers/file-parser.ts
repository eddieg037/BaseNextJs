import * as fs from "fs";
import * as path from "path";
import * as xml2js from "xml2js";
import { parse } from "csv-parse";
import * as yaml from "js-yaml";

export const fileParser = {
  readAndParseJson,
  readAndParseXml,
  readAndParseCsv,
  readAndParseYaml,
  readAndParseFiles,
};

function readAndParseJson(filePath: string): Promise<object> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject("Error reading the JSON file: " + err);
      } else {
        try {
          const parsedData = JSON.parse(data);
          resolve(parsedData);
        } catch (parseErr) {
          reject("Error parsing JSON: " + parseErr);
        }
      }
    });
  });
}

function readAndParseXml(filePath: string): Promise<object> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        reject("Error reading the XML file: " + err);
      } else {
        const parser = new xml2js.Parser();

        parser.parseString(data, (parseErr, result) => {
          if (parseErr) {
            reject("Error parsing the XML: " + parseErr);
          } else {
            const normalizedTransactions = result.transactions.transaction.map(
              (transaction: any) => ({
                id: parseInt(transaction.$.id),
                buyerName: transaction.buyer_name[0],
                item: transaction.item[0],
                price: parseFloat(transaction.price[0]), // Convert to a number if needed
                store: transaction.store[0],
                transactionDate: new Date(transaction.transactionDate[0]), // Convert to a Date object if needed
              })
            );
            resolve(normalizedTransactions);
          }
        });
      }
    });
  });
}

function readAndParseCsv(filePath: string): Promise<object[]> {
  return new Promise((resolve, reject) => {
    const results: object[] = [];
    fs.createReadStream(filePath)
      .pipe(
        parse({
          columns: true,
          skip_empty_lines: true,
          delimiter: ",",
          record_delimiter: "\r\n",
        })
      )
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (err) => reject("Error parsing CSV: " + err));
  });
}

function readAndParseYaml(filePath: string): Promise<object> {
  return new Promise((resolve, reject) => {
    try {
      const yamlData = fs.readFileSync(filePath, "utf8");
      const parsedData: any = yaml.load(yamlData);
      resolve(parsedData);
    } catch (err) {
      reject("Error reading or parsing YAML: " + err);
    }
  });
}

// Function to read files and return a JSON object with their contents
async function readAndParseFiles(filePaths: string[]): Promise<any> {
  const fileContents: any[] = [];

  for (const filePath of filePaths) {
    const ext = path.extname(filePath).toLowerCase();

    if (ext === ".json") {
      fileContents.push(await readAndParseJson(filePath));
    } else if (ext === ".xml") {
      fileContents.push(await readAndParseXml(filePath));
    } else if (ext === ".csv") {
      fileContents.push(await readAndParseCsv(filePath));
    } else if (ext === ".yml" || ext === ".yaml") {
      fileContents.push(await readAndParseYaml(filePath));
    } else {
      throw new Error(`Unsupported file format: ${ext}`);
    }
  }

  return fileContents;
}
