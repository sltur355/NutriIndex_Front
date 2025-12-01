import { type FC } from 'react'
import './BiomarkerCard.css'
import { type BiomarkerResource } from '../modules/biomarkersApi'
import { defaultImage } from '../constants/defaultImage'

interface Props {
  biomarker: BiomarkerResource
  onClick?: (id: number) => void
}

const BiomarkerCard: FC<Props> = ({ biomarker, onClick }) => {
  const handleCardClick = () => {
    onClick?.(biomarker.id)
  }

  return (
    <div className="biomarker-card">
      <div className="biomarker-card__image">
        <img
          src={biomarker.image_url || defaultImage}
          alt={biomarker.name}
          onError={(e) => {
            e.currentTarget.src = defaultImage
          }}
        />
      </div>

      <div className="biomarker-card__body">
        <h3 className="biomarker-card__title">{biomarker.name}</h3>
        <p className="biomarker-card__description">{biomarker.description}</p>
      </div>

      <button className="biomarker-card__button" onClick={handleCardClick}>
        Подробнее
      </button>
    </div>
  )
}

export default BiomarkerCard