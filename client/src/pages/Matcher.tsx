import React from 'react';

export default function Matcher() {
  return (
    <div className="w-full min-h-screen bg-[#020408] text-white">
      <iframe
        src="/fintech-matcher.html"
        title="Fintech Matcher — OnlyPayments"
        className="w-full h-screen border-0 block"
        allow="clipboard-write"
      />
    </div>
  );
}
