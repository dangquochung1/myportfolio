/*
 * Hệ ký hiệu hình học — mỗi hình đều lấy từ poster "Geometric Portrait":
 * sparkle ✦, quả địa cầu khung dây, bậc pixel, 3 chấm dọc, khối chữ U (half-disc),
 * góc tròn (quarter-disc), ô cờ, dấu đăng ký +, khối vuông. Thêm con mèo hình học
 * (thay 3 doodle mèo cũ) cho chất "cat person".
 * Tất cả đều là trang trí: aria-hidden, nét mảnh không phụ thuộc kích thước.
 */

const svgProps = ({ size, className, style }) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  className: ['glyph', className].filter(Boolean).join(' '),
  style,
  'aria-hidden': true,
  focusable: 'false',
});

const Line = (props) => <path fill="none" vectorEffect="non-scaling-stroke" strokeLinecap="square" {...props} />;

export const Sparkle = ({ size = 16, color = 'currentColor', ...rest }) => (
  <svg {...svgProps({ size, ...rest })}>
    <path d="M12 0 Q13.2 10.8 24 12 Q13.2 13.2 12 24 Q10.8 13.2 0 12 Q10.8 10.8 12 0 Z" fill={color} />
  </svg>
);

export const Globe = ({ size = 32, color = 'currentColor', stroke = 1, ...rest }) => (
  <svg {...svgProps({ size, ...rest })}>
    <g stroke={color} strokeWidth={stroke}>
      <circle cx="12" cy="12" r="10.5" fill="none" vectorEffect="non-scaling-stroke" />
      <ellipse cx="12" cy="12" rx="4.4" ry="10.5" fill="none" vectorEffect="non-scaling-stroke" />
      <ellipse cx="12" cy="12" rx="8.4" ry="10.5" fill="none" vectorEffect="non-scaling-stroke" />
      <Line d="M12 1.5 V22.5 M1.5 12 H22.5 M3.06 6.5 H20.94 M3.06 17.5 H20.94" />
    </g>
  </svg>
);

export const PixelStairs = ({ size = 24, color = 'currentColor', ...rest }) => (
  <svg {...svgProps({ size, ...rest })} shapeRendering="crispEdges">
    <g fill={color}>
      <rect x="0" y="0" width="6" height="6" />
      <rect x="6" y="0" width="6" height="6" />
      <rect x="6" y="6" width="6" height="6" />
      <rect x="12" y="6" width="6" height="6" />
      <rect x="0" y="12" width="6" height="6" />
      <rect x="12" y="12" width="6" height="6" />
      <rect x="18" y="12" width="6" height="6" />
      <rect x="0" y="18" width="6" height="6" />
      <rect x="18" y="18" width="6" height="6" />
    </g>
  </svg>
);

export const Dots = ({ size = 24, color = 'currentColor', ...rest }) => (
  <svg {...svgProps({ size, ...rest })}>
    <g fill={color}>
      <circle cx="12" cy="3.5" r="2.4" />
      <circle cx="12" cy="12" r="2.4" />
      <circle cx="12" cy="20.5" r="2.4" />
    </g>
  </svg>
);

/* Khối chữ U của poster: nửa đĩa tròn, xoay bằng prop rotate */
export const HalfDisc = ({ size = 24, color = 'currentColor', rotate = 0, ...rest }) => (
  <svg {...svgProps({ size, ...rest })}>
    <path d="M0 6 H24 V8 A12 12 0 0 1 0 8 Z" fill={color} transform={`rotate(${rotate} 12 12)`} />
  </svg>
);

export const QuarterDisc = ({ size = 24, color = 'currentColor', rotate = 0, ...rest }) => (
  <svg {...svgProps({ size, ...rest })}>
    <path d="M0 0 H24 A24 24 0 0 1 0 24 Z" fill={color} transform={`rotate(${rotate} 12 12)`} />
  </svg>
);

export const Block = ({ size = 24, color = 'currentColor', ...rest }) => (
  <svg {...svgProps({ size, ...rest })} shapeRendering="crispEdges">
    <rect x="2" y="2" width="20" height="20" fill={color} />
  </svg>
);

export const Checker = ({ size = 24, color = 'currentColor', ...rest }) => (
  <svg {...svgProps({ size, ...rest })} shapeRendering="crispEdges">
    <g fill={color}>
      <rect x="0" y="0" width="12" height="12" />
      <rect x="12" y="12" width="12" height="12" />
    </g>
  </svg>
);

/* Dấu đăng ký (registration mark) — dấu + của bản in kỹ thuật */
export const Crosshair = ({ size = 24, color = 'currentColor', stroke = 1.5, ...rest }) => (
  <svg {...svgProps({ size, ...rest })}>
    <g stroke={color} strokeWidth={stroke}>
      <circle cx="12" cy="12" r="6" fill="none" vectorEffect="non-scaling-stroke" />
      <Line d="M12 0 V24 M0 12 H24" />
    </g>
  </svg>
);

/* Con mèo hình học: đầu tròn + 2 tai tam giác, mắt là khoảng âm */
export const CatGlyph = ({ size = 24, color = 'currentColor', eye = 'var(--paper)', ...rest }) => (
  <svg {...svgProps({ size, ...rest })}>
    <g fill={color}>
      <path d="M3.2 10.2 L4.4 1.6 L10.4 6.6 Z" />
      <path d="M20.8 10.2 L19.6 1.6 L13.6 6.6 Z" />
      <circle cx="12" cy="14" r="9" />
    </g>
    <g fill={eye}>
      <circle cx="8.6" cy="13.4" r="1.35" />
      <circle cx="15.4" cy="13.4" r="1.35" />
      <path d="M10.9 16.9 H13.1 L12 18.1 Z" />
    </g>
  </svg>
);
