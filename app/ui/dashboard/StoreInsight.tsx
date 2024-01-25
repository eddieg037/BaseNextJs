"use client";

import { StoreInsight } from "@/data/definitions";
import { apiHandler } from "@/helpers/apiHandler/apiHandler";
import { useEffect, useState } from "react";

export default function StoreInsight() {
  const [storeInsight, setStoreInsight] = useState<StoreInsight>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    apiHandler
      .getData("/api/insights/store")
      .then((res) => res)
      .then((data) => {
        setStoreInsight(data);
        setLoading(false);
      });
  }, []);

  if (isLoading)
    return (
      <div className="h-[400px] bg-gray-800 container mx-auto rounded-md ml-4">
        <p>Loading...</p>
      </div>
    );
  if (!storeInsight?.bestSeller)
    return (
      <div className="h-[400px] scroll-auto overflow-auto bg-gray-800 container mx-auto rounded-md mt-3 ml-4">
        <div className="h-full items-center">
          <p className="text-2xl text-center pt-[180px]">
            No Insight data Available
          </p>
        </div>
      </div>
    );
  return (
    <div className="h-[400px] bg-gray-800 container mx-auto rounded-md ml-4 mt-3">
      <h1 className="text-center my-4 text-2xl">Store Insight</h1>
      <div className="grid grid-cols-1 divide-y">
        <div className="mx-4 my-4">
          <h1 className="text-xl my-2">
            Best Selling Product: <b>{storeInsight.bestSeller}</b>
          </h1>
          <h1 className="text-xl my-2">
            Revenue: {storeInsight.bestSellerRevenue}$
          </h1>
        </div>
        <div className="mx-4 my-4">
          <h1 className="text-xl my-2">
            Best Selling Store: <b>{storeInsight.mostProfitableStore}</b>
          </h1>
          <h1 className="text-xl my-2">Revenue: {storeInsight.storeProfit}$</h1>
        </div>
      </div>
    </div>
  );
}
