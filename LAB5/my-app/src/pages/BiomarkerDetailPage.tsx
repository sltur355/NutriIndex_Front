// my-app/src/pages/BiomarkerDetailPage.tsx
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import Breadcrumbs from '../components/Breadcrumbs'
import { getBiomarkerById, type BiomarkerResource } from '../modules/biomarkersApi'
import { ROUTES, ROUTE_LABELS } from '../Routes'
import { defaultImage } from '../constants/defaultImage'
import './BiomarkerDetailPage.css'

const BiomarkerDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [biomarker, setBiomarker] = useState<BiomarkerResource | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (!id) {
      setError('ID биомаркера не найден')
      setLoading(false)
      return
    }

    const loadBiomarker = async () => {
      try {
        setLoading(true)
        const data = await getBiomarkerById(parseInt(id))
        if (!data) {
          setError('Биомаркер не найден')
        } else {
          setBiomarker(data)
        }
      } catch (err) {
        setError('Не удалось загрузить биомаркер')
        console.error('Error loading biomarker:', err)
      } finally {
        setLoading(false)
      }
    }

    loadBiomarker()
  }, [id])

  if (loading) {
    return (
      <div className="biomarker-detail">
        <Breadcrumbs crumbs={[{ label: ROUTE_LABELS.BIOMARKERS, path: ROUTES.BIOMARKERS }]} />
        <div className="biomarker-detail__loader">
          <Spinner animation="border" variant="primary" />
          <p>Загрузка данных...</p>
        </div>
      </div>
    )
  }

  if (error || !biomarker) {
    return (
      <div className="biomarker-detail">
        <Breadcrumbs crumbs={[{ label: ROUTE_LABELS.BIOMARKERS, path: ROUTES.BIOMARKERS }]} />
        <div className="biomarker-detail__error">
          <h2>{error || 'Биомаркер не найден'}</h2>
          <button
            className="biomarker-detail__back-button"
            onClick={() => navigate(ROUTES.BIOMARKERS)}
          >
            ← Вернуться к списку
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="biomarker-detail">
      {/* Breadcrumbs под хедером */}
      <Breadcrumbs
        crumbs={[
          { label: ROUTE_LABELS.BIOMARKERS, path: ROUTES.BIOMARKERS },
          { label: biomarker.name },
        ]}
      />

      {/* Основной контент */}
      <main className="biomarker-detail__main">
        <div className="biomarker-detail__card">
          {/* Изображение */}
          <img
            className="biomarker-detail__image"
            src={biomarker.image_url || defaultImage}
            alt={biomarker.name}
            onError={(e) => {
              e.currentTarget.src = defaultImage
            }}
          />

          {/* Контент */}
          <div className="biomarker-detail__content">
            <h2 className="biomarker-detail__title">{biomarker.name}</h2>

            <div className="biomarker-detail__item">
              {biomarker.full_description || biomarker.description}
            </div>

            <div className="biomarker-detail__item">
              <strong>Референсные значения:</strong>
              <span>
                {biomarker.min_value} - {biomarker.max_value} {biomarker.measure_unit}
              </span>
            </div>

            <div className="biomarker-detail__item">
              <strong>Коэффициент значимости:</strong>
              <span>{(biomarker.significance * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>

        {/* Кнопка назад */}
        <button
          className="biomarker-detail__back-button"
          onClick={() => navigate(ROUTES.BIOMARKERS)}
        >
          ← Вернуться к списку
        </button>
      </main>
    </div>
  )
}

export default BiomarkerDetailPage
