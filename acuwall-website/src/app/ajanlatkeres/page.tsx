import QuoteForm from "@/components/quote/QuoteForm";

export default function QuotePage() {
  return (
    <section className="min-h-screen bg-primary pt-32 pb-20" data-testid="quote-page">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block text-accent text-sm font-semibold tracking-wider uppercase mb-4">
              Ajánlatkérés
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="quote-page-title">
              Kérjen egyedi ajánlatot
            </h1>
            <p className="text-light-gray text-lg">
              Minden projekt egyedi, ezért az ár a szükséges mennyiség és kivitelezési igény 
              alapján kerül meghatározásra.
            </p>
          </div>

          {/* Form */}
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
