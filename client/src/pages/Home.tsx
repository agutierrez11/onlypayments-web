import React, { useState, useEffect, useMemo, useRef } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
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
import { HeroParallax } from "@/components/HeroParallax";
import { EcosystemDirectory } from "@/components/EcosystemDirectory";
import { EcosystemFlows } from "@/components/EcosystemFlows";
import { AssessmentQuiz } from "@/components/AssessmentQuiz";
import FintechGlobe from "@/components/FintechGlobe";

export default function Home() {
  const { user } = useAuth();
  const [, navigate] = useLocation();

  // Estados generales
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [selectedCountryKey, setSelectedCountryKey] = useState<string>("MX");

  // Biblioteca de Expertos Tabs
  const [activeLibraryTab, setActiveLibraryTab] = useState<'ecosistema' | 'diccionario' | 'expertos'>('ecosistema');
  
  // Diccionario
  const [searchGlossaryTerm, setSearchGlossaryTerm] = useState<string>("");
  const [glossaryExpandedTerm, setGlossaryExpandedTerm] = useState<string | null>(null);

  // Directorio de Proveedores
  const [providerSearchQuery, setProviderSearchQuery] = useState<string>("");

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
  const [intakeIsSubmitting, setIntakeIsSubmitting] = useState(false);

  const toggleIntakeMulti = (arr: string[], val: string, setter: (v: string[]) => void) => {
    setter(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);
  };

  const handleIntakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIntakeIsSubmitting(true);
    setTimeout(() => {
      setIntakeIsSubmitting(false);
      setIntakeSubmitted(true);
    }, 1500);
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

  // Manejar modo oscuro en HTML (Forzado a siempre oscuro para estética premium)
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

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

  // Scroll tracking para el fondo parallax: cada blob decorativo se mueve a
  // una velocidad distinta respecto al scroll para dar sensación de profundidad.
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="min-h-screen text-foreground font-sans transition-colors duration-300">
      {/* FONDO PARALLAX GLOBAL — capa fija con blobs de color y grid de puntos,
          cada elemento se desplaza a distinta velocidad al hacer scroll. */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -left-32 w-[550px] h-[550px] rounded-full bg-primary/15 blur-3xl"
          style={{ transform: `translate3d(0, ${scrollY * 0.08}px, 0)` }}
        />
        <div
          className="absolute top-1/4 -right-40 w-[480px] h-[480px] rounded-full bg-accent/15 blur-3xl"
          style={{ transform: `translate3d(0, ${scrollY * -0.12}px, 0)` }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[420px] h-[420px] rounded-full bg-primary/10 blur-3xl"
          style={{ transform: `translate3d(0, ${scrollY * 0.15}px, 0)` }}
        />
        <div
          className="absolute top-2/3 right-1/3 w-[350px] h-[350px] rounded-full bg-accent/10 blur-3xl"
          style={{ transform: `translate3d(0, ${scrollY * -0.06}px, 0)` }}
        />
        <div
          className="absolute inset-0 opacity-[0.35] [background-image:radial-gradient(circle,var(--border)_1px,transparent_1px)] [background-size:28px_28px]"
          style={{ transform: `translate3d(0, ${scrollY * 0.03}px, 0)` }}
        />
      </div>
      
      {/* HEADER / NAVIGATION */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border relative">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-primary-foreground font-bold text-sm font-mono">OP</span>
            </div>
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">OnlyPayments</span>
            <span className="text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded bg-accent/20 text-accent font-semibold font-mono border border-accent/20">GLOBAL</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6">
              <a href="#explorador" className="text-sm font-medium hover:text-accent transition-colors">Explorador</a>
              <a href="#biblioteca" className="text-sm font-medium hover:text-accent transition-colors">Biblioteca de Expertos</a>
              <a href="#comunidad" className="text-sm font-medium hover:text-accent transition-colors">Comunidad</a>
              <button onClick={() => navigate('/remesas')} className="text-sm font-bold text-primary hover:text-primary/80 transition-colors">
                Remesas
              </button>
            </div>

            <div className="flex items-center gap-3 border-l border-border pl-3">
              {/* Botón modo claro/oscuro eliminado para forzar estética dark premium */}


              {user ? (
                <Button variant="outline" size="sm" onClick={() => navigate("/dashboard")} className="hidden sm:inline-flex border-white/20 text-white hover:bg-white/10">
                  Mi Dashboard
                </Button>
              ) : (
                <Button size="sm" onClick={startLogin} className="hidden sm:inline-flex bg-white text-black hover:bg-white/90 font-semibold shadow-sm">
                  Ingresar
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <HeroParallax 
        onExplore={() => {
          document.getElementById('explorador')?.scrollIntoView({ behavior: 'smooth' })
        }}
        onRemittances={() => navigate('/remesas')}
        onCommunity={() => {
          document.getElementById('comunidad')?.scrollIntoView({ behavior: 'smooth' })
        }}
      />

      {/* GLOBO INTERACTIVO FINTECH */}
      <section className="relative z-10 py-12 border-t border-border bg-background/80 backdrop-blur-md">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-10 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text">Cobertura Global Fintech</h2>
            <p className="text-muted-foreground font-light">
              Explora de forma interactiva el posicionamiento de miles de empresas Fintech alrededor del mundo.
            </p>
          </div>
          
          <div className="w-full h-[600px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-primary/5">
            <FintechGlobe />
          </div>
        </div>
      </section>
      
      {/* EcosystemDirectory has been redesigned to a compact list instead of huge cards */}
      <EcosystemDirectory />

      {/* BIBLIOTECA DE EXPERTOS */}
      <section id="biblioteca" className="relative z-10 py-20 border-t border-border bg-background/60 backdrop-blur-[2px]">
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
            <div className="space-y-6 max-w-4xl mx-auto text-center">
              <Card className="p-12 border-border bg-background/50 backdrop-blur-xl border-accent/20 shadow-[0_0_50px_rgba(var(--accent),0.1)] relative overflow-hidden group cursor-pointer hover:border-accent/50 transition-all" onClick={() => navigate('/latam-dashboard')}>
                <div className="absolute inset-0 bg-accent/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                <div className="relative z-10 space-y-6">
                  <div className="w-20 h-20 mx-auto bg-accent/20 rounded-2xl flex items-center justify-center border border-accent/30 group-hover:scale-110 transition-transform duration-500">
                    <Globe className="w-10 h-10 text-accent" />
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-4 bg-accent/10 text-accent border-accent/20">NUEVO v3.0</Badge>
                    <h3 className="text-3xl font-extrabold mb-4 text-foreground">Latam Fintech Dashboard</h3>
                    <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                      Explora el modelo interactivo de 4 partes, datos de iGaming, Remesas y Regulación de 20 países en LATAM.
                    </p>
                  </div>
                  <Button className="bg-accent text-accent-foreground font-bold hover:bg-accent/90" size="lg" onClick={(e) => { e.stopPropagation(); navigate('/latam-dashboard'); }}>
                    Abrir Dashboard Interactivo <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </Card>
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
                      className="p-5 border-border/50 bg-background/60 backdrop-blur-sm hover:bg-foreground/[0.02] hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between space-y-2 shadow-sm"
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
                  Profesionales con trayectoria real en la industria de pagos. Elige según tu necesidad y conecta directamente.
                </p>
              </div>

              {/* Grid de tarjetas */}
              <div className="grid sm:grid-cols-2 gap-6">
                {EXPERTS.map(expert => (
                  <div key={expert.id} className="rounded-2xl border border-border/50 bg-background/60 backdrop-blur-md hover:bg-foreground/[0.02] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 p-6 flex flex-col gap-5">

                    {/* Cabecera: foto + nombre */}
                    <div className="flex items-center gap-4">
                      <img
                        src={expert.photo}
                        alt={expert.name}
                        className="w-16 h-16 rounded-full object-cover object-center border-2 border-border flex-shrink-0 bg-secondary/50"
                        onError={(e) => {
                          // Fallback si la imagen no carga
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(expert.name)}&background=random`;
                        }}
                      />
                      <div className="min-w-0">
                        <h4 className="font-bold text-sm leading-tight text-white">{expert.name}</h4>
                        <p className="text-[11px] text-white/60 font-mono mt-0.5 leading-tight">{expert.title}</p>
                        <span className="text-[10px] text-white/50 font-light mt-1 block">{expert.country}</span>
                      </div>
                    </div>

                    {/* Tag de necesidad */}
                    {'need' in expert && (
                      <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white/90 font-medium">
                        💡 {(expert as any).need}
                      </div>
                    )}

                    {/* Bio */}
                    <p className="text-xs text-white/70 font-light leading-relaxed">{expert.bio}</p>

                    {/* Especialidades */}
                    <div className="flex flex-wrap gap-1.5">
                      {expert.specialties.map(s => (
                        <span key={s} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/60">{s}</span>
                      ))}
                    </div>

                    {/* Highlights */}
                    <ul className="space-y-1.5">
                      {expert.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-white/70">
                          <Check className="w-3.5 h-3.5 text-white/40 mt-0.5 shrink-0" />
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

      <section id="comunidad" ref={communitySectionRef} className="relative z-10 py-20 border-t border-border bg-secondary/10 backdrop-blur-[2px]">
        <div className="container max-w-5xl">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Comunidad de Debates B2B</h2>
            <p className="text-muted-foreground font-light">
              Pregunta conceptos, debate sobre regulaciones, comparte pasarelas de pago y ayuda a construir el mapa abierto de pagos global.
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
      <section className="relative z-10 py-20 border-t border-border bg-card/20 backdrop-blur-[2px]">
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
                  {["🇲🇽 México","🇧🇷 Brasil","🇨🇴 Colombia","🇦🇷 Argentina","🇨🇱 Chile","🇵🇪 Perú","🇪🇺 Europa","🇺🇸 EE.UU.","🌎 Global"].map(m => (
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
                <Button type="submit" size="lg" disabled={intakeIsSubmitting} className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-8 w-full sm:w-auto">
                  {intakeIsSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      Enviar solicitud →
                    </>
                  )}
                </Button>
              </div>

            </form>
          )}
        </div>
      </section>

      {/* LEAD MAGNET: ASSESSMENT QUIZ */}
      <AssessmentQuiz />

      {/* REGISTRO AL NEWSLETTER REAL */}
      <section className="relative z-10 py-20 bg-gradient-to-r from-primary/10 to-accent/10 border-t border-border backdrop-blur-[2px]">
        <div className="container max-w-2xl text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Recibe la señal de los pagos B2B</h2>
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

      {/* FOOTER: MARCO LEGAL Y TRANSPARENCIA */}
      <footer className="relative z-10 border-t border-border py-16 bg-card/40 backdrop-blur-[2px]">
        <div className="container space-y-16">
          
          <div className="space-y-8 max-w-6xl mx-auto">
            <div className="text-center space-y-2">
              <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">Marco Legal y Transparencia</h4>
              <p className="text-xs text-muted-foreground">Operamos e informamos en estricto cumplimiento con los reguladores financieros de la región.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs text-muted-foreground">
              {/* Chile */}
              <div className="space-y-3 p-5 rounded-2xl border border-border/50 bg-background/50 hover:bg-background transition-colors shadow-sm">
                <div className="flex items-center gap-2 font-bold text-foreground text-sm">
                  <span className="text-lg">🇨🇱</span> CMF Chile & Banco Central
                </div>
                <p className="leading-relaxed">Operación bajo normativa de Tasas de Intercambio reguladas por la CMF y el Banco Central de Chile.</p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <a href="https://cmfchile.cl" target="_blank" rel="noopener noreferrer" className="font-medium text-foreground hover:text-primary transition-colors underline decoration-border underline-offset-4">CMF Chile ↗</a>
                  <a href="https://bcentral.cl" target="_blank" rel="noopener noreferrer" className="font-medium text-foreground hover:text-primary transition-colors underline decoration-border underline-offset-4">Banco Central ↗</a>
                </div>
              </div>
              
              {/* Mexico */}
              <div className="space-y-3 p-5 rounded-2xl border border-border/50 bg-background/50 hover:bg-background transition-colors shadow-sm">
                <div className="flex items-center gap-2 font-bold text-foreground text-sm">
                  <span className="text-lg">🇲🇽</span> Banxico & CNBV
                </div>
                <p className="leading-relaxed">Cumplimiento con las disposiciones de Cuotas de Intercambio del Banco de México (Banxico) y la CNBV.</p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <a href="https://banxico.org.mx" target="_blank" rel="noopener noreferrer" className="font-medium text-foreground hover:text-primary transition-colors underline decoration-border underline-offset-4">Banxico ↗</a>
                </div>
              </div>

              {/* Brasil */}
              <div className="space-y-3 p-5 rounded-2xl border border-border/50 bg-background/50 hover:bg-background transition-colors shadow-sm">
                <div className="flex items-center gap-2 font-bold text-foreground text-sm">
                  <span className="text-lg">🇧🇷</span> Banco Central do Brasil
                </div>
                <p className="leading-relaxed">Institución de pago conforme a la regulación de Arranjos de Pagamento del Banco Central do Brasil (BCB).</p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <a href="https://bcb.gov.br" target="_blank" rel="noopener noreferrer" className="font-medium text-foreground hover:text-primary transition-colors underline decoration-border underline-offset-4">BCB ↗</a>
                </div>
              </div>

              {/* Colombia */}
              <div className="space-y-3 p-5 rounded-2xl border border-border/50 bg-background/50 hover:bg-background transition-colors shadow-sm">
                <div className="flex items-center gap-2 font-bold text-foreground text-sm">
                  <span className="text-lg">🇨🇴</span> SFC & Banco de la República
                </div>
                <p className="leading-relaxed">Adherido al Sistema de Pagos de Bajo Valor supervisado por la Superintendencia Financiera de Colombia (SFC).</p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <a href="https://superfinanciera.gov.co" target="_blank" rel="noopener noreferrer" className="font-medium text-foreground hover:text-primary transition-colors underline decoration-border underline-offset-4">SFC ↗</a>
                </div>
              </div>

              {/* Argentina */}
              <div className="space-y-3 p-5 rounded-2xl border border-border/50 bg-background/50 hover:bg-background transition-colors shadow-sm">
                <div className="flex items-center gap-2 font-bold text-foreground text-sm">
                  <span className="text-lg">🇦🇷</span> BCRA
                </div>
                <p className="leading-relaxed">Proveedor de Servicios de Pago (PSP) registrado ante el BCRA y compatible con Transferencias 3.0.</p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <a href="https://www.bcra.gob.ar/transferencias-3-0/" target="_blank" rel="noopener noreferrer" className="font-medium text-foreground hover:text-primary transition-colors underline decoration-border underline-offset-4">Transferencias 3.0 ↗</a>
                  <a href="https://bcra.gob.ar" target="_blank" rel="noopener noreferrer" className="font-medium text-foreground hover:text-primary transition-colors underline decoration-border underline-offset-4">Registro PSP ↗</a>
                </div>
              </div>

              {/* Perú */}
              <div className="space-y-3 p-5 rounded-2xl border border-border/50 bg-background/50 hover:bg-background transition-colors shadow-sm">
                <div className="flex items-center gap-2 font-bold text-foreground text-sm">
                  <span className="text-lg">🇵🇪</span> BCRP
                </div>
                <p className="leading-relaxed">Operaciones interoperables bajo los lineamientos del Banco Central de Reserva del Perú (BCRP).</p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <a href="https://bcrp.gob.pe" target="_blank" rel="noopener noreferrer" className="font-medium text-foreground hover:text-primary transition-colors underline decoration-border underline-offset-4">BCRP ↗</a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border/40 pt-8 mt-12 text-center space-y-5">
            <div className="flex items-center justify-center gap-2">
              <span className="font-bold text-base">OnlyPayments</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary/80 border border-border text-muted-foreground font-mono">2026</span>
            </div>
            
            <p className="text-xs text-muted-foreground font-light max-w-lg mx-auto leading-relaxed">
              Datos curados a partir del Diccionario de Medios de Pago v6.0, normativas de Bancos Centrales globales y reportes públicos del ecosistema fintech.
            </p>
            
            <div className="text-[10px] text-muted-foreground/60 flex items-center justify-center gap-4 flex-wrap">
              <span>&copy; 2026 OnlyPayments.</span>
              <span>Directorio informativo y educativo.</span>
              <span>Las marcas comerciales listadas pertenecen a sus respectivos dueños.</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
