import { useQuery } from "@apollo/client";
import Card from "./Card";
import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";

const Cards = () => {

	const {data, loading, error} = useQuery(GET_TRANSACTIONS)

	console.log("Transactions: ", data);
	console.log("Error: ", error);
	
	if (error) return (
		<div className='w-full px-10 min-h-[40vh]'>
			<p className='text-5xl font-bold text-center my-10'>History</p>
			<p className="text-red-500 text-center">Error loading transactions: {error.message}</p>
		</div>
	);

	if (loading) return (
		<div className='w-full px-10 min-h-[40vh]'>
			<p className='text-5xl font-bold text-center my-10'>History</p>
			<p className="text-center">Loading transactions...</p>
		</div>
	);
	
	return (
		<div className='w-full px-10 min-h-[40vh]'>
			<p className='text-5xl font-bold text-center my-10'>History</p>
			<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20'>
				{data?.transactions?.map(transaction => (
					<Card key={transaction._id} transaction={transaction} />
				))}

				{data?.transactions?.length === 0 && (
					<p className="text-2xl font-old text-center 2-full">No transaction history found.</p>
				)}
			</div>
		</div>
	);
};
export default Cards;