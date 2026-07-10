import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Zap, BookOpen, Grid3x3, TrendingUp } from "lucide-react";
import { useLocation } from "wouter";

export default function Home() {
  const { user } = useAuth();
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">OP</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline">OnlyPayments</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate("/news")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Noticias
            </button>
            <button 
              onClick={() => navigate("/stacks")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Stacks
            </button>
            <button 
              onClick={() => navigate("/guides")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Guías
            </button>
            {user ? (
              <Button variant="outline" size="sm" onClick={() => navigate("/dashboard")}>
                Dashboard
              </Button>
            ) : (
              <Button size="sm" onClick={() => { startLogin(); }}>
                Ingresar
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-40"></div>
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-30"></div>
        </div>

        <div className="container max-w-4xl">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-secondary">
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">La señal, no el ruido</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
              Inteligencia de Pagos para <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">América Latina</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Noticias curadas por IA, guías prácticas y stacks de pago recomendados. Todo lo que necesitas para tomar decisiones accionables en el ecosistema de pagos de LATAM.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                size="lg" 
                className="gap-2"
                onClick={() => navigate("/news")}
              >
                Explorar Noticias <ArrowRight className="w-4 h-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate("/stacks")}
              >
                Ver Stacks de Pago
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-32 bg-card/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Todo lo que necesitas para dominar los pagos
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              OnlyPayments combina noticias, análisis y recursos prácticos en una plataforma diseñada para equipos de producto, fintech y negocios.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1: Noticias Curadas */}
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Noticias Curadas por IA</h3>
              <p className="text-muted-foreground mb-4">
                Resúmenes de 3 líneas de las noticias más relevantes del ecosistema de pagos en LATAM, sin ruido corporativo.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                  Filtros por país y categoría
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                  Actualización diaria
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                  Búsqueda avanzada
                </li>
              </ul>
            </Card>

            {/* Feature 2: Impacto y Herramientas */}
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">Impacto y Herramientas</h3>
              <p className="text-muted-foreground mb-4">
                Cada noticia incluye análisis de impacto, recomendaciones prácticas y herramientas sugeridas para implementar.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                  Análisis accionable
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                  Proveedores recomendados
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                  Pasos de implementación
                </li>
              </ul>
            </Card>

            {/* Feature 3: Stacks de Pago */}
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Grid3x3 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Stacks de Pago</h3>
              <p className="text-muted-foreground mb-4">
                Recetas de pago organizadas por país y modelo de negocio (e-commerce, SaaS, remesas).
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                  Configuraciones probadas
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                  Consideraciones regulatorias
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                  Comparativas de proveedores
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Guías Section */}
      <section className="py-20 sm:py-32">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Guías Prácticas ("How-to")
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Aprende cómo implementar pasarelas de pago, cumplir regulaciones y optimizar tus conversiones.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <BookOpen className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Implementación de Pasarelas</h3>
              <p className="text-muted-foreground">
                Guías paso a paso para integrar las principales pasarelas de pago en tu aplicación o sitio web.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-shadow">
              <BookOpen className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-2">Regulaciones y Compliance</h3>
              <p className="text-muted-foreground">
                Entiende los requisitos regulatorios por país y cómo asegurar el cumplimiento normativo.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 sm:py-32 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container max-w-2xl">
          <div className="text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Mantente al día con el newsletter semanal
            </h2>
            <p className="text-lg text-muted-foreground">
              Recibe un resumen curado de las noticias y guías más relevantes cada semana, directamente en tu correo.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <input 
                type="email" 
                placeholder="tu@email.com"
                className="flex-1 px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button size="lg">Suscribirse</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-card/50">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">OnlyPayments</h4>
              <p className="text-sm text-muted-foreground">
                La señal, no el ruido, de los pagos en LATAM.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Producto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Noticias</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Stacks</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Guías</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Acerca de</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contacto</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Privacidad</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Términos</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 OnlyPayments. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
