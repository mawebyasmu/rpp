import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "@/pages/Homepage";
import GeneratorForm from "@/pages/GeneratorForm";
import ResultPage from "@/pages/ResultPage";
import LearnMore from "@/pages/LearnMore";
import DonationPage from "@/pages/DonationPage";
import IntegrationTest from "@/pages/IntegrationTest";
import EndToEndTest from "@/pages/EndToEndTest";
import UserAcceptanceTest from "@/pages/UserAcceptanceTest";
import DeploymentPrep from "@/pages/DeploymentPrep";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/generator" element={<GeneratorForm />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/learn-more" element={<LearnMore />} />
          <Route path="/donation" element={<DonationPage />} />
          <Route path="/integration-test" element={<IntegrationTest />} />
          <Route path="/e2e-test" element={<EndToEndTest />} />
          <Route path="/uat" element={<UserAcceptanceTest />} />
          <Route path="/deployment-prep" element={<DeploymentPrep />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
