import {Calendar} from 'Components/Calendar';
import { Header } from 'Components/Header';
import { HomeWrapper } from 'asset/Home';
import { Loading } from 'Components/Loading';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer/index';
export const Home = () => {
    const isLoading = useSelector((state:RootState) => state?.ui.isLoading);
 
    return (
        <HomeWrapper>
            {
                isLoading && <Loading/>
            } 
            <Header/>
            <Calendar/>
        </HomeWrapper> 
    )
}