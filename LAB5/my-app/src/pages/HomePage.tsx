import { type FC } from 'react'
import { Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ROUTES } from '../Routes'
import './HomePage.css'

const HomePage: FC = () => {
  return (
    <Container className="home-container">
      {/* УБИРАЕМ Breadcrumbs с главной страницы */}
      
      <div className="home-content">
        <h1 className="home-title">NutriScan</h1>
        <div className="home-description">
          <p className="description-text">
            Система для оценки нутритивного статуса по индексу нутритивной недостаточности (INI)
          </p>
          <p className="description-text">
            Современный инструмент для анализа биохимических показателей и оценки 
            нутритивного статуса пациентов. Используйте наш сервис для точной диагностики 
            и мониторинга состояния питания.
          </p>
          <div className="home-buttons">
            <Link to={ROUTES.BIOMARKERS}>
              <Button className="btn-primary-custom">
                Начать работу с биомаркерами
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default HomePage