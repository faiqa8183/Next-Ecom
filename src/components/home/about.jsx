const AboutUs = () => {
  return (
    <div id="about-section" className="bg-white text-gray-800">
      {/* Banner Section */}
      <section className="relative h-96">
        <img
          src="/images/about-banner.jpg"
          alt="About Us Banner"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-[#8B5E3C] bg-opacity-30 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            More Than Fashion – A Lifestyle
          </h1>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="py-16 px-6 md:px-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold text-[#8B5E3C] mb-4">Our Story</h2>
          <p className="text-lg mb-4">
            At QuickCart, we believe fashion should be simple, stylish, and accessible for everyone. 
            We bring together timeless designs for men, women, and kids with an emphasis on quality and affordability.
          </p>
          <p className="text-lg">
            Our journey began with a passion for making everyday fashion easy and enjoyable. From casual wear to essentials, 
            we're here to make you look and feel great.
          </p>
        </div>
        <div>
          <img
            src="/images/about-model.png"
            alt="Our Team"
            className="w-full h-auto object-cover shadow-md"
          />
        </div>
      </section>

      {/* Category Highlights */}
      <section className="py-16 px-6 md:px-20 bg-[#8B5E3C] text-white text-center">
        <h2 className="text-2xl font-semibold mb-10">Explore Our Collections</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <img src="/images/men.jpg" alt="Men's Fashion" className="w-full h-64 object-cover mb-4" />
            <h3 className="text-xl font-semibold">Men</h3>
            <p>Bold, sharp, and comfortable styles for modern men.</p>
          </div>
          <div>
            <img src="/images/women.jpg" alt="Women's Fashion" className="w-full h-64 object-cover mb-4" />
            <h3 className="text-xl font-semibold">Women</h3>
            <p>Trendy, elegant, everyday wear inspires confidence.</p>
          </div>
          <div>
            <img src="/images/kids.jpg" alt="Kids' Fashion" className="w-full h-64 object-cover mb-4" />
            <h3 className="text-xl font-semibold">Kids</h3>
            <p>Playful, fun, and durable fashion for the little ones.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16 bg-white">
        <h2 className="text-2xl font-semibold text-[#8B5E3C] mb-4">
          Ready to redefine your wardrobe?
        </h2>
        <a
          href="/auth/login"
          className="bg-white text-[#8B5E3C] border-2 border-[#8B5E3C] px-6 py-3 font-semibold hover:bg-[#8B5E3C] hover:text-white transition duration-300 inline-block"
        >
          Shop Now
        </a>
      </section>
    </div>
  );
};

export default AboutUs;
