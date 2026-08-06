// 'use client'
// import ActiveTabRadius from '@/app/components/ActiveTabRadius'
// import { Button } from '@/app/components/Button'
// import FilterTab from '@/app/components/FilterTab'
// import FlexComponent from '@/app/components/FlexComponent'
// import GlobalContainer from '@/app/components/GlobalContainer'
// import MonthComponent from '@/app/components/MonthComponent'
// import OnboardNew from '@/app/components/OnboardNew'
// import { Barcode, Check, ChevronDown, QrCode, RefreshCcw, Settings2, Star } from 'lucide-react'
// import Image from 'next/image'
// import React, { useEffect, useState } from 'react'
// import profile from '@/app/src/images/transactionProduct.png'
// import AgentReferralButton from '@/app/components/AgentReferralButton'

// type Props = {}

// const page = (props: Props) => {
//     const [activeTab, setActiveTab] = useState<string>("Products")
//     const [pay, setPay] = useState<boolean>(false)
//     const [withdrawn, setWithdrawn] = useState<boolean>(false)
//     const [activeTransTab, setActiveTransTab] = useState<string>("Completed")
//     const [showTarget, setShowTarget] = useState<boolean>(false)
//     const [filterTab, setFilterTab] = useState<string>("general")
//     const [subFilterTab, setSubFilterTab] = useState<string>("restaurant");
//     const filterTabArray = ["General", "Food & Beverage", "Fashion & Textile", "Cosmetic Brands", "Legal"];
//     const subFilterTabArray = ["RESTAURANT", "PASTRIES", "DRINKS"];
//     useEffect(() => {
//         if(!withdrawn) return
//         const timeout = setTimeout(() => {
//             setWithdrawn(false);
//         }, 1000)

