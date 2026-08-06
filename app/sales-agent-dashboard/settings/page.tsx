'use client'
import React, { useEffect, useRef, useState } from 'react'
import profile from '@/app/src/images/profile2.png'
import Image from 'next/image'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"
import { ArrowRight, Bolt, ChevronDown, ChevronLeft, ChevronRight, Dot, Filter, LocateIcon, MessageCircle, MessageCircleReply, Plus, QrCode, RefreshCcw, Send, Settings2, Star, ThumbsUp, TrendingUp, X, Zap } from 'lucide-react'
import GlobalContainer from '@/app/components/GlobalContainer'
import GoBack from '@/app/components/GoBack'
import TopBackBar from '@/app/components/TopBackBar'
import { Button } from '@/app/components/Button'
import { useProductProvider } from '@/app/contexts/CreateBusinessContext'
import ActiveTabStraight from '@/app/components/ActiveTabStraight'
import FilterTab from '@/app/components/FilterTab'
import FlexComponent from '@/app/components/FlexComponent'
import MonthComponent from '@/app/components/MonthComponent'
import { FlexTextNumber } from '@/app/components/FlexTextNumber'
import { ButtonSimulation } from '@/app/components/ButtonSimulation'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts'
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent'
import ActiveTabRadius from '@/app/components/ActiveTabRadius'
import NotificationTab from '@/app/components/NotificationTab'
import axios from "@/app/utils/axios"

export interface PaymentDetails {
    bankName: string;
    accountNumber: string;
    accountName: string;
}

export interface ProfileData {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    whatsapp: string;
    cv: string;
    nin: string;
    profilePicture: string;
    description: string;
    interests: string[];
    state: string;
    agentRoleType: string;
    referredByCode: string;
    referralCode: string;
    balance: number;
    totalEarned: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    paymentDetails: PaymentDetails;
}

const data = [
    { time: "10 am", value: 11550 },
    { time: "10:15", value: 11570 },
    { time: "10:30", value: 11620 },
    { time: "10:45", value: 11600 },
    { time: "11 am", value: 11650 },
    { time: "11:15", value: 11590 },
    { time: "11:30", value: 11610 },
    { time: "10:45", value: 11640 },
    { time: "12 pm", value: 11680 },
]
interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{ value?: number }>;
    label?: string;
}

// const CustomTooltip = ({ active, payload }: TooltipProps<ValueType, NameType>) => {
//     if (active && payload && payload.length > 0) {
//         const val = payload[0]?.value;
//         return (
//             <div className='bg-[#1df08e] p-4 rounded-xl shadow-lg border-none text-white'>
//                 <p className='text-[10px] font-bold opacity-80'>Top Target: Jan 30</p>
//                 <p className='text-xl font-bold'>N{val ? val.toLocaleString() : '0'}</p>
//             </div>
//         )
//     }
//     return null;
// }

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length > 0) {
        const val = payload[0]?.value;
        return (
            <div className='bg-[#1df08e] p-4 rounded-xl shadow-lg border-none text-white'>
                <p className='text-[10px] font-bold opacity-80'>Top Target: Jan 30</p>
                <p className='text-xl font-bold'>N{val ? val.toLocaleString() : '0'}</p>
            </div>
        );
    }
    return null;
};
type Props = {}

