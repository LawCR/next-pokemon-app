import { Card, Grid } from '@nextui-org/react'
import { FC } from 'react'
import { useRouter } from 'next/router';

interface Props {
    pokemonId: number
}

export const FavoriteCardPokemon: FC<Props> = ({pokemonId}) => {

    const router = useRouter()

    const onFavoriteClicked = () => {
        router.push(`/pokemon/${pokemonId}`)
    }

    return (
        <Grid xs={6} sm={3} md={2} xl={1} >
            <Card hoverable clickable css={{padding: 10}} onClick={onFavoriteClicked}>
                <Card.Image 
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
                width='100%'
                height={140}
                />
            </Card>
        </Grid>
    )
}
