import { featuresData } from "@/variables/pageData"

function Features() {
  return (
    <div className="w-full flex flex-col items-center py-6 px-6 space-y-4">
      <h1 className="text-4xl font-bold">Features</h1>
      <div className="flex items-center justify-between w-full space-x-4">
        {
          featuresData.map((feature) => (
            <div key={feature.title} className="bg-white shadow-lg rounded-lg p-6 flex-1 text-center hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold mb-4">{feature.title}</h2>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Features