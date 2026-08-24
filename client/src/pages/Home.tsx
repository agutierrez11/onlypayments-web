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
  Menu,
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
import LatamFintechGISRadar from "@/components/LatamFintechGISRadar";
import EditorialParallaxShowcase from "@/components/EditorialParallaxShowcase";
import { FinancialTelemetryDashboard } from "@/components/FinancialTelemetryDashboard";
import { B2BGraphNetwork } from "@/components/B2BGraphNetwork";
import { SEO } from "@/components/SEO";

export default function Home() {
  const { user } = useAuth();
  const [, navigate] = useLocation();

  // Estados generales
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [selectedCountryKey, setSelectedCountryKey] = useState<string>("MX");

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -85;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Biblioteca de Expertos Tabs
  const [activeLibraryTab, setActiveLibraryTab] = useState<'ecosistema' | 'diccionario' | 'expertos'>(() => {
    if (typeof window !== 'undefined' && window.location.hash.toLowerCase().includes('diccionario')) {
      return 'diccionario';
    }
    return 'ecosistema';
  });
  
  // URL Hash Sync for deep linking (#diccionario, #matcher, #ecosistema, #biblioteca)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase().replace('#', '');
      if (hash === 'diccionario') {
        setActiveLibraryTab('diccionario');
        setTimeout(() => scrollToSection('biblioteca'), 150);
      } else if (hash === 'ecosistema') {
        setActiveLibraryTab('ecosistema');
        setTimeout(() => scrollToSection('biblioteca'), 150);
      } else if (hash === 'expertos') {
        setActiveLibraryTab('expertos');
        setTimeout(() => scrollToSection('biblioteca'), 150);
      } else if (hash === 'matcher') {
        setTimeout(() => scrollToSection('matcher-section'), 150);
      } else if (hash === 'biblioteca') {
        setTimeout(() => scrollToSection('biblioteca'), 150);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  
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
      <SEO 
        title="OnlyPayments — El Ecosistema Desnudo de Pagos LATAM" 
        description="Orquesta tu infraestructura técnica. Analiza stacks reales. Simula márgenes. El framework B2B definitivo para dominar los pagos en LATAM." 
      />
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
      
      {/* HEADER / NAVIGATION — VIBRANT LIGHT */}
      <nav className="sticky top-0 z-[100] bg-[#FFFFFF] border-b border-[#E5E6EA] shadow-xs text-[#000000]">
        <div className="max-w-[1296px] mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 rounded-[8px] bg-[#0000EE] flex items-center justify-center text-white font-mono font-black text-xs">
              OP
            </div>
            <span className="font-black text-lg tracking-tight text-[#000000]">OnlyPayments</span>
            <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-[2px] bg-[#E5E6EA] text-[#000000] font-bold font-mono">GLOBAL</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-5">
              <button onClick={() => scrollToSection('explorador')} className="text-sm font-bold text-[#000000] hover:text-[#0000EE] transition-colors duration-[0.12s] cursor-pointer">
                Explorador
              </button>
              <button onClick={() => scrollToSection('biblioteca')} className="text-sm font-bold text-[#000000] hover:text-[#0000EE] transition-colors duration-[0.12s] cursor-pointer">
                Biblioteca de Expertos
              </button>
              <button onClick={() => scrollToSection('comunidad')} className="text-sm font-bold text-[#000000] hover:text-[#0000EE] transition-colors duration-[0.12s] cursor-pointer">
                Comunidad
              </button>
              <button onClick={() => navigate('/remesas')} className="text-sm font-bold text-[#000000] hover:text-[#0000EE] transition-colors duration-[0.12s] cursor-pointer">
                Remesas
              </button>
              <button onClick={() => navigate('/hardware-pos')} className="text-sm font-extrabold text-[#0000EE] hover:text-[#0000BE] transition-colors duration-[0.12s] cursor-pointer flex items-center gap-1.5">
                <span>SmartPOS & Hardware</span>
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-[2px] bg-[#E5E6EA] text-[#0000EE]">NUEVO</span>
              </button>
              <button onClick={() => navigate('/latam-dashboard')} className="text-sm font-bold text-[#000000] hover:text-[#0000EE] transition-colors duration-[0.12s] cursor-pointer">
                Radar Latam
              </button>
              <button onClick={() => navigate('/b2b-intros')} className="text-sm font-bold text-white bg-[#0000EE] hover:bg-[#0000BE] px-4 py-1.5 rounded-[12px] transition-all duration-[0.12s] flex items-center gap-1.5 cursor-pointer">
                <Zap className="w-3.5 h-3.5 text-white fill-white" />
                Intros B2B
              </button>
            </div>

            <div className="flex items-center gap-2">
              {user ? (
                <Button variant="outline" size="sm" onClick={() => navigate("/dashboard")} className="hidden sm:inline-flex border-[#E5E6EA] text-[#000000] hover:bg-[#F3F3F4] rounded-[12px]">
                  Mi Dashboard
                </Button>
              ) : (
                <Button size="sm" onClick={startLogin} className="hidden sm:inline-flex bg-[#0000EE] text-white hover:bg-[#0000BE] font-bold rounded-[12px] px-4">
                  Ingresar
                </Button>
              )}

              {/* Botón de Menú Móvil */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-[8px] text-[#000000] hover:bg-[#F3F3F4] border border-[#E5E6EA]"
                aria-label="Abrir menú"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-[#0000EE]" /> : <Menu className="w-5 h-5 text-[#0000EE]" />}
              </button>
            </div>
          </div>
        </div>

        {/* Menú Desplegable Móvil */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FFFFFF] border-b border-[#E5E6EA] px-4 py-4 space-y-2 text-[#000000]">
            <button 
              onClick={() => scrollToSection('explorador')} 
              className="w-full text-left px-3 py-2 text-sm font-medium text-[#000000] hover:bg-[#F3F3F4] rounded-[8px] flex items-center justify-between"
            >
              <span>Explorador</span>
              <span className="text-xs text-[#0000EE] font-mono">→</span>
            </button>
            <button 
              onClick={() => scrollToSection('biblioteca')} 
              className="w-full text-left px-3 py-2 text-sm font-medium text-[#000000] hover:bg-[#F3F3F4] rounded-[8px] flex items-center justify-between"
            >
              <span>Biblioteca de Expertos</span>
              <span className="text-xs text-[#0000EE] font-mono">→</span>
            </button>
            <button 
              onClick={() => scrollToSection('comunidad')} 
              className="w-full text-left px-3 py-2 text-sm font-medium text-[#000000] hover:bg-[#F3F3F4] rounded-[8px] flex items-center justify-between"
            >
              <span>Comunidad</span>
              <span className="text-xs text-[#0000EE] font-mono">→</span>
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); navigate('/remesas'); }} 
              className="w-full text-left px-3 py-2 text-sm font-bold text-[#000000] hover:bg-[#F3F3F4] rounded-[8px] flex items-center justify-between"
            >
              <span>Remesas</span>
              <span className="text-xs text-[#0000EE] font-mono">→</span>
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); navigate('/hardware-pos'); }} 
              className="w-full text-left px-3 py-2 text-sm font-bold text-[#0000EE] hover:bg-[#F3F3F4] rounded-[8px] flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <span>SmartPOS & Hardware</span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-[2px] bg-[#E5E6EA] text-[#0000EE]">NUEVO</span>
              </span>
              <span className="text-xs text-[#0000EE] font-mono">→</span>
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); navigate('/latam-dashboard'); }} 
              className="w-full text-left px-3 py-2 text-sm font-bold text-[#000000] hover:bg-[#F3F3F4] rounded-[8px] flex items-center justify-between"
            >
              <span>Radar Latam</span>
              <span className="text-xs text-[#0000EE] font-mono">→</span>
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); navigate('/b2b-intros'); }} 
              className="w-full text-left px-3 py-2 text-sm font-bold text-white bg-[#0000EE] rounded-[8px] flex items-center justify-between"
            >
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-white" />
                Intros B2B
              </span>
              <span className="text-xs text-white font-mono">→</span>
            </button>
          </div>
        )}
      </nav>

      <HeroParallax 
        onExplore={() => {
          document.getElementById('matcher-section')?.scrollIntoView({ behavior: 'smooth' })
        }}
        onApis={() => navigate('/latam-dashboard')}
        onRemittances={() => navigate('/remesas')}
        onCommunity={() => {
          document.getElementById('comunidad')?.scrollIntoView({ behavior: 'smooth' })
        }}
      />

      {/* SECCIÓN PROMINENTE 1: TELEMETRÍA Y SIMULADOR MULTIEJE DE COSTOS (Skill: livecharts2-data-viz) */}
      <section className="relative z-10 py-12 bg-slate-100/80 border-t border-slate-200">
        <FinancialTelemetryDashboard />
      </section>

      {/* GLOBO & GRAFO INTERACTIVO FINTECH */}
      <section className="relative z-10 py-12 border-t border-border bg-background/80 backdrop-blur-md">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-10 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text">Cobertura Global Fintech & Grafo de Rieles</h2>
            <p className="text-muted-foreground font-light">
              Explora de forma interactiva el posicionamiento 3D y la constelación de más de 2,680+ empresas y rieles A2A.
            </p>
          </div>
          
          <div className="w-full h-[640px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-primary/5">
            <FintechGlobe />
          </div>
        </div>
      </section>

      {/* SECCIÓN PROMINENTE 2: GRAFO B2B DE ALIANZAS E INTERCONEXIONES (Skill: osintgraph-neo4j-mining & mapcn-gis-specialist) */}
      <section className="relative z-10 py-12 bg-slate-950 border-t border-slate-800 text-white">
        <B2BGraphNetwork />
      </section>
      
      {/* RADAR GIS VECTORIAL ESTATAL (32 ESTADOS MÉXICO + 20 PAÍSES LATAM) */}
      <LatamFintechGISRadar />

      {/* SHOWCASE EDITORIAL PARALLAX (DOGSTUDIO / HIGH-VOLTAGE VIBE) */}
      <EditorialParallaxShowcase />

      {/* BIBLIOTECA DE EXPERTOS — VIBRANT LIGHT */}
      <section id="biblioteca" className="relative z-10 py-20 border-t border-[#E5E6EA] bg-[#F3F3F4] text-[#000000]">
        <div className="max-w-[1296px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#000000]">Biblioteca de Expertos</h2>
            <p className="text-[#8B8F9A] font-normal text-sm sm:text-base leading-[1.15]">
              Explora visualmente los modelos de adquirencia locales y utiliza nuestro diccionario interactivo de terminología de pagos.
            </p>

            {/* Pestañas de Alternancia */}
            <div className="inline-flex p-1 rounded-[12px] bg-[#E5E6EA] border border-[#E5E6EA] mt-4">
              <button
                onClick={() => { setActiveLibraryTab('ecosistema'); window.location.hash = 'ecosistema'; }}
                className={`px-5 py-2 rounded-[8px] text-xs font-mono font-bold tracking-wide transition-all duration-[0.12s] cursor-pointer ${
                  activeLibraryTab === 'ecosistema'
                    ? 'bg-[#0000EE] text-white shadow-xs'
                    : 'text-[#8B8F9A] hover:text-[#000000]'
                }`}
              >
                Quién es Quién (Flujos)
              </button>
              <button
                onClick={() => { setActiveLibraryTab('expertos'); window.location.hash = 'expertos'; }}
                className={`px-5 py-2 rounded-[8px] text-xs font-mono font-bold tracking-wide transition-all duration-[0.12s] cursor-pointer ${
                  activeLibraryTab === 'expertos'
                    ? 'bg-[#0000EE] text-white shadow-xs'
                    : 'text-[#8B8F9A] hover:text-[#000000]'
                }`}
              >
                Expertos
              </button>
              <button
                onClick={() => { setActiveLibraryTab('diccionario'); window.location.hash = 'diccionario'; }}
                className={`px-5 py-2 rounded-[8px] text-xs font-mono font-bold tracking-wide transition-all duration-[0.12s] cursor-pointer ${
                  activeLibraryTab === 'diccionario'
                    ? 'bg-[#0000EE] text-white shadow-xs'
                    : 'text-[#8B8F9A] hover:text-[#000000]'
                }`}
              >
                Diccionario de Pagos v6.0
              </button>
            </div>
          </div>

          {/* TAB 1: QUIÉN ES QUIÉN & MODELOS DE FLUJO */}
          {activeLibraryTab === 'ecosistema' && (
            <div className="space-y-6 max-w-4xl mx-auto text-center">
              <Card className="p-10 border border-[#E5E6EA] bg-[#FFFFFF] rounded-[12px] shadow-xs relative overflow-hidden group cursor-pointer hover:border-[#0000EE] transition-all duration-[0.12s] text-[#000000]" onClick={() => navigate('/latam-dashboard')}>
                <div className="relative z-10 space-y-6">
                  <div className="w-16 h-16 mx-auto bg-[#E5E6EA] rounded-[12px] flex items-center justify-center group-hover:scale-105 transition-transform duration-[0.12s]">
                    <Globe className="w-8 h-8 text-[#0000EE]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-[2px] bg-[#E5E6EA] text-[#0000EE] mb-3 inline-block">
                      NUEVO v3.0
                    </span>
                    <h3 className="text-3xl font-black mb-2 text-[#000000] tracking-tight">Latam Fintech Dashboard</h3>
                    <p className="text-[#8B8F9A] max-w-xl mx-auto mb-6 text-sm leading-[1.15]">
                      Explora el modelo interactivo de 4 partes, datos de iGaming, Remesas y Regulación de 20 países en LATAM.
                    </p>
                  </div>
                  <button className="bg-[#0000EE] hover:bg-[#0000BE] text-white font-bold text-xs font-mono uppercase tracking-wider px-8 py-3.5 rounded-[12px] inline-flex items-center gap-2 cursor-pointer transition-colors duration-[0.12s]" onClick={(e) => { e.stopPropagation(); navigate('/latam-dashboard'); }}>
                    <span>Abrir Dashboard Interactivo</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            </div>
          )}

          {/* TAB 2: DICCIONARIO DE PAGOS */}
          {activeLibraryTab === 'diccionario' && (
            <div className="max-w-4xl mx-auto space-y-8">
              
              {/* 6 Cajitas Estructuradas por Modelo de Negocio */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-[#8B8F9A] uppercase font-mono tracking-wider">
                  Filtra los conceptos por Modelo de Negocio / Vertical:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { id: "e-commerce", term: "adquirente", icon: "🛒", label: "E-commerce", desc: "Checkout, Orquestación, D2C, Tarjetas" },
                    { id: "saas", term: "tokenización", icon: "💻", label: "SaaS / Subscripciones", desc: "Recurrencia, Billing, MRR, Tokenización" },
                    { id: "fintech", term: "licencia", icon: "🏦", label: "Fintech / Neobancos", desc: "BaaS, Licencias, Crypto, Wallets" },
                    { id: "pyme", term: "pos", icon: "🏪", label: "PYME / Retail", desc: "Terminal POS, Códigos QR, Adquirencia" },
                    { id: "remesas", term: "remesas", icon: "💸", label: "Remesas / Cross-border", desc: "Payouts, FX, Dispersión A2A" },
                    { id: "gaming", term: "contracargo", icon: "🎮", label: "Gaming / Gambling", desc: "High-risk, Prevención de Fraude, 3DS" },
                  ].map((card) => {
                    const isSelected = searchGlossaryTerm.toLowerCase() === card.term.toLowerCase();
                    return (
                      <div
                        key={card.id}
                        onClick={() => {
                          if (isSelected) {
                            setSearchGlossaryTerm("");
                          } else {
                            setSearchGlossaryTerm(card.term);
                          }
                        }}
                        className={`p-4 rounded-[12px] border transition-all duration-[0.12s] cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#0000EE] text-white border-[#0000EE] font-bold'
                            : 'bg-[#FFFFFF] border-[#E5E6EA] hover:border-[#0000EE] text-[#000000]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-2xl">{card.icon}</span>
                            {isSelected && (
                              <span className="text-[10px] font-black uppercase font-mono px-2 py-0.5 rounded-[2px] bg-white text-[#0000EE]">
                                Seleccionado
                              </span>
                            )}
                          </div>
                          <h4 className={`text-sm font-black tracking-tight mb-1 ${isSelected ? 'text-white' : 'text-[#000000]'}`}>
                            {card.label}
                          </h4>
                          <p className={`text-[11px] leading-relaxed font-medium ${isSelected ? 'text-blue-100' : 'text-[#8B8F9A]'}`}>
                            {card.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Buscador */}
              <div className="relative">
                <Search className="w-5 h-5 text-[#8B8F9A] absolute left-4 top-3.5" />
                <input
                  type="text"
                  placeholder="Busca conceptos (ej. contracargo, adquirente, 3DS, tokenización...)"
                  value={searchGlossaryTerm}
                  onChange={(e) => setSearchGlossaryTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-[6px] bg-[#FFFFFF] border border-[#E5E6EA] text-[#000000] focus:outline-none focus:border-[#0000EE] transition-all text-sm"
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
                      className="p-5 border border-[#E5E6EA] bg-[#FFFFFF] hover:border-[#0000EE] transition-all duration-[0.12s] cursor-pointer flex flex-col justify-between space-y-2 rounded-[12px]"
                    >
                      <div className="flex items-center justify-between">
                        <h5 className="font-bold text-sm tracking-tight text-[#000000]">{item.term}</h5>
                        <span className="text-[10px] text-[#8B8F9A] font-mono">{isExpanded ? "Cerrar ▲" : "Ver más ▼"}</span>
                      </div>
                      {isExpanded && (
                        <p className="text-xs text-[#8B8F9A] font-normal leading-relaxed border-t border-[#E5E6EA] pt-3">
                          {item.definition}
                        </p>
                      )}
                    </Card>
                  );
                })}
              </div>

              {/* Supermarket Banners */}
              <div className="p-4 rounded-[12px] border border-dashed border-[#E5E6EA] bg-[#FFFFFF] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <p className="text-xs font-bold text-[#0000EE]">🏪 ¿Encontraste todo lo que buscabas?</p>
                  <p className="text-[11px] text-[#8B8F9A]">¿Algún concepto de pagos no está en el diccionario o crees que está incorrecto?</p>
                </div>
                <button 
                  onClick={() => suggestContribution('concept')}
                  className="px-4 py-2 rounded-[12px] bg-[#0000EE] text-white text-xs font-bold hover:bg-[#0000BE] transition-colors duration-[0.12s]"
                >
                  Sugerir concepto
                </button>
              </div>

            </div>
          )}

          {/* TAB 3: EXPERTOS */}
          {activeLibraryTab === 'expertos' && (
            <div className="max-w-5xl mx-auto space-y-8 font-sans">

              {/* Header */}
              <div className="text-center space-y-2 pb-2">
                <p className="text-sm text-[#8B8F9A] font-medium max-w-lg mx-auto leading-relaxed">
                  Profesionales con trayectoria real en la industria de pagos. Elige según tu necesidad y conecta directamente.
                </p>
              </div>

              {/* Grid de tarjetas */}
              <div className="grid sm:grid-cols-2 gap-6">
                {EXPERTS.map(expert => (
                  <div key={expert.id} className="rounded-[12px] border border-[#E5E6EA] bg-[#FFFFFF] transition-all duration-[0.12s] p-6 flex flex-col gap-4">

                    {/* Cabecera: foto + nombre */}
                    <div className="flex items-center gap-4">
                      <img
                        src={expert.photo}
                        alt={expert.name}
                        className="w-16 h-16 rounded-full object-cover object-center border border-[#E5E6EA] flex-shrink-0 bg-[#F3F3F4]"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(expert.name)}&background=0000EE&color=fff`;
                        }}
                      />
                      <div className="min-w-0">
                        <h4 className="font-black text-base leading-tight text-[#000000]">{expert.name}</h4>
                        <p className="text-xs text-[#8B8F9A] font-bold mt-0.5 leading-tight">{expert.title}</p>
                        <span className="text-xs text-[#0000EE] font-black mt-1 block">{expert.country}</span>
                      </div>
                    </div>

                    {/* Tag de necesidad */}
                    {'need' in expert && (
                      <div className="px-3.5 py-2 rounded-[2px] bg-[#E5E6EA] text-xs text-[#000000] font-bold">
                        💡 {(expert as any).need}
                      </div>
                    )}

                    {/* Bio */}
                    <p className="text-xs text-[#8B8F9A] font-medium leading-relaxed">{expert.bio}</p>

                    {/* Especialidades */}
                    <div className="flex flex-wrap gap-1.5">
                      {expert.specialties.map(s => (
                        <span key={s} className="text-[11px] font-bold px-2 py-0.5 rounded-[2px] bg-[#E5E6EA] text-[#000000]">{s}</span>
                      ))}
                    </div>

                    {/* Highlights */}
                    <ul className="space-y-1.5">
                      {expert.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-[#000000] font-semibold">
                          <Check className="w-3.5 h-3.5 text-[#0000EE] mt-0.5 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <a
                      href={expert.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto flex items-center justify-center gap-2 py-3 px-4 rounded-[12px] bg-[#0000EE] hover:bg-[#0000BE] transition-all duration-[0.12s] text-xs font-black text-white cursor-pointer"
                    >
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-white" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      Conectar en LinkedIn
                    </a>

                  </div>
                ))}
              </div>

            </div>
          )}

        </div>
      </section>

      {/* COMUNIDAD DE DEBATES (FORO DINE-IN TRPC) */}

      {/* COMUNIDAD DE DEBATES — VIBRANT LIGHT */}
      <section id="comunidad" ref={communitySectionRef} className="relative z-10 py-16 border-t border-[#E5E6EA] bg-[#F3F3F4] text-[#000000] font-sans">
        <div className="max-w-[1296px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 space-y-2">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#000000]">Comunidad de Debates B2B</h2>
            <p className="text-[#8B8F9A] text-base font-normal leading-[1.15]">
              Pregunta conceptos, debate sobre regulaciones, comparte pasarelas de pago y ayuda a construir el mapa abierto de pagos global.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Formulario Creador de Post */}
            <Card className="p-6 border border-[#E5E6EA] bg-[#FFFFFF] shadow-xs rounded-[12px] h-fit">
              <h3 className="font-black text-base text-[#000000] mb-4 tracking-tight flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#0000EE]" />
                Iniciar nueva discusión
              </h3>

              <form onSubmit={handleCreatePost} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-[#000000] font-bold uppercase tracking-wider font-mono">Tu Nombre</label>
                  <input
                    type="text"
                    value={postAuthor}
                    onChange={(e) => setPostAuthor(e.target.value)}
                    placeholder="Ej. Antonio G."
                    className="w-full px-3 py-2 rounded-[6px] bg-[#FFFFFF] border border-[#E5E6EA] text-[#000000] placeholder:text-[#8B8F9A] focus:border-[#0000EE] focus:outline-none text-xs font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-[#000000] font-bold uppercase tracking-wider font-mono">Título de la discusión</label>
                  <input
                    type="text"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    placeholder="Ej. ¿Alguien tiene experiencia integrando PIX Automático?"
                    required
                    className="w-full px-3 py-2 rounded-[6px] bg-[#FFFFFF] border border-[#E5E6EA] text-[#000000] placeholder:text-[#8B8F9A] focus:border-[#0000EE] focus:outline-none text-xs font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs text-[#000000] font-bold uppercase tracking-wider font-mono">País Asociado</label>
                    <select
                      value={postCountry}
                      onChange={(e) => setPostCountry(e.target.value)}
                      className="w-full px-3 py-2 rounded-[6px] bg-[#FFFFFF] border border-[#E5E6EA] text-[#000000] focus:border-[#0000EE] focus:outline-none text-xs font-bold"
                    >
                      <option value="Ninguno">Ninguno</option>
                      {Object.values(COUNTRIES).map(c => (
                        <option key={c.name} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-[#000000] font-bold uppercase tracking-wider font-mono">Etiqueta (Tag)</label>
                    <select
                      value={postTag}
                      onChange={(e) => setPostTag(e.target.value)}
                      className="w-full px-3 py-2 rounded-[6px] bg-[#FFFFFF] border border-[#E5E6EA] text-[#000000] focus:border-[#0000EE] focus:outline-none text-xs font-bold"
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
                  <label className="text-xs text-[#000000] font-bold uppercase tracking-wider font-mono">Cuerpo del mensaje</label>
                  <textarea
                    value={postBody}
                    onChange={(e) => setPostBody(e.target.value)}
                    placeholder="Escribe aquí los detalles de tu pregunta o aporte técnico..."
                    rows={4}
                    required
                    className="w-full px-3 py-2 rounded-[6px] bg-[#FFFFFF] border border-[#E5E6EA] text-[#000000] placeholder:text-[#8B8F9A] focus:border-[#0000EE] focus:outline-none text-xs font-medium resize-none"
                  />
                </div>

                {postSuccessMessage && (
                  <div className="p-3 text-xs bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-[8px] font-bold">
                    {postSuccessMessage}
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-[#0000EE] hover:bg-[#0000BE] text-white gap-2 font-bold text-xs py-3 rounded-[12px] cursor-pointer transition-colors duration-[0.12s]"
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
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E5E6EA] pb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#8B8F9A] font-bold">Ordenar por:</span>
                  <div className="flex gap-1 bg-[#E5E6EA] p-1 rounded-[8px]">
                    {['hot', 'new', 'top'].map(sortOption => (
                      <button
                        key={sortOption}
                        onClick={() => setActiveSort(sortOption as any)}
                        className={`px-3 py-1 rounded-[6px] text-xs font-bold uppercase transition-all duration-[0.12s] cursor-pointer ${
                          activeSort === sortOption 
                            ? 'bg-[#0000EE] text-white' 
                            : 'text-[#8B8F9A] hover:text-[#000000]'
                        }`}
                      >
                        {sortOption === 'hot' ? 'Popular' : sortOption === 'new' ? 'Reciente' : 'Top'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#8B8F9A] font-bold">Filtrar país:</span>
                  <select
                    value={communityCountryFilter}
                    onChange={(e) => setCommunityCountryFilter(e.target.value)}
                    className="px-3 py-1.5 bg-[#FFFFFF] border border-[#E5E6EA] rounded-[6px] text-xs font-bold text-[#000000]"
                  >
                    <option value="TODOS">Todos los países</option>
                    {Object.values(COUNTRIES).map(c => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Lista de Publicaciones */}
              {filteredPosts.length > 0 ? (
                <div className="space-y-4">
                  {filteredPosts.map((post: any) => {
                    const isCommentsExpanded = expandedCommentsPostId === post.id;
                    return (
                      <Card 
                        key={post.id} 
                        className="p-5 border border-[#E5E6EA] bg-[#FFFFFF] hover:border-[#0000EE] transition-all duration-[0.12s] cursor-pointer shadow-xs rounded-[12px]"
                        onClick={() => setExpandedCommentsPostId(isCommentsExpanded ? null : post.id)}
                      >
                        <div className="flex gap-4 items-start">
                          {/* Botón Upvote */}
                          <button
                            onClick={(e) => handleUpvotePost(post.id, e)}
                            className="p-2.5 rounded-[8px] bg-[#E5E6EA] hover:bg-[#0000EE] hover:text-white border border-[#E5E6EA] flex flex-col items-center gap-1 transition-colors duration-[0.12s] group cursor-pointer"
                          >
                            <ChevronUp className="w-4 h-4 text-[#000000] group-hover:text-white group-hover:-translate-y-0.5 transition-transform duration-[0.12s]" />
                            <span className="text-xs font-black font-mono text-[#000000] group-hover:text-white">{post.upvotes}</span>
                          </button>

                          {/* Contenido Post */}
                          <div className="flex-1 space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-[10px] font-black uppercase font-mono px-2 py-0.5 rounded-[2px] bg-[#E5E6EA] text-[#0000EE]">{post.tag}</span>
                              {post.country && (
                                <span className="text-xs text-[#8B8F9A] font-bold flex items-center gap-1">
                                  📍 {post.country}
                                </span>
                              )}
                              <span className="text-xs text-[#8B8F9A] font-medium ml-auto">
                                Por <strong className="text-[#000000] font-bold">{post.author}</strong> ({post.authorTitle})
                              </span>
                            </div>

                            <h4 className="font-black text-base text-[#000000] tracking-tight hover:text-[#0000EE] transition-colors duration-[0.12s]">{post.title}</h4>
                            <p className="text-xs text-[#8B8F9A] leading-relaxed font-normal">{post.body}</p>

                            <div className="flex items-center justify-between pt-2 text-xs text-[#8B8F9A] font-medium border-t border-[#E5E6EA]">
                              <span>Publicado recientemente</span>
                              <span className="text-[#0000EE] font-bold flex items-center gap-1">
                                <MessageSquare className="w-3.5 h-3.5" />
                                {isCommentsExpanded ? "Ocultar respuestas" : "Ver respuestas"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Caja de Comentarios Expandidos */}
                        {isCommentsExpanded && (
                          <div 
                            className="mt-5 pt-5 border-t border-[#E5E6EA] space-y-4 cursor-default"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <h5 className="text-xs font-bold text-[#0000EE] uppercase font-mono tracking-wider">Respuestas de expertos</h5>

                            <div className="space-y-3">
                              {activeComments.length > 0 ? (
                                activeComments.map((comment: any) => (
                                  <div key={comment.id} className="p-3.5 rounded-[8px] bg-[#F3F3F4] border border-[#E5E6EA] flex flex-col gap-1.5">
                                    <div className="flex justify-between items-center text-xs text-[#8B8F9A] font-mono">
                                      <span className="font-bold text-[#000000]">💬 {comment.author}</span>
                                      <span>Hace poco</span>
                                    </div>
                                    <p className="text-xs text-[#000000] font-normal leading-relaxed">{comment.body}</p>
                                  </div>
                                ))
                              ) : (
                                <p className="text-xs text-[#8B8F9A] font-normal italic">No hay comentarios en este hilo. ¡Sé el primero en aportar!</p>
                              )}
                            </div>

                            {/* Creador de comentarios */}
                            <div className="pt-4 border-t border-[#E5E6EA] space-y-3">
                              <div className="grid grid-cols-2 gap-3">
                                <input
                                  type="text"
                                  placeholder="Tu nombre (opcional)"
                                  value={newCommentAuthor}
                                  onChange={(e) => setNewCommentAuthor(e.target.value)}
                                  className="px-3 py-1.5 rounded-[6px] bg-[#FFFFFF] border border-[#E5E6EA] text-[#000000] text-xs focus:outline-none focus:border-[#0000EE]"
                                />
                                <button
                                  onClick={() => handleAddComment(post.id)}
                                  className="bg-[#0000EE] hover:bg-[#0000BE] text-white font-bold text-xs rounded-[8px] py-1.5 cursor-pointer transition-colors duration-[0.12s]"
                                >
                                  Responder
                                </button>
                              </div>
                              <textarea
                                placeholder="Escribe tu respuesta técnica aquí..."
                                rows={2}
                                value={newCommentBody}
                                onChange={(e) => setNewCommentBody(e.target.value)}
                                className="w-full px-3 py-2 rounded-[6px] bg-[#FFFFFF] border border-[#E5E6EA] text-[#000000] text-xs focus:outline-none focus:border-[#0000EE] resize-none"
                              />
                            </div>
                          </div>
                        )}
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <Card className="p-12 border-dashed border border-[#E5E6EA] bg-[#FFFFFF] flex flex-col items-center justify-center text-center space-y-4 rounded-[12px]">
                  <div className="w-12 h-12 rounded-[12px] bg-[#E5E6EA] flex items-center justify-center text-[#0000EE]">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5 max-w-sm">
                    <h4 className="text-base font-bold text-[#000000] tracking-tight">Comunidad en tiempo real</h4>
                    <p className="text-xs text-[#8B8F9A] font-normal leading-[1.15]">
                      Aún no hay discusiones registradas en este filtro. ¡Sé el primero en iniciar un debate técnico utilizando el formulario de la izquierda!
                    </p>
                  </div>
                </Card>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* FORMULARIO DE INTAKE — ENCUENTRA TU SOLUCIÓN */}
      <section id="matcher-section" className="relative z-10 py-20 border-t border-[#E5E6EA] bg-[#F3F3F4] text-[#000000]">
        <div className="max-w-[1296px] mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 mb-12 max-w-3xl mx-auto">
            <span className="text-[10px] font-mono text-[#0000EE] font-bold tracking-widest uppercase">Matching de Soluciones · Gratuito</span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#000000]">¿Buscas una solución de pagos?</h2>
            <p className="text-[#8B8F9A] font-normal max-w-xl mx-auto leading-[1.15]">
              Cuéntanos tu necesidad y nuestro equipo — con acceso directo a <strong className="text-[#000000]">Toku, Netpay, Broxel y más PSPs</strong> — te conecta con la mejor opción en menos de 48h. Sin intermediarios, sin costo.
            </p>
          </div>

          {intakeSubmitted ? (
            <div className="p-10 rounded-[12px] border border-[#E5E6EA] bg-[#FFFFFF] text-center space-y-4 max-w-xl mx-auto">
              <span className="text-4xl">✅</span>
              <h3 className="font-bold text-xl text-[#000000]">¡Solicitud recibida!</h3>
              <p className="text-sm text-[#8B8F9A] max-w-sm mx-auto">Nuestro equipo revisará tu caso y te contactará en menos de 48 horas con opciones concretas.</p>
              <button onClick={() => setIntakeSubmitted(false)} className="text-xs text-[#0000EE] hover:underline mt-2 cursor-pointer">Enviar otra solicitud</button>
            </div>
          ) : (
            <form onSubmit={handleIntakeSubmit} className="space-y-8 max-w-3xl mx-auto bg-[#FFFFFF] p-8 rounded-[12px] border border-[#E5E6EA]">

              {/* Tipo de solución */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-[#000000] block">¿Qué tipo de solución buscas? <span className="text-[#8B8F9A] font-normal">(selecciona todas las que apliquen)</span></label>
                <div className="flex flex-wrap gap-2">
                  {["Gateway de Pagos","Adquirencia / Terminal","KYC / Onboarding B2B","Prevención de Fraude Automatizada","Factoraje","Compliance / Regulatorio","Wallet / Dispersión","Data Analytics para Pagos","BNPL","Open Finance","Bóveda de Tokens Segura","Otro"].map(s => (
                    <button type="button" key={s}
                      onClick={() => toggleIntakeMulti(intakeService, s, setIntakeService)}
                      className={`px-3.5 py-1.5 rounded-[2px] text-xs font-bold transition-all duration-[0.12s] cursor-pointer ${
                        intakeService.includes(s)
                          ? 'bg-[#0000EE] text-white'
                          : 'bg-[#E5E6EA] text-[#000000] hover:bg-[#d6d8df]'
                      }`}>{s}</button>
                  ))}
                </div>
              </div>
              {/* Desafíos / Dolores */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-[#000000] block">¿Cuál es tu desafío principal? <span className="text-[#8B8F9A] font-normal">(selecciona los más críticos)</span></label>
                <div className="flex flex-wrap gap-2">
                  {["Prevención de Fraude e Identidad Sintética","Cumplimiento Normativo / Riesgo","Aprobaciones bajas (Falsos positivos)","Orquestación y Analítica de Datos","Costos de Procesamiento","Escalabilidad e Infraestructura"].map(p => (
                    <button type="button" key={p}
                      onClick={() => toggleIntakeMulti(intakePainPoints, p, setIntakePainPoints)}
                      className={`px-3.5 py-1.5 rounded-[2px] text-xs font-bold transition-all duration-[0.12s] cursor-pointer ${
                        intakePainPoints.includes(p)
                          ? 'bg-[#0000EE] text-white'
                          : 'bg-[#E5E6EA] text-[#000000] hover:bg-[#d6d8df]'
                      }`}>{p}</button>
                  ))}
                </div>
              </div>

              {/* Mercados */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-[#000000] block">¿En qué mercados operas?</label>
                <div className="flex flex-wrap gap-2">
                  {["🇲🇽 México","🇧🇷 Brasil","🇨🇴 Colombia","🇦🇷 Argentina","🇨🇱 Chile","🇵🇪 Perú","🇪🇺 Europa","🇺🇸 EE.UU.","🌎 Global"].map(m => (
                    <button type="button" key={m}
                      onClick={() => toggleIntakeMulti(intakeMarkets, m, setIntakeMarkets)}
                      className={`px-3.5 py-1.5 rounded-[2px] text-xs font-bold transition-all duration-[0.12s] cursor-pointer ${
                        intakeMarkets.includes(m)
                          ? 'bg-[#0000EE] text-white'
                          : 'bg-[#E5E6EA] text-[#000000] hover:bg-[#d6d8df]'
                      }`}>{m}</button>
                  ))}
                </div>
              </div>

              {/* Tipo de empresa + Volumen */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-[#000000] block">Tipo de empresa</label>
                  <select
                    value={intakeCompanyType}
                    onChange={e => setIntakeCompanyType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-[6px] bg-[#FFFFFF] border border-[#E5E6EA] text-sm text-[#000000] focus:border-[#0000EE] focus:outline-none"
                  >
                    <option value="">Selecciona...</option>
                    {["SaaS","eCommerce","Marketplace","Fintech / Startup","Empresa tradicional","Institución financiera","Otro"].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-[#000000] block">Volumen mensual estimado</label>
                  <select
                    value={intakeVolume}
                    onChange={e => setIntakeVolume(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-[6px] bg-[#FFFFFF] border border-[#E5E6EA] text-sm text-[#000000] focus:border-[#0000EE] focus:outline-none"
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
                <label className="text-sm font-bold text-[#000000] block">Cuéntanos tu necesidad <span className="text-[#8B8F9A] font-normal">(en tus palabras)</span></label>
                <textarea
                  required
                  rows={4}
                  placeholder="Ej: Somos un marketplace en México y Colombia. Procesamos ~$50K al mes con tarjeta pero nuestra tasa de rechazo es muy alta..."
                  value={intakeDescription}
                  onChange={e => setIntakeDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-[6px] bg-[#FFFFFF] border border-[#E5E6EA] text-sm text-[#000000] focus:border-[#0000EE] focus:outline-none resize-none leading-relaxed"
                />
              </div>

              {/* Contacto */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-[#000000] block">¿Cómo te contactamos? <span className="text-[#8B8F9A] font-normal">(email o WhatsApp)</span></label>
                <input
                  required
                  type="text"
                  placeholder="tu@email.com o +52 55 1234 5678"
                  value={intakeContact}
                  onChange={e => setIntakeContact(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-[6px] bg-[#FFFFFF] border border-[#E5E6EA] text-sm text-[#000000] focus:border-[#0000EE] focus:outline-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <p className="text-[11px] text-[#8B8F9A]">
                  🔒 Tu información es confidencial. No compartimos datos sin tu autorización.
                </p>
                <Button type="submit" size="lg" disabled={intakeIsSubmitting} className="bg-[#0000EE] hover:bg-[#0000BE] text-white font-bold px-8 rounded-[12px] w-full sm:w-auto transition-colors duration-[0.12s]">
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

      {/* SECCIÓN 5: FINTECH MATCHER (IFRAME) */}
      <section className="relative z-10 py-20 border-t border-[#E5E6EA] bg-[#F3F3F4]">
        <div className="max-w-[1296px] mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#000000]">
              ¿Listo para encontrar tu stack ideal?
            </h2>
            <p className="text-[#8B8F9A] font-normal text-base max-w-xl mx-auto leading-[1.15]">
              4 preguntas. 1 diagnóstico personalizado en tiempo real. 0 costo.
            </p>
          </div>
          
          <div className="w-full h-[750px] rounded-[12px] overflow-hidden border border-[#E5E6EA] bg-[#FFFFFF] shadow-xs">
            <iframe
              src="/fintech-matcher.html"
              title="Fintech Matcher — OnlyPayments"
              className="w-full h-full border-0 block"
              allow="clipboard-write"
            />
          </div>
        </div>
      </section>

      {/* FOOTER: MARCO LEGAL Y TRANSPARENCIA */}
      <footer className="relative z-10 border-t border-[#E5E6EA] py-16 bg-[#FFFFFF] text-[#000000]">
        <div className="max-w-[1296px] mx-auto px-4 sm:px-6 space-y-12">
          
          <div className="space-y-8 max-w-6xl mx-auto">
            <div className="text-center space-y-2">
              <h4 className="text-sm font-bold uppercase tracking-widest text-[#000000]">Marco Legal y Transparencia</h4>
              <p className="text-xs text-[#8B8F9A]">Operamos e informamos en estricto cumplimiento con los reguladores financieros de la región.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-xs text-[#8B8F9A]">
              {/* Chile */}
              <div className="space-y-2.5 p-5 rounded-[12px] border border-[#E5E6EA] bg-[#F3F3F4]">
                <div className="flex items-center gap-2 font-bold text-[#000000] text-sm">
                  <span className="text-lg">🇨🇱</span> CMF Chile & Banco Central
                </div>
                <p className="leading-relaxed">Operación bajo normativa de Tasas de Intercambio reguladas por la CMF y el Banco Central de Chile.</p>
                <div className="flex flex-wrap gap-4 pt-1">
                  <a href="https://cmfchile.cl" target="_blank" rel="noopener noreferrer" className="font-bold text-[#0000EE] hover:underline">CMF Chile ↗</a>
                  <a href="https://bcentral.cl" target="_blank" rel="noopener noreferrer" className="font-bold text-[#0000EE] hover:underline">Banco Central ↗</a>
                </div>
              </div>
              
              {/* Mexico */}
              <div className="space-y-2.5 p-5 rounded-[12px] border border-[#E5E6EA] bg-[#F3F3F4]">
                <div className="flex items-center gap-2 font-bold text-[#000000] text-sm">
                  <span className="text-lg">🇲🇽</span> Banxico & CNBV
                </div>
                <p className="leading-relaxed">Cumplimiento con las disposiciones de Cuotas de Intercambio del Banco de México (Banxico) y la CNBV.</p>
                <div className="flex flex-wrap gap-4 pt-1">
                  <a href="https://banxico.org.mx" target="_blank" rel="noopener noreferrer" className="font-bold text-[#0000EE] hover:underline">Banxico ↗</a>
                </div>
              </div>

              {/* Brasil */}
              <div className="space-y-2.5 p-5 rounded-[12px] border border-[#E5E6EA] bg-[#F3F3F4]">
                <div className="flex items-center gap-2 font-bold text-[#000000] text-sm">
                  <span className="text-lg">🇧🇷</span> Banco Central do Brasil
                </div>
                <p className="leading-relaxed">Institución de pago conforme a la regulación de Arranjos de Pagamento del Banco Central do Brasil (BCB).</p>
                <div className="flex flex-wrap gap-4 pt-1">
                  <a href="https://bcb.gov.br" target="_blank" rel="noopener noreferrer" className="font-bold text-[#0000EE] hover:underline">BCB ↗</a>
                </div>
              </div>

              {/* Colombia */}
              <div className="space-y-2.5 p-5 rounded-[12px] border border-[#E5E6EA] bg-[#F3F3F4]">
                <div className="flex items-center gap-2 font-bold text-[#000000] text-sm">
                  <span className="text-lg">🇨🇴</span> SFC & Banco de la República
                </div>
                <p className="leading-relaxed">Adherido al Sistema de Pagos de Bajo Valor supervisado por la Superintendencia Financiera de Colombia (SFC).</p>
                <div className="flex flex-wrap gap-4 pt-1">
                  <a href="https://superfinanciera.gov.co" target="_blank" rel="noopener noreferrer" className="font-bold text-[#0000EE] hover:underline">SFC ↗</a>
                </div>
              </div>

              {/* Argentina */}
              <div className="space-y-2.5 p-5 rounded-[12px] border border-[#E5E6EA] bg-[#F3F3F4]">
                <div className="flex items-center gap-2 font-bold text-[#000000] text-sm">
                  <span className="text-lg">🇦🇷</span> BCRA
                </div>
                <p className="leading-relaxed">Proveedor de Servicios de Pago (PSP) registrado ante el BCRA y compatible con Transferencias 3.0.</p>
                <div className="flex flex-wrap gap-4 pt-1">
                  <a href="https://www.bcra.gob.ar/transferencias-3-0/" target="_blank" rel="noopener noreferrer" className="font-bold text-[#0000EE] hover:underline">Transferencias 3.0 ↗</a>
                  <a href="https://bcra.gob.ar" target="_blank" rel="noopener noreferrer" className="font-bold text-[#0000EE] hover:underline">Registro PSP ↗</a>
                </div>
              </div>

              {/* Perú */}
              <div className="space-y-2.5 p-5 rounded-[12px] border border-[#E5E6EA] bg-[#F3F3F4]">
                <div className="flex items-center gap-2 font-bold text-[#000000] text-sm">
                  <span className="text-lg">🇵🇪</span> BCRP
                </div>
                <p className="leading-relaxed">Operaciones interoperables bajo los lineamientos del Banco Central de Reserva del Perú (BCRP).</p>
                <div className="flex flex-wrap gap-4 pt-1">
                  <a href="https://bcrp.gob.pe" target="_blank" rel="noopener noreferrer" className="font-bold text-[#0000EE] hover:underline">BCRP ↗</a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#E5E6EA] pt-8 text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <span className="font-black text-base text-[#000000]">OnlyPayments</span>
              <span className="text-[10px] px-2 py-0.5 rounded-[2px] bg-[#E5E6EA] text-[#000000] font-mono font-bold">2026</span>
            </div>
            
            <p className="text-xs text-[#8B8F9A] max-w-lg mx-auto leading-[1.15]">
              Datos curados a partir del Diccionario de Medios de Pago v6.0, normativas de Bancos Centrales globales y reportes públicos del ecosistema fintech.
            </p>
            
            <div className="text-[10px] text-[#8B8F9A] flex items-center justify-center gap-4 flex-wrap">
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
