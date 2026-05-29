import MainLayout from "../layouts/MainLayout"
import Hero from "../components/Hero"
import Features from "../components/Features"
import About from "../components/About"

const Home = () => {
  return (
    <MainLayout>

      <Hero />
	
<About />
      <Features />


    </MainLayout>
  )
}

export default Home