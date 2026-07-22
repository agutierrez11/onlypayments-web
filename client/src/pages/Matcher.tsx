import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function Matcher() {
  return (
    <div className="w-full min-h-screen bg-[#020408] text-white flex flex-col">
      <div className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-md px-6 py-3 flex items-center justify-between z-50">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2 text-cyan-400 hover:text-cyan-300 hover:bg-slate-900 border border-cyan-500/30">
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Button>
        </Link>
        <span className="font-extrabold text-white text-lg tracking-tight">Fintech Matcher AI</span>
      </div>
      <iframe
        src="/fintech-matcher.html"
        title="Fintech Matcher — OnlyPayments"
        className="w-full flex-1 border-0 block"
        allow="clipboard-write"
      />
    </div>
  );
}
