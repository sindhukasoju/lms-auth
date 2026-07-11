// src/pages/Subscription.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowLeft,
  Zap,
  Users,
  Award,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
} from "lucide-react";

const Subscription = () => {
  const [billingCycle, setBillingCycle] = useState("monthly"); // "monthly" or "yearly"

  const plans = [
    {
      name: "Basic",
      price: { monthly: 9, yearly: 90 },
      description: "Perfect for getting started",
      icon: <Zap className="w-8 h-8 text-violet-500" />,
      features: [
        "Access to 20+ courses",
        "Standard support",
        "Community access",
        "Course certificates",
      ],
      notIncluded: ["Live workshops", "Personal mentor", "Premium content"],
      cta: "Start Basic",
      popular: false,
    },
    {
      name: "Pro",
      price: { monthly: 29, yearly: 290 },
      description: "Best for serious learners",
      icon: <Award className="w-8 h-8 text-violet-500" />,
      features: [
        "Access to 100+ courses",
        "Priority support",
        "Community access",
        "Course certificates",
        "Live workshops",
        "Personal mentor",
      ],
      notIncluded: ["Premium content", "Enterprise tools"],
      cta: "Start Pro",
      popular: true,
    },
    {
      name: "Enterprise",
      price: { monthly: 79, yearly: 790 },
      description: "For teams and organisations",
      icon: <Users className="w-8 h-8 text-violet-500" />,
      features: [
        "Access to 200+ courses",
        "24/7 dedicated support",
        "Community access",
        "Course certificates",
        "Live workshops",
        "Personal mentor",
        "Premium content",
        "Advanced analytics",
      ],
      notIncluded: [],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  const getPrice = (plan) => {
    return billingCycle === "monthly"
      ? plan.price.monthly
      : plan.price.yearly;
  };

  const getPriceLabel = () => {
    return billingCycle === "monthly" ? "per month" : "per year";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-violet-50 pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-violet-600 transition-colors mb-8 group"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-violet-100 mb-6 shadow-lg shadow-violet-200/50">
            <Sparkles className="w-10 h-10 text-violet-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Choose Your <span className="text-violet-600">Plan</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Unlock unlimited access to premium courses, expert mentors, and
            career‑building resources.
          </p>
        </div>

        {/* Billing toggle */}
        <div className="flex justify-center items-center gap-4 mb-10">
          <span
            className={`text-sm font-medium ${
              billingCycle === "monthly" ? "text-violet-700" : "text-gray-400"
            }`}
          >
            Monthly
          </span>
          <button
            onClick={() =>
              setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")
            }
            className="relative w-14 h-8 bg-violet-200 rounded-full shadow-inner transition-colors duration-300 focus:outline-none"
          >
            <span
              className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                billingCycle === "yearly" ? "translate-x-6 bg-violet-600" : ""
              }`}
            />
          </button>
          <span
            className={`text-sm font-medium flex items-center gap-1 ${
              billingCycle === "yearly" ? "text-violet-700" : "text-gray-400"
            }`}
          >
            Yearly
            <span className="ml-1 text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-semibold">
              Save 20%
            </span>
          </span>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => {
            const price = getPrice(plan);
            const isPopular = plan.popular;
            return (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border ${
                  isPopular
                    ? "border-violet-400 scale-105 md:scale-110 shadow-violet-200/50"
                    : "border-gray-200"
                } flex flex-col`}
              >
                {isPopular && (
                  <div className="absolute top-0 left-0 right-0 bg-violet-600 text-white text-xs font-bold py-1 text-center uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <div
                  className={`p-6 ${
                    isPopular ? "pt-8" : ""
                  } flex-1 flex flex-col`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-violet-50 rounded-xl">
                      {plan.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {plan.name}
                    </h3>
                  </div>
                  <p className="text-gray-500 text-sm mb-4">
                    {plan.description}
                  </p>
                  <div className="flex items-end gap-1 mb-6">
                    <span className="text-4xl font-extrabold text-gray-900">
                      ${price}
                    </span>
                    <span className="text-gray-500 text-sm font-medium">
                      / {getPriceLabel()}
                    </span>
                  </div>
                  <ul className="space-y-2 mb-6 flex-1">
                    {plan.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-gray-600 text-sm"
                      >
                        <CheckCircle
                          size={18}
                          className="text-violet-500 flex-shrink-0 mt-0.5"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {plan.notIncluded.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-gray-400 text-sm line-through"
                      >
                        <XCircle size={18} className="text-gray-300 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                      isPopular
                        ? "bg-violet-600 text-white hover:bg-violet-700 shadow-lg shadow-violet-200"
                        : "bg-violet-50 text-violet-700 hover:bg-violet-100"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional info */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm">
            All plans include free updates, 24/7 support, and a 30‑day money‑back guarantee.
          </p>
          <p className="text-gray-400 text-xs mt-2">
            * Prices are in USD. Taxes may apply.
          </p>
        </div>

        {/* FAQ or extra section (optional) */}
        <div className="mt-20 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            Frequently Asked Questions
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-gray-600">
            <div>
              <h4 className="font-medium text-gray-800 flex items-center gap-2">
                <Clock size={18} className="text-violet-500" />
                Can I switch plans later?
              </h4>
              <p className="text-sm mt-1">
                Yes, you can upgrade or downgrade your plan at any time.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 flex items-center gap-2">
                <Calendar size={18} className="text-violet-500" />
                Is there a free trial?
              </h4>
              <p className="text-sm mt-1">
                Absolutely! All plans include a 7‑day free trial.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;