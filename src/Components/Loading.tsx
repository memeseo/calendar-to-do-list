import { Background, LoadingText} from 'asset/Common/Loading';
import Spinner from 'asset/Common/Spinner.gif';

export const Loading = () => {
    return (
        <Background>
            <LoadingText>잠시만 기다려 주세요.</LoadingText>
            <img src={Spinner} alt="로딩중" width="5%" />
        </Background>
    )
};
