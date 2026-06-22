import React, { useRef, useEffect } from 'react';

const InteractiveBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        // ===== CẤU HÌNH VỆT "GẠCH" THEO CHUỘT =====
        const dashSpacing = 1;   // khoảng cách (px) giữa 2 gạch liên tiếp dọc theo đường đi
        // số NHỎ -> gạch dày khít, số LỚN -> gạch thưa, rời rạc
        const dashLength = 10;   // độ dài mỗi gạch (chiều của nét "dọc")
        const dashBaseWidth = 6; // độ dày tối đa của 1 gạch (lúc mới sinh ra, còn tươi)
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Thiết lập kích thước canvas bằng kích thước cửa sổ
        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener('resize', handleResize);

        // Lưu tọa độ chuột và vệt đuôi chuột (trail)
        const mouse = { x: -1000, y: -1000 };
        const trail = [];
        const maxTrailLife = 25; // Tuổi thọ của vệt chuột (quyết định độ dài đuôi)

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            // Thêm điểm mới vào mảng trail mỗi khi chuột di chuyển
            trail.push({ x: mouse.x, y: mouse.y, life: maxTrailLife });
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Cấu hình mảng lưới chấm cam
        const dotSpacing = 70; // Khoảng cách giữa các chấm
        const dotRadius = 2.5; // Kích thước chấm
        const pushRadius = 120; // Bán kính vùng bị ảnh hưởng bởi chuột (hiệu ứng lún thảm)

        const render = () => {
            // Xóa canvas mỗi frame
            ctx.clearRect(0, 0, width, height);

            // 1. Vẽ lưới chấm cam
            for (let x = dotSpacing / 2; x < width; x += dotSpacing) {
                for (let y = dotSpacing / 2; y < height; y += dotSpacing) {
                    let currentX = x;
                    let currentY = y;
                    let currentRadius = dotRadius;

                    const dx = x - mouse.x;
                    const dy = y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    // Nếu chấm nằm trong vùng ảnh hưởng của chuột -> Tạo hiệu ứng lún thảm
                    if (dist < pushRadius) {
                        // Tính lực kéo (càng gần tâm càng mạnh)
                        const force = Math.pow((pushRadius - dist) / pushRadius, 1.5);

                        // Kéo chấm về phía tâm chuột một chút tạo cảm giác lún sâu (3D)
                        const pullStrength = 10;
                        currentX -= (dx / dist) * force * pullStrength;
                        currentY -= (dy / dist) * force * pullStrength;

                        // Chấm lún xuống sẽ nhỏ đi một chút và sáng đậm màu cam lên
                        currentRadius = dotRadius * (1 - force * 0.5);
                        ctx.fillStyle = `rgba(255, 89, 0, ${0.15 + force * 0.85})`;
                    } else {
                        // Mặc định các chấm màu cam nhạt
                        ctx.fillStyle = 'rgba(255, 89, 0, 0.15)';
                    }

                    ctx.beginPath();
                    ctx.arc(currentX, currentY, currentRadius, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // 2. Vẽ dải màu cam chạy theo chuột
            // Giảm tuổi thọ của các điểm trong trail và lọc bỏ điểm đã chết
            for (let i = 0; i < trail.length; i++) {
                trail[i].life -= 1;
            }
            while (trail.length > 0 && trail[0].life <= 0) {
                trail.shift();
            }


            if (trail.length > 1) {
                ctx.lineCap = 'butt'; // QUAN TRỌNG: bỏ 'round' để đầu gạch vuông vức, sắc nét

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
                        ctx.lineWidth = 1.5 + opacity * dashBaseWidth;
                        ctx.strokeStyle = `rgba(255, 89, 0, ${opacity * 0.8})`;
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        // Cleanup khi component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: -1, // Đẩy canvas xuống dưới cùng, không đè lên content
                pointerEvents: 'none', // Xuyên qua canvas để không chắn click chuột vào các link
            }}
        />
    );
};

export default InteractiveBackground;