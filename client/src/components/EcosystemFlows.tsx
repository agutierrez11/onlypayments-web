import React from "react";
import { motion } from "framer-motion";
import { Play, ArrowRight, ArrowDown, ArrowLeft } from "lucide-react";

export function EcosystemFlows() {
  // Animación para las flechas (pulso secuencial)
  const pulseVariant = {
    initial: { opacity: 0.2, scale: 0.8 },
    animate: (custom: number) => ({
      opacity: [0.2, 1, 0.2],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        delay: custom * 0.2,
        ease: "easeInOut"
      }
    })
  };

  return (
    <section className="relative w-full py-24 bg-background overflow-hidden flex flex-col items-center justify-center min-h-[900px]">
      
      {/* Background Gradients (SaaS Aesthetic) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:60px_60px]" />

      <div className="text-center mb-16 relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2 text-white">
          CÓMO FUNCIONAN
        </h2>
        <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
          LAS PLATAFORMAS DE PAGOS
        </h3>
      </div>

      {/* Grid Container 2x2 */}
      <div className="relative w-full max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 px-6">
        
        {/* Block 1: Orquestador (Top Left) */}
        <div className="relative group bg-[#0d0f12] border border-white/10 rounded-3xl p-8 hover:border-primary/50 transition-colors shadow-2xl z-10 flex flex-col justify-between h-[280px]">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="flex items-center gap-6 mb-8 relative z-10">
            {/* Logos simulados con texto estilizado */}
            <span className="text-2xl font-black tracking-tighter text-[#e83e8c]">yuno</span>
            <span className="text-xl font-bold tracking-tight text-white">deuna!</span>
          </div>
          
          <div className="relative z-10">
            <h4 className="text-xl font-bold text-white mb-3">Orquestador</h4>
            <p className="text-sm text-white/50 leading-relaxed font-light">
              El orquestador valida, tokeniza y enruta el pago al adquirente; reintenta si es necesario para maximizar la aprobación.
            </p>
          </div>
        </div>

        {/* Flechas Top (Orquestador -> Adquirente) */}
        <div className="hidden md:flex absolute top-[140px] left-[50%] -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-1 z-0 w-16">
          {[0, 1, 2].map((i) => (
            <motion.div key={`top-${i}`} custom={i} variants={pulseVariant} initial="initial" animate="animate">
              <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-pink-500 border-b-[8px] border-b-transparent" />
            </motion.div>
          ))}
        </div>

        {/* Block 2: Adquirente (Top Right) */}
        <div className="relative group bg-[#0d0f12] border border-white/10 rounded-3xl p-8 hover:border-emerald-500/50 transition-colors shadow-2xl z-10 flex flex-col justify-between h-[280px]">
          <div className="absolute inset-0 bg-gradient-to-bl from-emerald-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="flex items-center gap-6 mb-8 relative z-10">
            <span className="text-xl font-bold text-white">checkout.com</span>
            <span className="text-xl font-bold text-[#635bff]">stripe</span>
            <span className="text-xl font-bold text-[#0abf53]">adyen</span>
          </div>
          
          <div className="relative z-10">
            <h4 className="text-xl font-bold text-white mb-3">Adquirente</h4>
            <p className="text-sm text-white/50 leading-relaxed font-light">
              Envía la solicitud de pago al esquema de tarjetas y procesa los fondos con el banco del comercio.
            </p>
          </div>
        </div>

        {/* Flechas Right (Adquirente -> Esquema) */}
        <div className="hidden md:flex absolute top-[50%] right-[25%] md:right-[22%] -translate-y-1/2 translate-x-1/2 flex-col items-center justify-center gap-1 z-0 h-16">
          {[0, 1, 2].map((i) => (
            <motion.div key={`right-${i}`} custom={i} variants={pulseVariant} initial="initial" animate="animate">
              <div className="w-0 h-0 border-l-[8px] border-l-transparent border-t-[12px] border-t-emerald-500 border-r-[8px] border-r-transparent" />
            </motion.div>
          ))}
        </div>

        {/* Block 4: Emisor (Bottom Left) */}
        <div className="relative group bg-[#0d0f12] border border-white/10 rounded-3xl p-8 hover:border-blue-500/50 transition-colors shadow-2xl z-10 flex flex-col justify-between h-[280px] order-last md:order-3">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="flex items-center gap-6 mb-8 relative z-10">
            <span className="text-xl font-bold text-[#d71e28]">WELLS FARGO</span>
            <span className="text-2xl font-bold text-[#003b70]">citi</span>
            <span className="text-xl font-bold text-[#117aca]">CHASE</span>
          </div>
          
          <div className="relative z-10">
            <h4 className="text-xl font-bold text-white mb-3">Emisor</h4>
            <p className="text-sm text-white/50 leading-relaxed font-light">
              Verifica fondos, evalúa el riesgo de fraude de su cliente, y finalmente aprueba o rechaza la transacción.
            </p>
          </div>
        </div>

        {/* Flechas Bottom (Esquema -> Emisor) */}
        <div className="hidden md:flex absolute bottom-[140px] left-[50%] -translate-x-1/2 translate-y-1/2 items-center justify-center gap-1 z-0 w-16">
          {[2, 1, 0].map((i) => (
            <motion.div key={`bottom-${i}`} custom={i} variants={pulseVariant} initial="initial" animate="animate">
              <div className="w-0 h-0 border-t-[8px] border-t-transparent border-r-[12px] border-r-blue-500 border-b-[8px] border-b-transparent" />
            </motion.div>
          ))}
        </div>

        {/* Flechas Left (Emisor -> Orquestador) - Completando el ciclo (opcional) */}
        <div className="hidden md:flex absolute top-[50%] left-[25%] md:left-[22%] -translate-y-1/2 -translate-x-1/2 flex-col items-center justify-center gap-1 z-0 h-16">
          {[2, 1, 0].map((i) => (
            <motion.div key={`left-${i}`} custom={i} variants={pulseVariant} initial="initial" animate="animate">
              <div className="w-0 h-0 border-l-[8px] border-l-transparent border-b-[12px] border-b-purple-500 border-r-[8px] border-r-transparent" />
            </motion.div>
          ))}
        </div>

        {/* Block 3: Esquema (Bottom Right) */}
        <div className="relative group bg-[#0d0f12] border border-white/10 rounded-3xl p-8 hover:border-orange-500/50 transition-colors shadow-2xl z-10 flex flex-col justify-between h-[280px] order-3 md:order-last">
          <div className="absolute inset-0 bg-gradient-to-tl from-orange-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="flex items-center gap-6 mb-8 relative z-10">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-[#eb001b] opacity-90 mix-blend-multiply" />
              <div className="w-8 h-8 rounded-full bg-[#f79e1b] opacity-90 mix-blend-multiply" />
            </div>
            <span className="text-2xl font-black italic text-[#1a1f71]">VISA</span>
            <span className="text-sm font-bold text-[#006fcf]">AMEX</span>
          </div>
          
          <div className="relative z-10">
            <h4 className="text-xl font-bold text-white mb-3">Esquema</h4>
            <p className="text-sm text-white/50 leading-relaxed font-light">
              Valida el pago, estandariza la comunicación (ISO 8583) y proporciona la infraestructura de red global.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
