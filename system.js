const AndroidOS = (() => {
  const STORAGE_KEY = 'android_web_os_state_v2';
  const UNLOCK_WINDOW_MS = 5 * 60 * 1000;

  let liveBattery = {
    supported: false,
    level: 94,
    charging: false
  };

  let qsEditMode = false;
  let qsDragIndex = null;

  const DEFAULT_QS_TILES = ['wifi', 'mobile', 'dark', 'dnd', 'silent', 'bluetooth', 'osk', 'calculator'];

  const QS_TILE_CATALOG = {
    wifi: { icon: 'wifi', labelKey: 'wifi', type: 'toggle', stateKey: 'wifi' },
    mobile: { icon: 'signal_cellular_alt', labelKey: 'mobileData', type: 'toggle', stateKey: 'mobileData' },
    dark: { icon: 'dark_mode', labelKey: 'darkMode', type: 'mode' },
    dnd: { icon: 'do_not_disturb_on', labelKey: 'dnd', type: 'toggle', stateKey: 'dnd' },
    silent: { icon: 'volume_off', labelKey: 'silentMode', type: 'toggle', stateKey: 'silent' },
    bluetooth: { icon: 'bluetooth', labelKey: 'bluetooth', type: 'toggle', stateKey: 'bluetooth' },
    osk: { icon: 'keyboard', labelKey: 'oskTile', type: 'osk' },
    calculator: { icon: 'calculate', labelKey: 'calculator', type: 'link', href: 'rechner.html' },
    camera: { icon: 'photo_camera', labelKey: 'camera', type: 'link', href: 'kamera.html' },
    notes: { icon: 'edit_note', labelKey: 'notes', type: 'link', href: 'notizen.html' },
    clock: { icon: 'schedule', labelKey: 'clock', type: 'link', href: 'uhr.html' },
    settings: { icon: 'settings', labelKey: 'settings', type: 'link', href: 'einstellungen.html' }
  };

  const I18N = {
    de: {
      locale: 'de-DE',
      osName: 'Android 16',
      quickSettings: 'Schnelleinstellungen',
      editTiles: 'Kacheln bearbeiten',
      doneEditing: 'Fertig',
      resetTiles: 'Standard',
      availableTiles: 'Verfügbare Kacheln (Tippen zum Hinzufügen)',
      wifi: 'WLAN',
      mobileData: 'Mobile Daten',
      darkMode: 'Dunkelmodus',
      dnd: 'Nicht stören',
      silentMode: 'Lautlos',
      bluetooth: 'Bluetooth',
      oskTile: 'Tastatur',
      calculator: 'Rechner',
      camera: 'Kamera',
      notes: 'Notizen',
      clock: 'Uhr',
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
      soundSub: 'Lautstärke, Lautlos und Haptik',
      modesTitle: 'Modi',
      modesSub: 'Nicht stören, Nachtruhe, Fahren',
      displayTitle: 'Display und Touch',
      displaySub: 'Dunkelmodus, Helligkeit, Touch',
      styleTitle: 'Hintergrundbild und Stil',
      styleSub: 'Farben, thematische Symbole, App-Raster',
      batteryTitle: 'Akku',
      batterySub: (lvl, chg) => chg ? `${lvl}% · Lädt` : `${lvl}% · Geräteakku`,
      accountTitle: 'Google-Konto',
      accountSub: (name, email) => `${name} · ${email}`,
      familyTitle: 'Family Link',
      familySub: (active, limit) => active ? `Aktiv · Tageslimit ${limit} Min.` : 'Verwaltet · Bildschirmzeit & App-Limits',
      systemTitle: 'System & Sicherung',
      systemSub: 'Sprache, Region, PIN, Tastatur, Backup & Neustart',
      oskTitle: 'Bildschirmtastatur (Gboard-OSK)',
      oskSub: 'Virtuelle Tastatur bei Fokus auf Textfeldern einblenden',
      saved: 'Gespeichert.'
    },
    en: {
      locale: 'en-US',
      osName: 'Android 16',
      quickSettings: 'Quick Settings',
      editTiles: 'Edit tiles',
      doneEditing: 'Done',
      resetTiles: 'Reset',
      availableTiles: 'Available tiles (tap to add)',
      wifi: 'Wi-Fi',
      mobileData: 'Mobile data',
      darkMode: 'Dark theme',
      dnd: 'Do Not Disturb',
      silentMode: 'Silent',
      bluetooth: 'Bluetooth',
      oskTile: 'Keyboard',
      calculator: 'Calculator',
      camera: 'Camera',
      notes: 'Notes',
      clock: 'Clock',
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
      soundSub: 'Volume, silent mode and haptics',
      modesTitle: 'Modes',
      modesSub: 'Do Not Disturb, Bedtime, Driving',
      displayTitle: 'Display and touch',
      displaySub: 'Dark theme, brightness, touch',
      styleTitle: 'Wallpaper and style',
      styleSub: 'Colours, themed icons, app grid',
      batteryTitle: 'Battery',
      batterySub: (lvl, chg) => chg ? `${lvl}% · Charging` : `${lvl}% · Device battery`,
      accountTitle: 'Google Account',
      accountSub: (name, email) => `${name} · ${email}`,
      familyTitle: 'Family Link',
      familySub: (active, limit) => active ? `Active · ${limit} min daily limit` : 'Supervised · Screen time & app limits',
      systemTitle: 'System & Backup',
      systemSub: 'Language, region, PIN, keyboard, backup & power',
      oskTitle: 'On-screen keyboard (Gboard OSK)',
      oskSub: 'Show virtual keyboard when focusing text inputs',
      saved: 'Saved.'
    },
    fr: {
      locale: 'fr-FR',
      osName: 'Android 16',
      quickSettings: 'Réglages rapides',
      editTiles: 'Modifier les tuiles',
      doneEditing: 'Terminé',
      resetTiles: 'Défaut',
      availableTiles: 'Tuiles disponibles (appuyer pour ajouter)',
      wifi: 'Wi-Fi',
      mobileData: 'Données mobiles',
      darkMode: 'Mode sombre',
      dnd: 'Ne pas déranger',
      silentMode: 'Silencieux',
      bluetooth: 'Bluetooth',
      oskTile: 'Clavier',
      calculator: 'Calculatrice',
      camera: 'Appareil photo',
      notes: 'Notes',
      clock: 'Horloge',
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
      soundSub: 'Volume, silencieux et haptique',
      modesTitle: 'Modes',
      modesSub: 'Ne pas déranger, Coucher, Conduite',
      displayTitle: 'Affichage et tactile',
      displaySub: 'Thème sombre, luminosité, tactile',
      styleTitle: 'Fond d’écran et style',
      styleSub: 'Couleurs, icônes thématiques, grille',
      batteryTitle: 'Batterie',
      batterySub: (lvl, chg) => chg ? `${lvl}% · En charge` : `${lvl}% · Batterie de l’appareil`,
      accountTitle: 'Compte Google',
      accountSub: (name, email) => `${name} · ${email}`,
      familyTitle: 'Family Link',
      familySub: (active, limit) => active ? `Actif · Limite ${limit} min/j` : 'Contrôle parental · Temps d’écran et applis',
      systemTitle: 'Système et sauvegarde',
      systemSub: 'Langue, région, PIN, clavier, sauvegarde et alimentation',
      oskTitle: 'Clavier virtuel (Gboard OSK)',
      oskSub: 'Afficher le clavier à l’écran lors de la saisie',
      saved: 'Enregistré.'
    },
    es: {
      locale: 'es-ES',
      osName: 'Android 16',
      quickSettings: 'Ajustes rápidos',
      editTiles: 'Editar mosaicos',
      doneEditing: 'Listo',
      resetTiles: 'Restablecer',
      availableTiles: 'Mosaicos disponibles (toca para añadir)',
      wifi: 'Wi-Fi',
      mobileData: 'Datos móviles',
      darkMode: 'Modo oscuro',
      dnd: 'No molestar',
      silentMode: 'Silencio',
      bluetooth: 'Bluetooth',
      oskTile: 'Teclado',
      calculator: 'Calculadora',
      camera: 'Cámara',
      notes: 'Notas',
      clock: 'Reloj',
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
      soundSub: 'Volumen, silencio y vibración háptica',
      modesTitle: 'Modos',
      modesSub: 'No molestar, Descanso, Conducción',
      displayTitle: 'Pantalla y toque',
      displaySub: 'Tema oscuro, brillo, toque',
      styleTitle: 'Fondo de pantalla y estilo',
      styleSub: 'Colores, iconos temáticos, cuadrícula',
      batteryTitle: 'Batería',
      batterySub: (lvl, chg) => chg ? `${lvl}% · Cargando` : `${lvl}% · Batería del dispositivo`,
      accountTitle: 'Cuenta de Google',
      accountSub: (name, email) => `${name} · ${email}`,
      familyTitle: 'Family Link',
      familySub: (active, limit) => active ? `Activo · Límite ${limit} min/día` : 'Supervisión · Tiempo de pantalla y apps',
      systemTitle: 'Sistema y copia de seguridad',
      systemSub: 'Idioma, región, PIN, teclado, copia y apagado',
      oskTitle: 'Teclado en pantalla (Gboard OSK)',
      oskSub: 'Mostrar teclado virtual al enfocar campos de texto',
      saved: 'Guardado.'
    },
    ja: {
      locale: 'ja-JP',
      osName: 'Android 16',
      quickSettings: 'クイック設定',
      editTiles: 'タイルを編集',
      doneEditing: '完了',
      resetTiles: '初期状態',
      availableTiles: '追加可能なタイル（タップで追加）',
      wifi: 'Wi-Fi',
      mobileData: 'モバイルデータ',
      darkMode: 'ダークテーマ',
      dnd: 'マナーモード',
      silentMode: 'サイレント',
      bluetooth: 'Bluetooth',
      oskTile: 'キーボード',
      calculator: '電卓',
      camera: 'カメラ',
      notes: 'メモ',
      clock: '時計',
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
      soundSub: '音量、サイレント、触覚フィードバック',
      modesTitle: 'モード',
      modesSub: 'マナーモード、おやすみ時間、運転モード',
      displayTitle: 'ディスプレイとタッチ',
      displaySub: 'ダークテーマ、明るさ、タッチ',
      styleTitle: '壁紙とスタイル',
      styleSub: 'カラー、テーマアイコン、グリッド',
      batteryTitle: 'バッテリー',
      batterySub: (lvl, chg) => chg ? `${lvl}% · 充電中` : `${lvl}% · デバイスバッテリー`,
      accountTitle: 'Google アカウント',
      accountSub: (name, email) => `${name} · ${email}`,
      familyTitle: 'ファミリー リンク',
      familySub: (active, limit) => active ? `有効 · 1日${limit}分の上限` : '管理 · スクリーンタイムとアプリ制限',
      systemTitle: 'システムとバックアップ',
      systemSub: '言語、地域、PIN、キーボード、バックアップと電源',
      oskTitle: '画面キーボード (Gboard OSK)',
      oskSub: '入力欄フォーカス時に仮想キーボードを表示',
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
      oskEnabled: false,
      oskLayout: 'qwertz',
      deviceName: 'Pixel 10',
      userName: 'Guest',
      language: 'de',
      region: 'DE',
      theme: 'ocean',
      mode: 'light',
      brightness: 100,
      volume: 75,
      silent: false,
      haptics: true,
      wifi: true,
      wifiNetwork: 'Pixel-Home-5G',
      mobileData: true,
      bluetooth: true,
      dnd: false,
      qsTiles: [...DEFAULT_QS_TILES],
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
      const validTiles = Array.isArray(parsed.qsTiles)
        ? parsed.qsTiles.filter(id => Boolean(QS_TILE_CATALOG[id]))
        : null;
      return {
        ...base,
        ...parsed,
        qsTiles: (validTiles && validTiles.length > 0) ? validTiles : [...DEFAULT_QS_TILES],
        googleAccount: { ...base.googleAccount, ...(parsed.googleAccount || {}) },
        familyLink: { ...base.familyLink, ...(parsed.familyLink || {}) }
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
    if (document.getElementById('ios-island-wrap')) return;
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
      renderQuickSettings();
    });

    updateDynamicIsland();
  }

  function updateDynamicIsland() {
    const titleEl = document.getElementById('island-title');
    const badgeEl = document.getElementById('island-badge');
    const detailEl = document.getElementById('island-detail');
    const dotEl = document.getElementById('island-dot');
    if (!titleEl || !badgeEl || !detailEl || !dotEl) return;

    const st = getState();
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

    if (st.silent) {
      titleEl.textContent = 'Lautlos aktiv';
      badgeEl.textContent = '0%';
      detailEl.textContent = 'Systemtöne sind stummgeschaltet.';
      dotEl.style.background = '#FBBF24';
      return;
    }

    const bat = getBatteryInfo(st);
    titleEl.textContent = st.deviceName || 'iOS Live Pill';
    badgeEl.textContent = `${bat.level}%`;
    detailEl.textContent = `Gerät: ${st.deviceName || 'Pixel 10'} · Akku ${bat.level}% · Tippen zum Ein-/Ausklappen`;
    dotEl.style.background = '#34D399';
  }

  /* === Gboard-like Optional On-Screen Keyboard Controller (QWERTZ/QWERTY/AZERTY + Long-Press) === */
  const LAYOUTS = {
    qwertz: [
      ['q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p', 'ü'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ö', 'ä'],
      ['SHIFT', 'y', 'x', 'c', 'v', 'b', 'n', 'm', 'ß', 'BACKSPACE'],
      ['?123', ',', 'SPACE', '.', 'ENTER']
    ],
    qwerty: [
      ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
      ['SHIFT', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'BACKSPACE'],
      ['?123', ',', 'SPACE', '.', 'ENTER']
    ],
    azerty: [
      ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      ['q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm'],
      ['SHIFT', 'w', 'x', 'c', 'v', 'b', 'n', 'BACKSPACE'],
      ['?123', ',', 'SPACE', '.', 'ENTER']
    ]
  };

  const ROWS_SYMBOLS = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-'],
    ['@', '#', '€', '%', '&', '*', '+', '/', '(', ')', '='],
    ['!', '?', ':', ';', '"', "'", '_', '~', '[', 'BACKSPACE'],
    ['ABC', ',', 'SPACE', '.', 'ENTER']
  ];

  const LONG_PRESS_MAP = {
    a: ['á', 'à', 'ä', 'â', 'å', 'ã', 'ą', 'ā', 'æ'],
    e: ['é', 'è', 'ë', 'ê', 'ē', 'ę', '€'],
    i: ['í', 'ì', 'ï', 'î', 'ī', 'į'],
    o: ['ó', 'ò', 'ö', 'ô', 'õ', 'ō', 'ø', 'œ'],
    u: ['ú', 'ù', 'ü', 'û', 'ū', 'ů', 'ų'],
    y: ['ý', 'ÿ', 'ŷ'],
    c: ['ç', 'ć', 'č', '©'],
    d: ['ð', 'ď'],
    l: ['ł', 'ĺ', 'ľ'],
    n: ['ñ', 'ń', 'ň'],
    r: ['ŕ', 'ř', '®'],
    s: ['ß', 'š', 'ś', '$', '§'],
    t: ['þ', 'ť', '™'],
    z: ['ž', 'ź', 'ż'],
    w: ['ŵ'],
    '0': ['°', '∅', '₀', '⁰'],
    '1': ['¹', '₁', '½'],
    '2': ['²', '₂', '⅓'],
    '3': ['³', '₃', '¼'],
    '4': ['¾'],
    '5': ['‰'],
    '.': ['…', '·', '•', '†', '‡'],
    ',': ['‚', '„', '«', '»'],
    '?': ['¿', '‽'],
    '!': ['¡', '‼'],
    '-': ['–', '—', '±', '−'],
    '/': ['\\', '÷', '⁄'],
    '@': ['©', '®', '™'],
    '€': ['$', '£', '¥', '¢', '¤', '‰'],
    '$': ['€', '£', '¥', '¢', '¤'],
    '&': ['§', '¶', '†', '‡'],
    '*': ['•', '°', '×', '‰'],
    '(': ['[', '{', '⟨', '«'],
    ')': [']', '}', '⟩', '»'],
    '=': ['≠', '≈', '≡', '±'],
    '+': ['±', '×', '÷', '−'],
    '_': ['–', '—', '―', '…'],
    '~': ['≈', '¬', '°'],
    '[': ['{', '«', '„', '‹'],
    "'": ['’', '‘', '‚', '´', '`'],
    '"': ['”', '“', '„', '«', '»'],
    ':': [';', '…'],
    ';': [':', '…'],
    '%': ['‰', '°']
  };

  let activeInput = null;
  let shiftActive = false;
  let symMode = false;
  let oskEl = null;
  let popoverEl = null;
  let oskListenersAttached = false;
  let lastOskInteractionAt = 0;
  let longPressTimer = null;
  let longPressTriggered = false;
  let longPressSourceKey = null;

  function markOskInteraction() {
    lastOskInteractionAt = Date.now();
  }

  function isOskEnabled(state = getState()) {
    return Boolean(state && state.oskEnabled);
  }

  function setOskEnabled(enabled) {
    const next = updateState(s => {
      s.oskEnabled = Boolean(enabled);
    });
    if (!next.oskEnabled) {
      closeOsk();
    } else if (activeInput && document.activeElement === activeInput) {
      openOsk(activeInput);
    }
    renderQuickSettings();
    return next.oskEnabled;
  }

  function getOskLayout(state = getState()) {
    const lay = String(state.oskLayout || 'qwertz').toLowerCase();
    return LAYOUTS[lay] ? lay : 'qwertz';
  }

  function setOskLayout(layout) {
    const lay = String(layout || 'qwertz').toLowerCase();
    if (!LAYOUTS[lay]) return;
    updateState(s => {
      s.oskLayout = lay;
    });
    hideLongPressPopover();
    renderKeys();
  }

  function cycleOskLayout() {
    const order = ['qwertz', 'qwerty', 'azerty'];
    const cur = getOskLayout();
    const nextLayout = order[(order.indexOf(cur) + 1) % order.length];
    setOskLayout(nextLayout);
    showToast(`Tastaturlayout: ${nextLayout.toUpperCase()}`);
  }

  function isTextInput(el) {
    if (!el || el.disabled || el.readOnly) return false;
    if (el.closest && (el.closest('#gboard-osk') || el.closest('#gboard-longpress'))) return false;
    if (el.tagName === 'TEXTAREA') return true;
    if (el.tagName === 'INPUT') {
      const tType = (el.type || 'text').toLowerCase();
      return ['text', 'search', 'email', 'url', 'tel', 'number', 'password'].includes(tType);
    }
    return Boolean(el.isContentEditable);
  }

  function suppressNativeKeyboard(el) {
    if (!el || el.dataset.oskPrevInputmode !== undefined) return;
    const prev = el.getAttribute('inputmode');
    el.dataset.oskPrevInputmode = prev !== null ? prev : '__none__';
    el.setAttribute('inputmode', 'none');
  }

  function restoreNativeKeyboard(el) {
    if (!el || el.dataset.oskPrevInputmode === undefined) return;
    const prev = el.dataset.oskPrevInputmode;
    if (prev === '__none__') {
      el.removeAttribute('inputmode');
    } else {
      el.setAttribute('inputmode', prev);
    }
    delete el.dataset.oskPrevInputmode;
  }

  function dispatchInputEvents(el) {
    el.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function insertTextAtCursor(el, text) {
    if (!el || !text) return;
    if (document.activeElement !== el && typeof el.focus === 'function') {
      try { el.focus({ preventScroll: true }); } catch (_) {}
    }
    if (el.isContentEditable) {
      document.execCommand('insertText', false, text);
      dispatchInputEvents(el);
      return;
    }
    const start = typeof el.selectionStart === 'number' ? el.selectionStart : el.value.length;
    const end = typeof el.selectionEnd === 'number' ? el.selectionEnd : el.value.length;
    const val = String(el.value || '');
    el.value = val.slice(0, start) + text + val.slice(end);
    const nextPos = start + text.length;
    try {
      el.setSelectionRange(nextPos, nextPos);
    } catch (_) {}
    dispatchInputEvents(el);
  }

  function backspaceAtCursor(el) {
    if (!el) return;
    if (el.isContentEditable) {
      document.execCommand('delete', false, null);
      dispatchInputEvents(el);
      return;
    }
    const start = typeof el.selectionStart === 'number' ? el.selectionStart : el.value.length;
    const end = typeof el.selectionEnd === 'number' ? el.selectionEnd : el.value.length;
    const val = String(el.value || '');
    if (start !== end) {
      el.value = val.slice(0, start) + val.slice(end);
      try { el.setSelectionRange(start, start); } catch (_) {}
      dispatchInputEvents(el);
    } else if (start > 0) {
      el.value = val.slice(0, start - 1) + val.slice(end);
      try { el.setSelectionRange(start - 1, start - 1); } catch (_) {}
      dispatchInputEvents(el);
    }
  }

  function pressEnter(el) {
    if (!el) return;
    if (el.tagName === 'TEXTAREA' || el.isContentEditable) {
      insertTextAtCursor(el, '\n');
      return;
    }
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', bubbles: true }));
    const form = el.form || (el.closest && el.closest('form'));
    if (form && typeof form.requestSubmit === 'function') {
      form.requestSubmit();
    }
    closeOsk();
  }

  function applyCaseToVariant(ch, isUpper) {
    if (!ch) return ch;
    return isUpper ? ch.toUpperCase() : ch.toLowerCase();
  }

  function getVariantsForBaseChar(baseChar) {
    if (!baseChar) return [];
    const lookupKey = baseChar.toLowerCase();
    const rawList = LONG_PRESS_MAP[lookupKey] || LONG_PRESS_MAP[baseChar] || [];
    const isUpper = !symMode && shiftActive && baseChar.toLowerCase() !== baseChar.toUpperCase();
    const formatted = rawList.map(v => applyCaseToVariant(v, isUpper));
    return Array.from(new Set(formatted));
  }

  function ensureLongPressPopover() {
    if (popoverEl && document.body.contains(popoverEl)) return popoverEl;
    popoverEl = document.createElement('div');
    popoverEl.id = 'gboard-longpress';
    popoverEl.className = 'gboard-longpress';
    popoverEl.setAttribute('role', 'listbox');
    popoverEl.setAttribute('aria-label', 'Zeichenvarianten');

    popoverEl.addEventListener('mousedown', e => {
      e.preventDefault();
      markOskInteraction();
    });
    popoverEl.addEventListener('pointerdown', e => {
      e.preventDefault();
      markOskInteraction();
    });

    const handleVariantPick = e => {
      const opt = e.target && e.target.closest ? e.target.closest('.gboard-lp-item') : null;
      if (!opt || !activeInput) return;
      e.preventDefault();
      e.stopPropagation();
      markOskInteraction();
      const ch = decodeURIComponent(opt.dataset.char || '');
      insertTextAtCursor(activeInput, ch);
      if (!symMode && shiftActive) {
        shiftActive = false;
        renderKeys();
      }
      hideLongPressPopover();
      longPressTriggered = false;
    };

    popoverEl.addEventListener('pointerup', handleVariantPick);
    popoverEl.addEventListener('click', handleVariantPick);

    document.body.appendChild(popoverEl);
    return popoverEl;
  }

  function hideLongPressPopover() {
    clearTimeout(longPressTimer);
    longPressTimer = null;
    longPressSourceKey = null;
    if (popoverEl) {
      popoverEl.classList.remove('open');
      popoverEl.innerHTML = '';
    }
  }

  function showLongPressPopover(keyBtn, baseChar) {
    const variants = getVariantsForBaseChar(baseChar);
    if (!variants.length || !keyBtn) return false;

    const pop = ensureLongPressPopover();
    pop.innerHTML = variants.map(v =>
      `<button type="button" class="gboard-lp-item" data-char="${encodeURIComponent(v)}">${v}</button>`
    ).join('');

    pop.classList.add('open');

    const rect = keyBtn.getBoundingClientRect();
    const vv = window.visualViewport;
    const minLeft = (vv ? vv.offsetLeft : 0) + 8;
    const maxRight = (vv ? vv.offsetLeft + vv.width : window.innerWidth) - 8;

    pop.style.left = '0px';
    pop.style.top = '0px';
    const popRect = pop.getBoundingClientRect();

    let left = rect.left + rect.width / 2 - popRect.width / 2;
    left = Math.max(minLeft, Math.min(left, maxRight - popRect.width));
    const top = Math.max(8, rect.top - popRect.height - 8);

    pop.style.left = `${left}px`;
    pop.style.top = `${top}px`;
    longPressTriggered = true;
    markOskInteraction();
    return true;
  }

  function renderKeys() {
    if (!oskEl) return;
    const keysWrap = oskEl.querySelector('#gboard-keys');
    const targetBadge = oskEl.querySelector('#gboard-target-name');
    const layoutBtn = oskEl.querySelector('#gboard-layout-btn');
    const layoutName = getOskLayout();

    if (layoutBtn) {
      layoutBtn.textContent = layoutName.toUpperCase();
    }
    if (targetBadge && activeInput) {
      const label = activeInput.placeholder || activeInput.ariaLabel || activeInput.id || activeInput.tagName.toLowerCase();
      targetBadge.textContent = label;
    }

    const baseRows = symMode ? ROWS_SYMBOLS : (LAYOUTS[layoutName] || LAYOUTS.qwertz);
    keysWrap.innerHTML = baseRows.map(row => {
      const rowHtml = row.map(key => {
        if (key === 'SHIFT') {
          return `<button type="button" class="gboard-key fn ${shiftActive ? 'active' : ''}" data-key="SHIFT" title="Groß/Klein"><span class="material-symbols-rounded" style="font-size:18px;">shift</span></button>`;
        }
        if (key === 'BACKSPACE') {
          return `<button type="button" class="gboard-key fn" data-key="BACKSPACE" title="Löschen"><span class="material-symbols-rounded" style="font-size:18px;">backspace</span></button>`;
        }
        if (key === '?123') {
          return `<button type="button" class="gboard-key fn" data-key="?123">?123</button>`;
        }
        if (key === 'ABC') {
          return `<button type="button" class="gboard-key fn active" data-key="ABC">ABC</button>`;
        }
        if (key === 'SPACE') {
          return `<button type="button" class="gboard-key space" data-key="SPACE">Leertaste</button>`;
        }
        if (key === 'ENTER') {
          return `<button type="button" class="gboard-key enter" data-key="ENTER" title="Eingabe"><span class="material-symbols-rounded" style="font-size:19px;">keyboard_return</span></button>`;
        }
        const shown = !symMode && shiftActive ? key.toUpperCase() : key;
        const hasLp = getVariantsForBaseChar(key).length > 0;
        return `<button type="button" class="gboard-key ${hasLp ? 'has-lp' : ''}" data-base-char="${encodeURIComponent(key)}" data-char="${encodeURIComponent(shown)}">${shown}</button>`;
      }).join('');
      return `<div class="gboard-row">${rowHtml}</div>`;
    }).join('');
  }

  function ensureOskElement() {
    if (oskEl && document.body.contains(oskEl)) return oskEl;
    const shell = document.querySelector('.android-shell') || document.body;
    oskEl = document.createElement('div');
    oskEl.id = 'gboard-osk';
    oskEl.className = 'gboard-osk';
    oskEl.setAttribute('role', 'region');
    oskEl.setAttribute('aria-label', 'Bildschirmtastatur');
    oskEl.innerHTML = `
      <div class="gboard-topstrip">
        <span style="font-weight:700;display:inline-flex;align-items:center;gap:6px;">
          <span class="material-symbols-rounded" style="font-size:17px;">keyboard</span>
          Gboard
        </span>
        <button type="button" class="gboard-layout-btn" id="gboard-layout-btn" title="Layout wechseln (QWERTZ / QWERTY / AZERTY)">QWERTZ</button>
        <span class="gboard-target-pill" id="gboard-target-name">Eingabe</span>
        <button type="button" class="icon-btn" id="gboard-close-btn" title="Tastatur ausblenden" style="width:30px;height:30px;">
          <span class="material-symbols-rounded" style="font-size:18px;">keyboard_hide</span>
        </button>
      </div>
      <div id="gboard-keys"></div>
    `;

    oskEl.addEventListener('mousedown', e => {
      e.preventDefault();
      markOskInteraction();
    });

    oskEl.addEventListener('pointerdown', e => {
      e.preventDefault();
      markOskInteraction();
      const keyBtn = e.target.closest('.gboard-key');
      if (!keyBtn || !activeInput || keyBtn.dataset.char === undefined) return;
      const baseChar = decodeURIComponent(keyBtn.dataset.baseChar || keyBtn.dataset.char || '');
      if (!getVariantsForBaseChar(baseChar).length) return;

      clearTimeout(longPressTimer);
      longPressTriggered = false;
      longPressSourceKey = keyBtn;
      longPressTimer = setTimeout(() => {
        if (longPressSourceKey === keyBtn) {
          showLongPressPopover(keyBtn, baseChar);
        }
      }, 420);
    });

    const cancelPendingLongPress = () => {
      clearTimeout(longPressTimer);
      longPressTimer = null;
      longPressSourceKey = null;
    };

    oskEl.addEventListener('pointerup', cancelPendingLongPress);
    oskEl.addEventListener('pointercancel', cancelPendingLongPress);
    oskEl.addEventListener('pointerleave', cancelPendingLongPress);

    oskEl.addEventListener('click', e => {
      markOskInteraction();
      const layoutBtn = e.target.closest('#gboard-layout-btn');
      if (layoutBtn) {
        cycleOskLayout();
        return;
      }
      const closeBtn = e.target.closest('#gboard-close-btn');
      if (closeBtn) {
        closeOsk();
        return;
      }
      const keyBtn = e.target.closest('.gboard-key');
      if (!keyBtn || !activeInput) return;

      cancelPendingLongPress();

      if (longPressTriggered) {
        longPressTriggered = false;
        return;
      }

      const special = keyBtn.dataset.key;
      if (special === 'SHIFT') {
        shiftActive = !shiftActive;
        renderKeys();
        return;
      }
      if (special === '?123') {
        symMode = true;
        hideLongPressPopover();
        renderKeys();
        return;
      }
      if (special === 'ABC') {
        symMode = false;
        hideLongPressPopover();
        renderKeys();
        return;
      }
      if (special === 'BACKSPACE') {
        backspaceAtCursor(activeInput);
        return;
      }
      if (special === 'SPACE') {
        insertTextAtCursor(activeInput, ' ');
        return;
      }
      if (special === 'ENTER') {
        pressEnter(activeInput);
        return;
      }
      if (keyBtn.dataset.char !== undefined) {
        const ch = decodeURIComponent(keyBtn.dataset.char);
        insertTextAtCursor(activeInput, ch);
        if (!symMode && shiftActive) {
          shiftActive = false;
          renderKeys();
        }
      }
    });

    shell.appendChild(oskEl);
    renderKeys();
    return oskEl;
  }

  function syncOskViewport() {
    if (!oskEl || !oskEl.classList.contains('open')) return;

    const vv = window.visualViewport;
    const visibleHeight = vv ? vv.height : window.innerHeight;
    document.documentElement.style.setProperty('--osk-visible-vh', `${visibleHeight}px`);

    if (vv) {
      const bottomGap = Math.max(0, window.innerHeight - (vv.offsetTop + vv.height));
      oskEl.style.bottom = `${bottomGap}px`;
      oskEl.style.left = `${Math.max(0, vv.offsetLeft)}px`;
      oskEl.style.width = `${vv.width}px`;
    } else {
      oskEl.style.bottom = '0px';
      oskEl.style.left = '0px';
      oskEl.style.width = '100%';
    }

    const h = oskEl.offsetHeight || 250;
    document.documentElement.style.setProperty('--osk-height', `${h}px`);
  }

  function ensureInputVisible(inputEl) {
    if (!inputEl || !oskEl || !oskEl.classList.contains('open')) return;
    const vvHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
    const oskHeight = oskEl.offsetHeight || 250;
    const visibleBottom = vvHeight - oskHeight - 16;
    const rect = inputEl.getBoundingClientRect();

    if (rect.bottom > visibleBottom || rect.top < 48) {
      inputEl.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }

  function openOsk(inputEl) {
    if (!isOskEnabled() || !isTextInput(inputEl)) return;
    if (activeInput && activeInput !== inputEl) {
      restoreNativeKeyboard(activeInput);
    }
    activeInput = inputEl;
    suppressNativeKeyboard(inputEl);

    const el = ensureOskElement();
    renderKeys();
    el.classList.add('open');
    const shell = document.querySelector('.android-shell');
    if (shell) shell.classList.add('osk-open');

    requestAnimationFrame(() => {
      syncOskViewport();
      ensureInputVisible(inputEl);
    });
  }

  function closeOsk() {
    hideLongPressPopover();
    if (activeInput) {
      restoreNativeKeyboard(activeInput);
    }
    if (oskEl) {
      oskEl.classList.remove('open');
      oskEl.style.bottom = '0px';
      oskEl.style.left = '0px';
      oskEl.style.width = '';
    }
    const shell = document.querySelector('.android-shell');
    if (shell) shell.classList.remove('osk-open');
    document.documentElement.style.removeProperty('--osk-visible-vh');
    activeInput = null;
  }

  function attachOskListeners() {
    if (oskListenersAttached) return;
    oskListenersAttached = true;

    document.addEventListener('pointerdown', e => {
      if (!isOskEnabled()) return;
      if (isTextInput(e.target)) {
        suppressNativeKeyboard(e.target);
      }
    }, true);

    document.addEventListener('focusin', e => {
      if (!isOskEnabled()) return;
      if (isTextInput(e.target)) {
        openOsk(e.target);
      }
    });

    document.addEventListener('click', e => {
      if (!oskEl || !oskEl.classList.contains('open')) return;
      if (Date.now() - lastOskInteractionAt < 180) return;
      const path = typeof e.composedPath === 'function' ? e.composedPath() : [];
      if (
        path.includes(oskEl) ||
        (popoverEl && path.includes(popoverEl)) ||
        (e.target && e.target.isConnected && (
          oskEl.contains(e.target) ||
          (popoverEl && popoverEl.contains(e.target)) ||
          isTextInput(e.target)
        ))
      ) {
        return;
      }
      closeOsk();
    });

    window.addEventListener('resize', () => {
      hideLongPressPopover();
      syncOskViewport();
      ensureInputVisible(activeInput);
    });

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', () => {
        hideLongPressPopover();
        syncOskViewport();
        ensureInputVisible(activeInput);
      });
      window.visualViewport.addEventListener('scroll', () => {
        hideLongPressPopover();
        syncOskViewport();
      });
    }
  }

  /* === Quick Settings (Editable & Reorderable Tiles) === */
  function isQsTileActive(id, st) {
    const def = QS_TILE_CATALOG[id];
    if (!def) return false;
    if (def.type === 'toggle') return Boolean(st[def.stateKey]);
    if (def.type === 'mode') return st.mode === 'dark';
    if (def.type === 'osk') return Boolean(st.oskEnabled);
    return false;
  }

  function handleQsTileAction(id) {
    const def = QS_TILE_CATALOG[id];
    if (!def) return;
    if (def.type === 'toggle') {
      updateState(s => { s[def.stateKey] = !s[def.stateKey]; });
      renderQuickSettings();
      updateDynamicIsland();
      return;
    }
    if (def.type === 'mode') {
      updateState(s => { s.mode = s.mode === 'dark' ? 'light' : 'dark'; });
      renderQuickSettings();
      return;
    }
    if (def.type === 'osk') {
      const next = setOskEnabled(!isOskEnabled());
      showToast(next ? 'Bildschirmtastatur (Gboard) aktiviert' : 'Bildschirmtastatur deaktiviert');
      return;
    }
    if (def.type === 'link' && def.href) {
      window.location.href = def.href;
    }
  }

  function moveQsTile(fromIndex, toIndex) {
    updateState(s => {
      const arr = Array.isArray(s.qsTiles) ? [...s.qsTiles] : [...DEFAULT_QS_TILES];
      if (fromIndex < 0 || fromIndex >= arr.length || toIndex < 0 || toIndex >= arr.length) return;
      const [item] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, item);
      s.qsTiles = arr;
    });
    renderQuickSettings();
  }

  function removeQsTile(index) {
    updateState(s => {
      const arr = Array.isArray(s.qsTiles) ? [...s.qsTiles] : [...DEFAULT_QS_TILES];
      if (arr.length <= 1) {
        showToast('Mindestens eine Kachel muss aktiv bleiben.');
        return;
      }
      arr.splice(index, 1);
      s.qsTiles = arr;
    });
    renderQuickSettings();
  }

  function addQsTile(id) {
    if (!QS_TILE_CATALOG[id]) return;
    updateState(s => {
      const arr = Array.isArray(s.qsTiles) ? [...s.qsTiles] : [...DEFAULT_QS_TILES];
      if (!arr.includes(id)) arr.push(id);
      s.qsTiles = arr;
    });
    renderQuickSettings();
  }

  function resetQsTiles() {
    updateState(s => {
      s.qsTiles = [...DEFAULT_QS_TILES];
    });
    renderQuickSettings();
    showToast('Schnelleinstellungen zurückgesetzt');
  }

  function renderQuickSettings() {
    const qsRoot = document.getElementById('sys-qs-root');
    if (!qsRoot) return;
    const st = getState();
    const activeIds = Array.isArray(st.qsTiles) && st.qsTiles.length ? st.qsTiles : [...DEFAULT_QS_TILES];
    const availableIds = Object.keys(QS_TILE_CATALOG).filter(id => !activeIds.includes(id));

    let backdrop = document.getElementById('qs-backdrop');
    let panel = document.getElementById('qs-panel');
    const wasOpen = panel ? panel.classList.contains('open') : false;

    if (!backdrop || !panel) {
      qsRoot.innerHTML = `
        <div class="qs-backdrop" id="qs-backdrop"></div>
        <div class="qs-panel" id="qs-panel"></div>
      `;
      backdrop = document.getElementById('qs-backdrop');
      panel = document.getElementById('qs-panel');
      backdrop.addEventListener('click', () => {
        qsEditMode = false;
        toggleQS(false);
      });
    }

    const tilesHtml = activeIds.map((id, idx) => {
      const def = QS_TILE_CATALOG[id];
      if (!def) return '';
      const active = !qsEditMode && isQsTileActive(id, st);
      const label = t(def.labelKey, st);

      if (qsEditMode) {
        return `
          <div class="qs-tile editing" draggable="true" data-qs-idx="${idx}" data-qs-id="${id}">
            <span class="qs-tile-main">
              <span class="material-symbols-rounded" style="font-size:18px;opacity:0.7;">drag_indicator</span>
              <span class="material-symbols-rounded">${def.icon}</span>
              <span class="qs-tile-label">${label}</span>
            </span>
            <span class="qs-tile-controls">
              <button type="button" class="qs-mini-act" data-qs-move="-1" data-qs-idx="${idx}" title="Nach oben/links" ${idx === 0 ? 'disabled style="opacity:0.35;"' : ''}>
                <span class="material-symbols-rounded" style="font-size:16px;">arrow_upward</span>
              </button>
              <button type="button" class="qs-mini-act" data-qs-move="1" data-qs-idx="${idx}" title="Nach unten/rechts" ${idx === activeIds.length - 1 ? 'disabled style="opacity:0.35;"' : ''}>
                <span class="material-symbols-rounded" style="font-size:16px;">arrow_downward</span>
              </button>
              <button type="button" class="qs-mini-act" data-qs-remove="${idx}" title="Entfernen">
                <span class="material-symbols-rounded" style="font-size:16px;">close</span>
              </button>
            </span>
          </div>
        `;
      }

      return `
        <button type="button" class="qs-tile ${active ? 'active' : ''}" data-qs-trigger="${id}">
          <span class="qs-tile-main">
            <span class="material-symbols-rounded">${def.icon}</span>
            <span class="qs-tile-label">${label}</span>
          </span>
        </button>
      `;
    }).join('');

    const editTrayHtml = qsEditMode ? `
      <div class="qs-edit-tray">
        <div class="qs-edit-tray-title">
          <span>${t('availableTiles', st)}</span>
          <button type="button" class="m3-chip" id="qs-reset-btn" style="padding:4px 10px;font-size:11px;">${t('resetTiles', st)}</button>
        </div>
        <div class="qs-pool-grid">
          ${availableIds.length
            ? availableIds.map(id => {
                const def = QS_TILE_CATALOG[id];
                return `<button type="button" class="qs-pool-chip" data-qs-add="${id}">
                  <span class="material-symbols-rounded" style="font-size:16px;">add</span>
                  <span class="material-symbols-rounded" style="font-size:16px;">${def.icon}</span>
                  <span>${t(def.labelKey, st)}</span>
                </button>`;
              }).join('')
            : `<span style="font-size:12px;color:var(--md-sys-color-on-surface-variant);">Alle Kacheln sind bereits aktiv.</span>`
          }
        </div>
      </div>
    ` : '';

    panel.innerHTML = `
      <div class="qs-header">
        <div>
          <div id="qs-date" style="font-size:13px; color:var(--md-sys-color-on-surface-variant); font-weight:600;">${formatDate(new Date(), st)}</div>
          <div style="font-size:12px; opacity:0.75;">${t('quickSettings', st)}</div>
        </div>
        <div style="display:flex; gap:8px;">
          <button type="button" class="icon-btn ${qsEditMode ? 'active' : ''}" id="qs-edit-toggle" title="${qsEditMode ? t('doneEditing', st) : t('editTiles', st)}">
            <span class="material-symbols-rounded">${qsEditMode ? 'check' : 'edit'}</span>
          </button>
          <a href="einstellungen.html" class="icon-btn" title="${t('settings', st)}">
            <span class="material-symbols-rounded">settings</span>
          </a>
          <button type="button" class="icon-btn" onclick="AndroidOS.lockDevice(true)" title="${t('lockScreen', st)}">
            <span class="material-symbols-rounded">lock</span>
          </button>
        </div>
      </div>
      <div class="qs-grid" id="qs-grid">${tilesHtml}</div>
      <div class="qs-sliders">
        <div class="qs-brightness">
          <span class="material-symbols-rounded" style="font-size:20px;">brightness_medium</span>
          <input type="range" id="qs-bright-range" min="45" max="100" value="${st.brightness || 100}">
        </div>
        <div class="qs-brightness">
          <span class="material-symbols-rounded" style="font-size:20px;">${st.silent ? 'volume_off' : 'volume_up'}</span>
          <input type="range" id="qs-vol-range" min="0" max="100" value="${st.silent ? 0 : (st.volume ?? 75)}">
        </div>
      </div>
      ${editTrayHtml}
    `;

    if (wasOpen) {
      backdrop.classList.add('open');
      panel.classList.add('open');
    }

    document.getElementById('qs-edit-toggle').addEventListener('click', () => {
      qsEditMode = !qsEditMode;
      renderQuickSettings();
    });

    const resetBtn = document.getElementById('qs-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', resetQsTiles);
    }

    panel.querySelectorAll('[data-qs-trigger]').forEach(btn => {
      btn.addEventListener('click', () => handleQsTileAction(btn.dataset.qsTrigger));
    });

    panel.querySelectorAll('[data-qs-move]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = Number(btn.dataset.qsIdx);
        const dir = Number(btn.dataset.qsMove);
        moveQsTile(idx, idx + dir);
      });
    });

    panel.querySelectorAll('[data-qs-remove]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        removeQsTile(Number(btn.dataset.qsRemove));
      });
    });

    panel.querySelectorAll('[data-qs-add]').forEach(btn => {
      btn.addEventListener('click', () => addQsTile(btn.dataset.qsAdd));
    });

    // Drag & Drop sorting inside Quick Settings
    panel.querySelectorAll('.qs-tile.editing').forEach(tile => {
      tile.addEventListener('dragstart', (e) => {
        qsDragIndex = Number(tile.dataset.qsIdx);
        tile.classList.add('dragging');
        if (e.dataTransfer) {
          e.dataTransfer.effectAllowed = 'move';
          e.dataTransfer.setData('text/plain', String(qsDragIndex));
        }
      });
      tile.addEventListener('dragend', () => {
        tile.classList.remove('dragging');
        qsDragIndex = null;
        panel.querySelectorAll('.qs-tile').forEach(el => el.classList.remove('drag-over'));
      });
      tile.addEventListener('dragover', (e) => {
        e.preventDefault();
        tile.classList.add('drag-over');
      });
      tile.addEventListener('dragleave', () => {
        tile.classList.remove('drag-over');
      });
      tile.addEventListener('drop', (e) => {
        e.preventDefault();
        tile.classList.remove('drag-over');
        const targetIdx = Number(tile.dataset.qsIdx);
        if (qsDragIndex !== null && qsDragIndex !== targetIdx) {
          moveQsTile(qsDragIndex, targetIdx);
        }
      });
    });

    document.getElementById('qs-bright-range').addEventListener('input', (e) => {
      updateState(s => { s.brightness = Number(e.target.value); });
    });

    document.getElementById('qs-vol-range').addEventListener('input', (e) => {
      const val = Number(e.target.value);
      updateState(s => {
        s.volume = val;
        s.silent = val === 0;
      });
      updateDynamicIsland();
    });
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
          <span id="sb-silent" class="material-symbols-rounded" style="font-size:16px; display:none;">volume_off</span>
          <span id="sb-dnd" class="material-symbols-rounded" style="font-size:16px; display:none;">do_not_disturb_on</span>
          <span id="sb-wifi" class="material-symbols-rounded" style="font-size:17px;">wifi</span>
          <span id="sb-mobile" class="material-symbols-rounded" style="font-size:17px;">signal_cellular_alt</span>
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

    if (!isSetup) {
      renderQuickSettings();
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
      const mobileEl = document.getElementById('sb-mobile');
      const dndEl = document.getElementById('sb-dnd');
      const silentEl = document.getElementById('sb-silent');
      const batVal = document.getElementById('sb-bat-val');
      const batIcon = document.getElementById('sb-bat-icon');
      const bat = getBatteryInfo(cur);
      if (wifiEl) wifiEl.textContent = cur.wifi ? 'wifi' : 'wifi_off';
      if (mobileEl) mobileEl.textContent = cur.mobileData ? 'signal_cellular_alt' : 'signal_cellular_off';
      if (dndEl) dndEl.style.display = cur.dnd ? 'inline-flex' : 'none';
      if (silentEl) silentEl.style.display = cur.silent ? 'inline-flex' : 'none';
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

    attachOskListeners();
    mountDynamicIsland(isSetup);
    syncDeviceBattery(() => {
      refreshStatusIcons();
      updateDynamicIsland();
    });
    tick();
    setInterval(tick, 1000);
  }

  function toggleQS(open) {
    if (open) {
      renderQuickSettings();
    } else {
      qsEditMode = false;
    }
    const bd = document.getElementById('qs-backdrop');
    const pn = document.getElementById('qs-panel');
    if (!bd || !pn) return;
    bd.classList.toggle('open', open);
    pn.classList.toggle('open', open);
  }

  return {
    STORAGE_KEY,
    I18N,
    DEFAULT_QS_TILES,
    QS_TILE_CATALOG,
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
    renderQuickSettings,
    toggleQS,
    isOskEnabled,
    setOskEnabled,
    getOskLayout,
    setOskLayout,
    openOsk,
    closeOsk
  };
})();
