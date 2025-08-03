export const CATEGORIES = {
    expense: {
        label: "Expense",
        subcategories: {
            food: {
                label: "Food & Dining",
                icon: "🍽️"
            },
            travel: {
                label: "Travel & Transport",
                icon: "✈️"
            },
            entertainment: {
                label: "Entertainment",
                icon: "🎬"
            },
            shopping: {
                label: "Shopping",
                icon: "🛍️"
            },
            health: {
                label: "Health & Medical",
                icon: "🏥"
            },
            fitness: {
                label: "Fitness & Wellness",
                icon: "💪"
            },
            education: {
                label: "Education",
                icon: "📚"
            },
            housing: {
                label: "Housing & Rent",
                icon: "🏠"
            },
            utilities: {
                label: "Utilities & Bills",
                icon: "⚡"
            },
            emi: {
                label: "EMI & Loans",
                icon: "💳"
            },
            recharge: {
                label: "Recharges & Memberships",
                icon: "📱"
            },
            social: {
                label: "Social & Events",
                icon: "🎉"
            },
            personal: {
                label: "Personal Care",
                icon: "💄"
            },
            gifts: {
                label: "Gifts & Donations",
                icon: "🎁"
            },
            insurance: {
                label: "Insurance",
                icon: "🛡️"
            },
            taxes: {
                label: "Taxes",
                icon: "💰"
            },
            other: {
                label: "Other Expenses",
                icon: "📝"
            }
        }
    },
    income: {
        label: "Income",
        subcategories: {
            salary: {
                label: "Salary",
                icon: "💼"
            },
            business: {
                label: "Business Income",
                icon: "🏢"
            },
            freelance: {
                label: "Freelance",
                icon: "💻"
            },
            investment: {
                label: "Investment Returns",
                icon: "📈"
            },
            rental: {
                label: "Rental Income",
                icon: "🏘️"
            },
            bonus: {
                label: "Bonus & Incentives",
                icon: "🎯"
            },
            refund: {
                label: "Refunds & Returns",
                icon: "↩️"
            },
            gifts: {
                label: "Gifts Received",
                icon: "🎁"
            },
            other: {
                label: "Other Income",
                icon: "💵"
            }
        }
    },
    investment: {
        label: "Investment",
        subcategories: {
            stocks: {
                label: "Stocks & ETFs",
                icon: "📊"
            },
            mutual_funds: {
                label: "Mutual Funds",
                icon: "📈"
            },
            crypto: {
                label: "Cryptocurrency",
                icon: "₿"
            },
            real_estate: {
                label: "Real Estate",
                icon: "🏗️"
            },
            bonds: {
                label: "Bonds & Fixed Income",
                icon: "📋"
            },
            gold: {
                label: "Gold & Precious Metals",
                icon: "🥇"
            },
            retirement: {
                label: "Retirement Accounts",
                icon: "👴"
            },
            business: {
                label: "Business Investment",
                icon: "🏢"
            },
            other: {
                label: "Other Investments",
                icon: "💎"
            }
        }
    }
};

// Helper function to get all subcategories for a category
export const getSubcategories = (category) => {
    return CATEGORIES[category]?.subcategories || {};
};

// Helper function to get subcategory label
export const getSubcategoryLabel = (category, subcategory) => {
    return CATEGORIES[category]?.subcategories[subcategory]?.label || subcategory;
};

// Helper function to get subcategory icon
export const getSubcategoryIcon = (category, subcategory) => {
    return CATEGORIES[category]?.subcategories[subcategory]?.icon || "📝";
};

// Helper function to validate category and subcategory
export const isValidCategorySubcategory = (category, subcategory) => {
    return CATEGORIES[category]?.subcategories[subcategory] !== undefined;
}; 