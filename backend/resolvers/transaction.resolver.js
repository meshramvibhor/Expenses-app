import Transaction from "../models/transaction.model.js"
import { CATEGORIES } from "../config/categories.js"

const transactionResolver = {
    Query: {
        transactions: async (_, __, context) => {
            try {
                if (!context.getUser()) {
                    throw new Error("Unauthorized")
                }

                const userId = await context.getUser()._id

                const transactions = await Transaction.find({ userId })
                console.log("transctionssss: ", transactions);

                // Add default subcategory for transactions that don't have one
                // Also convert any old "saving" category to "income"
                const transactionsWithSubcategory = transactions.map(transaction => {
                    if (!transaction.subcategory) {
                        transaction.subcategory = "other";
                    }
                    // Convert old "saving" category to "income"
                    if (transaction.category === "saving") {
                        transaction.category = "income";
                    }
                    return transaction;
                });

                return transactionsWithSubcategory
                
            } catch(err) {
                console.log('Error getting transactions: ', err);
                throw new Error("Error getting transactions")
            }
        },

        transaction: async (_, {transactionId}) => {
            try {
                const transaction = await Transaction.findById(transactionId)
                
                // Add default subcategory if missing
                if (transaction && !transaction.subcategory) {
                    transaction.subcategory = "other";
                }
                // Convert old "saving" category to "income"
                if (transaction && transaction.category === "saving") {
                    transaction.category = "income";
                }
                
                return transaction
                
            } catch(err) {
                console.log('Error getting transaction: ', err);
                throw new Error("Error getting transaction")
            }
        },

        // TODO => ADD categoryStatistics query
        categoryStatistics: async (_, __, context) => {
            if (!context.getUser()) throw new Error("Unauthorized")

            const userId = context.getUser()._id;
            console.log('user: ', userId);
            const transactions = await Transaction.find({ userId })
            console.log("Transactions user: ", transactions);

            const categoryMap = {}
            console.log("Started Category: ", categoryMap);
            transactions.forEach((transaction) => {
                // Handle missing subcategory
                if (!transaction.subcategory) {
                    transaction.subcategory = "other";
                }
                
                // Convert old "saving" category to "income"
                let category = transaction.category;
                if (category === "saving") {
                    category = "income";
                }
                
                if (!categoryMap[category]) {
                    categoryMap[category] = 0
                }
                categoryMap[category] += transaction.amount
            })
            console.log("CategpryMapp: ", categoryMap);
            return Object.entries(categoryMap).map(([category, amount]) => ({ category,totalAmount: amount }))
        },

        categories: async () => {
            const formattedCategories = {};
            
            Object.entries(CATEGORIES).forEach(([categoryKey, categoryData]) => {
                const subcategories = Object.entries(categoryData.subcategories).map(([subKey, subData]) => ({
                    key: subKey,
                    label: subData.label,
                    icon: subData.icon
                }));
                
                formattedCategories[categoryKey] = {
                    key: categoryKey,
                    label: categoryData.label,
                    subcategories
                };
            });
            
            return formattedCategories;
        },

        expenseSubcategoryStatistics: async (_, __, context) => {
            if (!context.getUser()) throw new Error("Unauthorized")

            const userId = context.getUser()._id;
            const transactions = await Transaction.find({ 
                userId, 
                category: "expense" 
            });

            const subcategoryMap = {};
            let totalExpenses = 0;

            transactions.forEach((transaction) => {
                const subcategory = transaction.subcategory || "other";
                if (!subcategoryMap[subcategory]) {
                    subcategoryMap[subcategory] = 0;
                }
                subcategoryMap[subcategory] += transaction.amount;
                totalExpenses += transaction.amount;
            });

            const statistics = Object.entries(subcategoryMap).map(([subcategory, amount]) => ({
                subcategory,
                totalAmount: amount,
                percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0
            }));

            // Sort by amount (highest first)
            return statistics.sort((a, b) => b.totalAmount - a.totalAmount);
        }
    },

    Mutation: {
        createTransaction: async (_, {input}, context) => {
            try {
                // Ensure subcategory is set
                if (!input.subcategory) {
                    input.subcategory = "other";
                }
                
                const newTransaction = new Transaction({
                    ...input,
                    userId: context.getUser()._id
                })

                await newTransaction.save();
                return newTransaction

            } catch(err) {
                console.log('Error creating transaction: ', err);
                throw new Error("Error creating transaction")
            }
        },

        updateTransaction: async (_, {input}, context) => {
            try {
                // Ensure subcategory is set
                if (!input.subcategory) {
                    input.subcategory = "other";
                }
                
                const updatedTransaction = await Transaction.findByIdAndUpdate(input.transactionId, input, {new:true})

                return updatedTransaction

            } catch(err) {
                console.log('Error updating transaction: ', err);
                throw new Error("Error updating transaction")
            }
        },
        deleteTransaction: async (_, {transactionId}, context) => {
            try {
                const deletedTransaction = await Transaction.findByIdAndDelete(transactionId)

                return deletedTransaction

            } catch(err) {
                console.log('Error deleting transaction: ', err);
                throw new Error("Error deleting transaction")
            }
        },

        // TODO => ADD TRANSACTION/USER RELATIONSHIP
    }
}

export default transactionResolver