import { reverseGeocodeAsync } from 'expo-location'
import { isNil } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import { Icon, Text } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { useCategoriesQuery } from '~/queries/Categories/useCategoriesQuery'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import ImagePreview from '~/shared/views/Image'
import LoadingSpinner from '~/shared/views/LoadingSpinner'
import { Problem } from '~/supabase/types'
import { ReportStepProps } from '~/views/ProblemReport/types/ReportStepProps'

const styles = StyleSheet.create({
    content: {
        paddingVertical: 10,
    },
    flexText: {
        flexShrink: 1,
        flexWrap: 'wrap',
    },
    icon: {
        padding: 10,
    },
    image: {
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: colors.secondary,
        borderRadius: 20,
        height: RFValue(240),
        justifyContent: 'center',
        width: RFValue(240),
    },
    title: {
        fontWeight: 'bold',
    },
    titleWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        marginBottom: 10,
    },
    wrapper: {
        padding: 20,
    },
})

const ReportReviewStep = ({ isLoading }: ReportStepProps) => {
    const [currentAddress, setCurrentAddress] = useState<string>()

    const { getValues } = useFormContext<Problem>()

    /**
     * Parse the current value to a valid Region object
     */
    const coords = useMemo(() => {
        const location = getValues('location')

        if (isNil(location)) return undefined

        const [latitude, longitude] = location.split(',')

        return {
            id: -1,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
        }
    }, [getValues])

    useEffect(() => {
        if (isNil(coords)) return

        reverseGeocodeAsync(coords).then(([address]) => {
            setCurrentAddress(address.formattedAddress ?? undefined)
        })
    })

    const { data: categories, isLoading: categoriesLoading } = useCategoriesQuery()

    const category = useMemo(
        () => categories?.find((c) => c.id === getValues('categoryId')),
        [categories, getValues],
    )

    if (isLoading || categoriesLoading) return <LoadingSpinner />

    return (
        <View style={[globalStyles.flexBox, styles.wrapper]}>
            <View style={styles.titleWrapper}>
                <Icon
                    size={RFValue(35)}
                    color={colors.primary}
                    source={category?.icon}
                />
                <Text
                    variant='headlineSmall'
                    style={styles.title}
                >
                    {getValues('title')}
                </Text>
            </View>
            <View style={styles.content}>
                <ImagePreview
                    source={{ uri: getValues('image') }}
                    style={styles.image}
                />
            </View>
            <View style={globalStyles.flexRow}>
                <View style={styles.icon}>
                    <Icon
                        source='text-long'
                        size={RFValue(25)}
                        color={colors.primary}
                    />
                </View>
                <Text
                    variant='bodyLarge'
                    numberOfLines={10}
                    lineBreakMode='tail'
                >
                    {getValues('description')}
                </Text>
            </View>
            <View style={globalStyles.flexRow}>
                <View style={styles.icon}>
                    <Icon
                        source='map-marker'
                        size={RFValue(25)}
                        color={colors.primary}
                    />
                </View>
                <Text
                    variant='bodyLarge'
                    numberOfLines={2}
                    lineBreakMode='tail'
                    style={styles.flexText}
                >
                    {currentAddress}
                </Text>
            </View>
        </View>
    )
}

export default ReportReviewStep
