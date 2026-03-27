'use strict';

/* ============================================================
   DATA
   Valid types: 'achievement' | 'milestone' | 'update' | 'announcement'
   Valid domains: 'gym' | 'judo' | 'chess' | 'piano' | 'cs' | 'general'
   ============================================================ */
const DATA = {

  feed: [
    {
      id: 'f001',
      type: 'achievement',
      domain: 'gym',
      date: '2026-03-20',
      dateDisplay: '20 MAR 2026',
      title: 'Deadlift PR — 180kg',
      desc: 'Clean pull. No belt. Part of a 3-month linear progression block.',
    },
    {
      id: 'f002',
      type: 'milestone',
      domain: 'chess',
      date: '2026-03-15',
      dateDisplay: '15 MAR 2026',
      title: 'Chess.com Rapid — 1200 ELO',
      desc: 'Crossed 1200 in rapid. Been studying endgames and openings seriously.',
    },
    {
      id: 'f003',
      type: 'update',
      domain: 'cs',
      date: '2026-03-10',
      dateDisplay: '10 MAR 2026',
      title: 'LeetCode — 50 problems solved',
      desc: 'Completed 50 problems. Focus on arrays and hashmaps. Medium difficulty.',
    },
    {
      id: 'f004',
      type: 'update',
      domain: 'piano',
      date: '2026-03-05',
      dateDisplay: '05 MAR 2026',
      title: 'Moonlight Sonata Mvt. 1 — full tempo',
      desc: 'First clean run at full speed. 4 months of practice.',
    },
    {
      id: 'f005',
      type: 'achievement',
      domain: 'judo',
      date: '2026-02-28',
      dateDisplay: '28 FEB 2026',
      title: 'First competition — podium finish',
      desc: '3rd place at regional tournament. First competitive judo result.',
    },
    {
      id: 'f006',
      type: 'announcement',
      domain: 'general',
      date: '2026-02-20',
      dateDisplay: '20 FEB 2026',
      title: 'belka.life is live',
      desc: 'Centralized proof hub. All domains tracked here going forward.',
    },
    {
      id: 'f007',
      type: 'update',
      domain: 'gym',
      date: '2026-02-10',
      dateDisplay: '10 FEB 2026',
      title: 'Squat hits 140kg',
      desc: '6-week progression. Form checked on video — solid depth.',
    },
    {
      id: 'f008',
      type: 'milestone',
      domain: 'piano',
      date: '2026-01-28',
      dateDisplay: '28 JAN 2026',
      title: 'Für Elise — performance ready',
      desc: 'First full piece learned end-to-end. Consistent clean playback.',
    },
    {
      id: 'f009',
      type: 'update',
      domain: 'chess',
      date: '2026-01-15',
      dateDisplay: '15 JAN 2026',
      title: 'Started daily puzzle routine',
      desc: '10 puzzles per day. Targeting pattern recognition in middlegame.',
    },
    {
      id: 'f010',
      type: 'update',
      domain: 'cs',
      date: '2026-01-05',
      dateDisplay: '05 JAN 2026',
      title: 'Started LeetCode daily',
      desc: '1 problem per day minimum. No skip days.',
    },
  ],

  feedInitialCount: 6,

  domains: [
    {
      id: 'gym',
      icon: '💪',
      name: 'GYM',
      subtitle: 'Physical Performance',
      status: 'active',
      accentVar: '--accent-gym',
      latestMilestone: 'Deadlift 180kg',
      overview: 'Structured strength training. Linear progression. No fluff.',
      metrics: [
        { label: 'DEADLIFT PR', value: '180kg' },
        { label: 'SQUAT PR',    value: '140kg' },
        { label: 'BENCH PR',    value: '100kg' },
        { label: 'FREQUENCY',   value: '6× / wk' },
      ],
      timeline: [
        { date: 'MAR 2026', event: 'Deadlift 180kg' },
        { date: 'FEB 2026', event: 'Squat 140kg' },
        { date: 'JAN 2026', event: 'Started linear progression block' },
        { date: 'DEC 2025', event: 'Joined current gym' },
      ],
      hoverStats: [
        { label: 'STREAK',    value: '14 wks' },
        { label: 'FREQUENCY', value: '6× / wk' },
      ],
      proofLinks: [
        { label: 'Instagram — Deadlift 180kg', url: 'https://instagram.com/belka0fficial' },
      ],
      achievements: [
        { date: '20 MAR 2026', text: 'Deadlift 180kg — clean pull, no belt' },
        { date: '14 FEB 2026', text: 'Squat 140kg — solid depth, video-checked' },
        { date: '01 JAN 2026', text: 'Bench press 100kg — first triple-digit bench' },
        { date: 'DEC 2025',    text: 'Joined current gym, started linear progression block' },
      ],
      sessions: [
        { date: '25 MAR', type: 'Strength', exercises: 'Deadlift / Row / Chin-up', duration: '70 min' },
        { date: '23 MAR', type: 'Strength', exercises: 'Squat / OHP / RDL',        duration: '65 min' },
        { date: '21 MAR', type: 'Strength', exercises: 'Bench / Row / Dips',       duration: '60 min' },
      ],
      socialPosts: [
        { platform: 'instagram', caption: '180kg deadlift. No belt. Clean pull.',       date: '20 MAR 2026', url: 'https://instagram.com/belka0fficial', icon: '💪' },
        { platform: 'instagram', caption: '14 weeks of training. No missed sessions.', date: '01 MAR 2026', url: 'https://instagram.com/belka0fficial', icon: '📅' },
      ],
      apiConfig: null,
    },
    {
      id: 'judo',
      icon: '🥋',
      name: 'JUDO',
      subtitle: 'Martial Arts / Competition',
      status: 'active',
      accentVar: '--accent-judo',
      latestMilestone: '3rd place regional',
      overview: 'Competition-focused judo. Technical ground game. Consistent mat time.',
      metrics: [
        { label: 'BELT',         value: 'White' },
        { label: 'COMPETITIONS', value: '1' },
        { label: 'BEST RESULT',  value: '3rd place' },
        { label: 'TRAINING',     value: '5–6× / wk' },
      ],
      timeline: [
        { date: 'FEB 2026', event: 'First competition — 3rd place (regional)' },
        { date: 'NOV 2025', event: 'Started judo' },
      ],
      hoverStats: [
        { label: 'COMP',     value: '3rd' },
        { label: 'TRAINING', value: '5–6× / wk' },
      ],
      proofLinks: [],
      achievements: [
        { date: 'FEB 2026', text: '3rd place at first regional competition (white belt)' },
        { date: 'JAN 2026', text: 'Registered for first competition — started competition prep' },
        { date: 'NOV 2025', text: 'First day on the mat. Started judo training.' },
      ],
      sessions: [
        { date: '25 MAR', type: 'Technical', exercises: 'Seoi-nage + uchi-komi drills', duration: '90 min' },
        { date: '23 MAR', type: 'Randori',   exercises: 'Live sparring — 6 rounds',     duration: '90 min' },
        { date: '20 MAR', type: 'Technical', exercises: 'Ne-waza ground work',          duration: '80 min' },
      ],
      socialPosts: [
        { platform: 'instagram', caption: '3rd place at first competition. White belt.', date: '28 FEB 2026', url: 'https://instagram.com/belka0fficial', icon: '🥋' },
      ],
      apiConfig: null,
    },
    {
      id: 'chess',
      icon: '♟',
      name: 'CHESS',
      subtitle: 'ELO / Rated Play',
      status: 'active',
      accentVar: '--accent-chess',
      latestMilestone: 'Rapid 1200 ELO',
      overview: 'Online rated play. Studying openings, tactics, endgames. Chess.com.',
      metrics: [
        { label: 'RAPID ELO',  value: '1200' },
        { label: 'BLITZ ELO',  value: '1050' },
        { label: 'GAMES',      value: '340+' },
        { label: 'PUZZLES',    value: '200+' },
      ],
      timeline: [
        { date: 'MAR 2026', event: 'Rapid 1200 ELO reached' },
        { date: 'JAN 2026', event: 'Started daily puzzle routine' },
        { date: 'OCT 2025', event: 'First rated games' },
      ],
      hoverStats: [
        { label: 'RAPID ELO', value: '1200' },
        { label: 'GAMES',     value: '340+' },
      ],
      proofLinks: [
        { label: 'Chess.com — belka0fficial', url: 'https://chess.com/member/belka0fficial' },
      ],
      achievements: [
        { date: '15 MAR 2026', text: 'Rapid ELO crosses 1200 — first major rating milestone' },
        { date: '01 FEB 2026', text: '5-game win streak in rapid (1150+ rated opponents)' },
        { date: '15 JAN 2026', text: 'Completed Ruy Lopez opening system study' },
        { date: 'OCT 2025',    text: 'First rated game on Chess.com — started competitive play' },
      ],
      sessions: [
        { date: '25 MAR', type: 'Rapid',   games: 6,  result: '+4 / −2',      duration: '55 min' },
        { date: '22 MAR', type: 'Blitz',   games: 8,  result: '+5 / −3',      duration: '35 min' },
        { date: '20 MAR', type: 'Puzzles', games: 15, result: 'Rating: 1320', duration: '20 min' },
        { date: '18 MAR', type: 'Rapid',   games: 4,  result: '+3 / −1',      duration: '40 min' },
      ],
      socialPosts: [
        { platform: 'instagram', caption: 'Rapid 1200 — 5 months of daily practice.',      date: '16 MAR 2026', url: 'https://instagram.com/belka0fficial', icon: '♟' },
        { platform: 'instagram', caption: 'Daily puzzle routine: 10 puzzles, no skips.', date: '02 JAN 2026', url: 'https://instagram.com/belka0fficial', icon: '🧩' },
      ],
      apiConfig: { type: 'chess', username: 'belka0fficial' },
    },
    {
      id: 'piano',
      icon: '🎹',
      name: 'PIANO',
      subtitle: 'Classical / Music',
      status: 'active',
      accentVar: '--accent-piano',
      latestMilestone: 'Moonlight Sonata Mvt. 1',
      overview: 'Self-taught piano. Focus on classical repertoire. No shortcuts.',
      metrics: [
        { label: 'PIECES',     value: '3 complete' },
        { label: 'CURRENT',    value: 'Moonlight Snt.' },
        { label: 'PRACTICE',   value: '30min / day' },
        { label: 'EXPERIENCE', value: '8 months' },
      ],
      timeline: [
        { date: 'MAR 2026', event: 'Moonlight Sonata Mvt. 1 complete' },
        { date: 'JAN 2026', event: 'Für Elise — performance ready' },
        { date: 'JUL 2025', event: 'Started piano' },
      ],
      hoverStats: [
        { label: 'PIECES',   value: '3' },
        { label: 'PRACTICE', value: '30min/d' },
      ],
      proofLinks: [],
      achievements: [
        { date: 'MAR 2026', text: 'Moonlight Sonata Mvt. 1 — first clean run at full tempo' },
        { date: 'JAN 2026', text: 'Für Elise — performance-ready, consistent clean playback' },
        { date: 'OCT 2025', text: 'First complete piece: Gymnopédie No. 1 learned end-to-end' },
        { date: 'JUL 2025', text: 'Started piano. No prior music experience.' },
      ],
      sessions: [
        { date: '26 MAR', type: 'Practice', exercises: 'Moonlight Sonata — transitions + dynamics', duration: '35 min' },
        { date: '25 MAR', type: 'Practice', exercises: 'Scales + Für Elise maintenance',            duration: '30 min' },
        { date: '24 MAR', type: 'Practice', exercises: 'New piece sight-reading',                   duration: '30 min' },
      ],
      socialPosts: [
        { platform: 'instagram', caption: 'Moonlight Sonata at full tempo — 4 months in.', date: '05 MAR 2026', url: 'https://instagram.com/belka0fficial', icon: '🎹' },
      ],
      apiConfig: null,
    },
    {
      id: 'cs',
      icon: '⌨',
      name: 'CS / CODING',
      subtitle: 'Projects / Algorithms',
      status: 'active',
      accentVar: '--accent-cs',
      latestMilestone: 'LeetCode 50 solved',
      overview: 'Software development, algorithms, systems. Proof through shipped code.',
      metrics: [
        { label: 'LEETCODE',  value: '50+ solved' },
        { label: 'GITHUB',    value: 'active' },
        { label: 'LANGUAGES', value: 'JS, Python' },
        { label: 'PROJECTS',  value: '3 shipped' },
      ],
      timeline: [
        { date: 'MAR 2026', event: 'LeetCode 50 solved' },
        { date: 'FEB 2026', event: 'belka.life launched' },
        { date: 'JAN 2026', event: 'Started LeetCode daily' },
      ],
      hoverStats: [
        { label: 'LEETCODE', value: '50+' },
        { label: 'PROJECTS', value: '3' },
      ],
      proofLinks: [
        { label: 'GitHub — belka0fficial', url: 'https://github.com/belka0fficial' },
        { label: 'LeetCode profile',       url: 'https://leetcode.com/belka0fficial' },
      ],
      achievements: [
        { date: 'MAR 2026', text: 'LeetCode 50 problems solved — arrays, hashmaps, sliding window' },
        { date: 'FEB 2026', text: 'belka.life launched — first fully shipped project' },
        { date: 'JAN 2026', text: 'Started LeetCode daily — 1 problem per day, no skip days' },
      ],
      sessions: [
        { date: '26 MAR', type: 'LeetCode', exercises: '3 medium problems — dynamic programming', duration: '90 min' },
        { date: '25 MAR', type: 'Project',  exercises: 'belka.life — modal system rebuild',       duration: '120 min' },
        { date: '24 MAR', type: 'LeetCode', exercises: '2 problems — graph traversal (BFS/DFS)',  duration: '60 min' },
      ],
      socialPosts: [
        { platform: 'instagram', caption: '50 LeetCode problems. All self-taught.', date: '10 MAR 2026', url: 'https://instagram.com/belka0fficial', icon: '⌨' },
      ],
      apiConfig: { type: 'github', username: 'belka0fficial' },
    },
  ],

  secondaryDomains: [
    {
      id: 'math',
      icon: '📐',
      name: 'MATH',
      subtitle: 'Calculus / Linear Algebra',
      status: 'building',
      accentVar: '--accent-chess',
      latestMilestone: 'Calculus foundations',
      overview: 'Working through calculus and linear algebra. Self-directed. No shortcuts.',
      metrics: [
        { label: 'CURRENT', value: 'Calculus' },
        { label: 'NEXT',    value: 'Lin. Algebra' },
      ],
      timeline: [
        { date: 'JAN 2026', event: 'Started calculus self-study' },
      ],
      hoverStats: [{ label: 'STATUS', value: 'Building' }],
      proofLinks: [],
    },
    {
      id: 'languages',
      icon: '🗣',
      name: 'LANGUAGES',
      subtitle: 'Acquisition / Systems',
      status: 'building',
      accentVar: '--accent-piano',
      latestMilestone: 'System design phase',
      overview: 'Language acquisition treated as a systematic skill. Building the method before the reps.',
      metrics: [
        { label: 'APPROACH', value: 'Systematic' },
        { label: 'STATUS',   value: 'Exploring' },
      ],
      timeline: [
        { date: 'MAR 2026', event: 'Started methodology research' },
      ],
      hoverStats: [{ label: 'STATUS', value: 'Building' }],
      proofLinks: [],
    },
    {
      id: 'running',
      icon: '🏃',
      name: 'RUNNING',
      subtitle: 'Endurance / Cardio',
      status: 'building',
      accentVar: '--accent-gym',
      latestMilestone: '5km baseline',
      overview: 'Building aerobic base alongside strength training. Separate from gym — different adaptation.',
      metrics: [
        { label: '5KM',    value: '26:00' },
        { label: 'TARGET', value: 'Sub 22:00' },
      ],
      timeline: [
        { date: 'FEB 2026', event: 'Started tracking runs' },
        { date: 'MAR 2026', event: '5km in 26 min' },
      ],
      hoverStats: [{ label: '5KM PR', value: '26:00' }],
      proofLinks: [],
    },
    {
      id: 'reading',
      icon: '📚',
      name: 'READING',
      subtitle: 'Non-fiction / Technical',
      status: 'active',
      accentVar: '--accent-cs',
      latestMilestone: '8 books this year',
      overview: 'Deliberate reading. Non-fiction, technical, and philosophy. Notes kept.',
      metrics: [
        { label: 'THIS YEAR', value: '8 books' },
        { label: 'FORMAT',    value: 'Notes kept' },
      ],
      timeline: [
        { date: 'JAN 2026', event: 'Started book tracking system' },
        { date: 'MAR 2026', event: '8th book completed' },
      ],
      hoverStats: [{ label: 'BOOKS', value: '8 / yr' }],
      proofLinks: [],
    },
    {
      id: 'physics',
      icon: '⚛',
      name: 'PHYSICS',
      subtitle: 'Foundations / Self-study',
      status: 'building',
      accentVar: '--accent-cs',
      latestMilestone: 'Classical mechanics',
      overview: 'Physics as a long-term foundation. Studying classical mechanics as a starting point.',
      metrics: [{ label: 'CURRENT', value: 'Mechanics' }, { label: 'STATUS', value: 'Building' }],
      timeline: [{ date: 'FEB 2026', event: 'Started classical mechanics' }],
      hoverStats: [{ label: 'STATUS', value: 'Building' }],
      proofLinks: [],
    },
    {
      id: 'drawing',
      icon: '🎨',
      name: 'DRAWING',
      subtitle: 'Fundamentals / Observation',
      status: 'building',
      accentVar: '--accent-piano',
      latestMilestone: 'Learning fundamentals',
      overview: 'Training visual observation and hand-eye coordination. Starting from scratch.',
      metrics: [{ label: 'FOCUS', value: 'Fundamentals' }, { label: 'PRACTICE', value: 'Daily' }],
      timeline: [{ date: 'MAR 2026', event: 'Started drawing fundamentals' }],
      hoverStats: [{ label: 'STATUS', value: 'Building' }],
      proofLinks: [],
    },
    {
      id: 'meditation',
      icon: '🧘',
      name: 'MEDITATION',
      subtitle: 'Focus / Recovery',
      status: 'active',
      accentVar: '--accent-cs',
      latestMilestone: '30-day streak',
      overview: 'Daily practice. Used for focus, recovery, and stress regulation. No fluff.',
      metrics: [{ label: 'STREAK', value: '30 days' }, { label: 'SESSION', value: '10 min' }],
      timeline: [{ date: 'FEB 2026', event: '30-day streak' }, { date: 'JAN 2026', event: 'Started daily practice' }],
      hoverStats: [{ label: 'STREAK', value: '30d' }],
      proofLinks: [],
    },
    {
      id: 'nutrition',
      icon: '🥗',
      name: 'NUTRITION',
      subtitle: 'Tracking / Optimization',
      status: 'active',
      accentVar: '--accent-gym',
      latestMilestone: 'Consistent tracking',
      overview: 'Food as fuel. Tracking macros, optimizing for performance and recovery.',
      metrics: [{ label: 'PROTEIN', value: '2g / kg' }, { label: 'TRACKING', value: 'Daily' }],
      timeline: [{ date: 'JAN 2026', event: 'Started macro tracking' }],
      hoverStats: [{ label: 'PROTEIN', value: '2g/kg' }],
      proofLinks: [],
    },
    {
      id: 'swimming',
      icon: '🏊',
      name: 'SWIMMING',
      subtitle: 'Technique / Endurance',
      status: 'building',
      accentVar: '--accent-cs',
      latestMilestone: 'Technique work',
      overview: 'Low-impact cardio and full-body conditioning. Focus on technique before distance.',
      metrics: [{ label: 'FOCUS', value: 'Technique' }, { label: 'FREQ', value: '1× / wk' }],
      timeline: [{ date: 'MAR 2026', event: 'Started technique sessions' }],
      hoverStats: [{ label: 'STATUS', value: 'Building' }],
      proofLinks: [],
    },
    {
      id: 'writing',
      icon: '✍',
      name: 'WRITING',
      subtitle: 'Clarity / Communication',
      status: 'building',
      accentVar: '--accent-piano',
      latestMilestone: 'Daily writing habit',
      overview: 'Writing as a tool for clarity. Not for an audience — for sharpening thought.',
      metrics: [{ label: 'FORMAT', value: 'Daily notes' }, { label: 'FOCUS', value: 'Clarity' }],
      timeline: [{ date: 'FEB 2026', event: 'Started daily writing practice' }],
      hoverStats: [{ label: 'STATUS', value: 'Building' }],
      proofLinks: [],
    },
    {
      id: 'finance',
      icon: '📊',
      name: 'FINANCE',
      subtitle: 'Personal / Investing',
      status: 'active',
      accentVar: '--accent-chess',
      latestMilestone: 'Portfolio structured',
      overview: 'Treating personal finance as a system. Budgeting, investing, long-term thinking.',
      metrics: [{ label: 'SAVINGS', value: 'On track' }, { label: 'INVESTING', value: 'Active' }],
      timeline: [{ date: 'JAN 2026', event: 'Structured investment portfolio' }],
      hoverStats: [{ label: 'STATUS', value: 'Active' }],
      proofLinks: [],
    },
    {
      id: 'climbing',
      icon: '🧗',
      name: 'CLIMBING',
      subtitle: 'Bouldering / Technique',
      status: 'building',
      accentVar: '--accent-gym',
      latestMilestone: 'V3 grade',
      overview: 'Indoor bouldering. Problem-solving combined with physical demand.',
      metrics: [{ label: 'GRADE', value: 'V3' }, { label: 'FREQ', value: '1× / wk' }],
      timeline: [{ date: 'MAR 2026', event: 'First V3 completed' }],
      hoverStats: [{ label: 'GRADE', value: 'V3' }],
      proofLinks: [],
    },
    {
      id: 'guitar',
      icon: '🎸',
      name: 'GUITAR',
      subtitle: 'Fingerstyle / Basics',
      status: 'building',
      accentVar: '--accent-piano',
      latestMilestone: 'Basic chord transitions',
      overview: 'Second instrument after piano. Exploring fingerstyle. Early stage.',
      metrics: [{ label: 'STYLE', value: 'Fingerstyle' }, { label: 'STATUS', value: 'Building' }],
      timeline: [{ date: 'MAR 2026', event: 'Started guitar alongside piano' }],
      hoverStats: [{ label: 'STATUS', value: 'Building' }],
      proofLinks: [],
    },
    {
      id: 'sleep',
      icon: '😴',
      name: 'SLEEP',
      subtitle: 'Optimization / Recovery',
      status: 'active',
      accentVar: '--accent-cs',
      latestMilestone: 'Consistent 7.5h',
      overview: 'Sleep as a performance variable. Tracking and protecting it consistently.',
      metrics: [{ label: 'AVG', value: '7.5h' }, { label: 'BEDTIME', value: 'Fixed' }],
      timeline: [{ date: 'JAN 2026', event: 'Set fixed sleep schedule' }],
      hoverStats: [{ label: 'AVG', value: '7.5h' }],
      proofLinks: [],
    },
    {
      id: 'cold',
      icon: '🧊',
      name: 'COLD',
      subtitle: 'Cold Exposure / Recovery',
      status: 'active',
      accentVar: '--accent-cs',
      latestMilestone: '3 min cold shower',
      overview: 'Daily cold exposure. Showers and occasional ice baths. Mental and physical adaptation.',
      metrics: [{ label: 'DURATION', value: '3 min' }, { label: 'FREQ', value: 'Daily' }],
      timeline: [{ date: 'FEB 2026', event: '3 min consistent cold shower' }, { date: 'JAN 2026', event: 'Started cold exposure protocol' }],
      hoverStats: [{ label: 'DURATION', value: '3 min' }],
      proofLinks: [],
    },
    {
      id: 'cycling',
      icon: '🚴',
      name: 'CYCLING',
      subtitle: 'Endurance / Outdoor',
      status: 'building',
      accentVar: '--accent-gym',
      latestMilestone: '40km ride',
      overview: 'Outdoor cycling for aerobic base and active recovery. Distance building.',
      metrics: [{ label: 'LONGEST', value: '40km' }, { label: 'FREQ', value: 'Weekly' }],
      timeline: [{ date: 'MAR 2026', event: 'First 40km ride' }],
      hoverStats: [{ label: 'DIST', value: '40km' }],
      proofLinks: [],
    },
    {
      id: 'cooking',
      icon: '🍳',
      name: 'COOKING',
      subtitle: 'Skill / Self-sufficiency',
      status: 'active',
      accentVar: '--accent-gym',
      latestMilestone: 'Meal prep system',
      overview: 'Cooking as a daily skill, not a hobby. Fast, consistent, nutritious.',
      metrics: [{ label: 'MEAL PREP', value: 'Weekly' }, { label: 'GOAL', value: 'Self-sufficient' }],
      timeline: [{ date: 'JAN 2026', event: 'Built weekly meal prep system' }],
      hoverStats: [{ label: 'STATUS', value: 'Active' }],
      proofLinks: [],
    },
  ],

  ecosystem: [
    {
      platform: 'INSTAGRAM',
      handle:   'belka0fficial',
      icon:     '◉',
      url:      'https://instagram.com/belka0fficial',
      status:   'active',
    },
    {
      platform: 'X',
      handle:   'belka0fficial',
      icon:     '✕',
      url:      'https://x.com/belka0fficial',
      status:   'active',
    },
    {
      platform: 'TIKTOK',
      handle:   'belka0fficial',
      icon:     '▶',
      url:      'https://tiktok.com/@belka0fficial',
      status:   'active',
    },
    {
      platform: 'FACEBOOK',
      handle:   'belka0fficial',
      icon:     '◆',
      url:      'https://facebook.com/belka0fficial',
      status:   'active',
    },
    {
      platform: 'GITHUB',
      handle:   'belka0fficial',
      icon:     '⌨',
      url:      'https://github.com/belka0fficial',
      status:   'active',
    },
    {
      platform: 'CHESS.COM',
      handle:   'belka0fficial',
      icon:     '♟',
      url:      'https://chess.com/member/belka0fficial',
      status:   'active',
    },
    {
      platform: 'LEETCODE',
      handle:   'belka0fficial',
      icon:     '⚡',
      url:      'https://leetcode.com/belka0fficial',
      status:   'active',
    },
  ],

  projects: [
    {
      id:       'better-io',
      icon:     '⚡',
      name:     'Better.io',
      category: 'CS / APP',
      status:   'active',
      desc:     'Personal productivity system. Task management, habit tracking, and performance dashboards. Built for multi-domain builders who need structured execution.',
      stack:    ['Flutter', 'Dart'],
      url:      null,
    },
    {
      id:       'belka-life',
      icon:     '◈',
      name:     'belka.life',
      category: 'CS / WEB',
      status:   'active',
      desc:     'Central proof hub for multi-domain competence. Tracks progress, milestones, and skills across all domains. Live and public — you\'re looking at it.',
      stack:    ['HTML', 'CSS', 'JavaScript'],
      url:      null,
    },
  ],

  profile: {
    handle:   'BELKA',
    name:     'Alexey Belkin',
    age:      15,
    location: 'Israel',
    status:   'Student · 10th grade',
    bio:      'I train gym and judo every day, study chess and piano with structure, and build software from scratch. Every domain gets real time and real effort — no surface-level dabbling. Everything I do is tracked and proven publicly.',
    physical: [
      { label: 'HEIGHT',   value: '176 cm'    },
      { label: 'WEIGHT',   value: '70–78 kg'  },
      { label: 'GYM',      value: '6× / wk'   },
      { label: 'JUDO',     value: '5–6× / wk' },
    ],
    strength: [
      { label: 'BENCH',      value: '110 × 5' },
      { label: 'DIPS +wt',   value: '+45 × 4' },
      { label: 'PULL-UPS +', value: '+20 × 7' },
      { label: 'SQUAT',      value: '80 × 6'  },
    ],
    goals: [
      'Bench 2× bodyweight',
      'Run 2 km under 7:00',
      'Chess rapid 1500 ELO',
      'Ship Better.io v1',
      'Elite all-around physical performance',
    ],
    stack: ['Flutter', 'Dart', 'HTML', 'CSS', 'JavaScript'],
  },
};

