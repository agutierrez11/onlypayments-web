import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Filter } from "lucide-react";
import { trpc } from "@/lib/trpc";

type BusinessModel = "e-commerce" | "SaaS" | "remesas";

export default function PaymentStacks() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<BusinessModel | null>(null);

  const { data: stacks, isLoading } = trpc.paymentStacks.list.useQuery();

  const countries = ["Brasil", "México", "Colombia", "Perú", "Argentina", "Chile"];
  const businessModels: BusinessModel[] = ["e-commerce", "SaaS", "remesas"];

  const filteredStacks = stacks?.filter((stack) => {
    const matchesCountry = selectedCountry === null || stack.country === selectedCountry;
    const matchesModel = selectedModel === null || stack.businessModel === selectedModel;
    return matchesCountry && matchesModel;
  }) || [];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border py-8">
        <div className="container">
          <h1 className="text-4xl font-bold mb-2">Stacks de Pago</h1>
          <p className="text-lg text-muted-foreground">
            Recetas de pago organizadas por país y modelo de negocio
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-border py-6 bg-card/50">
        <div className="container space-y-6">
          {/* Country Filters */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-4 h-4" />
              <span className="font-semibold text-sm">Países</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCountry === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCountry(null)}
              >
                Todos
              </Button>
              {countries.map((country) => (
                <Button
                  key={country}
                  variant={selectedCountry === country ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCountry(country)}
                >
                  {country}
                </Button>
              ))}
            </div>
          </div>

          {/* Business Model Filters */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-semibold text-sm">Modelo de Negocio</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedModel === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedModel(null)}
              >
                Todos
              </Button>
              {businessModels.map((model) => (
                <Button
                  key={model}
                  variant={selectedModel === model ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedModel(model)}
                >
                  {model === "e-commerce" && "E-commerce"}
                  {model === "SaaS" && "SaaS"}
                  {model === "remesas" && "Remesas"}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stacks Grid */}
      <div className="py-12">
        <div className="container">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Cargando stacks...</p>
            </div>
          ) : filteredStacks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No se encontraron stacks con los filtros seleccionados.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStacks.map((stack) => (
                <Card
                  key={stack.id}
                  className="p-6 hover:shadow-lg transition-shadow hover:border-primary/50 cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{stack.name}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{stack.country}</Badge>
                        <Badge variant="outline">
                          {stack.businessModel === "e-commerce" && "E-commerce"}
                          {stack.businessModel === "SaaS" && "SaaS"}
                          {stack.businessModel === "remesas" && "Remesas"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {stack.description && (
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {stack.description}
                    </p>
                  )}

                  {stack.components && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-sm mb-2">Componentes</h4>
                      <div className="space-y-1 text-sm">
                        {stack.components.split("\n").slice(0, 3).map((comp, idx) => (
                          <p key={idx} className="text-muted-foreground">
                            • {comp.trim()}
                          </p>
                        ))}
                        {stack.components.split("\n").length > 3 && (
                          <p className="text-muted-foreground text-xs">
                            + {stack.components.split("\n").length - 3} más
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  <Button variant="outline" className="w-full" size="sm">
                    Ver detalles
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-r from-primary/10 to-accent/10 border-t border-border">
        <div className="container max-w-2xl text-center">
          <h2 className="text-2xl font-bold mb-4">
            ¿No encuentras el stack que necesitas?
          </h2>
          <p className="text-muted-foreground mb-6">
            Contáctanos para que creemos un stack personalizado para tu caso de uso específico.
          </p>
          <Button size="lg">Solicitar Stack Personalizado</Button>
        </div>
      </section>
    </div>
  );
}
