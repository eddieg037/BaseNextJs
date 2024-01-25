"use client";

import { TotalPromotions } from "@/data/definitions";
import { apiHandler } from "@/helpers/apiHandler/apiHandler";
import { useEffect, useState } from "react";

export default function PromotionsTotal() {
  const [totalPromotions, setTotalPromotions] = useState<TotalPromotions>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    apiHandler
      .getData("/api/insights/promotions")
      .then((res) => res)
      .then((data) => {
        setTotalPromotions(data);
        setLoading(false);
      });
  }, []);

  if (isLoading)
    return (
      <div className="h-[400px] bg-gray-800 container mx-8 rounded-md ml-8">
        <p>Loading...</p>
      </div>
    );
  if (!totalPromotions?.totalNo)
    return (
      <div className="h-[400px] scroll-auto overflow-auto bg-gray-800 container mx-auto rounded-md mt-3 ml-8">
        <div className="h-full items-center">
          <p className="text-2xl text-center pt-[180px]">
            No Promotions data Available
          </p>
        </div>
      </div>
    );
  return (
    <div className="h-[400px] bg-gray-800 container mx-8 rounded-md mt-3">
      <h1 className="text-center my-4 text-2xl">Total Promotion Feedback</h1>
      <div>
        <h1 className="text-center text-2xl pt-4">
          Total Promotions: {totalPromotions.totalYes + totalPromotions.totalNo}
        </h1>
      </div>
      <div className="grid grid-cols-2  divide-x items-center h-[75%]">
        <h1 className="text-center text-xl my-2">
          Yes: {totalPromotions.totalYes}
        </h1>
        <h1 className="text-center text-xl my-2">
          No: {totalPromotions.totalNo}
        </h1>
      </div>
    </div>
  );
}
