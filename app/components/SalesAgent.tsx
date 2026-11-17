"use client";

import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  CheckCircle2,
  FileCheck2,
  FileText,
  ImagePlus,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  Search,
  ShieldCheck,
  Upload,
  UserRound,
  WalletCards,
  X,
} from "lucide-react";

import map from "@/app/src/images/map.png";
import profile from "@/app/src/images/profile2.png";

import { useProgress } from "../contexts/OnboardingContext";
import { Button } from "./Button";
import { FlexTextNumber } from "./FlexTextNumber";
import { ButtonSimulation } from "./ButtonSimulation";
import GoBack from "./GoBack";
import ProgressComponent from "./ProgressComponent";
import NextProgressButtonAndPreview from "./NextProgressButtonAndPreview";
import SelectionComponent from "./SelectionComponent";

import axios from "../utils/axios";
import { showToast } from "../utils/alert";

const MAX_DESCRIPTION_LENGTH = 160;
const MAX_PROFILE_SIZE = 5 * 1024 * 1024;
const MAX_DOCUMENT_SIZE = 10 * 1024 * 1024;

const inputClassName =
  "w-full rounded-2xl border border-lightgray bg-white px-4 py-3.5 text-sm text-black outline-none transition-all placeholder:text-majorgray/60 focus:border-majorgreen focus:ring-4 focus:ring-superlightgreen";

const labelClassName = "mb-2 block text-sm font-bold text-black";

const cardClassName =
  "rounded-3xl border border-lightgray bg-white p-4 shadow-sm md:p-6";