//         return () => clearTimeout(timeout)
//     }, [withdrawn])
//   return (
//     <div className='overflow-y-auto h-screen bg-white pb-50'>
//         <GlobalContainer className="flex flex-col gap-5">
//             <FlexComponent>
//                 <h1 className='md:text-3xl text-xl font-light'>2k+ <span className='text-majorgreen font-bold'>Transactions</span></h1>
//                 {/* <div className="rounded-full bg-superlightgreen flex-shrink-0 text-major-green p-2">
//                     View Code
//                 </div> */}
//                 <AgentReferralButton />
//             </FlexComponent>
//             <ActiveTabRadius activeTab={activeTab} setActiveTab={setActiveTab} activeTabArray={["Products", "Services"]} />
//             <div className={`md:w-1/2 left-1/2 -translate-x-1/2 h-screen fixed bg-white/20 backdrop-blur-xl w-full top-0 z-1 ${pay || withdrawn ? "block" : "hidden"}`}></div>
//             {activeTab === "Products" ? (
//                 <>
//                     <div className="p-3 rounded-xl bg-gradient-trans flex flex-col gap-3">
//                         <FlexComponent>
//                             <p>Target Info</p>
//                             <div className="flex gap-3 items-center">
//                                 <p>2025</p>
//                                 <MonthComponent text='September' />
//                                 <ChevronDown strokeWidth={1} />
//                             </div>
//                         </FlexComponent>
//                         <div className="w-full h-1 rounded-full bg-white overflow-hidden">
//                             <div className="w-30 h-full bg-majorgreen"></div>
//                         </div>
//                         <div className="flex items-center gap-2 relative">
//                             <div className="rounded-full p-1 text-white bg-lemongreen">
//                                 <RefreshCcw strokeWidth={1} size={30} />
//                             </div>
//                             <div onClick={() => setShowTarget(!showTarget)} className="flex items-center gap-2 text-majorgray cursor-pointer">
//                                 <p className="text-sm">EARNED (N)</p>
//                                 <ChevronDown strokeWidth={1} />
//                             </div>
//                             <p>2,542,522.34</p>
//                             <div className={`absolute top-12 left-0 bg-white rounded-lg shadow overflow-hidden ${showTarget ? "block" : "hidden"}`}>
//                                 <div className="flex flex-col gap-3">
//                                     <div className="pb-2 border-b border-majorgray px-4 pt-4">
//                                         <p className="semibold md:text-md text-sm">20% of Target Reached</p>
//                                     </div>
//                                     <div className="flex gap-3 items-start hover:bg-lightgray px-4 py-2 cursor-pointer">
//                                         <Star strokeWidth={1} size={20} />
//                                         <div className="flex flex-col gap-1">
//                                             <p className="md:text-md text-sm">Vendors Reached</p>
//                                             <span className="text-sm text-majorgray">200</span>
//                                         </div>
//                                     </div>
//                                     <div className="flex gap-3 items-start hover:bg-lightgray px-4 py-2 cursor-pointer">
//                                         <Star strokeWidth={1} size={20} />
//                                         <div className="flex flex-col gap-1">
//                                             <p className="md:text-md text-sm">Vendors Target</p>
//                                             <span className="text-sm text-majorgray">1,000</span>
//                                         </div>
//                                     </div>
//                                     <div className="flex gap-3 items-start hover:bg-lightgray px-4 py-2 cursor-pointer">
//                                         <Star strokeWidth={1} size={20} />
//                                         <div className="flex flex-col gap-1">
//                                             <p className="md:text-md text-sm">Vendors Left</p>
//                                             <span className="text-sm text-majorgray">800</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="flex items-center gap-5 overflow-x-auto">
//                         {filterTabArray.map((tab, index) =>  (
//                             <div onClick={() => setFilterTab(tab.toLowerCase())} key={index} className={`py-2 flex-shrink-0 ${filterTab === tab.toLowerCase() ? "border-b-2 border-majorgreen text-majorgreen" : 'text-majorgray'}`}>{tab}</div>
//                         ))}
//                     </div>
//                     <FilterTab subFilterTabArray={subFilterTabArray} setSubFilterTab={setSubFilterTab} subFilterTab={subFilterTab} />
//                     <ActiveTabRadius
//                         activeTab={activeTransTab}
//                         setActiveTab={setActiveTransTab}
//                         activeTabArray={["Completed", "Pending"]}
//                     />
//                     <div className="flex flex-col w-full gap-3">
//                         <div className="flex items-center justify-between md:p-4 p-2 rounded-2xl bg-superlightgreen">
//                             <div className="flex items-center md:gap-3">
//                                 <div className="bg-superlightgreen shadow p-2 rounded-xl">
//                                     <QrCode strokeWidth={1} />
//                                 </div>
//                                 <p className="text-majorgray md:text-md text-sm">
//                                     30 Sep . Gucci Shoes
//                                 </p>
//                             </div>
//                             <div className="flex items-center gap-3">
//                                 <div className="bg-lemongreen shadow p-2 rounded-full md:text-md text-sm">
//                                     INCOMING
//                                 </div>
//                                 <ChevronDown strokeWidth={1} />
//                             </div>
//                         </div>
//                         <div className="md:p-4 p-2 rounded-2xl bg-superlightgreen flex flex-col gap-3">
//                             <Image src={profile} width={1000} height={1000} alt='profile' className='w-full rounded-2xl md:h-50 h-40 ' />
//                         </div>
//                         <div className="flex justify-between items-center">
//                             <h1 className='md:text-3xl text-xl font-bold'>PRODUCT DETAILS</h1>
//                             <div className="flex items-center gap-3">
//                                 <div className="bg-lemongreen shadow p-2 rounded-full md:text-md text-sm">
//                                     INCOMING
//                                 </div>
//                                 <ChevronDown strokeWidth={1} />
//                             </div>
//                         </div>
//                         <div className="flex flex-col gap-5">
//                             <div className="flex flex-col gap-3">
//                                 <div className="flex justify-between gap-3 w-full">
//                                     <div className="flex flex-col gap-3">
//                                         <p className="text-majorgray">Product Type</p>
//                                         <p className="text-lg">Shoes</p>
//                                     </div>
//                                     <div className="flex flex-col w-40">
//                                         <Button border text='8:00 AM - 11:00 AM' className='p-2 md:text-md text-sm' />
//                                         <p>September 30, 2024</p>
//                                     </div>
//                                 </div>
//                                 <div className="flex justify-between gap-3 w-full">
//                                     <div className="flex flex-col gap-3">
//                                         <p className="majorgray md:text-md:text-sm">Description</p>
//                                         <p>The perfect T-shirt for when you want to feel at ease but still stylish...</p>
//                                     </div>
//                                     <div className="flex flex-col gap-3 flex-shrink-0 w-40">
//                                         <p className="text-majorgray md:text-md text-sm">Order Location</p>
//                                         <p>Umuhia, Abia</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="bg-white flex flex-col gap-3">
//                             <div className="flex justify-between w-full">

