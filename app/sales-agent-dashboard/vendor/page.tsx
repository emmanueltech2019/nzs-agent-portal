'use client'
import React, { useEffect, useState } from 'react'
import FlexComponent from '@/app/components/FlexComponent'
import GlobalContainer from '@/app/components/GlobalContainer'
import { ArrowUp, Check, ChevronDown, ChevronLeft, RefreshCcw, Settings2, Star, X } from 'lucide-react'
import MonthComponent from '@/app/components/MonthComponent'
import Image from 'next/image'
import profile from '@/app/src/images/profile.png'
import { useProductProvider } from '@/app/contexts/CreateBusinessContext' 
import ProgressComponent from '@/app/components/ProgressComponent'
import { FlexTextNumber } from '@/app/components/FlexTextNumber' 
import { ButtonSimulation } from '@/app/components/ButtonSimulation' 
import NextProgressButtonAndPreview from '@/app/components/NextProgressButtonAndPreview'
import Link from 'next/link'
import ProgressBar from '@/app/components/ProgressBar'
import InputComponent from '@/app/components/InputComponent'
import SelectionComponent from '@/app/components/SelectionComponent'
import food from '@/app/src/images/food.png'
import { Button } from '@/app/components/Button'
import FilterTab from '@/app/components/FilterTab'
import ActiveTabRadius from '@/app/components/ActiveTabRadius'
import ActiveTabStraight from '@/app/components/ActiveTabStraight'
import OnboardNew from '@/app/components/OnboardNew'
import InventoryContent from '@/app/components/InventoryContent'
import axios from "../../utils/axios";
import AgentReferralButton from '@/app/components/AgentReferralButton'

// Defined a basic interface for vendors to ensure type safety when mapping
interface Vendor {
    _id: string;
    id?: string;
    createdAt?: string;
    ownerName?: string;
    sellerName?: string;
    price?: number | string;
    businessName?: string;
    logo?: string;
    description?: string;
    images?: string[];
    category?: string;
    sector?: string; 
    sectors?: string[];
}

