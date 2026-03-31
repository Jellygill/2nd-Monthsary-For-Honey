import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Anniversary from "@/pages/Anniversary";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Anniversary />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
