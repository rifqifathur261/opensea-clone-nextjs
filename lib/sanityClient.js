import sanityClient from '@sanity/client'

export const client = sanityClient({
    projectId: '5iqbc2gi',
    dataset: 'production',
    apiVersion: '2022-07-24',
    token: 'skhdiYL8zzuvwF9aHLDJe5t3ip1NG03G9092LaGGhbsiV66zESU1dIN5L4aCl3KubwfQo8ctJEgrkuyeNJGJfsUq39cN9mxhPkz9Vtknna9quRoEryI4W8fe6JncGHLNiPgGtC6qXPpgOt6MIaP7lMT7pvhziIeKx7jMgy2NgWQlJV7Yfe56',
    useCdn: false,
})