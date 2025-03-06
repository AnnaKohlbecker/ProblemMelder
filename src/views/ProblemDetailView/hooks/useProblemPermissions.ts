import { isNil } from 'lodash'
import { useMemo } from 'react'
import { useAuth } from '~/shared/context/AuthContext'
import { ProblemStatus } from '~/shared/enums/ProblemStatus'
import { Role } from '~/shared/enums/Role'
import { Problem } from '~/supabase/types'

type Props = {
    problem: Problem
}

export const useProblemPermissions = ({ problem }: Props) => {
    const { session, hasRole } = useAuth()

    const canReview = useMemo(() => hasRole(Role.Admin) || hasRole(Role.Manager), [hasRole])

    const canReactivate = useMemo(
        () => problem.status === ProblemStatus.Done && !isNil(session?.user),
        [problem.status, session],
    )

    return {
        canReview,
        canReactivate,
    }
}
