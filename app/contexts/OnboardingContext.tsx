// 'use client'
// import { useParams } from 'next/navigation';
// import React, { useContext, Provider, createContext, useState, ReactNode } from 'react'

// interface base {
//     name: string;
// }

// interface state {
//     name: string;
// }

// interface bank {
//     name: string;
// }

// interface accountType {
//     name: string
// }

// interface role {
//     name: string;
// }

// interface details {
//     accountType: string;
//     role: role[];
// }

// interface IntegrationStep {
//     profile?: string;
//     name?: string;
//     tabInfo?: string;
//     surname?: string; 
//     description?: string; 
//     street?: string;
//     base?: base[];
//     state?: state[];
//     phone?: string | null;
//     whatsapp?: string | null;
//     email?: string;
//     password?:string;
//     code?: string | number | null;
//     accountNumber?: string | null;
//     bank?: bank[];
//     accountType?: accountType[];
//     details?: details[];
//     bankName: string;
//     profileFile: string;
//     cvFile: string;
//     ninFile: string;

// }

// interface ProgressContextType {
//     steps: IntegrationStep[];
//     currentIndex: number;
//     setAccountTypeValue: (account: string) => void;
//     accountTypeValue: string;
//     progress: number; 
//     nextStep: () => void;
//     updateStep: (index: number, newData: Partial<IntegrationStep>) => void
//     resetProgress: () => void;
// }

// const ProviderContext = createContext<ProgressContextType | undefined>(undefined)

// interface Prop {
//     children: ReactNode
// }

// export const OnboardingContext = ({children}: Prop) => {
//     const [accountTypeValue, setAccountTypeValue] = useState<string>(() => {
//         if(typeof window !== "undefined") {
//             return localStorage.getItem("selectedRole") || ""
//         }
//         return ""
//     })
//     const defaultEmail = '';
//     const {role} = useParams()
//     const saveRole = (val: string) => {
//         setAccountTypeValue(val);
//         if(typeof window !== "undefined") {
//             return localStorage.setItem("selectedRole", val);
//         }
//     }
//     const [steps, setSteps] = useState<IntegrationStep[]>([
//         {
//             profile: '',
//             name: '', 
//             surname: '',
//             tabInfo: "Personal Info",
//             description: '',
//             bankName: '',
//             base: [
//                 {
//                     name: "Service-based Business",
//                 },
//                 {
//                     name: "Product-bsed Business",
//                 },
//                 {
//                     name: "General Retail"
//                 }
//             ], 
//             state: [
//                 {name: "RIVERS"}, 
//                 {name: "LAGOS"},
//             ]
//         },
//         {
//             tabInfo: "Contact Info",
//             phone: null, 
//             whatsapp: null, 
//             email: defaultEmail, 
//             bankName: '',
//         },
//         {
//             tabInfo: "Payment Info",
//             accountNumber: null, 
//             bankName: '',
//             bank: [
//                 {name: "Zenith"},
//                 {name: "Eco"},
//                 {name: "Access"},
//                 {name: "Opay"},
//             ], 
//             accountType: [
//                 {name: "Savings"},
//                 {name: "Current"},
//             ]
//         }, 
//         {
//             tabInfo: "Preview",
//             bankName: '',
//         }]
//     )
//     const [currentIndex, setCurrentIndex] = useState(0)
    
//     const updateStep = (index: number, newData: Partial<IntegrationStep>) => {
//         setSteps((prevStep) => {
//             const updated = [...prevStep];
//             updated[index] = {...updated[index], ...newData};
//             return updated
//         })
//     }
    
//     const nextStep = () => {
//         if(currentIndex < steps.length - 1) {
//             setCurrentIndex((prev) => prev + 1)
//         }
//     }
//     const progress = ((currentIndex + 1) / steps.length) * 100;
    
//     const resetProgress = () => setCurrentIndex(0)
//   return (
//     <ProviderContext.Provider value={{ steps, setAccountTypeValue: saveRole, accountTypeValue, updateStep, currentIndex, progress, nextStep, resetProgress}}>
//         {children}
//     </ProviderContext.Provider>
//   )
// }

