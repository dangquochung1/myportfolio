import { Block, Sparkle, HalfDisc, Crosshair, Globe } from './Glyphs';

// Mỗi nhóm kỹ năng / vai trò có một ký hiệu riêng, dùng lại ở Skills và Roles
export const CATEGORY_GLYPHS = {
  backend: { Glyph: Block, color: 'var(--blue)', name: 'Backend & Systems' },
  ai: { Glyph: Sparkle, color: 'var(--orange)', name: 'AI & Tools' },
  frontend: { Glyph: HalfDisc, color: 'var(--blue)', name: 'Frontend & Mobile' },
  qa: { Glyph: Crosshair, color: 'var(--red)', name: 'QA, Testing & Ops' },
  languages: { Glyph: Globe, color: 'var(--ink)', name: 'Languages' },
};
