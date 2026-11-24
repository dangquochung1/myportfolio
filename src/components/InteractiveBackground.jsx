import { useRef, useEffect } from 'react';

/*
 * Nền "giấy kỹ thuật":
 *  - lớp vân giấy + lưới 12 cột là CSS tĩnh (.paper-grain, .paper-grid trong index.css)
 *  - canvas vẽ lưới dấu "+" (dấu đăng ký của bản in) phản ứng theo chuột,
 *    và vệt "gạch" chạy theo chuột như bản cũ.
 */
const InteractiveBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        // ===== CẤU HÌNH VỆT "GẠCH" THEO CHUỘT =====
        const dashSpacing = 1;   // khoảng cách (px) giữa 2 gạch liên tiếp dọc theo đường đi
        // số NHỎ -> gạch dày khít, số LỚN -> gạch thưa, rời rạc
        const dashLength = 10;   // độ dài mỗi gạch (chiều của nét "dọc")
        const dashBaseWidth = 4; // độ dày tối đa của 1 gạch (lúc mới sinh ra, còn tươi)
        const maxTrailLife = 25; // Tuổi thọ của vệt chuột (quyết định độ dài đuôi)

        // ===== CẤU HÌNH LƯỚI DẤU "+" =====
        const markSpacing = 72;  // khoảng cách giữa các dấu +
        const markArm = 3.5;     // nửa chiều dài mỗi nhánh của dấu +
        const pushRadius = 140;  // bán kính vùng bị chuột ảnh hưởng (hiệu ứng lún thảm)
        const pullStrength = 10; // chuột kéo dấu + về phía nó bao nhiêu px

        // Màu lấy từ poster
        const INK = '26, 26, 25';
        const RED = '216, 65, 42';
        const BLUE = '15, 98, 160';

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        let animationFrameId;
        let width = 0;
        let height = 0;
        let dpr = 1;
        let dirty = true; // chỉ vẽ lại khi có gì đó thay đổi

        // Canvas theo devicePixelRatio để nét 1px không bị mờ trên màn retina
        const handleResize = () => {
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            dirty = true;
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        // Lưu tọa độ chuột và vệt đuôi chuột (trail)
        const mouse = { x: -1000, y: -1000 };
        const trail = [];

        const handleMouseMove = (e) => {
            if (reduceMotion.matches) return;
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            // Thêm điểm mới vào mảng trail mỗi khi chuột di chuyển
            trail.push({ x: mouse.x, y: mouse.y, life: maxTrailLife });
            dirty = true;
        };
        // Chuột rời cửa sổ -> các dấu + trở về chỗ cũ
        const handleMouseOut = (e) => {
            if (e.relatedTarget) return;
            mouse.x = -1000;
            mouse.y = -1000;
            dirty = true;
        };
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseOut);

        const drawMarks = () => {
            const crisp = dpr === 1 ? 0.5 : 0; // căn nét 1px vào giữa điểm ảnh
            ctx.lineWidth = 1;
            ctx.lineCap = 'butt';

            for (let col = 0, x = markSpacing / 2; x < width; col++, x += markSpacing) {
                for (let row = 0, y = markSpacing / 2; y < height; row++, y += markSpacing) {
                    const dx = x - mouse.x;
                    const dy = y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    let px = x;
                    let py = y;
                    let arm = markArm;
                    let angle = 0;

                    if (dist < pushRadius && dist > 0) {
                        // Càng gần tâm càng mạnh
                        const force = Math.pow((pushRadius - dist) / pushRadius, 1.5);
                        // Kéo dấu + về phía chuột tạo cảm giác lún sâu
                        px -= (dx / dist) * force * pullStrength;
                        py -= (dy / dist) * force * pullStrength;
                        // Dấu + xoay dần thành dấu × và to lên, đổi sang đỏ / xanh xen kẽ
                        angle = force * (Math.PI / 4);
                        arm = markArm * (1 + force * 0.9);
                        const tint = (col + row) % 2 ? BLUE : RED;
                        ctx.strokeStyle = `rgba(${tint}, ${0.25 + force * 0.75})`;
                    } else {
                        // Mặc định: dấu + màu mực rất nhạt
                        ctx.strokeStyle = `rgba(${INK}, 0.2)`;
                    }

                    const cos = Math.cos(angle) * arm;
                    const sin = Math.sin(angle) * arm;
                    const cx = Math.round(px) + crisp;
                    const cy = Math.round(py) + crisp;
                    ctx.beginPath();
                    ctx.moveTo(cx - cos, cy - sin);
                    ctx.lineTo(cx + cos, cy + sin);
                    ctx.moveTo(cx + sin, cy - cos);
                    ctx.lineTo(cx - sin, cy + cos);
                    ctx.stroke();
                }
            }
        };

        const drawTrail = () => {
            // Giảm tuổi thọ của các điểm trong trail và lọc bỏ điểm đã chết
            for (let i = 0; i < trail.length; i++) {
                trail[i].life -= 1;
            }
            while (trail.length > 0 && trail[0].life <= 0) {
                trail.shift();
            }
            if (trail.length < 2) return;

            ctx.lineCap = 'butt'; // đầu gạch vuông vức, sắc nét

            for (let i = 0; i < trail.length - 1; i++) {
                const p1 = trail[i];
                const p2 = trail[i + 1];

                const segDx = p2.x - p1.x;
                const segDy = p2.y - p1.y;
                const segLength = Math.sqrt(segDx * segDx + segDy * segDy);
                if (segLength === 0) continue;

                // Vector vuông góc với hướng di chuyển -> dùng để vẽ "gạch dọc" cắt ngang path
                const nx = -segDy / segLength;
                const ny = segDx / segLength;

                // Số gạch cần rải trên đoạn này, dựa theo dashSpacing
                const dashCount = Math.max(1, Math.floor(segLength / dashSpacing));

                for (let d = 0; d <= dashCount; d++) {
                    const t = d / dashCount;
                    const px = p1.x + segDx * t;
                    const py = p1.y + segDy * t;

                    const life = p1.life + (p2.life - p1.life) * t;
                    const opacity = life / maxTrailLife;
                    const halfLen = (dashLength * opacity) / 2;

                    ctx.beginPath();
                    ctx.moveTo(px - nx * halfLen, py - ny * halfLen);
                    ctx.lineTo(px + nx * halfLen, py + ny * halfLen);
                    ctx.lineWidth = 1 + opacity * dashBaseWidth;
                    ctx.strokeStyle = `rgba(${RED}, ${opacity * 0.75})`;
                    ctx.stroke();
                }
            }
        };

        const render = () => {
            // Đứng yên thì không vẽ lại -> không tốn CPU
            if (dirty || trail.length > 0) {
                ctx.clearRect(0, 0, width, height);
                drawMarks();
                drawTrail();
                dirty = trail.length > 0;
            }
            animationFrameId = requestAnimationFrame(render);
        };

        render();

        // Cleanup khi component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseOut);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <>
            <div className="paper-grain" aria-hidden="true" />
            <div className="paper-grid" aria-hidden="true" />
            <canvas
                ref={canvasRef}
                aria-hidden="true"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    zIndex: -1, // Đẩy canvas xuống dưới cùng, không đè lên content
                    pointerEvents: 'none', // Xuyên qua canvas để không chắn click chuột vào các link
                }}
            />
        </>
    );
};

export default InteractiveBackground;
