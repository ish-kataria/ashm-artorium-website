export default function ClassesHeader() {
  return (
    <section className="py-16 bg-gradient-to-r from-purple-50 to-blue-50 relative overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-5"
        style={{
          backgroundImage: `url('https://ext.same-assets.com/445690581/2060477584.jpeg')`
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Weekly Art Classes
        </h1>

        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
          Develop your artistic skills with professional instruction in 3D sculpting, illustration drawing,
          painting techniques, and much more. Choose from flexible once or twice weekly sessions.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-gray-500 mb-6">
          <div className="flex items-center">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            Summer-Fall enrollment open
          </div>
          <div className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full"></div>
          <div className="flex items-center">
            <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
            All materials provided
          </div>
          <div className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full"></div>
          <div className="flex items-center">
            <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
            Professional instruction
          </div>
        </div>

        {/* Pricing highlight */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 max-w-lg mx-auto">
          <p className="text-sm font-medium text-gray-900 mb-1">Starting at $45 for Demo Class</p>
          <p className="text-xs text-gray-600">
            4-week programs from $135 • 8-week programs from $245 (best value)
          </p>
        </div>
      </div>
    </section>
  );
}
