import User from '../models/users';

export const signUp = async () => {
    await User.query().insert(({

    }) as any);

    const test = await User.query();

    return test;
}