import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SmoothScrollProvider } from "./components/SmoothScrollProvider";
import Home from "./pages/Home";
import NewsFeed from "./pages/NewsFeed";
import NewsDetail from "./pages/NewsDetail";
import PaymentStacks from "./pages/PaymentStacks";
import Remesas from "./pages/Remesas";
import HowToGuides from "./pages/HowToGuides";
import Diccionario from "./pages/Diccionario";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/news"} component={NewsFeed} />
      <Route path={"/news/:id"} component={NewsDetail} />
      <Route path={"/stacks"} component={PaymentStacks} />
      <Route path={"/remesas"} component={Remesas} />
      <Route path={"/guides"} component={HowToGuides} />
      <Route path={"/diccionario"} component={Diccionario} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <SmoothScrollProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </SmoothScrollProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
