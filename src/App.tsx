import './App.css'
import { useRegisterSW } from "virtual:pwa-register/react";
import { Button } from './components/ui/button'

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
      <div>
      <h1 className='bg-green-300 text-5xl'>Ayah Flow - pwa</h1>

      {offlineReady && <p className='bg-gray-500 text-2xl'>App ready to work offline</p>}

      {needRefresh && (
        <Button className='bg-amber-600 ' onClick={() => updateServiceWorker(true)}>
          Update Available — Reload
        </Button>
      )}
    </div>
    </>
  )
}

export default App
