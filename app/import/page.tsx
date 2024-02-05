"use client";

import { apiHandler } from "@/helpers/apiHandler/apiHandler";
import AlertBanner from "../ui/AlertBanner";
import { useState } from "react";

export default function Dashboard() {
  const [apiSuccess, setApiSuccess] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  async function importData() {
    resetApiCallProperties()
    try {
      const result = await apiHandler.getData("/api/import/all");
      setApiMessage(result.message);
      setApiSuccess(true);
      setShowAlert(true);
    } catch {
      setApiMessage("Data import has failed");
      setApiSuccess(false);
      setShowAlert(true);
    }
  }

  async function deleteAllData() {
    resetApiCallProperties()
    try {
      const result = await apiHandler.deleteData("/api/import/all");
      setApiMessage(result.message);
      setApiSuccess(true);
      setShowAlert(true);
    } catch {
      setApiMessage("Data Delete has failed");
      setApiSuccess(false);
      setShowAlert(true);
    }
  }

  function resetApiCallProperties() {
    setShowAlert(false);
    setApiSuccess(false);
    setApiMessage("");
  }

  return (
    <div className="w-full container mx-auto my-2 bg-gray-800 rounded-md text-white">
      <div className="text-center pt-4">
        <h1 className="text-2xl mb-4">Import Data</h1>
        <p>
          This page is for re-importing the data in the server or clearing all
          data. It will automatically read the data files in server and
          re-import the data to our data files in a normalized way for use in
          the application. If your dashboard components indicate no data, please
          click the 'Import Data' button. If you wish to import data from a
          local file, please reach out to an administrator for help with this,
          future enhancements will implement security and will permit certain
          users to import data from their local files.
        </p>
        <br />
        <p>
          {" "}
          **The 'Delete Data' button will delete all data in our files, this
          data can be re-imported but if any additions where done from outside
          the file, these changes will be lost.
        </p>
      </div>
      <div className="flex h-3/4 items-center justify-center mb-4">
        <button
          onClick={importData}
          className="mx-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-gray-700 rounded mx-2"
        >
          Import Data
        </button>
        <button
          onClick={deleteAllData}
          className="mx-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded mx-2"
        >
          Delete Data
        </button>
      </div>
      <AlertBanner
        type={apiSuccess ? "success" : "fail"}
        message={apiMessage}
        show={showAlert}
      />
    </div>
  );
}
