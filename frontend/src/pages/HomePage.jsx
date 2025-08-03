import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import toast from "react-hot-toast"

import Cards from "../components/Cards";
import TransactionForm from "../components/TransactionForm";

import { MdLogout } from "react-icons/md";
import { useMutation, useQuery } from "@apollo/client";
import { LOGOUT } from "../graphql/mutations/user.mutation";
import { GET_TRANSACTION_STATISTICS, GET_EXPENSE_SUBCATEGORY_STATISTICS } from "../graphql/queries/transaction.query";
import { GET_AUTHENTICATED_USER } from "../graphql/queries/user.query";
import { useEffect, useState } from "react";

// const chartData = {
// 	labels: ["Saving", "Expense", "Investment"],
// 	datasets: [
// 		{
// 			label: "%",
// 			data: [13, 8, 3],
// 			backgroundColor: ["rgba(75, 192, 192)", "rgba(255, 99, 132)", "rgba(54, 162, 235)"],
// 			borderColor: ["rgba(75, 192, 192)", "rgba(255, 99, 132)", "rgba(54, 162, 235, 1)"],
// 			borderWidth: 1,
// 			borderRadius: 30,
// 			spacing: 10,
// 			cutout: 130,
// 		},
// 	],
// };


ChartJS.register(ArcElement, Tooltip, Legend);

