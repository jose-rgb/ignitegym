import { TouchableOpacity, TouchableOpacityProps} from "react-native";
import { HStack, Heading, Image, VStack, Text, Icon  } from "native-base";
import { Entypo } from '@expo/vector-icons'

type Props = TouchableOpacityProps & {

};

export function ExerciseCard({...rest}: Props) {
    return(
        <TouchableOpacity {...rest}>
            <HStack bg="gray.500" alignItems="center" p={2} pr={4} rounded="md" mb={3}>
                <Image
                    source={{uri:'https://avatars.githubusercontent.com/u/61853617?v=4'}}
                    alt="imagem esporte"
                    w={16}
                    h={16}
                    rounded="md"
                    mr={4}
                    resizeMode="center"
                />
                <VStack flex={1}>
                    <Heading fontSize="lg" color="white"> Remada unilateral </Heading>

                    <Text fontSize="lg" color="gray.200" mt={1} numberOfLines={2}> 
                        3 séries x 12 repetições 
                    </Text>
                </VStack>

                <Icon
                    as={Entypo}
                    name="chevron-thin-right"
                    color="gray.300"
                 />
            </HStack>
        </TouchableOpacity>
    );
}