//                                 <div className="flex flex-col gap-3">
//                                     <div className="flex flex-col gap-3">
//                                         <p className="text-majorgray">Extimated Arrival</p>
//                                         <p>11 Hours</p>
//                                     </div>
//                                 </div>
//                                 <div className="flex flex-col gap-3">
//                                     <div className="flex flex-col gap-3">
//                                         <p className="text-majorgray">Approximate Distance</p>
//                                         <p>500 km</p>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="flex justify-between w-full items-center">
//                                 <p className="text-majorgray md:text-md text-sm">Size</p>
//                                 <div className="w-40">
//                                     <Button text='XL' className='p-4' />
//                                 </div>
//                             </div>
//                             <div className="flex justify-between w-full items-center">
//                                 <p className="text-majorgray md:text-md text-sm">Price (NGN)</p>
//                                 <div className="w-40 flex justify-start">
//                                     <div className="bg-lightgray rounded-full py-2 px-5 text-xl font-bold ">3,000.00</div>
//                                 </div>
//                             </div>
//                             <div className="flex justify-between w-full items-center">
//                                 <p className="text-majorgray md:text-md text-sm">Delivery</p>
//                                 <div className="w-40 flex justify-start">
//                                     <div className="bg-lightgray rounded-full py-2 px-5 text-xl ">DHL</div>
//                                 </div>
//                             </div>
//                             <div className="flex justify-between w-full items-center">
//                                 <p className="text-majorgray md:text-md text-sm">Commission (%)</p>
//                                 <div className="w-40 flex justify-start">
//                                     <div className="bg-lightgray rounded-full py-2 px-5 text-xl font-bold ">4%</div>
//                                 </div>
//                             </div>
//                             <div className={`${pay ? "flex flex-col p-3 md:w-[40%] w-80 left-1/2 -translate-x-1/2 rounded-2xl border border-majorgray fixed bg-white top-1/2 -translate-y-1/2 z-2" : "hidden"}`}>
//                                 <div className={`flex flex-col gap-3`}>
//                                     <div className="flex flex-col gap-3 bg-lightgreen p-3 rounded-xl">
//                                         <p>Wallet Info</p>
//                                         <div className="flex items-center gap-2 relative">
//                                             <div className="rounded-full p-1 text-white bg-lemongreen">
//                                                 <RefreshCcw strokeWidth={1} size={30} />
//                                             </div>
//                                             <div onClick={() => setShowTarget(!showTarget)} className="flex items-center gap-2 text-majorgray cursor-pointer">
//                                                 <p className="text-sm">EARNED (N)</p>
//                                                 <ChevronDown strokeWidth={1} />
//                                             </div>
//                                             <p>2,542,522.34</p>
//                                             {/* <div className={`absolute top-12 left-0 bg-white rounded-lg shadow overflow-hidden ${showTarget ? "block" : "hidden"}`}>
//                                                 <div className="flex flex-col gap-3">
//                                                     <div className="pb-2 border-b border-majorgray px-4 pt-4">
//                                                         <p className="semibold md:text-md text-sm">20% of Target Reached</p>
//                                                     </div>
//                                                     <div className="flex gap-3 items-start hover:bg-lightgray px-4 py-2 cursor-pointer">
//                                                         <Star strokeWidth={1} size={20} />
//                                                         <div className="flex flex-col gap-1">
//                                                             <p className="md:text-md text-sm">Vendors Reached</p>
//                                                             <span className="text-sm text-majorgray">200</span>
//                                                         </div>
//                                                     </div>
//                                                     <div className="flex gap-3 items-start hover:bg-lightgray px-4 py-2 cursor-pointer">
//                                                         <Star strokeWidth={1} size={20} />
//                                                         <div className="flex flex-col gap-1">
//                                                             <p className="md:text-md text-sm">Vendors Target</p>
//                                                             <span className="text-sm text-majorgray">1,000</span>
//                                                         </div>
//                                                     </div>
//                                                     <div className="flex gap-3 items-start hover:bg-lightgray px-4 py-2 cursor-pointer">
//                                                         <Star strokeWidth={1} size={20} />
//                                                         <div className="flex flex-col gap-1">
//                                                             <p className="md:text-md text-sm">Vendors Left</p>
//                                                             <span className="text-sm text-majorgray">800</span>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div> */}
//                                         </div>
//                                     </div>
//                                     <p className="font-bold md:text-2xl text-xl text-center">WITHDRAW TO YOUR ACCOUNT</p>
//                                     <p className="md:text-md text-sm text-majorgray text-center">Business details are confidential and will only be changed with consent of the vendor.</p>
//                                     <div className="grid grid-cols-2 gap-3">
//                                         <Button onClick={() => setPay(false)} border={true} className='p-2' text='Nope!' />
//                                         <Button onClick={() => {setPay(false), setWithdrawn(true)}} className='p-2' text='Continue' />
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className={`${withdrawn ? "flex flex-col p-3 md:w-[40%] w-80 left-1/2 -translate-x-1/2 rounded-2xl border border-majorgray fixed bg-white top-1/2 -translate-y-1/2 z-2" : "hidden"}`}>
//                                 <div className={`flex flex-col gap-3 items-center`}>
//                                     <p className="font-bold md:text-2xl text-xl text-center">FUNDS WITHDRAWN</p>
//                                     <div className="md:w-8 md:h-8 rounded-full w-6 h-6 flex justify-center items-center bg-lemongreen text-majorgreen"><Check strokeWidth={1} /></div>
//                                     <p className='text-majorgray'>Transfer Processing...</p>
//                                 </div>
//                             </div>
//                             <div onClick={() => setPay(true)} className="flex justify-between w-full items-center">
//                                 <p className="text-lemongreen md:text-md text-sm flex gap-3 items-center">Withdraw (NGN) <ChevronDown strokeWidth={1} /></p>
//                                 <div className="w-40 flex justify-start">
//                                     <div className="bg-lemongreen rounded-full py-2 px-5 text-xl font-bold">120.00</div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </>
//             ) : (
//                 <></>
//             )}
//         </GlobalContainer>
//     </div>
//   )
// }

