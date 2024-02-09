import { DonutChartUsageExample2 } from './components/Donout.jsx'
import { HardwareOSC } from './services/hardware.js'


function App() {
  HardwareOSC()
  return (
    <section className="w-[100vw] h-[100vh] flex items-center justify-center">
      <DonutChartUsageExample2 />
    </section>
  )
}

export default App
