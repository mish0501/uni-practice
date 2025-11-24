import { PassportCreate } from '~/passports/passport-create'
import type { Route } from './+types/passport-create'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'React Router App' },
    { name: 'description', content: 'Създаване на паспорт' },
  ]
}

export default function PassportCreatePage() {
  return <PassportCreate />
}
