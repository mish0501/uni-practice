import {
  buildPaginatedQueryString,
  clearAuthFromSession,
  getApiUrl,
  getAuthTokenFromSession,
} from '~/lib/utils'
import type { Route } from './+types/passport-details'
import { fetchApi } from '~/lib/api'
import { UnauthorizedError } from '~/models/response-errors/unauthorized-error'
import { redirect } from 'react-router'
import type { PassportDetailsResponse } from '~/models/passports.models'
import {
  PassportDetailsCard,
  PassportDetailsCardSkeleton,
} from '~/passports/passport-details'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'React Router App' },
    { name: 'description', content: 'Паспорти' },
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
  return <PassportDetailsCardSkeleton />
}

export default function PassportDetailsPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className='container mx-auto p-6'>
      <PassportDetailsCard passport={loaderData} />
    </div>
  )
}
