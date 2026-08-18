import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Send, 
  X, 
  Bot, 
  User, 
  Layers, 
  ArrowRight, 
  ShieldCheck, 
  DollarSign, 
  Globe2, 
  CheckCircle2, 
  Zap, 
  ChevronRight,
  CreditCard,
  Building2,
  ExternalLink,
  RotateCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";

// Base de datos de conocimiento verificado de pasarelas y rieles LATAM
const VERIFIED_GATEWAYS = [
  {
    name: "Stripe",
    countries: ["México", "Brasil"],
    avgMdr: "3.56% + $3.00 MXN",
    payout: "T+2 / T+7",
    rollingReserve: "0% - 5%",
    a2aSupport: ["SPEI (MX)", "Pix (BR)"],
    bestFor: "Startups, SaaS globales, e-commerce con checkout custom",
    crossBorder: "Excelente",
    link: "https://stripe.com"
  },
  {
    name: "dLocal",
    countries: ["México", "Brasil", "Colombia", "Argentina", "Chile", "Perú", "+15"],
    avgMdr: "2.67% - 3.40%",
    payout: "T+1 / T+3",
    rollingReserve: "5% - 10%",
    a2aSupport: ["Pix (BR)", "SPEI (MX)", "PSE (CO)", "Transfiya (CO)", "Transferencias 3.0 (AR)"],
    bestFor: "Empresas globales cobrando con métodos locales en toda LATAM",
    crossBorder: "Líder regional (One dLocal API)",
    link: "https://dlocal.com"
  },
  {
    name: "Kushki",
    countries: ["México", "Colombia", "Chile", "Perú", "Ecuador"],
    avgMdr: "2.80% - 3.26%",
    payout: "T+1 / T+2",
    rollingReserve: "0% - 5%",
    a2aSupport: ["PSE (CO)", "SPEI (MX)", "Khipu (CL)", "PagoEfectivo (PE)"],
    bestFor: "Enterprise adquirencia directa regional y pagos recurrentes",
    crossBorder: "Fuerte en la región Andina y México",
    link: "https://kushkipagos.com"
  },
  {
    name: "Mercado Pago",
    countries: ["México", "Brasil", "Argentina", "Colombia", "Chile", "Uruguay", "Perú"],
    avgMdr: "3.15% - 3.33%",
    payout: "Inmediato a T+2",
    rollingReserve: "0%",
    a2aSupport: ["Pix (BR)", "SPEI (MX)", "Debin / CVU (AR)", "PSE (CO)"],
    bestFor: "Comercios retail, marketplace y omnicanalidad con terminales Point",
    crossBorder: "Local en cada país",
    link: "https://mercadopago.com"
  },
  {
    name: "Clip",
    countries: ["México"],
    avgMdr: "3.59% + IVA",
    payout: "Diario (24h) incluso fines de semana",
    rollingReserve: "0%",
    a2aSupport: ["CoDi", "Tarjetas débito/crédito", "Links de pago"],
    bestFor: "Pymes, comercios físicos, restaurantes y liquidación instantánea",
    crossBorder: "Acepta tarjetas internacionales en punto físico",
    link: "https://clip.mx"
  }
];

type GenerativeCardType = "comparison" | "recommendation" | "b2b_intro" | null;

interface MessageItem {
  id: string;
  sender: "user" | "copilot";
  text: string;
  generativeCard?: {
    type: GenerativeCardType;
    data?: any;
  };
}

