export const attributesEnglish = [
  { attribute: 'Humor', score: 88 },
  { attribute: 'Storytelling', score: 82 },
  { attribute: 'Call-to-Action', score: 79 },
  { attribute: 'Product Focus', score: 75 },
];

export const attributesTalent = [
  { attribute: 'Voice Clarity', score: 86 },
  { attribute: 'On-screen Presence', score: 81 },
  { attribute: 'Trustworthiness', score: 78 },
  { attribute: 'Energy', score: 74 },
];

export const performers = {
  players: [
    { name: 'Players', detail: 'Dynamic intros, clear CTA', delta: '+26%', type: 'success' },
    { name: 'Players (Short)', detail: '15s variants', delta: '+18%', type: 'success' },
  ],
  nonPlayers: [
    { name: 'Non-Players', detail: 'Long intros, no CTA', delta: '-12%', type: 'danger' },
    { name: 'Non-Players (Muted)', detail: 'No captions', delta: '-9%', type: 'danger' },
  ],
};

export const assets = [
  { id: 'a1', name: 'summer-campaign-15s.mp4', type: 'video', size: '12.4MB', duration: '00:15', resolution: '1080x1920', tags: ['short','vertical'], compatibility: { tiktok: 'ok', meta: 'ok', youtube: 'warn' } },
  { id: 'a2', name: 'hero-banner.jpg', type: 'image', size: '2.1MB', duration: '-', resolution: '1920x1080', tags: ['banner','hero'], compatibility: { tiktok: 'fail', meta: 'ok', youtube: 'ok' } },
  { id: 'a3', name: 'brand_story_30s.mp4', type: 'video', size: '28.7MB', duration: '00:30', resolution: '1920x1080', tags: ['story','horizontal'], compatibility: { tiktok: 'warn', meta: 'ok', youtube: 'ok' } },
];
