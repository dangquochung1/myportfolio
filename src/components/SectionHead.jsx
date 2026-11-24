// Header section kiểu Swiss: "02 —────── META" rồi tới tiêu đề lớn
const SectionHead = ({ index, title, meta, glyph, children, className = '' }) => (
  <header className={`section-head ${className}`.trim()}>
    <div className="section-head__bar">
      <span className="label knockout section-head__index">{index} —</span>
      <span className="section-head__rule" aria-hidden="true" />
      {meta && <span className="label knockout section-head__meta">{meta}</span>}
    </div>
    <div className="section-head__main">
      <h2 className="section-title">{title}</h2>
      {glyph && <span className="section-head__glyph" aria-hidden="true">{glyph}</span>}
    </div>
    {children && <div className="section-head__lead">{children}</div>}
  </header>
);

export default SectionHead;
