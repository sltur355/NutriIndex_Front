import { type FC, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col, Spinner, Image } from 'react-bootstrap'
import Breadcrumbs from '../components/Breadcrumbs'
import { getBiomarkerById, type BiomarkerResource } from '../modules/biomarkersApi'
import { ROUTES, ROUTE_LABELS } from '../Routes'
import { defaultImage } from '../constants/defaultImage'
import './BiomarkerDetailPage.css'

const BiomarkerDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>()
  const [pageData, setPageData] = useState<BiomarkerResource | null>(null)

  useEffect(() => {
    if (id) {
      getBiomarkerById(parseInt(id)).then((data) => {
        setPageData(data)
      })
    }
  }, [id])

  return (
    <div className="biomarker-detail-container">
      <Breadcrumbs
  crumbs={[
    { label: ROUTE_LABELS.BIOMARKERS, path: ROUTES.BIOMARKERS },
    { label: pageData?.name || 'Биомаркер' },
  ]}
/>

      <div>
        {pageData ? (
          <main>
            <div className="card">
              <Image 
                className="biomarker-image" 
                src={defaultImage}
                alt={pageData.name}
              />
              
              <div className="content">
                <h2>{pageData.name}</h2>
                
                <div className="detail-item">
                  {pageData.full_description || pageData.description}
                </div>
                
                <div className="detail-item">
                  <strong>Референсные значения:</strong>
                  {pageData.min_value} - {pageData.max_value} {pageData.measure_unit}
                </div>
                
                <div className="detail-item">
                  <strong>Коэффициент значимости:</strong>
                  {pageData.significance}
                </div>
              </div>
            </div>
          </main>
        ) : (
          <div className="biomarker_page_loader_block">
            <Spinner animation="border" />
          </div>
        )}
      </div>
    </div>
  )
}

export default BiomarkerDetailPage