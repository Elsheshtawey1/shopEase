import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "../style/faq.css";

const faqs = [
  {
    question: "How can I track my order?",
    answer: "Once your order is shipped, you’ll receive an email with the tracking number and a link to track it.",
  },
  {
    question: "What is your return policy?",
    answer: "You can return any item within 14 days of receiving it. Please check our Return Policy page for more.",
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to most countries. Shipping fees and times may vary depending on the destination.",
  },
  {
    question: "Can I change or cancel my order?",
    answer: "You can request changes within 1 hour after placing the order. Please contact our support ASAP.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept Visa, MasterCard, PayPal, and Cash on Delivery (in selected regions).",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h1>Frequently Asked Questions</h1>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className={`faq-item ${openIndex === index ? "open" : ""}`}>
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              <span>{faq.question}</span>
              {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {openIndex === index && (
              <div className="faq-answer ">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
