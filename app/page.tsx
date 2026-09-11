// 'use client'
// import Image from "next/image";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import GlobalContainer from "./components/GlobalContainer";
// import profile from "@/app/src/images/profile.png"
// import star from "@/app/src/images/star.png"
// import { useState } from "react";
// import { StarIcon } from "flowbite-react";
// import { Button } from "./components/Button";
// import { KeyIcon, Router } from "lucide-react";
// import Link from "next/link";
// import { useProgress } from "./contexts/OnboardingContext";
// import { useRouter } from "next/navigation";

// export default function Home() {
//   const [active, setActive] = useState<"sales-agent" | "sales-coordinator" | null>(null);
//   const {setAccountTypeValue} = useProgress()
//   const signUpOptions = [
//     {
//       title: "Sales Agent",
//       route: "sales-agent", 
//       desc: "Area-based Marketing", 
//       amount: 90375, 
//       freqPay: "every month"
//     }, 
//     {
//       title: "Sales Coordinator",
//       route: "sales-coordinator", 
//       desc: "State-based Marketing", 
//       amount: 150875, 
//       freqPay: "every month"
//     }, 
//   ] as const;

//   const router = useRouter();

//   const handleSelection = async () => {
//     if(!active) return alert("You need to select a role")
//     try {
//       await router.push(`/${active}`)
//     } catch (error) {
//       console.log("Error fetching the routes", error)
//     }
//   }
//   return (
//     <div className="h-screen overflow-y-scroll">
//       <div className="bg-gradient-coordinator flex flex-col gap-10 items-center pb-15 md:px-5 px-3 pt-10">
//         <div className="flex justify-center items-center relative">
//           <Image src={profile} width={1000} height={1000} alt="profile" className="w-40 absolute" />
//           <CircularProgressbar
//             className="w-50 mx-auto"
//             value={30}
//             strokeWidth={.5}
//             styles={buildStyles({
//               pathColor: '#E09427',
//               textColor: '#3b82f6',
//               trailColor: '#e0932780',
//             })}
//           />
//         </div>
//         <div className="flex flex-col gap-5 text-center">
//           <h1 className="text-3xl text-black">LET&apos;S Rep <span className="font-extrabold text-majorgreen">Naija</span></h1>
//           <p className="text-black">Join Naigeria&apos;s fastest-growing network of verified agents. Manage listings, track leads, and close deals all in one place.</p>
//         </div>
//         <div className="flex flex-col gap-3 w-full">
//           {signUpOptions.map((option, index) => (
//             <div onClick={() => {setActive(option.route), setAccountTypeValue(option.title)}} key={index} className={`rounded-xl flex justify-between items-center p-3 w-full relative ${active === option.route ? "bg-majororange" : "border border-majorgray"}`}>
//               {option.title === "Sales Agent" && (
//                 <Image src={star} width={1000} height={1000} alt="star" className="absolute w-8 -top-4 -right-2" />
//               )}
//               <div className="flex items-center gap-3">
//                 <div className={`w-5 h-5 rounded-full flex justify-center items-center ${active === option.route ? "bg-lightorange" : "border border-majorgreen"}`}>
//                   <div className={`w-2 h-2 rounded-full bg-white`}></div>
//                 </div>
//                 <div className="flex flex-col gap-2">
//                   <p className="font-extrabold md:text-xl text-lg">{option.title}</p>
//                   <span className="text-sm text-majorgreen">{option.desc}</span>
//                 </div>
//               </div>
//               <div className="flex flex-col gap-2">
//                 {/* <p className="font-extrabold md:text-xl">₦{option.amount.toLocaleString(undefined, {
//                   maximumFractionDigits: 2, 
//                   minimumFractionDigits: 2
//                 })}</p> */}
//                 {/* <span className="text-sm">{option.freqPay}</span> */}
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="p-3 rounded-2xl bg-superlightgreen flex flex-col gap-3">
//           <p className="font-bold text-xl">Details:</p>
//           <div className="flex gap-3">
//             <StarIcon strokeWidth={1} color="#006838" />
//             <div className="flex flex-col">
//               <p className="text-majorgray">1. Role and Responsibilities</p>
//               <p className="text-majorgray">As the Independent Sales Representative fo ryour assigned state, your roles is comprehensive and focused on growth and oversiht. Your key responsibilities include: <br /> . Agent Oversight: Direct supervision, training (Virtual or physical depending on your convenience and discretion), and coordination of Sales Agents within</p>
//             </div>
//           </div>
//         </div>
//         <div className="flex items-center gap-5 w-full">
//           <Button text="APPLY NOW!" className="p-4 w-full cursor-pointer" onClick={handleSelection} />
//           <div className="flex justify-center items-center w-15 h-15 flex-shrink-0 rounded-full text-white bg-majorgreen">
//             <KeyIcon strokeWidth={1} size={30} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// 'use client';

// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import { KeyIcon } from "lucide-react";

// import { Button } from "./components/Button";
// import { useProgress } from "./contexts/OnboardingContext";

// import profile from "@/app/src/images/profile.png";
// import star from "@/app/src/images/star.png";

// export default function Home() {
//   const [active, setActive] = useState<"sales-agent" | "sales-coordinator" | null>(null);
//   const { setAccountTypeValue } = useProgress();
//   const router = useRouter();

//   const signUpOptions = [
//     {
//       title: "Sales Agent",
//       route: "sales-agent", 
//       desc: "Area-based Marketing", 
//       amount: 90375, 
//       freqPay: "every month"
//     }, 
//     {
//       title: "Sales Coordinator",
//       route: "sales-coordinator", 
//       desc: "State-based Marketing", 
//       amount: 150875, 
//       freqPay: "every month"
//     }, 
//   ] as const;

//   const handleSelection = async () => {
//     if (!active) return alert("You need to select a role");
//     try {
//       await router.push(`/${active}`);
//     } catch (error) {
//       console.error("Error navigating to route:", error);
//     }
//   };

//   return (
//     <div className="h-screen overflow-y-scroll">
//       <div className="bg-gradient-coordinator flex flex-col gap-10 items-center pb-15 md:px-5 px-3 pt-10">
        
//         {/* Profile & Progress Section */}
//         <div className="flex justify-center items-center relative">
//           <Image 
//             src={profile} 
//             width={1000} 
//             height={1000} 
//             alt="profile" 
//             className="w-40 absolute" 
//             priority 
//           />
//           <CircularProgressbar
//             className="w-50 mx-auto"
//             value={30}
//             strokeWidth={0.5}
//             styles={buildStyles({
//               pathColor: '#E09427',
//               textColor: '#3b82f6',
//               trailColor: '#e0932780',
//             })}
//           />
//         </div>
        
//         {/* Header Section */}
//         <div className="flex flex-col gap-5 text-center">
//           <h1 className="text-3xl text-black">
//             LET&apos;S Rep <span className="font-extrabold text-majorgreen">Naija</span>
//           </h1>
//           <p className="text-black">
//             Join Nigeria&apos;s fastest-growing network of verified agents. Manage listings, track leads, and close deals all in one place.
//           </p>
//         </div>
        
