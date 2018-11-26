import { getRepository } from 'typeorm';
import { Recipe } from '../../../db/GraphQL/entities/recipe/Recipe';
import { Rate } from '../../../db/GraphQL/entities/rate/Rate';
import { User } from '../../../db/GraphQL/entities/user';

export async function seedDatabase() {
    const recipeRepository = getRepository(Recipe);
    const ratingsRepository = getRepository(Rate);
    const userRepository = getRepository(User);

    const defaultUser = userRepository.create({
        email: 'test@github.com',
        nickname: '19majkel94',
        password: 's3cr3tp4ssw0rd',
    });
    await userRepository.save(defaultUser);

    const recipes = recipeRepository.create([
        {
            title: 'Recipe 1',
            description: 'Desc 1',
            author: defaultUser,
            ratings: ratingsRepository.create([
                { value: 2, user: defaultUser },
                { value: 4, user: defaultUser },
                { value: 5, user: defaultUser },
                { value: 3, user: defaultUser },
                { value: 4, user: defaultUser },
            ]),
        },
        {
            title: 'Recipe 2',
            author: defaultUser,
            ratings: ratingsRepository.create([
                { value: 2, user: defaultUser },
                { value: 4, user: defaultUser },
            ]),
        },
    ]);
    await recipeRepository.save(recipes);

    return {
        defaultUser,
    };
}
