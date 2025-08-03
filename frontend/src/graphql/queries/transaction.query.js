import { gql } from "@apollo/client";


export const GET_TRANSACTIONS = gql`
    query GetTransactions {
        transactions {
            _id
            description
            paymentType
            category
            subcategory
            amount
            location
            date
        }
    }
`;

export const GET_TRANSACTION = gql`
    query GetTransaction($id: ID!) {
        transaction(transactionId: $id) {
            _id
            description
            paymentType
            category
            subcategory
            amount
            location
            date
        }
    }
`;

export const GET_TRANSACTION_STATISTICS = gql`
    query GetTransactionStatistics {
        categoryStatistics {
            category,
            totalAmount
        }
    }
`;

export const GET_CATEGORIES = gql`
    query GetCategories {
        categories {
            expense {
                key
                label
                subcategories {
                    key
                    label
                    icon
                }
            }
            income {
                key
                label
                subcategories {
                    key
                    label
                    icon
                }
            }
            investment {
                key
                label
                subcategories {
                    key
                    label
                    icon
                }
            }
        }
    }
`;

export const GET_EXPENSE_SUBCATEGORY_STATISTICS = gql`
    query GetExpenseSubcategoryStatistics {
        expenseSubcategoryStatistics {
            subcategory
            totalAmount
            percentage
        }
    }
`;