import { useState, useEffect } from 'react';
import ModelViewer from './ModelViewer';
import styles from './LandingPage.module.css';

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll('section').forEach(
      (section) => observer.observe(section)
    );

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.container}>
      {/* Hero Section with Side Info */}
      <section id="hero" className={`${styles.hero} ${isVisible.hero ? styles.visible : ''}`}>
        <div className={styles.heroSideInfo}>
          <h1 className={styles.title}>TriEspada</h1>
          <p className={styles.subtitle}>Uma Reimaginação da Espada do Filme 300</p>
          <div className={styles.author}>Por [Rafael Duarte de Freitas]</div>
          <div className={styles.scrollIndicator}>
            Explore a Jornada
            <div className={styles.arrow}>↓</div>
          </div>
        </div>
        <div className={styles.modelContainer}>
          <ModelViewer />
        </div>
      </section>

      {/* Process Timeline */}
      <section id="process" className={`${styles.processSection} ${isVisible.process ? styles.visible : ''}`}>
        <div className={styles.processBg}>
          <div className={styles.processContent}>
            <h2>Processo Criativo</h2>
            <div className={styles.processSteps}>
              <div className={styles.processStep}>
                <div className={styles.stepIcon}>1</div>
                <h3>Inspiração</h3>
                <p>Do épico '300' para uma nova visão</p>
              </div>
              <div className={styles.processStep}>
                <div className={styles.stepIcon}>2</div>
                <h3>Conceito</h3>
                <p>Três lâminas, um propósito</p>
              </div>
              <div className={styles.processStep}>
                <div className={styles.stepIcon}>3</div>
                <h3>Modelagem</h3>
                <p>Da imaginação ao 3D</p>
              </div>
              <div className={styles.processStep}>
                <div className={styles.stepIcon}>4</div>
                <h3>Finalização</h3>
                <p>Detalhes que fazem a diferença</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className={`${styles.featuresSection} ${isVisible.features ? styles.visible : ''}`}>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <h3>Design Revolucionário</h3>
            <p>Três lâminas paralelas em perfeita harmonia, cada uma representando um aspecto da força espartana.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Gravuras Antigas</h3>
            <p>Inscrições em grego antigo contam a história de bravura e honra dos guerreiros espartanos.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Materiais Nobres</h3>
            <p>Aço Damasco forjado com técnicas modernas, preservando a tradição ancestral.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Ergonomia</h3>
            <p>Empunhadura desenvolvida para máximo controle e equilíbrio durante o manejo.</p>
          </div>
        </div>
      </section>

      {/* Technical Showcase */}
      <section id="technical" className={`${styles.technicalSection} ${isVisible.technical ? styles.visible : ''}`}>
        <div className={styles.technicalContent}>
          <div className={styles.techSpecs}>
            <h2>Especificações</h2>
            <div className={styles.specsList}>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Comprimento</span>
                <span className={styles.specValue}>36"</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Peso</span>
                <span className={styles.specValue}>4.5 lbs</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Material</span>
                <span className={styles.specValue}>Aço Damasco</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Lâminas</span>
                <span className={styles.specValue}>3 Paralelas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Section */}
      <section id="conclusion" className={`${styles.conclusionSection} ${isVisible.conclusion ? styles.visible : ''}`}>
        <div className={styles.conclusionContent}>
          <h2>Uma Nova Lenda</h2>
          <p>Este projeto representa a fusão entre história e inovação, onde tecnologia moderna encontra lendas antigas.</p>
          <div className={styles.credits}>
            <p>Desenvolvido com:</p>
            <div className={styles.techStack}>
              <span>Three.js</span>
              <span>React</span>
              <span>Maya</span>
              <span>Preguiça</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
