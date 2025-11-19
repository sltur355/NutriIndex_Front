// my-app/src/components/BiomarkerCard.tsx

import { type FC } from 'react'
// УБЕДИТЕСЬ, ЧТО ЭТА СТРОКА ЕСТЬ И ПУТЬ ВЕРНЫЙ
import './BiomarkerCard.css' 
import { Link } from 'react-router-dom'
import { type BiomarkerResource } from '../modules/biomarkersApi'
import { defaultImage } from '../constants/defaultImage'

interface Props {
  biomarker: BiomarkerResource
  imageClickHandler?: () => void
}

const BiomarkerCard: FC<Props> = ({ biomarker, imageClickHandler }) => {
  return (
    // Этот div теперь будет стилизован из BiomarkerCard.css
    <div className="card"> 
      <Link to={`/biomarkers/${biomarker.id}`} className="card-link">
        <div className="card-image">
          <img 
            src={biomarker.image_url || defaultImage} // Используем картинку с бэка или дефолтную
            alt={biomarker.name}
            onClick={imageClickHandler}
          />
        </div>
        <div className="card-body">
          <h3 className="card-title">{biomarker.name}</h3>
          <p className="card-description">{biomarker.description}</p>
        </div>
      </Link>
    </div>
  )
}

export default BiomarkerCard