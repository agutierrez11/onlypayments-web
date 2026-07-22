import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  ogType?: string;
}

export function SEO({
  title = "OnlyPayments — El mapa global de pagos",
  description = "El portal de referencia global sobre medios de pago: métodos por país, diccionario B2B, quién es quién en el ecosistema y debates de la comunidad.",
  ogType = "website"
}: SEOProps) {
  useEffect(() => {
    document.title = title;
    
    // Meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }

    // OG Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", title);
    }

    // OG Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute("content", description);
    }
  }, [title, description, ogType]);

  return null;
}
