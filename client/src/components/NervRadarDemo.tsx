import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, Zap, ShieldCheck, CheckCircle2, Share2, Target } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NervRadarDemo() {
  const [step, setStep] = useState<"idle" | "searching" | "found">("idle");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company || !role) return;
    setStep("searching");

    // Simulate the search delay
    setTimeout(() => {
      setStep("found");
    }, 3500);
  };

  const reset = () => {
    setStep("idle");
    setCompany("");
    setRole("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 lg:p-8 bg-zinc-950 rounded-2xl border border-zinc-800 shadow-2xl relative overflow-hidden my-24">
      {/* Background Radar Effect */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 flex items-center justify-center">
        <div className="w-[600px] h-[600px] border border-zinc-700 rounded-full animate-ping [animation-duration:4s]" />
        <div className="absolute w-[400px] h-[400px] border border-zinc-600 rounded-full animate-ping [animation-duration:3s]" />
      </div>

      <div className="relative z-10 text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs font-mono text-zinc-400 mb-4">
          <ShieldCheck className="w-3 h-3 text-emerald-500" />
          <span>Motor de Grafos Anónimos Activo (Soberanía de Datos)</span>
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight">
          Nerv Matchmaking Engine
        </h2>
        <p className="text-zinc-400 text-sm max-w-xl mx-auto">
          Simulación del Enjambre de Búsqueda. Ingresa una empresa y un rol para ver cómo Nerv localiza al conector ideal en milisegundos.
        </p>
      </div>

      <div className="relative bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 p-6 rounded-xl">
        <AnimatePresence mode="wait">
          {step === "idle" && (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={handleSearch}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-mono text-zinc-400">Target Company</label>
                  <div className="relative">
                    <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <Input
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Ej. Rappi, Kushki, Nu..."
                      className="pl-9 bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 font-mono"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-mono text-zinc-400">Target Role</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <Input
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="Ej. CFO, Head of Payments..."
                      className="pl-9 bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 font-mono"
                    />
                  </div>
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-white text-black hover:bg-zinc-200 h-12 text-lg font-medium"
                disabled={!company || !role}
              >
                Lanzar Enjambre Nerv <Zap className="ml-2 w-4 h-4" />
              </Button>
            </motion.form>
          )}

          {step === "searching" && (
            <motion.div
              key="searching"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-12 flex flex-col items-center justify-center space-y-6"
            >
              <div className="relative">
                <Loader2 className="w-16 h-16 text-zinc-400 animate-spin" />
                <div className="absolute inset-0 border-t-2 border-white rounded-full animate-spin [animation-duration:2s]" />
              </div>
              
              <div className="space-y-2 text-center font-mono">
                <p className="text-white text-lg">Resolviendo Grafo de Conexiones...</p>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-zinc-500 text-xs space-y-1"
                >
                  <p>{`> Generando SHA-256 ( ${company}_${role} )`}</p>
                  <p>{`> Escaneando pg_trgm índices GIN...`}</p>
                  <p>{`> Calculando score RLHF de conectores...`}</p>
                </motion.div>
              </div>
            </motion.div>
          )}

          {step === "found" && (
            <motion.div
              key="found"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-zinc-950 border border-emerald-900/50 rounded-xl p-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/20">
                  <CheckCircle2 className="w-3 h-3" /> MATCH_FOUND
                </span>
              </div>
              
              <div className="flex flex-col md:flex-row gap-8 items-start mt-4">
                {/* Conector (El intermediario) */}
                <div className="flex-1 space-y-4">
                  <h3 className="text-sm font-mono text-zinc-500">Conector Ideal (Cercanía 1)</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center border border-zinc-700">
                      <Share2 className="w-5 h-5 text-zinc-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Usuario Anónimo #883</p>
                      <p className="text-zinc-400 text-sm">Reputación: 4.9/5.0 (Nivel Trust)</p>
                    </div>
                  </div>
                  <div className="bg-zinc-900 p-3 rounded-lg border border-zinc-800 text-sm text-zinc-300">
                    <p>Este usuario tiene a un <span className="text-white font-semibold">{role}</span> de <span className="text-white font-semibold">{company}</span> en su red directa verificada.</p>
                  </div>
                </div>

                {/* Acción de Split Payment */}
                <div className="flex-1 space-y-4">
                  <h3 className="text-sm font-mono text-zinc-500">Simulación Financiera (Stripe Split)</h3>
                  <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 space-y-3 font-mono text-xs">
                    <div className="flex justify-between items-center text-zinc-400">
                      <span>Costo Intro B2B:</span>
                      <span className="text-white">$150.00 USD</span>
                    </div>
                    <div className="h-px w-full bg-zinc-800" />
                    <div className="flex justify-between items-center text-emerald-500/80">
                      <span>{`->`} Payout Conector (70%):</span>
                      <span>+$105.00 USD</span>
                    </div>
                    <div className="flex justify-between items-center text-emerald-500/80">
                      <span>{`->`} Payout Admin Grupo (10%):</span>
                      <span>+$15.00 USD</span>
                    </div>
                    <div className="flex justify-between items-center text-zinc-500">
                      <span>{`->`} Fee Infraestructura (20%):</span>
                      <span>+$30.00 USD</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={reset}
                    variant="outline"
                    className="w-full bg-transparent border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800"
                  >
                    Nueva Búsqueda
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
