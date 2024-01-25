import { StoreInsight, Transaction } from "@/data/definitions";
import { transactionsRepo } from "@/helpers/repos/transactions-repo";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const transactions = transactionsRepo.getAll();
    const itemMap = new Map<string, number>();
    const storeMap = new Map<string, number>();
    transactions.forEach((transaction: Transaction) => {
      // Update itemMap
      if (itemMap.has(transaction.item)) {
        itemMap.set(
          transaction.item,
          itemMap.get(transaction.item)! + transaction.price
        );
      } else {
        itemMap.set(transaction.item, transaction.price);
      }

      // Update storeMap
      if (storeMap.has(transaction.store)) {
        storeMap.set(
          transaction.store,
          storeMap.get(transaction.store)! + transaction.price
        );
      } else {
        storeMap.set(transaction.store, transaction.price);
      }
    });

    // Find most sold item
    let mostSoldItem: any = { itemName: "", totalRevenue: 0 };
    for (const [item, revenue] of itemMap) {
      if (revenue > mostSoldItem.totalRevenue) {
        mostSoldItem = { itemName: item, totalRevenue: revenue };
      }
    }

    // Find most profitable store
    let mostProfitableStore: any = { storeName: "", totalProfit: 0 };
    for (const [store, profit] of storeMap) {
      if (profit > mostProfitableStore.totalProfit) {
        mostProfitableStore = { storeName: store, totalProfit: profit };
      }
    }

    const storeInsight: StoreInsight = {
      bestSeller: mostSoldItem.itemName,
      bestSellerRevenue: mostSoldItem.totalRevenue,
      mostProfitableStore: mostProfitableStore.storeName,
      storeProfit: mostProfitableStore.totalProfit,
    };

    res.status(200).json(storeInsight);
  } catch (error) {
    res.status(500).json({
      error: `failed to execute stores insight`,
    });
  }
}
