// my-app/src/pages/HomePage.tsx
import { useState } from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ROUTES } from '../Routes'
import './HomePage.css'

const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const baseUrl = import.meta.env.BASE_URL
  // Правильные пути - относительно public/
  const carouselImages = [
    `${baseUrl}carousel1.jpg`,
    `${baseUrl}carousel2.jpg`,
    `${baseUrl}carousel3.jpg`,
    `${baseUrl}carousel4.jpg`,
  ]

  const handlePrevious = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? carouselImages.length - 1 : prev - 1
    )
  }

  const handleNext = () => {
    setCurrentImageIndex((prev) =>
      prev === carouselImages.length - 1 ? 0 : prev + 1
    )
  }

  return (
    <div className="home-page">
      {/* Карусель - на всю ширину экрана */}
      <section className="home-carousel">
        <div className="carousel-track">
          {carouselImages.map((image, index) => (
            <div
              key={index}
              className={`carousel-slide ${
                index === currentImageIndex ? 'active' : ''
              }`}
              style={{
                transform: `translateX(calc(-${currentImageIndex} * 100%))`,
              }}
            >
              <img
                src={image}
                alt={`Слайд ${index + 1}`}
                onError={(e) => {
                  e.currentTarget.src = '/DefaultImage.svg'
                }}
              />
            </div>
          ))}
        </div>

        {/* Кнопки навигации */}
        <button
          className="carousel-button carousel-button--prev"
          onClick={handlePrevious}
          aria-label="Предыдущее изображение"
        >
          ‹
        </button>

        <button
          className="carousel-button carousel-button--next"
          onClick={handleNext}
          aria-label="Следующее изображение"
        >
          ›
        </button>

        {/* Индикаторы слайдов - на фоне картинок полупрозрачные */}
        <div className="carousel-indicators">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              className={`carousel-indicator ${
                index === currentImageIndex ? 'active' : ''
              }`}
              onClick={() => setCurrentImageIndex(index)}
              aria-label={`Слайд ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Основной контент */}
      <Container className="home-container">
        <div className="home-content">
          <h1 className="home-title">NutriScan</h1>

          <div className="home-description">
            <p className="description-text">
              Система для оценки нутритивного статуса по индексу нутритивной
              недостаточности (INI)
            </p>
            <p className="description-text">
              Современный инструмент для анализа биохимических показателей и
              оценки нутритивного статуса пациентов. Используйте наш сервис для
              точной диагностики и мониторинга состояния питания.
            </p>
          </div>

          <div className="home-buttons">
            <Link to={ROUTES.BIOMARKERS}>
              <button className="btn-primary-custom">
                Начать работу с биомаркерами
              </button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default HomePage
