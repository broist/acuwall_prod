"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Loader2 } from "lucide-react";

export default function QuoteForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    wallLength: "",
    wallHeight: "",
    needsConstruction: "",
    needsDemolition: "",
    needsTerrainWork: "",
    isFlat: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/send-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
      } else {
        setError("Hiba történt az ajánlatkérés elküldése során. Kérjük, próbálja újra.");
      }
    } catch (err) {
      setError("Hiba történt az ajánlatkérés elküldése során. Kérjük, próbálja újra.");
      console.error("Error submitting form:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center"
        data-testid="quote-success-message"
      >
        <CheckCircle className="mx-auto text-green-500 mb-6" size={64} />
        <h2 className="text-2xl font-bold mb-4">Köszönjük ajánlatkérését!</h2>
        <p className="text-light-gray mb-6">
          Munkatársunk hamarosan felveszi Önnel a kapcsolatot.
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              name: "",
              email: "",
              phone: "",
              location: "",
              wallLength: "",
              wallHeight: "",
              needsConstruction: "",
              needsDemolition: "",
              needsTerrainWork: "",
              isFlat: "",
              message: "",
            });
          }}
          className="btn-secondary"
          data-testid="quote-new-request-button"
        >
          Új ajánlatkérés
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 space-y-6"
      data-testid="quote-form"
    >
      {/* Personal Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name">Név *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full"
            data-testid="quote-input-name"
          />
        </div>
        <div>
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full"
            data-testid="quote-input-email"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone">Telefonszám *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full"
            data-testid="quote-input-phone"
          />
        </div>
        <div>
          <label htmlFor="location">Projekt helyszíne *</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full"
            data-testid="quote-input-location"
          />
        </div>
      </div>

      {/* Wall Specs */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="wallLength">Fal hossza (méter) *</label>
          <input
            type="number"
            id="wallLength"
            name="wallLength"
            value={formData.wallLength}
            onChange={handleChange}
            required
            min="1"
            className="w-full"
            data-testid="quote-input-wall-length"
          />
        </div>
        <div>
          <label htmlFor="wallHeight">Fal magassága (méter) *</label>
          <input
            type="number"
            id="wallHeight"
            name="wallHeight"
            value={formData.wallHeight}
            onChange={handleChange}
            required
            min="0.5"
            step="0.5"
            className="w-full"
            data-testid="quote-input-wall-height"
          />
        </div>
      </div>

      {/* Yes/No Questions */}
      <div className="space-y-6">
        <div>
          <label className="mb-3">Szükséges kivitelezés? *</label>
          <div className="radio-group flex gap-6">
            <label>
              <input
                type="radio"
                name="needsConstruction"
                value="igen"
                checked={formData.needsConstruction === "igen"}
                onChange={handleChange}
                required
                data-testid="quote-radio-construction-yes"
              />
              Igen
            </label>
            <label>
              <input
                type="radio"
                name="needsConstruction"
                value="nem"
                checked={formData.needsConstruction === "nem"}
                onChange={handleChange}
                data-testid="quote-radio-construction-no"
              />
              Nem
            </label>
          </div>
        </div>

        <div>
          <label className="mb-3">Kell bontási munkát végezni a falpanel nyomvonalában? *</label>
          <div className="radio-group flex gap-6">
            <label>
              <input
                type="radio"
                name="needsDemolition"
                value="igen"
                checked={formData.needsDemolition === "igen"}
                onChange={handleChange}
                required
                data-testid="quote-radio-demolition-yes"
              />
              Igen
            </label>
            <label>
              <input
                type="radio"
                name="needsDemolition"
                value="nem"
                checked={formData.needsDemolition === "nem"}
                onChange={handleChange}
                data-testid="quote-radio-demolition-no"
              />
              Nem
            </label>
          </div>
        </div>

        <div>
          <label className="mb-3">Szükséges tereprendezés? *</label>
          <div className="radio-group flex gap-6">
            <label>
              <input
                type="radio"
                name="needsTerrainWork"
                value="igen"
                checked={formData.needsTerrainWork === "igen"}
                onChange={handleChange}
                required
                data-testid="quote-radio-terrain-yes"
              />
              Igen
            </label>
            <label>
              <input
                type="radio"
                name="needsTerrainWork"
                value="nem"
                checked={formData.needsTerrainWork === "nem"}
                onChange={handleChange}
                data-testid="quote-radio-terrain-no"
              />
              Nem
            </label>
          </div>
        </div>

        <div>
          <label className="mb-3">A terület jelenleg sík? *</label>
          <div className="radio-group flex gap-6">
            <label>
              <input
                type="radio"
                name="isFlat"
                value="igen"
                checked={formData.isFlat === "igen"}
                onChange={handleChange}
                required
                data-testid="quote-radio-flat-yes"
              />
              Igen
            </label>
            <label>
              <input
                type="radio"
                name="isFlat"
                value="nem"
                checked={formData.isFlat === "nem"}
                onChange={handleChange}
                data-testid="quote-radio-flat-no"
              />
              Nem
            </label>
          </div>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message">Üzenet</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full resize-none"
          placeholder="További információk a projekttel kapcsolatban..."
          data-testid="quote-input-message"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400">
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        data-testid="quote-submit-button"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Küldés...
          </>
        ) : (
          <>
            <Send size={18} />
            Ajánlatkérés
          </>
        )}
      </button>
    </motion.form>
  );
}
