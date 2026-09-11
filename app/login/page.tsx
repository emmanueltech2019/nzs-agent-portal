// 'use client'
// import React, { useEffect, useState, useRef } from 'react'
// import GlobalContainer from '../components/GlobalContainer'
// import { useProgress } from '../contexts/OnboardingContext'
// import FlexComponent from '../components/FlexComponent'
// import { ChevronLeft } from 'lucide-react'
// import GoBack from '../components/GoBack'
// import InputComponent from '../components/InputComponent'
// import ProgressBar from '../components/ProgressBar'
// import { Button } from '../components/Button'
// import Link from 'next/link'

// const page = () => {
//     const [activeNumber, setActiveNumber] = useState(1);
//     const number = [{id: 1, name: "Sign Up Mail",}, {id: 2, name: "Input Password"}]
//     const [timer, setTimer] = useState(0)
//     const [emailValue, setEmailValue] = useState("")
//     const [code, setCode] = useState<(number[])>(new Array(4).fill(null))

//     const inputRefs = useRef<(HTMLInputElement | null)[]>([])

//     useEffect(() => {
//         if(activeNumber > 1) return
//        const timeout = setTimeout(() => {
//         setTimer(prev => prev + 1)
//        }, 1000) 

//        return () => clearTimeout(timeout)
//     }, [timer])

//     const handleNextInput = (value: any, index: any) => {
//         if(isNaN(value)) return
//         const newCode = [...code];
//         newCode[index] = value.slice(-1);
//         setCode(newCode);

