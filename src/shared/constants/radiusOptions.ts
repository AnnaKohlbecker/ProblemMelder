import { FilterStatus } from '~/shared/enums/FilterStatus'

export const radiusOptions = [
    { label: 'Kein Filter', value: FilterStatus.Inactive },
    { label: '1 km', value: 1 },
    { label: '5 km', value: 5 },
    { label: '10 km', value: 10 },
]
