import React, { useState, useEffect } from 'react';

// Хук DeviceDetect определяет типа устройства
function DeviceDetect() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMobile375, setIsMobile375] = useState(window.innerWidth <= 375);
  const [fontSizeTable, setFontSizeTable] = useState('20px');

  useEffect(() => {
    // Отслеживаем изменение размера экрана здесь, моментально реагируя на любые его изменения
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768 && window.innerWidth > 375);
      setIsMobile375(window.innerWidth <= 375);
    }
    window.addEventListener('resize', handleResize);
    // Непременно удаляем обработчик, чтобы предотвратить утечку памяти
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setFontSizeTable('17px');
    } else if (isMobile375) {
      setFontSizeTable('14px');
    } else {
      setFontSizeTable('20px')
    }

  }, [isMobile, isMobile375]);

  return { isMobile, isMobile375, fontSizeTable };
};

export default DeviceDetect;