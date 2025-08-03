const transactionTypeDef = `#graphql

    type Transaction {
        _id: ID!
        userId: ID!
        description: String!
        paymentType: String!
        category: String!
        subcategory: String!
        amount: Float!
        location: String
        date: String!
    }

    type Query {
        transactions: [Transaction!]
        transaction(transactionId: ID!): Transaction
        categoryStatistics: [CategoryStatistics!]
        expenseSubcategoryStatistics: [SubcategoryStatistics!]
        categories: Categories!
    }

    type Mutation {
        createTransaction(input: CreateTransactionInput!): Transaction!
        updateTransaction(input: UpdateTransactionInput!): Transaction!
        deleteTransaction(transactionId: ID!): Transaction!
    }

    type CategoryStatistics {
        category: String!
        totalAmount: Float
    }

    type SubcategoryStatistics {
        subcategory: String!
        totalAmount: Float
        percentage: Float
    }

    type Subcategory {
        key: String!
        label: String!
        icon: String!
    }

    type Category {
        key: String!
        label: String!
        subcategories: [Subcategory!]!
    }

    type Categories {
        expense: Category!
        income: Category!
        investment: Category!
    }

    input CreateTransactionInput {
        description: String!
        paymentType: String!
        category: String!
        subcategory: String!
        amount: Float!
        location: String
        date: String!
    }

    input UpdateTransactionInput {
        transactionId: ID!
        description: String
        paymentType: String
        category: String
        subcategory: String
        amount: Float
        location: String
        date: String
    }

`
export default transactionTypeDef