import { useState } from 'react';
import './PosterReveal.css';

// Lưới ô dùng để "giải mã" từ nửa hình học sang nửa ảnh thật của poster
const COLS = 6;
const ROWS = 4;
const PEEK = 3; // số ô hé lộ khi rê chuột vào — gợi ý là bấm được

// PRNG có seed: thứ tự lật ô trông ngẫu nhiên nhưng lần nào tải trang cũng y hệt
const mulberry32 = (seed) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

// RANK[ô] = bước mà ô đó được lật
const RANK = (() => {
  const rand = mulberry32(2026);
  const order = Array.from({ length: COLS * ROWS }, (_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  const rank = [];
  order.forEach((tile, step) => {
    rank[tile] = step;
  });
  return rank;
})();

const PosterReveal = ({ abstractSrc, photoSrc, name, width, height }) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <figure className="poster">
      <div className="poster__stage">
        <span className="poster__mark poster__mark--tl" aria-hidden="true" />
        <span className="poster__mark poster__mark--tr" aria-hidden="true" />
        <span className="poster__mark poster__mark--bl" aria-hidden="true" />
        <span className="poster__mark poster__mark--br" aria-hidden="true" />

        <button
          type="button"
          className={`poster__frame ${revealed ? 'is-revealed' : ''}`}
          aria-pressed={revealed}
          aria-label={`Reveal the photo behind the geometric portrait of ${name}`}
          onClick={() => setRevealed((r) => !r)}
          style={{ '--photo': `url(${photoSrc})`, '--cols': COLS, '--rows': ROWS, aspectRatio: `${width} / ${height}` }}
        >
          <img src={abstractSrc} alt="" className="poster__base" width={width} height={height} fetchPriority="high" />

          <span className="poster__tiles" aria-hidden="true">
            {RANK.map((rank, i) => (
              <span
                key={i}
                className={`poster__tile ${rank < PEEK ? 'is-peek' : ''}`}
                style={{ '--x': i % COLS, '--y': Math.floor(i / COLS), '--d': rank }}
              />
            ))}
          </span>

          <span className="poster__grid" aria-hidden="true" />
          <span className="poster__hint label" aria-hidden="true">
            <span className="poster__hint-icon">↻</span>
            {revealed ? 'Tap to re-encode' : 'Tap to decode'}
          </span>
        </button>
      </div>

      <figcaption className="fig-caption">
        <span className="label knockout">FIG. 01 — Portrait</span>
        <span className="label knockout poster__state">
          <span className={revealed ? '' : 'is-on'}>Abstract</span>
          <span aria-hidden="true"> ⟷ </span>
          <span className={revealed ? 'is-on' : ''}>Photo</span>
        </span>
      </figcaption>
    </figure>
  );
};

export default PosterReveal;
