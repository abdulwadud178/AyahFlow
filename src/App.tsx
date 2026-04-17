import './App.css'
import { useEffect, useState } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";
import { Button } from './components/ui/button'
import HomePage from "./pages/HomePage"
import ReadingPage from "./pages/ReadingPage"
import { BottomNav, type NavTab } from "./components/ButtomNav"

const ROUTES: NavTab[] = ["home", "read", "explore", "ranks", "settings"];
const intervalMS = 60 * 60 * 1000;

function App() {
  const [activeTab, setActiveTab] = useState<NavTab>(() => {
    const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    return ROUTES.includes(hash as NavTab) ? (hash as NavTab) : "home";
  });

  const {
    needRefresh: [needRefresh],
    offlineReady: [offlineReady],
    updateServiceWorker
  } = useRegisterSW({
    onRegistered(registration) {
      if (registration) {
        setInterval(() => {
          registration.update();
        }, intervalMS);
      }
    }
  });

  useEffect(() => {
    window.history.replaceState(null, "", `#${activeTab}`);
  }, [activeTab]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) as NavTab;
      if (ROUTES.includes(hash)) {
        setActiveTab(hash);
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <>
      {activeTab === "home" && <HomePage onNavigate={setActiveTab} />}
      {activeTab === "read" && <ReadingPage />}
      {activeTab === "explore" && <div className="min-h-screen pb-24">Explore page coming soon</div>}
      {activeTab === "ranks" && <div className="min-h-screen pb-24">Ranks page coming soon</div>}
      {activeTab === "settings" && <div className="min-h-screen pb-24">Settings page coming soon</div>}

      <BottomNav active={activeTab} onChange={setActiveTab} />

      {offlineReady && <p className='bg-gray-500 text-2xl'>App ready to work offline</p>}

      {needRefresh && (
        <Button className='bg-amber-600 ' onClick={() => updateServiceWorker(true)}>
          Update Available — Reload
        </Button>
      )}
    </>
  )
}

export default App
