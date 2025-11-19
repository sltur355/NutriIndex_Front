// Интерфейсы для данных биомаркеров
export interface BiomarkerResource {
  id: number
  name: string
  description: string
  full_description: string
  measure_unit: string
  min_value: number
  max_value: number
  significance: number
  image_url?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface BiomarkerListResponse {
  biomarkers: BiomarkerResource[]
  count: number
}

// Mock данные для работы без бэкенда
export const mockBiomarkers: BiomarkerResource[] = [
  {
    id: 1,
    name: 'Альбумин',
    description: 'Основной белок плазмы крови, маркер белкового обмена.',
    full_description: 'Альбумин - это основной белок плазмы крови, синтезируемый в печени. Снижение его уровня может указывать на недостаточное поступление белка с пищей или на заболевания печени.',
    measure_unit: 'г/л',
    min_value: 35,
    max_value: 52,
    significance: 0.3,
    image_url: '', // Оставляем пустым для демонстрации дефолтной картинки
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'Креатинин',
    description: 'Показатель функции почек и мышечной массы.',
    full_description: 'Креатинин - конечный продукт метаболизма в мышцах. Его уровень в крови является важным индикатором функции почек, а также может косвенно отражать состояние мышечной массы.',
    measure_unit: 'мкмоль/л',
    min_value: 62,
    max_value: 115,
    significance: 0.25,
    image_url: '',
    is_active: true,
    created_at: '2024-01-02T00:00:00Z',
    updated_at: '2024-01-02T00:00:00Z'
  },
  {
    id: 3,
    name: 'Глюкоза',
    description: 'Основной источник энергии, маркер углеводного обмена.',
    full_description: 'Глюкоза - простой сахар, который служит основным источником энергии для клеток организма. Контроль уровня глюкозы в крови важен для диагностики и мониторинга сахарного диабета.',
    measure_unit: 'ммоль/л',
    min_value: 4.1,
    max_value: 5.9,
    significance: 0.4,
    image_url: '',
    is_active: true,
    created_at: '2024-01-03T00:00:00Z',
    updated_at: '2024-01-03T00:00:00Z'
  },
  {
    id: 4,
    name: 'Холестерин общий',
    description: 'Жироподобное вещество, ключевой показатель липидного обмена.',
    full_description: 'Холестерин необходим для построения клеточных мембран и синтеза гормонов. Его избыток может приводить к развитию атеросклероза и сердечно-сосудистых заболеваний.',
    measure_unit: 'ммоль/л',
    min_value: 3.1,
    max_value: 5.2,
    significance: 0.35,
    image_url: '',
    is_active: true,
    created_at: '2024-01-04T00:00:00Z',
    updated_at: '2024-01-04T00:00:00Z'
  }
]

// Функция для получения списка биомаркеров с фильтрацией
export const getBiomarkers = async (searchQuery: string = ''): Promise<BiomarkerListResponse> => {
  // Формируем параметры запроса
  const params = new URLSearchParams()
  if (searchQuery) params.append('name', searchQuery)
  
  const url = params.toString() 
    ? `/api/biomarkers?${params.toString()}`
    : '/api/biomarkers'

  console.log('Отправляем запрос к:', url)

  try {
    const response = await fetch(url)
    console.log('Статус ответа:', response.status, response.statusText)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    console.log('Данные получены от бэкенда:', data)
    
    // НЕ преобразуем URL изображений - оставляем как есть из бэкенда
    const biomarkers = data.data || []
    
    return {
      biomarkers: biomarkers,
      count: biomarkers.length,
    }
  } catch (error) {
    console.error('Ошибка при запросе к бэкенду:', error)
    // В случае ошибки используем mock-данные
    console.warn('Using mock data: backend not available')
    
    let filteredBiomarkers = mockBiomarkers
    if (searchQuery) {
      filteredBiomarkers = filteredBiomarkers.filter((biomarker) => 
        biomarker.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    return {
      biomarkers: filteredBiomarkers,
      count: filteredBiomarkers.length,
    }
  }
}

// Функция для получения одного биомаркера по ID
export const getBiomarkerById = async (id: number): Promise<BiomarkerResource | null> => {
  try {
    const response = await fetch(`/api/biomarkers/${id}`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (!data) return null
    
    // НЕ преобразуем URL изображения - оставляем как есть
    return data
  } catch (error) {
    console.error('Ошибка при запросе к бэкенду:', error)
    // В случае ошибки используем mock-данные
    console.warn('Using mock data: backend not available')
    return mockBiomarkers.find((biomarker) => biomarker.id === id) || null
  }
}