//         {/* Role Selection Options */}
//         <div className="flex flex-col gap-3 w-full">
//           {signUpOptions.map((option, index) => (
//             <div 
//               key={index} 
//               onClick={() => {
//                 setActive(option.route);
//                 setAccountTypeValue(option.title);
//               }} 
//               className={`rounded-xl flex justify-between items-center p-3 w-full cursor-pointer relative transition-colors ${active === option.route ? "bg-majororange" : "border border-majorgray"}`}
//             >
//               {option.title === "Sales Agent" && (
//                 <Image src={star} width={1000} height={1000} alt="star" className="absolute w-8 -top-4 -right-2" />
//               )}
//               <div className="flex items-center gap-3">
//                 <div className={`w-5 h-5 rounded-full flex justify-center items-center ${active === option.route ? "bg-lightorange" : "border border-majorgreen"}`}>
//                   <div className="w-2 h-2 rounded-full bg-white"></div>
//                 </div>
//                 <div className="flex flex-col gap-2">
//                   <p className="font-extrabold md:text-xl text-lg">{option.title}</p>
//                   <span className="text-sm text-majorgreen">{option.desc}</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Roles and Responsibilities Link */}
//         {/* <div className="w-full text-center">
//            <Link href="/roles-info" className="text-majorgreen underline font-medium hover:opacity-80 transition-opacity">
//              View Role Responsibilities and Details
//            </Link>
//         </div> */}
        
//         {/* Action Buttons Section */}
//         <div className="flex items-center gap-5 w-full">
//           <Button 
//             text="APPLY NOW!" 
//             className="p-4 w-full cursor-pointer" 
//             onClick={handleSelection} 
//           />
          
//           <div>
//           <Link 
//             href="/login" 
//             className="flex justify-center items-center w-fit px-6 space-x-2 h-15 flex-shrink-0 rounded-full text-white bg-majorgreen hover:opacity-90 transition-opacity"
//             aria-label="Go to login page"
//             >
//             <p>Login</p>
//             <KeyIcon strokeWidth={1} size={30} />
//           </Link>
//           </div>
//         </div>
        
//       </div>
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Check,
  KeyRound,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { Button } from "./components/Button";
import { useProgress } from "./contexts/OnboardingContext";

import profile from "@/app/src/images/profile.png";
import star from "@/app/src/images/star.png";

type Role = "sales-agent" | "sales-coordinator";

type SignUpOption = {
  title: string;
  route: Role;
  desc: string;
  amount: number;
  freqPay: string;
  features: string[];
};

const signUpOptions: SignUpOption[] = [
  {
    title: "Sales Agent",
    route: "sales-agent",
    desc: "Area-based Marketing",
    amount: 90375,
    freqPay: "every month",
    features: [
      "Manage assigned area",
      "Track leads and listings",
      "Build customer relationships",
    ],
  },
  {
    title: "Sales Coordinator",
    route: "sales-coordinator",
    desc: "State-based Marketing",
    amount: 150875,
    freqPay: "every month",
    features: [
      "Manage a wider territory",
      "Coordinate sales activity",
      "Monitor agents and opportunities",
    ],
  },
];