const Page = (props: Props) => {
    const [active, setActive] = useState<string>("")
    const [profileData, setProfileData] = useState<ProfileData | null>(null)
    const settingsArray = ["See Profile", "My Feed", "My Wallet", "Notifications", "Language", "Privacy & Security", "Log Out"]
    const { setAddProduct } = useProductProvider();
    const [activeTab, setactiveTab] = useState<string>("PAY IN")
    const [subFilterTab, setSubFilterTab] = useState<string>("A-Z");
    const [showTarget, setShowTarget] = useState<boolean>(false)
    const [feedsFilterActive, setFeedsFilterActive] = useState<string>("date")
    const filterArray = ["DATE", "STATUS", "LOCATION", "TOPIC"]
    const topicActiveArray = ["COMPLIANCE NOTICE", "HIGH-PERFORMANCE ALERT", "VENDOR CONCERN", "RECREATION", "ONBOARDING"]
    const locationActiveArray = ["UMUAHIA", "JO", "AKWA-IBOM", "ANAMBRA", "BAUCHI", "BAYELSA", "DELTA", "EBONYI", "PLATEAU", "NIGER", "KOGI"]
    const [statisticActive, setStatisticActive] = useState<boolean>(false)
    const [statisticArrayActive, setStatisticArrayActive] = useState<string>("CHARTS")
    const statisticsArray = ["CHARTS", "SUMMARY", "TOPLIST"]
    const [chart, setChart] = useState<boolean>(false)
    const [backLineActive, setBackLineActive] = useState<string>("MY ANALYTICS")
    const notificationActiveTabArray = ["Read", "Unread"];
    const [unread, setUnread] = useState("Unread");
    const notificationRef = useRef<HTMLDivElement>(null)
    const [drop, setDrop] = useState<boolean>(false)

    useEffect(() => {
        const fetchProfileDetails = async () => {
            try {
                if (typeof window === 'undefined') return;
                const token = localStorage.getItem('token');
                
                if (!token) return;

                const response = await axios({
                    url: '/agents/profile',
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                if (response.data) {
                    console.log('Profile details fetched successfully:', response.data.data);
                    setProfileData(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching profile details:', error);
            }
        };

        fetchProfileDetails();
    }, []);

const fullName = profileData
    ? `${profileData.firstName?.trim() || ""} ${
          profileData.lastName?.trim() || ""
      }`.trim()
    : "No name";const [mounted, setMounted] = useState(false);

useEffect(() => {
    setMounted(true);
}, []);

if (!mounted) {
    return null;
}
    return (
        <>
            {active === "See Profile" ? (
                <div className="overflow-y-scroll bg-gradient-agent h-screen">
                    <GlobalContainer className="flex flex-col gap-5 pb-20">
                        <TopBackBar handleClick={() => setActive('')} text='My Profile' />
                        <div className="rounded-full p-3 bg-superlightgreen text-majorgreen flex gap-1 items-center mx-auto">Edit Profile <Settings2/> </div>
                        <div className="flex items-center gap-3">
                            <Image alt="profile" className="rounded-full w-15 h-15 object-cover" height={100}  src={profileData?.profilePicture || profile} unoptimized width={100} />
                            <div className="flex flex-col gap-1">
                                <p className="font-bold text-lg">{fullName}</p>
                                <p className="text-majorgray text-sm">{profileData?.email || "no email"}</p>
                            </div>
                        </div>
                        <p className="text-center text-xl font-light">Total Earnings:</p>
                        <h2 className='md:text-5xl font-bold text-majorgreen text-4xl text-center'>
                            <sup className='text-xl font-light'>NGN</sup> {profileData?.totalEarned?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || "2,542,522.34"}
                        </h2>
                        <div className="flex flex-col">
                            <div className="flex justify-between">
                                <p className="text-majorgray">Order Success</p>
                                <p className="font-bold text-majorgray">85%</p>
                            </div>
                            <div className="w-full h-2 rounded-full bg-superlightgreen overflow-hidden">
                                <div className="h-full w-[30%] bg-majorgreen"></div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p className="text-lg font-bold">About me</p>
                            <p className="text-majorgray text-sm">{profileData?.description || 'With over 9 years of experience in the Nigerian e-commerce landscape, I specialize in helping customers navigate the vast marketplace of Naijazone to find exactly what they need. My mission is simple: to make online shopping seamless, transparent, and satisfying for every Nigerian.'}</p>
                        </div>
                        <div className="grid grid-cols-3">
                            <div className="flex flex-col border-r border-lightgray p-2">
                                <p className="text-3xl font-bold italic">__</p>
                                <p>Vendors</p>
                            </div>
                            <div className="flex flex-col border-r border-lightgray p-2">
                                <p className="text-3xl font-bold italic">+0</p>
                                <p>In Earnings</p>
                            </div>
                            <div className="flex flex-col border-r border-lightgray p-2">
                                <p className="text-3xl font-bold italic">+0</p>
                                <p>Onboardings</p>
                            </div>
                        </div>
                        <Button className="tracking-widest p-5" disabled text="APPLY FOR PROMOTION"/>
                    </GlobalContainer>
                </div>
            ) : active === "My Feed" ? (
                <div className='overflow-y-scroll h-screen'>
                    <GlobalContainer className="bg-gradient-agent flex flex-col gap-5 pb-10">
                        {chart ? (
                            <div className="flex flex-col gap-5">
                                <div className="flex justify-between items-center">
                                    <ChevronLeft onClick={() => setChart(false)} strokeWidth={1} size={30} className="cursor-pointer" />
                                    <p className="text-lg font-bold mx-auto">OMISORE JENNIFER</p>
                                </div>
                                <div className="flex flex-col gap-5 h-screen w-full overflow-y-scroll">
                                    <div className="rounded-r-full rounded-tl-full bg-majororange p-3 flex flex-col gap-1 max-w-[80%] w-fit self-start">
                                        <p className='font-bold text-sm'>SALES REP</p>
                                        <p className="text-sm">Hey Moses!</p>
                                    </div>
                                    <div className="rounded-r-full rounded-tl-full bg-majororange p-3 flex flex-col gap-1 max-w-[80%] w-fit self-start">
                                        <p className='font-bold text-sm'>SALES REP</p>
                                        <p className="text-sm">Have you concluded on your return checks for both customers?</p>
                                    </div>
                                    <div className="rounded-r-full rounded-tl-full bg-majorgreen p-3 flex flex-col gap-1 max-w-[80%] w-fit text-white ms-auto self-start">
                                        <p className='font-bold text-sm'>YOU</p>
                                        <p className="text-sm">Hi Jen!</p>
                                    </div>
                                    <div className="rounded-r-full rounded-tl-full bg-majorgreen p-3 flex flex-col gap-1 max-w-[80%] w-fit text-white ms-auto self-start">
                                        <p className='font-bold text-sm'>YOU</p>
                                        <p className="text-sm">Yes! Thanks for helping out with it.</p>
                                    </div>
                                    <div className="rounded-r-full rounded-tl-full bg-majororange p-3 flex flex-col gap-1 max-w-[80%] w-fit self-start">
                                        <p className='font-bold text-sm'>SALES REP</p>
                                        <p className="text-sm">No worries. Let me know if you need to confirm anything 😊</p>
                                    </div>
                                </div>
                                <div className="md:w-1/2 w-full fixed left-1/2 -translate-x-1/2 md:p-5 p-3 bg-white gap-5 bottom-0 flex items-center">
                                    <Plus className="text-majorgreen" strokeWidth={1}/>
                                    <label htmlFor='text' className="flex justify-between items-center w-full bg-superlightgreen rounded-full py-1 ps-2 pe-1">
                                        <input type="text" id='text' className='w-full outline-none bg-transparent' />
                                        <div className="w-10 flex-shrink-0 h-10 rounded-full text-white bg-majorgreen flex justify-center items-center">
                                            <Send strokeWidth={1}/>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <ChevronLeft onClick={() => setActive('')} strokeWidth={1} className="cursor-pointer" />
                                        <h1 className="text-2xl">2k<sub>+</sub> <span className='text-majorgreen'>Feeds</span></h1>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div onClick={() => setStatisticActive(true)} className={`w-10 h-10 rounded-full bg-superlightgreen flex justify-center items-center cursor-pointer`}>
                                            <TrendingUp/>
                                        </div>
                                        <MonthComponent text="View Code"/>
                                    </div>
                                </div>
                                {statisticActive ? (
                                    <div className='flex flex-col gap-5 pb-50'>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <ChevronLeft className="cursor-pointer" onClick={() => setStatisticActive(false)} strokeWidth={1} />
                                                <p onClick={() => setBackLineActive("MY ANALYTICS")} className={`mx-auto cursor-pointer ${backLineActive === "MY ANALYTICS" ? "text-lightgray" : "text-black"}`}>MY ANALYTICS</p>
                                            </div>
                                            <p onClick={() => setBackLineActive("Oyo State")} className={`mx-auto cursor-pointer ${backLineActive === "Oyo State" ? "text-lightgray" : "text-black"}`}>Oyo State</p>
                                        </div>
                                        <div className="p-3 rounded-xl bg-gradient-trans flex flex-col gap-3">
                                            <FlexComponent>
                                                <p>Target Info</p>
                                                <div className="flex gap-3 items-center">
                                                    <p>2025</p>
                                                    <MonthComponent text="September"/>
                                                    <ChevronDown strokeWidth={1}/>
                                                </div>
                                            </FlexComponent>
                                            <div className="w-full h-1 rounded-full bg-white overflow-hidden">
                                                <div className="w-30 h-full bg-majorgreen"></div>
                                            </div>
                                            <div className="flex items-center gap-2 relative">
                                                <div className="rounded-full p-1 text-white bg-lemongreen">
                                                    <RefreshCcw size="{30}" strokeWidth={1}/>
                                                </div>
                                                <div onClick={() => setShowTarget(!showTarget)} className="flex items-center gap-2 text-majorgray cursor-pointer">
                                                    <p className="text-sm">EARNED (N)</p>
                                                    <ChevronDown strokeWidth={1}/>
                                                </div>
                                                <p>{profileData?.totalEarned?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || "2,542,522.34"}</p>
                                                <div className={`absolute top-12 left-0 bg-white z-10 rounded-lg shadow overflow-hidden ${showTarget ? "block" : "hidden"}`}>
                                                    <div className="flex flex-col gap-3">
                                                        <div className="pb-2 border-b border-majorgray px-4 pt-4">
                                                            <p className="semibold md:text-md text-sm">20% of Target Reached</p>
                                                        </div>
                                                        <div className="flex gap-3 items-start hover:bg-lightgray px-4 py-2 cursor-pointer">
                                                            <Star size={20} strokeWidth={1}/>
                                                            <div className="flex flex-col gap-1">
                                                                <p className="md:text-md text-sm">Vendors Reached</p>
                                                                <span className="text-sm text-majorgray">0</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-3 items-start hover:bg-lightgray px-4 py-2 cursor-pointer">
                                                            <Star size={20} strokeWidth={1}/>
                                                            <div className="flex flex-col gap-1">
                                                                <p className="md:text-md text-sm">Vendors Target</p>
                                                                <span className="text-sm text-majorgray">1,000</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-3 items-start hover:bg-lightgray px-4 py-2 cursor-pointer">
                                                            <Star size={20} strokeWidth={1}/>
                                                            <div className="flex flex-col gap-1">
                                                                <p className="md:text-md text-sm">Vendors Left</p>
                                                                <span className="text-sm text-majorgray">1,000</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex">
                                            {statisticsArray.map((statistic) => (
                                                <div key={statistic} onClick={() => setStatisticArrayActive(statistic)} className={`rounded-full cursor-pointer p-2 md:text-md text-sm flex-shrink-0 ${statisticArrayActive === statistic ? "bg-majororange" : "text-majorgray bg-transparent"}`}>{statistic}</div>
                                            ))}
                                        </div>
                                        <div className="flex justify-between gap-3 items-center">
                                            <p className="text-lg text-majorgray">1D</p>
                                            <div className="w-[2px] h-8 bg-lightgray" />
                                            <p className="text-lg text-majorgray">SD</p>
                                            <div className="w-[2px] h-8 bg-lightgray" />
                                            <p className="text-lg text-majorgray">1M</p>
                                            <div className="w-[2px] h-8 bg-lightgray" />
                                            <p className="text-lg text-majorgray">3M</p>
                                            <div className="w-[2px] h-8 bg-lightgray" />
                                            <p className="text-lg text-majorgray">1Y</p>
                                        </div>
                                        {backLineActive === "MY ANALYTICS" ? (
                                            <>
                                                {statisticArrayActive === "CHARTS" ? (
                                                  <div className="w-full h-[300px] bg-white p-4">
    <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
            <defs>
                <linearGradient
                    id="colorValue"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                >
                    <stop
                        offset="5%"
                        stopColor="#125c3a"
                        stopOpacity={0.3}
                    />
                    <stop
                        offset="95%"
                        stopColor="#125c3a"
                        stopOpacity={0}
                    />
                </linearGradient>
            </defs>

            <CartesianGrid
                stroke="#e5e7eb"
                strokeDasharray="3 3"
                vertical
            />

            <XAxis
                dataKey="time"
                stroke="#9ca3af"
                fontSize={12}
                axisLine={false}
                tickLine={false}
                dy={10}
            />

            <YAxis
                stroke="#9ca3af"
                fontSize={12}
                axisLine={false}
                tickLine={false}
                domain={[11500, 12000]}
            />

            <Tooltip content={<CustomTooltip />} />

            <Area
                type="monotone"
                dataKey="value"
                stroke="#1df08e"
                strokeWidth={2}
                fill="url(#colorValue)"
                fillOpacity={1}
                activeDot={{ r: 6 }}
                dot={{ r: 4 }}
            />
        </AreaChart>
    </ResponsiveContainer>
</div>
                                                ) : statisticArrayActive === "SUMMARY" ? (
                                                    <div className="flex flex-col gap-5">
                                                        <div className='flex flex-col py-5 border-y border-lightgray gap-10'>
                                                            <div className="flex flex-col gap-3">
                                                                <div className="flex justify-between items-center">
                                                                    <div className="flex flex-col gap-1">
                                                                        <p className="font-semibold">11,999.87</p>
                                                                        <p className="text-majorgray text-sm">Day Low</p>
                                                                    </div>
                                                                    <div className="flex flex-col gap-1">
                                                                        <p className="font-semibold">12,248.15</p>
                                                                        <p className="text-majorgray text-sm">Day High</p>
                                                                    </div>
                                                                </div>
                                                                <div className="w-full rounded-full h-1 bg-lightgreen">
                                                                    <div className="flex flex-col gap-1 -mt-2">
                                                                        <div className="h-5 w-2 rounded-full bg-black"></div>
                                                                        <p className="font-bold text-2xl">12.166.60</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col gap-3">
                                                                <div className="flex justify-between items-center">
                                                                    <div className="flex flex-col gap-1">
                                                                        <p className="font-semibold">10,440.64</p>
                                                                        <p className="text-majorgray text-sm">Previous Low</p>
                                                                    </div>
                                                                    <div className="flex flex-col gap-1">
                                                                        <p className="font-semibold">15,265.42</p>
                                                                        <p className="text-majorgray text-sm">Previous High</p>
                                                                    </div>
                                                                </div>
                                                                <div className="w-full rounded-full h-1 bg-lightgreen">
                                                                    <div className="flex flex-col gap-1 -mt-2">
                                                                        <div className="h-5 w-2 rounded-full bg-black"></div>
                                                                        <p className="font-bold text-2xl">12.166.60</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="px-5 flex justify-between">
                                                            <div className="flex flex-col gap-2">
                                                                <p className="text-sm text-majorgray">Summary Time</p>
                                                                <p className="text-2xl font-bold">0515 pm</p>
                                                            </div>
                                                            <div className="flex flex-col gap-2">
                                                                <p className="text-sm text-majorgray">Summary Date</p>
                                                                <p className="text-2xl font-bold">01/27/23</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : statisticArrayActive === "TOPLIST" && (
                                                    <div className="flex flex-col gap-5">
    <div className="p-5 rounded-xl bg-superlightgreen flex flex-col gap-3">
        <p className="text-3xl md:text-5xl">
            You ranked <span className="text-lemongreen">1398th!</span>
        </p>

        <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
                <Image
                    src={profileData?.profilePicture || "/images/profile.png"}
                    alt="profile"
                    width={100}
                    height={100}
                    unoptimized
                    className="h-15 w-15 rounded-full object-cover"
                />

                <div className="flex flex-col gap-2">
                    <p className="text-sm font-bold">{fullName}</p>

                    <div className="rounded-full bg-majorgreen px-2 py-1 text-sm text-white flex items-center justify-center">
                        {profileData?.agentRoleType || "Sales Agent"}
                    </div>
                </div>
            </div>

            <div className="flex h-10 w-20 items-center justify-center rounded-lg bg-white">
                <p>+20%</p>
            </div>
        </div>
    </div>

    <div className="h-[1px] w-full bg-lightgray" />

    <div className="flex flex-col gap-5">
        <div className="flex justify-between">
            <div className="flex items-center gap-2">
                <Image
                    src={profileData?.profilePicture || "/images/profile.png"}
                    alt="profile"
                    width={100}
                    height={100}
                    unoptimized
                    className="h-8 w-8 rounded-full object-cover"
                />

                <div className="flex flex-col gap-1">
                    <p className="text-sm">Nigeria</p>
                    <p className="font-bold">
                        {profileData?.state || "Edo State"}
                    </p>
                </div>
            </div>

            <div className="flex flex-col items-end gap-1">
                <p>TOP 12%</p>
                <p className="text-majorred">-3.21</p>
            </div>
        </div>

        <div className="flex justify-between">
            <div className="flex items-center gap-2">
                <Image
                    src={profileData?.profilePicture || "/images/profile.png"}
                    alt="profile"
                    width={100}
                    height={100}
                    unoptimized
                    className="h-8 w-8 rounded-full object-cover"
                />

                <div className="flex flex-col gap-1">
                    <p className="text-sm">Nigeria</p>
                    <p className="font-bold">Global</p>
                </div>
            </div>

            <div className="flex flex-col items-end gap-1">
                <p>TOP 60%</p>
                <p className="text-superlightgreen">+302</p>
            </div>
        </div>
    </div>
</div>
                                                )}
                                            </>
                                        ) : (
                                            <div className="flex flex-col">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm">Best Agents</p>
                                                    <div className="w-10 h-10 flex justify-center items-center bg-majorgreen text-majororange rounded-full">
                                                        <Star size={20}/>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between py-3 border-b border-lightgray">
                                                    <div className="flex items-center gap-3">
                                                        <Image alt="profile" className="w-10 h-10 rounded-full" height={100} src={profile} width={100}/>
                                                        <p className="font-bold">Rashida Ibrahim</p>
                                                    </div>
                                                    <div className="flex flex-col gap-1 items-end">
                                                        <p className="text-sm">N590,000.24</p>
                                                        <p className="text-sm text-majorgreen">+12</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <div className="flex flex-col gap-1">
                                            <div className="flex gap-1">
                                                <div className="flex flex-col gap-1 flex-grow">
                                                    <p className="text-sm text-lightgray">Pending Sales</p>
                                                    <button className="p-5 rounded-xl text-xl bg-lightgreen w-full flex">N14,032.56</button>
                                                </div>
                                                <div className="flex flex-col gap-1 items-center">
                                                    <p className="text-sm text-lightgray">Increase</p>
                                                    <button className="p-5 rounded-xl bg-majorgreen text-white">+ 20%</button>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <p className="text-sm text-lightgray">Inventory Total</p>
                                                <button className="py-1 px-1 rounded-xl text-xl bg-superlightgreen w-full flex items-center justify-between"><span className='ps-3'>N14,032.56</span> <div className="w-10 h-10 rounded-lg flex justify-center items-center text-white bg-lightgreen"><ArrowRight/></div></button>
                                            </div>
                                        </div>
                                        <div className="md:w-1/2 w-full fixed left-1/2 -translate-x-1/2 md:p-5 p-3 bg-white flex flex-col gap-5 bottom-0 z-20">
                                            <label htmlFor='contact-rep' className="flex justify-between items-center w-full cursor-pointer">
                                                <p className="text-sm">OMISORE JENNIFER</p>
                                                <Image alt="profile" className="w-5 h-5 rounded-full" height={100} src={profile} width={100}/>
                                            </label>
                                            <button onClick={() => setChart(true)} className='bg-majorgreen p-3 rounded-xl text-white w-full'>CONTACT SALES REP</button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <FilterTab orange setSubFilterTab={setFeedsFilterActive} subFilterTab={feedsFilterActive} subFilterTabArray={filterArray}/>
                                        {feedsFilterActive === "location" && (
                                            <>
                                                <FlexTextNumber desc="Available in Nigeria" text="State" textNum={9}/>
                                                <div className="flex flex-wrap gap-2">
                                                    {locationActiveArray.map((location) => (
                                                        <ButtonSimulation key={location} text={location}/>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                        <FlexComponent>
                                            <p className="font-bold text-2xl">2025</p>
                                            <div className="flex items-center gap-2">
                                                <MonthComponent text="September"/>
                                                <ChevronDown/>
                                            </div>
                                        </FlexComponent>
                                        {feedsFilterActive === "topic" && (
                                            <>
                                                <FlexTextNumber text="Top " textNum={9}/>
                                                <div className="flex flex-wrap gap-2">
                                                    {topicActiveArray.map((topic) => (
                                                        <ButtonSimulation key={topic} text={topic}/>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                        <div className="bg-superlightgreen md:p-5 p-3 rounded-2xl flex flex-col gap-3">
                                            <FlexComponent>
                                                <div className="flex flex-col">
                                                    <p className='text-verydark'>#Onboarding</p>
                                                    <p className="font-bold">Tope Alabi</p>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <div className="py-1 px-2 rounded-full bg-majorgreen text-sm text-white">Sales Agent</div>
                                                    <ChevronDown strokeWidth={1}/>
                                                </div>
                                            </FlexComponent>
                                            <div className="flex gap-3">
                                                <Image alt="profile" className="w-10 h-10 rounded-full object-cover" height={100} src={profile} width={100}/>
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex items-center">
                                                        <p className="font-semibold md:text-md text-sm">Order Sync Delays</p>
                                                        <div className="flex items-center gap-2"><LocateIcon className="text-majorgray" strokeWidth={1}/> <p className='text-sm text-majorgray'>Lagos</p> <p className='text-majorgray'>•</p> <p className='text-majorgray'>1hr ago</p></div>
                                                    </div>
                                                    <p className="md:text-md text-sm">Several Tier-1 electronics brands onboarded last week are reporting "Order Sync" delays.</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-5">
                                                <div className="flex">
                                                    <ThumbsUp className="text-majorgray" size={20} strokeWidth={1}/>
                                                    <sup>12</sup>
                                                </div>
                                                <div className="flex">
                                                    <MessageCircle className="text-majorgray" size={20} strokeWidth={1}/>
                                                    <sup>12</sup>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-superlightgreen md:p-5 p-3 rounded-2xl flex flex-col gap-3">
                                            <FlexComponent>
                                                <div className="flex flex-col">
                                                    <p>#Payment</p>
                                                    <p className="font-bold">Grace Abubakar</p>
                                                </div>
                                                {feedsFilterActive === "topic" ? (
                                                    <div className="flex items-center gap-1">
                                                        <div className="py-1 px-2 rounded-full bg-majororange text-sm text-white">Sales Coordinator</div>
                                                        <ChevronDown strokeWidth={1}/>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-1">
                                                        <div className="py-1 px-2 rounded-full bg-majorgreen text-sm text-white">Sales Agent</div>
                                                        <ChevronDown strokeWidth={1}/>
                                                    </div>
                                                )}
                                            </FlexComponent>
                                            <div className="flex gap-3">
                                                <Image alt="profile" className="w-10 h-10 rounded-full object-cover" height={100} src={profile} width={100}/>
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex items-center">
                                                        <p className="font-semibold md:text-md text-sm">Order Sync Delays</p>
                                                        <div className="flex items-center gap-2"><Star className="text-majororange" strokeWidth={1}/> <p className='text-sm text-majorgray'>48</p> <p className='text-majorgray'>•</p> <p className='text-majorgray'>1hr ago</p></div>
                                                    </div>
                                                    <p className="md:text-md text-sm">My top 5 textile vendors are threatening to delist due to the 72-hour settlement cycle. They are requesting "Next Day Settlement" to keep up with high-turnover inventory costs. Direct to HQ: Can we review the "Fast-Track Settlement" feature for Gold-Verified vendors? If we lose these brands to competitors, our Northern region fashion category will take a massive hit.</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-5">
                                                <div className="flex">
                                                    <ThumbsUp className="text-majorgray" size={20} strokeWidth={1}/>
                                                    <sup>12</sup>
                                                </div>
                                                <div className="flex">
                                                    <MessageCircle className="text-majorgray" size={20} strokeWidth={1}/>
                                                    <sup>12</sup>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:w-1/2 w-full fixed left-1/2 -translate-x-1/2 md:p-5 p-3 bg-white flex flex-col gap-5 bottom-0 z-20">
                                            <label htmlFor='post-text' className="flex items-center gap-3 w-full">
                                                <Plus className="text-majorgreen flex-shrink-0" size="{30}" strokeWidth={1}/>
                                                <input id='post-text' type="text" placeholder='Type a message...' className='w-full outline-none bg-transparent' />
                                            </label>
                                            <button className='bg-majorgreen p-3 rounded-xl text-white w-full'>SEND POST</button>
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </GlobalContainer>
                </div>
            ) : active === "My Wallet" ? (
    <div className="h-screen overflow-y-scroll">
        <GlobalContainer className="flex flex-col gap-5 bg-gradient-agent pb-20">
            <TopBackBar
                handleClick={() => setActive("")}
                text="My Profile"
            />

            <ActiveTabStraight
                activeTab={activeTab}
                setActiveTab={setactiveTab}
                activeTabArray={["PAY IN", "WITHDRAWAL"]}
            />

            {activeTab === "PAY IN" ? (
                <>
                    <div className="flex flex-col gap-3 rounded-xl bg-majorgreen p-3">
                        <div className="flex items-center justify-between">
                            <p className="text-superlightgreen">
                                Balance
                            </p>

                            <div className="flex cursor-pointer items-center gap-1 rounded-full bg-superlightgreen px-2 py-1">
                                <p className="text-sm">
                                    EDIT ACCOUNT
                                </p>

                                <ChevronRight
                                    size={18}
                                    strokeWidth={1}
                                />
                            </div>
                        </div>

                        <p className="text-3xl font-bold text-superlightgreen md:text-5xl">
                            ₦
                            {profileData?.balance?.toLocaleString(
                                undefined,
                                {
                                    minimumFractionDigits: 2,
                                }
                            ) || "2,542,522.34"}
                        </p>

                        <div className="flex items-center gap-3 text-superlightgreen">
                            <TrendingUp strokeWidth={1} />
                            <p>No recent addition</p>
                        </div>
                    </div>

                    <FilterTab
                        setSubFilterTab={setSubFilterTab}
                        subFilterTab={subFilterTab}
                        subFilterTabArray={[
                            "A-Z",
                            "DATE",
                            "PRICING",
                            "TRANSACTION",
                        ]}
                    />

                    <div className="flex flex-col gap-3 rounded-xl bg-superlightgreen p-3">
                        <p>Wallet Info</p>

                        <div className="relative flex items-center gap-2">
                            <div className="rounded-full bg-lemongreen p-1 text-white">
                                <RefreshCcw
                                    size={30}
                                    strokeWidth={1}
                                />
                            </div>

                            <div
                                onClick={() =>
                                    setShowTarget(!showTarget)
                                }
                                className="flex cursor-pointer items-center gap-2 text-majorgray"
                            >
                                <p className="text-sm">
                                    EARNED (₦)
                                </p>

                                <ChevronDown strokeWidth={1} />
                            </div>

                            <p>
                                {profileData?.totalEarned?.toLocaleString(
                                    undefined,
                                    {
                                        minimumFractionDigits: 2,
                                    }
                                ) || "2,542,522.34"}
                            </p>
                        </div>
                    </div>

                    <FlexComponent>
                        <p className="text-2xl font-bold">2024</p>

                        <div className="flex items-center gap-3">
                            <MonthComponent text="September" />
                            <ChevronDown strokeWidth={1} />
                        </div>
                    </FlexComponent>

                    <div className="flex w-full flex-col rounded-xl bg-superlightgreen p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Image
                                    src={
                                        profileData?.profilePicture ||
                                        "/images/profile.png"
                                    }
                                    alt="profile"
                                    width={100}
                                    height={100}
                                    unoptimized
                                    className="h-10 w-10 rounded-full object-cover"
                                />

                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm text-majorgray md:text-md">
                                            30 Sep
                                        </p>

                                        <div className="flex items-center gap-2">
                                            <Dot className="text-majorgray" />

                                            <p className="text-sm text-majorgray md:text-md">
                                                Product...
                                            </p>
                                        </div>
                                    </div>

                                    <p>Joseph Alade</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="rounded-full bg-superlightgreen px-2 py-1 font-extrabold">
                                    3,000.00
                                </div>

                                <ChevronDown />
                            </div>
                        </div>
                    </div>

                    <Button
                        className="w-full p-5 tracking-widest"
                        text="WITHDRAW FROM WALLET"
                    />
                </>
            ) : (
                <>
                    {/* Withdrawal section */}
                </>
            )}
        </GlobalContainer>
    </div>
) : active === "Notifications" ? (
    <div className="h-screen w-full overflow-y-scroll bg-white">
        <GlobalContainer className="flex h-full flex-col gap-5 bg-gradient-agent">
            <div className="flex items-center justify-between">
                <ChevronLeft
                    onClick={() => setActive("")}
                    strokeWidth={1}
                    className="cursor-pointer"
                />

                <p className="text-xl font-bold">Notifications</p>

                <div
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white"
                    onClick={() => setActive("")}
                >
                    <X strokeWidth={1} />
                </div>
            </div>

            <NotificationTab
                activeTab={unread}
                activeTabArray={notificationActiveTabArray}
                setActiveTab={setUnread}
            />

            <div className="border-lightgray flex flex-col gap-3 border-b py-3">
                <div
                    onClick={() => setDrop(!drop)}
                    className="flex cursor-pointer items-center justify-between gap-5"
                >
                    <div className="flex gap-2">
                        <Image
                            src={profile}
                            alt="profile"
                            width={100}
                            height={100}
                            className="h-10 w-10 rounded-full"
                        />

                        <div className="flex flex-col gap-1">
                            <p className="font-bold">
                                Order Processing Update
                            </p>

                            <p className="text-sm">
                                Order #[Order ID] is now in the processing
                                stage. Keep the pace up to ensure timely
                                delivery.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="bg-superlightgreen flex flex-shrink-0 items-center justify-center rounded px-2 py-1 text-sm">
                            3 mins
                        </div>

                        <ChevronDown
                            strokeWidth={1}
                            className={`transition-transform duration-200 ${
                                drop ? "rotate-180" : ""
                            }`}
                        />
                    </div>
                </div>

                <div
                    ref={notificationRef}
                    className="flex w-full flex-col gap-3 overflow-hidden transition-[height] duration-200 ease-in-out"
                    style={{
                        height: drop
                            ? `${notificationRef.current?.scrollHeight}px`
                            : "0px",
                    }}
                >
                    <div className="bg-superlightgreen flex flex-shrink-0 flex-col gap-3 rounded-2xl p-2 md:p-4">
                        <Image
                            src={profile}
                            alt="profile"
                            width={1000}
                            height={1000}
                            className="h-40 w-full rounded-2xl object-cover object-top md:h-50"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <h1 className="text-xl font-bold md:text-3xl">
                            PRODUCT DETAILS
                        </h1>

                        <div className="flex items-center gap-3">
                            <div className="bg-lemongreen rounded-full p-2 text-sm text-white shadow md:text-md">
                                INCOMING
                            </div>

                            <ChevronDown strokeWidth={1} />
                        </div>
                    </div>

                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-3">
                            <div className="flex w-full justify-between gap-3">
                                <div className="flex flex-col gap-3">
                                    <p className="text-majorgray">
                                        Product Type
                                    </p>

                                    <p className="text-lg">Shoes</p>
                                </div>

                                <div className="flex w-40 flex-col">
                                    <Button
                                        border
                                        className="p-2 text-sm md:text-md"
                                        text="8:00 AM - 11:00 AM"
                                    />

                                    <p className="mt-1 text-sm">
                                        September 30, 2024
                                    </p>
                                </div>
                            </div>

                            <div className="flex w-full justify-between gap-3">
                                <div className="flex flex-col gap-3">
                                    <p className="text-majorgray text-sm md:text-md">
                                        Description
                                    </p>

                                    <p>
                                        The perfect T-shirt for when you want
                                        to feel at ease but still stylish...
                                    </p>
                                </div>

                                <div className="flex w-40 flex-shrink-0 flex-col gap-3">
                                    <p className="text-majorgray text-sm md:text-md">
                                        Order Location
                                    </p>

                                    <p>Umuahia, Abia</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 bg-white">
                        <div className="flex w-full justify-between">
                            <div className="flex flex-col gap-3">
                                <p className="text-majorgray">
                                    Estimated Arrival
                                </p>

                                <p>11 Hours</p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <p className="text-majorgray">
                                    Approximate Distance
                                </p>

                                <p>500 km</p>
                            </div>
                        </div>

                        <div className="flex w-full items-center justify-between">
                            <p className="text-majorgray text-sm md:text-md">
                                Size
                            </p>

                            <div className="w-40">
                                <Button
                                    className="w-full p-4"
                                    text="XL"
                                />
                            </div>
                        </div>

                        <div className="flex w-full items-center justify-between">
                            <p className="text-majorgray text-sm md:text-md">
                                Price (NGN)
                            </p>

                            <div className="flex w-40 justify-start">
                                <div className="bg-lightgray rounded-full px-5 py-2 text-xl font-bold">
                                    3,000.00
                                </div>
                            </div>
                        </div>

                        <div className="flex w-full items-center justify-between">
                            <p className="text-majorgray text-sm md:text-md">
                                Delivery
                            </p>

                            <div className="flex w-40 justify-start">
                                <div className="bg-lightgray rounded-full px-5 py-2 text-xl">
                                    DHL
                                </div>
                            </div>
                        </div>

                        <div className="flex w-full items-center justify-between">
                            <p className="text-majorgray text-sm md:text-md">
                                Commission (%)
                            </p>

                            <div className="flex w-40 justify-start">
                                <div className="bg-lightgray rounded-full px-5 py-2 text-xl font-bold">
                                    4%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GlobalContainer>
    </div>
) : (
               <GlobalContainer className="flex h-screen flex-col justify-between gap-5 overflow-y-auto bg-white pb-40">
        <h1 className="mt-5 text-center text-2xl font-extrabold md:text-3xl">
            Settings
        </h1>

        <div className="relative mx-auto flex w-40 items-center justify-center">
            <Image
                src={profileData?.profilePicture || "/images/profile.png"}
                alt="profile"
                width={100}
                height={100}
                unoptimized
                className="absolute h-32 w-32 rounded-full object-cover"
            />

            <CircularProgressbar
                value={30}
                strokeWidth={3}
                className="z-10 mx-auto w-40"
                styles={buildStyles({
                    pathColor: "#006838",
                    trailColor: "#00683820",
                })}
            />

            <div className="bg-majorgreen absolute bottom-2 right-0 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-white shadow">
                <Plus strokeWidth={2} />
            </div>
        </div>

        <div className="flex flex-col gap-2 text-center">
            <p className="text-xl font-bold text-majorgray">
                Hello {fullName}
            </p>

            <p className="text-xl font-bold text-lightgray">
                {profileData?.email || "padreakpor25@yahoo.com"}
            </p>
        </div>

        <div className="mt-5 flex w-full flex-col gap-2">
            {settingsArray.map((setting, index) => (
                <div
                    key={index}
                    onClick={() => {
                        setActive(setting);
                        setAddProduct(true);
                    }}
                    className={`flex cursor-pointer items-center justify-between rounded-full p-4 transition-colors ${
                        active === setting
                            ? "bg-superlightgreen"
                            : "bg-transparent hover:bg-superlightgreen/50"
                    }`}
                >
                    <p className="text-md font-medium md:text-lg">
                        {setting}
                    </p>

                    <ChevronRight
                        className="text-majorgray"
                        strokeWidth={1}
                    />
                </div>
            ))}
        </div>
    </GlobalContainer>
            )}
        </>
    )
}

export default Page