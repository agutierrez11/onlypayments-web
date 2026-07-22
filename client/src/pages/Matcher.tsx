import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function Matcher() {
  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <div className="border-b border-slate-200 bg-white/95 backdrop-blur-md px-6 py-3 flex items-center justify-between z-50 shadow-xs">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2 text-slate-700 hover:text-slate-900 font-bold border border-slate-300 cursor-pointer">
            <ArrowLeft className="w-4 h-4 text-cyan-600" />
            Volver al inicio
          </Button>
        </Link>
        <span className="font-extrabold text-slate-900 text-lg tracking-tight">Fintech Matcher AI</span>
      </div>
      <iframe
        src="/fintech-matcher.html?v=3"
        title="Fintech Matcher — OnlyPayments"
        className="w-full flex-1 border-0 block"
        allow="clipboard-write"
      />
    </div>
  );
}
