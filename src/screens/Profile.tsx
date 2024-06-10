import { useState } from "react";
import { TouchableOpacity } from 'react-native';

import { Center, ScrollView, VStack, Skeleton, Text, Heading } from "native-base";

import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

const PHOTO_SIZE = 33;

export function Profile(){
    const [photoIsLoading, setPhotoIsLoading] = useState(false);

    return(
        <VStack flex={1}>

            <ScreenHeader title="Pefil"/>

            <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
                <Center mt={6} px={10}>

                    {
                        photoIsLoading ?

                            <Skeleton 
                                w={PHOTO_SIZE} 
                                h={PHOTO_SIZE} 
                                rounded="full"
                                startColor="gray.600"
                                endColor="gray.400"
                            />
                        :
                            <UserPhoto 
                                source={{uri: 'https://avatars.githubusercontent.com/u/61853617?v=4'}}
                                alt="user"
                                size={PHOTO_SIZE}
                            />
                    }


                    <TouchableOpacity>
                        <Text color="green.500" fontWeight="bold" fontSize="md" mt={2} mb={8}>
                            Alterar Foto
                         </Text>
                    </TouchableOpacity>

                    <Input 
                        placeholder="Nome"
                        bg="gray.600"
                    />

                    <Input 
                    placeholder="josericardo@gmail.com"
                        bg="gray.600"
                        isDisabled
                    />
               
                    <Heading color="gray.200" fontSize="md" mb={2} alignSelf="flex-start" mt={12}>
                        Alterar senha
                    </Heading>

                    <Input 
                        bg="gray.600"
                        placeholder="Senha antiga"
                        secureTextEntry
                    />

                    <Input 
                        bg="gray.600"
                        placeholder="Nova senha"
                        secureTextEntry
                    />

                    <Input 
                        bg="gray.600"
                        placeholder="Confirme a nova senha"
                        secureTextEntry
                    />

                    <Button title="Atualizar" mt={4} />
                </Center>

            </ScrollView>
        </VStack>
    );
}