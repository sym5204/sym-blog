import Navigation from "@/components/navigation/Navigation"



const About = () => {
  return (
    <>
      <div className="relative flex flex-row w-full min-h-full h-max">

        <Navigation/>

        <div className="flex flex-col w-full gap-5 p-10 ml-24">
          <h1 className="text-xl md:text-2xl text-neutral-50">Dashboard</h1>
          <div className="w-full border rounded h-80 border-neutral-500/50 bg-neutral-800/20"></div>
          <div className="flex flex-row w-full gap-5">
            <div className="w-1/2 border rounded h-80 border-neutral-500/50 bg-neutral-800/20"></div>
            <div className="w-1/2 border rounded h-80 border-neutral-500/50 bg-neutral-800/20"></div>
          </div>

        </div>
      </div>
    </>
    
  )
}

export default About