const formatNaira = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function Home() {
  const [active, setActive] = useState<Role | null>(null);
  const [selectionError, setSelectionError] = useState("");
  const [navigating, setNavigating] = useState(false);

  const { setAccountTypeValue } = useProgress();
  const router = useRouter();

  const selectedOption = signUpOptions.find(
    (option) => option.route === active
  );

  const handleSelection = () => {
    if (!active) {
      setSelectionError("Please select a role before continuing.");
      return;
    }

    setSelectionError("");
    setNavigating(true);

    const selected = signUpOptions.find(
      (option) => option.route === active
    );

    if (selected) {
      setAccountTypeValue(selected.title);
    }

    router.push(`/${active}`);
  };

  const handleRoleSelect = (option: SignUpOption) => {
    setActive(option.route);
    setAccountTypeValue(option.title);
    setSelectionError("");
  };

  return (
    <main className="fixed inset-0 z-50 h-[100dvh] w-full overflow-x-hidden overflow-y-auto overscroll-contain bg-white">
      <div className="min-h-full bg-gradient-coordinator">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-4 pb-36 pt-8 sm:px-6 md:px-8 md:pb-40 md:pt-12">
          {/* Top badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-majorgreen/10 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-majorgreen shadow-sm backdrop-blur">
            <ShieldCheck size={15} />
            Verified Agent Network
          </div>

          {/* Profile + progress */}
          <div className="relative flex h-44 w-44 items-center justify-center sm:h-48 sm:w-48">
            <div className="absolute inset-0 rounded-full bg-superlightgreen/50 blur-2xl" />

            <div className="relative z-10 flex h-40 w-40 items-center justify-center sm:h-44 sm:w-44">
              <CircularProgressbar
                value={30}
                strokeWidth={3}
                styles={buildStyles({
                  pathColor: "#E09427",
                  textColor: "#E09427",
                  trailColor: "#e0932780",
                  strokeLinecap: "round",
                })}
              />

              <div className="absolute inset-5 overflow-hidden rounded-full border-4 border-white bg-superlightgreen shadow-xl">
                <Image
                  src={profile}
                  width={500}
                  height={500}
                  alt="NaijaZone representative"
                  className="h-full w-full object-cover"
                  priority
                />
              </div>

              <div className="absolute -right-1 bottom-5 flex h-10 w-10 items-center justify-center rounded-full bg-lemongreen text-black shadow-lg ring-4 ring-white">
                <Check size={19} strokeWidth={3} />
              </div>
            </div>
          </div>

          {/* Hero */}
          <section className="mt-7 max-w-3xl text-center">
            <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-majororange">
              <Sparkles size={14} />
              Build. Connect. Sell.
            </div>

            <h1 className="text-4xl font-medium leading-tight tracking-tight text-black sm:text-5xl md:text-6xl">
              LET&apos;S Rep{" "}
              <span className="font-extrabold text-majorgreen">
                Naija
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-majorgray sm:text-base md:text-lg">
              Join Nigeria&apos;s growing network of sales professionals.
              Discover opportunities, manage leads, represent businesses,
              and grow your market presence from one platform.
            </p>
          </section>

          {/* Progress indicator */}
          <div className="mt-7 flex items-center gap-2 rounded-full bg-white/75 px-4 py-2 shadow-sm backdrop-blur">
            <div className="h-2.5 w-2.5 rounded-full bg-majororange" />
            <span className="text-xs font-bold text-black">
              Step 1 of 4
            </span>
            <span className="text-xs text-majorgray">
              Choose your role
            </span>
          </div>

          {/* Role selection */}
          <section className="mt-8 w-full">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-black sm:text-2xl">
                  Choose your role
                </h2>

                <p className="mt-1 text-sm text-majorgray">
                  Select the path that matches how you want to represent
                  NaijaZone.
                </p>
              </div>

              {selectedOption && (
                <div className="hidden rounded-full bg-superlightgreen px-3 py-1.5 text-xs font-bold text-majorgreen sm:block">
                  Selected
                </div>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {signUpOptions.map((option) => {
                const isActive = active === option.route;

                return (
                  <button
                    key={option.route}
                    type="button"
                    onClick={() => handleRoleSelect(option)}
                    aria-pressed={isActive}
                    className={`group relative w-full overflow-hidden rounded-3xl border p-5 text-left transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-majorgreen/15 ${
                      isActive
                        ? "border-majororange bg-majororange shadow-xl shadow-majororange/20"
                        : "border-lightgray bg-white shadow-sm hover:-translate-y-0.5 hover:border-majorgreen/40 hover:shadow-lg"
                    }`}
                  >
                    {option.route === "sales-agent" && (
                      <Image
                        src={star}
                        width={120}
                        height={120}
                        alt=""
                        aria-hidden="true"
                        className="absolute right-2 top-1 w-10"
                      />
                    )}

                    <div className="relative z-10">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <span
                            className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                              isActive
                                ? "bg-lightorange"
                                : "border-2 border-majorgreen bg-white"
                            }`}
                          >
                            {isActive && (
                              <span className="h-2.5 w-2.5 rounded-full bg-white" />
                            )}
                          </span>

                          <div>
                            <p
                              className={`text-xl font-extrabold ${
                                isActive
                                  ? "text-black"
                                  : "text-black"
                              }`}
                            >
                              {option.title}
                            </p>

                            <span
                              className={`mt-1 block text-sm font-semibold ${
                                isActive
                                  ? "text-black/80"
                                  : "text-majorgreen"
                              }`}
                            >
                              {option.desc}
                            </span>
                          </div>
                        </div>

                        <ArrowRight
                          size={20}
                          className={`mt-1 shrink-0 transition-transform ${
                            isActive
                              ? "translate-x-1 text-black"
                              : "text-majorgray group-hover:translate-x-1"
                          }`}
                        />
                      </div>

                      {/* <div
                        className={`mt-5 rounded-2xl p-4 ${
                          isActive
                            ? "bg-white/35"
                            : "bg-superlightgreen"
                        }`}
                      >
                        <div className="flex items-end justify-between gap-3">
                          <div>
                            <p
                              className={`text-xs font-bold uppercase tracking-wider ${
                                isActive
                                  ? "text-black/65"
                                  : "text-majorgray"
                              }`}
                            >
                              Monthly fee
                            </p>

                            <p className="mt-1 text-2xl font-extrabold text-black">
                              {formatNaira(option.amount)}
                            </p>
                          </div>

                          <span
                            className={`pb-1 text-xs font-semibold ${
                              isActive
                                ? "text-black/70"
                                : "text-majorgray"
                            }`}
                          >
                            {option.freqPay}
                          </span>
                        </div>
                      </div> */}

                      <div className="mt-4 space-y-2">
                        {option.features.map((feature) => (
                          <div
                            key={feature}
                            className="flex items-start gap-2 text-sm"
                          >
                            <span
                              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                                isActive
                                  ? "bg-lightorange"
                                  : "bg-superlightgreen"
                              }`}
                            >
                              <Check
                                size={12}
                                strokeWidth={3}
                                className="text-majorgreen"
                              />
                            </span>

                            <span
                              className={
                                isActive
                                  ? "text-black/80"
                                  : "text-majorgray"
                              }
                            >
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {selectionError && (
              <div
                role="alert"
                className="mt-4 rounded-2xl border border-majororange/20 bg-majororange/10 px-4 py-3 text-sm font-semibold text-black"
              >
                {selectionError}
              </div>
            )}
          </section>

          {/* Selected role summary */}
          <div
            className={`mt-5 w-full overflow-hidden transition-all duration-300 ${
              selectedOption
                ? "max-h-40 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            {selectedOption && (
              <div className="rounded-3xl border border-majorgreen/10 bg-superlightgreen p-4 sm:p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-majorgreen">
                      Your selection
                    </p>

                    <p className="mt-1 text-lg font-extrabold text-black">
                      {selectedOption.title}
                    </p>

                    <p className="mt-1 text-sm text-majorgray">
                      {selectedOption.desc}
                    </p>
                  </div>

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-majorgreen text-white">
                    <Check size={20} strokeWidth={3} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer actions */}
          <section className="mt-8 w-full">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                text={navigating ? "LOADING..." : "APPLY NOW"}
                className="w-full p-4 font-extrabold tracking-wide sm:flex-1"
                onClick={handleSelection}
              />

              <Link
                href="/login"
                className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-majorgreen px-6 font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:opacity-95 hover:shadow-xl sm:w-auto sm:min-w-[150px]"
                aria-label="Go to login page"
              >
                <span>Login</span>
                <KeyRound size={20} strokeWidth={1.8} />
              </Link>
            </div>

            <div className="mt-5 flex flex-col items-center justify-center gap-2 text-center sm:flex-row">
              <ShieldCheck
                size={15}
                className="text-majorgreen"
              />

              <p className="text-xs leading-5 text-majorgray">
                Your application details are collected securely and reviewed
                before approval.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}