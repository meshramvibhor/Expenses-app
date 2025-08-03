import mongoose from 'mongoose';
import Transaction from '../models/transaction.model.js';
import dotenv from 'dotenv';

dotenv.config();

const migrateCategories = async () => {
    try {
        console.log('Starting migration...');
        console.log('MONGO_URI:', process.env.MONGO_URI ? 'SET' : 'NOT SET');
        
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Check if there are any transactions
        const totalTransactions = await Transaction.countDocuments();
        console.log(`Total transactions in database: ${totalTransactions}`);

        // Update all transactions with "saving" category to "income" category
        const result = await Transaction.updateMany(
            { category: "saving" },
            { 
                $set: { 
                    category: "income",
                    subcategory: "salary" // Default subcategory for migrated saving transactions
                } 
            }
        );

        console.log(`Updated ${result.modifiedCount} transactions from 'saving' to 'income' category`);

        // Update all transactions that don't have a subcategory
        const result2 = await Transaction.updateMany(
            { subcategory: { $exists: false } },
            { 
                $set: { 
                    subcategory: "other" // Default subcategory for existing transactions
                } 
            }
        );

        console.log(`Added subcategory to ${result2.modifiedCount} transactions`);

        // Check final count
        const finalCount = await Transaction.countDocuments();
        console.log(`Final transaction count: ${finalCount}`);

        console.log('Migration completed successfully');
    } catch (error) {
        console.error('Migration failed:', error);
        console.error('Error stack:', error.stack);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
};

// Run migration if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    migrateCategories();
}

export default migrateCategories; 