// export const useProgress = () => {
//     const context = useContext(ProviderContext);
//     if(!context) throw new Error("useProgress must be within a progressProvider");
//     return context
// }
'use client'
import { useParams } from 'next/navigation';
import React, { useContext, createContext, useState, ReactNode } from 'react'

interface base {
    name: string;
}

interface state {
    name: string;
}

interface bank {
    name: string;
}

interface accountType {
    name: string
}

interface role {
    name: string;
}

interface details {
    accountType: string;
    role: role[];
}

interface IntegrationStep {
    profile?: string; // For the Base64 UI Image Preview
    profileFile?: File | null; // For the actual Binary Backend Upload
    cvFile?: File | null;      // For the actual Binary Backend Upload
    ninFile?: File | null;     // For the actual Binary Backend Upload
    name?: string;
    tabInfo?: string;
    surname?: string; 
    description?: string; 
    street?: string;
    base?: base[];
    state?: state[];
    phone?: string | null;
    whatsapp?: string | null;
    email?: string;
    password?:string;
    code?: string | number | null;
    accountNumber?: string | null;
    bank?: bank[];
    accountType?: accountType[];
    details?: details[];
    bankName: string;
}

interface ProgressContextType {
    steps: IntegrationStep[];
    currentIndex: number;
    setAccountTypeValue: (account: string) => void;
    accountTypeValue: string;
    progress: number; 
    nextStep: () => void;
    updateStep: (index: number, newData: Partial<IntegrationStep>) => void
    resetProgress: () => void;
}

const ProviderContext = createContext<ProgressContextType | undefined>(undefined)

interface Prop {
    children: ReactNode
}

export const OnboardingContext = ({children}: Prop) => {
    const [accountTypeValue, setAccountTypeValue] = useState<string>(() => {
        if(typeof window !== "undefined") {
            return localStorage.getItem("selectedRole") || ""
        }
        return ""
    })
    const defaultEmail = '';
    const {role} = useParams()
    
    const saveRole = (val: string) => {
        setAccountTypeValue(val);
        if(typeof window !== "undefined") {
            return localStorage.setItem("selectedRole", val);
        }
    }

    const [steps, setSteps] = useState<IntegrationStep[]>([
        {
            profile: '',
            profileFile: null,
            name: '', 
            surname: '',
            tabInfo: "Personal Info",
            description: '',
            bankName: '',
            base: [
                { name: "Service-based Business" },
                { name: "Product-based Business" },
                { name: "General Retail" }
            ], 
            state: [
                {name: "RIVERS"}, 
                {name: "LAGOS"},
            ]
        },
        {
            tabInfo: "Contact Info",
            phone: null, 
            whatsapp: null, 
            email: defaultEmail, 
            cvFile: null,
            ninFile: null,
            bankName: '',
        },
        {
            tabInfo: "Payment Info",
            accountNumber: null, 
            bankName: '',
            bank: [
                {name: "Zenith"},
                {name: "Eco"},
                {name: "Access"},
                {name: "Opay"},
            ], 
            accountType: [
                {name: "Savings"},
                {name: "Current"},
            ]
        }, 
        {
            tabInfo: "Preview",
            bankName: '',
        }]
    )
    const [currentIndex, setCurrentIndex] = useState(0)
    
    const updateStep = (index: number, newData: Partial<IntegrationStep>) => {
        setSteps((prevStep) => {
            const updated = [...prevStep];
            updated[index] = {...updated[index], ...newData};
            return updated
        })
    }
    
    const nextStep = () => {
        if(currentIndex < steps.length - 1) {
            setCurrentIndex((prev) => prev + 1)
        }
    }
    
    const progress = ((currentIndex + 1) / steps.length) * 100;
    
    const resetProgress = () => setCurrentIndex(0)

  return (
    <ProviderContext.Provider value={{ steps, setAccountTypeValue: saveRole, accountTypeValue, updateStep, currentIndex, progress, nextStep, resetProgress}}>
        {children}
    </ProviderContext.Provider>
  )
}

export const useProgress = () => {
    const context = useContext(ProviderContext);
    if(!context) throw new Error("useProgress must be within a progressProvider");
    return context
}