const Page = () => {
//     // 1. Initialize with static fallbacks for the server render
// const [currentYear, setCurrentYear] = useState<number>(2026);
// const [currentMonth, setCurrentMonth] = useState<string>("July");

// // 2. Update to the user's local browser time only after hydration
// useEffect(() => {
//     const now = new Date();
//     setCurrentYear(now.getFullYear());
//     setCurrentMonth(now.toLocaleString('default', { month: 'long' }));
// }, []);
// 1. Safe Date Management
const [currentYear, setCurrentYear] = useState<number>(2026);
const [currentMonth, setCurrentMonth] = useState<string>("July");

useEffect(() => {
    const now = new Date();
    setCurrentYear(now.getFullYear());
    setCurrentMonth(now.toLocaleString('default', { month: 'long' }));
}, []);
    const [activeTab, setActiveTab] = useState<string>("Products")
    const [activeTabStraight, setActiveTabStraight] = useState<string>("IN-STOCK")
    const [activeNumber, setActiveNumber] = useState<number>(1);
    const [activeInventoryNumber, setActiveInventoryNumber] = useState<number>(1)
    const [addInventory, setAddInventory] = useState<boolean>(false);
    const [inventoryActiveTab, setInventoryActiveTab] = useState<string>("High Selling")

    const [showTarget, setShowTarget] = useState<boolean>(false)
    const [edit, setEdit] = useState<boolean>(false)
    
    const {setAddProduct, addProduct} = useProductProvider()

    const [editBusiness, setEditBusiness] = useState<boolean>(false);
    const [granted, setGranted] = useState<boolean>(false)
    const [permission, setPermission] = useState<boolean>(false)
    const [viewInventory, setViewInventory] = useState<boolean>();

    const [filterTab, setFilterTab] = useState<string>("general")
    const [subFilterTab, setSubFilterTab] = useState<string>("restaurant");
    const [subInventoryFilterTab, setSubInventoryFilterTab] = useState<string>("unit");
    const [leavingBusiness, setLeavingBusiness] = useState<boolean>()

    // --- API Integration States ---
    const [dashboardData, setDashboardData] = useState({
        targets: { target: 1000, reached: 0, onboardingNew: 0 },
        vendors: [] as Vendor[]
    });
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false);
    
    // --- Dynamic Categories State ---
    const [agentCategories, setAgentCategories] = useState<string[]>([]);

    const activeNumberArray = [
        {name: "Business Description", id: 1},
        {name: "Business Info", id: 2},
        {name: "Payment Info", id: 3},
        {name: "Preview", id: 4},
    ]
    const editBusinessArray = [
        {name: "Business Description", id: 1},
        {name: "Business Info", id: 2},
        {name: "Payment Info", id: 3},
        {name: "Preview", id: 4},
    ]
    const considerationSelection = [
        { name: "Health Regulation" }, 
        { name: "Age-based Regulation" }, 
        { name: "Safety Regulation" }
    ]
    
    const progress = (activeNumber / activeNumberArray.length) * 100;
    const inventoryProgress = (activeInventoryNumber / editBusinessArray.length) * 100;
    
    const resetActiveNumber = () => setActiveNumber(1);
    const resetActiveInventoryNumber = () => setActiveInventoryNumber(1);

    const activeSector = ["retail", "food & beverage", "healthcare", "construction", "automotive", "technology & it", "manufacturing", "fashion & textiles", "arts & crafts"]
    const inventoryTabArray = ["unit", "status", "category", "price"];
    const subFilterTabArray = ["RESTAURANT", "PASTRIES", "DRINKS"];
    const state = ['UMUAHIA', 'JOS', 'AKWA-IBOM', 'ANAMBRA', 'BAUCHI', 'BAYELSA', 'DELTA', 'EBONYI', 'PLATEAU', 'NIGER', 'KOGI']
    const activeTabArrayRadius = ["Products", "Services"]
    const activeTabArrayStraight = ["IN-STOCK", "OUT OF STOCK"]

    // --- Onboard New Vendor Logic ---
    const handleOnboardNewRedirect = () => {
        // Extract agent ID safely from local storage
        const agentId = typeof window !== 'undefined' ? localStorage.getItem('agentId') || '' : '';
        const referralParams = agentId ? `?agentId=${agentId}` : '';
        window.open(`https://naijazoneonline.com/auth/sign-up${referralParams}`, '_blank');
    };

    // --- Parallel Data Fetching with Axios ---
    // useEffect(() => {
    //     if (granted || addProduct) return;

    //     const fetchDashboard = async () => {
    //         setIsLoading(true);
    //         setHasError(false);
    //         try {
    //             const token = localStorage.getItem('token');
    //             const headers = { Authorization: `Bearer ${token}` };

    //             const [targetRes, vendorRes] = await Promise.all([
    //                 axios.get(`/agents/targets?year=${currentYear}&month=${currentMonth}`, { headers }),
    //                 axios.get(`/agents/vendors/${localStorage.getItem('agentId')}`, { headers })
    //             ]);

    //             const targetData = targetRes.data;
    //             const vendorData = vendorRes.data;
                
    //             const fetchedVendors = vendorData.success && Array.isArray(vendorData.data) ? vendorData.data : [];

    //             // Extract unique categories from the general pool of vendors if we are on 'general'
    //             if (filterTab === 'general' && fetchedVendors.length > 0) {
    //                 const uniqueCats = Array.from(new Set(fetchedVendors.map((v: Vendor) => v.category?.toUpperCase()).filter(Boolean)));
    //                 setAgentCategories(uniqueCats as string[]);
    //             }
    //             console.log(fetchedVendors, "Fetched Vendors");

    //             setDashboardData({
    //                 targets: targetData.success ? targetData.data : { target: 1000, reached: 0, onboardingNew: 0 },
    //                 vendors: fetchedVendors
    //             });
    //         } catch (error) {
    //             console.error("Integration Error:", axios.isAxiosError(error) ? error.response?.data : error);
    //             setHasError(true);
    //             setDashboardData(prev => ({ ...prev, vendors: [] })); // Clear vendors on error
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };

    //     fetchDashboard();
    // }, [activeTab, filterTab, subFilterTab, granted, addProduct]);
    

    // 2. Fixed Data Fetching Effect
