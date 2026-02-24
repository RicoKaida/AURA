import { useEffect, useRef } from 'react';

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // --- НАСТРОЙКИ (CONFIGURATION) ---
    
    // Количество частиц (чем больше, тем плотнее сеть)
    // particleCount
    const particleCount = 80; 
    
    // Скорость движения частиц (чем меньше, тем медленнее и плавнее)
    // velocity
    const velocity = 0.2; 
    
    // Степень размытия/дымки (свечение точек)
    // blurAmount
    const blurAmount = 15; 
    
    // Дистанция соединения линий
    const connectionDistance = 150;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      alphaSpeed: number;
    }

    const particles: Particle[] = [];

    // Инициализация частиц
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * velocity,
        vy: (Math.random() - 0.5) * velocity,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.1,
        alphaSpeed: (Math.random() - 0.5) * 0.005,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Легкий белый градиентный налет для воздушности
      // Рисуем фон прямо на канвасе, чтобы он был под сеткой
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#f8fafc'); // slate-50
      gradient.addColorStop(1, '#f1f5f9'); // slate-100
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p, index) => {
        // Движение
        p.x += p.vx;
        p.y += p.vy;

        // Отскок от границ
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Пульсация прозрачности
        p.alpha += p.alphaSpeed;
        if (p.alpha <= 0.05 || p.alpha >= 0.3) p.alphaSpeed *= -1;

        // Отрисовка точки с эффектом дымки (Mist Effect)
        ctx.beginPath();
        // Радиальный градиент для эффекта тумана
        const radialGradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        radialGradient.addColorStop(0, `rgba(168, 85, 247, ${p.alpha})`); // #A855F7 (violet-500)
        radialGradient.addColorStop(1, 'rgba(168, 85, 247, 0)');
        
        ctx.fillStyle = radialGradient;
        // Свечение (Glow)
        ctx.shadowBlur = blurAmount;
        ctx.shadowColor = '#A855F7';
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // Сброс эффекта для линий

        // Соединение линий
        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            // Экстремально низкая прозрачность для линий (0.05 - 0.15)
            const opacity = Math.max(0, (1 - distance / connectionDistance) * 0.15);
            ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]"
    />
  );
}
