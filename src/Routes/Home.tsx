import {Calendar} from 'Components/Calendar';
import { Header } from 'Components/Header';
import { HomeWrapper } from 'asset/Home';

export const Home = () => {
    return (
        <HomeWrapper>
            <Header/>
            <Calendar/>
        </HomeWrapper> 
    )
}