// export default page
'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import axios from '@/app/utils/axios'
import { Barcode, Check, ChevronDown, QrCode, RefreshCcw, Settings2, Star, Loader2 } from 'lucide-react'

// Assuming these are your local UI components
import ActiveTabRadius from '@/app/components/ActiveTabRadius'
import { Button } from '@/app/components/Button'
import FilterTab from '@/app/components/FilterTab'
import FlexComponent from '@/app/components/FlexComponent'
import GlobalContainer from '@/app/components/GlobalContainer'
import MonthComponent from '@/app/components/MonthComponent'
import AgentReferralButton from '@/app/components/AgentReferralButton'
import profileFallback from '@/app/src/images/transactionProduct.png'

// --- 1. Define TypeScript Interfaces based on your UI needs ---
interface Transaction {
    id: string;
    date: string;
    productName: string;
    status: "INCOMING" | "COMPLETED" | "PENDING";
    imageUrl?: string;
    productType: string;
    timeWindow: string;
    fullDate: string;
    description: string;
    location: string;
    estimatedArrival: string;
    distance: string;
    size: string;
    price: number;
    deliveryMethod: string;
    commissionPercentage: number;
    commissionAmount: number;
}

interface TargetData {
    month: string;
    year: string;
    earned: number;
    targetPercentage: number;
    vendorsReached: number;
    vendorsTarget: number;
    vendorsLeft: number;
    totalTransactionsCount: number;
}

interface ApiResponse {
    targetData: TargetData;
    transactions: Transaction[];
}

