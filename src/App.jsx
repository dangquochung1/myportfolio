import './App.css'
import Navbar from './components/Navbar'
import InteractiveBackground from './components/InteractiveBackground'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Work from './components/Work'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app-container">
      <InteractiveBackground />
      <Navbar />
      <Hero />
      <Skills />
      <Work />
      <About />
      <Footer />
    </div>
  )
}

export default App
