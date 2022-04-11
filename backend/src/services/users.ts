import User from '../models/users';

export const fetch = async () => {
    const test = await User.query();

    return test;
}