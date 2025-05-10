import Link from 'next/link';

const AdminWelcomePanel = () => {
  return (
    <section className="bg-[#8B5E3C] text-white py-12 px-6 text-center">
      <h1 className="text-3xl font-bold mb-2">Welcome, Admin 👋</h1>
      <p className="text-lg mb-8 text-white/90">Manage your store efficiently from here.</p>

      <div className="flex justify-center gap-6 flex-wrap">
        <Link href="/admin/add-product">
          <button className="bg-white text-[#8B5E3C] font-semibold px-8 py-3  hover:bg-[#8B5E3C] hover:text-white  hover:border hover:border-white  transition-all">
             Add Product
          </button>
        </Link>

        <Link href="/admin/orders">
          <button className="bg-white text-[#8B5E3C] font-semibold px-8 py-3 hover:bg-[#8B5E3C] hover:text-white  hover:border hover:border-white transition-all">
             View Orders
          </button>
        </Link>
      </div>
    </section>
  );
};

export default AdminWelcomePanel;
