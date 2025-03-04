import MeldeMinister from 'assets/melde_minister.png'
import ProblemProfi from 'assets/problem_profi.png'
import StadtSheriff from 'assets/stadt_sheriff.png'
import StreetSpy from 'assets/street_spy.png'

export const PrestiegeInformation = {
    0: {
        image: StreetSpy,
        role: 'Straßen-Spion',
        nextRolePoints: 100,
        nextRole: 'Problem-Profi',
    },
    1: {
        image: ProblemProfi,
        role: 'Problem-Profi',
        nextRolePoints: 500,
        nextRole: 'Melde-Minister',
    },
    2: {
        image: MeldeMinister,
        role: 'Melde-Minister',
        nextRolePoints: 1000,
        nextRole: 'Stadt-Sheriff',
    },
    3: {
        image: StadtSheriff,
        role: 'Stadt-Sheriff',
        nextRolePoints: null,
        nextRole: null,
    },
}
