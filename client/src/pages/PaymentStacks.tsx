import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Filter, ArrowLeft, Cpu } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";

type BusinessModel = "e-commerce" | "SaaS" | "remesas" | "iGaming";

export default function PaymentStacks() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<BusinessModel | null>(null);

  const { data: stacks, isLoading } = trpc.paymentStacks.list.useQuery();

  const countries = ["Brasil", "México", "Colombia", "Perú", "Argentina", "Chile", "LATAM"];
  const businessModels: BusinessModel[] = ["e-commerce", "SaaS", "remesas", "iGaming"];

  const filteredStacks = stacks?.filter((stack) => {
    const matchesCountry = selectedCountry === null || stack.country === selectedCountry;
    const matchesModel = selectedModel === null || stack.businessModel === selectedModel;
    return matchesCountry && matchesModel;
  }) || [];

  return (
    <div className="min-h-screen bg-[#F3F3F4] text-[#000000] font-sans">
      {/* Top Navigation Bar */}
      <div className="border-b border-[#E5E6EA] bg-[#FFFFFF] sticky top-0 z-50 shadow-xs">
        <div className="max-w-[1296px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2 text-[#000000] hover:text-[#0000EE] font-bold border border-[#E5E6EA] rounded-[12px] cursor-pointer">
              <ArrowLeft className="w-4 h-4 text-[#0000EE]" />
              Volver al inicio
            </Button>
          </Link>
          <span className="font-black text-[#000000] text-lg tracking-tight">OnlyPayments Stacks</span>
        </div>
      </div>

      {/* Header */}
      <div className="border-b border-[#E5E6EA] py-10 bg-[#FFFFFF]">
        <div className="max-w-[1296px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black mb-2 text-[#000000] tracking-tight">Stacks de Pago</h1>
            <p className="text-base text-[#8B8F9A] font-normal leading-[1.15]">
              Recetas de pago organizadas por país y modelo de negocio
            </p>
          </div>
          <Link href="/hardware-pos">
            <Button className="bg-[#0000EE] hover:bg-[#0000BE] text-white font-bold text-xs uppercase tracking-wider gap-2 rounded-[12px] px-5 py-2.5 cursor-pointer transition-colors duration-[0.12s]">
              <Cpu className="w-4 h-4" />
              <span>SmartPOS & Hardware Radar</span>
              <span className="text-[10px] bg-white/20 text-white px-1.5 py-0.2 rounded-[2px]">NUEVO</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-[#E5E6EA] py-6 bg-[#FFFFFF]">
        <div className="max-w-[1296px] mx-auto px-4 sm:px-6 space-y-6">
          {/* Country Filters */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-4 h-4 text-[#0000EE]" />
              <span className="font-bold text-sm text-[#000000]">Países</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCountry(null)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-[12px] transition-all duration-[0.12s] cursor-pointer ${
                  selectedCountry === null
                    ? "bg-[#0000EE] text-white"
                    : "bg-[#FFFFFF] border border-[#E5E6EA] text-[#000000] hover:border-[#0000EE]"
                }`}
              >
                Todos
              </button>
              {countries.map((country) => (
                <button
                  key={country}
                  onClick={() => setSelectedCountry(country)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-[12px] transition-all duration-[0.12s] cursor-pointer ${
                    selectedCountry === country
                      ? "bg-[#0000EE] text-white"
                      : "bg-[#FFFFFF] border border-[#E5E6EA] text-[#000000] hover:border-[#0000EE]"
                  }`}
                >
                  {country}
                </button>
              ))}
            </div>
          </div>

          {/* Business Model Filters */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-bold text-sm text-[#000000]">Modelo de Negocio</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedModel(null)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-[12px] transition-all duration-[0.12s] cursor-pointer ${
                  selectedModel === null
                    ? "bg-[#0000EE] text-white"
                    : "bg-[#FFFFFF] border border-[#E5E6EA] text-[#000000] hover:border-[#0000EE]"
                }`}
              >
                Todos
              </button>
              {businessModels.map((model) => (
                <button
                  key={model}
                  onClick={() => setSelectedModel(model)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-[12px] transition-all duration-[0.12s] cursor-pointer ${
                    selectedModel === model
                      ? "bg-[#0000EE] text-white"
                      : "bg-[#FFFFFF] border border-[#E5E6EA] text-[#000000] hover:border-[#0000EE]"
                  }`}
                >
                  {model === "e-commerce" && "E-commerce"}
                  {model === "SaaS" && "SaaS"}
                  {model === "remesas" && "Remesas"}
                  {model === "iGaming" && "iGaming"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stacks Grid */}
      <div className="py-12">
        <div className="max-w-[1296px] mx-auto px-4 sm:px-6">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-[#8B8F9A] font-medium">Cargando stacks...</p>
            </div>
          ) : filteredStacks.length === 0 ? (
            <div className="text-center py-12 bg-[#FFFFFF] rounded-[12px] border border-[#E5E6EA] p-8 shadow-xs">
              <p className="text-[#8B8F9A] font-medium">No se encontraron stacks con los filtros seleccionados.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStacks.map((stack) => (
                <Card
                  key={stack.id}
                  className="p-6 bg-[#FFFFFF] border border-[#E5E6EA] hover:border-[#0000EE] transition-all duration-[0.12s] cursor-pointer rounded-[12px] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="text-xl font-black text-[#000000] mb-2 tracking-tight">{stack.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className="bg-[#E5E6EA] text-[#000000] font-bold text-xs px-2.5 py-0.5 rounded-[2px]">{stack.country}</span>
                          <span className="bg-[#E5E6EA] text-[#0000EE] font-bold text-xs px-2.5 py-0.5 rounded-[2px]">
                            {stack.businessModel === "e-commerce" && "E-commerce"}
                            {stack.businessModel === "SaaS" && "SaaS"}
                            {stack.businessModel === "remesas" && "Remesas"}
                            {stack.businessModel === "iGaming" && "iGaming"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {stack.description && (
                      <p className="text-[#8B8F9A] text-sm font-normal mb-4 line-clamp-3 leading-[1.15]">
                        {stack.description}
                      </p>
                    )}

                    {stack.components && (
                      <div className="mb-4">
                        <h4 className="font-bold text-xs uppercase tracking-wider text-[#8B8F9A] mb-2 font-mono">Componentes</h4>
                        <div className="space-y-1 text-xs">
                          {stack.components.split("\n").slice(0, 3).map((comp: string, idx: number) => (
                            <p key={idx} className="text-[#000000] font-semibold">
                              • {comp.trim()}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <button className="w-full mt-2 font-bold border border-[#E5E6EA] bg-[#FFFFFF] hover:bg-[#F3F3F4] text-[#000000] hover:text-[#0000EE] rounded-[12px] py-2 text-xs transition-colors duration-[0.12s] cursor-pointer">
                    Ver detalles
                  </button>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-12 bg-[#FFFFFF] border-t border-[#E5E6EA]">
        <div className="max-w-[1296px] mx-auto px-4 sm:px-6 text-center max-w-2xl">
          <h2 className="text-2xl font-black text-[#000000] mb-2 tracking-tight">
            ¿No encuentras el stack que necesitas?
          </h2>
          <p className="text-[#8B8F9A] font-normal mb-6 leading-[1.15]">
            Contáctanos para que creemos un stack personalizado para tu caso de uso específico.
          </p>
          <Button size="lg" className="bg-[#0000EE] hover:bg-[#0000BE] text-white font-bold rounded-[12px] px-8 cursor-pointer transition-colors duration-[0.12s]">
            Solicitar Stack Personalizado
          </Button>
        </div>
      </section>
    </div>
  );
}