const HomePage = () => {
	const {data, error: statsError} = useQuery(GET_TRANSACTION_STATISTICS)
	const {data: expenseSubcategoryData, error: expenseSubcategoryError} = useQuery(GET_EXPENSE_SUBCATEGORY_STATISTICS)
	const {data: authUserData} = useQuery(GET_AUTHENTICATED_USER)
	
	const [logout, {loading, client}] = useMutation(LOGOUT, {
		refetchQueries: ["GetAuthenticatedUser"]
	})

	const [chartData, setChartData] = useState({
		labels: [],
		datasets: [
			{
				label: "$",
				data: [],
				backgroundColor: [],
				borderColor: [],
				borderWidth: 4,
				borderRadius: 8,
				spacing: 6,
				cutout: '75%',
			},
		],
	});

	const [expenseSubcategoryChartData, setExpenseSubcategoryChartData] = useState({
		labels: [],
		datasets: [
			{
				label: "$",
				data: [],
				backgroundColor: [],
				borderColor: [],
				borderWidth: 4,
				borderRadius: 8,
				spacing: 6,
				cutout: '75%',
			},
		],
	});

	const chartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false
			},
			tooltip: {
				backgroundColor: 'rgba(0, 0, 0, 0.8)',
				titleColor: 'white',
				bodyColor: 'white',
				borderColor: 'rgba(255, 255, 255, 0.2)',
				borderWidth: 1,
				cornerRadius: 8,
				callbacks: {
					label: function(context) {
						const label = context.label || '';
						const value = context.parsed;
						return `${label}: $${value.toFixed(2)}`;
					}
				}
			}
		},
		layout: {
			padding: {
				left: 20,
				right: 20
			}
		}
	};

	useEffect(() => {
		if (data?.categoryStatistics && !statsError) {
			console.log("data: ", data.categoryStatistics);
			const categories = data.categoryStatistics.map((stat) => stat.category)
			const totalAmounts = data.categoryStatistics.map(stat => stat.totalAmount)

			console.log("Categories found:", categories);
			console.log("Amounts:", totalAmounts);

			const backgroundColors = []
			const borderColors = []

			categories.forEach(category => {
				console.log("Processing category:", category);
				if (category === "expense") {
					backgroundColors.push("rgba(255, 99, 132, 0.8)"); // Red
					borderColors.push("rgba(255, 99, 132, 1)");
				} else if (category === "income") {
					backgroundColors.push("rgba(75, 192, 192, 0.8)"); // Green
					borderColors.push("rgba(75, 192, 192, 1)");
				} else if (category === "investment") {
					backgroundColors.push("rgba(54, 162, 235, 0.8)"); // Blue
					borderColors.push("rgba(54, 162, 235, 1)");
				} else {
					// Default color for unknown categories
					backgroundColors.push("rgba(128, 128, 128, 0.8)"); // Gray
					borderColors.push("rgba(128, 128, 128, 1)");
				}
			})

			console.log("Background colors:", backgroundColors);
			console.log("Border colors:", borderColors);

			// Create user-friendly labels
			const userFriendlyLabels = categories.map(category => {
				switch(category) {
					case 'expense': return 'Expenses';
					case 'income': return 'Income';
					case 'investment': return 'Investments';
					default: return category.charAt(0).toUpperCase() + category.slice(1);
				}
			});

			setChartData((prev) => ({
				labels: userFriendlyLabels,
				datasets: [{
					...prev.datasets[0],
					data: totalAmounts,
					backgroundColor: backgroundColors,
					borderColor: borderColors
				}]
			}))


		}
	}, [data, statsError])

	// Effect for expense subcategory chart
	useEffect(() => {
		if (expenseSubcategoryData?.expenseSubcategoryStatistics && !expenseSubcategoryError) {
			console.log("Expense subcategory data: ", expenseSubcategoryData.expenseSubcategoryStatistics);
			
			const subcategories = expenseSubcategoryData.expenseSubcategoryStatistics.map((stat) => stat.subcategory);
			const totalAmounts = expenseSubcategoryData.expenseSubcategoryStatistics.map(stat => stat.totalAmount);
			const percentages = expenseSubcategoryData.expenseSubcategoryStatistics.map(stat => stat.percentage);

			console.log("Expense subcategories found:", subcategories);
			console.log("Expense amounts:", totalAmounts);
			console.log("Expense percentages:", percentages);

			// Generate colors for expense subcategories
			const expenseColors = [
				"rgba(255, 99, 132, 0.8)",   // Red
				"rgba(255, 159, 64, 0.8)",   // Orange
				"rgba(255, 205, 86, 0.8)",   // Yellow
				"rgba(75, 192, 192, 0.8)",   // Green
				"rgba(54, 162, 235, 0.8)",   // Blue
				"rgba(153, 102, 255, 0.8)",  // Purple
				"rgba(255, 99, 255, 0.8)",   // Pink
				"rgba(255, 159, 255, 0.8)",  // Light Pink
				"rgba(255, 205, 255, 0.8)",  // Very Light Pink
				"rgba(75, 192, 255, 0.8)",   // Light Blue
				"rgba(54, 162, 255, 0.8)",   // Blue
				"rgba(153, 102, 255, 0.8)",  // Purple
				"rgba(255, 99, 132, 0.8)",   // Red
				"rgba(255, 159, 64, 0.8)",   // Orange
				"rgba(255, 205, 86, 0.8)",   // Yellow
				"rgba(75, 192, 192, 0.8)",   // Green
			];

			const backgroundColors = [];
			const borderColors = [];

			subcategories.forEach((subcategory, index) => {
				const color = expenseColors[index % expenseColors.length];
				backgroundColors.push(color);
				borderColors.push(color.replace('0.8', '1'));
			});

			// Create user-friendly labels with percentages
			const userFriendlyLabels = subcategories.map((subcategory, index) => {
				const percentage = percentages[index];
				const label = subcategory.charAt(0).toUpperCase() + subcategory.slice(1).replace('_', ' ');
				return `${label} (${percentage.toFixed(1)}%)`;
			});

			setExpenseSubcategoryChartData((prev) => ({
				labels: userFriendlyLabels,
				datasets: [{
					...prev.datasets[0],
					data: totalAmounts,
					backgroundColor: backgroundColors,
					borderColor: borderColors
				}]
			}));
		}
	}, [expenseSubcategoryData, expenseSubcategoryError])

	const handleLogout = async () => {
		console.log("Logging out...");
		try {
			await logout()    

			// Clear the Apollo clinet cache
			client.resetStore()
				.then((res) => console.log(res))
				.catch((err) => console.log("errr: ", err))
		} catch (error) {
			console.log("Error logging out: ", error);
			toast.error(error.message)
		}

	};


	return (
		<>
			<div className='flex flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center'>
				<div className='flex items-center'>
					<p className='md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text'>
						Spend wisely, track wisely
					</p>
					<img
						src={authUserData?.authUser.profilePicture}
						className='w-11 h-11 rounded-full border cursor-pointer'
						alt='Avatar'
					/>
					{!loading && <MdLogout className='mx-2 w-5 h-5 cursor-pointer' onClick={handleLogout} />}
					{/* loading spinner */}
					{loading && <div className='w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin'></div>}
				</div>
				<div className='flex flex-col lg:flex-row w-full justify-center items-start gap-8'>
					{/* Charts Section - Left Side */}
					<div className='flex flex-row gap-6'>
						{/* Overall Financial Overview Chart */}
						<div className=''>
							<h3 className='text-xl font-bold text-white mb-4 text-center'>Overall Financial Overview</h3>
							<div className='h-[250px] w-[280px]'>
								{chartData.labels.length > 0 ? (
									<Doughnut data={chartData} options={chartOptions} />
								) : (
									<div className='h-full w-full flex items-center justify-center bg-gray-100/20 rounded-xl'>
										<p className='text-gray-300 text-center'>No transaction data to display</p>
									</div>
								)}
							</div>
						</div>

						{/* Expense Breakdown Chart */}
						<div className=''>
							<h3 className='text-xl font-bold text-white mb-4 text-center'>Expense Breakdown</h3>
							<div className='h-[250px] w-[280px]'>
								{expenseSubcategoryChartData.labels.length > 0 ? (
									<Doughnut data={expenseSubcategoryChartData} options={chartOptions} />
								) : (
									<div className='h-full w-full flex items-center justify-center bg-gray-100/20 rounded-xl'>
										<p className='text-gray-300 text-center'>No expense data to display</p>
									</div>
								)}
							</div>
						</div>
					</div>

					{/* Transaction Form - Right Side */}
					<div className='flex-shrink-0'>
						<TransactionForm />
					</div>
				</div>
				<Cards />
			</div>
		</>
	);
};
export default HomePage;