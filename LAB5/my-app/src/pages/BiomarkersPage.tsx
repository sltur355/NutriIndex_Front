// src/pages/BiomarkersPage.tsx
import { useState, useEffect } from 'react'
import { Container, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import BiomarkerCard from '../components/BiomarkerCard'
import Breadcrumbs from '../components/Breadcrumbs'
import SearchForm from '../components/SearchForm'
import { getBiomarkers, type BiomarkerResource } from '../modules/biomarkersApi'
import { ROUTE_LABELS } from '../Routes'
import './BiomarkersPage.css'

// NEW: redux
import { useSelector, useDispatch } from 'react-redux'
import {
  selectBiomarkerFilters,
  setNameFilter,
} from '../store/slices/filtersSlice'
import type { RootState, AppDispatch } from '../store/store'

const BiomarkersPage = () => {
  const [loading, setLoading] = useState(false)
  const [biomarkers, setBiomarkers] = useState<BiomarkerResource[]>([])
  const [error, setError] = useState<string>('')

  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  // читаем фильтры из Redux
  const filters = useSelector((state: RootState) => selectBiomarkerFilters(state))
  const searchValue = filters.name

  useEffect(() => {
    // при монтировании сразу грузим по текущему фильтру из Redux
    loadBiomarkers(searchValue)
  }, [])

  const loadBiomarkers = async (query: string = '') => {
    setLoading(true)
    setError('')
    try {
      const response = await getBiomarkers(query)
      setBiomarkers(response.biomarkers)
    } catch (err) {
      setError('Не удалось загрузить биомаркеры')
      console.error('Error loading biomarkers:', err)
    } finally {
      setLoading(false)
    }
  }

  // вызывается при submit формы поиска
  const handleSearch = (query: string) => {
    // записываем фильтр в Redux
    dispatch(setNameFilter(query))
    // и подгружаем данные с этим фильтром
    loadBiomarkers(query)
  }

  const handleCardClick = (id: number) => {
    navigate(`/biomarkers/${id}`)
  }

  return (
    <div className="biomarkers-page">
      {/* Поиск (передаём в форму текущий searchValue из Redux) */}
      <SearchForm
        onSearch={handleSearch}
        isLoading={loading}
        initialValue={searchValue}
      />

      <Breadcrumbs crumbs={[{ label: ROUTE_LABELS.BIOMARKERS }]} />

      <h2 className="biomarkers-title">
        Биохимические показатели для оценки питания
      </h2>

      <Container fluid className="biomarkers-section">
        {loading && (
          <div className="biomarkers-loader">
            <Spinner animation="border" variant="primary" />
            <p>Загрузка биомаркеров...</p>
          </div>
        )}

        {!loading && error && (
          <div className="biomarkers-error">
            <p>{error}</p>
          </div>
        )}

        {!loading && biomarkers.length === 0 && !error && (
          <div className="biomarkers-empty">
            <p>К сожалению, биомаркеры не найдены 😔</p>
          </div>
        )}

        {!loading && biomarkers.length > 0 && (
          <div className="biomarkers-grid">
            {biomarkers.map((biomarker) => (
              <div key={biomarker.id}>
                <BiomarkerCard
                  biomarker={biomarker}
                  onClick={handleCardClick}
                />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}

export default BiomarkersPage
