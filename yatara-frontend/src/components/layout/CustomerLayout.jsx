
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
import WhatsAppWidget from '../ui/WhatsAppWidget';

const CustomerLayout = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-[#E6F4F1]">
      <Sidebar />
      <main className="min-h-screen md:ml-[17.5rem]">
        <header className="glass-surface sticky top-3 z-20 mx-4 border border-[#10B981]/25 px-4 py-4 md:mx-8 md:px-8">
          <h1 className="text-lg font-semibold">Customer Lounge</h1>
        </header>
        <section className="p-4 md:p-8">
          <Outlet />
        </section>
        <Footer />
        <WhatsAppWidget />
      </main>
    </div>
  );
};

export default CustomerLayout;