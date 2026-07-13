import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Adatkezelési tájékoztató | AcuWall",
  description:
    "Az AcuWall ajánlatkérő űrlapján megadott személyes adatok kezelésének feltételei.",
};

export default function AdatkezelesPage() {
  return (
    <section className="section-spacing pt-32 md:pt-40">
      <div className="container-custom max-w-3xl">
        <Link
          href="/#ajanlatkeres"
          className="inline-flex items-center gap-2 text-light-gray hover:text-white text-sm mb-10 transition-colors"
        >
          <ArrowLeft size={16} />
          Vissza a főoldalra
        </Link>

        <span className="eyebrow mb-6">Adatkezelés</span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10 tracking-tight">
          Adatkezelési <span className="text-accent">tájékoztató</span>
        </h1>

        <div className="space-y-8 text-light-gray leading-relaxed">
          <div className="card p-7">
            <h2 className="text-white text-xl font-bold mb-3">1. Az adatkezelő</h2>
            <p>
              AcuWall — könnyűszerkezetes épületek generálkivitelezése.
              <br />
              E-mail: acuwall@acuwall.hu · Telefon: +36 30 830 5556
            </p>
          </div>

          <div className="card p-7">
            <h2 className="text-white text-xl font-bold mb-3">2. A kezelt adatok köre</h2>
            <p>
              Az ajánlatkérő űrlapon megadott adatok: név, e-mail cím,
              telefonszám, a projekt helyszíne, valamint az Ön által önkéntesen
              megadott projektadatok (épület típusa, alapterület, telek
              állapota, tervezési igény, tervezett indulás, projektleírás).
            </p>
          </div>

          <div className="card p-7">
            <h2 className="text-white text-xl font-bold mb-3">3. Az adatkezelés célja és jogalapja</h2>
            <p>
              Az adatokat kizárólag az ajánlatkérés feldolgozásához, a
              kapcsolatfelvételhez és az ajánlat elkészítéséhez használjuk fel.
              Az adatkezelés jogalapja az Ön hozzájárulása (GDPR 6. cikk (1)
              bekezdés a) pont), amelyet az űrlap elküldése előtt, a jelölőnégyzet
              bepipálásával ad meg.
            </p>
          </div>

          <div className="card p-7">
            <h2 className="text-white text-xl font-bold mb-3">4. Az adatkezelés időtartama</h2>
            <p>
              Az adatokat az ajánlatkérés lezárásáig, illetve az Ön törlési
              kérelméig kezeljük. Hozzájárulását bármikor visszavonhatja az
              acuwall@acuwall.hu címre küldött üzenettel.
            </p>
          </div>

          <div className="card p-7">
            <h2 className="text-white text-xl font-bold mb-3">5. Az Ön jogai</h2>
            <p>
              Bármikor tájékoztatást kérhet adatai kezeléséről, kérheti azok
              helyesbítését, törlését vagy kezelésük korlátozását. Panasszal a
              Nemzeti Adatvédelmi és Információszabadság Hatósághoz (NAIH)
              fordulhat.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
