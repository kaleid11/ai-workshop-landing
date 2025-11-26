import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { GoogleAnalytics } from "./components/GoogleAnalytics";
import { ThemeProvider } from "./contexts/ThemeContext";
import StickyBookingButton from "./components/StickyBookingButton";
import WhatsAppButton from "./components/WhatsAppButton";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Portal from "./pages/Portal";
import AdminBind from "./pages/AdminBind";
import Admin from "./pages/Admin";
import Pricing from "./pages/Pricing";
import Tools from "./pages/Tools";
import Prompts from "./pages/Prompts";
import Resources from "./pages/Resources";
import VibeMarketing from "./pages/pillars/VibeMarketing";
import VibeCoding from "./pages/pillars/VibeCoding";
import VibeAlignment from "./pages/pillars/VibeAlignment";
import Calendar from "./pages/Calendar";
import Enterprise from "./pages/Enterprise";
import CaseStudies from "./pages/CaseStudies";
import Quiz from "./pages/Quiz";
import About from "./pages/About";
import Scorecard from "./pages/Scorecard";
import AdminAssessments from "./pages/AdminAssessments";
import AdminWorkshopAccess from "./pages/AdminWorkshopAccess";
import AdminSubmissions from "./pages/AdminSubmissions";
import Workshop from "./pages/Workshop";
import Upsell from "./pages/Upsell";
import CheckoutPage from "./pages/CheckoutPage";
import AcademyTools from "./pages/AcademyTools";
import Wiki from "./pages/Wiki";
import Workshops from "./pages/Workshops";
import AdminWorkshops from "./pages/AdminWorkshops";
import ToolsDatabase from "./pages/ToolsDatabase";
import TierCheckout from "./pages/TierCheckout";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/checkout"} component={TierCheckout} />
      <Route path={"/success"} component={Success} />
      <Route path={"/portal"} component={Portal} />
      <Route path="/admin-bind" component={AdminBind} />
      <Route path="/admin" component={Admin} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/tools" component={Tools} />
      <Route path="/prompts" component={Prompts} />
      <Route path="/resources" component={Resources} />
      <Route path="/pillars/marketing" component={VibeMarketing} />
      <Route path="/pillars/coding" component={VibeCoding} />
      <Route path="/pillars/alignment" component={VibeAlignment} />
      <Route path="/calendar" component={Calendar} />
      <Route path="/enterprise" component={Enterprise} />
      <Route path="/case-studies" component={CaseStudies} />
      <Route path="/quiz" component={Quiz} />
      <Route path={"/workshop"} component={Workshop} />
      <Route path={"/checkout-flow"} component={CheckoutPage} />
      <Route path={"/upsell"} component={Upsell} />
      <Route path="/about" component={About} />
      <Route path="/how-it-works" component={About} />
      <Route path="/scorecard" component={Scorecard} />
      <Route path="/admin/assessments" component={AdminAssessments} />
      <Route path="/admin/workshop-access" component={AdminWorkshopAccess} />
      <Route path="/admin/submissions" component={AdminSubmissions} />
      <Route path="/admin/workshops" component={AdminWorkshops} />
      <Route path="/academy/tools" component={AcademyTools} />
      <Route path="/wiki" component={Wiki} />
      <Route path="/workshops" component={Workshops} />
      <Route path="/tools-database" component={ToolsDatabase} />
      <Route path="/404" component={NotFound} />
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
      <GoogleAnalytics />
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
          <StickyBookingButton />
          <WhatsAppButton />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
