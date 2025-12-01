import { type FC } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../Routes'
import './Breadcrumbs.css'

interface ICrumb {
  label: string
  path?: string
}

interface Props {
  crumbs: ICrumb[]
}

const Breadcrumbs: FC<Props> = ({ crumbs }) => {
  return (
    <div className="breadcrumbs-wrapper">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <Link to={ROUTES.HOME} className="breadcrumbs__link">
              Главная
            </Link>
          </li>

          {crumbs.map((crumb, index) => (
            <li key={index} className="breadcrumbs__item">
              <span className="breadcrumbs__separator">/</span>
              {crumb.path && index < crumbs.length - 1 ? (
                <Link to={crumb.path} className="breadcrumbs__link">
                  {crumb.label}
                </Link>
              ) : (
                <span className="breadcrumbs__current">{crumb.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )
}

export default Breadcrumbs