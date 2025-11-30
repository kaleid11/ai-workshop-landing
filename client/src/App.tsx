import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { GoogleAnalytics } from "./components/GoogleAnalytics";
import { ThemeProvider } from "./contexts/ThemeContext";
import StickyBookingButton from "./components/StickyBookingButton";
import WhatsAppButton from "./components/WhatsAppButton";
import { Loader2 } from "lucide-react";

// Eager load critical pages
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

// Lazy load all other pages
const Success = lazy(() => import("./pages/Success"));
const Portal = lazy(() => import("./pages/Portal"));
const AdminBind = lazy(() => import("./pages/AdminBind"));
const Admin = lazy(() => import("./pages/Admin"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Tools = lazy(() => import("./pages/Tools"));
const Prompts = lazy(() => import("./pages/Prompts"));
const Resources = lazy(() => import("./pages/Resources"));
const VibeMarketing = lazy(() => import("./pages/pillars/VibeMarketing"));
const VibeCoding = lazy(() => import("./pages/pillars/VibeCoding"));
const VibeAlignment = lazy(() => import("./pages/pillars/VibeAlignment"));
const Calendar = lazy(() => import("./pages/Calendar"));
const Enterprise = lazy(() => import("./pages/Enterprise"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const Quiz = lazy(() => import("./pages/Quiz"));
const About = lazy(() => import("./pages/About"));
const Scorecard = lazy(() => import("./pages/Scorecard"));
const AdminAssessments = lazy(() => import("./pages/AdminAssessments"));
const AdminWorkshopAccess = lazy(() => import("./pages/AdminWorkshopAccess"));
const AdminSubmissions = lazy(() => import("./pages/AdminSubmissions"));
const Workshop = lazy(() => import("./pages/Workshop"));
const Upsell = lazy(() => import("./pages/Upsell"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const AcademyTools = lazy(() => import("./pages/AcademyTools"));
const Wiki = lazy(() => import("./pages/Wiki"));
const Workshops = lazy(() => import("./pages/Workshops"));
const AdminWorkshops = lazy(() => import("./pages/AdminWorkshops"));
const ToolsDatabase = lazy(() => import("./pages/ToolsDatabase"));
const TierCheckout = lazy(() => import("./pages/TierCheckout"));
const MyBookings = lazy(() => import("./pages/MyBookings"));
const Recordings = lazy(() => import("./pages/Recordings"));
const RequestTool = lazy(() => import("./pages/RequestTool"));
const RequestPrompt = lazy(() => import("./pages/RequestPrompt"));
const Frameworks = lazy(() => import("./pages/Frameworks"));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
  </div>
);

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/frameworks"} component={Frameworks} />
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
      <Route path="/my-bookings" component={MyBookings} />
      <Route path="/tools-database" component={ToolsDatabase} />
      <Route path="/recordings" component={Recordings} />
      <Route path="/request-tool" component={RequestTool} />
      <Route path="/request-prompt" component={RequestPrompt} />
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
          <Suspense fallback={<PageLoader />}>
            <Router />
          </Suspense>
          <StickyBookingButton />
          <WhatsAppButton />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
