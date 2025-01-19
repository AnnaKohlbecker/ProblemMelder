# ProblemMelder

# Installation

## Editor Setup

Für die Entwicklung sollte VSCode genutzt werden. Einige grundlegende Einstellungen werden durch das `.vscode`-Verzeichnis automatisch angewandt. Zudem sollten die empfohlenen Erweiterungen installiert werden.

## Voraussetzungen:

- Node.js
- Git

## Schritte:

1. Repository klonen:
    ```bash
    git clone https://github.com/schmieders/VorlesungsBewertung.git
    ```
2. Navigiere in das Projektverzeichnis:
    ```bash
    cd VorlesungsBewertung
    ```
3. Abhängigkeiten installieren:

    ```bash
    npm install
    ```

4. Umgebungsvariablen setzen

    - Kopiere `.env.example` zu `.env` und füge die notwendigen Werte ein.
    - (Um einen Build zu ermöglichen müssen diese auch als Secret in EAS gesetzt werden. Führe dafür `eas env:create` aus und folge den Anweisungen.)

5. App starten:
    ```bash
    npx expo
    ```

# Entwicklung

## TypeScript Watch

Für die Entwicklung nutzen wir TypeScript Watch, um typsicher zu arbeiten. Um dies zu tun sollten die empfohlenen Erweiterungen genutzt werden und TypeScript global installiert sein.

```bash
npm install -g typescript
```

Die TypeScript Watch wird automatisch gestartet, wenn der Ordner in VSCode geöffnet wird. Eventuell muss ein anderes Standard Terminal ausgewählt werden. Empfohlen ist das Standard Windows CMD.

## Branching-Strategie (Feature Branching)

In diesem Projekt verwenden wir die Feature Branching-Strategie. Das bedeutet, dass für jedes neue Feature oder jede Änderung ein eigener Branch vom Hauptbranch `main` erstellt wird.

Wenn du ein neues Feature entwickeln möchtest, erstelle einen neuen Branch, der eindeutig den Zweck oder das Feature beschreibt, an dem du arbeitest. Zum Beispiel:

```bash
git checkout -b feature/login-screen
```

Änderungen an diesem Feature werden ausschließlich in diesem Branch durchgeführt.
Sobald das Feature vollständig entwickelt und getestet ist, wird es über einen Pull Request in den Hauptbranch integriert (siehe unten).

## Pull Requests mit Approval auf GitHub

Nach Abschluss der Arbeit an einem Feature sollte der Code in den Hauptbranch integriert werden. Dazu wird ein Pull Request (PR) erstellt.

### Erstellen eines Pull Requests

Sobald der Code fertig ist, pushe den Branch auf GitHub und erstelle einen Pull Request.

Stelle sicher, dass der PR eine aussagekräftige Beschreibung enthält, die erklärt, was geändert wurde und warum.

### Code-Review und Approval

Ein anderer Entwickler überprüft den PR. Der PR muss von mindestens einer Person genehmigt (approved) werden, bevor er gemerged werden kann.

Feedback des Reviewers wird entweder als Änderungsanfrage oder als Genehmigung markiert.
Falls Änderungen erforderlich sind, nehme sie vor und pushe die neuen Änderungen in denselben Branch. Der PR wird automatisch aktualisiert.

### Merge des Pull Requests

Nachdem der PR genehmigt wurde, kann der PR in den Hauptbranch gemerged werden. Hierfür wählen wir **immer** die Merge-Strategie des **Squash-Merge**. Somit werden alle Änderungen und Commits aus der Feature-Branch zu einem Commit in der `main` Branch, der eine aussagekräftige Commit-Message nach der folgenden Struktur enthalten sollte.

## Commit-Messages

Unsere Commit-Messages auf der `main` Branch bauen wir nach folgendem allgemeinen Schema auf:

```
type(<scope>): <subject>
```

Der `type` bezieht sich dabei auf die Art der Arbeit, die im Commit getan wurde. Wir nutzen folgende Typen:

- feat - Ein neues Feature wurde implementiert
- fix - Ein Bug wurde behoben
- chore - Andere Tätigkeiten wie Konfigurations-Änderungen, Dependency-Updates, etc.
- refactor - Ein veralteter oder unschöner Code wurde überarbeitet

Das `scope` grenzt ein, an welchem Teil der App gearbeitet wurde. Wenn irrelevant kann das scope samt klammern weggelassen werden.

Das `subject` beschreibt, was getan wurde.

### Beispiele

```
feat(Auth): Add login page
```

```
fix: Use correct hex code for colorization
```

```
chore(README): Add new README file
```

```
refactor: Ensure all colors are used from constants instead of literals
```

# Lizenz

Dieses Projekt ist unter der MIT-Lizenz freigegeben. Nähere Informationen zur Lizenz befinden sich in der `LICENSE` Datei.
