import { ComponentProps, useState } from 'react'
// eslint-disable-next-line no-restricted-imports
import { Image, TouchableOpacity } from 'react-native'
import ImageViewing from 'react-native-image-viewing'
import { ImageSource } from 'react-native-image-viewing/dist/@types'

type Props = ComponentProps<typeof Image> & {
    source: ImageSource
}

const ImagePreview = ({ source, ...props }: Props) => {
    const [visible, setVisible] = useState(false)

    return (
        <>
            <TouchableOpacity
                onPress={() => {
                    setVisible(true)
                }}
            >
                <Image
                    source={source}
                    {...props}
                />
            </TouchableOpacity>

            {visible && (
                <ImageViewing
                    visible={true}
                    images={[source]}
                    imageIndex={0}
                    onRequestClose={() => {
                        setVisible(false)
                    }}
                />
            )}
        </>
    )
}

export default ImagePreview
