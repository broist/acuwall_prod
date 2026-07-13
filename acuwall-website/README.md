# AcuWall Website

Modern, premium ipari technológiai weboldal az AcuWall zajvédő falrendszerekhez.

## Technológiák

- **Next.js 14** - React keretrendszer
- **TypeScript** - Típusbiztos JavaScript
- **Tailwind CSS** - Utility-first CSS keretrendszer
- **Framer Motion** - Animációs könyvtár
- **Lucide React** - Ikonok

## Telepítés Docker-rel

### Előfeltételek

1. Telepítsd a Docker-t a szerveredre:
   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install docker.io docker-compose
   
   # Docker szolgáltatás indítása
   sudo systemctl start docker
   sudo systemctl enable docker
   ```

### Lépések

1. **Repository klónozása**
   ```bash
   git clone <repository-url>
   cd acuwall-website
   ```

2. **Docker kép építése**
   ```bash
   docker-compose build
   ```

3. **Konténer indítása**
   ```bash
   docker-compose up -d
   ```

4. **Weboldal elérése**
   - Nyisd meg a böngészőben: `http://szerver-ip:3000`
   - Vagy ha lokálisan futtatod: `http://localhost:3000`

### Hasznos parancsok

```bash
# Konténer leállítása
docker-compose down

# Logok megtekintése
docker-compose logs -f

# Konténer újraindítása
docker-compose restart

# Konténer státusz
docker-compose ps
```

## Frissítés

Ha frissíteni szeretnéd a weboldalt:

```bash
# Új kód letöltése
git pull

# Kép újraépítése és indítása
docker-compose down
docker-compose build
docker-compose up -d
```

## Fejlesztés (Docker nélkül)

```bash
# Függőségek telepítése
npm install

# Fejlesztési szerver indítása
npm run dev

# Produkciós build
npm run build
npm start
```

## Projekt struktúra

```
acuwall-website/
├── src/
│   ├── app/                 # Next.js App Router oldalak
│   │   ├── page.tsx         # Főoldal
│   │   ├── termek/          # Termék oldal
│   │   ├── ajanlatkeres/    # Ajánlatkérés oldal
│   │   ├── kapcsolat/       # Kapcsolat oldal
│   │   └── munkavédelem/    # Munkavédelem oldal
│   └── components/          # React komponensek
│       ├── home/            # Főoldal komponensek
│       ├── product/         # Termék oldal komponensek
│       ├── quote/           # Ajánlatkérés komponensek
│       └── safety/          # Munkavédelem komponensek
├── public/
│   └── images/              # Képek
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## Kapcsolat

- **Email:** acuwall@acuwall.hu
- **Telefon:** +36 30 830 5556
