import { featuresData } from "@/variables/pageData";

function Features() {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Our Features</h2>
        <p className="mt-4 text-gray-500 sm:text-xl">
          Discover the benefits that set our service apart.
        </p>
      </div>

      <dl className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-3">
        {featuresData.map((feature) => (
          <div
            key={feature.title}
            className="flex flex-col rounded-lg shadow-md border border-gray-500 bg-gray-50 px-4 py-8 text-center hover:shadow-2xl transition-shadow duration-300"
          >
            <dt className="text-lg font-medium text-gray-800">{feature.title}</dt>
            <dd className="mt-2 text-gray-800">{feature.description}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default Features;
