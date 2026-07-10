import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Calendar } from "lucide-react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";

type Category = "A2A" | "transfronterizo" | "IA" | "regulación";

export default function NewsFeed() {
  const [, navigate] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const { data: news, isLoading } = trpc.news.list.useQuery();

  const categories: Category[] = ["A2A", "transfronterizo", "IA", "regulación"];
  const countries = ["Brasil", "México", "Colombia", "Perú", "Argentina", "Chile"];

  const filteredNews = news?.filter((item) => {
    const matchesSearch = searchTerm === "" || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === null || item.category === selectedCategory;
    const matchesCountry = selectedCountry === null || item.country === selectedCountry;

    return matchesSearch && matchesCategory && matchesCountry;
  }) || [];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border py-8">
        <div className="container">
          <h1 className="text-4xl font-bold mb-2">Noticias de Pagos LATAM</h1>
          <p className="text-lg text-muted-foreground">
            Noticias curadas por IA, actualizadas diariamente
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-border py-6 bg-card/50">
        <div className="container space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Buscar noticias..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filters */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-4 h-4" />
              <span className="font-semibold text-sm">Categorías</span>
            </div>
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

          {/* Country Filters */}
          <div>
            <div className="flex items-center gap-2 mb-3">
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
        </div>
      </div>

      {/* News List */}
      <div className="py-12">
        <div className="container max-w-4xl">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Cargando noticias...</p>
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No se encontraron noticias con los filtros seleccionados.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredNews.map((item) => (
                <Card
                  key={item.id}
                  className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate(`/news/${item.id}`)}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{item.category}</Badge>
                        <Badge variant="outline">{item.country}</Badge>
                      </div>
                      <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    {item.imageUrl && (
                      <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {item.summary}
                  </p>

                  {item.impactAndTools && (
                    <div className="bg-accent/5 rounded-lg p-4 mb-4 border border-accent/20">
                      <h4 className="font-semibold text-sm mb-2 text-accent">
                        Impacto y Herramientas
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {item.impactAndTools}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {new Date(item.publishedAt).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <Button variant="ghost" size="sm">
                      Leer más →
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
