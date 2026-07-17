import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe2, ArrowRight, TrendingDown } from "lucide-react";
import { REMITTANCE_CORRIDORS, REMITTANCE_ACTORS } from "../data";

export default function Remesas() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="border-b border-border py-12 bg-card/50">
        <div className="container">
          <div className="max-w-3xl mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Globe2 className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight">Ecosistema de Remesas</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              El corredor de transferencias de dinero más importante del mundo. Análisis del volumen, tarifas y canales de last-mile en LATAM.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-6 border-l-4 border-l-primary bg-background/50">
              <p className="text-sm font-medium text-muted-foreground mb-1">Volumen USA→LATAM</p>
              <p className="text-3xl font-bold">$180B+</p>
              <p className="text-xs text-muted-foreground mt-1">Anual estimado</p>
            </Card>
            <Card className="p-6 bg-background/50">
              <p className="text-sm font-medium text-muted-foreground mb-1">Dependencia</p>
              <p className="text-3xl font-bold">~120M</p>
              <p className="text-xs text-muted-foreground mt-1">Personas receptoras</p>
            </Card>
            <Card className="p-6 bg-background/50">
              <p className="text-sm font-medium text-muted-foreground mb-1">Tarifa Promedio Actual</p>
              <p className="text-3xl font-bold">3.5%</p>
              <p className="text-xs text-muted-foreground mt-1">MTOs Tradicionales</p>
            </Card>
            <Card className="p-6 border-l-4 border-l-green-500 bg-background/50">
              <p className="text-sm font-medium text-muted-foreground mb-1">Tarifa A2A Posible</p>
              <div className="flex items-center gap-2">
                <p className="text-3xl font-bold text-green-500">&lt;1%</p>
                <TrendingDown className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Vía infraestructura local</p>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-12 space-y-16">
        
        {/* Corridors Table */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Principales Corredores (USA → LATAM)</h2>
            <p className="text-muted-foreground">
              Datos ordenados por volumen anual. Destaca el impacto en economías de Centroamérica y el Caribe.
            </p>
          </div>
          
          <div className="rounded-xl border border-border bg-card overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-4 font-semibold">Corredor</th>
                  <th className="px-6 py-4 font-semibold text-right">Volumen Anual</th>
                  <th className="px-6 py-4 font-semibold text-right">% PIB Receptor</th>
                  <th className="px-6 py-4 font-semibold text-right">Tarifa Prom.</th>
                  <th className="px-6 py-4 font-semibold">Infraestructura Last-Mile</th>
                  <th className="px-6 py-4 font-semibold">Dominantes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {REMITTANCE_CORRIDORS.map((corridor) => (
                  <tr key={corridor.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl" title={corridor.from}>{corridor.fromFlag}</span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                        <span className="text-2xl" title={corridor.to}>{corridor.toFlag}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-medium">
                      ${(corridor.volumeUSD / 1000).toFixed(1)}B
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Badge variant={corridor.gdpPercent > 15 ? "default" : "secondary"}>
                        {corridor.gdpPercent}%
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {corridor.avgFeePercent.toFixed(1)}%
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {corridor.lastMile.map((lm, i) => (
                          <Badge key={i} variant="outline" className="bg-background">
                            {lm}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs text-muted-foreground">
                        {corridor.dominantPlayers.join(", ")}
                      </p>
                      {corridor.informalChannel && (
                        <p className="text-xs text-destructive/80 mt-1" title="Canal Informal">
                          ⚠ {corridor.informalChannel}
                        </p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Actors Ecosystem */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Actores del Ecosistema</h2>
            <p className="text-muted-foreground">
              Categorización de los proveedores de servicios que operan en la cadena de valor de las remesas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {REMITTANCE_ACTORS.map((actor) => (
              <Card key={actor.id} className="p-6 flex flex-col hover:border-primary/50 transition-colors">
                <div className="mb-4">
                  <Badge className="mb-3">{actor.category}</Badge>
                  <h3 className="text-lg font-bold">{actor.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground flex-grow mb-6">
                  {actor.description}
                </p>
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">Ejemplos</p>
                  <div className="flex flex-wrap gap-2">
                    {actor.examples.map((ex, i) => (
                      <span key={i} className="text-xs bg-muted px-2 py-1 rounded-md">
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Regulatory context */}
        <section className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
          <h2 className="text-2xl font-bold mb-4">Contexto Regulatorio y AML</h2>
          <div className="grid md:grid-cols-2 gap-8 text-sm">
            <div>
              <h3 className="font-semibold text-lg mb-2 text-primary">MSB (Money Services Business)</h3>
              <p className="text-muted-foreground mb-4">
                En EE. UU., los transmisores de dinero deben registrarse en la FinCEN como MSB y obtener licencias estado por estado (MTL). Esto obliga a tener rigurosos programas de AML/KYC.
              </p>
              <h3 className="font-semibold text-lg mb-2 text-primary">KYC Last-Mile</h3>
              <p className="text-muted-foreground">
                En LATAM, el retiro en efectivo en redes de corresponsales requiere validación de identidad oficial (INE, DPI, etc.). Las billeteras digitales aplican esquemas de KYC escalonado (por niveles) para limitar el riesgo de lavado de dinero.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 text-primary">Corresponsalía Bancaria</h3>
              <p className="text-muted-foreground mb-4">
                Las neoremesadoras dependen de bancos corresponsales o proveedores de FX locales para inyectar liquidez en las cuentas de destino (vía SPEI, PIX o ACH).
              </p>
              <h3 className="font-semibold text-lg mb-2 text-primary">Liquidación (Settlement)</h3>
              <p className="text-muted-foreground">
                El margen financiero principal radica en el "FX Spread" (diferencial cambiario). Liquidar fondos rápidamente es el desafío técnico más grande. Algunos transmisores están comenzando a usar stablecoins para mover valor de forma instantánea sin intermediarios SWIFT.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
