import {
  clearAuthFromSession,
  getApiUrl,
  getAuthTokenFromSession,
} from '~/lib/utils'
import type { Route } from './+types/passport-edit'
import { fetchApi } from '~/lib/api'
import { UnauthorizedError } from '~/models/response-errors/unauthorized-error'
import { redirect } from 'react-router'
import type { PassportDetailsResponse } from '~/models/passports.models'
import { PassportEdit, PassportEditSkeleton } from '~/passports/passport-edit'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'React Router App' },
    { name: 'description', content: 'Редактиране на паспорт' },
  ]
}

export async function clientLoader({
  params: { passportId },
}: Route.ClientLoaderArgs) {
  const token = getAuthTokenFromSession()

  try {
    const response = await fetchApi<PassportDetailsResponse>(
      getApiUrl(`/passports/${passportId}`),
      'GET',
      token
    )

    return response
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      clearAuthFromSession()

      throw redirect('/login')
    }

    throw error
  }
}

export function HydrateFallback() {
  return (
    <div className='container mx-auto py-8'>
      <PassportEditSkeleton />
    </div>
  )
}

export default function PassportEditPage({ loaderData }: Route.ComponentProps) {
  return <PassportEdit passport={loaderData} />
}
