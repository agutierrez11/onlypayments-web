import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronRight, Activity, Mail, ArrowRight, ShieldAlert, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const QUIZ_STEPS = [
  {
    id: "challenge",
    question: "¿Cuál es el principal reto actual en tu stack de pagos?",
    options: [
      { id: "fraud", label: "Altas tasas de fraude y contracargos", icon: ShieldAlert },
      { id: "approval", label: "Bajas tasas de aprobación (Falsos positivos)", icon: Activity },
      { id: "recon", label: "Conciliación manual y cierres lentos", icon: Zap },
    ]
  },
  {
    id: "volume",
    question: "¿Cuál es tu volumen mensual de procesamiento?",
    options: [
      { id: "v1", label: "Menos de $100k USD" },
      { id: "v2", label: "$100k - $1M USD" },
      { id: "v3", label: "Más de $1M USD" },
    ]
  },
  {
    id: "stack",
    question: "¿Cuántos proveedores de pago integran tu stack actual?",
    options: [
      { id: "s1", label: "Solo 1 (Ej. solo Stripe o Mercado Pago)" },
      { id: "s2", label: "2 a 3 proveedores" },
      { id: "s3", label: "Más de 3 (Tenemos un orquestador / Switch)" },
    ]
  }
];

export function AssessmentQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleSelectOption = (stepId: string, optionId: string) => {
    setAnswers(prev => ({ ...prev, [stepId]: optionId }));
    
    // Auto-advance after 400ms
    setTimeout(() => {
      if (currentStep < QUIZ_STEPS.length) {
        setCurrentStep(prev => prev + 1);
      }
    }, 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowResult(true);
    }, 1500);
  };

  return (
    <section className="py-24 relative overflow-hidden" id="assessment">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-primary/5 [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)]" />
      
      <div className="container max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Evalúa tu Madurez B2B
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Descubre qué tan optimizada está tu infraestructura de pagos comparada con los líderes del mercado en LATAM.
          </p>
        </div>

        <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-3xl p-6 md:p-12 shadow-2xl relative overflow-hidden min-h-[400px] flex flex-col justify-center">
          
          <AnimatePresence mode="wait">
            
            {/* Preguntas */}
            {!showResult && currentStep < QUIZ_STEPS.length && (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-2xl mx-auto"
              >
                <div className="text-sm font-mono text-primary mb-4">
                  PREGUNTA {currentStep + 1} DE {QUIZ_STEPS.length}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-8 text-foreground">
                  {QUIZ_STEPS[currentStep].question}
                </h3>
                
                <div className="space-y-3">
                  {QUIZ_STEPS[currentStep].options.map((option) => {
                    const isSelected = answers[QUIZ_STEPS[currentStep].id] === option.id;
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleSelectOption(QUIZ_STEPS[currentStep].id, option.id)}
                        className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between group ${
                          isSelected 
                            ? 'bg-primary/10 border-primary text-primary' 
                            : 'bg-background hover:bg-muted/50 border-border hover:border-primary/50 text-muted-foreground'
                        }`}
                      >
                        <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {option.label}
                        </span>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-primary bg-primary' : 'border-muted-foreground/30'
                        }`}>
                          {isSelected && <div className="w-2 h-2 bg-background rounded-full" />}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* Lead Capture */}
            {!showResult && currentStep === QUIZ_STEPS.length && (
              <motion.div
                key="capture"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-xl mx-auto text-center"
              >
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Activity className="w-8 h-8 text-primary animate-pulse" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Análisis Completado
                </h3>
                <p className="text-muted-foreground mb-8">
                  Hemos generado tu Score de Madurez. Ingresa tu correo corporativo para recibir el diagnóstico detallado y el benchmark de la industria.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="email"
                      required
                      placeholder="tu@empresa.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-background border border-border rounded-xl pl-12 pr-4 py-3 text-foreground focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="py-3 px-8 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                  >
                    {isSubmitting ? 'Procesando...' : 'Obtener Score'}
                    {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2" />}
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground mt-4 font-mono">
                  No enviamos spam. Solo inteligencia de pagos B2B pura.
                </p>
              </motion.div>
            )}

            {/* Success State */}
            {showResult && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-xl mx-auto text-center"
              >
                <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 ring-4 ring-accent/10">
                  <CheckCircle2 className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-3xl font-bold mb-4 text-foreground tracking-tight">
                  ¡Diagnóstico Generado!
                </h3>
                <div className="space-y-4 mb-8 bg-background/50 border border-border p-6 rounded-2xl text-left max-w-sm mx-auto">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                    <span>Score de madurez calculado</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                    <span>Benchmark de industria generado</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4 text-accent" />
                    <span>Reporte enviado a <strong>{email}</strong></span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground font-mono mb-8 max-w-md mx-auto">
                  *Esta es una demostración de la experiencia B2B Premium de OnlyPayments.
                </p>
                
                <Button 
                  variant="outline"
                  onClick={() => {
                    setCurrentStep(0);
                    setAnswers({});
                    setEmail("");
                    setShowResult(false);
                  }}
                  className="rounded-xl border-border hover:bg-muted"
                >
                  Realizar otra evaluación
                </Button>
              </motion.div>
            )}
            
          </AnimatePresence>

          {/* Progress Indicator */}
          {!showResult && currentStep < QUIZ_STEPS.length && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
              <motion.div 
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep) / QUIZ_STEPS.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
