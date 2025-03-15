import EmptyDefault from "@/components/emptyDefault/EmptyDefault"



const About = () => {
  return (
    <>
      <div className="flex relative flex-row w-full min-h-full h-max">

        <div className="flex flex-col gap-5 w-full rounded">
          
          <div className="w-full border rounded overflow-hidden h-[600px] border-neutral-500/50 bg-neutral-800/60">
            
            <EmptyDefault />
            
          </div>

          <div className="flex flex-row gap-5 w-full">
            <div className="w-1/2 h-80 rounded border border-neutral-500/50 bg-neutral-800/60"></div>
            <div className="w-1/2 h-80 rounded border border-neutral-500/50 bg-neutral-800/60"></div>
          </div>
          

        </div>
      </div>
    </>
    
  )
}

export default About