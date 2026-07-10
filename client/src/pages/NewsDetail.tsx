import { useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, ExternalLink } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function NewsDetail() {
  const [match, params] = useRoute("/news/:id");
  const [, navigate] = useLocation();
  const newsId = params?.id ? parseInt(params.id) : null;

  const { data: news, isLoading } = trpc.news.byId.useQuery(
    { id: newsId! },
    { enabled: newsId !== null }
  );

  if (!match) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container py-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/news")}
            className="gap-2 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a noticias
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="py-12">
        <div className="container max-w-3xl">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Cargando noticia...</p>
            </div>
          ) : !news ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Noticia no encontrada.</p>
            </div>
          ) : (
            <article className="space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{news.category}</Badge>
                  <Badge variant="outline">{news.country}</Badge>
                </div>

                <h1 className="text-4xl font-bold">{news.title}</h1>

                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(news.publishedAt).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <a
                    href={news.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-primary transition-colors"
                  >
                    Fuente original
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Image */}
              {news.imageUrl && (
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={news.imageUrl}
                    alt={news.title}
                    className="w-full h-96 object-cover"
                  />
                </div>
              )}

              {/* Summary */}
              <Card className="p-6 bg-card/50 border-primary/20">
                <h2 className="font-bold mb-3 text-primary">Resumen</h2>
                <p className="text-lg leading-relaxed">{news.summary}</p>
              </Card>

              {/* Full Content */}
              {news.content && (
                <div className="prose prose-invert max-w-none">
                  <div className="space-y-4 text-foreground leading-relaxed">
                    {news.content.split("\n").map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* Impacto y Herramientas Section */}
              {news.impactAndTools && (
                <Card className="p-8 bg-gradient-to-br from-accent/10 to-primary/10 border-accent/30">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent"></span>
                    Impacto y Herramientas
                  </h2>

                  <div className="space-y-6">
                    {/* Parse the impact and tools content */}
                    <div className="prose prose-invert max-w-none">
                      <div className="space-y-4 text-foreground leading-relaxed">
                        {news.impactAndTools.split("\n").map((line, idx) => {
                          if (line.startsWith("##")) {
                            return (
                              <h3 key={idx} className="text-xl font-bold mt-4 mb-2">
                                {line.replace(/^#+\s*/, "")}
                              </h3>
                            );
                          }
                          if (line.startsWith("-")) {
                            return (
                              <div key={idx} className="flex gap-3 ml-4">
                                <span className="text-accent font-bold">•</span>
                                <p>{line.replace(/^-\s*/, "")}</p>
                              </div>
                            );
                          }
                          if (line.trim() === "") return null;
                          return <p key={idx}>{line}</p>;
                        })}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="pt-4 border-t border-accent/20">
                      <p className="text-sm text-muted-foreground mb-4">
                        ¿Necesitas ayuda para implementar estas recomendaciones?
                      </p>
                      <Button className="gap-2">
                        Explorar Stacks de Pago
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              {/* Related Resources */}
              <Card className="p-6 bg-card/50">
                <h3 className="font-bold mb-4">Recursos Relacionados</h3>
                <div className="space-y-3">
                  <a
                    href="#"
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/10 transition-colors"
                  >
                    <span className="font-medium">Guía: Implementación de Pasarelas de Pago</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/10 transition-colors"
                  >
                    <span className="font-medium">Stack de Pago para {news.country}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </Card>
            </article>
          )}
        </div>
      </div>
    </div>
  );
}