useEffect(() => {
    if (granted || addProduct) return;

    const fetchDashboard = async () => {
        const agentId = typeof window !== 'undefined' ? localStorage.getItem('agentId') : null;
        
        // Guard clause: Don't hit the API if the agentId isn't loaded yet
        if (!agentId) {
            console.warn("Skipping fetch: agentId not found in localStorage yet.");
            return;
        }

        setIsLoading(true);
        setHasError(false);
        try {
            const token = localStorage.getItem('token');
            const headers = { Authorization: `Bearer ${token}` };

            const [targetRes, vendorRes] = await Promise.all([
                axios.get(`/agents/targets?year=${currentYear}&month=${currentMonth}`, { headers }),
                axios.get(`/agents/vendors/${agentId}`, { headers })
            ]);

            const targetData = targetRes.data;
            const vendorData = vendorRes.data;
            
            const fetchedVendors = vendorData.success && Array.isArray(vendorData.data) ? vendorData.data : [];

            if (filterTab === 'general' && fetchedVendors.length > 0) {
                const uniqueCats = Array.from(new Set(fetchedVendors.map((v: Vendor) => v.category?.toUpperCase()).filter(Boolean)));
                setAgentCategories(uniqueCats as string[]);
            }

            setDashboardData({
                targets: targetData.success ? targetData.data : { target: 1000, reached: 0, onboardingNew: 0 },
                vendors: fetchedVendors
            });
        } catch (error) {
            console.error("Integration Error:", axios.isAxiosError(error) ? error.response?.data : error);
            setHasError(true);
            setDashboardData(prev => ({ ...prev, vendors: [] }));
        } finally {
            setIsLoading(false);
        }
    };

    fetchDashboard();
// Added currentYear and currentMonth to the dependency array
}, [activeTab, filterTab, subFilterTab, granted, addProduct, currentYear, currentMonth]);

// const filteredVendorsByTab = React.useMemo(() => {
//     console.log("Filtering vendors based on activeTab:", dashboardData);
//     return dashboardData.vendors.filter((vendor) => {
//         // Normalize the sector/category string for reliable comparison
//         const sectorStr = vendor.sector || vendor.category || "";
        
//         // Check if it's exactly E-Commerce (handling both string and array structures)
//         // const isECommerce = 
//         //     sectorStr.toLowerCase() === 'e-commerce' || 
//         //     (vendor.sectors && vendor.sectors.some(s => s.toLowerCase() === 'e-commerce'));

//         const isECommerce = vendor.sector?.toLowerCase() === 'e-commerce';

//         if (activeTab === "Products") {
//             return isECommerce;
//         } else { // "Services"
//             return !isECommerce;
//         }
//     });
// }, [dashboardData.vendors, activeTab]);

// 3. Optimized Memoization Filter
// const filteredVendorsByTab = React.useMemo(() => {
//     // This will now log [] on step 1, and then log the populated array on step 2 when the API resolves
//     console.log("Filtering vendors execution. Current count:", dashboardData.vendors.length);
    
//     return dashboardData.vendors.filter((vendor) => {
//         const isECommerce = vendor.sector?.toLowerCase() === 'e-commerce';
        