const TransactionsPage = () => {
    // UI States
    const [activeTab, setActiveTab] = useState<string>("Products")
    const [activeTransTab, setActiveTransTab] = useState<string>("Completed")
    const [filterTab, setFilterTab] = useState<string>("general")
    const [subFilterTab, setSubFilterTab] = useState<string>("restaurant")
    const [showTarget, setShowTarget] = useState<boolean>(false)
    
    // Modal States
    const [pay, setPay] = useState<boolean>(false)
    const [withdrawn, setWithdrawn] = useState<boolean>(false)
    const [selectedWithdrawAmount, setSelectedWithdrawAmount] = useState<number>(0)

    // Data States
    const [apiData, setApiData] = useState<ApiResponse | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const filterTabArray = ["General", "Food & Beverage", "Fashion & Textile", "Cosmetic Brands", "Legal"];
    const subFilterTabArray = ["RESTAURANT", "PASTRIES", "DRINKS"];

    // Currency Formatter
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
    }

    // --- 2. Fetch Data from API ---
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get<ApiResponse>('/agent/transactions');
                setApiData(response.data);
                setError(null);
            } catch (err) {
                console.error("Error fetching transactions:", err);
                setError("Failed to load transactions. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    // Handle Withdraw Timeout
    useEffect(() => {
        if (!withdrawn) return;
        const timeout = setTimeout(() => {
            setWithdrawn(false);
        }, 2000); // Increased to 2s for better UX reading time
        return () => clearTimeout(timeout);
    }, [withdrawn]);

    // Filter transactions based on active tab
    const filteredTransactions = apiData?.transactions.filter(
        (tx) => tx.status.toLowerCase() === activeTransTab.toLowerCase()
    ) || [];

    return (
        <div className='overflow-y-auto h-screen bg-white pb-50'>
            <GlobalContainer className="flex flex-col gap-5">
                <FlexComponent>
                    <h1 className='md:text-3xl text-xl font-light'>
                        {apiData?.targetData?.totalTransactionsCount || "0"}+ <span className='text-majorgreen font-bold'>Transactions</span>
                    </h1>
                    <AgentReferralButton />
                </FlexComponent>

                <ActiveTabRadius activeTab={activeTab} setActiveTab={setActiveTab} activeTabArray={["Products", "Services"]} />
                
                {/* Overlay for Modals */}
                <div className={`md:w-1/2 left-1/2 -translate-x-1/2 h-screen fixed bg-white/20 backdrop-blur-xl w-full top-0 z-10 ${pay || withdrawn ? "block" : "hidden"}`}></div>

                {activeTab === "Products" && (
                    <>
                        {/* Target Info Section */}
                        <div className="p-3 rounded-xl bg-gradient-trans flex flex-col gap-3">
                            <FlexComponent>
                                <p>Target Info</p>
                                <div className="flex gap-3 items-center">
                                    <p>{apiData?.targetData?.year || "2024"}</p>
                                    <MonthComponent text={apiData?.targetData?.month || 'September'} />
                                    <ChevronDown strokeWidth={1} />
                                </div>
                            </FlexComponent>
                            
                            <div className="w-full h-1 rounded-full bg-white overflow-hidden">
                                <div 
                                    className="h-full bg-majorgreen transition-all duration-500" 
                                    style={{ width: `${apiData?.targetData?.targetPercentage || 0}%` }}
                                ></div>
                            </div>
                            
                            <div className="flex items-center gap-2 relative">
                                <div className="rounded-full p-1 text-white bg-lemongreen">
                                    <RefreshCcw strokeWidth={1} size={30} className={isLoading ? "animate-spin" : ""} />
                                </div>
                                <div onClick={() => setShowTarget(!showTarget)} className="flex items-center gap-2 text-majorgray cursor-pointer">
                                    <p className="text-sm">EARNED</p>
                                    <ChevronDown strokeWidth={1} />
                                </div>
                                <p className="font-semibold">
                                    {isLoading ? "Loading..." : formatCurrency(apiData?.targetData?.earned || 0)}
                                </p>
                                
                                {/* Target Dropdown */}
                                <div className={`absolute top-12 left-0 bg-white rounded-lg shadow overflow-hidden z-20 ${showTarget ? "block" : "hidden"}`}>
                                    <div className="flex flex-col gap-3">
                                        <div className="pb-2 border-b border-majorgray px-4 pt-4">
                                            <p className="font-semibold md:text-md text-sm">
                                                {apiData?.targetData?.targetPercentage || 0}% of Target Reached
                                            </p>
                                        </div>
                                        <div className="flex gap-3 items-start hover:bg-lightgray px-4 py-2 cursor-pointer">
                                            <Star strokeWidth={1} size={20} />
                                            <div className="flex flex-col gap-1">
                                                <p className="md:text-md text-sm">Vendors Reached</p>
                                                <span className="text-sm text-majorgray">{apiData?.targetData?.vendorsReached || 0}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-3 items-start hover:bg-lightgray px-4 py-2 cursor-pointer">
                                            <Star strokeWidth={1} size={20} />
                                            <div className="flex flex-col gap-1">
                                                <p className="md:text-md text-sm">Vendors Target</p>
                                                <span className="text-sm text-majorgray">{apiData?.targetData?.vendorsTarget || 0}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-3 items-start hover:bg-lightgray px-4 py-2 cursor-pointer">
                                            <Star strokeWidth={1} size={20} />
                                            <div className="flex flex-col gap-1">
                                                <p className="md:text-md text-sm">Vendors Left</p>
                                                <span className="text-sm text-majorgray">{apiData?.targetData?.vendorsLeft || 0}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="flex items-center gap-5 overflow-x-auto no-scrollbar">
                            {filterTabArray.map((tab, index) =>  (
                                <div 
                                    onClick={() => setFilterTab(tab.toLowerCase())} 
                                    key={index} 
                                    className={`py-2 flex-shrink-0 cursor-pointer transition-colors ${filterTab === tab.toLowerCase() ? "border-b-2 border-majorgreen text-majorgreen font-medium" : 'text-majorgray'}`}
                                >
                                    {tab}
                                </div>
                            ))}
                        </div>
                        <FilterTab subFilterTabArray={subFilterTabArray} setSubFilterTab={setSubFilterTab} subFilterTab={subFilterTab} />
                        
                        <ActiveTabRadius
                            activeTab={activeTransTab}
                            setActiveTab={setActiveTransTab}
                            activeTabArray={["Completed", "Pending"]}
                        />

                        {/* Loading / Error / Empty States */}
                        {isLoading && (
                            <div className="flex justify-center items-center py-10">
                                <Loader2 className="animate-spin text-majorgreen w-10 h-10" />
                            </div>
                        )}
                        
                        {error && (
                            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-center">
                                {error}
                            </div>
                        )}

                        {!isLoading && !error && filteredTransactions.length === 0 && (
                            <div className="text-center text-majorgray py-10">
                                No {activeTransTab.toLowerCase()} transactions found.
                            </div>
                        )}

                        {/* Dynamic Transactions List */}
                        {!isLoading && filteredTransactions.map((tx) => (
                            <div key={tx.id} className="flex flex-col w-full gap-5 border-b border-gray-100 pb-8 mb-4">
                                <div className="flex items-center justify-between md:p-4 p-2 rounded-2xl bg-superlightgreen">
                                    <div className="flex items-center md:gap-3 gap-2">
                                        <div className="bg-superlightgreen shadow p-2 rounded-xl">
                                            <QrCode strokeWidth={1} />
                                        </div>
                                        <p className="text-majorgray md:text-md text-sm">
                                            {tx.date} . {tx.productName}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="bg-lemongreen shadow p-2 rounded-full md:text-md text-sm font-medium">
                                            {tx.status}
                                        </div>
                                    </div>
                                </div>

                                <div className="md:p-4 p-2 rounded-2xl bg-superlightgreen flex flex-col gap-3">
                                    {/* Using next/image with fallback for dynamic images */}
                                    <Image 
                                        src={tx.imageUrl || profileFallback} 
                                        width={1000} 
                                        height={1000} 
                                        alt={tx.productName} 
                                        className='w-full object-cover rounded-2xl md:h-50 h-40' 
                                    />
                                </div>

                                <div className="flex justify-between items-center">
                                    <h1 className='md:text-3xl text-xl font-bold'>PRODUCT DETAILS</h1>
                                </div>

                                <div className="flex flex-col gap-5">
                                    <div className="flex justify-between gap-3 w-full">
                                        <div className="flex flex-col gap-3">
                                            <p className="text-majorgray">Product Type</p>
                                            <p className="text-lg">{tx.productType}</p>
                                        </div>
                                        <div className="flex flex-col w-40 gap-1">
                                            <Button border text={tx.timeWindow} className='p-2 md:text-md text-sm whitespace-nowrap' />
                                            <p className="text-sm">{tx.fullDate}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between gap-3 w-full">
                                        <div className="flex flex-col gap-3 w-2/3">
                                            <p className="text-majorgray md:text-md text-sm">Description</p>
                                            <p className="text-sm">{tx.description}</p>
                                        </div>
                                        <div className="flex flex-col gap-3 flex-shrink-0 w-40">
                                            <p className="text-majorgray md:text-md text-sm">Order Location</p>
                                            <p className="text-sm">{tx.location}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white flex flex-col gap-4">
                                    <div className="flex justify-between w-full">
                                        <div className="flex flex-col gap-1">
                                            <p className="text-majorgray">Estimated Arrival</p>
                                            <p className="font-medium">{tx.estimatedArrival}</p>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-majorgray">Approximate Distance</p>
                                            <p className="font-medium">{tx.distance}</p>
                                        </div>
                                    </div>
                                    
                                    {/* Detail Rows */}
                                    {[
                                        { label: "Size", value: tx.size, type: "button" },
                                        { label: "Price", value: formatCurrency(tx.price), bold: true },
                                        { label: "Delivery", value: tx.deliveryMethod },
                                        { label: "Commission (%)", value: `${tx.commissionPercentage}%`, bold: true }
                                    ].map((row, idx) => (
                                        <div key={idx} className="flex justify-between w-full items-center">
                                            <p className="text-majorgray md:text-md text-sm">{row.label}</p>
                                            <div className="w-40 flex justify-start">
                                                {row.type === 'button' ? (
                                                    <Button text={row.value as string} className='p-2 min-w-[3rem]' />
                                                ) : (
                                                    <div className={`bg-lightgray rounded-full py-2 px-5 text-md md:text-xl ${row.bold ? 'font-bold' : ''}`}>
                                                        {row.value}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    {/* Action Button */}
                                    <div onClick={() => { setPay(true); setSelectedWithdrawAmount(tx.commissionAmount); }} className="flex justify-between w-full items-center cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-colors">
                                        <p className="text-lemongreen md:text-md text-sm flex gap-3 items-center font-semibold">
                                            Withdraw <ChevronDown strokeWidth={1} />
                                        </p>
                                        <div className="w-40 flex justify-start">
                                            <div className="bg-lemongreen text-white rounded-full py-2 px-5 text-md md:text-xl font-bold shadow">
                                                {formatCurrency(tx.commissionAmount)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Payment Confirmation Modal */}
                        <div className={`${pay ? "flex flex-col p-5 md:w-[40%] w-[90%] left-1/2 -translate-x-1/2 rounded-2xl border border-majorgray fixed bg-white top-1/2 -translate-y-1/2 z-20 shadow-2xl" : "hidden"}`}>
                            <div className={`flex flex-col gap-5`}>
                                <div className="flex flex-col gap-3 bg-lightgreen p-4 rounded-xl">
                                    <p className="font-semibold text-lg">Wallet Info</p>
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-full p-2 text-white bg-lemongreen">
                                            <RefreshCcw strokeWidth={2} size={24} />
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-sm text-majorgray">EARNED BALANCE</p>
                                            <p className="text-xl font-bold">{formatCurrency(apiData?.targetData?.earned || 0)}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center space-y-2">
                                    <p className="font-bold md:text-2xl text-xl text-center">WITHDRAW {formatCurrency(selectedWithdrawAmount)}</p>
                                    <p className="text-sm text-majorgray text-center px-4">Business details are confidential and will only be changed with consent of the vendor.</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <Button onClick={() => setPay(false)} border={true} className='py-3' text='Cancel' />
                                    <Button onClick={() => { setPay(false); setWithdrawn(true); }} className='py-3 bg-majorgreen text-white' text='Confirm' />
                                </div>
                            </div>
                        </div>

                        {/* Success Modal */}
                        <div className={`${withdrawn ? "flex flex-col p-8 md:w-[40%] w-[90%] left-1/2 -translate-x-1/2 rounded-2xl border border-majorgray fixed bg-white top-1/2 -translate-y-1/2 z-20 shadow-2xl" : "hidden"}`}>
                            <div className={`flex flex-col gap-4 items-center justify-center`}>
                                <div className="md:w-16 md:h-16 rounded-full w-12 h-12 flex justify-center items-center bg-lemongreen text-white shadow-lg">
                                    <Check strokeWidth={3} size={32} />
                                </div>
                                <p className="font-bold md:text-2xl text-xl text-center text-majorgreen">FUNDS WITHDRAWN</p>
                                <p className='text-majorgray'>Transfer Processing...</p>
                            </div>
                        </div>
                    </>
                )}
            </GlobalContainer>
        </div>
    )
}

export default TransactionsPage