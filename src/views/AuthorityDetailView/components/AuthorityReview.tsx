import { FlatList, View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import { useKeyboard } from '~/shared/context/KeyboardContext'
import { Category, ProblemWithSanitizedProblemReviews } from '~/supabase/types'
import ProblemListItem from '~/views/AuthorityDetailView/components/ProblemListItem'

type Props = {
    categories: Category[]
    problems: ProblemWithSanitizedProblemReviews[]
    onClose: () => void
}

const AuthorityReview = ({ categories, problems, onClose }: Props) => {
    const { isKeyboardVisible } = useKeyboard()

    return (
        <View>
            <View
                style={
                    isKeyboardVisible
                        ? globalStyles.contentWrapperWithKeyboard
                        : globalStyles.contentWrapper
                }
            >
                <View style={globalStyles.cardSubtitle}>
                    <IconButton
                        size={20}
                        icon='arrow-left'
                        mode='outlined'
                        onPress={onClose}
                        iconColor={colors.primary}
                    />
                    <Text style={globalStyles.subtitle}>Bewertung der Behörde</Text>
                </View>
                <FlatList
                    data={problems}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <ProblemListItem
                            categories={categories}
                            item={item}
                        />
                    )}
                />
            </View>
        </View>
    )
}

export default AuthorityReview
