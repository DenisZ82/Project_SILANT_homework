import React, { useState, useEffect } from 'react';

// Хук DeviceDetect определяет типа устройства
function DeviceDetect() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    // Отслеживаем изменение размера экрана здесь, моментально реагируя на любые его изменения
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    // Непременно удаляем обработчик, чтобы предотвратить утечку памяти
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { isMobile };
};

export default DeviceDetect;