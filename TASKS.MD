# TASKS.MD - Foxer App

## How This Works
- Tasks are listed below with status: [ ] open, [x] done, [~] in progress
- @fapp picks the next open task, implements it, commits, reports to @claudex
- @claudex reviews and marks done

---

## Active Tasks

### TASK-001: Add localization (i18n) foundation
**Status:** [ ] open
**Scope:** Both web (foxer-web) and mobile (fApp/fapp)
**Description:**
Set up the localization/i18n infrastructure so the app supports English and Finnish from the start.

**Web (React/Vite):**
- Install and configure `i18next` + `react-i18next`
- Create `src/locales/en.json` and `src/locales/fi.json`
- Add a language switcher component (EN/FI toggle)
- Wrap the app with the i18n provider
- Move any hardcoded strings in existing components to translation keys

**Mobile (Flutter):**
- Add `flutter_localizations` and `intl` to pubspec.yaml
- Create `lib/l10n/app_en.arb` and `lib/l10n/app_fi.arb`
- Configure `MaterialApp` with localizationsDelegates and supportedLocales
- Move any hardcoded strings in existing widgets to localization keys

**Done when:**
- Both apps compile and run
- Language can be switched between EN and FI
- No hardcoded user-visible strings remain in the skeleton code
- Commit message: `feat: add i18n foundation (EN + FI)`

---

## Completed Tasks
_(none yet)_
