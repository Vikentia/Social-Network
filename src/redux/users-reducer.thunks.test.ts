import { actions, follow } from './users-reducer';
import { usersAPI } from '../api/users-api';
import { APIResponseType } from '../api/api';
import { ResultCodesEnum } from '../api/auth-api';


jest.mock('../api/users-api')
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

const result: APIResponseType = {
    resultCode: ResultCodesEnum.Success,
    message: [],
    data: {}
}

test('success follow thunk', async () => {
    const thunk = follow(1)
    
    userAPIMock.follow.mockReturnValue(Promise.resolve(result))
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
    // expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))
})
