import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";

export default function HowToGuides() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: guides, isLoading } = trpc.guides.list.useQuery();

  const categories = Array.from(new Set(guides?.map((g) => g.category) || []));

  const filteredGuides = guides?.filter((guide) => {
    const matchesSearch = searchTerm === "" || 
      guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === null || guide.category === selectedCategory;

    return matchesSearch && matchesCategory;
  }) || [];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border py-8">
        <div className="container">
          <h1 className="text-4xl font-bold mb-2">Guías Prácticas</h1>
          <p className="text-lg text-muted-foreground">
            Todo lo que necesitas saber para implementar pagos en tu negocio
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="border-b border-border py-6 bg-card/50">
        <div className="container space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Buscar guías..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filters */}
          {categories.length > 0 && (
            <div>
              <span className="font-semibold text-sm block mb-3">Categorías</span>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                >
                  Todas
                </Button>
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Guides Content */}
      <div className="py-12">
        <div className="container max-w-4xl">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Cargando guías...</p>
            </div>
          ) : filteredGuides.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No se encontraron guías con los términos de búsqueda.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredGuides.map((guide) => (
                <Card
                  key={guide.id}
                  className="p-8 hover:shadow-lg transition-shadow hover:border-primary/50 cursor-pointer group"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                          {guide.title}
                        </h3>
                      </div>
                      {guide.category && (
                        <Badge variant="secondary" className="mb-3">
                          {guide.category}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {guide.content}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      Lectura: ~{Math.ceil(guide.content.split(" ").length / 200)} min
                    </div>
                    <Button variant="ghost" size="sm">
                      Leer guía →
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Featured Guides */}
      <section className="py-12 bg-card/50 border-t border-border">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Guías Destacadas</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Implementación de Pasarelas de Pago",
                description: "Guía completa para integrar las principales pasarelas de pago en tu aplicación.",
              },
              {
                title: "Regulaciones y Compliance",
                description: "Entiende los requisitos regulatorios por país y cómo asegurar el cumplimiento.",
              },
              {
                title: "Optimización de Conversión",
                description: "Estrategias probadas para aumentar la tasa de conversión en tus pagos.",
              },
            ].map((guide, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-bold mb-2">{guide.title}</h3>
                <p className="text-muted-foreground mb-4">{guide.description}</p>
                <Button variant="outline" size="sm">
                  Leer más
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
