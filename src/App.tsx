import './App.css'
import { useEffect, useState } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";
import { Button } from './components/ui/button'
import HomePage from "./pages/HomePage"
import ReadingPage from "./pages/ReadingPage"
import CommunityPage from "./pages/CommunityPage"
import ProfilePage from './pages/ProfilePage';
import { BottomNav, type NavTab } from "./components/ButtomNav"
import { useApiResources } from "./hooks/useApi";

const ROUTES: NavTab[] = ["home", "read", "explore", "ranks", "settings"];
const intervalMS = 60 * 60 * 1000;

function App() {
  const [activeTab, setActiveTab] = useState<NavTab>(() => {
    const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    return ROUTES.includes(hash as NavTab) ? (hash as NavTab) : "home";
  });

  const [showInstallPopup, setShowInstallPopup] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  // Load API resources on app start
  useApiResources();

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
    const checkInstalled = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      setIsInstalled(isStandalone);
    };

    const checkIOS = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      setIsIOS(/iphone|ipad|ipod/.test(userAgent));
    };

    checkInstalled();
    checkIOS();

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (!isInstalled) {
        setShowInstallPopup(true);
      }
    };

    const handleAppInstalled = () => {
      console.log('App installed successfully');
      setDeferredPrompt(null);
      setShowInstallPopup(false);
      setIsInstalled(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [isInstalled]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to install prompt: ${outcome}`);
      setDeferredPrompt(null);
      setShowInstallPopup(false);
    }
  };

  const handleContinueInBrowser = () => {
    setShowInstallPopup(false);
  };

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
      {activeTab === "ranks" && <CommunityPage />}
      {activeTab === "settings" && <ProfilePage/>}

      <BottomNav active={activeTab} onChange={setActiveTab} />

      {offlineReady && <p className='bg-gray-500 text-2xl'>App ready to work offline</p>}

      {needRefresh && (
        <Button className='bg-amber-600 ' onClick={() => updateServiceWorker(true)}>
          Update Available — Reload
        </Button>
      )}

      {showInstallPopup && !isInstalled && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4 text-center">
            <img src="/manifest-icon-192.maskable.png" alt="App Icon" className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Install App</h2>
            <p className="text-gray-600 mb-6">
              {isIOS
                ? "To install: tap Share → Add to Home Screen"
                : "Add this app to your home screen and use it offline anytime."
              }
            </p>
            <div className="flex gap-3">
              {!isIOS && (
                <Button onClick={handleInstallClick} className="flex-1">
                  Install App
                </Button>
              )}
              <Button onClick={handleContinueInBrowser} variant="outline" className="flex-1">
                Continue in browser
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default App
