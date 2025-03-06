# 🛠️ Supabase Setup

Dieses Verzeichnis enthält die Konfiguration und Typdefinitionen für die Supabase-Integration in diesem Projekt. Die Supabase-Typen werden automatisch aus der Datenbank generiert und ermöglichen eine **typsichere Interaktion** mit der API.

## 📂 Ordnerstruktur

- **`index.ts`** → Erstellt und exportiert eine Supabase-Instanz mit den `.env`-Variablen.
- **`models.ts`** → Enthält die automatisch generierten Typdefinitionen der Supabase-Datenbank.
- **`types.ts`** -> Enthält die extrahierten Typen der einzelnen Datenbank Tabellen zur Nutzung innerhalb des Codes.

## 🔧 Einrichtung & Nutzung

### 1️⃣ **Supabase-Instanz nutzen**

Die `index.ts` Datei stellt eine konfigurierte Supabase-Instanz bereit, die in der gesamten Codebase genutzt werden kann:

```typescript
import supabase from './index'

const { data, error } = await supabase.from('authority').select('*')
if (error) console.error(error)
console.log(data)
```

### 2️⃣ **Datenbank-Typen aktualisieren**

Falls sich das Datenbankschema ändert, müssen die TypeScript-Typen in `models.ts` aktualisiert werden.

#### **Befehl zur Aktualisierung:**

```sh
npx supabase login  # Falls du noch nicht eingeloggt bist
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > ./src/supabase/models.ts
npx prettier --write ./src/supabase/models.ts # Formatierung anpassen
npx eslint --fix ./src/supabase/models.ts # ESLint Probleme beheben
```

📌 **Hinweis:** Dein **`YOUR_PROJECT_ID`** findest du im Supabase-Dashboard unter **Settings → General**.

## ⚠️ Wichtige Hinweise

- **Immer nach Datenbank-Änderungen `models.ts` aktualisieren**, um veraltete Typen zu vermeiden.
- **Die Supabase-Instanz greift auf `.env`-Variablen zu**, stelle sicher, dass die Keys korrekt gesetzt sind.
- **Verwende die generierten Typen für typsichere Queries**, um Fehler zu vermeiden.

## 📌 Weiterführende Links

- [Supabase Docs](https://supabase.com/docs)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/)
