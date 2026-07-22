import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Building2, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import fintechsData from '../data/fintechs_latam.json';

const ITEMS_PER_PAGE = 24;

export function FintechDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSegment, setActiveSegment] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Extract unique segments
  const segments = useMemo(() => {
    const s = new Set<string>();
    fintechsData.forEach((f: any) => {
      if (f.Segmento) s.add(f.Segmento);
    });
    return Array.from(s).sort();
  }, []);

  const filteredData = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    return fintechsData.filter((company: any) => {
      const matchesSearch = !q || 
        company.Nombre?.toLowerCase().includes(q) || 
        company["Descripción"]?.toLowerCase().includes(q) ||
        company.Segmento?.toLowerCase().includes(q) ||
        company.Vertical?.toLowerCase().includes(q) ||
        company.País?.toLowerCase().includes(q);
      
      const matchesSegment = activeSegment ? company.Segmento === activeSegment : true;

      return matchesSearch && matchesSegment;
    });
  }, [searchTerm, activeSegment]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  
  const currentData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  // Reset page on filter change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeSegment]);

  return (
    <div className="w-full relative z-10 max-w-[1400px] mx-auto p-4 md:p-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold font-mono uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
          <Activity className="w-3.5 h-3.5" />
          Radares Finnovista 2026
        </div>
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Directorio de Empresas</h2>
        <p className="text-muted-foreground font-light text-lg md:text-xl max-w-2xl mx-auto">
          Explora la base de datos de <span className="text-foreground font-bold">{fintechsData.length}</span> empresas Fintech operando en LATAM.
        </p>
      </div>

      {/* Controls */}
      <div className="mb-10 flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between bg-card/40 backdrop-blur-2xl border border-border/50 p-6 rounded-3xl shadow-2xl">
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Buscar por nombre o descripción..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-background/50 border border-border/50 rounded-2xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all placeholder:text-muted-foreground/50"
          />
        </div>

        <div className="flex-1 overflow-x-auto pb-2 lg:pb-0 hide-scrollbar w-full">
          <div className="flex gap-2 min-w-max">
            <button
              onClick={() => setActiveSegment(null)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border whitespace-nowrap ${
                activeSegment === null 
                  ? 'bg-amber-500/10 border-amber-500 text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]' 
                  : 'bg-background/50 border-border/50 text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              Todos
            </button>
            {segments.map((segment) => (
              <button
                key={segment}
                onClick={() => setActiveSegment(segment)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border whitespace-nowrap ${
                  activeSegment === segment 
                    ? 'bg-amber-500/10 border-amber-500 text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]' 
                    : 'bg-background/50 border-border/50 text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                {segment}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
        <AnimatePresence mode="popLayout">
          {currentData.map((company: any, index: number) => (
            <motion.div
              key={`${company.Nombre}-${index}`}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, delay: index * 0.02 }}
            >
              <Card className="h-full flex flex-col bg-card/40 backdrop-blur-xl border-border/50 hover:border-amber-500/30 transition-all hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] hover:-translate-y-1 overflow-hidden group">
                <div className="p-6 flex-1 flex flex-col relative z-10">
                  <div className="flex justify-between items-start mb-4 gap-4">
                    <h3 className="text-xl font-extrabold text-foreground group-hover:text-amber-400 transition-colors line-clamp-2">
                      {company.Nombre}
                    </h3>
                    <div className="p-2.5 bg-secondary/80 rounded-xl border border-border/50 flex-shrink-0 group-hover:bg-amber-500/10 group-hover:border-amber-500/20 transition-colors">
                      <Building2 className="w-5 h-5 text-muted-foreground group-hover:text-amber-500 transition-colors" />
                    </div>
                  </div>
                  
                  <Badge variant="outline" className="w-fit mb-4 border-amber-500/20 text-amber-400 bg-amber-500/5">
                    {company.Segmento}
                  </Badge>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4 mt-auto">
                    {company["Descripción"]}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {filteredData.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
          <p className="text-lg">No se encontraron empresas con esos criterios.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mb-12">
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-3 rounded-xl bg-card/40 backdrop-blur-lg border border-border/50 disabled:opacity-50 hover:bg-secondary transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="px-6 py-3 rounded-xl bg-card/40 backdrop-blur-lg border border-border/50 text-sm font-mono font-bold">
            <span className="text-amber-500">{currentPage}</span> / {totalPages}
          </div>

          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-3 rounded-xl bg-card/40 backdrop-blur-lg border border-border/50 disabled:opacity-50 hover:bg-secondary transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