export function PaymentCopilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [, navigate] = useLocation();
  const [inputQuery, setInputQuery] = useState("");
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: "welcome-1",
      sender: "copilot",
      text: "¡Hola! Soy tu **Copiloto de Inteligencia de Pagos OnlyPayments**. Puedo comparar pasarelas en tiempo real, analizar comisiones de adquirencia, recomendarte el stack óptimo para LATAM y conectarte con decisores clave de la industria.",
      generativeCard: {
        type: "recommendation",
        data: {
          title: "Guía Rápida de Rieles LATAM 2026",
          rails: [
            { country: "Brasil", rail: "Pix", volume: ">90% penetración A2A", cost: "0.2% - 0.7%" },
            { country: "México", rail: "SPEI / CoDi", volume: "Crecimiento 35% YoY", cost: "$0.05 - $3.50 MXN" },
            { country: "Colombia", rail: "PSE / Transfiya", volume: "Riel líder e-commerce", cost: "0.8% - 1.5%" }
          ]
        }
      }
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query) return;

    const userMsg: MessageItem = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: query
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery("");

    // Lógica generativa de procesamiento semántico
    setTimeout(() => {
      processAgentResponse(query);
    }, 600);
  };

  const processAgentResponse = (query: string) => {
    const q = query.toLowerCase();

    if (q.includes("compar") || q.includes("stripe") || q.includes("dlocal") || q.includes("clip") || q.includes("kushki") || q.includes("tasa") || q.includes("comision")) {
      const copilotMsg: MessageItem = {
        id: `bot-${Date.now()}`,
        sender: "copilot",
        text: "He analizado las **tasas de descuento (MDR), tiempos de dispersión y soporte A2A** de las principales pasarelas verificadas en la base de datos de OnlyPayments:",
        generativeCard: {
          type: "comparison",
          data: {
            gateways: VERIFIED_GATEWAYS
          }
        }
      };
      setMessages(prev => [...prev, copilotMsg]);
    } else if (q.includes("intro") || q.includes("contacto") || q.includes("hablar") || q.includes("conectar") || q.includes("b2b") || q.includes("cfo")) {
      const copilotMsg: MessageItem = {
        id: `bot-${Date.now()}`,
        sender: "copilot",
        text: "OnlyPayments opera el **Marketplace Pay-per-Intro ($150 USD)** donde conectamos de forma privada y verificada a proveedores con directores de pagos y CFOs.",
        generativeCard: {
          type: "b2b_intro",
          data: {
            fee: "$150 USD",
            split: "70% Conector ($105) · 15% Comunidad ($22.50) · 15% OnlyPayments ($22.50)",
            target: "CFOs, Heads de Pagos y CTOs en Rappi, Kavak, Nubank, Mercado Libre y Clip"
          }
        }
      };
      setMessages(prev => [...prev, copilotMsg]);
    } else if (
      q.includes("clima") || 
      q.includes("futbol") || 
      q.includes("receta") || 
      q.includes("musica") || 
      q.length < 3
    ) {
      // Caso Fuera de Alcance (Out-of-Scope)
      const copilotMsg: MessageItem = {
        id: `bot-${Date.now()}`,
        sender: "copilot",
        text: "Mi conocimiento está especializado estrictamente en **Infraestructura de Pagos, Adquirencia, Rieles A2A y Regulación FinTech en LATAM**. No cuento con información verificada sobre temas externos.",
        generativeCard: {
          type: "recommendation",
          data: {
            title: "¿En qué te puedo asesorar?",
            rails: [
              { country: "Pasarelas & MDR", rail: "Comparativa de comisiones", volume: "Stripe, dLocal, Clip, Kushki", cost: "Auditado" },
              { country: "Rieles A2A", rail: "Pix, SPEI, Bre-B, Yape, Plin", volume: "Integración transaccional", cost: "Tiempo real" },
              { country: "Directorio", rail: "2,659+ Fintechs en 20 Países", volume: "Filtros por vertical y estado", cost: "Oficial" }
            ]
          }
        }
      };
      setMessages(prev => [...prev, copilotMsg]);
    } else {
      // Recomendación estándar de Stack
      const copilotMsg: MessageItem = {
        id: `bot-${Date.now()}`,
        sender: "copilot",
        text: `Para tu consulta sobre *"**${query}**"*, la arquitectura estándar en LATAM combina adquirencia local con rieles instantáneos para maximizar la tasa de conversión y reducir contracargos. Si buscas un proveedor específico, puedes revisar el directorio oficial o solicitar un match B2B.`,
        generativeCard: {
          type: "recommendation",
          data: {
            title: "Stack de Pagos Recomendado",
            rails: [
              { country: "Riel Principal", rail: "Adquirencia Local Multibanco", volume: "Tasa de Aprobación > 88%", cost: "2.6% - 3.2%" },
              { country: "Riel Alternativo", rail: "A2A Instantáneo (Pix / SPEI)", volume: "Cero Contracargos", cost: "0.3% - 1.0%" },
              { country: "Orquestación", rail: "Smart Routing Anti-Fraude", volume: "Fallback automático en caídas", cost: "Tarifa SaaS plana" }
            ]
          }
        }
      };
      setMessages(prev => [...prev, copilotMsg]);
    }
  };

  const quickPrompts = [
    "Comparar Stripe vs dLocal vs Clip en comisiones",
    "¿Cómo cobrar con Pix en Brasil y SPEI en México?",
    "Quiero solicitar una Intro B2B calificada ($150 USD)"
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Botón Flotante Activo — VIBRANT LIGHT */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-3 bg-[#FFFFFF] border border-[#E5E6EA] hover:border-[#0000EE] px-4 py-3 rounded-[12px] shadow-lg transition-all duration-[0.12s] cursor-pointer text-[#000000]"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-[8px] bg-[#0000EE] flex items-center justify-center text-white">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
            </div>
            <div className="text-left">
              <p className="text-xs font-black tracking-tight text-[#000000] flex items-center gap-1.5">
                Copiloto OnlyPayments
                <span className="bg-[#E5E6EA] text-[#0000EE] text-[9px] px-1.5 py-0.2 rounded-[2px] font-mono font-bold">IA 2026</span>
              </p>
              <p className="text-[10px] text-[#8B8F9A] font-normal">Compara pasarelas y rieles en vivo</p>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Ventana Modal / Chat Flotante — VIBRANT LIGHT */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.12 }}
            className="w-[92vw] sm:w-[460px] h-[640px] max-h-[85vh] bg-[#FFFFFF] border border-[#E5E6EA] rounded-[12px] shadow-2xl flex flex-col overflow-hidden text-[#000000]"
          >
            {/* Header del Copiloto */}
            <div className="p-4 bg-[#FFFFFF] border-b border-[#E5E6EA] flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-[8px] bg-[#0000EE] flex items-center justify-center text-white font-bold">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-sm text-[#000000]">Payment Copilot</h3>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-[2px]">Verificado</span>
                  </div>
                  <p className="text-[11px] text-[#8B8F9A]">Datos auditados de bancos centrales y pasarelas</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-[6px] bg-[#F3F3F4] hover:bg-[#E5E6EA] text-[#8B8F9A] hover:text-[#000000] flex items-center justify-center transition-colors duration-[0.12s] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cuerpo de Mensajes con Scroll */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs bg-[#F3F3F4]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "copilot" && (
                    <div className="w-7 h-7 rounded-[6px] bg-[#E5E6EA] flex items-center justify-center text-[#0000EE] flex-shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div className={`max-w-[88%] space-y-3 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                    <div
                      className={`inline-block p-3.5 rounded-[12px] ${
                        msg.sender === "user"
                          ? "bg-[#0000EE] text-white"
                          : "bg-[#FFFFFF] border border-[#E5E6EA] text-[#000000] leading-relaxed shadow-xs"
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>
                    </div>

                    {/* RENDERIZADO DE GENERATIVE UI */}
                    {msg.generativeCard && (
                      <div className="space-y-2.5 pt-1">
                        {/* 1. Tarjeta Generativa: Comparación de Pasarelas */}
                        {msg.generativeCard.type === "comparison" && (
                          <div className="bg-[#FFFFFF] border border-[#E5E6EA] rounded-[12px] p-3.5 space-y-3 text-left shadow-xs">
                            <div className="flex items-center justify-between pb-2 border-b border-[#E5E6EA]">
                              <span className="font-black text-[#000000] text-xs flex items-center gap-1.5">
                                <CreditCard className="w-3.5 h-3.5 text-[#0000EE]" />
                                Comparativa de Pasarelas en Vivo
                              </span>
                              <span className="bg-[#E5E6EA] text-[#000000] text-[10px] font-bold px-1.5 py-0.5 rounded-[2px]">Tasa MDR</span>
                            </div>

                            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                              {msg.generativeCard.data.gateways.map((gw: any) => (
                                <div key={gw.name} className="p-2.5 rounded-[8px] bg-[#F3F3F4] border border-[#E5E6EA] hover:border-[#0000EE] transition-colors duration-[0.12s]">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="font-black text-[#000000] text-xs">{gw.name}</span>
                                    <span className="font-mono font-bold text-emerald-700 text-xs">{gw.avgMdr}</span>
                                  </div>
                                  <div className="grid grid-cols-2 gap-1 text-[10px] text-[#8B8F9A] mb-1.5">
                                    <span>Liquidación: <strong className="text-[#000000]">{gw.payout}</strong></span>
                                    <span>Reserva: <strong className="text-[#000000]">{gw.rollingReserve}</strong></span>
                                  </div>
                                  <p className="text-[10px] text-[#8B8F9A] italic">{gw.bestFor}</p>
                                </div>
                              ))}
                            </div>

                            <Button 
                              size="sm" 
                              onClick={() => {
                                setIsOpen(false);
                                navigate("/rankings");
                              }}
                              className="w-full bg-[#0000EE] hover:bg-[#0000BE] text-white font-bold text-xs h-8 rounded-[8px] cursor-pointer transition-colors duration-[0.12s]"
                            >
                              Ver Directorio Completo de Stacks
                              <ChevronRight className="w-3.5 h-3.5 ml-1" />
                            </Button>
                          </div>
                        )}

                        {/* 2. Tarjeta Generativa: Recomendación de Rieles */}
                        {msg.generativeCard.type === "recommendation" && (
                          <div className="bg-[#FFFFFF] border border-[#E5E6EA] rounded-[12px] p-3.5 space-y-2.5 text-left shadow-xs">
                            <span className="font-black text-[#000000] text-xs flex items-center gap-1.5">
                              <Zap className="w-3.5 h-3.5 text-[#0000EE]" />
                              {msg.generativeCard.data.title}
                            </span>
                            <div className="space-y-1.5">
                              {msg.generativeCard.data.rails.map((r: any, idx: number) => (
                                <div key={idx} className="flex items-center justify-between p-2 rounded-[8px] bg-[#F3F3F4] border border-[#E5E6EA] text-[11px]">
                                  <div>
                                    <p className="font-bold text-[#000000]">{r.country}: <span className="text-[#0000EE]">{r.rail}</span></p>
                                    <p className="text-[10px] text-[#8B8F9A]">{r.volume}</p>
                                  </div>
                                  <span className="font-mono font-bold text-emerald-700">{r.cost}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* 3. Tarjeta Generativa: Pay-per-Intro B2B */}
                        {msg.generativeCard.type === "b2b_intro" && (
                          <div className="bg-[#FFFFFF] border border-[#E5E6EA] rounded-[12px] p-3.5 space-y-2.5 text-left shadow-xs">
                            <div className="flex items-center justify-between">
                              <span className="font-black text-[#000000] text-xs flex items-center gap-1.5">
                                <DollarSign className="w-3.5 h-3.5 text-[#0000EE]" />
                                Marketplace Pay-per-Intro
                              </span>
                              <span className="bg-[#E5E6EA] text-[#0000EE] font-mono font-bold text-[10px] px-1.5 py-0.5 rounded-[2px]">{msg.generativeCard.data.fee}</span>
                            </div>
                            <p className="text-[11px] text-[#8B8F9A]">
                              Dispersión automática vía Stripe Connect: <strong className="text-[#000000]">{msg.generativeCard.data.split}</strong>
                            </p>
                            <p className="text-[10px] text-[#8B8F9A]">
                              Decisores verificados en: {msg.generativeCard.data.target}
                            </p>
                            <Button 
                              size="sm" 
                              onClick={() => {
                                setIsOpen(false);
                                navigate("/b2b-intros");
                              }}
                              className="w-full bg-[#0000EE] hover:bg-[#0000BE] text-white font-bold text-xs h-8 rounded-[8px] cursor-pointer transition-colors duration-[0.12s]"
                            >
                              Abrir Portal de Introducciones B2B
                              <ArrowRight className="w-3.5 h-3.5 ml-1" />
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {msg.sender === "user" && (
                    <div className="w-7 h-7 rounded-[6px] bg-[#E5E6EA] flex items-center justify-center text-[#000000] flex-shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            <div className="p-2.5 bg-[#FFFFFF] border-t border-[#E5E6EA] flex gap-1.5 overflow-x-auto no-scrollbar flex-shrink-0">
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(p)}
                  className="px-2.5 py-1.5 rounded-[12px] bg-[#F3F3F4] hover:bg-[#0000EE] hover:text-white border border-[#E5E6EA] text-[10px] text-[#000000] whitespace-nowrap transition-colors duration-[0.12s] cursor-pointer flex-shrink-0 font-bold"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Footer con Input */}
            <div className="p-3 bg-[#FFFFFF] border-t border-[#E5E6EA] flex items-center gap-2 flex-shrink-0">
              <Input
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Pregunta sobre pasarelas, comisiones o rieles..."
                className="bg-[#FFFFFF] border-[#E5E6EA] text-[#000000] placeholder:text-[#8B8F9A] text-xs h-9 focus:border-[#0000EE] rounded-[6px]"
              />
              <Button
                size="sm"
                onClick={() => handleSend()}
                disabled={!inputQuery.trim()}
                className="bg-[#0000EE] hover:bg-[#0000BE] text-white h-9 px-3 font-bold rounded-[6px] cursor-pointer transition-colors duration-[0.12s]"
              >
                <Send className="w-3.5 h-3.5" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