//         if (activeTab === "Products") {
//             return isECommerce;
//         } else {
//             return !isECommerce;
//         }
//     });
// }, [dashboardData.vendors, activeTab]);
// 3. Optimized Memoization Filter
const filteredVendorsByTab = React.useMemo(() => {
    console.log("Filtering vendors execution. Current count:", dashboardData.vendors.length);
    
    return dashboardData.vendors.filter((vendor) => {
        // Fallback safely to support both plural 'sectors' and singular 'sector'
        const rawSectors = vendor.sectors || vendor.sector;
        
        let isECommerce = false;

        if (typeof rawSectors === 'string') {
            // Handles: "sectors": "E-Commerce"
            isECommerce = rawSectors.trim().toLowerCase() === 'e-commerce';
        } else if (Array.isArray(rawSectors)) {
            // Handles: "sectors": ["E-Commerce", "Retail"]
            isECommerce = rawSectors.some(s => typeof s === 'string' && s.trim().toLowerCase() === 'e-commerce');
        }

        if (activeTab === "Products") {
            return isECommerce;
        } else { // "Services"
            return !isECommerce;
        }
    });
}, [dashboardData.vendors, activeTab]);
return (
    <div className='h-screen overflow-x-hidden overflow-y-hidden'>
        <div className={`md:w-1/2 left-1/2 -translate-x-1/2 h-screen fixed bg-white/20 backdrop-blur-xl w-full top-0 z-1 ${editBusiness || permission || leavingBusiness ? "block" : "hidden"}`}></div>
        
        {granted ? (
            <>
                {edit ? (
                    <>
                        {viewInventory ? (
                            <div className='flex flex-col gap-5 overflow-y-scroll h-screen bg-white p-5'>
                                <FlexComponent>
                                    <ChevronLeft size={30} onClick={() => setEdit(false)} strokeWidth={1} className="cursor-pointer" />
                                    <p className="font-extrabold">Edit Business</p>
                                    <div className="cursor-pointer" onClick={() => {setViewInventory(false); setEdit(true)}}>
                                        <MonthComponent padding='p-2' text='View Business' />
                                    </div>
                                </FlexComponent>
                                <ActiveTabStraight activeTabArray={activeTabArrayStraight} setActiveTab={setActiveTabStraight} activeTab={activeTabStraight} />
                                {activeTabStraight === "IN-STOCK" ? (
                                    <>
                                        <FilterTab subFilterTabArray={inventoryTabArray} subFilterTab={subInventoryFilterTab} setSubFilterTab={setSubInventoryFilterTab} />
                                        <OnboardNew show={false} bg addType='NEW PRODUCT' productNum={5} setAddProduct={setAddInventory} />
                                        <ActiveTabRadius activeTab={inventoryActiveTab} setActiveTab={setInventoryActiveTab} activeTabArray={["High Selling", "Low Selling"]} />
                                        <InventoryContent name='Maggi' amount={1800} sold={10} notsold={43}>
                                            <></>
                                        </InventoryContent>
                                    </>
                                ) : (
                                    <>
                                        <FilterTab subFilterTabArray={inventoryTabArray} subFilterTab={subInventoryFilterTab} setSubFilterTab={setSubInventoryFilterTab} />
                                        <OnboardNew show={false} bg addType='NEW PRODUCT' productNum={5} setAddProduct={setAddInventory} />
                                        <InventoryContent name='Maggi' amount={1800} sold={10} notsold={43}>
                                            <></>
                                        </InventoryContent>
                                    </>
                                )}
                            </div>
                        ) : (
                            <GlobalContainer className='bg-white h-screen flex flex-col gap-5 justify-between overflow-y-auto'>
                                <FlexComponent>
                                    <ChevronLeft size={30} onClick={() => setEdit(false)} strokeWidth={1} className="cursor-pointer" />
                                    <p className="font-extrabold">Edit Business</p>
                                    <div className="cursor-pointer" onClick={() => setViewInventory(true)}>
                                        <MonthComponent padding='p-2' text='View Inventory' />
                                    </div>
                                </FlexComponent>
                                <FlexComponent items='items-start'>
                                    {editBusinessArray.map((number) => (
                                        <ProgressComponent key={number.id} currentIndex={activeInventoryNumber} index={number.id} step={number.name} />
                                    ))}
                                </FlexComponent>
                                {
                                    activeInventoryNumber === 1 ? (
                                        <>
                                            <div className='flex flex-col gap-2'>
                                                <p className="font-extrabold md:text-xl">Select the right profile for this business.</p>
                                                <p className="text-majorgray md:text-md text-sm">We provide multiple options so feel free to get super-specific!</p>
                                            </div>
                                            <FlexTextNumber text='Sector' desc='Select up to 2 options' textNum={11} />
                                            <div className="flex flex-wrap gap-3">
                                                {activeSector.map((sector, index) => (
                                                    <ButtonSimulation key={index} text={sector} />
                                                ))}
                                            </div>
                                            <FlexComponent>
                                                <p className="font-bold">Alade Eatery</p>
                                                <Image src={profile} width={1000} height={1000} alt='profile' className="w-5 h-5 rounded-full" />
                                            </FlexComponent>
                                        </>
                                    ) : activeInventoryNumber === 2 ? (
                                        <>
                                            <div className="flex flex-col gap-2">
                                                <p className="md:text-xl font-extrabold">Add your business information to get verified.</p>
                                                <p className="text-majorgray md:text-md text-sm">Our verification process is super-fast and your information is protected by our privacy policy</p>
                                                <Link href={''} className='text-blue-500 underline'>View Here</Link>
                                            </div>
                                            <div className="rounded-xl bg-lightgreen p-5 flex flex-col gap-3">
                                                <div className="p-5 rounded-xl bg-white flex justify-center items-center relative">
                                                    <ProgressBar strokeWidth={5} progress={80} />
                                                    <ArrowUp strokeWidth={1.5} size={40} className='absolute text-majorgreen' />
                                                </div>
                                                <FlexComponent>
                                                    <p className="font-bold md:text-xl">YOUR LOGO</p>
                                                    <div className="flex items-center cursor-pointer">
                                                        <MonthComponent text='Upload Logo' />
                                                        <ChevronDown strokeWidth={1} />
                                                    </div>
                                                </FlexComponent>
                                            </div>
                                            <div className="flex flex-col gap-3 w-full">
                                                <InputComponent value={null} inputPlaceholder='Registered Business Name' inputType='text' />
                                                <InputComponent value={null} inputPlaceholder='Briefly describe your business' inputType='text' />
                                                <p className='text-majorgray'>0/30</p>
                                                <InputComponent value={null} inputPlaceholder='CAC Registration Number' inputType='text' />
                                                <p className="text-majorgray">0/7</p>
                                            </div>
                                            <SelectionComponent headText='Consideration' account={considerationSelection} />
                                            <div className="flex flex-col gap-3">
                                                <FlexTextNumber text='State' desc='Available in Nigeria' textNum={9} />
                                                <div className="flex flex-wrap gap-3">
                                                    {state.map((sta, index) => (
                                                        <ButtonSimulation key={index} text={sta} />
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    ) : null
                                }
                                <div className={`${leavingBusiness ? "flex" : "hidden"} flex-col gap-3 p-3 md:w-[40%] w-80 left-1/2 -translate-x-1/2 rounded-2xl border border-majorgray fixed bg-white top-1/2 -translate-y-1/2 z-2`}>
                                    <div onClick={() => setLeavingBusiness(false)} className='flex justify-center items-center bg-majorgray text-white md:w-7 md:h-7 h-5 w-5 rounded-full cursor-pointer'>
                                        <X strokeWidth={1} />
                                    </div>
                                    <p className="font-bold md:text-2xl text-xl text-center">LEAVING BUSINESS ACCESS?</p>
                                    <p className="md:text-md text-sm text-majorgray text-center">Business details are confidential and will only be changed with consent of the vendor.</p>
                                    <div className="grid grid-cols-2 gap-3">
                                        <Button onClick={() => setLeavingBusiness(false)} border={true} className='p-2 cursor-pointer' text='Nope!' />
                                        <Button onClick={() => {setLeavingBusiness(false); setEdit(false); setPermission(false); setGranted(false); setAddProduct(false); resetActiveInventoryNumber()}} className='p-2 cursor-pointer' text='Continue' />
                                    </div>
                                </div>
                                <NextProgressButtonAndPreview 
                                    handleNext={() => activeInventoryNumber > activeNumberArray.length - 1 ? setLeavingBusiness(true) : setActiveInventoryNumber(prev => prev + 1)} 
                                    previewTitle={activeInventoryNumber > activeNumberArray.length - 1 ? 'LEAVING BUSINESS' : 'BUSINESS INFO'} 
                                    progress={inventoryProgress} 
                                />
                            </GlobalContainer>
                        )}
                    </>
                ) : (
                    <div className="overflow-y-scroll h-screen">
                        <GlobalContainer className="flex flex-col justify-between gap-5 bg-gradient-agent">
                            <h1 className="md:text-4xl text-2xl font-extrabold text-center">Request Granted</h1>
                            <div className="rounded-xl flex flex-col gap-4 mt-5">
                                <FlexComponent>
                                    <p className="md:text-md text-sm font-bold">Alade Eatery</p>
                                    <Image src={profile} width={1000} height={1000} alt='profile' className='w-8 h-8 rounded-full' />
                                </FlexComponent>
                                <p className="text-majorgray md:text-md text-sm">Top tasting Nigerian meals and natural ingredients for enjoyment and immediate consumption. Fresh, hot and ready to go!</p>
                                <div className="flex gap-3 overflow-x-auto">
                                    {[...Array(4)].map((_, i) => (
                                        <div key={i} className="md:w-80 w-50 rounded-xl flex-shrink-0">
                                            <Image src={food} width={1000} height={1000} alt='food' className='w-full h-full object-cover' />
                                        </div>
                                    ))}
                                </div>
                                <FlexComponent>
                                    <div className="flex gap-2">
                                        <div className="rounded-xl bg-majorgreen text-white p-3">
                                            <Settings2 />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-sm md:text-md text-lemongreen">Granted</p>
                                            <p className="font-bold md:text-lg text-md">Edit</p>
                                        </div>
                                    </div>
                                    <Button className='md:py-3 md:px-5 py-2 px-4 cursor-pointer' text='VIEW BUSINESS' />
                                </FlexComponent>
                            </div>
                            <div className="flex flex-col gap-3">
                                <FlexComponent>
                                    <h2 className='md:text-4xl text-2xl font-bold'>BUSINESS ACCESS</h2>
                                    <div className="w-7 h-7 rounded-full flex justify-center items-center bg-lemongreen text-majorgreen">
                                        <Check strokeWidth={1} />
                                    </div>
                                </FlexComponent>
                                <p className="text-center md:text-md text-sm text-majorgray">Note that changes to business payment info are unavailable to you...</p>
                            </div>
                            <Button onClick={() => setEdit(true)} text='CONTINUE' className='tracking-widest p-5 w-full cursor-pointer' />
                        </GlobalContainer>
                    </div>
                )}
            </>
        ) : (
            <>
                {addProduct ? (
                    <GlobalContainer className='bg-white h-screen flex flex-col gap-5 justify-between overflow-y-auto'>
                        <FlexComponent>
                            <ChevronLeft size={30} onClick={() => setAddProduct(false)} strokeWidth={1} className="cursor-pointer" />
                            <p className="font-extrabold">Onboard Business</p>
                            <MonthComponent padding='p-2' text='View Code' />
                        </FlexComponent>
                        <FlexComponent items='items-start'>
                            {activeNumberArray.map((number) => (
                                <ProgressComponent key={number.id} currentIndex={activeNumber} index={number.id} step={number.name} />
                            ))}
                        </FlexComponent>
                        {
                            activeNumber === 1 ? (
                                <>
                                    <div className='flex flex-col gap-2'>
                                        <p className="font-extrabold md:text-xl">Select the right profile for this business.</p>
                                        <p className="text-majorgray md:text-md text-sm">We provide multiple options so feel free to get super-specific!</p>
                                    </div>
                                    <FlexTextNumber text='Sector' desc='Select up to 2 options' textNum={11} />
                                    <div className="flex flex-wrap gap-3">
                                        {activeSector.map((sector, index) => (
                                            <ButtonSimulation key={index} text={sector} />
                                        ))}
                                    </div>
                                </>
                            ) : activeNumber === 2 ? (
                                <>
                                    <div className="flex flex-col gap-2">
                                        <p className="md:text-xl font-extrabold">Add your business information to get verified.</p>
                                        <p className="text-majorgray md:text-md text-sm">Our verification process is super-fast and your information is protected by our privacy policy</p>
                                        <Link href={''} className='text-blue-500 underline'>View Here</Link>
                                    </div>
                                    <div className="rounded-xl bg-lightgreen p-5 flex flex-col gap-3">
                                        <div className="p-5 rounded-xl bg-white flex justify-center items-center relative">
                                            <ProgressBar strokeWidth={5} progress={80} />
                                            <ArrowUp strokeWidth={1.5} size={40} className='absolute text-majorgreen' />
                                        </div>
                                        <FlexComponent>
                                            <p className="font-bold md:text-xl">YOUR LOGO</p>
                                            <div className="flex items-center cursor-pointer">
                                                <MonthComponent text='Upload Logo' />
                                                <ChevronDown strokeWidth={1} />
                                            </div>
                                        </FlexComponent>
                                    </div>
                                    <div className="flex flex-col gap-3 w-full">
                                        <InputComponent value={null} inputPlaceholder='Registered Business Name' inputType='text' />
                                        <InputComponent value={null} inputPlaceholder='Briefly describe your business' inputType='text' />
                                        <p className='text-majorgray'>0/30</p>
                                        <InputComponent value={null} inputPlaceholder='CAC Registration Number' inputType='text' />
                                        <p className="text-majorgray">0/7</p>
                                    </div>
                                    <SelectionComponent headText='Consideration' account={considerationSelection} />
                                    <div className="flex flex-col gap-3">
                                        <FlexTextNumber text='State' desc='Available in Nigeria' textNum={9} />
                                        <div className="flex flex-wrap gap-3">
                                            {state.map((sta, index) => (
                                                <ButtonSimulation key={index} text={sta} />
                                            ))}
                                        </div>
                                    </div>
                                </>
                            ) : null
                        }
                        <NextProgressButtonAndPreview handleNext={() => setActiveNumber(prev => prev > activeNumberArray.length - 1 ? prev : prev + 1)} previewTitle='BUSINESS INFO' progress={progress}></NextProgressButtonAndPreview>
                    </GlobalContainer>
                ) : (
                    <div className='overflow-y-auto h-screen'>
                        <GlobalContainer className="flex flex-col gap-5 bg-gradient-agent">
                            <FlexComponent>
                                <h1 className='text-3xl font-light'>My <span className='text-superlightgreen font-bold'>Vendors</span></h1>
                                {/* <div className="rounded-full bg-superlightgreen text-major-green p-2 cursor-pointer">
                                    View Code
                                </div> */}
                                <AgentReferralButton />
                            </FlexComponent>
                            
                            <ActiveTabRadius activeTab={activeTab} setActiveTab={setActiveTab} activeTabArray={activeTabArrayRadius} />
                            
                            <div className="p-3 rounded-xl bg-gradient-trans flex flex-col gap-3">
                                <FlexComponent>
                                    <p>Target Info</p>
                                    <div className="flex gap-3 items-center">
                                        <p>{currentYear}</p>
                                        <MonthComponent text={currentMonth} />
                                        <ChevronDown strokeWidth={1} />
                                    </div>
                                </FlexComponent>
                                <div className="w-full h-1 rounded-full bg-white overflow-hidden">
                                    <div 
                                        className="h-full bg-majorgreen transition-all duration-500" 
                                        style={{ width: `${(dashboardData.targets.reached / dashboardData.targets.target) * 100 || 0}%` }}
                                    ></div>
                                </div>
                                <div className="flex items-center gap-2 relative">
                                    <div className="rounded-full p-1 text-white bg-lemongreen cursor-pointer">
                                        <RefreshCcw strokeWidth={1} size={30} className={isLoading ? "animate-spin" : ""} />
                                    </div>
                                    <div onClick={() => setShowTarget(!showTarget)} className="flex items-center gap-2 text-majorgray cursor-pointer">
                                        <p className="text-sm">VENDORS REACHED</p>
                                        <ChevronDown strokeWidth={1} />
                                    </div>
                                    <p>{dashboardData.targets.reached}</p>
                                    
                                    <div className={`absolute top-12 left-0 z-10 bg-white rounded-lg shadow overflow-hidden ${showTarget ? "block" : "hidden"}`}>
                                        <div className="flex flex-col gap-3">
                                            <div className="pb-2 border-b border-majorgray px-4 pt-4">
                                                <p className="font-semibold md:text-md text-sm">
                                                    {((dashboardData.targets.reached / dashboardData.targets.target) * 100 || 0).toFixed(0)}% of Target Reached
                                                </p>
                                            </div>
                                            <div className="flex gap-3 items-start hover:bg-lightgray px-4 py-2 cursor-pointer">
                                                <Star strokeWidth={1} size={20} />
                                                <div className="flex flex-col gap-1">
                                                    <p className="md:text-md text-sm">Vendors Reached</p>
                                                    <span className="text-sm text-majorgray">{dashboardData.targets.reached}</span>
                                                </div>
                                            </div>
                                            <div className="flex gap-3 items-start hover:bg-lightgray px-4 py-2 cursor-pointer">
                                                <Star strokeWidth={1} size={20} />
                                                <div className="flex flex-col gap-1">
                                                    <p className="md:text-md text-sm">Vendors Target</p>
                                                    <span className="text-sm text-majorgray">{dashboardData.targets.target}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* --- Dynamic Categories Rendering --- */}
                            {agentCategories.length > 0 && (
                                <div className="flex items-center gap-5 overflow-x-auto">
                                    {['GENERAL', ...agentCategories].map((tab, index) =>  (
                                        <div onClick={() => setFilterTab(tab.toLowerCase())} key={index} className={`py-2 flex-shrink-0 cursor-pointer transition-colors ${filterTab === tab.toLowerCase() ? "border-b-2 border-majorgreen text-majorgreen font-bold" : 'text-majorgray'}`}>
                                            {tab}
                                        </div>
                                    ))}
                                </div>
                            )}
                            
                            <FilterTab subFilterTabArray={subFilterTabArray} setSubFilterTab={setSubFilterTab} subFilterTab={subFilterTab} />
                            
                            <div onClick={handleOnboardNewRedirect} className="cursor-pointer">
                                {/* Disabled native local setAddProduct to instead rely on the wrapper's external redirect */}
                                <OnboardNew setAddProduct={() => {}} descNum={dashboardData.targets.onboardingNew || 104} show addType='ONBOARDING NEW' />
                            </div>
                            
                            <FlexComponent>
                                <p className="font-extrabold text-xl">{currentYear}</p>
                                <div className="flex items-center gap-3">
                                    <MonthComponent text={currentMonth} />
                                    <ChevronDown strokeWidth={1} />
                                </div>
                            </FlexComponent>

                            {/* --- Vendor List & Empty State Rendering --- */}
                            {isLoading ? (
                                <div className="text-center py-10 text-majorgray font-semibold">Loading vendors...</div>
                            ) : hasError || filteredVendorsByTab.length === 0 ? (
                                <div className="flex flex-col items-center justify-center p-10 bg-white rounded-xl text-majorgray shadow-sm mt-5 mb-10 text-center">
                                    <p className="text-xl font-bold text-gray-800">No Businesses Found</p>
                                    <p className="text-sm mt-2">You currently have no vendors matching this filter, or there was an issue retrieving them.</p>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-5 mb-20">
                                    {filteredVendorsByTab.map((vendor) => (
                                        <div key={vendor._id || vendor.id} className='bg-superlightgreen p-3 rounded-xl'>
                                            <div className="flex gap-5 items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <Image src={vendor.logo || profile} width={100} height={100} alt='profile' className='w-15 h-15 rounded-full object-cover' />
                                                    <div className="flex flex-col">
                                                        <div className="flex gap-5 items-center text-majorgray text-sm">
                                                            <p>{vendor.createdAt ? new Date(vendor.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : "30 Sep"}</p>
                                                            <p>. Seller</p>
                                                        </div>
                                                        <p className="font-semibold">{vendor.ownerName || vendor.sellerName || "Unknown Seller"}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 bg-white rounded-full p-1 px-3 shadow-sm">
                                                    <div className="font-bold">{vendor.price ? vendor.price.toLocaleString() : "1,500"}</div>
                                                    <ChevronDown strokeWidth={1} />
                                                </div>
                                            </div>
                                            
                                            <div className="bg-white p-4 rounded-xl flex flex-col gap-4 mt-5 relative shadow-sm">
                                                <FlexComponent>
                                                    <p className="md:text-lg text-md font-bold">{vendor.businessName || "Unnamed Business"}</p>
                                                    <Image src={vendor.logo || profile} width={100} height={100} alt='logo' className='w-8 h-8 rounded-full object-cover border border-gray-100' />
                                                </FlexComponent>
                                                <p className="text-majorgray md:text-md text-sm leading-relaxed">{vendor.description || "No description provided for this business."}</p>
                                                
                                                <div className="flex gap-3 overflow-x-auto pb-2">
                                                    {vendor.images && vendor.images.length > 0 ? (
                                                        vendor.images.map((img, i) => (
                                                            <div key={i} className="md:w-80 w-50 h-32 rounded-xl flex-shrink-0">
                                                                <Image src={img || food} width={1000} height={1000} alt='food' className='w-full h-full object-cover rounded-xl' />
                                                            </div>
                                                        ))
                                                    ) : (
                                                        // Empty state fallback for images
                                                        [...Array(2)].map((_, i) => (
                                                            <div key={i} className="md:w-80 w-50 h-32 rounded-xl flex-shrink-0 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                                                                No Image Uploaded
                                                            </div>
                                                        ))
                                                    )}
                                                </div>
                                                
                                                {/* Reused existing static modals mapping the states */}
                                                <div className={`${editBusiness ? "flex" : "hidden"} flex-col gap-3 p-5 md:w-[40%] w-80 left-1/2 -translate-x-1/2 rounded-2xl border border-majorgray fixed bg-white top-1/2 -translate-y-1/2 z-20 shadow-xl`}>
                                                    <p className="font-bold md:text-2xl text-xl text-center">REQUEST TO EDIT BUSINESS?</p>
                                                    <p className="md:text-md text-sm text-majorgray text-center">Business details are confidential and will only be changed with consent of the vendor.</p>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <Button onClick={() => setEditBusiness(false)} border={true} className='p-2 cursor-pointer' text='Nope!' />
                                                        <Button onClick={() => {setPermission(true); setEditBusiness(false)}} className='p-2 cursor-pointer' text='Continue' />
                                                    </div>
                                                </div>
                                                
                                                <div className={`${permission ? "flex" : "hidden"} flex-col items-center gap-5 p-5 md:w-[40%] w-80 left-1/2 -translate-x-1/2 rounded-2xl border border-majorgray fixed bg-white top-1/2 -translate-y-1/2 z-20 shadow-xl`}>
                                                    <p className="font-bold md:text-4xl text-2xl text-center">REQUEST SUBMITTED!</p>
                                                    <div className="flex flex-col gap-2 items-center">
                                                        <div className="w-10 h-10 rounded-full flex justify-center items-center bg-lemongreen text-majorgreen">
                                                            <Check strokeWidth={2} />
                                                        </div>
                                                        <p className="text-majorgray md:text-md text-sm text-center">Vendor Reviewing...</p>
                                                    </div>
                                                    <Button 
                                                        onClick={() => {
                                                            setPermission(false);
                                                            setEditBusiness(false);
                                                            setGranted(true);
                                                            setAddProduct(true);
                                                        }} 
                                                        className="w-full mt-2 p-3 cursor-pointer" 
                                                        text="CONTINUE" 
                                                    />
                                                </div>
                                                
                                                <FlexComponent>
                                                    <div onClick={() => setEditBusiness(true)} className="flex gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                                                        <div className="rounded-xl bg-majorgreen text-white p-3">
                                                            <Settings2 />
                                                        </div>
                                                        <div className="flex flex-col gap-1">
                                                            <p className="text-majorgray text-sm md:text-md">Request</p>
                                                            <p className="font-bold md:text-lg text-md">Edit</p>
                                                        </div>
                                                    </div>
                                                    <Button className='md:py-3 md:px-5 py-2 px-4 cursor-pointer' text='VIEW BUSINESS' />
                                                </FlexComponent>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </GlobalContainer>
                    </div>
                )}
            </>
        )}
    </div>
  )
}

export default Page