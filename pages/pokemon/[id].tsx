import {useEffect, useState} from 'react'
import { GetStaticProps, NextPage, GetStaticPaths } from 'next';
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import confetti from 'canvas-confetti'

import { Layout } from '../../components/layouts/Layout';
import { Pokemon } from '../../interfaces';
import { getPokemonInfo, localFavorites } from '../../utils';

interface Props {
    pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({pokemon}) => {

    // const [isInFavorites, setIsInFavorites] = useState(localFavorites.existInFavorites(pokemon.id))
    const [isInFavorites, setIsInFavorites] = useState(false)
    
    const onToggleFavorite = () => {
        localFavorites.toggleFavorite(pokemon.id)
        setIsInFavorites(!isInFavorites)

        if (isInFavorites) return
        confetti({
            zIndex: 999,
            particleCount: 100,
            spread: 160,
            angle: -100,
            origin: {
                x: 0.9,
                y: 0.1
            }
        })
    }

    useEffect(() => {
        setIsInFavorites(localFavorites.existInFavorites(pokemon.id))
    }, [pokemon.id])
    
    
    
    return (
        <Layout title={pokemon.name}>
            <Grid.Container css={{marginTop: '5px'}} gap={2}>
                <Grid xs={12} sm={4}>
                    <Card hoverable css={{padding: '30px'}}>
                        <Card.Body>
                            <Card.Image 
                                src={pokemon.sprites.other?.dream_world.front_default || '/no-imagen.png'}
                                alt={pokemon.name}
                                width="100%"
                                height={200}
                            />
                                
                        </Card.Body>
                    </Card>
                </Grid>
                <Grid xs={12} sm={8}>
                    <Card>
                        <Card.Header css={{display: 'flex', justifyContent: 'space-between'}}>
                            <Text h1 transform='capitalize'>{pokemon.name}</Text>
                            <Button
                                color="gradient"
                                ghost={!isInFavorites}
                                onClick={onToggleFavorite}
                            >
                                {isInFavorites ? 'En Favoritos' : 'Guardar en favoritos'}
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            <Text size={30}>Sprites:</Text>
                            <Container display='flex' direction='row' gap={0} >
                                <Image 
                                    src={pokemon.sprites.front_default} 
                                    alt={pokemon.name} 
                                    width={100}
                                    height={100}
                                />
                                <Image 
                                    src={pokemon.sprites.back_default} 
                                    alt={pokemon.name} 
                                    width={100}
                                    height={100}
                                />
                                <Image 
                                    src={pokemon.sprites.front_shiny} 
                                    alt={pokemon.name} 
                                    width={100}
                                    height={100}
                                />
                                <Image 
                                    src={pokemon.sprites.back_shiny} 
                                    alt={pokemon.name} 
                                    width={100}
                                    height={100}
                                />
                            </Container>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>
        </Layout>
    )
}

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const pokemon151 = [...Array(100)].map((value, index) => `${ index + 1 }`) 
    
    return {
        // paths: [
        //     {
        //         params: { id: '1'}
        //     },
        //     {
        //         params: { id: '2'}
        //     }
        // ],
        paths: pokemon151.map(id => ({
            params: { id }
        })),
        // fallback: false
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {

    const {id} = params as {id: string}

    const pokemon = await getPokemonInfo(id)

    if (!pokemon) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
      props: {
        pokemon
      },
      revalidate: 86400
    }
}

export default PokemonPage