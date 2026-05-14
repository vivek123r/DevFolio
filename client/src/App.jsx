import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient.js";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import Home from "./pages/home.jsx";
import NotFound from "./pages/not-found.jsx";

function AppRouter() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/DevFolio" component={Home} />
      <Route path="/DevFolio/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