const SalesAgent = () => {
  const {
    steps,
    nextStep,
    currentIndex,
    progress,
    updateStep,
    accountTypeValue,
  } = useProgress();

  const [finished, setFinished] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [submittedAt, setSubmittedAt] = useState<string>("");
  const [active, setActive] = useState<string[]>([]);
  const [stateActive, setStateActive] = useState<string>("");
  const [referralCodeInput, setReferralCodeInput] = useState<string>("");

  const currentStep = steps?.[currentIndex];

  const profilePreview = steps?.[0]?.profile || profile;

  const interests = useMemo(() => {
    return active.filter(Boolean);
  }, [active]);

  useEffect(() => {
    setSubmittedAt(
      new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    );
  }, []);

  useEffect(() => {
    if (currentStep?.base && active.length === 0) {
      const existingInterests = (currentStep as any)?.interests;

      if (Array.isArray(existingInterests)) {
        setActive(existingInterests);
      }
    }
  }, [currentStep, active.length]);

  useEffect(() => {
    if (!stateActive && (currentStep as any)?.selectedState) {
      setStateActive((currentStep as any).selectedState);
    }
  }, [currentStep, stateActive]);

  const getFileSizeLabel = (size?: number) => {
    if (!size) return "";

    const sizeInMb = size / (1024 * 1024);
    return `${sizeInMb.toFixed(sizeInMb < 10 ? 1 : 0)} MB`;
  };

  const validateFile = (
    file: File,
    allowedTypes: string[],
    maxSize: number,
    fieldName: string
  ) => {
    const normalizedType = file.type?.toLowerCase() || "";
    const normalizedName = file.name.toLowerCase();

    const validType =
      allowedTypes.some((type) => normalizedType === type.toLowerCase()) ||
      allowedTypes.some((type) => {
        const extension = type.replace(".", "").toLowerCase();
        return normalizedName.endsWith(`.${extension}`);
      });

    if (!validType) {
      showToast("error", `${fieldName} format is not supported.`);
      return false;
    }

    if (file.size > maxSize) {
      showToast(
        "error",
        `${fieldName} must be ${maxSize / (1024 * 1024)}MB or smaller.`
      );
      return false;
    }

    return true;
  };

  const validateCurrentStep = () => {
    if (!currentStep) {
      showToast("error", "This application step is unavailable.");
      return false;
    }

    if (currentIndex === 0) {
      if (!steps?.[0]?.name?.trim()) {
        showToast("error", "Please enter your first name.");
        return false;
      }

      if (!steps?.[0]?.surname?.trim()) {
        showToast("error", "Please enter your surname.");
        return false;
      }

      if (!steps?.[0]?.email?.trim()) {
        showToast("error", "Please enter your email address.");
        return false;
      }

      if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
          steps?.[0]?.email?.trim() || ""
        )
      ) {
        showToast("error", "Please enter a valid email address.");
        return false;
      }

      if (!steps?.[0]?.password?.trim()) {
        showToast("error", "Please create a password.");
        return false;
      }

      if ((steps?.[0]?.password?.length || 0) < 6) {
        showToast("error", "Password must contain at least 6 characters.");
        return false;
      }

      if (!steps?.[0]?.profileFile) {
        showToast("error", "Please upload your profile picture.");
        return false;
      }

      if (interests.length === 0) {
        showToast("error", "Please select at least one business interest.");
        return false;
      }

      if (!stateActive) {
        showToast("error", "Please select your state.");
        return false;
      }
    }

    if (currentIndex === 1) {
      if (!currentStep.phone?.trim()) {
        showToast("error", "Please enter your phone number.");
        return false;
      }

      if (!currentStep.whatsapp?.trim()) {
        showToast("error", "Please enter your WhatsApp number.");
        return false;
      }

      if (!currentStep.cvFile) {
        showToast("error", "Please upload your CV/Resume.");
        return false;
      }

      if (!currentStep.ninFile) {
        showToast("error", "Please upload your NIN document.");
        return false;
      }
    }

    if (currentIndex === 2) {
      if (!currentStep.accountNumber?.trim()) {
        showToast("error", "Please enter your account number.");
        return false;
      }

      if (!/^\d{10}$/.test(currentStep.accountNumber.trim())) {
        showToast("error", "Account number must contain exactly 10 digits.");
        return false;
      }

      if (!currentStep.bankName?.trim()) {
        showToast("error", "Please enter your bank name.");
        return false;
      }

      // if (!accountTypeValue) {
      //   showToast("error", "Please select your account type.");
      //   return false;
      // }
      const selectedAccountType =
  accountTypeValue ||
  currentStep?.accountType;

if (!selectedAccountType) {
  showToast("error", "Please select your account type.");
  return false;
}
    }

    if (currentIndex === 3) {
      if (!steps?.[0]?.name?.trim() || !steps?.[0]?.surname?.trim()) {
        showToast("error", "Your applicant name is incomplete.");
        return false;
      }

      if (!steps?.[0]?.email?.trim()) {
        showToast("error", "Your email address is missing.");
        return false;
      }

      if (!steps?.[0]?.profileFile) {
        showToast("error", "Your profile picture is missing.");
        return false;
      }

      if (interests.length === 0) {
        showToast("error", "Please select at least one interest.");
        return false;
      }

      if (!stateActive) {
        showToast("error", "Please select your state.");
        return false;
      }

      if (!steps?.[1]?.cvFile || !steps?.[1]?.ninFile) {
        showToast("error", "Required application documents are missing.");
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (loading) return;

    const valid = validateCurrentStep();

    if (!valid) return;

    if (progress >= 100 || currentIndex === 3) {
      handleAgentRegistrationSubmit();
      return;
    }

    nextStep();
  };

  const handleProfileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const isValid = validateFile(
      file,
      ["image/jpeg", "image/jpg", "image/png", "image/webp"],
      MAX_PROFILE_SIZE,
      "Profile picture"
    );

    if (!isValid) {
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      updateStep(currentIndex, {
        profile: reader.result as string,
        profileFile: file,
      });
    };

    reader.readAsDataURL(file);
  };

  const handleDocumentUpload = (
    event: ChangeEvent<HTMLInputElement>,
    type: "cvFile" | "ninFile"
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const isCV = type === "cvFile";

    const isValid = validateFile(
      file,
      isCV
        ? [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ".pdf",
            ".doc",
            ".docx",
          ]
        : [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
            ".pdf",
            ".doc",
            ".docx",
          ],
      MAX_DOCUMENT_SIZE,
      isCV ? "CV/Resume" : "NIN document"
    );

    if (!isValid) {
      event.target.value = "";
      return;
    }

    updateStep(currentIndex, {
      [type]: file,
    });
  };

  const toggleInterest = (interestName: string) => {
    setActive((previous) => {
      const updated = previous.includes(interestName)
        ? previous.filter((item) => item !== interestName)
        : [...previous, interestName];

      updateStep(currentIndex, {
        interests: updated,
      } as any);

      return updated;
    });
  };

  const handleStateSelect = (stateName: string) => {
    setStateActive(stateName);

    updateStep(currentIndex, {
      selectedState: stateName,
    } as any);
  };

  const handleAgentRegistrationSubmit = async () => {
    if (loading) return;

    const valid = validateCurrentStep();

    if (!valid) return;

    if (!steps?.[1]?.cvFile || !steps?.[1]?.ninFile) {
      showToast("error", "Both CV and NIN files are mandatory documents.");
      return;
    }

    if (!steps?.[0]?.profileFile) {
      showToast("error", "Profile picture is required.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      // Step 1: Core text fields
      formData.append("firstName", steps?.[0]?.name?.trim() || "");
      formData.append("lastName", steps?.[0]?.surname?.trim() || "");
      formData.append(
        "description",
        steps?.[0]?.description?.trim() || ""
      );
      formData.append("state", stateActive);
      formData.append("password", steps?.[0]?.password || "");
      formData.append("email", steps?.[0]?.email?.trim() || "");
      formData.append("agentRoleType", accountTypeValue || "");

      // Step 2: Communication + referral
      formData.append("phone", steps?.[1]?.phone?.trim() || "");
      formData.append("whatsapp", steps?.[1]?.whatsapp?.trim() || "");
      formData.append("referredByCode", referralCodeInput.trim());

      // Step 3: Payment details
      formData.append("bankName", steps?.[2]?.bankName?.trim() || "");
      formData.append(
        "accountNumber",
        steps?.[2]?.accountNumber?.trim() || ""
      );
      formData.append(
        "accountName",
        `${steps?.[0]?.name || ""} ${steps?.[0]?.surname || ""}`.trim()
      );

      // Interests
      formData.append("interests", JSON.stringify(interests));

      // Binary payload
      formData.append(
        "profilePicture",
        steps?.[0]?.profileFile as File
      );
      formData.append("cv", steps?.[1]?.cvFile as File);
      formData.append("nin", steps?.[1]?.ninFile as File);

      const response = await axios.post("/agents/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201 || response.status === 200) {
        setSubmittedAt(
          new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        );

        showToast("success", "Application filed successfully.");
        setFinished(true);
      } else {
        showToast(
          "error",
          "The application could not be completed. Please try again."
        );
      }
    } catch (error: any) {
      console.error("Agent Registration Failure:", error);

      const serverMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Could not complete registration. Please check your inputs and try again.";

      showToast("error", serverMessage);
    } finally {
      setLoading(false);
    }
  };

  if (finished) {
    return (
      <div className="fixed inset-0 z-50 h-[100dvh] w-full overflow-x-hidden overflow-y-auto bg-white overscroll-contain">
        <div className="relative flex min-h-full flex-col items-center overflow-hidden bg-gradient-agent px-4 py-10 md:px-8">
          <div className="absolute left-0 top-0 h-44 w-44 rounded-full bg-lemongreen/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-majororange/10 blur-3xl" />

          <div className="relative z-10 flex w-full max-w-2xl flex-1 flex-col items-center justify-center">
            <div className="mb-8 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-majorgreen/10 bg-superlightgreen px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-majorgreen">
                <ShieldCheck size={15} />
                Application received
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-black md:text-5xl">
                Application Submitted
              </h1>

              <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-majorgray md:text-base">
                Your Sales Agent application has been successfully received.
                Our team will review your information and documents.
              </p>
            </div>

            <div className="w-full max-w-lg rounded-[2rem] border border-white/70 bg-white/95 p-6 shadow-2xl backdrop-blur md:p-8">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-5">
                  <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-white shadow-lg ring-4 ring-superlightgreen md:h-36 md:w-36">
                    <Image
                      src={profilePreview}
                      width={400}
                      height={400}
                      alt="Applicant profile"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="absolute bottom-1 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-lemongreen text-black shadow-lg">
                    <Check size={18} strokeWidth={2.5} />
                  </div>
                </div>

                <h2 className="text-xl font-extrabold text-black md:text-2xl">
                  Hello {steps?.[0]?.name || "Applicant"}{" "}
                  {steps?.[0]?.surname || ""}
                </h2>

                <p className="mt-1 flex items-center gap-2 text-sm text-majorgray">
                  <Mail size={15} />
                  {steps?.[0]?.email || "Email unavailable"}
                </p>

                <div className="mt-7 grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-superlightgreen p-4 text-center">
                    <p className="text-xs font-semibold uppercase tracking-wider text-majorgreen">
                      Status
                    </p>
                    <p className="mt-1 font-extrabold text-black">
                      Under Review
                    </p>
                  </div>

                  <div className="rounded-2xl bg-superlightgreen p-4 text-center">
                    <p className="text-xs font-semibold uppercase tracking-wider text-majorgreen">
                      Role
                    </p>
                    <p className="mt-1 font-extrabold text-black">
                      {accountTypeValue || "Agent"}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-superlightgreen p-4 text-center">
                    <p className="text-xs font-semibold uppercase tracking-wider text-majorgreen">
                      Submitted
                    </p>
                    <p className="mt-1 font-extrabold text-black">
                      {submittedAt || "Today"}
                    </p>
                  </div>
                </div>

                <div className="mt-7 flex w-full items-start gap-3 rounded-2xl border border-lightgray bg-white p-4 text-left">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-superlightgreen text-majorgreen">
                    <CheckCircle2 size={20} />
                  </div>

                  <div>
                    <p className="font-bold text-black">What happens next?</p>
                    <p className="mt-1 text-sm leading-6 text-majorgray">
                      Your details and supporting documents will be reviewed.
                      You can return to your account once your application has
                      been processed.
                    </p>
                  </div>
                </div>

                <Link href="/login" className="mt-7 w-full">
                  <Button
                    text="GO TO LOGIN"
                    className="w-full rounded-2xl p-3.5 font-bold tracking-widest"
                  />
                </Link>
              </div>
            </div>
          </div>

          <p className="relative z-10 mt-8 text-center text-xs text-majorgray/80">
            Thank you for choosing NaijaZone.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 h-[100dvh] w-full overflow-x-hidden overflow-y-auto bg-white overscroll-contain">
      <div className="mx-auto flex min-h-full w-full max-w-5xl flex-col">
        {/* Header */}
        <div className="sticky top-0 z-30 -mx-3 border-b border-lightgray/80 bg-white/95 px-3 py-3 backdrop-blur md:-mx-5 md:px-5">
          <div className="flex items-center justify-between gap-4">
            <GoBack text="Application" />

            <div className="hidden items-center gap-2 rounded-full bg-superlightgreen px-3 py-2 text-xs font-bold text-majorgreen sm:flex">
              <ShieldCheck size={14} />
              Secure application
            </div>
          </div>

          {/* Progress */}
          <div className="mt-4 overflow-hidden">
            <div className="flex items-center justify-between gap-1">
              {steps?.map((step, index) => (
                <div
                  key={index}
                  className="min-w-0 flex-1"
                  aria-current={
                    currentIndex === index ? "step" : undefined
                  }
                >
                  <ProgressComponent
                    currentIndex={currentIndex + 1}
                    step={step.tabInfo}
                    index={index + 1}
                  />
                </div>
              ))}
            </div>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-superlightgreen">
              <div
                className="h-full rounded-full bg-majorgreen transition-all duration-500"
                style={{
                  width: `${Math.min(Math.max(progress || 0, 0), 100)}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Main */}
        <main className="w-full flex-1 px-3 pb-44 pt-5 md:px-5 md:pt-8">
          {/* STEP 1 */}
          {currentIndex === 0 && (
            <div className="space-y-6">
              <div className="rounded-[2rem] bg-gradient-agent p-5 shadow-sm md:p-8">
                <div className="max-w-2xl">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-majorgreen">
                    <UserRound size={14} />
                    Personal profile
                  </div>

                  <h1 className="text-2xl font-extrabold tracking-tight text-black md:text-4xl">
                    Tell us about yourself
                  </h1>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-majorgray md:text-base">
                    Complete your profile so we can understand your experience,
                    interests, and preferred market.
                  </p>
                </div>
              </div>

              {/* Profile photo */}
              <div className={cardClassName}>
                <div className="flex flex-col items-center">
                  <label
                    htmlFor="photo"
                    className="group relative cursor-pointer"
                  >
                    <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-superlightgreen shadow-lg ring-4 ring-superlightgreen md:h-40 md:w-40">
                      <Image
                        src={
                          currentStep?.profile
                            ? currentStep.profile
                            : profile
                        }
                        width={500}
                        height={500}
                        alt={currentStep?.name || "Applicant profile"}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    <div className="absolute bottom-1 right-1 flex h-11 w-11 items-center justify-center rounded-full bg-majororange text-white shadow-lg ring-4 ring-white">
                      <ImagePlus size={20} />
                    </div>
                  </label>

                  <input
                    type="file"
                    id="photo"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    className="hidden"
                    onChange={handleProfileUpload}
                  />

                  <p className="mt-4 text-sm font-bold text-black">
                    Profile Photo
                  </p>

                  <p className="mt-1 text-center text-xs leading-5 text-majorgray">
                    JPG, PNG or WEBP · Maximum {MAX_PROFILE_SIZE / 1024 / 1024}
                    MB
                  </p>

                  {currentStep?.profileFile && (
                    <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-superlightgreen px-3 py-1.5 text-xs font-bold text-majorgreen">
                      <CheckCircle2 size={14} />
                      Photo uploaded
                    </div>
                  )}
                </div>
              </div>

              {/* Basic info */}
              <div className={cardClassName}>
                <div className="mb-5">
                  <h2 className="text-lg font-extrabold text-black md:text-xl">
                    Basic information
                  </h2>
                  <p className="mt-1 text-sm text-majorgray">
                    Enter the details we will use for your agent profile.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={labelClassName}>
                      First Name
                    </label>

                    <input
                      id="name"
                      type="text"
                      autoComplete="given-name"
                      value={currentStep?.name || ""}
                      onChange={(e) =>
                        updateStep(currentIndex, { name: e.target.value })
                      }
                      className={inputClassName}
                      placeholder="Enter your first name"
                    />
                  </div>

                  <div>
                    <label htmlFor="surname" className={labelClassName}>
                      Surname
                    </label>

                    <input
                      id="surname"
                      type="text"
                      autoComplete="family-name"
                      value={currentStep?.surname || ""}
                      onChange={(e) =>
                        updateStep(currentIndex, {
                          surname: e.target.value,
                        })
                      }
                      className={inputClassName}
                      placeholder="Enter your surname"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className={`${labelClassName} flex items-center justify-between`}
                    >
                      <span>Email Address</span>
                      <Mail size={15} className="text-majorgreen" />
                    </label>

                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={currentStep?.email || ""}
                      onChange={(e) =>
                        updateStep(currentIndex, {
                          email: e.target.value,
                        })
                      }
                      className={inputClassName}
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className={`${labelClassName} flex items-center justify-between`}
                    >
                      <span>Password</span>
                      <LockKeyhole size={15} className="text-majorgreen" />
                    </label>

                    <input
                      id="password"
                      type="password"
                      autoComplete="new-password"
                      value={currentStep?.password || ""}
                      onChange={(e) =>
                        updateStep(currentIndex, {
                          password: e.target.value,
                        })
                      }
                      className={inputClassName}
                      placeholder="Create a secure password"
                    />

                    <p className="mt-1.5 text-xs text-majorgray">
                      Minimum 6 characters.
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="description" className={labelClassName}>
                    Short Description
                  </label>

                  <textarea
                    id="description"
                    rows={4}
                    maxLength={MAX_DESCRIPTION_LENGTH}
                    value={currentStep?.description || ""}
                    onChange={(e) =>
                      updateStep(currentIndex, {
                        description: e.target.value,
                      })
                    }
                    className={`${inputClassName} resize-none`}
                    placeholder="Tell us briefly about your experience, strengths or background."
                  />

                  <div className="mt-1.5 flex justify-end text-xs text-majorgray">
                    {(currentStep?.description?.length || 0)}/
                    {MAX_DESCRIPTION_LENGTH}
                  </div>
                </div>
              </div>

              {/* Interests */}
              <div className={cardClassName}>
                <FlexTextNumber
                  className="md:text-md text-sm"
                  text="Interests"
                  desc="Which business categories do you have in mind?"
                  textNum={9}
                />

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {currentStep?.base?.map((bas: any, index: number) => {
                    const isSelected = active.includes(bas.name);

                    return (
                      <button
                        type="button"
                        key={`${bas.name}-${index}`}
                        onClick={() => toggleInterest(bas.name)}
                        className={`flex min-h-[58px] items-center justify-between rounded-2xl border p-4 text-left transition-all ${
                          isSelected
                            ? "border-majorgreen bg-superlightgreen shadow-sm"
                            : "border-lightgray bg-white hover:border-majorgreen/40 hover:bg-superlightgreen/40"
                        }`}
                        aria-pressed={isSelected}
                      >
                        <span
                          className={`text-sm font-semibold md:text-base ${
                            isSelected ? "text-majorgreen" : "text-black"
                          }`}
                        >
                          {bas.name}
                        </span>

                        <span
                          className={`flex h-7 w-7 items-center justify-center rounded-full transition-all ${
                            isSelected
                              ? "bg-majorgreen text-white"
                              : "bg-superlightgreen text-majorgreen"
                          }`}
                        >
                          {isSelected ? (
                            <Check size={15} strokeWidth={3} />
                          ) : (
                            <span className="h-1.5 w-1.5 rounded-full bg-majorgreen" />
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {interests.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {interests.map((interest) => (
                      <span
                        key={interest}
                        className="inline-flex items-center gap-1.5 rounded-full bg-superlightgreen px-3 py-1.5 text-xs font-bold text-majorgreen"
                      >
                        {interest}
                        <button
                          type="button"
                          onClick={() => toggleInterest(interest)}
                          className="rounded-full p-0.5 hover:bg-majorgreen/10"
                          aria-label={`Remove ${interest}`}
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* State */}
              <div className={cardClassName}>
                <FlexTextNumber
                  text="State"
                  desc="Available in Nigeria"
                  textNum={9}
                />

                <div className="mt-4 flex flex-wrap gap-2.5">
                  {currentStep?.state?.map((st: any, index: number) => {
                    const isSelected = stateActive === st.name;

                    return (
                      <div key={`${st.name}-${index}`}>
                        <div onClick={() => handleStateSelect(st.name)}>
                          <ButtonSimulation
                            className={`text-sm transition-all ${
                              isSelected
                                ? "bg-majorgreen text-superlightgreen shadow-md"
                                : "bg-superlightgreen text-majorgreen hover:bg-majorgreen hover:text-superlightgreen"
                            }`}
                            text={st.name}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Location visual */}
              <div className="relative min-h-[320px] overflow-hidden rounded-[2rem] border border-lightgray bg-black shadow-sm">
                <Image
                  src={map}
                  width={1400}
                  height={700}
                  alt="Map"
                  className="h-72 w-full object-cover opacity-90 md:h-80"
                />

                <div className="absolute inset-x-4 top-4 md:inset-x-6 md:top-6">
                  <div className="flex items-center gap-3 rounded-2xl bg-white/95 p-3 shadow-xl backdrop-blur">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-superlightgreen text-majorgreen">
                      <Search size={18} />
                    </div>

                    <div className="flex-1">
                      <p className="text-xs font-bold uppercase tracking-wider text-majorgray">
                        Location
                      </p>

                      <input
                        className="w-full bg-transparent text-sm font-semibold text-black outline-none placeholder:text-majorgray/60"
                        placeholder="Street information"
                        aria-label="Street information"
                      />
                    </div>

                    <MapPin size={18} className="text-majororange" />
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 rounded-full bg-black/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur md:bottom-6 md:left-6">
                  {stateActive || "Select your state"}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {currentIndex === 1 && (
            <div className="space-y-6">
              <div className="rounded-[2rem] bg-superlightgreen p-5 md:p-8">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-majorgreen">
                  <Phone size={14} />
                  Communication & documents
                </div>

                <h1 className="text-2xl font-extrabold tracking-tight text-black md:text-4xl">
                  Complete your contact details
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-majorgray md:text-base">
                  Provide reliable contact information and upload the documents
                  required for verification.
                </p>
              </div>

              <div className={cardClassName}>
                <div className="mb-5">
                  <h2 className="text-lg font-extrabold text-black md:text-xl">
                    Contact information
                  </h2>
                  <p className="mt-1 text-sm text-majorgray">
                    Make sure the numbers provided are active and reachable.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className={labelClassName}>
                      Phone Number
                    </label>

                    <input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      value={currentStep?.phone || ""}
                      onChange={(e) =>
                        updateStep(currentIndex, {
                          phone: e.target.value,
                        })
                      }
                      className={inputClassName}
                      placeholder="+234 000 000 0000"
                    />

                    <p className="mt-1.5 text-xs text-majorgray">
                      Use your active mobile number.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="whatsapp" className={labelClassName}>
                      WhatsApp Number
                    </label>

                    <input
                      id="whatsapp"
                      type="tel"
                      autoComplete="tel"
                      value={currentStep?.whatsapp || ""}
                      onChange={(e) =>
                        updateStep(currentIndex, {
                          whatsapp: e.target.value,
                        })
                      }
                      className={inputClassName}
                      placeholder="+234 000 000 0000"
                    />

                    <p className="mt-1.5 text-xs text-majorgray">
                      Preferably the number you actively use on WhatsApp.
                    </p>
                  </div>
                </div>
              </div>

              {/* Referral */}
              <div className={cardClassName}>
                <div className="mb-4">
                  <h2 className="text-lg font-extrabold text-black md:text-xl">
                    Referral
                  </h2>
                  <p className="mt-1 text-sm text-majorgray">
                    Have a referral code? Add it here.
                  </p>
                </div>

                <label htmlFor="referral" className="sr-only">
                  Referral Code
                </label>

                <input
                  type="text"
                  id="referral"
                  value={referralCodeInput}
                  onChange={(e) =>
                    setReferralCodeInput(e.target.value.toUpperCase())
                  }
                  className={inputClassName}
                  placeholder="0000XXXX"
                  autoCapitalize="characters"
                />
              </div>

              {/* Documents */}
              <div className={cardClassName}>
                <div className="mb-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-extrabold text-black md:text-xl">
                        Required documents
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-majorgray">
                        Upload clear and readable copies of your supporting
                        documents.
                      </p>
                    </div>

                    <div className="hidden rounded-xl bg-superlightgreen p-2 text-majorgreen sm:flex">
                      <ShieldCheck size={20} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label
                    htmlFor="cv"
                    className="block cursor-pointer rounded-2xl border-2 border-dashed border-lightgray p-4 transition-all hover:border-majorgreen/50 hover:bg-superlightgreen/30"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                          currentStep?.cvFile
                            ? "bg-superlightgreen text-majorgreen"
                            : "bg-majororange/10 text-majororange"
                        }`}
                      >
                        {currentStep?.cvFile ? (
                          <FileCheck2 size={22} />
                        ) : (
                          <FileText size={22} />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-black">
                          CV / Resume{" "}
                          <span className="text-red-500">*</span>
                        </p>

                        <p className="mt-1 truncate text-xs text-majorgray">
                          {currentStep?.cvFile
                            ? currentStep.cvFile.name
                            : "PDF, DOC or DOCX · Maximum 10MB"}
                        </p>
                      </div>

                      <span className="flex shrink-0 items-center gap-2 rounded-xl bg-superlightgreen px-3 py-2 text-xs font-bold text-majorgreen">
                        {currentStep?.cvFile ? (
                          <>
                            <Check size={14} />
                            Uploaded
                          </>
                        ) : (
                          <>
                            <Upload size={14} />
                            Upload
                          </>
                        )}
                      </span>
                    </div>

                    {currentStep?.cvFile && (
                      <div className="mt-3 flex items-center justify-between rounded-xl bg-superlightgreen px-3 py-2 text-xs text-majorgreen">
                        <span className="font-semibold">
                          {getFileSizeLabel(currentStep.cvFile.size)}
                        </span>

                        <span className="font-bold">
                          Ready for submission
                        </span>
                      </div>
                    )}

                    <input
                      id="cv"
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      className="hidden"
                      onChange={(e) =>
                        handleDocumentUpload(e, "cvFile")
                      }
                    />
                  </label>

                  <label
                    htmlFor="nin"
                    className="block cursor-pointer rounded-2xl border-2 border-dashed border-lightgray p-4 transition-all hover:border-majorgreen/50 hover:bg-superlightgreen/30"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                          currentStep?.ninFile
                            ? "bg-superlightgreen text-majorgreen"
                            : "bg-majororange/10 text-majororange"
                        }`}
                      >
                        {currentStep?.ninFile ? (
                          <FileCheck2 size={22} />
                        ) : (
                          <FileText size={22} />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-black">
                          NIN Document{" "}
                          <span className="text-red-500">*</span>
                        </p>

                        <p className="mt-1 truncate text-xs text-majorgray">
                          {currentStep?.ninFile
                            ? currentStep.ninFile.name
                            : "PDF, DOC, DOCX or image · Maximum 10MB"}
                        </p>
                      </div>

                      <span className="flex shrink-0 items-center gap-2 rounded-xl bg-superlightgreen px-3 py-2 text-xs font-bold text-majorgreen">
                        {currentStep?.ninFile ? (
                          <>
                            <Check size={14} />
                            Uploaded
                          </>
                        ) : (
                          <>
                            <Upload size={14} />
                            Upload
                          </>
                        )}
                      </span>
                    </div>

                    {currentStep?.ninFile && (
                      <div className="mt-3 flex items-center justify-between rounded-xl bg-superlightgreen px-3 py-2 text-xs text-majorgreen">
                        <span className="font-semibold">
                          {getFileSizeLabel(currentStep.ninFile.size)}
                        </span>

                        <span className="font-bold">
                          Ready for submission
                        </span>
                      </div>
                    )}

                    <input
                      id="nin"
                      type="file"
                      accept=".pdf,.doc,.docx,image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      className="hidden"
                      onChange={(e) =>
                        handleDocumentUpload(e, "ninFile")
                      }
                    />
                  </label>
                </div>

                <div className="mt-5 flex items-start gap-3 rounded-2xl border border-lightgray bg-superlightgreen/50 p-4">
                  <LockKeyhole
                    size={18}
                    className="mt-0.5 shrink-0 text-majorgreen"
                  />

                  <p className="text-xs leading-5 text-majorgray md:text-sm">
                    Your documents are submitted securely as part of the
                    verification process.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {currentIndex === 2 && (
            <div className="space-y-6">
              <div className="rounded-[2rem] bg-gradient-agent p-5 md:p-8">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-majorgreen">
                  <WalletCards size={14} />
                  Payment details
                </div>

                <h1 className="text-2xl font-extrabold tracking-tight text-black md:text-4xl">
                  Add your payment details
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-majorgray md:text-base">
                  Enter the bank account where your eligible agent earnings can
                  be paid.
                </p>
              </div>

              <div className={cardClassName}>
                <div className="mb-5">
                  <h2 className="text-lg font-extrabold text-black md:text-xl">
                    Bank account
                  </h2>
                  <p className="mt-1 text-sm text-majorgray">
                    Any functioning Nigerian bank account can be used.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="accountNumber"
                      className={labelClassName}
                    >
                      Account Number
                    </label>

                    <input
                      id="accountNumber"
                      type="text"
                      inputMode="numeric"
                      autoComplete="off"
                      maxLength={10}
                      value={currentStep?.accountNumber || ""}
                      onChange={(e) =>
                        updateStep(currentIndex, {
                          accountNumber: e.target.value.replace(/\D/g, ""),
                        })
                      }
                      className={inputClassName}
                      placeholder="0123456789"
                    />

                    <div className="mt-1.5 flex justify-between text-xs text-majorgray">
                      <span>Enter your 10-digit account number.</span>
                      <span>
                        {(currentStep?.accountNumber?.length || 0)}/10
                      </span>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="bankName" className={labelClassName}>
                      Bank Name
                    </label>

                    <input
                      id="bankName"
                      type="text"
                      value={currentStep?.bankName || ""}
                      onChange={(e) =>
                        updateStep(currentIndex, {
                          bankName: e.target.value,
                        })
                      }
                      className={inputClassName}
                      placeholder="e.g. GTBank, Access Bank"
                    />
                  </div>
                </div>
              </div>

              <div className={cardClassName}>
                <div className="mb-5">
                  <h2 className="text-lg font-extrabold text-black md:text-xl">
                    Account type
                  </h2>
                  <p className="mt-1 text-sm text-majorgray">
                    Choose the account type that best matches your role.
                  </p>
                </div>

                <SelectionComponent
                  headText="Account Type"
                  account={currentStep?.accountType}
                />
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-lightgray bg-superlightgreen p-4">
                <ShieldCheck
                  size={19}
                  className="mt-0.5 shrink-0 text-majorgreen"
                />

                <div>
                  <p className="text-sm font-bold text-black">
                    Double-check your payment information
                  </p>

                  <p className="mt-1 text-xs leading-5 text-majorgray md:text-sm">
                    Incorrect banking details may delay payment processing.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4 / REVIEW */}
          {currentIndex === 3 && (
            <div className="space-y-6">
              <div className="rounded-[2rem] bg-gradient-agent p-5 md:p-8">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-majorgreen">
                  <CheckCircle2 size={14} />
                  Final review
                </div>

                <h1 className="text-2xl font-extrabold tracking-tight text-black md:text-4xl">
                  Review your application
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-majorgray md:text-base">
                  Everything looks good? Review your information carefully
                  before submitting your application.
                </p>
              </div>

              {/* Applicant summary */}
              <div className={cardClassName}>
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-white bg-superlightgreen shadow-md ring-4 ring-superlightgreen">
                    <Image
                      src={profilePreview}
                      width={350}
                      height={350}
                      alt="Applicant profile"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-extrabold text-black md:text-2xl">
                        {steps?.[0]?.name || ""} {steps?.[0]?.surname || ""}
                      </h2>

                      <span className="rounded-full bg-superlightgreen px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-majorgreen">
                        {accountTypeValue || "Role"}
                      </span>
                    </div>

                    <p className="mt-1 flex items-center gap-2 text-sm text-majorgray">
                      <Mail size={15} />
                      <span className="truncate">
                        {steps?.[0]?.email || "No email provided"}
                      </span>
                    </p>

                    <p className="mt-1 flex items-center gap-2 text-sm text-majorgray">
                      <MapPin size={15} />
                      {stateActive || "No state selected"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Core details */}
              <div className={cardClassName}>
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-extrabold text-black">
                      Personal information
                    </h2>
                    <p className="mt-1 text-sm text-majorgray">
                      Your profile and contact information.
                    </p>
                  </div>

                  <div className="rounded-xl bg-superlightgreen p-2 text-majorgreen">
                    <UserRound size={18} />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <ReviewItem
                    label="Email"
                    value={steps?.[0]?.email}
                  />

                  <ReviewItem
                    label="Phone"
                    value={steps?.[1]?.phone}
                  />

                  <ReviewItem
                    label="WhatsApp"
                    value={steps?.[1]?.whatsapp}
                  />

                  <ReviewItem
                    label="State"
                    value={stateActive}
                  />

                  <ReviewItem
                    label="Role"
                    value={accountTypeValue}
                  />

                  <ReviewItem
                    label="Referral Code"
                    value={referralCodeInput || "Not provided"}
                  />
                </div>

                <div className="mt-5 rounded-2xl bg-superlightgreen p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-majorgreen">
                    Description
                  </p>

                  <p className="mt-2 text-sm leading-6 text-black">
                    {steps?.[0]?.description?.trim() ||
                      "No description provided."}
                  </p>
                </div>
              </div>

              {/* Interests */}
              <div className={cardClassName}>
                <div className="mb-4">
                  <h2 className="text-lg font-extrabold text-black">
                    Business interests
                  </h2>
                  <p className="mt-1 text-sm text-majorgray">
                    Categories selected for your profile.
                  </p>
                </div>

                {interests.length > 0 ? (
                  <div className="flex flex-wrap gap-2.5">
                    {interests.map((interest) => (
                      <span
                        key={interest}
                        className="rounded-full bg-superlightgreen px-3.5 py-2 text-xs font-bold text-majorgreen"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-majorgray">
                    No interests selected.
                  </p>
                )}
              </div>

              {/* Payment */}
              <div className={cardClassName}>
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-extrabold text-black">
                      Payment details
                    </h2>
                    <p className="mt-1 text-sm text-majorgray">
                      Bank account information.
                    </p>
                  </div>

                  <div className="rounded-xl bg-superlightgreen p-2 text-majorgreen">
                    <WalletCards size={18} />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <ReviewItem
                    label="Bank"
                    value={steps?.[2]?.bankName}
                  />

                  <ReviewItem
                    label="Account Number"
                    value={
                      steps?.[2]?.accountNumber
                        ? `••••••${steps[2].accountNumber.slice(-4)}`
                        : undefined
                    }
                  />

                  <ReviewItem
                    label="Account Name"
                    value={`${steps?.[0]?.name || ""} ${
                      steps?.[0]?.surname || ""
                    }`.trim()}
                  />

                  <ReviewItem
                    label="Account Type"
                    value={
                      accountTypeValue ||
                      (steps?.[2] as any)?.accountType ||
                      "Not selected"
                    }
                  />
                </div>
              </div>

              {/* Documents */}
              <div className={cardClassName}>
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-extrabold text-black">
                      Application documents
                    </h2>
                    <p className="mt-1 text-sm text-majorgray">
                      Required documents attached to your application.
                    </p>
                  </div>

                  <div className="rounded-xl bg-superlightgreen p-2 text-majorgreen">
                    <FileCheck2 size={18} />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <DocumentReviewCard
                    label="CV / Resume"
                    file={steps?.[1]?.cvFile}
                  />

                  <DocumentReviewCard
                    label="NIN Document"
                    file={steps?.[1]?.ninFile}
                  />
                </div>
              </div>

              {/* Security acknowledgement */}
              <div className="rounded-3xl border border-majorgreen/10 bg-superlightgreen p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-majorgreen text-white">
                    <ShieldCheck size={20} />
                  </div>

                  <div>
                    <p className="font-bold text-black">
                      Ready to submit?
                    </p>

                    <p className="mt-1 text-sm leading-6 text-majorgray">
                      Submitting this application will send your profile,
                      contact details, payment information, and supporting
                      documents to the registration system for review.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        {/* </div> */}

        </main>

        {/* Bottom Action */}
        <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-50 border-t border-lightgray bg-white/95 px-3 py-3 backdrop-blur-md md:px-6">
          <div className="pointer-events-auto mx-auto w-full max-w-5xl">
            <NextProgressButtonAndPreview
              previewTitle={
                loading ? "SUBMITTING..." : "APPLICATION DETAILS"
              }
              progress={progress}
              handleNext={handleNext}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

type ReviewItemProps = {
  label: string;
  value?: string | null
};

const ReviewItem = ({ label, value }: ReviewItemProps) => {
  return (
    <div className="rounded-2xl border border-lightgray bg-white p-4">
      <p className="text-xs font-bold uppercase tracking-wider text-majorgray">
        {label}
      </p>

      <p className="mt-1.5 break-words text-sm font-semibold text-black">
        {value?.trim() || "Not provided"}
      </p>
    </div>
  );
};

type DocumentReviewCardProps = {
  label: string;
  file?: File | null;
};

const DocumentReviewCard = ({
  label,
  file,
}: DocumentReviewCardProps) => {
  return (
    <div className="rounded-2xl border border-lightgray bg-white p-4">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${
            file
              ? "bg-superlightgreen text-majorgreen"
              : "bg-majororange/10 text-majororange"
          }`}
        >
          {file ? (
            <FileCheck2 size={20} />
          ) : (
            <FileText size={20} />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-bold text-black">{label}</p>

          <p className="mt-1 truncate text-xs text-majorgray">
            {file?.name || "Document not uploaded"}
          </p>
        </div>

        <div
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
            file
              ? "bg-majorgreen text-white"
              : "bg-majororange/10 text-majororange"
          }`}
        >
          {file ? (
            <Check size={14} strokeWidth={3} />
          ) : (
            <X size={14} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesAgent;