export default function ShopHeader() {
  return (
    <section className="py-20 bg-gradient-to-r from-gray-50 to-white relative overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-5"
        style={{
          backgroundImage: `url('https://ext.same-assets.com/445690581/2060477584.jpeg')`
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Original Artwork Collection
        </h1>

        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Discover Ashm's unique artistic vision through her original creations. Each piece tells a story
          and represents a journey of creative expression. From abstract textures to vibrant landscapes,
          find the perfect artwork to transform your space.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-gray-500">
          <div className="flex items-center">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            Free shipping on orders over $500
          </div>
          <div className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full"></div>
          <div className="flex items-center">
            <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
            Certificate of authenticity included
          </div>
          <div className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full"></div>
          <div className="flex items-center">
            <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
            Commission pieces available
          </div>
        </div>
      </div>
    </section>
  );
}
