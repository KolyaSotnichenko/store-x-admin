"use client";

const PaymentButton = () => {
  return (
    <a
      href="https://secure.wayforpay.com/button/bd067346e3f7d"
      className=" bg-blue-500 bg-cover w-256 h-54 rounded-md p-2 no-underline shadow-md text-center focus:outline-none transition-opacity hover:opacity-80 hover:opacity-1"
    >
      <span className="font-bold text-white text-14 leading-18 align-middle">
        Оплатити
      </span>
    </a>
  );
};

export default PaymentButton;