/* ============================================================
   SKILL DATA — single source of truth for all skill pages
   Update this file to change what appears on each skill page.
   ============================================================ */
const SKILL_DATA = {

  chess: {
    id:            'chess',
    icon:          '♟',
    name:          'CHESS',
    subtitle:      'ELO · Rated Play · Pattern Recognition',
    color:         '#c8aa6e',
    status:        'active',
    since:         'OCT 2025',
    externalUrl:   'https://chess.com/member/belka0fficial',
    externalLabel: 'CHESS.COM',

    quickStats: [
      { label: 'RAPID',   value: '1200' },
      { label: 'BLITZ',   value: '1050' },
      { label: 'GAMES',   value: '340+' },
      { label: 'PUZZLES', value: '200+' },
    ],

    description: 'Chess is the clearest test of pure decision-making. No athleticism, no luck — calculation and pattern recognition under time pressure. Started October 2025 with no prior experience beyond casual play. Every game is reviewed after play. No engine shortcuts during games. Current system: Ruy Lopez as White, Sicilian Defence as Black, daily 10-puzzle tactical routine. The 1200 Rapid milestone took 5 months of consistent daily practice. Next target: 1400 Rapid by Q3 2026.',

    metrics: [
      { label: 'RAPID ELO',     value: '1200', note: 'Chess.com' },
      { label: 'BLITZ ELO',     value: '1050', note: 'Chess.com' },
      { label: 'BULLET ELO',    value: '920',  note: 'Chess.com' },
      { label: 'PUZZLE RATING', value: '1320', note: 'highest ever' },
      { label: 'TOTAL GAMES',   value: '340+', note: 'all time' },
      { label: 'WIN RATE',      value: '54%',  note: 'rapid format' },
      { label: 'DAILY PUZZLES', value: '10×',  note: 'no skip streak' },
      { label: 'STUDY TIME',    value: '1h',   note: 'daily average' },
    ],

    ratingHistory: [
      { date: 'OCT 2025', value: 800  },
      { date: 'NOV 2025', value: 890  },
      { date: 'DEC 2025', value: 960  },
      { date: 'JAN 2026', value: 1040 },
      { date: 'FEB 2026', value: 1110 },
      { date: 'MAR 2026', value: 1200 },
    ],

    achievements: [
      { date: '15 MAR 2026', text: 'Rapid ELO crosses 1200 — first major milestone',      type: 'milestone' },
      { date: '01 FEB 2026', text: '5-game win streak vs 1150+ rated opponents',           type: 'achievement' },
      { date: '15 JAN 2026', text: 'Completed Ruy Lopez opening system study',             type: 'update' },
      { date: '01 JAN 2026', text: 'Started daily puzzle routine — 10/day, zero skips',   type: 'update' },
      { date: 'DEC 2025',    text: 'Blitz ELO breaks 1000 for the first time',             type: 'milestone' },
      { date: 'NOV 2025',    text: 'First post-game analysis sessions with Stockfish',     type: 'update' },
      { date: 'OCT 2025',    text: 'First rated game on Chess.com — competitive play begins', type: 'update' },
    ],

    sessions: [
      { date: '25 MAR 2026', type: 'Rapid',   games: 6,  result: '+4 / −2',      duration: '55 min' },
      { date: '22 MAR 2026', type: 'Blitz',   games: 8,  result: '+5 / −3',      duration: '35 min' },
      { date: '20 MAR 2026', type: 'Puzzles', games: 15, result: 'Rating: 1320', duration: '20 min' },
      { date: '18 MAR 2026', type: 'Rapid',   games: 4,  result: '+3 / −1',      duration: '40 min' },
      { date: '16 MAR 2026', type: 'Rapid',   games: 5,  result: '+4 / −1',      duration: '48 min' },
    ],

    timeline: [
      { date: 'MAR 2026', event: 'Rapid 1200 ELO reached — 5 months in' },
      { date: 'JAN 2026', event: 'Daily puzzle routine started (10/day)' },
      { date: 'DEC 2025', event: 'Blitz 1000 milestone' },
      { date: 'NOV 2025', event: 'First game analysis sessions' },
      { date: 'OCT 2025', event: 'First rated game on Chess.com' },
    ],

    socialPosts: [
      { caption: 'Rapid 1200 — 5 months of daily practice.',        date: '16 MAR 2026', url: 'https://instagram.com/belka0fficial', icon: '♟' },
      { caption: 'Daily puzzle routine: 10 puzzles. No skip days.', date: '02 JAN 2026', url: 'https://instagram.com/belka0fficial', icon: '🧩' },
      { caption: 'Starting to understand my own mistake patterns.',  date: '15 NOV 2025', url: 'https://instagram.com/belka0fficial', icon: '📊' },
    ],

    proofLinks: [
      { label: 'Chess.com — belka0fficial', url: 'https://chess.com/member/belka0fficial' },
      { label: 'Instagram — chess updates', url: 'https://instagram.com/belka0fficial' },
    ],

    apiConfig: { type: 'chess', username: 'belka0fficial' },
  },

  gym: {
    id:            'gym',
    icon:          '💪',
    name:          'GYM',
    subtitle:      'Strength · Linear Progression · No Fluff',
    color:         '#c4815c',
    status:        'active',
    since:         'DEC 2025',
    externalUrl:   'https://instagram.com/belka0fficial',
    externalLabel: 'INSTAGRAM',

    quickStats: [
      { label: 'DEADLIFT', value: '180kg' },
      { label: 'SQUAT',    value: '140kg' },
      { label: 'BENCH',    value: '100kg' },
      { label: 'STREAK',   value: '14 wks' },
    ],

    description: 'Strength training treated as a system, not a hobby. Linear progression: add weight every session until you cannot, then adjust. No machines, no isolation fluff — squat, bench, deadlift, overhead press, row. 3 sessions per week, every week, no missed days. The goal is a 200kg deadlift. Belt-free until 200kg is the rule.',

    metrics: [
      { label: 'DEADLIFT',  value: '180kg', note: 'no belt' },
      { label: 'SQUAT',     value: '140kg', note: 'full depth' },
      { label: 'BENCH',     value: '100kg', note: 'competition grip' },
      { label: 'OHP',       value: '72kg',  note: 'strict' },
      { label: 'BODYWEIGHT', value: '82kg', note: 'current' },
      { label: 'FREQUENCY', value: '6×',    note: 'per week' },
      { label: 'SESSIONS',  value: '42',    note: 'since Dec 2025' },
      { label: 'ZERO SKIPS', value: '14',   note: 'weeks' },
    ],

    ratingHistory: [
      { date: 'DEC 2025', value: 120 },
      { date: 'JAN 2026', value: 140 },
      { date: 'FEB 2026', value: 160 },
      { date: 'MAR 2026', value: 180 },
    ],

    achievements: [
      { date: '20 MAR 2026', text: 'Deadlift 180kg — clean pull, no belt',               type: 'milestone' },
      { date: '14 FEB 2026', text: 'Squat 140kg — full depth, video-checked',            type: 'milestone' },
      { date: '01 JAN 2026', text: 'Bench press 100kg — first triple-digit bench',       type: 'milestone' },
      { date: 'JAN 2026',    text: '10 consecutive weeks without a missed session',       type: 'achievement' },
      { date: 'DEC 2025',    text: 'Joined current gym, built the program from scratch', type: 'update' },
    ],

    sessions: [
      { date: '25 MAR 2026', type: 'Strength A', exercises: 'Deadlift 180kg / Barbell Row / Chin-up', duration: '70 min' },
      { date: '23 MAR 2026', type: 'Strength B', exercises: 'Squat 140kg / OHP 72kg / RDL',          duration: '65 min' },
      { date: '21 MAR 2026', type: 'Strength C', exercises: 'Bench 100kg / Row / Dips',              duration: '60 min' },
      { date: '18 MAR 2026', type: 'Strength A', exercises: 'Deadlift / Barbell Row / Chin-up',      duration: '68 min' },
      { date: '16 MAR 2026', type: 'Strength B', exercises: 'Squat / OHP / RDL',                     duration: '63 min' },
    ],

    timeline: [
      { date: 'MAR 2026', event: 'Deadlift 180kg' },
      { date: 'FEB 2026', event: 'Squat 140kg' },
      { date: 'JAN 2026', event: 'Bench 100kg' },
      { date: 'DEC 2025', event: 'Joined gym, started linear progression' },
    ],

    socialPosts: [
      { caption: '180kg deadlift. No belt. Clean pull.',       date: '20 MAR 2026', url: 'https://instagram.com/belka0fficial', icon: '💪' },
      { caption: '14 weeks. No missed sessions.',              date: '01 MAR 2026', url: 'https://instagram.com/belka0fficial', icon: '📅' },
      { caption: 'Bench 100kg. First triple digit bench.',     date: '02 JAN 2026', url: 'https://instagram.com/belka0fficial', icon: '🏋' },
    ],

    proofLinks: [
      { label: 'Instagram — training posts', url: 'https://instagram.com/belka0fficial' },
    ],

    apiConfig: null,
  },

  judo: {
    id:            'judo',
    icon:          '🥋',
    name:          'JUDO',
    subtitle:      'Martial Arts · Competition · Ground Game',
    color:         '#b85a5a',
    status:        'active',
    since:         'NOV 2025',
    externalUrl:   'https://instagram.com/belka0fficial',
    externalLabel: 'INSTAGRAM',

    quickStats: [
      { label: 'BELT',        value: 'White' },
      { label: 'COMPS',       value: '1' },
      { label: 'BEST RESULT', value: '3rd' },
      { label: 'TRAINING',    value: '5–6× / wk' },
    ],

    description: 'Judo is the hardest thing I do. You cannot fake it — either you can throw or you cannot. Started November 2025, first competition February 2026, finished 3rd. Focus on clean technique over brute force: Seoi-nage, Uchi-mata, and a strong Ne-waza ground game. 2 sessions per week, both technical drilling and live randori. Next competition: Q2 2026.',

    metrics: [
      { label: 'BELT',         value: 'White', note: 'current rank' },
      { label: 'COMPETITIONS', value: '1',     note: 'entered' },
      { label: 'BEST RESULT',  value: '3rd',   note: 'regional' },
      { label: 'WINS',         value: '2',     note: 'competition' },
      { label: 'LOSSES',       value: '1',     note: 'competition' },
      { label: 'TRAINING',     value: '5–6×',  note: 'per week' },
      { label: 'MAT HOURS',    value: '40+',   note: 'total' },
      { label: 'SINCE',        value: 'NOV 25', note: 'started' },
    ],

    ratingHistory: null,

    achievements: [
      { date: 'FEB 2026', text: '3rd place at first regional competition (white belt category)', type: 'milestone' },
      { date: 'JAN 2026', text: 'Registered for first competition — started competition prep phase', type: 'update' },
      { date: 'DEC 2025', text: 'First live randori sessions — survived and learned', type: 'achievement' },
      { date: 'NOV 2025', text: 'First day on the mat. Started judo training.', type: 'update' },
    ],

    sessions: [
      { date: '25 MAR 2026', type: 'Technical', exercises: 'Seoi-nage uchi-komi + grip fighting', duration: '90 min' },
      { date: '23 MAR 2026', type: 'Randori',   exercises: 'Live sparring — 6 rounds (5 min each)', duration: '90 min' },
      { date: '20 MAR 2026', type: 'Technical', exercises: 'Ne-waza ground work + pins',          duration: '80 min' },
      { date: '18 MAR 2026', type: 'Randori',   exercises: 'Live sparring — 5 rounds',            duration: '85 min' },
      { date: '16 MAR 2026', type: 'Technical', exercises: 'Uchi-mata entry drills',              duration: '80 min' },
    ],

    timeline: [
      { date: 'FEB 2026', event: 'First competition — 3rd place regional' },
      { date: 'JAN 2026', event: 'Competition prep phase started' },
      { date: 'DEC 2025', event: 'First randori (live sparring)' },
      { date: 'NOV 2025', event: 'Started judo training' },
    ],

    socialPosts: [
      { caption: '3rd place. First competition. White belt.',   date: '28 FEB 2026', url: 'https://instagram.com/belka0fficial', icon: '🥋' },
      { caption: 'First randori. Got thrown a lot. Learned a lot.', date: '10 DEC 2025', url: 'https://instagram.com/belka0fficial', icon: '⚡' },
    ],

    proofLinks: [
      { label: 'Instagram — judo posts', url: 'https://instagram.com/belka0fficial' },
    ],

    apiConfig: null,
  },

  piano: {
    id:            'piano',
    icon:          '🎹',
    name:          'PIANO',
    subtitle:      'Classical · Self-Taught · No Prior Experience',
    color:         '#9b87c4',
    status:        'active',
    since:         'JUL 2025',
    externalUrl:   'https://instagram.com/belka0fficial',
    externalLabel: 'INSTAGRAM',

    quickStats: [
      { label: 'PIECES',   value: '3' },
      { label: 'PRACTICE', value: '30 min' },
      { label: 'STREAK',   value: '8 months' },
      { label: 'CURRENT',  value: 'Moonlight' },
    ],

    description: 'Piano started July 2025 with zero prior music experience. Self-taught — no teacher, no shortcuts. Every piece learned by breaking it down bar by bar, hands separately, then hands together, then up to tempo. 30 minutes every day without exception. Current repertoire: Gymnopédie No. 1, Für Elise (performance-ready), Moonlight Sonata Mvt. 1 (just reached full tempo). Next: Clair de Lune.',

    metrics: [
      { label: 'PIECES COMPLETE', value: '3',       note: 'performance ready' },
      { label: 'IN PROGRESS',     value: '1',       note: 'Moonlight Snt.' },
      { label: 'DAILY PRACTICE',  value: '30 min',  note: 'minimum' },
      { label: 'TOTAL MONTHS',    value: '8',       note: 'since Jul 2025' },
      { label: 'METHOD',          value: 'Self',    note: 'no teacher' },
      { label: 'TEMPO ACCURACY',  value: '100%',    note: 'Moonlight Mvt1' },
      { label: 'ZERO SKIP DAYS',  value: '8 months', note: 'streak' },
      { label: 'NEXT PIECE',      value: 'Clair de Lune', note: 'target' },
    ],

    ratingHistory: null,

    achievements: [
      { date: 'MAR 2026', text: 'Moonlight Sonata Mvt. 1 — first clean run at full tempo', type: 'milestone' },
      { date: 'JAN 2026', text: 'Für Elise — performance-ready, clean consistent playback', type: 'milestone' },
      { date: 'OCT 2025', text: 'First complete piece: Gymnopédie No. 1 by Satie', type: 'milestone' },
      { date: 'SEP 2025', text: 'Both hands together for first time on a piece', type: 'achievement' },
      { date: 'JUL 2025', text: 'Started piano. Zero prior music knowledge.', type: 'update' },
    ],

    sessions: [
      { date: '26 MAR 2026', type: 'Practice', exercises: 'Moonlight Sonata — transitions + dynamics', duration: '35 min' },
      { date: '25 MAR 2026', type: 'Practice', exercises: 'Scales + Für Elise maintenance run',        duration: '30 min' },
      { date: '24 MAR 2026', type: 'Practice', exercises: 'New piece sight-reading (Clair de Lune)',   duration: '30 min' },
      { date: '23 MAR 2026', type: 'Practice', exercises: 'Moonlight — left hand voicing drill',       duration: '35 min' },
      { date: '22 MAR 2026', type: 'Practice', exercises: 'Full run-through: all 3 pieces',            duration: '40 min' },
    ],

    timeline: [
      { date: 'MAR 2026', event: 'Moonlight Sonata Mvt. 1 at full tempo' },
      { date: 'JAN 2026', event: 'Für Elise — performance ready' },
      { date: 'OCT 2025', event: 'Gymnopédie No. 1 complete' },
      { date: 'JUL 2025', event: 'Started piano, zero experience' },
    ],

    socialPosts: [
      { caption: 'Moonlight Sonata at full tempo — 8 months in.',      date: '05 MAR 2026', url: 'https://instagram.com/belka0fficial', icon: '🎹' },
      { caption: 'Für Elise — clean. Every note. First full run.',     date: '28 JAN 2026', url: 'https://instagram.com/belka0fficial', icon: '🎵' },
      { caption: 'Gymnopédie No. 1 — first completed piece.',          date: '01 OCT 2025', url: 'https://instagram.com/belka0fficial', icon: '🎼' },
    ],

    proofLinks: [
      { label: 'Instagram — piano recordings', url: 'https://instagram.com/belka0fficial' },
    ],

    apiConfig: null,
  },

  cs: {
    id:            'cs',
    icon:          '⌨',
    name:          'CS / CODING',
    subtitle:      'Software · Algorithms · Shipped Projects',
    color:         '#7a9ebd',
    status:        'active',
    since:         'JAN 2026',
    externalUrl:   'https://github.com/belka0fficial',
    externalLabel: 'GITHUB',

    quickStats: [
      { label: 'LEETCODE',  value: '50+' },
      { label: 'PROJECTS',  value: '3' },
      { label: 'LANGUAGES', value: 'JS · PY' },
      { label: 'STREAK',    value: '87 days' },
    ],

    description: 'Software development approached the same way as everything else: deliberate practice, measurable output, no shortcuts. LeetCode daily (1 problem minimum, no skips). Projects shipped and public. Current focus: algorithms and data structures, frontend systems, and building things that actually work. No tutorial hell — everything is built from scratch.',

    metrics: [
      { label: 'LEETCODE SOLVED', value: '50+',   note: 'all difficulty' },
      { label: 'EASY SOLVED',     value: '22',    note: 'LeetCode' },
      { label: 'MEDIUM SOLVED',   value: '26',    note: 'LeetCode' },
      { label: 'HARD SOLVED',     value: '4',     note: 'LeetCode' },
      { label: 'PROJECTS SHIPPED', value: '3',    note: 'public' },
      { label: 'LANGUAGES',       value: 'JS/PY', note: 'primary' },
      { label: 'DAILY STREAK',    value: '87d',   note: 'no skip' },
      { label: 'GITHUB REPOS',    value: 'live',  note: 'check GitHub' },
    ],

    ratingHistory: [
      { date: 'JAN 2026', value: 0  },
      { date: 'FEB 2026', value: 20 },
      { date: 'MAR 2026', value: 50 },
    ],

    achievements: [
      { date: 'MAR 2026', text: 'LeetCode 50 problems solved — arrays, hashmaps, sliding window, DP', type: 'milestone' },
      { date: 'FEB 2026', text: 'belka.life launched — first fully shipped project', type: 'milestone' },
      { date: 'FEB 2026', text: 'First hard LeetCode problem solved (Trapping Rain Water)', type: 'achievement' },
      { date: 'JAN 2026', text: 'Started LeetCode daily — 1 minimum per day, no skip days', type: 'update' },
    ],

    sessions: [
      { date: '26 MAR 2026', type: 'LeetCode', exercises: '3 medium — dynamic programming (Coin Change, House Robber)', duration: '90 min' },
      { date: '25 MAR 2026', type: 'Project',  exercises: 'belka.life — full-screen skill page system',                 duration: '120 min' },
      { date: '24 MAR 2026', type: 'LeetCode', exercises: '2 problems — graph traversal (BFS clone graph)',             duration: '60 min' },
      { date: '23 MAR 2026', type: 'LeetCode', exercises: '3 problems — binary search',                                 duration: '75 min' },
      { date: '22 MAR 2026', type: 'Project',  exercises: 'belka.life — modal enrichment with live APIs',               duration: '100 min' },
    ],

    timeline: [
      { date: 'MAR 2026', event: 'LeetCode 50 solved' },
      { date: 'FEB 2026', event: 'belka.life launched' },
      { date: 'FEB 2026', event: 'First hard problem solved' },
      { date: 'JAN 2026', event: 'LeetCode daily started' },
    ],

    socialPosts: [
      { caption: '50 LeetCode problems. All self-taught.',              date: '10 MAR 2026', url: 'https://instagram.com/belka0fficial', icon: '⌨' },
      { caption: 'belka.life is live. Built in vanilla JS.',           date: '20 FEB 2026', url: 'https://instagram.com/belka0fficial', icon: '🌐' },
      { caption: 'First hard problem. Took 2 hours. Worth it.',        date: '08 FEB 2026', url: 'https://instagram.com/belka0fficial', icon: '💡' },
    ],

    proofLinks: [
      { label: 'GitHub — belka0fficial',   url: 'https://github.com/belka0fficial' },
      { label: 'LeetCode — belka0fficial', url: 'https://leetcode.com/belka0fficial' },
    ],

    apiConfig: { type: 'github', username: 'belka0fficial' },
  },

};
