import { useMemo } from 'react'
import {
  PaginatedTable,
  PaginatedTableSkeleton,
} from '~/components/core/paginated-table'
import type { PaginatedTableColumn } from '~/models/paginated-data/paginated-data.model'
import type {
  Passport,
  PassportsIndexResponse,
} from '~/models/passports.models'
import { Button } from '~/components/ui/button'
import { PencilIcon, TrashIcon } from 'lucide-react'

type PassportsIndexTableProps = {
  data: PassportsIndexResponse
}

export function PassportsIndexTable({ data }: PassportsIndexTableProps) {
  const columns: PaginatedTableColumn<Passport>[] = useMemo(
    () => [
      {
        key: 'name',
        header: 'Име',
      },
      {
        key: 'model',
        header: 'Модел',
      },
      {
        key: 'serialPrefix',
        header: 'Сериен префикс',
      },
      {
        key: 'fromSerialNumber',
        header: 'От сериен номер',
      },
      {
        key: 'toSerialNumber',
        header: 'До сериен номер',
      },
      {
        key: 'warrantyMonths',
        header: 'Гаранция (месеци)',
      },
      {
        key: 'actions',
        header: 'Действия',
        cell: (passport) => (
          <div className='flex gap-1'>
            <Button
              size='icon-sm'
              variant='default'
              className='bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-700'
              onClick={(e) => {
                e.stopPropagation()
                // Edit action will be added here
              }}
            >
              <PencilIcon />
            </Button>
            <Button
              size='icon-sm'
              variant='destructive'
              onClick={(e) => {
                e.stopPropagation()
                // Delete action will be added here
              }}
            >
              <TrashIcon />
            </Button>
          </div>
        ),
      },
    ],
    []
  )

  function getRowLink(passport: Passport) {
    return `/passports/${passport.id}`
  }

  return (
    <PaginatedTable data={data} columns={columns} getRowLink={getRowLink} />
  )
}

export function PassportsIndexTableSkeleton() {
  return <PaginatedTableSkeleton columns={7} rows={10} />
}
