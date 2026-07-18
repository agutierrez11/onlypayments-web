import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, Pause, AlertCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PAYMENT_SCENARIOS } from "../config/paymentFlowsConfig";

export function EcosystemFlows() {
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const currentScenario = PAYMENT_SCENARIOS[activeScenarioIdx];

  // Auto-play logic for steps
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setActiveStepIdx((current) => (current + 1) % currentScenario.steps.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isPlaying, currentScenario.steps.length, activeScenarioIdx]);

  const handleScenarioChange = (idx: number) => {
    setActiveScenarioIdx(idx);
    setActiveStepIdx(0);
    setIsPlaying(true);
  };

  return (
    <section className="relative w-full max-w-[1200px] mx-auto px-6 py-24 z-10">
      
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold font-mono uppercase tracking-widest mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          Simulador Multiescenario
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">Anatomía de las Transacciones</h2>
        <p className="text-muted-foreground font-light text-lg max-w-2xl mx-auto">
          Comprende la ruta del dinero en tiempo real. Desde un pago con tarjeta hasta la orquestación inteligente de <strong className="text-foreground">8b</strong>.
        </p>
      </div>

      {/* Tabs / Scenarios */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {PAYMENT_SCENARIOS.map((scenario, idx) => {
          const Icon = scenario.icon;
          const isActive = activeScenarioIdx === idx;
          return (
            <button
              key={scenario.id}
              onClick={() => handleScenarioChange(idx)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 border ${
                isActive 
                  ? 'bg-accent/10 border-accent text-foreground shadow-[0_0_20px_rgba(var(--accent),0.2)] scale-105' 
                  : 'bg-background/50 border-border text-muted-foreground hover:bg-secondary/50 hover:border-foreground/20 hover:text-foreground'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-accent' : ''}`} />
              {scenario.name}
            </button>
          )
        })}
      </div>

      {/* Description of Scenario */}
      <div className="text-center mb-10 max-w-xl mx-auto h-12">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentScenario.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-muted-foreground font-medium"
          >
            {currentScenario.description}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Main Glassmorphic Simulator Box */}
      <div className="w-full bg-card/40 backdrop-blur-2xl rounded-[2.5rem] border border-border shadow-2xl overflow-hidden relative ring-1 ring-white/5">
        
        {/* Background Grid & Glows */}
        <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-accent/10 blur-[120px] rounded-full pointer-events-none" />
        
        {/* Progress Bar Top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-border/50">
          <motion.div 
            className="h-full bg-accent"
            initial={{ width: "0%" }}
            animate={{ width: `${((activeStepIdx + 1) / currentScenario.steps.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>

        <div className="p-8 md:p-16 relative z-10">
          
          {/* Timeline Nodes */}
          <div className="flex justify-between items-center mb-16 relative">
            {/* Animated Connection Line Background */}
            <div className="absolute left-8 right-8 h-1 bg-border top-1/2 -translate-y-1/2 z-0 hidden md:block rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-accent"
                initial={{ width: "0%" }}
                animate={{ width: `${((activeStepIdx) / (currentScenario.steps.length - 1)) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
            
            {currentScenario.steps.map((step, idx) => {
              const StepIcon = step.icon;
              const isActive = idx === activeStepIdx;
              const isPast = idx <= activeStepIdx;

              return (
                <div key={step.id} className="relative z-10 flex flex-col items-center gap-4">
                  <button 
                    onClick={() => {
                      setActiveStepIdx(idx);
                      setIsPlaying(false);
                    }}
                    className={`w-14 h-14 md:w-20 md:h-20 rounded-2xl flex items-center justify-center transition-all duration-500 border-2 relative overflow-hidden group ${
                      isActive 
                        ? 'bg-accent/20 border-accent shadow-[0_0_40px_rgba(var(--accent),0.4)] scale-110 z-20' 
                        : isPast 
                          ? 'bg-card border-accent/50 text-accent' 
                          : 'bg-background border-border text-muted-foreground hover:border-foreground/30'
                    }`}
                  >
                    {isActive && (
                      <motion.div 
                        layoutId="active-glow"
                        className="absolute inset-0 bg-accent/10 rounded-2xl"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <StepIcon className={`w-6 h-6 md:w-8 md:h-8 relative z-10 transition-colors ${isActive ? 'text-accent' : ''}`} />
                  </button>
                  <div className={`text-xs md:text-sm font-bold transition-colors ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {step.name}
                  </div>
                  <div className={`text-[10px] hidden md:block font-mono bg-background px-2 py-1 rounded border border-border ${isActive ? 'text-accent border-accent/30' : 'text-muted-foreground'}`}>
                    {step.latency}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Active Step Details */}
          <div className="bg-background/60 backdrop-blur-xl border border-border rounded-3xl p-8 md:p-12 min-h-[220px] flex flex-col justify-center relative overflow-hidden shadow-inner">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-accent/5 blur-[100px] rounded-full pointer-events-none" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentScenario.id}-${activeStepIdx}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid md:grid-cols-3 gap-8 items-center relative z-10"
              >
                <div className="md:col-span-2 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-md bg-secondary text-muted-foreground text-xs font-mono font-bold tracking-wider">
                      PASO {activeStepIdx + 1}/{currentScenario.steps.length}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-accent/10 border border-accent/20 text-accent text-xs font-mono font-bold tracking-wider">
                      {currentScenario.steps[activeStepIdx].protocol}
                    </span>
                  </div>
                  <h3 className="text-3xl font-extrabold text-foreground tracking-tight">
                    {currentScenario.steps[activeStepIdx].label}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed font-light">
                    {currentScenario.steps[activeStepIdx].desc}
                  </p>
                </div>
                
                <div className="flex justify-start md:justify-end">
                   <div className="relative w-32 h-32">
                     <div className="absolute inset-0 rounded-full border-4 border-dashed border-accent/30 animate-[spin_10s_linear_infinite]" />
                     <div className="absolute inset-2 rounded-full border-2 border-accent/10" />
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center shadow-[0_0_30px_rgba(var(--accent),0.2)] rotate-3">
                          {React.createElement(currentScenario.steps[activeStepIdx].icon, { className: "w-10 h-10 text-accent animate-pulse" })}
                        </div>
                     </div>
                   </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-8 flex justify-between items-center bg-background/50 p-4 rounded-2xl border border-border">
            <Button 
              variant="outline" 
              size="sm"
              className="bg-transparent border-border text-foreground hover:bg-secondary hover:text-foreground font-semibold"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <><Pause className="w-4 h-4 mr-2" /> Pausar Simulación</>
              ) : (
                <><Play className="w-4 h-4 mr-2" /> Reanudar Simulación</>
              )}
            </Button>
            
            <div className="text-muted-foreground text-sm font-mono flex items-center gap-2">
              <span className="hidden sm:inline">Latencia Acumulada:</span> 
              <span className="text-accent font-bold px-3 py-1 bg-accent/10 rounded-md border border-accent/20">
                {currentScenario.steps[activeStepIdx].latency}
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
