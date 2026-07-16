import React, { useState, useEffect, useMemo, useRef } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ArrowRight, 
  Zap, 
  BookOpen, 
  Grid3x3, 
  TrendingUp, 
  Globe, 
  Search, 
  Check, 
  Moon, 
  Sun, 
  MessageSquare, 
  ChevronUp, 
  ExternalLink, 
  X,
  Send,
  Loader2
} from "lucide-react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { 
  COUNTRIES, 
  PAYMENT_METHODS, 
  ECOSYSTEM_ACTORS, 
  PAYMENT_PROVIDERS, 
  GLOSSARY_TERMS, 
  EXPERTS,
  Country, 
  PaymentMethod 
} from "../data";

export default function Home() {
  const { user } = useAuth();
  const [, navigate] = useLocation();

  // Estados generales
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [selectedCountryKey, setSelectedCountryKey] = useState<string>("MX");

  // Biblioteca de Expertos Tabs
  const [activeLibraryTab, setActiveLibraryTab] = useState<'ecosistema' | 'diccionario' | 'expertos'>('ecosistema');
  
  // Diccionario
  const [searchGlossaryTerm, setSearchGlossaryTerm] = useState<string>("");
  const [glossaryExpandedTerm, setGlossaryExpandedTerm] = useState<string | null>(null);

  // Quién es Quién / Diagrama de Flujo
  const [selectedActorId, setSelectedActorId] = useState<number | null>(3); // Por defecto Gateway
  const [activeFlowModel, setActiveFlowModel] = useState<'4partes' | 'mexico' | '3partes'>('mexico');

  // Comunidad (Debates)
  const [activeSort, setActiveSort] = useState<'hot' | 'new' | 'top'>('hot');
  const [communityCountryFilter, setCommunityCountryFilter] = useState<string>("TODOS");
  
  // Creador de Post
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [postTag, setPostTag] = useState("Pregunta");
  const [postCountry, setPostCountry] = useState("México");
  const [postAuthor, setPostAuthor] = useState("");
  const [postSuccessMessage, setPostSuccessMessage] = useState("");

  // Comentarios anidados
  const [expandedCommentsPostId, setExpandedCommentsPostId] = useState<string | null>(null);
  const [newCommentBody, setNewCommentBody] = useState("");
  const [newCommentAuthor, setNewCommentAuthor] = useState("");

  // Newsletter
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [newsletterError, setNewsletterError] = useState("");

  // Formulario de intake de soluciones
  const [intakeService, setIntakeService] = useState<string[]>([]);
  const [intakePainPoints, setIntakePainPoints] = useState<string[]>([]);
  const [intakeMarkets, setIntakeMarkets] = useState<string[]>([]);
  const [intakeCompanyType, setIntakeCompanyType] = useState("");
  const [intakeVolume, setIntakeVolume] = useState("");
  const [intakeDescription, setIntakeDescription] = useState("");
  const [intakeContact, setIntakeContact] = useState("");
  const [intakeSubmitted, setIntakeSubmitted] = useState(false);

  const toggleIntakeMulti = (arr: string[], val: string, setter: (v: string[]) => void) => {
    setter(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);
  };

  const handleIntakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = encodeURIComponent(
      `Tipo de solución: ${intakeService.join(', ')}\nDolores/Desafíos: ${intakePainPoints.join(', ')}\nMercados: ${intakeMarkets.join(', ')}\nTipo de empresa: ${intakeCompanyType}\nVolumen mensual: ${intakeVolume}\nDescripción: ${intakeDescription}\nContacto: ${intakeContact}`
    );
    window.open(`mailto:antoniogtzjimenez@gmail.com?subject=Solicitud de solución de pagos - OnlyPayments&body=${body}`);
    setIntakeSubmitted(true);
  };

  // Referencias a elementos para scroll
  const communitySectionRef = useRef<HTMLDivElement>(null);
  const postFormRef = useRef<HTMLFormElement>(null);

  // Queries de tRPC para Comunidad
  const { data: posts = [], isLoading: isLoadingPosts, refetch: refetchPosts } = trpc.community.listPosts.useQuery({
    sort: activeSort
  });

  const createPostMutation = trpc.community.createPost.useMutation({
    onSuccess: () => {
      refetchPosts();
      setPostTitle("");
      setPostBody("");
      setPostAuthor("");
      setPostSuccessMessage("¡Publicación enviada exitosamente a la comunidad!");
      setTimeout(() => setPostSuccessMessage(""), 5000);
    }
  });

  const upvotePostMutation = trpc.community.upvotePost.useMutation({
    onSuccess: () => {
      refetchPosts();
    }
  });

  const addCommentMutation = trpc.community.addComment.useMutation({
    onSuccess: () => {
      refetchPosts();
      setNewCommentBody("");
      setNewCommentAuthor("");
    }
  });

  // Query y mutación para comentarios de un post seleccionado
  const { data: activeComments = [], refetch: refetchComments } = trpc.community.getComments.useQuery(
    { postId: expandedCommentsPostId || "" },
    { enabled: !!expandedCommentsPostId }
  );

  // Mutación para Suscripción al Newsletter
  const subscribeMutation = trpc.subscribers.subscribe.useMutation({
    onSuccess: () => {
      setNewsletterSuccess(true);
      setNewsletterEmail("");
      setNewsletterError("");
    },
    onError: (err) => {
      setNewsletterError("Ocurrió un error. Por favor intenta de nuevo.");
    }
  });

  // Cargar comentarios y escuchar cambios del postId expandido
  useEffect(() => {
    if (expandedCommentsPostId) {
      refetchComments();
    }
  }, [expandedCommentsPostId]);

  // Manejar modo oscuro en HTML
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const selectedCountry = useMemo(() => {
    return COUNTRIES[selectedCountryKey] || COUNTRIES.MX;
  }, [selectedCountryKey]);

  const selectedCountryMethods = useMemo(() => {
    return PAYMENT_METHODS[selectedCountryKey] || [];
  }, [selectedCountryKey]);

  // Filtrar glosario
  const filteredGlossary = useMemo(() => {
    if (!searchGlossaryTerm.trim()) return GLOSSARY_TERMS;
    const query = searchGlossaryTerm.toLowerCase();
    return GLOSSARY_TERMS.filter(
      item => item.term.toLowerCase().includes(query) || item.definition.toLowerCase().includes(query)
    );
  }, [searchGlossaryTerm]);

  // Filtrar posts de la comunidad por país
  const filteredPosts = useMemo(() => {
    if (communityCountryFilter === "TODOS") return posts;
    return posts.filter(post => post.country === communityCountryFilter);
  }, [posts, communityCountryFilter]);

  // Sugerir contribución (Feedback del Supermercado)
  const suggestContribution = (type: 'payment' | 'concept') => {
    // Scroll suave a la comunidad
    communitySectionRef.current?.scrollIntoView({ behavior: "smooth" });

    // Rellenar formulario de post
    if (type === 'payment') {
      setPostTitle(`Propuesta: Nuevo método de pago en ${selectedCountry.name}`);
      setPostBody(`Creo que hace falta agregar este método de pago:\n\n- Nombre:\n- Tipo:\n- Liquidación (settlement):\n- Fee promedio:\n- ¿Por qué es relevante en este país?`);
      setPostTag("Sugerencia");
      setPostCountry(selectedCountry.name);
    } else {
      setPostTitle("Propuesta: Corrección / Concepto en el diccionario");
      setPostBody(`Propongo el siguiente término o corrección al Diccionario de Pagos:\n\n- Concepto:\n- Definición sugerida:\n- Fuente / Referencia:`);
      setPostTag("Corrección");
    }
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle || !postBody) return;

    createPostMutation.mutate({
      id: "post_" + Math.random().toString(36).substring(2, 9),
      title: postTitle,
      body: postBody,
      author: postAuthor || "Anónimo",
      authorTitle: "Miembro",
      tag: postTag,
      country: postCountry === "Ninguno" ? null : postCountry
    });
  };

  const handleAddComment = (postId: string) => {
    if (!newCommentBody) return;

    addCommentMutation.mutate({
      id: "comment_" + Math.random().toString(36).substring(2, 9),
      postId,
      author: newCommentAuthor || "Anónimo",
      body: newCommentBody
    }, {
      onSuccess: () => {
        setTimeout(() => refetchComments(), 100);
      }
    });
  };

  const handleUpvotePost = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    upvotePostMutation.mutate({ postId });
  };

  const handleSubscribeNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    subscribeMutation.mutate({ email: newsletterEmail });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans transition-colors duration-300">
      
      {/* HEADER / NAVIGATION */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-primary-foreground font-bold text-sm font-mono">OP</span>
            </div>
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">OnlyPayments</span>
            <span className="text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded bg-accent/20 text-accent font-semibold font-mono border border-accent/20">LATAM</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6">
              <a href="#explorador" className="text-sm font-medium hover:text-accent transition-colors">Explorador</a>
              <a href="#biblioteca" className="text-sm font-medium hover:text-accent transition-colors">Biblioteca de Expertos</a>
              <a href="#comunidad" className="text-sm font-medium hover:text-accent transition-colors">Comunidad</a>
            </div>

            <div className="flex items-center gap-3 border-l border-border pl-3">
              {/* Botón modo claro/oscuro */}
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-secondary/40 transition-colors"
                title={darkMode ? "Modo Claro" : "Modo Oscuro"}
              >
                {darkMode ? <Sun className="w-4 h-4 text-accent" /> : <Moon className="w-4 h-4 text-primary" />}
              </button>

              {user ? (
                <Button variant="outline" size="sm" onClick={() => navigate("/dashboard")} className="hidden sm:inline-flex border-accent/30 text-accent hover:bg-accent/10">
                  Mi Dashboard
                </Button>
              ) : (
                <Button size="sm" onClick={startLogin} className="hidden sm:inline-flex bg-primary hover:bg-primary/95 text-white">
                  Ingresar
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-40 animate-pulse"></div>
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/15 rounded-full blur-3xl opacity-30"></div>
        </div>

        <div className="container max-w-4xl text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border shadow-inner">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping"></span>
            <span className="text-xs font-semibold tracking-wide uppercase text-muted-foreground font-mono">Diccionario & Quién es Quién v6.0</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            El Mapa de Pagos de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">América Latina</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
            Una plataforma interactiva para explorar métodos de pago locales, switches regulatorios, actores clave del ecosistema e inteligencia colectiva B2B.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a href="#explorador">
              <Button size="lg" className="w-full sm:w-auto gap-2 bg-gradient-to-r from-primary to-primary/90 text-white shadow-lg shadow-primary/30 hover:scale-[1.02] transition-transform">
                Explorar Países <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
            <a href="#comunidad">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-border hover:bg-secondary/40">
                Únete a los Debates
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* EXPLORADOR DE PAÍSES */}
      <section id="explorador" className="py-20 border-t border-border bg-card/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Explorador de Pagos Locales</h2>
            <p className="text-muted-foreground font-light">
              Selecciona un país para analizar su contexto macro, regulaciones, cámaras fintech oficiales y sus principales métodos de pago alternativos (APMs).
            </p>
          </div>

          {/* Fila de Botones de Países */}
          <div className="flex flex-wrap gap-2 justify-center mb-12 max-w-5xl mx-auto">
            {Object.keys(COUNTRIES).map(key => {
              const country = COUNTRIES[key];
              const isSelected = selectedCountryKey === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCountryKey(key)}
                  className={`px-4 py-2.5 rounded-xl border text-sm font-semibold flex items-center gap-2 transition-all hover:scale-[1.03] ${
                    isSelected 
                      ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20' 
                      : 'bg-background hover:bg-secondary/40 border-border'
                  }`}
                >
                  <span className="text-base">{country.flag}</span>
                  {country.name}
                </button>
              );
            })}
          </div>

          {/* Ficha Dinámica del País */}
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* Info Macro */}
            <Card className="p-8 border-border bg-background/50 backdrop-blur space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{selectedCountry.flag}</span>
                    <div>
                      <h3 className="text-2xl font-bold">{selectedCountry.name}</h3>
                      <span className="text-xs text-muted-foreground font-mono">Moneda: {selectedCountry.currency}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">{selectedCountry.description}</p>
              </div>

              <div className="pt-6 border-t border-border space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-lg bg-secondary/20 border border-border">
                    <span className="text-[10px] text-muted-foreground uppercase font-semibold font-mono tracking-wider">MRR Fintech</span>
                    <p className="text-base font-bold text-accent">{selectedCountry.mrr}</p>
                  </div>
                  <div className="p-3.5 rounded-lg bg-secondary/20 border border-border">
                    <span className="text-[10px] text-muted-foreground uppercase font-semibold font-mono tracking-wider">Crecimiento</span>
                    <p className="text-base font-bold text-emerald-500">{selectedCountry.growth}</p>
                  </div>
                </div>

                {selectedCountry.fintechChamber && (
                  <a 
                    href={selectedCountry.fintechChamber.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-lg border border-accent/20 bg-accent/5 hover:bg-accent/10 transition-colors text-xs font-semibold text-accent"
                  >
                    <span>Cámara: {selectedCountry.fintechChamber.name}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </Card>

            {/* Lista de Métodos de Pago Alternativos (APMs) */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-bold tracking-tight flex items-center gap-2">
                  <Globe className="w-4 h-4 text-accent" />
                  Métodos de Pago Clave
                </h4>
                <span className="text-xs text-muted-foreground font-mono">{selectedCountryMethods.length} rieles listados</span>
              </div>

              {selectedCountryMethods.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedCountryMethods.map((method, idx) => (
                    <Card key={idx} className="p-6 border-border bg-background/50 hover:border-accent/40 transition-colors flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{method.logo}</span>
                            <h5 className="font-bold text-base">{method.name}</h5>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary/50 border border-border">{method.type}</span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed font-light">{method.description}</p>
                      </div>

                      <div className="mt-4 pt-4 border-t border-border/60 grid grid-cols-2 gap-2 text-[10px]">
                        <div>
                          <span className="text-muted-foreground block uppercase font-mono">Liquidación:</span>
                          <span className="font-semibold">{method.settlement}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block uppercase font-mono">Comisión Promedio:</span>
                          <span className="font-semibold text-accent">{method.fee}</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-8 border-dashed border-2 border-border flex flex-col items-center justify-center text-center space-y-4">
                  <span className="text-3xl">🏜️</span>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold">No hay métodos alternativos registrados</p>
                    <p className="text-xs text-muted-foreground max-w-xs">Aún estamos recolectando la información oficial del banco central para este país.</p>
                  </div>
                </Card>
              )}

              {/* Supermarket Banners */}
              <div className="p-4 rounded-xl border border-dashed border-accent/30 bg-accent/5 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
                <div className="text-center sm:text-left">
                  <p className="text-xs font-bold text-accent">🏪 ¿Encontraste todo lo que buscabas?</p>
                  <p className="text-[11px] text-muted-foreground font-light">¿Falta algún método de pago clave para {selectedCountry.name}?</p>
                </div>
                <button 
                  onClick={() => suggestContribution('payment')}
                  className="px-3.5 py-1.5 rounded-lg bg-accent text-accent-foreground text-xs font-bold hover:scale-[1.03] transition-transform shadow-sm"
                >
                  Agregar método
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* BIBLIOTECA DE EXPERTOS */}
      <section id="biblioteca" className="py-20 border-t border-border">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Biblioteca de Expertos</h2>
            <p className="text-muted-foreground font-light">
              Explora visualmente los modelos de adquirencia locales y utiliza nuestro diccionario interactivo de terminología de pagos.
            </p>

            {/* Pestañas de Alternancia */}
            <div className="inline-flex p-1 rounded-xl bg-secondary/30 border border-border mt-4">
              <button
                onClick={() => setActiveLibraryTab('ecosistema')}
                className={`px-5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  activeLibraryTab === 'ecosistema'
                    ? 'bg-background text-foreground shadow-sm border border-border'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Quién es Quién (Flujos)
              </button>
              <button
                onClick={() => setActiveLibraryTab('expertos')}
                className={`px-5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  activeLibraryTab === 'expertos'
                    ? 'bg-background text-foreground shadow-sm border border-border'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Expertos
              </button>
              <button
                onClick={() => setActiveLibraryTab('diccionario')}
                className={`px-5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  activeLibraryTab === 'diccionario'
                    ? 'bg-background text-foreground shadow-sm border border-border'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Diccionario de Pagos v6.0
              </button>
            </div>
          </div>

          {/* TAB 1: QUIÉN ES QUIÉN & MODELOS DE FLUJO */}
          {activeLibraryTab === 'ecosistema' && (
            <div className="space-y-12 max-w-6xl mx-auto">
              
              {/* Selector de Modelos */}
              <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl border border-border bg-card/30 gap-4">
                <div>
                  <h4 className="text-sm font-bold">Esquemas de Procesamiento en LATAM</h4>
                  <p className="text-xs text-muted-foreground font-light">Compara cómo viaja el dinero según el modelo regulatorio local.</p>
                </div>
                <div className="flex gap-2 p-1 rounded-lg bg-secondary/20 border border-border">
                  <button 
                    onClick={() => setActiveFlowModel('4partes')}
                    className={`px-3 py-1.5 rounded text-xs font-semibold transition-all ${activeFlowModel === '4partes' ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    4 Partes (Global)
                  </button>
                  <button 
                    onClick={() => setActiveFlowModel('mexico')}
                    className={`px-3 py-1.5 rounded text-xs font-semibold transition-all ${activeFlowModel === 'mexico' ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    Flujo México (Switches locales)
                  </button>
                  <button 
                    onClick={() => setActiveFlowModel('3partes')}
                    className={`px-3 py-1.5 rounded text-xs font-semibold transition-all ${activeFlowModel === '3partes' ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    3 Partes (Cerrados)
                  </button>
                </div>
              </div>

              {/* Visualización del Diagrama de Flujo */}
              <Card className="p-8 border-border bg-background/30 backdrop-blur shadow-inner">
                {activeFlowModel === '4partes' && (
                  <div className="space-y-6">
                    <h5 className="text-sm font-bold text-accent uppercase font-mono tracking-wider">Modelo de 4 Partes (Global)</h5>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
                      <div className="p-4 rounded-xl border border-border bg-secondary/10">
                        <span className="text-xs font-bold block mb-1">1. Comprador</span>
                        <span className="text-[10px] text-muted-foreground">Inicia compra</span>
                      </div>
                      <div className="p-4 rounded-xl border border-border bg-secondary/10">
                        <span className="text-xs font-bold block mb-1">2. Gateway</span>
                        <span className="text-[10px] text-muted-foreground">Cifra y envía</span>
                      </div>
                      <div className="p-4 rounded-xl border border-border bg-secondary/10">
                        <span className="text-xs font-bold block mb-1">3. Adquirente</span>
                        <span className="text-[10px] text-muted-foreground">Procesa arancel</span>
                      </div>
                      <div className="p-4 rounded-xl border border-primary/50 bg-primary/5 shadow-inner">
                        <span className="text-xs font-bold block mb-1 text-primary">4. Red Tarjetas</span>
                        <span className="text-[10px] text-muted-foreground">Visa/MC internacional</span>
                      </div>
                      <div className="p-4 rounded-xl border border-border bg-secondary/10">
                        <span className="text-xs font-bold block mb-1">5. Emisor</span>
                        <span className="text-[10px] text-muted-foreground">Valida fondos</span>
                      </div>
                      <div className="p-4 rounded-xl border border-border bg-secondary/10">
                        <span className="text-xs font-bold block mb-1">6. Liquidación</span>
                        <span className="text-[10px] text-muted-foreground">Comercio cobra</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground font-light leading-relaxed">
                      * El adquirente cobra una **tasa de descuento** al comercio, y le paga una **tasa de intercambio** al banco emisor. La marca de tarjeta actúa como la autopista que unifica la comunicación a nivel internacional.
                    </p>
                  </div>
                )}

                {activeFlowModel === 'mexico' && (
                  <div className="space-y-6">
                    <h5 className="text-sm font-bold text-accent uppercase font-mono tracking-wider">Flujo México (Cámaras de Compensación Domésticas)</h5>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
                      <div className="p-4 rounded-xl border border-border bg-secondary/10">
                        <span className="text-xs font-bold block mb-1">1. Comprador</span>
                        <span className="text-[10px] text-muted-foreground">Checkout tarjeta</span>
                      </div>
                      <div className="p-4 rounded-xl border border-border bg-secondary/10">
                        <span className="text-xs font-bold block mb-1">2. Gateway</span>
                        <span className="text-[10px] text-muted-foreground">Captura de datos</span>
                      </div>
                      <div className="p-4 rounded-xl border border-border bg-secondary/10">
                        <span className="text-xs font-bold block mb-1">3. Adquirente</span>
                        <span className="text-[10px] text-muted-foreground">Banco local</span>
                      </div>
                      <div className="p-4 rounded-xl border border-accent/50 bg-accent/5 shadow-inner">
                        <span className="text-xs font-bold block mb-1 text-accent">4. Switch Local</span>
                        <span className="text-[10px] text-muted-foreground">Prosa / E-Global</span>
                      </div>
                      <div className="p-4 rounded-xl border border-border bg-secondary/10">
                        <span className="text-xs font-bold block mb-1">5. Emisor</span>
                        <span className="text-[10px] text-muted-foreground">Banco mexicano</span>
                      </div>
                      <div className="p-4 rounded-xl border border-border bg-secondary/10">
                        <span className="text-xs font-bold block mb-1">6. SPEI (en efectivo/A2A)</span>
                        <span className="text-[10px] text-muted-foreground">Compensación Banco de México</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground font-light leading-relaxed">
                      <strong>Particularidad de México:</strong> Si las tarjetas son emitidas y adquiridas localmente en México, la transacción no viaja por las redes globales de Visa/MC, sino que se enruta de forma doméstica a través de los switches locales <strong>Prosa</strong> y <strong>E-Global</strong> para su compensación.
                    </p>
                  </div>
                )}

                {activeFlowModel === '3partes' && (
                  <div className="space-y-6">
                    <h5 className="text-sm font-bold text-accent uppercase font-mono tracking-wider">Modelo de 3 Partes (Bucle Cerrado)</h5>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div className="p-4 rounded-xl border border-border bg-secondary/10">
                        <span className="text-xs font-bold block mb-1">1. Tarjetahabiente</span>
                        <span className="text-[10px] text-muted-foreground">Posee tarjeta cerrada</span>
                      </div>
                      <div className="p-4 rounded-xl border border-primary/50 bg-primary/5">
                        <span className="text-xs font-bold block mb-1 text-primary">2. Red / Emisor / Adquirente</span>
                        <span className="text-[10px] text-muted-foreground">Es la misma entidad (ej. AMEX)</span>
                      </div>
                      <div className="p-4 rounded-xl border border-border bg-secondary/10">
                        <span className="text-xs font-bold block mb-1">3. Comercio</span>
                        <span className="text-[10px] text-muted-foreground">Afiliado directo</span>
                      </div>
                      <div className="p-4 rounded-xl border border-border bg-secondary/10">
                        <span className="text-xs font-bold block mb-1">4. Liquidación</span>
                        <span className="text-[10px] text-muted-foreground">Pago directo</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground font-light leading-relaxed">
                      * El esquema de bucle cerrado o de 3 partes significa que una sola empresa actúa como el emisor de la tarjeta, la red de procesamiento y el adquirente de los comercios (históricamente American Express, o Transbank en Chile bajo su antiguo monopolio regulatorio).
                    </p>
                  </div>
                )}
              </Card>

              {/* Grilla de Actores */}
              <div className="space-y-6">
                <h4 className="text-lg font-bold tracking-tight text-center">Los 8 Actores Clave de la Cadena</h4>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {ECOSYSTEM_ACTORS.map(actor => {
                    const isSelected = selectedActorId === actor.id;
                    return (
                      <button
                        key={actor.id}
                        onClick={() => setSelectedActorId(actor.id)}
                        className={`p-5 rounded-xl border text-left flex flex-col justify-between transition-all hover:scale-[1.02] ${
                          isSelected
                            ? 'bg-primary/5 border-primary shadow-sm'
                            : 'bg-background hover:bg-secondary/20 border-border'
                        }`}
                      >
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono text-accent font-semibold block">{actor.role}</span>
                          <h5 className="font-bold text-sm">{actor.title}</h5>
                        </div>
                        <p className={`text-xs font-light mt-3 leading-relaxed border-t pt-3 ${isSelected ? 'text-foreground border-primary/30' : 'text-muted-foreground border-border'}`}>
                          {actor.description}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Crédito Fernando Estévez */}
                <div className="mt-4 flex items-center gap-3 p-4 rounded-xl border border-border bg-secondary/10">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 text-accent font-bold text-sm">FE</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Diagrama de actores y contenidos del glosario basados en el{" "}
                    <strong className="text-foreground">Diccionario de Medios de Pago v6.0 (2026)</strong>{" "}
                    · Colaboración de{" "}
                    <a
                      href="https://www.linkedin.com/in/fernando-estevez-vazquez/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent font-semibold hover:underline"
                    >
                      Fernando Estévez Vázquez ↗
                    </a>
                  </p>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: DICCIONARIO DE PAGOS */}
          {activeLibraryTab === 'diccionario' && (
            <div className="max-w-4xl mx-auto space-y-8">
              
              {/* Buscador */}
              <div className="relative">
                <Search className="w-5 h-5 text-muted-foreground absolute left-4 top-3.5" />
                <input
                  type="text"
                  placeholder="Busca conceptos (ej. contracargo, adquirente, 3DS, tokenización...)"
                  value={searchGlossaryTerm}
                  onChange={(e) => setSearchGlossaryTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-card/40 border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              {/* Lista de Conceptos */}
              <div className="grid sm:grid-cols-2 gap-4">
                {filteredGlossary.map((item, idx) => {
                  const isExpanded = glossaryExpandedTerm === item.term;
                  return (
                    <Card 
                      key={idx} 
                      onClick={() => setGlossaryExpandedTerm(isExpanded ? null : item.term)}
                      className="p-5 border-border bg-background/40 hover:border-accent/30 transition-colors cursor-pointer flex flex-col justify-between space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <h5 className="font-bold text-sm tracking-tight text-foreground">{item.term}</h5>
                        <span className="text-[10px] text-muted-foreground font-mono">{isExpanded ? "Cerrar ▲" : "Ver más ▼"}</span>
                      </div>
                      {isExpanded && (
                        <p className="text-xs text-muted-foreground font-light leading-relaxed border-t border-border/60 pt-3">
                          {item.definition}
                        </p>
                      )}
                    </Card>
                  );
                })}
              </div>

              {/* Supermarket Banners */}
              <div className="p-4 rounded-xl border border-dashed border-accent/30 bg-accent/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <p className="text-xs font-bold text-accent">🏪 ¿Encontraste todo lo que buscabas?</p>
                  <p className="text-[11px] text-muted-foreground font-light">¿Algún concepto de pagos no está en el diccionario o crees que está incorrecto?</p>
                </div>
                <button 
                  onClick={() => suggestContribution('concept')}
                  className="px-3.5 py-1.5 rounded-lg bg-accent text-accent-foreground text-xs font-bold hover:scale-[1.03] transition-transform shadow-sm"
                >
                  Sugerir concepto
                </button>
              </div>

            </div>
          )}

          {/* TAB 3: EXPERTOS */}
          {activeLibraryTab === 'expertos' && (
            <div className="max-w-5xl mx-auto space-y-8">

              {/* Header */}
              <div className="text-center space-y-2 pb-2">
                <p className="text-xs text-muted-foreground font-light max-w-lg mx-auto leading-relaxed">
                  Profesionales con trayectoria real en pagos LATAM. Elige según tu necesidad y conecta directamente.
                </p>
              </div>

              {/* Grid de tarjetas */}
              <div className="grid sm:grid-cols-2 gap-6">
                {EXPERTS.map(expert => (
                  <div key={expert.id} className="rounded-2xl border border-border bg-background/60 hover:border-accent/40 transition-all hover:shadow-lg p-6 flex flex-col gap-5">

                    {/* Cabecera: foto + nombre */}
                    <div className="flex items-center gap-4">
                      <img
                        src={expert.photo}
                        alt={expert.name}
                        className="w-16 h-16 rounded-full object-cover object-top border-2 border-border flex-shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                      <div className="min-w-0">
                        <h4 className="font-bold text-sm leading-tight">{expert.name}</h4>
                        <p className="text-[11px] text-accent font-mono mt-0.5 leading-tight">{expert.title}</p>
                        <span className="text-[10px] text-muted-foreground font-light mt-1 block">{expert.country}</span>
                      </div>
                    </div>

                    {/* Tag de necesidad */}
                    {'need' in expert && (
                      <div className="px-3 py-2 rounded-lg bg-accent/8 border border-accent/20 text-xs text-accent font-semibold">
                        💡 {(expert as any).need}
                      </div>
                    )}

                    {/* Bio */}
                    <p className="text-xs text-muted-foreground font-light leading-relaxed">{expert.bio}</p>

                    {/* Especialidades */}
                    <div className="flex flex-wrap gap-1.5">
                      {expert.specialties.map(s => (
                        <span key={s} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-secondary/50 border border-border text-muted-foreground">{s}</span>
                      ))}
                    </div>

                    {/* Highlights */}
                    <ul className="space-y-1.5">
                      {expert.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <span className="text-accent mt-0.5 flex-shrink-0">✓</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <a
                      href={expert.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-border bg-secondary/20 hover:bg-accent/10 hover:border-accent/40 transition-all text-xs font-semibold text-foreground"
                    >
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current text-accent" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      Conectar en LinkedIn
                    </a>

                  </div>
                ))}
              </div>

              {/* CTA del formulario */}
              <div className="p-5 rounded-2xl border border-dashed border-accent/30 bg-accent/5 flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
                <div>
                  <p className="text-sm font-bold">¿No sabes a quién acudir?</p>
                  <p className="text-xs text-muted-foreground font-light mt-0.5">Llena el formulario y nosotros hacemos el match con el experto correcto para tu caso.</p>
                </div>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); document.querySelector('section.py-20.border-t.border-border.bg-card\\/20')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="flex-shrink-0 px-4 py-2 rounded-xl bg-accent text-accent-foreground text-xs font-bold hover:scale-[1.03] transition-transform shadow-sm"
                >
                  Describir mi necesidad →
                </a>
              </div>

            </div>
          )}

        </div>
      </section>

      {/* COMUNIDAD DE DEBATES (FORO DINE-IN TRPC) */}

      <section id="comunidad" ref={communitySectionRef} className="py-20 border-t border-border bg-secondary/10">
        <div className="container max-w-5xl">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Comunidad de Debates B2B</h2>
            <p className="text-muted-foreground font-light">
              Pregunta conceptos, debate sobre regulaciones, comparte pasarelas de pago y ayuda a construir el mapa abierto de pagos de LATAM.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Formulario Creador de Post */}
            <Card className="p-6 border-border bg-background/70 backdrop-blur h-fit">
              <h3 className="font-bold text-base mb-4 tracking-tight flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-accent" />
                Iniciar nueva discusión
              </h3>

              <form onSubmit={handleCreatePost} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] text-muted-foreground uppercase font-semibold font-mono tracking-wider">Tu Nombre</label>
                  <input
                    type="text"
                    value={postAuthor}
                    onChange={(e) => setPostAuthor(e.target.value)}
                    placeholder="Ej. Antonio G."
                    className="w-full px-3 py-2 rounded-lg bg-secondary/20 border border-border focus:outline-none focus:ring-1 focus:ring-primary text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] text-muted-foreground uppercase font-semibold font-mono tracking-wider">Título de la discusión</label>
                  <input
                    type="text"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    placeholder="Ej. ¿Alguien tiene experiencia integrando PIX Automático?"
                    required
                    className="w-full px-3 py-2 rounded-lg bg-secondary/20 border border-border focus:outline-none focus:ring-1 focus:ring-primary text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[11px] text-muted-foreground uppercase font-semibold font-mono tracking-wider">País Asociado</label>
                    <select
                      value={postCountry}
                      onChange={(e) => setPostCountry(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-secondary/20 border border-border focus:outline-none focus:ring-1 focus:ring-primary text-xs"
                    >
                      <option value="Ninguno">Ninguno</option>
                      {Object.values(COUNTRIES).map(c => (
                        <option key={c.name} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] text-muted-foreground uppercase font-semibold font-mono tracking-wider">Etiqueta (Tag)</label>
                    <select
                      value={postTag}
                      onChange={(e) => setPostTag(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-secondary/20 border border-border focus:outline-none focus:ring-1 focus:ring-primary text-xs"
                    >
                      <option value="Pregunta">Pregunta</option>
                      <option value="Debate">Debate</option>
                      <option value="Sugerencia">Sugerencia</option>
                      <option value="Corrección">Corrección</option>
                      <option value="Opinión">Opinión</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] text-muted-foreground uppercase font-semibold font-mono tracking-wider">Cuerpo del mensaje</label>
                  <textarea
                    value={postBody}
                    onChange={(e) => setPostBody(e.target.value)}
                    placeholder="Escribe aquí los detalles de tu pregunta o aporte técnico..."
                    rows={4}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-secondary/20 border border-border focus:outline-none focus:ring-1 focus:ring-primary text-xs resize-none"
                  />
                </div>

                {postSuccessMessage && (
                  <div className="p-3 text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-lg">
                    {postSuccessMessage}
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-accent hover:bg-accent/95 text-accent-foreground gap-2 font-bold text-xs"
                  disabled={createPostMutation.isPending}
                >
                  {createPostMutation.isPending ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Publicando...
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      Publicar en el Foro
                    </>
                  )}
                </Button>
              </form>
            </Card>

            {/* Listado de Posts del Foro */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Filtros de Ordenamiento y Países */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/80 pb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Ordenar por:</span>
                  <div className="flex gap-1 bg-secondary/30 p-0.5 rounded-lg border border-border">
                    {['hot', 'new', 'top'].map(sortOption => (
                      <button
                        key={sortOption}
                        onClick={() => setActiveSort(sortOption as any)}
                        className={`px-3 py-1 rounded text-[10px] font-bold uppercase transition-all ${
                          activeSort === sortOption 
                            ? 'bg-background text-foreground shadow-sm' 
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {sortOption === 'hot' ? 'Popular' : sortOption === 'new' ? 'Reciente' : 'Top'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Filtrar país:</span>
                  <select
                    value={communityCountryFilter}
                    onChange={(e) => setCommunityCountryFilter(e.target.value)}
                    className="px-2 py-1 bg-background border border-border rounded text-[11px] font-semibold"
                  >
                    <option value="TODOS">Todos</option>
                    {Object.values(COUNTRIES).map(c => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Lista de Publicaciones */}
              {isLoadingPosts ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  <p className="text-xs text-muted-foreground">Cargando discusiones del foro...</p>
                </div>
              ) : filteredPosts.length > 0 ? (
                <div className="space-y-4">
                  {filteredPosts.map((post: any) => {
                    const isCommentsExpanded = expandedCommentsPostId === post.id;
                    return (
                      <Card 
                        key={post.id} 
                        className="p-6 border-border bg-background/50 hover:border-accent/20 transition-all cursor-pointer"
                        onClick={() => setExpandedCommentsPostId(isCommentsExpanded ? null : post.id)}
                      >
                        <div className="flex gap-4 items-start">
                          {/* Botón Upvote */}
                          <button
                            onClick={(e) => handleUpvotePost(post.id, e)}
                            className="p-2 rounded-lg bg-secondary/30 hover:bg-accent/10 hover:text-accent border border-border flex flex-col items-center gap-1 transition-colors group"
                          >
                            <ChevronUp className="w-4 h-4 text-muted-foreground group-hover:text-accent group-hover:translate-y-[-2px] transition-transform" />
                            <span className="text-xs font-bold font-mono">{post.upvotes}</span>
                          </button>

                          {/* Contenido Post */}
                          <div className="flex-1 space-y-3">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-[10px] font-bold uppercase font-mono px-2 py-0.5 rounded bg-accent/20 border border-accent/20 text-accent">{post.tag}</span>
                              {post.country && (
                                <span className="text-[10px] text-muted-foreground font-mono flex items-center gap-1">
                                  📍 {post.country}
                                </span>
                              )}
                              <span className="text-[10px] text-muted-foreground font-mono ml-auto">
                                Por {post.author} ({post.authorTitle})
                              </span>
                            </div>

                            <h4 className="font-bold text-base tracking-tight hover:text-accent transition-colors">{post.title}</h4>
                            <p className="text-xs text-muted-foreground leading-relaxed font-light">{post.body}</p>

                            <div className="flex items-center justify-between pt-2 text-[10px] text-muted-foreground font-mono border-t border-border/40">
                              <span>Hace unas horas</span>
                              <span className="text-accent font-semibold flex items-center gap-1">
                                <MessageSquare className="w-3.5 h-3.5" />
                                {isCommentsExpanded ? "Ocultar respuestas" : "Ver respuestas"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Caja de Comentarios Expandidos */}
                        {isCommentsExpanded && (
                          <div 
                            className="mt-6 pt-6 border-t border-border space-y-4 cursor-default"
                            onClick={(e) => e.stopPropagation()} // Prevenir burbujeo para no cerrar el card
                          >
                            <h5 className="text-xs font-bold text-accent uppercase font-mono tracking-wider">Respuestas de expertos</h5>

                            <div className="space-y-3">
                              {activeComments.length > 0 ? (
                                activeComments.map((comment: any) => (
                                  <div key={comment.id} className="p-3.5 rounded-lg bg-secondary/15 border border-border flex flex-col gap-1.5">
                                    <div className="flex justify-between items-center text-[10px] text-muted-foreground font-mono">
                                      <span className="font-bold text-foreground">💬 {comment.author}</span>
                                      <span>Hace poco</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground font-light leading-relaxed">{comment.body}</p>
                                  </div>
                                ))
                              ) : (
                                <p className="text-xs text-muted-foreground font-light italic">No hay comentarios en este hilo. ¡Sé el primero en aportar!</p>
                              )}
                            </div>

                            {/* Creador de comentarios */}
                            <div className="pt-4 border-t border-border/40 space-y-3">
                              <div className="grid grid-cols-2 gap-3">
                                <input
                                  type="text"
                                  placeholder="Tu nombre (opcional)"
                                  value={newCommentAuthor}
                                  onChange={(e) => setNewCommentAuthor(e.target.value)}
                                  className="px-3 py-1.5 rounded bg-secondary/20 border border-border text-xs focus:outline-none focus:ring-1 focus:ring-accent"
                                />
                                <button
                                  onClick={() => handleAddComment(post.id)}
                                  className="bg-accent text-accent-foreground font-bold text-xs rounded hover:scale-[1.02] transition-transform py-1.5"
                                >
                                  Responder
                                </button>
                              </div>
                              <textarea
                                placeholder="Escribe tu respuesta técnica aquí..."
                                rows={2}
                                value={newCommentBody}
                                onChange={(e) => setNewCommentBody(e.target.value)}
                                className="w-full px-3 py-2 rounded bg-secondary/20 border border-border text-xs focus:outline-none focus:ring-1 focus:ring-accent resize-none"
                              />
                            </div>
                          </div>
                        )}
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <Card className="p-12 border-dashed border-2 border-border flex flex-col items-center justify-center text-center space-y-4">
                  <span className="text-4xl">💬</span>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold">Aún no hay discusiones para este país</p>
                    <p className="text-xs text-muted-foreground max-w-xs">¡Sé el primero en iniciar un debate haciendo clic en el creador de publicaciones!</p>
                  </div>
                </Card>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* FORMULARIO DE INTAKE — ENCUENTRA TU SOLUCIÓN */}
      <section className="py-20 border-t border-border bg-card/20">
        <div className="container max-w-3xl">
          <div className="text-center space-y-3 mb-12">
            <span className="text-[10px] font-mono text-accent tracking-widest uppercase">Matching de Soluciones · Gratuito</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">¿Buscas una solución de pagos?</h2>
            <p className="text-muted-foreground font-light max-w-xl mx-auto leading-relaxed">
              Cuéntanos tu necesidad y nuestro equipo — con acceso directo a <strong className="text-foreground">Toku, Netpay, Broxel y más PSPs</strong> — te conecta con la mejor opción en menos de 48h. Sin intermediarios, sin costo.
            </p>
          </div>

          {intakeSubmitted ? (
            <div className="p-10 rounded-2xl border border-accent/20 bg-accent/5 text-center space-y-4">
              <span className="text-4xl">✅</span>
              <h3 className="font-bold text-xl">¡Solicitud recibida!</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">Nuestro equipo revisará tu caso y te contactará en menos de 48 horas con opciones concretas.</p>
              <button onClick={() => setIntakeSubmitted(false)} className="text-xs text-accent hover:underline mt-2">Enviar otra solicitud</button>
            </div>
          ) : (
            <form onSubmit={handleIntakeSubmit} className="space-y-8">

              {/* Tipo de solución */}
              <div className="space-y-3">
                <label className="text-sm font-semibold block">¿Qué tipo de solución buscas? <span className="text-muted-foreground font-normal">(selecciona todas las que apliquen)</span></label>
                <div className="flex flex-wrap gap-2">
                  {["Gateway de Pagos","Adquirencia / Terminal","KYC / Onboarding B2B","Prevención de Fraude Automatizada","Factoraje","Compliance / Regulatorio","Wallet / Dispersión","Data Analytics para Pagos","BNPL","Open Finance","Bóveda de Tokens Segura","Otro"].map(s => (
                    <button type="button" key={s}
                      onClick={() => toggleIntakeMulti(intakeService, s, setIntakeService)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                        intakeService.includes(s)
                          ? 'bg-accent text-accent-foreground border-accent'
                          : 'bg-background border-border text-muted-foreground hover:border-accent/50'
                      }`}>{s}</button>
                  ))}
                </div>
              </div>
              {/* Desafíos / Dolores */}
              <div className="space-y-3">
                <label className="text-sm font-semibold block">¿Cuál es tu desafío principal? <span className="text-muted-foreground font-normal">(selecciona los más críticos)</span></label>
                <div className="flex flex-wrap gap-2">
                  {["Prevención de Fraude e Identidad Sintética","Cumplimiento Normativo / Riesgo","Aprobaciones bajas (Falsos positivos)","Orquestación y Analítica de Datos","Costos de Procesamiento","Escalabilidad e Infraestructura"].map(p => (
                    <button type="button" key={p}
                      onClick={() => toggleIntakeMulti(intakePainPoints, p, setIntakePainPoints)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                        intakePainPoints.includes(p)
                          ? 'bg-accent text-accent-foreground border-accent'
                          : 'bg-background border-border text-muted-foreground hover:border-accent/50'
                      }`}>{p}</button>
                  ))}
                </div>
              </div>

              {/* Mercados */}
              <div className="space-y-3">
                <label className="text-sm font-semibold block">¿En qué mercados operas?</label>
                <div className="flex flex-wrap gap-2">
                  {["🇲🇽 México","🇧🇷 Brasil","🇨🇴 Colombia","🇦🇷 Argentina","🇨🇱 Chile","🇵🇪 Perú","🌎 Toda LATAM","🌐 Internacional"].map(m => (
                    <button type="button" key={m}
                      onClick={() => toggleIntakeMulti(intakeMarkets, m, setIntakeMarkets)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                        intakeMarkets.includes(m)
                          ? 'bg-primary/10 text-foreground border-primary'
                          : 'bg-background border-border text-muted-foreground hover:border-primary/40'
                      }`}>{m}</button>
                  ))}
                </div>
              </div>

              {/* Tipo de empresa + Volumen */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-sm font-semibold block">Tipo de empresa</label>
                  <select
                    value={intakeCompanyType}
                    onChange={e => setIntakeCompanyType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  >
                    <option value="">Selecciona...</option>
                    {["SaaS","eCommerce","Marketplace","Fintech / Startup","Empresa tradicional","Institución financiera","Otro"].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-semibold block">Volumen mensual estimado</label>
                  <select
                    value={intakeVolume}
                    onChange={e => setIntakeVolume(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  >
                    <option value="">Selecciona...</option>
                    {["Menos de $10K USD","$10K – $100K USD","$100K – $1M USD","Más de $1M USD","Aún no lo sé"].map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Descripción libre */}
              <div className="space-y-3">
                <label className="text-sm font-semibold block">Cuéntanos tu necesidad <span className="text-muted-foreground font-normal">(en tus palabras, como lo harías por WhatsApp)</span></label>
                <textarea
                  required
                  rows={4}
                  placeholder="Ej: Somos un marketplace en México y Colombia. Procesamos ~$50K al mes con tarjeta pero nuestra tasa de rechazo es muy alta. Necesitamos un adquirente con mejor aprobación local y soporte para pagos en efectivo..."
                  value={intakeDescription}
                  onChange={e => setIntakeDescription(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none leading-relaxed"
                />
              </div>

              {/* Contacto */}
              <div className="space-y-3">
                <label className="text-sm font-semibold block">¿Cómo te contactamos? <span className="text-muted-foreground font-normal">(email o WhatsApp)</span></label>
                <input
                  required
                  type="text"
                  placeholder="tu@email.com o +52 55 1234 5678"
                  value={intakeContact}
                  onChange={e => setIntakeContact(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <p className="text-[11px] text-muted-foreground">
                  🔒 Tu información es confidencial. No compartimos datos sin tu autorización.
                </p>
                <Button type="submit" size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-8 w-full sm:w-auto">
                  Enviar solicitud →
                </Button>
              </div>

            </form>
          )}
        </div>
      </section>

      {/* REGISTRO AL NEWSLETTER REAL */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10 border-t border-border">
        <div className="container max-w-2xl text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Recibe la señal de los pagos en LATAM</h2>
          <p className="text-muted-foreground font-light leading-relaxed">
            Únete a más de 5,000 profesionales de producto, RevOps y fintech que leen nuestro boletín semanal curado sobre regulaciones, API y nuevos rieles de cobro locales.
          </p>

          {newsletterSuccess ? (
            <div className="p-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-500 max-w-md mx-auto space-y-2">
              <h4 className="font-bold text-base flex items-center justify-center gap-2">
                <Check className="w-5 h-5" />
                ¡Suscripción completa!
              </h4>
              <p className="text-xs">Te enviaremos el próximo boletín el lunes a primera hora. ¡Bienvenido al ecosistema!</p>
            </div>
          ) : (
            <form onSubmit={handleSubscribeNewsletter} className="flex flex-col sm:flex-row gap-3 pt-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="tu@email.com"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
              />
              <Button 
                type="submit" 
                size="lg" 
                className="bg-primary hover:bg-primary/95 text-white font-bold"
                disabled={subscribeMutation.isPending}
              >
                {subscribeMutation.isPending ? "Procesando..." : "Suscribirse"}
              </Button>
            </form>
          )}
          {newsletterError && (
            <p className="text-xs text-destructive">{newsletterError}</p>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-12 bg-card/40">
        <div className="container text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="font-bold text-base">OnlyPayments</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary/80 border border-border text-muted-foreground font-mono">2026</span>
          </div>
          <p className="text-xs text-muted-foreground font-light max-w-md mx-auto">
            Datos basados en el Diccionario de Medios de Pago v6.0 y regulaciones de los Bancos Centrales de América Latina.
          </p>
          <div className="text-[10px] text-muted-foreground/60">
            &copy; 2026 OnlyPayments. Todos los derechos reservados.
          </div>
        </div>
      </footer>

    </div>
  );
}
