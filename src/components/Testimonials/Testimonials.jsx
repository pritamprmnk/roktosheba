const Testimonials = () => {
  const reviews = [
    { name: "Rahim Uddin", role: "Recipient", text: "Found blood within 30 minutes for my surgery. Forever grateful to RoktoSheba!" },
    { name: "Sultana Kamal", role: "Donor", text: "The dashboard is so user-friendly. I can manage my donations easily." }
  ];

  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Donor <span className="text-red-600">Stories</span></h2>
      <div className="flex flex-wrap justify-center gap-6 px-4">
        {reviews.map((r, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm max-w-sm border-t-4 border-red-500">
            <p className="italic text-gray-600 mb-4">"{r.text}"</p>
            <h4 className="font-bold text-gray-800">{r.name}</h4>
            <span className="text-xs text-red-500 font-semibold uppercase tracking-widest">{r.role}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Testimonials;