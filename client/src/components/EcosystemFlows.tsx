import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, Pause, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PAYMENT_SCENARIOS } from "../data/paymentFlowsConfig";

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
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isPlaying, currentScenario.steps.length, activeScenarioIdx]);

  const handleScenarioChange = (idx: number) => {
    setActiveScenarioIdx(idx);
    setActiveStepIdx(0);
    setIsPlaying(true);
  };

  return (
    <section className="relative w-full max-w-[1200px] mx-auto px-6 py-24 bg-background">
      
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <AlertCircle className="w-4 h-4" />
          Simulador Multiescenario
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Anatomía de las Transacciones</h2>
        <p className="text-muted-foreground font-light text-lg max-w-2xl mx-auto">
          Comprende la ruta del dinero en tiempo real. Desde un pago con tarjeta hasta la orquestación inteligente de <strong className="text-foreground">8b</strong>.
        </p>
      </div>

      {/* Tabs / Scenarios */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {PAYMENT_SCENARIOS.map((scenario, idx) => {
          const Icon = scenario.icon;
          return (
            <button
              key={scenario.id}
              onClick={() => handleScenarioChange(idx)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeScenarioIdx === idx 
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105' 
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted'
              }`}
            >
              <Icon className="w-4 h-4" />
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
            className="text-muted-foreground"
          >
            {currentScenario.description}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Main Black Box Simulator */}
      <div className="w-full bg-[#0a0a0c] rounded-3xl border border-white/10 shadow-2xl overflow-hidden relative">
        
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:40px_40px]" />
        
        {/* Progress Bar Top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/5">
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: `${((activeStepIdx + 1) / currentScenario.steps.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="p-6 md:p-12 relative z-10">
          
          {/* Timeline Nodes */}
          <div className="flex justify-between items-center mb-16 relative">
            {/* Connection Line */}
            <div className="absolute left-0 right-0 h-0.5 bg-white/10 top-1/2 -translate-y-1/2 z-0 hidden md:block" />
            
            {currentScenario.steps.map((step, idx) => {
              const StepIcon = step.icon;
              const isActive = idx === activeStepIdx;
              const isPast = idx < activeStepIdx;

              return (
                <div key={step.id} className="relative z-10 flex flex-col items-center gap-3">
                  <button 
                    onClick={() => {
                      setActiveStepIdx(idx);
                      setIsPlaying(false);
                    }}
                    className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-all duration-500 border ${
                      isActive 
                        ? 'bg-primary border-primary shadow-[0_0_30px_rgba(var(--primary),0.5)] scale-110' 
                        : isPast 
                          ? 'bg-white/10 border-white/20 text-white/50' 
                          : 'bg-[#111113] border-white/5 text-white/30 hover:border-white/20'
                    }`}
                  >
                    <StepIcon className={`w-6 h-6 md:w-8 md:h-8 ${isActive ? 'text-primary-foreground' : ''}`} />
                  </button>
                  <div className={`text-xs md:text-sm font-bold transition-colors ${isActive ? 'text-white' : 'text-white/30'}`}>
                    {step.name}
                  </div>
                  <div className={`text-[10px] hidden md:block ${isActive ? 'text-primary' : 'text-white/20'}`}>
                    {step.latency}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Active Step Details */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 min-h-[200px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentScenario.id}-${activeStepIdx}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-3 gap-8 items-center"
              >
                <div className="md:col-span-2">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2 py-1 rounded bg-white/10 text-white/70 text-xs font-mono">
                      STEP {activeStepIdx + 1}/{currentScenario.steps.length}
                    </span>
                    <span className="px-2 py-1 rounded bg-primary/20 text-primary text-xs font-mono">
                      {currentScenario.steps[activeStepIdx].protocol}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {currentScenario.steps[activeStepIdx].label}
                  </h3>
                  <p className="text-white/60 text-lg leading-relaxed">
                    {currentScenario.steps[activeStepIdx].desc}
                  </p>
                </div>
                
                <div className="flex justify-start md:justify-end">
                   <div className="w-24 h-24 rounded-full border-4 border-primary/20 border-t-primary animate-spin flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        {React.createElement(currentScenario.steps[activeStepIdx].icon, { className: "w-8 h-8 text-primary animate-pulse" })}
                      </div>
                   </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-8 flex justify-between items-center">
            <Button 
              variant="outline" 
              size="sm"
              className="bg-transparent border-white/20 text-white hover:bg-white/10"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <><Pause className="w-4 h-4 mr-2" /> Pausar Simulación</>
              ) : (
                <><Play className="w-4 h-4 mr-2" /> Reanudar Simulación</>
              )}
            </Button>
            
            <div className="text-white/40 text-sm font-mono">
              Latencia Acumulada: <span className="text-white font-bold">{currentScenario.steps[activeStepIdx].latency}</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