//         if(value && index < code.length -1) {
//             inputRefs.current[index + 1]?.focus()
//         }
//     }
//     const handleNext = () => {
//         setActiveNumber(prev => prev < number.length ? prev + 1 : prev)
//     }
//     const handlePrevInput = (value: string, index: number ) => {
//         if(value === "Backspace" && !code[index] && index > 0) {
//             inputRefs.current[index - 1]?.focus()
//         } 
//     }
//   return (
//     <GlobalContainer className='py-5 bg-white h-screen overflow-y-scroll flex flex-col gap-10'>
//         <GoBack text='Login' />
//         <div className="flex justify-between">
//             {number.map((num) =>( 
//                 <div key={num.id} className="flex flex-col gap-3 items-center">
//                     <div className={`w-6 h-6 rounded-full flex justify-center items-center ${activeNumber === num.id ? "bg-majorgreen text-white" : "bg-lightgray text-majorgray"}`}>
//                         {num.id}
//                     </div>
//                     <p className='text-sm font-bold'>{num.name}</p>
//                 </div>
//             ))}
//         </div>
//         {activeNumber === 1 ? (
//             <div className='flex flex-col gap-10'>
//                 <div className="flex flex-col gap-3">
//                     <p className="font-extrabold text-lg">Provide your Sign Up Email</p>
//                     <span className="text-majorgray">Use only the mail you created your Naijazone Sales Agent account with...</span>
//                 </div>
//                 <InputComponent handleChange={(e) => setEmailValue(e.target.value)} value={emailValue} inputPlaceholder='someone@gmail.com' inputType='text' />
//                 <FlexComponent>
//                     <div className="bg-lightgray rounded-lg p-1 text-sm">GET CODE</div>
//                     <div className="flex justify-center items-center relative">
//                         <ProgressBar size='w-20' progress={timer} />
//                         <p className="absolute">{timer}</p>
//                     </div>
//                 </FlexComponent>
//                 <div className="flex flex-col items-center gap-5">
//                     <div className="flex flex-col gap-3 items-center">
//                         <p className="font-extrabold text-xl">Enter confirmation code</p>
//                         <span className='text-majorgray text-sm text-center'>A 4-digit code was sent to {emailValue.includes("com") ? emailValue : 'someone@gmail.com'}</span>
//                     </div>
//                     <div className="flex gap-2">
//                         {code.map((co, index) => (
//                             <InputComponent handleKeyDown={(e) => handlePrevInput(e.key, index)} key={index} handleChange={(e) => handleNextInput(e.target.value, index)} ref={(el) => {if(el)inputRefs.current[index] = el}} inputType='text' inputPlaceholder='' className='text-center' value={co} />
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         ) : (
//             <div className="flex flex-col gap-10 justify-between mb-auto">
//                 <div className="flex flex-col gap-3">
//                     <p className="text-xl font-extrabold">Please type in your Password</p>
//                     <span className="text-majorgray">Use only the password you created your Naijazone account with...</span>
//                 </div>
//                 <InputComponent inputType='password' inputPlaceholder='*********' />
//             </div>
//         )}
//         {activeNumber === 2 ? (
//             <Link href={"/welcome"}>
//                 <Button onClick={handleNext} text='CONFIRM' className='tracking-widest w-full p-3' />
//             </Link>
//         ) : (
//             <Button onClick={handleNext} text='NEXT' className='tracking-widest w-full p-3' />
//         )}
//     </GlobalContainer>
//   )
// }

// export default page
// 'use client'

// import React, { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import GlobalContainer from '../components/GlobalContainer'
// import GoBack from '../components/GoBack'
// import InputComponent from '../components/InputComponent'
// import { Button } from '../components/Button'
// import axios from '../utils/axios'

// const LoginPage = () => {
//     const router = useRouter()
    
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [isLoading, setIsLoading] = useState(false)
//     const [error, setError] = useState('')

//     const handleLogin = async (e: React.FormEvent) => {
//         e.preventDefault() // Prevents default form submission reload
//         setError('')
        
//         if (!email || !password) {
//             return setError('Please enter both email and password.')
//         }

//         setIsLoading(true)

//         try {
//             const response = await axios.post('/agents/login', {
//                 email,
//                 password
//             }, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 }
//             })
//             console.log(response)

//             // Store authentication data
//             // Note: For MVP, localStorage works, but see the security note below for production.
//             localStorage.setItem('token', response.data.token)
//             localStorage.setItem('user', JSON.stringify(response.data.agent.id))
//             // alert(response.data.agent.referralCode)
//             localStorage.setItem('agentId', response.data.agent.referralCode)

//             // Redirect based on successful login
//             // You can adjust this path based on where the agent dashboard lives
//             if (response.data.agent.role === 'Sales Agent') {
//                 router.push('/sales-agent-dashboard/vendor')
//             } else if (response.data.agent.role === 'Sales Coordinator') {
//                 router.push('/sales-coordinator-dashboard/brands')
//             } 
            
//         } catch (err: any) {
            
//             setError(err.message || 'A network error occurred. Please try again later.')
//         } finally {
//             setIsLoading(false)
//         }
//     }

//     return (
//         <GlobalContainer className="py-5 bg-white h-screen overflow-y-scroll flex flex-col gap-10">
//             <GoBack text="Login" />
            
//             <div className="flex flex-col gap-3">
//                 <h1 className="font-extrabold text-2xl">Welcome Back</h1>
//                 <p className="text-majorgray">
//                     Enter your credentials to access your agent dashboard.
//                 </p>
//             </div>

//             {/* Using a form element enables "Enter" key submission naturally */}
//             <form onSubmit={handleLogin} className="flex flex-col gap-8 mb-auto">
//                 {error && (
//                     <div className="p-3 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm font-medium">
//                         {error}
//                     </div>
//                 )}

//                 <div className="flex flex-col gap-6">
//                     <div className="flex flex-col gap-2">
//                         <label className="text-sm font-bold text-gray-700">Email Address</label>
//                         <InputComponent 
//                             inputType="email" 
//                             inputPlaceholder="agent@naijazone.com" 
//                             value={email}
//                             handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
//                         />
//                     </div>

//                     <div className="flex flex-col gap-2">
//                         <label className="text-sm font-bold text-gray-700">Password</label>
//                         <InputComponent 
//                             inputType="password" 
//                             inputPlaceholder="********" 
//                             value={password}
//                             handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
//                         />
//                     </div>
//                 </div>

//                 <Button 
//                     text={isLoading ? 'AUTHENTICATING...' : 'LOGIN'} 
//                     className={`tracking-widest w-full p-4 mt-4 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
//                     disabled={isLoading}
//                     type="submit"
//                 />
//             </form>
//         </GlobalContainer>
//     )
// }

// export default LoginPage
'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import GlobalContainer from '../components/GlobalContainer'
import GoBack from '../components/GoBack'
import InputComponent from '../components/InputComponent'
import { Button } from '../components/Button'
import axios from '../utils/axios'

const LoginPage = () => {
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (isLoading) return

        setError('')

        const trimmedEmail = email.trim()

        if (!trimmedEmail || !password) {
            setError('Please enter both email and password.')
            return
        }

        setIsLoading(true)

        try {
            const response = await axios.post(
                '/agents/login',
                {
                    email: trimmedEmail,
                    password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )

            console.log(response)

            // Store authentication data
            localStorage.setItem('token', response.data.token)
            localStorage.setItem(
                'user',
                JSON.stringify(response.data.agent.id)
            )
            localStorage.setItem(
                'agentId',
                response.data.agent.referralCode
            )

            // Redirect based on role
            if (response.data.agent.role === 'Sales Agent') {
                router.push('/sales-agent-dashboard/vendor')
            } else if (
                response.data.agent.role === 'Sales Coordinator'
            ) {
                router.push('/sales-coordinator-dashboard/brands')
            } else {
                setError(
                    'Your account role is not configured for dashboard access.'
                )
            }
        } catch (err: any) {
            const message =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                err?.message ||
                'A network error occurred. Please try again later.'

            setError(message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <GlobalContainer className="min-h-screen overflow-y-auto bg-white">
            <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-6 sm:px-6 sm:py-8">
                {/* Back Navigation */}
                <div className="mb-10">
                    <GoBack text="Login" />
                </div>

                {/* Header */}
                <div className="mb-8">
                    <div className="mb-4 inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1">
                        <span className="mr-2 h-2 w-2 rounded-full bg-green-500" />
                        <span className="text-xs font-semibold tracking-wide text-gray-600">
                            SECURE AGENT ACCESS
                        </span>
                    </div>

                    <h1 className="text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">
                        Welcome Back
                    </h1>

                    <p className="mt-3 max-w-sm text-sm leading-6 text-majorgray sm:text-base">
                        Enter your credentials to securely access your agent
                        dashboard.
                    </p>
                </div>

                {/* Login Card */}
                <div className="rounded-2xl border border-gray-100 bg-white p-1 shadow-sm">
                    <form
                        onSubmit={handleLogin}
                        className="flex flex-col gap-7 rounded-xl p-4 sm:p-5"
                    >
                        {/* Error Message */}
                        {error && (
                            <div
                                role="alert"
                                aria-live="polite"
                                className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600"
                            >
                                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-red-300 text-xs font-bold">
                                    !
                                </div>

                                <p className="leading-5 font-medium">
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* Inputs */}
                        <div className="flex flex-col gap-6">
                            {/* Email */}
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="email"
                                    className="text-sm font-bold text-gray-700"
                                >
                                    Email Address
                                </label>

                                <InputComponent
                                    inputType="email"
                                    inputPlaceholder="agent@naijazone.com"
                                    value={email}
                                    handleChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setEmail(e.target.value)

                                        if (error) {
                                            setError('')
                                        }
                                    }}
                                />
                            </div>

                            {/* Password */}
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="password"
                                    className="text-sm font-bold text-gray-700"
                                >
                                    Password
                                </label>

                                <div className="relative">
                                    <InputComponent
                                        inputType={
                                            showPassword
                                                ? 'text'
                                                : 'password'
                                        }
                                        inputPlaceholder="********"
                                        value={password}
                                        handleChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => {
                                            setPassword(e.target.value)

                                            if (error) {
                                                setError('')
                                            }
                                        }}
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword((prev) => !prev)
                                        }
                                        aria-label={
                                            showPassword
                                                ? 'Hide password'
                                                : 'Show password'
                                        }
                                        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-semibold text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                    >
                                        {showPassword ? 'HIDE' : 'SHOW'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Login Button */}
                        <Button
                            text={
                                isLoading
                                    ? 'AUTHENTICATING...'
                                    : 'LOGIN'
                            }
                            className={`mt-1 w-full p-4 tracking-widest transition-all duration-200 ${
                                isLoading
                                    ? 'cursor-not-allowed opacity-70'
                                    : 'hover:opacity-95'
                            }`}
                            disabled={isLoading}
                            type="submit"
                        />

                        {/* Security Note */}
                        <div className="flex items-center justify-center gap-2 pt-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                className="h-4 w-4 text-gray-400"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9.5 12l1.7 1.7 3.5-3.7"
                                />
                            </svg>

                            <p className="text-center text-xs text-gray-400">
                                Your credentials are securely processed.
                            </p>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="mt-auto pt-8">
                    <p className="text-center text-xs leading-5 text-gray-400">
                        Authorized agent access only.
                    </p>
                </div>
            </div>
        </GlobalContainer>
    )
}

export default LoginPage