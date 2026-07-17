import React, { useRef } from "react";
import { ArrowRight, Lock, CreditCard, ShieldCheck, Fingerprint, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function HeroParallax({
  onExplore,
  onRemittances,
  onCommunity
}: {
  onExplore: () => void;
  onRemittances: () => void;
  onCommunity: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Referencias para las 3 capas del "Exploded View"
  const layerFrontRef = useRef<HTMLDivElement>(null);
  const layerMiddleRef = useRef<HTMLDivElement>(null);
  const layerBackRef = useRef<HTMLDivElement>(null);
  
  // Referencias para los fondos
  const bgFastRef = useRef<HTMLDivElement>(null);
  const bgSlowRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // ScrollTrigger para el fondo
    gsap.to(bgFastRef.current, {
      y: -300,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    gsap.to(bgSlowRef.current, {
      y: 150,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // 1. Capa Frontal (Velocidad rápida) - Checkout
    gsap.to(layerFrontRef.current, {
      y: -500,
      rotationX: 15,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // 2. Capa Intermedia (Velocidad normal) - Antifraude
    gsap.to(layerMiddleRef.current, {
      y: -250,
      rotationY: 10,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // 3. Capa de Fondo (Lenta) - Bancos/Adquirentes
    gsap.to(layerBackRef.current, {
      y: -100,
      opacity: 0.2,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Fade out del texto principal al hacer scroll
    gsap.to(".hero-content", {
      y: 100,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "center top",
        scrub: true
      }
    });

    // Animación de entrada inicial
    gsap.from(".hero-content > *", {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out"
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative z-10 overflow-hidden py-32 lg:py-48 min-h-[100vh] flex items-center justify-center bg-[#050608]">
      
      {/* Background Animated Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          ref={bgFastRef}
          className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] opacity-60 mix-blend-screen"
        />
        <div
          ref={bgSlowRef}
          className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[120px] opacity-60 mix-blend-screen"
        />
        {/* Grid pattern para dar look de ingeniería */}
        <div className="absolute inset-0 opacity-[0.2] [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      {/* Exploded View Parallax (Gráficos Flotantes 3D) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden perspective-[1200px]">
        
        {/* Capa de Fondo (Adquirentes / Core Bancario) */}
        <div 
          ref={layerBackRef}
          className="absolute top-[20%] left-[5%] right-[5%] flex justify-between items-center opacity-40 transform-style-3d"
        >
          <div className="w-48 h-32 rounded-xl border border-white/5 bg-white/[0.01] backdrop-blur-sm shadow-2xl flex items-center justify-center grayscale">
             <div className="text-white/30 font-mono text-xl font-bold tracking-widest">BANCO 01</div>
          </div>
          <div className="w-40 h-28 rounded-xl border border-white/5 bg-white/[0.01] backdrop-blur-sm shadow-2xl flex flex-col items-center justify-center grayscale gap-2">
             <RefreshCcw className="w-8 h-8 text-white/30" />
             <div className="text-white/30 font-mono text-xs">Switch Central</div>
          </div>
          <div className="w-48 h-32 rounded-xl border border-white/5 bg-white/[0.01] backdrop-blur-sm shadow-2xl flex items-center justify-center grayscale">
             <div className="text-white/30 font-mono text-xl font-bold tracking-widest">BANCO 02</div>
          </div>
        </div>

        {/* Capa Intermedia (Motor Antifraude / Risk Engine) */}
        <div 
          ref={layerMiddleRef}
          className="absolute top-[35%] left-[25%] right-[25%] flex justify-around items-center transform-style-3d"
        >
          <div className="w-64 h-40 rounded-xl border border-accent/30 bg-accent/10 backdrop-blur-md shadow-2xl flex flex-col items-center justify-center gap-3">
             <Fingerprint className="w-10 h-10 text-accent" />
             <div className="text-accent font-mono text-xs tracking-widest uppercase">Motor Anti-Fraude</div>
             <div className="flex gap-2">
               <div className="h-1 w-12 bg-accent/40 rounded-full" />
               <div className="h-1 w-8 bg-accent/40 rounded-full" />
             </div>
          </div>
          <div className="w-32 h-32 rounded-full border border-white/20 bg-white/5 backdrop-blur-md shadow-2xl flex items-center justify-center">
             <Lock className="w-10 h-10 text-white/70" />
          </div>
        </div>

        {/* Capa Frontal (Checkout Visual / Pasarela) */}
        <div 
          ref={layerFrontRef}
          className="absolute top-[60%] left-[40%] right-[40%] flex justify-center transform-style-3d"
        >
          <div className="w-80 h-56 rounded-xl border border-primary/40 bg-background/80 backdrop-blur-xl shadow-[0_0_50px_rgba(var(--primary),0.2)] flex flex-col p-6 gap-4">
             <div className="flex items-center gap-3 mb-2">
               <ShieldCheck className="w-6 h-6 text-primary" />
               <div className="text-sm font-bold text-foreground">Checkout Seguro</div>
             </div>
             <div className="space-y-3">
               <div className="h-10 w-full bg-secondary/50 rounded-lg border border-border" />
               <div className="grid grid-cols-2 gap-3">
                 <div className="h-10 w-full bg-secondary/50 rounded-lg border border-border" />
                 <div className="h-10 w-full bg-secondary/50 rounded-lg border border-border" />
               </div>
             </div>
             <div className="mt-auto h-12 w-full bg-primary/90 text-primary-foreground font-bold rounded-lg flex items-center justify-center uppercase text-sm tracking-widest shadow-lg">
               Pagar $1,500.00
             </div>
          </div>
        </div>

      </div>

      {/* Main Content */}
      <div className="hero-content container max-w-5xl text-center space-y-8 z-10 relative mt-20">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-secondary/80 backdrop-blur-md border border-border/50 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-accent animate-ping"></span>
          <span className="text-xs font-semibold tracking-wide uppercase text-foreground font-mono">Motor de Inteligencia de Pagos</span>
        </div>
        
        <h1 className="text-6xl sm:text-8xl font-extrabold tracking-tight leading-[1]">
          El Ecosistema <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-300% animate-gradient">
            Desnudo
          </span>
        </h1>
        
        <p className="text-lg sm:text-2xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
          Diseña tu infraestructura técnica. Simula costos. Conecta con proveedores reales.
          El Hub B2B definitivo para LATAM.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Button 
            size="lg" 
            onClick={onExplore}
            className="w-full sm:w-auto gap-2 bg-primary text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:scale-[1.02] hover:bg-primary/90 transition-all duration-300 rounded-xl h-14 px-8 text-base font-bold"
          >
            Construir mi Stack <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
