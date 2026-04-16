import './App.css'
import { useRegisterSW } from "virtual:pwa-register/react";
import { Button } from './components/ui/button'
import HomePage from "./pages/HomePage"

function App() {

const intervalMS = 60 * 60 * 1000;

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


  return (
    <>
      <HomePage/>

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
