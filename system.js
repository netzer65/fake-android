const AndroidOS = (() => {
  const STORAGE_KEY = 'android_web_os_state_v2';
  const UNLOCK_WINDOW_MS = 5 * 60 * 1000;

  let liveBattery = {
    supported: false,
    level: 94,
    charging: false
  };

  const I18N = {
    de: {
      locale: 'de-DE',
      osName: 'Android 16',
      quickSettings: 'Schnelleinstellungen',
      wifi: 'WLAN',
      darkMode: 'Dunkelmodus',
      dnd: 'Nicht stören',
      calculator: 'Rechner',
      settings: 'Einstellungen',
      lockScreen: 'Bildschirm sperren',
      unlock: 'Entsperren',
      unlockPinTitle: 'PIN eingeben',
      unlockHint: 'Mit PIN entsperren oder direkt wischen',
      wrongPin: 'Falsche PIN',
      clear: 'Löschen',
      back: 'Zurück',
      home: 'Startbildschirm',
      lock: 'Sperren',
      powerOff: 'Ausschalten',
      restart: 'Neu starten',
      finished: 'Fertig!',
      searchSettings: 'Einstellungen durchsuchen',
      netTitle: 'Netzwerk und Internet',
      netSub: 'Mobilfunk, WLAN, Hotspot',
      connTitle: 'Verbundene Geräte',
      connSub: 'Bluetooth, Koppeln',
      appsTitle: 'Apps',
      appsSub: 'Assistent, zuletzt geöffnete Apps, Standard-Apps',
      notifTitle: 'Benachrichtigungen',
      notifSub: 'Benachrichtigungsverlauf, Unterhaltungen',
      soundTitle: 'Ton und Vibration',
      soundSub: 'Lautstärke und Haptik',
      modesTitle: 'Modi',
      modesSub: 'Nicht stören, Nachtruhe, Fahren',
      displayTitle: 'Display und Touch',
      displaySub: 'Dunkelmodus, Schriftgröße, Touch',
      styleTitle: 'Hintergrundbild und Stil',
      styleSub: 'Farben, thematische Symbole, App-Raster',
      batteryTitle: 'Akku',
      batterySub: (lvl, chg) => chg ? `${lvl}% · Lädt` : `${lvl}% · Geräteakku`,
      accountTitle: 'Google-Konto',
      accountSub: (name, email) => `${name} · ${email}`,
      familyTitle: 'Family Link',
      familySub: (active, limit) => active ? `Aktiv · Tageslimit ${limit} Min.` : 'Verwaltet · Bildschirmzeit & App-Limits',
      systemTitle: 'System & Sicherung',
      systemSub: 'Sprache, PIN, Backup, Neustart & Ausschalten',
      saved: 'Gespeichert.'
    },
    en: {
      locale: 'en-US',
      osName: 'Android 16',
      quickSettings: 'Quick Settings',
      wifi: 'Wi-Fi',
      darkMode: 'Dark theme',
      dnd: 'Do Not Disturb',
      calculator: 'Calculator',
      settings: 'Settings',
      lockScreen: 'Lock screen',
      unlock: 'Unlock',
      unlockPinTitle: 'Enter PIN',
      unlockHint: 'Unlock with PIN or swipe/tap to unlock',
      wrongPin: 'Incorrect PIN',
      clear: 'Clear',
      back: 'Back',
      home: 'Home',
      lock: 'Lock',
      powerOff: 'Power off',
      restart: 'Restart',
      finished: 'Done!',
      searchSettings: 'Search settings',
      netTitle: 'Network and internet',
      netSub: 'Mobile, Wi-Fi, hotspot',
      connTitle: 'Connected devices',
      connSub: 'Bluetooth, pairing',
      appsTitle: 'Apps',
      appsSub: 'Assistant, recent apps, default apps',
      notifTitle: 'Notifications',
      notifSub: 'Notification history, conversations',
      soundTitle: 'Sound and vibration',
      soundSub: 'Volume and haptics',
      modesTitle: 'Modes',
      modesSub: 'Do Not Disturb, Bedtime, Driving',
      displayTitle: 'Display and touch',
      displaySub: 'Dark theme, font size, touch',
      styleTitle: 'Wallpaper and style',
      styleSub: 'Colours, themed icons, app grid',
      batteryTitle: 'Battery',
      batterySub: (lvl, chg) => chg ? `${lvl}% · Charging` : `${lvl}% · Device battery`,
      accountTitle: 'Google Account',
      accountSub: (name, email) => `${name} · ${email}`,
      familyTitle: 'Family Link',
      familySub: (active, limit) => active ? `Active · ${limit} min daily limit` : 'Supervised · Screen time & app limits',
      systemTitle: 'System & Backup',
      systemSub: 'Language, PIN, backup, restart & power off',
      saved: 'Saved.'
    },
    fr: {
      locale: 'fr-FR',
      osName: 'Android 16',
      quickSettings: 'Réglages rapides',
      wifi: 'Wi-Fi',
      darkMode: 'Mode sombre',
      dnd: 'Ne pas déranger',
      calculator: 'Calculatrice',
      settings: 'Paramètres',
      lockScreen: 'Verrouiller l’écran',
      unlock: 'Déverrouiller',
      unlockPinTitle: 'Saisir le code PIN',
      unlockHint: 'Déverrouiller par PIN ou glisser pour ouvrir',
      wrongPin: 'Code PIN incorrect',
      clear: 'Effacer',
      back: 'Retour',
      home: 'Accueil',
      lock: 'Verrouiller',
      powerOff: 'Éteindre',
      restart: 'Redémarrer',
      finished: 'Terminé !',
      searchSettings: 'Rechercher dans les paramètres',
      netTitle: 'Réseau et Internet',
      netSub: 'Mobile, Wi-Fi, point d’accès',
      connTitle: 'Appareils connectés',
      connSub: 'Bluetooth, association',
      appsTitle: 'Applications',
      appsSub: 'Assistant, applis récentes, par défaut',
      notifTitle: 'Notifications',
      notifSub: 'Historique, conversations',
      soundTitle: 'Son et vibrations',
      soundSub: 'Volume et retour haptique',
      modesTitle: 'Modes',
      modesSub: 'Ne pas déranger, Coucher, Conduite',
      displayTitle: 'Affichage et tactile',
      displaySub: 'Thème sombre, taille du texte, tactile',
      styleTitle: 'Fond d’écran et style',
      styleSub: 'Couleurs, icônes thématiques, grille',
      batteryTitle: 'Batterie',
      batterySub: (lvl, chg) => chg ? `${lvl}% · En charge` : `${lvl}% · Batterie de l’appareil`,
      accountTitle: 'Compte Google',
      accountSub: (name, email) => `${name} · ${email}`,
      familyTitle: 'Family Link',
      familySub: (active, limit) => active ? `Actif · Limite ${limit} min/j` : 'Contrôle parental · Temps d’écran et applis',
      systemTitle: 'Système et sauvegarde',
      systemSub: 'Langue, PIN, sauvegarde, redémarrer et éteindre',
      saved: 'Enregistré.'
    },
    es: {
      locale: 'es-ES',
      osName: 'Android 16',
      quickSettings: 'Ajustes rápidos',
      wifi: 'Wi-Fi',
      darkMode: 'Modo oscuro',
      dnd: 'No molestar',
      calculator: 'Calculadora',
      settings: 'Ajustes',
      lockScreen: 'Bloquear pantalla',
      unlock: 'Desbloquear',
      unlockPinTitle: 'Introducir PIN',
      unlockHint: 'Desbloquear con PIN o deslizar para abrir',
      wrongPin: 'PIN incorrecto',
      clear: 'Borrar',
      back: 'Atrás',
      home: 'Inicio',
      lock: 'Bloquear',
      powerOff: 'Apagar',
      restart: 'Reiniciar',
      finished: '¡Listo!',
      searchSettings: 'Buscar en ajustes',
      netTitle: 'Red e Internet',
      netSub: 'Móvil, Wi-Fi, zona Wi-Fi',
      connTitle: 'Dispositivos conectados',
      connSub: 'Bluetooth, vinculación',
      appsTitle: 'Apps',
      appsSub: 'Asistente, apps recientes, predeterminadas',
      notifTitle: 'Notificaciones',
      notifSub: 'Historial, conversaciones',
      soundTitle: 'Sonido y vibración',
      soundSub: 'Volumen y vibración háptica',
      modesTitle: 'Modos',
      modesSub: 'No molestar, Descanso, Conducción',
      displayTitle: 'Pantalla y toque',
      displaySub: 'Tema oscuro, tamaño de fuente, toque',
      styleTitle: 'Fondo de pantalla y estilo',
      styleSub: 'Colores, iconos temáticos, cuadrícula',
      batteryTitle: 'Batería',
      batterySub: (lvl, chg) => chg ? `${lvl}% · Cargando` : `${lvl}% · Batería del dispositivo`,
      accountTitle: 'Cuenta de Google',
      accountSub: (name, email) => `${name} · ${email}`,
      familyTitle: 'Family Link',
      familySub: (active, limit) => active ? `Activo · Límite ${limit} min/día` : 'Supervisión · Tiempo de pantalla y apps',
      systemTitle: 'Sistema y copia de seguridad',
      systemSub: 'Idioma, PIN, copia, reiniciar y apagar',
      saved: 'Guardado.'
    },
    ja: {
      locale: 'ja-JP',
      osName: 'Android 16',
      quickSettings: 'クイック設定',
      wifi: 'Wi-Fi',
      darkMode: 'ダークテーマ',
      dnd: 'マナーモード',
      calculator: '電卓',
      settings: '設定',
      lockScreen: '画面をロック',
      unlock: 'ロック解除',
      unlockPinTitle: 'PINを入力',
      unlockHint: 'PINで解除するかスワイプ/タップで開く',
      wrongPin: 'PINが正しくありません',
      clear: '消去',
      back: '戻る',
      home: 'ホーム',
      lock: 'ロック',
      powerOff: '電源を切る',
      restart: '再起動',
      finished: '完了!',
      searchSettings: '設定を検索',
      netTitle: 'ネットワークとインターネット',
      netSub: 'モバイル、Wi-Fi、テザリング',
      connTitle: '接続済みのデバイス',
      connSub: 'Bluetooth、ペア設定',
      appsTitle: 'アプリ',
      appsSub: 'アシスタント、最近のアプリ、デフォルト',
      notifTitle: '通知',
      notifSub: '通知履歴、会話',
      soundTitle: '音とバイブレーション',
      soundSub: '音量と触覚フィードバック',
      modesTitle: 'モード',
      modesSub: 'マナーモード、おやすみ時間、運転モード',
      displayTitle: 'ディスプレイとタッチ',
      displaySub: 'ダークテーマ、フォントサイズ、タッチ',
      styleTitle: '壁紙とスタイル',
      styleSub: 'カラー、テーマアイコン、グリッド',
      batteryTitle: 'バッテリー',
      batterySub: (lvl, chg) => chg ? `${lvl}% · 充電中` : `${lvl}% · デバイスバッテリー`,
      accountTitle: 'Google アカウント',
      accountSub: (name, email) => `${name} · ${email}`,
      familyTitle: 'ファミリー リンク',
      familySub: (active, limit) => active ? `有効 · 1日${limit}分の上限` : '管理 · スクリーンタイムとアプリ制限',
      systemTitle: 'システムとバックアップ',
      systemSub: '言語、PIN、バックアップ、再起動と電源オフ',
      saved: '保存しました。'
    }
  };

  function createDefaultState() {
    return {
      hasData: false,
      oobeCompleted: false,
      poweredOff: false,
      locked: true,
      lastUnlockedAt: 0,
      lockPin: '',
      deviceName: 'Pixel 10',
      userName: 'Guest',
      language: 'de',
      theme: 'ocean',
      mode: 'light',
      brightness: 100,
      wifi: true,
      bluetooth: true,
      dnd: false,
      dynamicIslandEnabled: false,
      desktopMode: false,
      onScreenKeyboard: false,
      accessibility: {
        largeText: false,
        highContrast: false,
        reduceMotion: false,
        underlineLinks: false,
        readAloud: false
      },
      notifications: [
        { id: 'm1', app: 'Nachrichten', title: 'Neue Systemmeldung', body: 'Liquid Glass („Glass“), Maps, Chrome & Mini-Duolingo sind bereit.', read: false },
        { id: 'm2', app: 'Kalender', title: 'Erinnerung', body: 'Weekly Sync & Planning steht auf der Liste.', read: false }
      ],
      duolingo: { xp: 40, streak: 3, hearts: 5 },
      chromeBookmarks: ['https://android16.local/start', 'https://android16.local/news'],
      batteryLevel: 94,
      batteryCharging: false,
      googleAccount: {
        signedIn: true,
        name: 'Guest User',
        email: 'guest.user@example.com',
        syncDrive: true,
        syncPhotos: true,
        syncContacts: true,
        storageUsedGb: 18.4,
        storageTotalGb: 100
      },
      familyLink: {
        enabled: true,
        parentName: 'Alex Morgan',
        parentEmail: 'parent.family@example.com',
        dailyLimitMinutes: 180,
        usedMinutesToday: 42,
        bedtimeEnabled: true,
        bedtimeStart: '22:00',
        bedtimeEnd: '07:00',
        blockedApps: ['musik.html']
      },
      timers: [
        { id: 't1', label: 'Focus Timer', duration: 1500, remaining: 1500, running: false, endAt: null }
      ],
      tasks: [
        { id: 's1', text: 'Review project checklist', done: false },
        { id: 's2', text: 'Check calendar schedule', done: true },
        { id: 's3', text: 'Install system updates', done: false }
      ],
      fakeWifi: {
        ssid: 'PixelNet-5G-Home',
        security: 'WPA2/WPA3-PSK',
        signal: -42,
        ipAddress: '192.168.178.42',
        gateway: '192.168.178.1',
        dns: '1.1.1.1',
        connectedAt: 'Heute',
        savedNetworks: [
          { ssid: 'PixelNet-5G-Home', security: 'WPA2/WPA3-PSK', signal: -42 },
          { ssid: 'Campus-Guest-WiFi', security: 'Offen', signal: -58 },
          { ssid: 'FiberBox-2.4G', security: 'WPA2-PSK', signal: -67 },
          { ssid: 'Nordhorn-Fiber-Mesh', security: 'WPA3-SAE', signal: -51 }
        ]
      },
      docs: [
        {
          id: 'doc_1',
          title: 'Projektplan & Notizen',
          folder: 'Dokumente',
          content: 'Willkommen in Docs!\n\nDieses Dokument ist direkt mit Files synchronisiert und lässt sich mobil sowie auf dem Desktop bearbeiten.',
          updated: 'Heute'
        },
        {
          id: 'doc_2',
          title: 'Reise-Checkliste',
          folder: 'Reisen',
          content: '- Ausweis / Tickets\n- Ladekabel & Powerbank\n- Unterkunftsbestätigung',
          updated: 'Heute'
        }
      ],
      notes: [
        { id: 'n1', title: 'Welcome to Android Web OS', body: 'All apps share Material You themes, timers, notes, tasks, and calendar items via localStorage.', updated: 'Today' },
        { id: 'n2', title: 'Quick tip', body: 'Pull down or tap the top status bar to open Quick Settings at any time.', updated: 'Yesterday' }
      ],
      calendarEvents: [
        { id: 'c1', date: '2026-11-22', title: 'Weekly Sync & Planning', time: '19:30' },
        { id: 'c2', date: '2026-11-24', title: 'Design Review', time: '10:00' }
      ],
      gallery: [
        { id: 'g1', title: 'Coastal Horizon', tag: 'Nature', color1: '#0061A4', color2: '#D1E4FF', icon: 'wb_twilight' },
        { id: 'g2', title: 'Pine Forest Trail', tag: 'Outdoors', color1: '#2D6A4F', color2: '#B7E4C7', icon: 'forest' },
        { id: 'g3', title: 'Urban Geometry', tag: 'Architecture', color1: '#6750A4', color2: '#EADDFF', icon: 'apartment' },
        { id: 'g4', title: 'Desk Workspace', tag: 'Studio', color1: '#8B5000', color2: '#FFDCBE', icon: 'devices' }
      ],
      contacts: [
        { id: 'p1', name: 'Alex Morgan', role: 'Engineering', phone: '+1 555 014 8920', color: '#0061A4' },
        { id: 'p2', name: 'Samira Patel', role: 'Product Design', phone: '+1 555 019 3314', color: '#2D6A4F' },
        { id: 'p3', name: 'Kenji Sato', role: 'Systems & QA', phone: '+1 555 017 6641', color: '#6750A4' }
      ]
    };
  }

  function normalizeLang(lang) {
    if (!lang) return 'de';
    const l = String(lang).toLowerCase();
    if (l.startsWith('en')) return 'en';
    if (l.startsWith('fr')) return 'fr';
    if (l.startsWith('es')) return 'es';
    if (l.startsWith('ja')) return 'ja';
    return 'de';
  }

  function getLang(state = getState()) {
    return normalizeLang(state.language);
  }

  function t(key, state = getState(), ...args) {
    const lang = getLang(state);
    const val = (I18N[lang] && I18N[lang][key] !== undefined) ? I18N[lang][key] : I18N.de[key];
    if (typeof val === 'function') return val(...args);
    return val !== undefined ? val : key;
  }

  function hasRawStorage() {
    try {
      return localStorage.getItem(STORAGE_KEY) !== null;
    } catch (e) {
      return false;
    }
  }

  function getState() {
    const base = createDefaultState();
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return base;
      const parsed = JSON.parse(raw);
      return {
        ...base,
        ...parsed,
        googleAccount: { ...base.googleAccount, ...(parsed.googleAccount || {}) },
        familyLink: { ...base.familyLink, ...(parsed.familyLink || {}) },
      fakeWifi: { ...base.fakeWifi, ...(parsed.fakeWifi || {}) },
        quickSettings: {
          ...base.quickSettings,
          ...(parsed.quickSettings || {}),
          tiles: Array.isArray(parsed.quickSettings && parsed.quickSettings.tiles) && parsed.quickSettings.tiles.length
            ? parsed.quickSettings.tiles
            : base.quickSettings.tiles
        },
        accessibility: { ...base.accessibility, ...(parsed.accessibility || {}), readAloud: Boolean((parsed.accessibility && parsed.accessibility.readAloud)) },
        duolingo: { ...base.duolingo, ...(parsed.duolingo || {}) },
        notifications: Array.isArray(parsed.notifications) ? parsed.notifications : base.notifications,
        chromeBookmarks: Array.isArray(parsed.chromeBookmarks) ? parsed.chromeBookmarks : base.chromeBookmarks,
        docs: Array.isArray(parsed.docs) ? parsed.docs : base.docs,
        fakeWifi: { ...base.fakeWifi, ...(parsed.fakeWifi || {}) }
      };
    } catch (e) {
      return base;
    }
  }

  function saveState(next) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (e) {}
    applyAppearance(next);
  }

  function updateState(mutator) {
    const current = getState();
    const updated = mutator(current) || current;
    if (updated.oobeCompleted) {
      updated.hasData = true;
    }
    saveState(updated);
    return updated;
  }

  function getBatteryInfo(state = getState()) {
    if (liveBattery.supported) {
      return {
        supported: true,
        level: liveBattery.level,
        charging: liveBattery.charging
      };
    }
    return {
      supported: false,
      level: typeof state.batteryLevel === 'number' ? state.batteryLevel : 94,
      charging: !!state.batteryCharging
    };
  }

  function syncDeviceBattery(onUpdate) {
    if (typeof navigator !== 'undefined' && typeof navigator.getBattery === 'function') {
      navigator.getBattery().then((bm) => {
        const applyBattery = () => {
          liveBattery = {
            supported: true,
            level: Math.round((bm.level || 0) * 100),
            charging: !!bm.charging
          };
          updateState(s => {
            s.batteryLevel = liveBattery.level;
            s.batteryCharging = liveBattery.charging;
          });
          if (typeof onUpdate === 'function') onUpdate(getBatteryInfo());
        };
        applyBattery();
        bm.addEventListener('levelchange', applyBattery);
        bm.addEventListener('chargingchange', applyBattery);
      }).catch(() => {
        if (typeof onUpdate === 'function') onUpdate(getBatteryInfo());
      });
    } else if (typeof onUpdate === 'function') {
      onUpdate(getBatteryInfo());
    }
  }


  function requireUnlocked(redirectToLock = true) {
    const st = getState();
    const unlocked = !st.locked && isUnlockedRecently(st);
    if (!unlocked && redirectToLock) {
      const currentFile = (window.location.pathname.split('/').pop() || 'start.html') + (window.location.search || '');
      const target = (currentFile && currentFile !== 'lockscreen.html' && currentFile !== 'bootscreen.html' && currentFile !== 'index.html')
        ? `lockscreen.html?next=${encodeURIComponent(currentFile)}`
        : 'lockscreen.html';
      window.location.replace(target);
    }
    return unlocked;
  }

  function isUnlockedRecently(state = getState()) {
    if (state.locked) return false;
    if (!state.lastUnlockedAt) return false;
    return (Date.now() - Number(state.lastUnlockedAt)) <= UNLOCK_WINDOW_MS;
  }

  function markUnlocked() {
    return updateState(s => {
      s.locked = false;
      s.poweredOff = false;
      s.lastUnlockedAt = Date.now();
    });
  }

  function lockDevice(goToLock = false) {
    updateState(s => {
      s.locked = true;
    });
    if (goToLock) {
      window.location.href = 'lockscreen.html';
    }
  }

  function powerOffDevice(goToBoot = true) {
    updateState(s => {
      s.poweredOff = true;
      s.locked = true;
    });
    if (goToBoot) {
      window.location.href = 'bootscreen.html';
    }
  }

  function rebootDevice(goToBoot = true) {
    updateState(s => {
      s.poweredOff = false;
      s.locked = true;
    });
    if (goToBoot) {
      window.location.href = 'bootscreen.html';
    }
  }

  function factoryReset(goToOobe = true) {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    const fresh = createDefaultState();
    applyAppearance(fresh);
    if (goToOobe) {
      window.location.href = 'oobe.html';
    }
  }

  function exportStateJson() {
    const st = getState();
    return JSON.stringify(st, null, 2);
  }

  function importStateJson(jsonText) {
    const parsed = JSON.parse(jsonText);
    if (!parsed || typeof parsed !== 'object') {
      throw new Error('Invalid JSON structure');
    }
    const base = createDefaultState();
    const merged = {
      ...base,
      ...parsed,
      googleAccount: { ...base.googleAccount, ...(parsed.googleAccount || {}) },
      familyLink: { ...base.familyLink, ...(parsed.familyLink || {}) },
      hasData: true,
      oobeCompleted: true,
      poweredOff: false,
      locked: true,
      lastUnlockedAt: 0
    };
    saveState(merged);
    return merged;
  }

  function applyAppearance(state = getState()) {
    const lang = getLang(state);
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('data-theme', state.theme || 'ocean');
    document.documentElement.setAttribute('data-mode', state.mode || 'light');
    document.documentElement.style.setProperty('--sys-brightness', (state.brightness || 100) / 100);
    const qsCfg = state.quickSettings || { widthPx: 720, columns: 2 };
    const wVal = Math.max(320, Math.min(1200, Number(qsCfg.widthPx) || 720));
    const cVal = Math.max(1, Math.min(4, Number(qsCfg.columns) || 2));
    document.documentElement.style.setProperty('--qs-max-width', `${wVal}px`);
    document.documentElement.style.setProperty('--qs-cols', String(cVal));
    document.documentElement.classList.toggle('desktop-mode', !!state.desktopMode);
    const a11y = state.accessibility || {};
    document.documentElement.classList.toggle('a11y-large-text', !!a11y.largeText);
    document.documentElement.classList.toggle('a11y-high-contrast', !!a11y.highContrast);
    document.documentElement.classList.toggle('a11y-reduce-motion', !!a11y.reduceMotion);
    document.documentElement.classList.toggle('a11y-underline-links', !!a11y.underlineLinks);
  }

  function formatTime(dateObj = new Date(), state = getState()) {
    const locale = (I18N[getLang(state)] || I18N.de).locale;
    return dateObj.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
  }

  function formatDate(dateObj = new Date(), state = getState()) {
    const locale = (I18N[getLang(state)] || I18N.de).locale;
    return dateObj.toLocaleDateString(locale, { weekday: 'short', day: 'numeric', month: 'long' });
  }

  function formatSeconds(sec) {
    const s = Math.max(0, Math.floor(sec));
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const r = s % 60;
    if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(r).padStart(2, '0')}`;
    return `${String(m).padStart(2, '0')}:${String(r).padStart(2, '0')}`;
  }

  function getActiveTimers() {
    const state = getState();
    const now = Date.now();
    return (state.timers || []).map(tItem => {
      if (tItem.running && tItem.endAt) {
        const rem = Math.max(0, Math.ceil((tItem.endAt - now) / 1000));
        return { ...tItem, remaining: rem, finished: rem === 0 };
      }
      return { ...tItem, finished: tItem.remaining === 0 };
    });
  }


  function showToast(msg) {
    let el = document.getElementById('sys-toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'sys-toast';
      el.style.cssText = [
        'position:fixed',
        'bottom:64px',
        'left:50%',
        'transform:translateX(-50%) translateY(16px)',
        'z-index:120',
        'background:var(--md-sys-color-inverse-surface, #313033)',
        'color:var(--md-sys-color-inverse-on-surface, #F4EFF4)',
        'padding:11px 18px',
        'border-radius:999px',
        'font-family:var(--font-sans)',
        'font-size:13px',
        'font-weight:600',
        'box-shadow:0 8px 24px rgba(0,0,0,0.28)',
        'opacity:0',
        'pointer-events:none',
        'transition:opacity 0.22s ease, transform 0.22s ease',
        'max-width:90vw',
        'text-align:center'
      ].join(';');
      document.body.appendChild(el);
    }
    el.textContent = msg;
    requestAnimationFrame(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateX(-50%) translateY(0)';
    });
    clearTimeout(el._t);
    el._t = setTimeout(() => {
      el.style.opacity = '0';
      el.style.transform = 'translateX(-50%) translateY(16px)';
    }, 3200);
  }


  function mountDynamicIsland(isSetup = false) {
    if (isSetup) return;
    const st = getState();
    const existingWrap = document.getElementById('ios-island-wrap');
    if (!st.dynamicIslandEnabled) {
      if (existingWrap) existingWrap.remove();
      return;
    }
    if (existingWrap) return;
    const shell = document.querySelector('.android-shell');
    const statusEl = document.getElementById('sys-status-bar');
    if (!shell || !statusEl) return;

    const wrap = document.createElement('div');
    wrap.id = 'ios-island-wrap';
    wrap.className = 'ios-island-wrap';
    wrap.innerHTML = `
      <div class="ios-dynamic-island" id="ios-dynamic-island" title="Dynamic Island (iOS Live Activity)">
        <div class="ios-island-compact">
          <span style="display:inline-flex;align-items:center;gap:7px;">
            <span class="ios-island-dot" id="island-dot"></span>
            <span id="island-title">Dynamic Island</span>
          </span>
          <span id="island-badge" style="font-family:var(--font-mono);font-weight:700;color:#7DD3FC;">--:--</span>
        </div>
        <div class="ios-island-expanded" id="island-expanded">
          <div id="island-detail" style="opacity:0.88;">Live Activity aktiv</div>
          <div class="ios-island-actions">
            <button type="button" class="ios-island-btn primary" id="island-toggle-focus">Fokus-Modus</button>
            <a href="uhr.html" class="ios-island-btn">Uhr</a>
            <a href="musik.html" class="ios-island-btn">Musik</a>
          </div>
        </div>
      </div>
    `;
    statusEl.insertAdjacentElement('afterend', wrap);

    const island = document.getElementById('ios-dynamic-island');
    island.addEventListener('click', (e) => {
      if (e.target.closest('a, button')) return;
      island.classList.toggle('expanded');
    });

    document.getElementById('island-toggle-focus').addEventListener('click', (e) => {
      e.stopPropagation();
      const next = updateState(s => { s.dnd = !s.dnd; });
      showToast(next.dnd ? 'iOS Fokus / Nicht stören aktiviert' : 'iOS Fokus / Nicht stören deaktiviert');
      updateDynamicIsland();
    });

    updateDynamicIsland();
  }

  function updateDynamicIsland() {
    const st = getState();
    if (!st.dynamicIslandEnabled) {
      const wrap = document.getElementById('ios-island-wrap');
      if (wrap) wrap.remove();
      return;
    }
    if (!document.getElementById('ios-island-wrap')) {
      mountDynamicIsland(false);
    }
    const titleEl = document.getElementById('island-title');
    const badgeEl = document.getElementById('island-badge');
    const detailEl = document.getElementById('island-detail');
    const dotEl = document.getElementById('island-dot');
    if (!titleEl || !badgeEl || !detailEl || !dotEl) return;
    const activeTimers = getActiveTimers().filter(item => item.running || item.finished);

    if (activeTimers.length > 0) {
      const t0 = activeTimers[0];
      titleEl.textContent = t0.label || 'Timer';
      badgeEl.textContent = t0.finished ? t('finished', st) : formatSeconds(t0.remaining);
      detailEl.textContent = `Aktiver Timer: ${t0.label || 'Timer'} · ${t0.finished ? t('finished', st) : formatSeconds(t0.remaining) + ' verbleibend'}`;
      dotEl.style.background = '#38BDF8';
      return;
    }

    if (st.dnd) {
      titleEl.textContent = 'Fokus aktiv';
      badgeEl.textContent = 'DND';
      detailEl.textContent = 'Mitteilungen werden im iOS-Fokusmodus gedämpft.';
      dotEl.style.background = '#A78BFA';
      return;
    }

    const bat = getBatteryInfo(st);
    titleEl.textContent = st.deviceName || 'iOS Live Pill';
    badgeEl.textContent = `${bat.level}%`;
    detailEl.textContent = `Gerät: ${st.deviceName || 'Pixel 10'} · Akku ${bat.level}% · Tippen zum Ein-/Ausklappen`;
    dotEl.style.background = '#34D399';
  }

  const QS_TILE_CATALOG = {
    wifi: { icon: 'wifi', labelKey: 'wifi', action: 'toggle-wifi' },
    bluetooth: { icon: 'bluetooth', label: 'Bluetooth', action: 'toggle-bt' },
    dark: { icon: 'dark_mode', labelKey: 'darkMode', action: 'toggle-dark' },
    dnd: { icon: 'do_not_disturb_on', labelKey: 'dnd', action: 'toggle-dnd' },
    island: { icon: 'pill', label: 'Dynamic Island', action: 'toggle-island' },
    calculator: { icon: 'calculate', labelKey: 'calculator', href: 'rechner.html' },
    clock: { icon: 'alarm', label: 'Uhr', href: 'uhr.html' },
    notes: { icon: 'note_alt', label: 'Notizen', href: 'notizen.html' },
    tasks: { icon: 'check_circle', label: 'Aufgaben', href: 'aufgaben.html' },
    settings: { icon: 'settings', labelKey: 'settings', href: 'einstellungen.html' }
  };

  function getQSTileCatalog() {
    return QS_TILE_CATALOG;
  }

  function isQSTileActive(tileId, st = getState()) {
    if (tileId === 'wifi') return !!st.wifi;
    if (tileId === 'bluetooth') return !!st.bluetooth;
    if (tileId === 'dark') return st.mode === 'dark';
    if (tileId === 'dnd') return !!st.dnd;
    if (tileId === 'island') return !!st.dynamicIslandEnabled;
    return false;
  }

  function renderQSContent(st = getState()) {
    const qsCfg = st.quickSettings || { widthPx: 720, columns: 2, tiles: ['wifi', 'dark', 'dnd', 'calculator'] };
    const tiles = Array.isArray(qsCfg.tiles) && qsCfg.tiles.length ? qsCfg.tiles : ['wifi', 'dark', 'dnd', 'calculator'];
    const gridEl = document.getElementById('qs-grid');
    if (gridEl) {
      gridEl.innerHTML = tiles.map(id => {
        const meta = QS_TILE_CATALOG[id];
        if (!meta) return '';
        const lbl = meta.labelKey ? t(meta.labelKey, st) : meta.label;
        const activeCls = isQSTileActive(id, st) ? ' active' : '';
        if (meta.href) {
          return `<a href="${meta.href}" class="qs-tile${activeCls}" data-qs-tile="${id}"><span class="material-symbols-rounded">${meta.icon}</span><span>${lbl}</span></a>`;
        }
        return `<button type="button" class="qs-tile${activeCls}" data-qs-tile="${id}"><span class="material-symbols-rounded">${meta.icon}</span><span>${lbl}</span></button>`;
      }).join('');
    }
    const wRange = document.getElementById('qs-width-range');
    const wLabel = document.getElementById('qs-width-val');
    if (wRange) wRange.value = qsCfg.widthPx || 720;
    if (wLabel) wLabel.textContent = `${qsCfg.widthPx || 720}px`;

    document.querySelectorAll('#qs-cols-bar [data-qs-col]').forEach(btn => {
      btn.classList.toggle('active', Number(btn.dataset.qsCol) === Number(qsCfg.columns || 2));
    });
    document.querySelectorAll('#qs-tile-chips [data-qs-pick]').forEach(btn => {
      btn.classList.toggle('active', tiles.includes(btn.dataset.qsPick));
    });
  }

  function addNotification(title, body, app = 'System') {
    return updateState(s => {
      const list = Array.isArray(s.notifications) ? [...s.notifications] : [];
      list.unshift({
        id: 'n_' + Date.now(),
        app,
        title,
        body,
        read: false
      });
      s.notifications = list.slice(0, 12);
    });
  }

  function renderNotificationsUI(st = getState()) {
    const list = Array.isArray(st.notifications) ? st.notifications : [];
    const unread = list.filter(n => !n.read);
    const badge = document.getElementById('sb-notif-pill');
    const badgeTxt = document.getElementById('sb-notif-count');
    if (badge && badgeTxt) {
      if (unread.length > 0) {
        badge.style.display = 'inline-flex';
        badgeTxt.textContent = String(unread.length);
      } else {
        badge.style.display = 'none';
      }
    }

    const box = document.getElementById('qs-notif-list');
    if (box) {
      if (list.length === 0) {
        box.innerHTML = `<div class="settings-item-sub">Keine Benachrichtigungen vorhanden.</div>`;
        return;
      }
      box.innerHTML = list.map(item => `
        <div class="qs-notif-item" style="opacity:${item.read ? '0.62' : '1'};">
          <div>
            <div style="font-weight:700;">${item.title} <span class="settings-item-sub">· ${item.app}</span></div>
            <div class="settings-item-sub">${item.body}</div>
          </div>
          <button type="button" class="m3-chip" style="padding:4px 10px;font-size:11px;" onclick="AndroidOS.dismissNotification('${item.id}')">${item.read ? 'Entfernen' : 'Gelesen'}</button>
        </div>
      `).join('');
    }
  }

  function dismissNotification(id) {
    updateState(s => {
      const cur = Array.isArray(s.notifications) ? [...s.notifications] : [];
      const target = cur.find(n => n.id === id);
      if (target && !target.read) {
        target.read = true;
      } else {
        s.notifications = cur.filter(n => n.id !== id);
        return;
      }
      s.notifications = cur;
    });
    renderNotificationsUI(getState());
  }


  let gboardShift = false;
  let gboardSymbols = false;
  let activeInputTarget = null;

  function isTextInputElement(el) {
    if (!el || el.nodeType !== 1) return false;
    if (el.closest('#os-gboard-dock')) return false;
    if (el.tagName === 'TEXTAREA') return !el.readOnly && !el.disabled;
    if (el.tagName === 'INPUT') {
      const tAttr = (el.type || 'text').toLowerCase();
      return !['button', 'submit', 'reset', 'checkbox', 'radio', 'range', 'file', 'color', 'date', 'time', 'hidden'].includes(tAttr) && !el.readOnly && !el.disabled;
    }
    return !!el.isContentEditable;
  }

  function setInputValueAndNotify(el, nextVal) {
    if (!el) return;
    if (el.isContentEditable) {
      el.textContent = nextVal;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      return;
    }
    const proto = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
    const desc = Object.getOwnPropertyDescriptor(proto, 'value');
    if (desc && desc.set) {
      desc.set.call(el, nextVal);
    } else {
      el.value = nextVal;
    }
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function gboardInsertChar(ch) {
    const el = activeInputTarget;
    if (!el || !isTextInputElement(el)) return;
    const finalCh = (!gboardSymbols && gboardShift) ? ch.toUpperCase() : ch;
    if (el.isContentEditable) {
      setInputValueAndNotify(el, (el.textContent || '') + finalCh);
      return;
    }
    const start = typeof el.selectionStart === 'number' ? el.selectionStart : el.value.length;
    const end = typeof el.selectionEnd === 'number' ? el.selectionEnd : el.value.length;
    const cur = String(el.value || '');
    const next = cur.slice(0, start) + finalCh + cur.slice(end);
    setInputValueAndNotify(el, next);
    const caret = start + finalCh.length;
    try { el.setSelectionRange(caret, caret); } catch (e) {}
    if (gboardShift) {
      gboardShift = false;
      renderGboardKeys();
    }
  }

  function gboardBackspace() {
    const el = activeInputTarget;
    if (!el || !isTextInputElement(el)) return;
    if (el.isContentEditable) {
      const txt = String(el.textContent || '');
      setInputValueAndNotify(el, txt.slice(0, -1));
      return;
    }
    const start = typeof el.selectionStart === 'number' ? el.selectionStart : el.value.length;
    const end = typeof el.selectionEnd === 'number' ? el.selectionEnd : el.value.length;
    const cur = String(el.value || '');
    if (start !== end) {
      const next = cur.slice(0, start) + cur.slice(end);
      setInputValueAndNotify(el, next);
      try { el.setSelectionRange(start, start); } catch (e) {}
    } else if (start > 0) {
      const next = cur.slice(0, start - 1) + cur.slice(end);
      setInputValueAndNotify(el, next);
      try { el.setSelectionRange(start - 1, start - 1); } catch (e) {}
    }
  }

  function gboardEnterOrSubmit() {
    const el = activeInputTarget;
    if (!el) return;
    if (el.tagName === 'TEXTAREA') {
      gboardInsertChar('\n');
      return;
    }
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', bubbles: true }));
    if (el.form && typeof el.form.requestSubmit === 'function') {
      el.form.requestSubmit();
    }
    closeGboard();
  }

  function renderGboardKeys() {
    const rowsWrap = document.getElementById('gboard-rows');
    if (!rowsWrap) return;
    const alphaRows = [
      ['q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p', 'ü'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ö', 'ä'],
      ['y', 'x', 'c', 'v', 'b', 'n', 'm', 'ß']
    ];
    const symRows = [
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
      ['@', '#', '$', '%', '&', '*', '-', '+', '=', '/'],
      ['!', '?', ',', '.', ':', ';', '(', ')', '\'', '"']
    ];
    const rows = gboardSymbols ? symRows : alphaRows;

    const r1 = `<div class="gboard-row">${rows[0].map(k => {
      const lbl = (!gboardSymbols && gboardShift) ? k.toUpperCase() : k;
      return `<button type="button" class="gboard-key" data-gb-char="${k}">${lbl}</button>`;
    }).join('')}</div>`;

    const r2 = `<div class="gboard-row">${rows[1].map(k => {
      const lbl = (!gboardSymbols && gboardShift) ? k.toUpperCase() : k;
      return `<button type="button" class="gboard-key" data-gb-char="${k}">${lbl}</button>`;
    }).join('')}</div>`;

    const shiftCls = gboardShift ? ' active' : '';
    const r3 = `<div class="gboard-row">
      <button type="button" class="gboard-key wide${shiftCls}" id="gb-shift-btn" title="Groß/Klein">⇧</button>
      ${rows[2].map(k => {
        const lbl = (!gboardSymbols && gboardShift) ? k.toUpperCase() : k;
        return `<button type="button" class="gboard-key" data-gb-char="${k}">${lbl}</button>`;
      }).join('')}
      <button type="button" class="gboard-key wide" id="gb-back-btn" title="Löschen">⌫</button>
    </div>`;

    const r4 = `<div class="gboard-row">
      <button type="button" class="gboard-key wide" id="gb-sym-btn">${gboardSymbols ? 'ABC' : '?123'}</button>
      <button type="button" class="gboard-key space" id="gb-space-btn">Leertaste</button>
      <button type="button" class="gboard-key action-enter" id="gb-enter-btn">↵</button>
    </div>`;

    rowsWrap.innerHTML = r1 + r2 + r3 + r4;
  }

  function openGboard(targetEl) {
    const st = getState();
    if (!st.onScreenKeyboard) return;
    if (targetEl && isTextInputElement(targetEl)) {
      activeInputTarget = targetEl;
    }
    if (!activeInputTarget) return;
    let dock = document.getElementById('os-gboard-dock');
    if (!dock) {
      dock = document.createElement('div');
      dock.id = 'os-gboard-dock';
      dock.className = 'os-gboard-dock';
      dock.innerHTML = `
        <div class="gboard-top-strip">
          <span style="font-size:11px;font-weight:700;opacity:0.8;">Gboard · 500</span>
          <div style="display:flex;gap:6px;">
            <button type="button" class="gboard-chip-btn" id="gb-speak-field">Vorlesen</button>
            <button type="button" class="gboard-chip-btn" id="gb-close-btn">Schließen</button>
          </div>
        </div>
        <div id="gboard-rows"></div>
      `;
      document.body.appendChild(dock);

      dock.addEventListener('mousedown', (e) => {
        if (e.target.closest('button')) e.preventDefault();
      });
      dock.addEventListener('click', (e) => {
        const charBtn = e.target.closest('[data-gb-char]');
        if (charBtn) {
          gboardInsertChar(charBtn.dataset.gbChar);
          return;
        }
        if (e.target.closest('#gb-shift-btn')) {
          gboardShift = !gboardShift;
          renderGboardKeys();
          return;
        }
        if (e.target.closest('#gb-back-btn')) {
          gboardBackspace();
          return;
        }
        if (e.target.closest('#gb-sym-btn')) {
          gboardSymbols = !gboardSymbols;
          renderGboardKeys();
          return;
        }
        if (e.target.closest('#gb-space-btn')) {
          gboardInsertChar(' ');
          return;
        }
        if (e.target.closest('#gb-enter-btn')) {
          gboardEnterOrSubmit();
          return;
        }
        if (e.target.closest('#gb-close-btn')) {
          closeGboard();
          return;
        }
        if (e.target.closest('#gb-speak-field')) {
          const val = activeInputTarget ? (activeInputTarget.value || activeInputTarget.textContent || '') : '';
          speakText(val || 'Eingabefeld ist leer.');
        }
      });
    }
    renderGboardKeys();
    dock.classList.add('open');
  }

  function closeGboard() {
    const dock = document.getElementById('os-gboard-dock');
    if (dock) dock.classList.remove('open');
  }

  function mountGlobalGboard() {
    if (window.__osGboardMounted) return;
    window.__osGboardMounted = true;
    document.addEventListener('focusin', (e) => {
      if (!getState().onScreenKeyboard) return;
      if (isTextInputElement(e.target)) {
        openGboard(e.target);
      }
    });
    document.addEventListener('click', (e) => {
      const dock = document.getElementById('os-gboard-dock');
      if (!dock || !dock.classList.contains('open')) return;
      if (e.target.closest('#os-gboard-dock') || isTextInputElement(e.target)) return;
      closeGboard();
    });
  }

  function stopSpeaking() {
    try {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    } catch (e) {}
  }

  function speakText(text) {
    const clean = String(text || '').replace(/\s+/g, ' ').trim();
    if (!clean) {
      showToast('Kein vorlesbarer Text gefunden.');
      return;
    }
    stopSpeaking();
    try {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined') {
        const utt = new SpeechSynthesisUtterance(clean);
        const lang = getLang();
        utt.lang = (I18N[lang] && I18N[lang].locale) || 'de-DE';
        window.speechSynthesis.speak(utt);
        showToast('Vorlesefunktion aktiv…');
        return;
      }
    } catch (e) {}
    showToast('Vorlese-Vorschau: ' + clean.slice(0, 90));
  }

  function readScreenAloud() {
    const mainEl = document.querySelector('main') || document.body;
    if (!mainEl) return;
    const clone = mainEl.cloneNode(true);
    clone.querySelectorAll('#os-gboard-dock, #a11y-tts-bar, script, style').forEach(n => n.remove());
    const text = (clone.innerText || clone.textContent || '').trim();
    speakText(text.slice(0, 1200));
  }

  function mountReadAloudBar() {
    const st = getState();
    const enabled = !!(st.accessibility && st.accessibility.readAloud);
    let bar = document.getElementById('a11y-tts-bar');
    if (!enabled) {
      if (bar) bar.classList.remove('visible');
      stopSpeaking();
      return;
    }
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'a11y-tts-bar';
      bar.className = 'a11y-tts-bar';
      bar.innerHTML = `
        <span class="material-symbols-rounded" style="font-size:16px;">record_voice_over</span>
        <span>Vorlesen</span>
        <button type="button" class="a11y-tts-btn" id="tts-play-btn">Seite lesen</button>
        <button type="button" class="a11y-tts-btn" id="tts-stop-btn">Stopp</button>
      `;
      document.body.appendChild(bar);
      document.getElementById('tts-play-btn').addEventListener('click', () => readScreenAloud());
      document.getElementById('tts-stop-btn').addEventListener('click', () => {
        stopSpeaking();
        showToast('Vorlesen gestoppt.');
      });
    }
    bar.classList.add('visible');
  }

  function mountShell(options = {}) {
    const { showGestureBar = true, isLockscreen = false, isSetup = false } = options;
    const st = getState();
    applyAppearance(st);

    const statusEl = document.getElementById('sys-status-bar');
    if (statusEl) {
      const bat = getBatteryInfo(st);
      statusEl.innerHTML = `
        <div class="status-left">
          <span id="sb-clock">--:--</span>
          <span style="opacity:0.65;">${t('osName', st)}</span>
          <a href="uhr.html" id="sb-timer-pill" class="status-pill" style="display:none;">
            <span class="material-symbols-rounded" style="font-size:14px;">timer</span>
            <span id="sb-timer-text">00:00</span>
          </a>
        </div>
        <div class="status-right">
          <span id="sb-dnd" class="material-symbols-rounded" style="font-size:16px; display:none;">do_not_disturb_on</span>
          <span id="sb-wifi" class="material-symbols-rounded" style="font-size:17px;">wifi</span>
          <span class="material-symbols-rounded" style="font-size:17px;">signal_cellular_alt</span>
          <span style="display:inline-flex;align-items:center;gap:2px;">
            <span class="material-symbols-rounded filled" style="font-size:17px;" id="sb-bat-icon">${bat.charging ? 'battery_charging_full' : 'battery_full'}</span>
            <span id="sb-bat-val">${bat.level}%</span>
          </span>
        </div>
      `;

    let clockTapCount = 0;
    let clockTapTimer = null;
    const sbClockEl = document.getElementById('sb-clock');
    if (sbClockEl && !isSetup) {
      sbClockEl.addEventListener('click', (e) => {
        e.stopPropagation();
        clockTapCount++;
        clearTimeout(clockTapTimer);
        clockTapTimer = setTimeout(() => { clockTapCount = 0; }, 700);
        if (clockTapCount >= 3) {
          clockTapCount = 0;
          const next = updateState(s => {
            s.easterEggClockSpin = !s.easterEggClockSpin;
          });
          document.documentElement.classList.toggle('ee-spin', !!next.easterEggClockSpin);
          showToast(next.easterEggClockSpin
            ? 'Easter Egg #1 aktiv: Zeit-Wirbel & Retro-Akzent!'
            : 'Easter Egg #1 deaktiviert.');
        }
      });
    }
    if (st.easterEggClockSpin) {
      document.documentElement.classList.add('ee-spin');
    }

      statusEl.addEventListener('click', (e) => {
        if (isSetup) return;
        if (e.target.closest('#sb-timer-pill')) return;
        toggleQS(true);
      });
    }

    const qsRoot = document.getElementById('sys-qs-root');
    if (qsRoot && !isSetup) {
      const tileChipsHtml = Object.entries(QS_TILE_CATALOG).map(([k, v]) => {
        const lbl = v.labelKey ? t(v.labelKey, st) : v.label;
        return `<button type="button" class="m3-chip" data-qs-pick="${k}" style="padding:5px 10px;font-size:12px;">${lbl}</button>`;
      }).join('');

      qsRoot.innerHTML = `
        <div class="qs-backdrop" id="qs-backdrop"></div>
        <div class="qs-panel" id="qs-panel">
          <div class="qs-header">
            <div>
              <div id="qs-date" style="font-size:13px; color:var(--md-sys-color-on-surface-variant); font-weight:600;"></div>
              <div style="font-size:12px; opacity:0.75;">${t('quickSettings', st)}</div>
            </div>
            <div style="display:flex; gap:8px;">
              <button type="button" class="icon-btn" id="qs-edit-toggle" title="Quick Settings bearbeiten">
                <span class="material-symbols-rounded">tune</span>
              </button>
              <a href="einstellungen.html" class="icon-btn" title="${t('settings', st)}">
                <span class="material-symbols-rounded">settings</span>
              </a>
              <button class="icon-btn" onclick="AndroidOS.lockDevice(true)" title="${t('lockScreen', st)}">
                <span class="material-symbols-rounded">lock</span>
              </button>
            </div>
          </div>
          <div class="qs-grid" id="qs-grid"></div>
          <div class="qs-brightness">
            <span class="material-symbols-rounded" style="font-size:20px;">brightness_medium</span>
            <input type="range" id="qs-bright-range" min="45" max="100" value="${st.brightness || 100}">
          </div>
          <div id="qs-customizer" style="display:none;margin-top:14px;padding-top:14px;border-top:1px solid var(--md-sys-color-outline-variant);">
            <div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;font-weight:700;margin-bottom:6px;">
              <span>Breite (Quick Settings)</span>
              <span id="qs-width-val">${(st.quickSettings && st.quickSettings.widthPx) || 720}px</span>
            </div>
            <input type="range" id="qs-width-range" min="360" max="1100" step="20" value="${(st.quickSettings && st.quickSettings.widthPx) || 720}" style="width:100%;accent-color:var(--md-sys-color-primary);margin-bottom:10px;">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:10px;">
              <span style="font-size:12px;font-weight:700;">Spalten</span>
              <div id="qs-cols-bar" style="display:flex;gap:6px;">
                <button type="button" class="m3-chip" data-qs-col="1" style="padding:4px 10px;font-size:12px;">1</button>
                <button type="button" class="m3-chip" data-qs-col="2" style="padding:4px 10px;font-size:12px;">2</button>
                <button type="button" class="m3-chip" data-qs-col="3" style="padding:4px 10px;font-size:12px;">3</button>
                <button type="button" class="m3-chip" data-qs-col="4" style="padding:4px 10px;font-size:12px;">4</button>
              </div>
            </div>
            <div style="font-size:12px;font-weight:700;margin-bottom:6px;">Kacheln auswählen</div>
            <div id="qs-tile-chips" style="display:flex;gap:6px;flex-wrap:wrap;">${tileChipsHtml}</div>
          </div>
        </div>
      `;

      renderQSContent(st);
      renderNotificationsUI(st);

      document.getElementById('qs-backdrop').addEventListener('click', () => toggleQS(false));
      document.getElementById('qs-edit-toggle').addEventListener('click', () => {
        const box = document.getElementById('qs-customizer');
        if (!box) return;
        box.style.display = box.style.display === 'none' ? 'block' : 'none';
      });

      document.getElementById('qs-grid').addEventListener('click', (e) => {
        const tileEl = e.target.closest('[data-qs-tile]');
        if (!tileEl) return;
        const id = tileEl.dataset.qsTile;
        const meta = QS_TILE_CATALOG[id];
        if (!meta || meta.href) return;
        if (meta.action === 'toggle-wifi') {
          updateState(s => { s.wifi = !s.wifi; });
        } else if (meta.action === 'toggle-bt') {
          updateState(s => { s.bluetooth = !s.bluetooth; });
        } else if (meta.action === 'toggle-dark') {
          updateState(s => { s.mode = s.mode === 'dark' ? 'light' : 'dark'; });
        } else if (meta.action === 'toggle-dnd') {
          updateState(s => { s.dnd = !s.dnd; });
        } else if (meta.action === 'toggle-island') {
          updateState(s => { s.dynamicIslandEnabled = !s.dynamicIslandEnabled; });
          updateDynamicIsland();
        }
        renderQSContent(getState());
        refreshStatusIcons();
      });

      document.getElementById('qs-width-range').addEventListener('input', (e) => {
        const w = Number(e.target.value);
        updateState(s => {
          s.quickSettings = { ...(s.quickSettings || {}), widthPx: w };
        });
        renderQSContent(getState());
      });

      document.querySelectorAll('#qs-cols-bar [data-qs-col]').forEach(btn => {
        btn.addEventListener('click', () => {
          const cols = Number(btn.dataset.qsCol);
          updateState(s => {
            s.quickSettings = { ...(s.quickSettings || {}), columns: cols };
          });
          renderQSContent(getState());
        });
      });

      document.querySelectorAll('#qs-tile-chips [data-qs-pick]').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.qsPick;
          updateState(s => {
            const curTiles = Array.isArray(s.quickSettings && s.quickSettings.tiles) ? [...s.quickSettings.tiles] : ['wifi', 'dark', 'dnd', 'calculator'];
            const idx = curTiles.indexOf(id);
            if (idx >= 0) {
              if (curTiles.length > 1) curTiles.splice(idx, 1);
            } else {
              curTiles.push(id);
            }
            s.quickSettings = { ...(s.quickSettings || {}), tiles: curTiles };
          });
          renderQSContent(getState());
        });
      });

      document.getElementById('qs-bright-range').addEventListener('input', (e) => {
        updateState(s => { s.brightness = Number(e.target.value); });
      });
    }

    const navRoot = document.getElementById('sys-gesture-nav');
    if (navRoot && showGestureBar && !isLockscreen && !isSetup) {
      navRoot.innerHTML = `
        <button class="gesture-action" onclick="history.back()" title="${t('back', st)}">
          <span class="material-symbols-rounded" style="font-size:20px;">arrow_back_ios_new</span>
        </button>
        <button class="gesture-pill" onclick="window.location.href='start.html'" title="${t('home', st)}"></button>
        <button class="gesture-action" onclick="AndroidOS.lockDevice(true)" title="${t('lock', st)}">
          <span class="material-symbols-rounded" style="font-size:20px;">lock</span>
        </button>
      `;
    }

    function refreshStatusIcons() {
      const cur = getState();
      const wifiEl = document.getElementById('sb-wifi');
      const dndEl = document.getElementById('sb-dnd');
      const batVal = document.getElementById('sb-bat-val');
      const batIcon = document.getElementById('sb-bat-icon');
      const bat = getBatteryInfo(cur);
      if (wifiEl) wifiEl.textContent = cur.wifi ? 'wifi' : 'wifi_off';
      if (dndEl) dndEl.style.display = cur.dnd ? 'inline-flex' : 'none';
      if (batVal) batVal.textContent = `${bat.level}%`;
      if (batIcon) batIcon.textContent = bat.charging ? 'battery_charging_full' : 'battery_full';
    }

    function tick() {
      const cur = getState();
      const now = new Date();
      const sbClock = document.getElementById('sb-clock');
      const qsDate = document.getElementById('qs-date');
      if (sbClock) sbClock.textContent = formatTime(now, cur);
      if (qsDate) qsDate.textContent = formatDate(now, cur);

      const active = getActiveTimers().filter(item => item.running || item.finished);
      const pill = document.getElementById('sb-timer-pill');
      const pillTxt = document.getElementById('sb-timer-text');
      if (pill && pillTxt) {
        if (active.length > 0) {
          pill.style.display = 'inline-flex';
          pillTxt.textContent = active[0].finished ? t('finished', cur) : formatSeconds(active[0].remaining);
        } else {
          pill.style.display = 'none';
        }
      }
      refreshStatusIcons();
      updateDynamicIsland();
    }

    mountDynamicIsland(isSetup);
    syncDeviceBattery(() => {
      refreshStatusIcons();
      updateDynamicIsland();
    });
    mountGlobalGboard();
    mountReadAloudBar();
    tick();
    setInterval(tick, 1000);
  }

  function toggleQS(open) {
    const bd = document.getElementById('qs-backdrop');
    const pn = document.getElementById('qs-panel');
    if (!bd || !pn) return;
    bd.classList.toggle('open', open);
    pn.classList.toggle('open', open);
  }

  return {
    STORAGE_KEY,
    I18N,
    createDefaultState,
    normalizeLang,
    getLang,
    t,
    hasRawStorage,
    getState,
    saveState,
    updateState,
    getBatteryInfo,
    syncDeviceBattery,
    isUnlockedRecently,
    requireUnlocked,
    markUnlocked,
    lockDevice,
    powerOffDevice,
    rebootDevice,
    factoryReset,
    exportStateJson,
    importStateJson,
    applyAppearance,
    formatTime,
    formatDate,
    formatSeconds,
    getActiveTimers,
    showToast,
    mountShell,
    mountDynamicIsland,
    updateDynamicIsland,
    toggleQS,
    getQSTileCatalog,
    renderQSContent,
    addNotification,
    dismissNotification,
    renderNotificationsUI
  };
})();
