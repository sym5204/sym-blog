import EmptyDefault from "@/components/emptyDefault/EmptyDefault"
import Navigation from "@/components/navigation/Navigation"



const About = () => {
  return (
    <>
      <div className="relative flex flex-row w-full min-h-full h-max">

        <Navigation/>

        <div className="flex flex-col w-full gap-5 px-10 ml-24">
          
          <div className="w-full border rounded h-[600px] border-neutral-500/50 bg-neutral-800/60">
            
            <EmptyDefault />
            
          </div>

          <div className="flex flex-row w-full gap-5">
            <div className="w-1/2 border rounded h-80 border-neutral-500/50 bg-neutral-800/60"></div>
            <div className="w-1/2 border rounded h-80 border-neutral-500/50 bg-neutral-800/60"></div>
          </div>
          

        </div>
      </div>
    </>
    
  )
}

export default About